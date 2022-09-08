import jwt from "jsonwebtoken"
import { getEnv } from "../../../server.helpers"
import { Response } from "express"
import { clearTokens } from "../logout/logout.controllers"

type JWTTokeType = "ACCESS" | "REFRESH"

// token age in SECONDS
const AGE = {
  ACCESS: 20, // 20 seconds
  REFRESH: 60 * 60 // one hour
}

export const createJWT = (tokenType: JWTTokeType, _id: string) => jwt.sign(
  { _id },
  <string>getEnv(`${tokenType}_TOKEN_SECRET`),
  { expiresIn: AGE[tokenType] }
)

export const putTokenInCookie = (
  res: Response,
  tokenType: JWTTokeType,
  jwt: any
) => res.cookie(
  `JWT_${tokenType}_TOKEN`,
  jwt,
  {
    httpOnly: true,
    maxAge: AGE[tokenType] * 1000
  }
)

// this cookie is used in useLoginStatus hooks

export const createLogInCookie = (res: Response) => res
  .cookie("isLoggedIn", true)

export const createJWTSandPutCookies = (res: Response, foundUser: any) => {
  // create new access and refresh tokens
  clearTokens(res)
  const accessToken = createJWT("ACCESS", foundUser._id.toString())
  const refreshToken = createJWT("REFRESH", foundUser._id.toString())
  // set tokens into cookies
  putTokenInCookie(res, "ACCESS", accessToken)
  putTokenInCookie(res, "REFRESH", refreshToken)
  createLogInCookie(res)
}