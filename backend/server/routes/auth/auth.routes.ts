import { Router } from "express"
import { POST_login } from "./login/login.controllers"
import { POST_register } from "./register/register.controllers"
import { POST_logout } from "./logout/logout.controllers"
import { verifyTokens } from "../../middleware/verifyTokens/verifyTokens"

const router = Router()

// logs useri in: creates access and refresh tokens
router.post("/login", POST_login)

/* creates new user entry in database and then logs user in, 
 creates access and refresh tokens */
router.post("/register", POST_register)

// logs user out: deletes access and refresh tokens
router.post("/logout", POST_logout)

// router.get("/isauthorized", GET_isAuthorized)


const testPosts = [{ id: 1, name: "name1" }, { id: 2, name: "name2" }, { id: 3, name: "name3" }]
router.get("/posts", verifyTokens, (req, res) => {
  console.log("hello to content!")
  res.status(200).json({ posts: testPosts })
})

export default router