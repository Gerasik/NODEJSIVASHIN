"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../controllers/users"));
const upload_1 = __importDefault(require("../middleware/upload"));
const authJwt_1 = require("../middleware/authJwt");
const router = express_1.default.Router();
router.get("/", [authJwt_1.verifyToken], users_1.default.getUsers);
router.get("/:userId", [authJwt_1.verifyToken], users_1.default.getUser);
router.post("/", [authJwt_1.verifyToken], upload_1.default.single("avatar"), users_1.default.createUser);
router.put("/:userId", [authJwt_1.verifyToken], users_1.default.updateUser);
router.delete("/:userId", [authJwt_1.verifyToken], users_1.default.deleteUser);
router.post("/pdf", [authJwt_1.verifyToken], users_1.default.createPdf);
exports.default = router;
