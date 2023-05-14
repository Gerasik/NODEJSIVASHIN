"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = __importDefault(require("../util/database"));
const User = database_1.default.define("user", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: { type: sequelize_1.default.STRING, allowNull: false },
    firstName: sequelize_1.default.STRING,
    lastName: sequelize_1.default.STRING,
    image: sequelize_1.default.STRING,
    pdf: sequelize_1.default.BLOB,
});
exports.default = User;
