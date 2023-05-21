"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("./../controllers/auth");
const verifySignUp_1 = require("../middleware/verifySignUp");
const router = express_1.default.Router();
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
router.post("/signup", [verifySignUp_1.checkDuplicateUsernameOrEmail], auth_1.signup);
router.post("/signin", auth_1.signin);
exports.default = router;
