import { Response, Request } from "express"
import { clearTokens } from "../logout/logout.controllers"

// todo: get this deeper for protected routes
export const GET_isAuthorized = (req: Request, res: Response) => {
  // check only refresh token
  const hasRefreshToken = Object.keys(req.cookies).includes("JWT_REFRESH_TOKEN")
  // if there are no refreshtoken, clear all accestokens
  if (!hasRefreshToken) clearTokens(res)
  res.status(200).json({ isLoggedIn: hasRefreshToken })
}