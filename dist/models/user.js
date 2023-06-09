"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../util/database"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    firstName: sequelize_1.DataTypes.STRING,
    lastName: sequelize_1.DataTypes.STRING,
    image: sequelize_1.DataTypes.STRING,
    pdf: { type: sequelize_1.DataTypes.BLOB, allowNull: true },
}, {
    timestamps: true,
    sequelize: database_1.default,
    paranoid: true,
});
exports.default = User;
