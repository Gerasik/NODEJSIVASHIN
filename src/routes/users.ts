import express from "express"
import controller from "../controllers/users"
import upload from "../middleware/upload"

const router = express.Router()

router.get("/", controller.getUsers)
// router.get('/:userId', controller.getUser); // /users/:userId
router.post("/", upload.single("avatar"), controller.createUser)
router.put("/:userId", controller.updateUser) // /users/:userId
router.delete("/:userId", controller.deleteUser)

export default router
