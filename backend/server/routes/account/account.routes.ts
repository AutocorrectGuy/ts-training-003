import{ Router} from "express"
import { verifyTokens } from "../../middleware/verifyTokens/verifyTokens"
import { GET_ACCOUNT } from "./account.controllers"

const router = Router()

router.get("/", verifyTokens, GET_ACCOUNT)

export default router