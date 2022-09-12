import userModel from "../../../dbModels/user.model"
import { createMongoConnection } from "../../routes.helpers"
import { createJWTSandPutCookies } from "../../../middleware/verifyTokens/jwtHandling.helpers"
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
    createJWTSandPutCookies(res, newUser)
    // return to frontend
    res.status(201).send("User uploaded succesfully")
  } catch (error) {
    res.status(200).json(handleErrors(error))
  } finally {
    await db.disconnect()
  }
}