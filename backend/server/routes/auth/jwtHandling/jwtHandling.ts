import jwt from "jsonwebtoken"
import { getEnv } from "../../../server.helpers"
import { Request, Response, NextFunction } from "express"
import { clearTokens } from "../logout/logout.controllers"
import userModel from "../../../dbModels/user.model"
import { createMongoConnection } from "../../routes.helpers"

type JWTTokeType = "ACCESS" | "REFRESH"

// token age in SECONDS
const AGE = {
  ACCESS: 20, // 20 seconds
  REFRESH: 60 * 60 // one hour
}

export const createJWT = (tokenType: JWTTokeType, _id: string) => jwt.sign(
  { _id },
  <string>getEnv(`${tokenType}_TOKEN_SECRET`),
  { expiresIn: AGE[tokenType] }
)

export const putTokenInCookie = (
  res: Response,
  tokenType: JWTTokeType,
  jwt: any
) => res.cookie(
  `JWT_${tokenType}_TOKEN`,
  jwt,
  {
    httpOnly: true,
    maxAge: AGE[tokenType] * 1000
  }
)

export const verifyTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } = req.cookies

  if (JWT_REFRESH_TOKEN === undefined)
    return res.status(200).json({ error: "No refresh token" })

  /* if access token has expired:
    1. generate new access and refresh tokens
    2. but check weather it is the correct user who hold the refresh token
  */
  if (JWT_ACCESS_TOKEN === undefined) {
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
          // create new access and refresh tokens
          clearTokens(res)
          const accessToken = createJWT("ACCESS", foundUser._id.toString())
          const refreshToken = createJWT("REFRESH", foundUser._id.toString())
          // set tokens into cookies
          putTokenInCookie(res, "ACCESS", accessToken)
          putTokenInCookie(res, "REFRESH", refreshToken)
        } catch (error) {
          return res.status(401).json({ status: "error while trying to find user in db" })
        } finally {
          await db.disconnect()
          next()
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