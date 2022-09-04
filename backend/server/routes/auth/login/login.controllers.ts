import { createMongoConnection } from "../../routes.helpers"
import userModel from "../../../dbModels/user.model"
import { handleErrors } from "./login.errorHandlers"
import { createJWT, spreadableJWTCookieProps } from "../jwtHandling/jwtHandling"

export const POST_login = async (
  req: any,
  res: any
) => {
  const db = await createMongoConnection()
  const { username, password } = req.body
  try {
    // login user
    const user = await userModel.login(username, password)
    // create JWT token
    const token = createJWT(user ? user._id.toString() : "")
    // put JWT token in httpOnly cookie
    res.cookie(...spreadableJWTCookieProps(token))
    // return to frontend
    res.status(200).send(user?._id)
  } catch (error) {
    res.status(200).json(handleErrors(error))
  } finally {
    db.disconnect()
  }
}