"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../controllers/users"));
const upload_1 = __importDefault(require("../middleware/upload"));
const router = express_1.default.Router();
router.get("/", users_1.default.getUsers);
// router.get('/:userId', controller.getUser); // /users/:userId
router.post("/", upload_1.default.single("avatar"), users_1.default.createUser);
router.put("/:userId", users_1.default.updateUser); // /users/:userId
router.delete("/:userId", users_1.default.deleteUser);
exports.default = router;
