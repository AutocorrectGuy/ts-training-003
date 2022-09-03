import { Router } from "express"
import { POST_login } from "./login/login.controllers"
import { POST_register } from "./register/register.controllers"

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

router.get("/posts", (req, res) => {
  res.status(200).json(testPosts)
})

export default router