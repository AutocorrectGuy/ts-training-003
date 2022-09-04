import { Request, Response } from "express"

export const clearTokens = (res: Response) => {
  res.cookie("JWT_REFRESH_TOKEN", "", { maxAge: 1 });
  res.cookie("JWT_ACCESS_TOKEN", "", { maxAge: 1 });
}

export const POST_logout = (req: Request, res: Response) => {
  console.log("deleting cookies");
  
  clearTokens(res)
  res.status(200).send("logged out")
}