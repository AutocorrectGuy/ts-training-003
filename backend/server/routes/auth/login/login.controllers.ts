import { createMongoConnection } from "../../routes.helpers"
import userModel from "../../../dbModels/user.model"
import { handleErrors } from "./login.errorHandlers"
import { createJWT, putTokenInCookie } from "../jwtHandling/jwtHandling"

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
    if(!user) return res.status(200).json(handleErrors("Šāds lietotājs nav reģistrēts"))
    
    // create JWT ACCESS and REFRESH token
    const accessToken = createJWT("ACCESS", user._id.toString())
    const refreshToken = createJWT("REFRESH", user._id.toString())
    // putting JWT token in httpOnly cookie
    putTokenInCookie(res, "ACCESS", accessToken)
    putTokenInCookie(res, "REFRESH", refreshToken)
    // return to frontend
    res.status(200).send("Login succesffull")
  } catch (error) {
    console.log(error)
    res.status(200).json(handleErrors(error))
  } finally {
    await db.disconnect()
  }
}