import { Router } from "express"
import { POST_login } from "./login/login.controllers"
import { POST_register } from "./register/register.controllers"
import { verifyTokens } from "./jwtHandling/jwtHandling"
import { POST_logout } from "./logout/logout.controllers"

const router = Router()

router.post("/login", POST_login)

router.post("/register", POST_register)

router.post("/logout", POST_logout)

const testPosts = [{ id: 1, name: "name1" }, { id: 2, name: "name2" }, { id: 3, name: "name3" }]
router.get("/posts", verifyTokens, (req, res) => {
  console.log("hello to content!")
  res.status(200).json({ posts: testPosts })
})

export default router