import userModel from "../../../dbModels/user.model"
import { createMongoConnection } from "../../routes.helpers"
import { createJWT, putTokenInCookie } from "../jwtHandling/jwtHandling"
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

    // create JWT ACCESS and REFRESH token
    const accessToken = createJWT("ACCESS", newUser._id.toString())
    const refreshToken = createJWT("REFRESH", newUser._id.toString())
    // putting JWT token in httpOnly cookie
    putTokenInCookie(res, "ACCESS", accessToken)
    putTokenInCookie(res, "REFRESH", refreshToken)
    // return to frontend
    res.status(201).send("User uploaded succesfully")
  } catch (error) {
    res.status(200).json(handleErrors(error))
  } finally {
    await db.disconnect()
  }
}