"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDuplicateUsernameOrEmail = void 0;
const admin_1 = __importDefault(require("../models/admin"));
const checkDuplicateUsernameOrEmail = (req, res, next) => {
    console.log("🚀 ~ file: verifySignUp.ts:10 ~ req.body:", req.body);
    const userName = req.body.userName;
    if (!userName) {
        res.status(400).send({ message: "userName is required" });
    }
    admin_1.default.findOne({
        where: {
            userName: req.body.userName,
        },
    }).then((admin) => {
        if (admin) {
            res.status(400).send({
                message: "Failed! Username is already in use!",
            });
            return;
        }
        admin_1.default.findOne({
            where: {
                email: req.body.email,
            },
        }).then((admin) => {
            if (admin) {
                res.status(400).send({
                    message: "Failed! Email is already in use!",
                });
                return;
            }
            next();
        });
    });
};
exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;
