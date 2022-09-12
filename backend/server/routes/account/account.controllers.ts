import { Response, Request } from "express"
import jwt from "jsonwebtoken"
import userModel from "../../dbModels/user.model"
import { getEnv } from "../../server.helpers"
import { createMongoConnection } from "../routes.helpers"

export const GET_ACCOUNT = async (req: Request, res: Response) => {
  console.log(req.cookies)
  const refreshToken = req.cookies.JWT_REFRESH_TOKEN
  if (!refreshToken) {
    /* can't check access token in the same request cycle
    where cookie is set in, so check a token that is a MUST */
    return res.status(200).json({ status: "You dont have permission to access this site" })
  }

  /**
   * After verify, we will try to find decoded user _id,
   * so it doesn't matter much, if we use, access or refresh
   * token. 
   */
  await jwt.verify(
    refreshToken,
    <string>getEnv("REFRESH_TOKEN_SECRET"),
    async (err: any, decoded: any) => {
      if (err) {
        console.log(err)
        return res.status(200).json({ status: "Invalid access token" })
      }
      const connection = await createMongoConnection()
      try {
        const user: { [key: string]: any } | null = await userModel
          .findById(decoded._id)
        if (user === null || user === undefined)
          return res.status(200).json("no user found with decoded _id")

        console.log(user)
        // const keysToShow = ["username", "status"]

        return res.status(200).json(user)

      } catch (error) {
        return res.status(403).json({ status: "User with decoded jwt _id is nout found in the database" })
      } finally {
        console.log("Connection close")
        connection.disconnect()
      }
    }
  )
}