import express from "express"
import { signin, signup } from "./../controllers/auth"
import { checkDuplicateUsernameOrEmail } from "../middleware/verifySignUp"

const router = express.Router()

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  )
  next()
})

router.post("/signup", [checkDuplicateUsernameOrEmail], signup)

router.post("/signin", signin)

export default router
