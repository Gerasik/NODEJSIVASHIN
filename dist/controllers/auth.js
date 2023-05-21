"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admin_1 = __importDefault(require("../models/admin"));
const auth_1 = require("../util/auth");
const signup = (req, res) => {
    admin_1.default.create({
        userName: req.body.userName,
        email: req.body.email,
        password: bcryptjs_1.default.hashSync(req.body.password, 8),
    })
        .then((user) => {
        res.send({ message: "User was registered successfully!" });
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};
exports.signup = signup;
const signin = (req, res) => {
    admin_1.default.findOne({
        where: {
            userName: req.body.userName,
        },
    })
        .then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcryptjs_1.default.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }
        var token = jsonwebtoken_1.default.sign({ id: user.id }, auth_1.SECRET, {
            expiresIn: 86400, // 24 hours
        });
        res.status(200).send({
            id: user.id,
            userName: user.userName,
            email: user.email,
            accessToken: token,
        });
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};
exports.signin = signin;
