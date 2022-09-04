import userModel from "../../../dbModels/user.model"
import { createMongoConnection } from "../../routes.helpers"
import { createJWT, spreadableJWTCookieProps } from "../jwtHandling/jwtHandling"
import { handleErrors } from "./register.errorHandlers"
import { validateUser } from "./register.helpers"


export const POST_register = async (
  req: any,
  res: any
) => {
  const db = await createMongoConnection()
  try {
    // register user in database
    const newUser = await new userModel(validateUser(req.body)).save()
    // create JWT token
    const token = createJWT(newUser._id.toString())
    // put JWT token in httpOnly cookie
    res.cookie(...spreadableJWTCookieProps(token))
    // return to frontend
    res.status(201).send("User uploaded succesfully")
  } catch (error) {
    res.status(200).json(handleErrors(error))
  } finally {
    db.disconnect()
  }
}