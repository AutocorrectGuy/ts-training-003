import jwt from "jsonwebtoken"
import { getEnv } from "../../../server.helpers"

const maxAgeInSec = 20
const maxAgeInMili = maxAgeInSec * 1000

export const createJWT = (id: string) => jwt.sign(
  { id }, 
  <string>getEnv("ACCESS_TOKEN_SECRET"),
  { expiresIn: maxAgeInSec }
)
export const spreadableJWTCookieProps = (jwt:any) => [
  "jwt", // cookie name
  jwt,
  {
    httpOnly: true,
    maxAge: maxAgeInMili
  }
]