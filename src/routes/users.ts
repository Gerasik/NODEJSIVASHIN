import express from "express"
import controller from "../controllers/users"

const router = express.Router()

router.get("/", controller.getUsers)
router.post("/create", controller.createUser)

export default router
