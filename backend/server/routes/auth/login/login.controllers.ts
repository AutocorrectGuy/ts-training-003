// import { addTokenToDB } from "./login.helpers"
import refTokenModel from "../../../dbModels/refreshToken.model"
import { createMongoConnection } from "../../routes.helpers"
import jwt from "jsonwebtoken"

const ACCESS_TOKEN_SECRET = "asdadjkadklasdjalksd"

export const POST_login = async (
  req: any,
  res: any
) => {
  const db = await createMongoConnection()

  try {
    console.log(req.body)
    if(!(req.body.username && req.body.password))
      res.status(200).json({username: "Lai ielogotos, nepieciešams ievadīt gan lietotājvārdu, gan arī paroli!", password: ""})
    
    jwt.sign(req.body.username, ACCESS_TOKEN_SECRET)

    // await new refTokenModel(refTokenData).save()
    db.disconnect()
    res.status(201).send("User uploaded succesfully")
  } catch (error) {
    db.disconnect()
    res.status(400).send(`Failed to upload user: ${error}`)
  }
}