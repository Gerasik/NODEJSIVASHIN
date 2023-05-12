"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
// CRUD Controllers
//get all users
const getUsers = (_req, res) => {
    user_1.default.findAll()
        .then((users) => {
        res.status(200).json({ users: users });
    })
        .catch((err) => console.log(err));
};
exports.default = { getUsers };
