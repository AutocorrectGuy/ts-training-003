import jwt from "jsonwebtoken"
import { getEnv } from "../../server.helpers"
import { Request, Response, NextFunction } from "express"
import userModel from "../../dbModels/user.model"
import { clearTokens } from "../../routes/auth/logout/logout.controllers"
import { createMongoConnection } from "../../routes/routes.helpers"
import { createJWTSandPutCookies } from "./jwtHandling.helpers"

export const verifyTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } = req.cookies

  if (JWT_REFRESH_TOKEN === undefined) {
    clearTokens(res)
    return res.status(200).json({ error: "No refresh token" })
  }

  /* if access token has expired:
    1. generate new access and refresh tokens
    2. but check weather it is the correct user who hold the refresh token
  */
  if (JWT_ACCESS_TOKEN === undefined) {
    /* if callback if provided, like in this case, then it is 
    async function. Typescript seems to not recognise that */
    await jwt.verify(JWT_REFRESH_TOKEN,
      <string>getEnv("REFRESH_TOKEN_SECRET"),
      async (err: any, decoded: any) => {
        // if not verified, log out user
        if (err)
          return res.status(200).json({ status: "refresh token invalidation" })
        // find user in db based on decoded refreshtoken users _id
        const db = await createMongoConnection()
        try {
          const foundUser = await userModel.findOne({ _id: decoded._id })
          if (!foundUser)
            return res.status(200).json({ status: "no user in db with given rt _id" })
          createJWTSandPutCookies(res, foundUser)
          next()
        } catch (error) {
          return res.status(401).json({ status: "error while trying to find user in db" })
        } finally {
          await db.disconnect()
        }
      })
  }
  else {
    // if user hold ACCESS token, validate it
    await jwt.verify(
      JWT_ACCESS_TOKEN,
      <string>getEnv("ACCESS_TOKEN_SECRET"),
      (err: any, decoded: any) => {
        if (err) {
          clearTokens(res)
          return res.status(200).json({ status: "invalid access token" })
        } else {
          next()
        }
      }
    )
  }
}