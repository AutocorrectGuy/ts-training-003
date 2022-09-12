import { createMongoConnection } from "../../routes.helpers"
import userModel from "../../../dbModels/user.model"
import { handleErrors } from "./login.errorHandlers"
import { createJWTSandPutCookies } from "../../../middleware/verifyTokens/jwtHandling.helpers"
import { getEnv } from "../../../server.helpers"

export const POST_login = async (
  req: any,
  res: any
) => {

  const db = await createMongoConnection()
  const { username, password } = req.body

  try {
    // login user
    const user = await userModel.login(username, password)

    // double check if user exists
    if (!user) return res.status(200).json(handleErrors("Šāds lietotājs nav reģistrēts"))
    createJWTSandPutCookies(res, user)
    // return to frontend
    res.status(200).send("Login succesffull")
  } catch (error) {
    console.log(error)
    res.status(200).json(handleErrors(error))
  } finally {
    await db.disconnect()
  }
}