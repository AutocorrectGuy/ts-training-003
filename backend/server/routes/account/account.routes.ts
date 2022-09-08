import express, { Router, Response, Request } from "express"
import jwt from "jsonwebtoken"
import userModel from "../../dbModels/user.model"
import { getEnv } from "../../server.helpers"
import { createMongoConnection } from "../routes.helpers"

const router = Router()

router.get("/", async (req: Request, res: Response) => {
  // console.log(req.cookies)
  const accessToken = req.cookies.JWT_ACCESS_TOKEN
  if (!accessToken) {
    console.log("No access token")
    return res.status(200).json({ status: "You dont have permission to access this site" })
  }

  await jwt.verify(
    accessToken,
    <string>getEnv("ACCESS_TOKEN_SECRET"),
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
        const keysToShow = ["username", "status"]
        const dataToShow = Object.keys(<object>user)
          .filter(key => keysToShow.includes(key))
          .reduce((acc, curr) => {
            return ({ ...acc, [curr]: user[curr] })
          }, {})
        return res.status(200).json({ 
          status: "welcome",
          userData: dataToShow
         })

      } catch (error) {
        return res.status(403).json({ status: "User with decoded jwt _id is nout found in the database" })
      } finally {
        console.log("Connection close")
        connection.disconnect()
      }
    }
  )
})

export default router