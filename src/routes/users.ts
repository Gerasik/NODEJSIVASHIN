import express from "express"
import controller from "../controllers/users"
import upload from "../middleware/upload"
import { verifyToken } from "../middleware/authJwt"

const router = express.Router()

router.get("/", [verifyToken], controller.getUsers)
router.get("/:userId", [verifyToken], controller.getUser)
router.post("/", [verifyToken], upload.single("avatar"), controller.createUser)
router.put("/:userId", [verifyToken], controller.updateUser)
router.delete("/:userId", [verifyToken], controller.deleteUser)
router.post("/pdf", [verifyToken], controller.createPdf)

export default router
