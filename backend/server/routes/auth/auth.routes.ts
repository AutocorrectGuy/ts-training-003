import e, { Router, Request, Response, NextFunction } from "express"
import { POST_login } from "./login/login.controllers"
import { POST_register } from "./register/register.controllers"
import jwt from "jsonwebtoken"
import { getEnv } from "../../server.helpers"

const router = Router()

router.post("/login", POST_login)
router.post("/register", POST_register)


const testPosts = [
  {
    id: 1,
    name: "name1"
  },
  {
    id: 2,
    name: "name2"
  },
  {
    id: 3,
    name: "name3"
  }
]

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies.jwt
  console.log(accessToken)
  if (accessToken) {
    jwt.verify(accessToken, <string>getEnv("ACCESS_TOKEN_SECRET"), (err: any, data: any) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
  }
  next()
}
router.get("/posts", authenticateToken, (req, res) => {
  res.status(200).json(testPosts)
})

export default router