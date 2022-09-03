import userModel from "../../../dbModels/user.model"
import { createMongoConnection } from "../../routes.helpers"
import { handleErrors } from "./register.errorHandlers"
import { validateUser } from "./register.helpers"
import jwt from "jsonwebtoken"

const maxAge = 20
const createToken = (id: string) => jwt.sign(
  { id }, "secretSecret",
  { expiresIn: maxAge }
)

export const POST_register = async (
  req: any,
  res: any
) => {
  const db = await createMongoConnection()
  try {
    const newUser = await new userModel(validateUser(req.body)).save()
    const token = createToken(newUser._id.toString())
    console.log(token)
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000
    })
    res.status(201).send("User uploaded succesfully")
  } catch (error) {
    res.status(200).json(handleErrors(error))
  } finally {
    db.disconnect()
  }
}