"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("db_name", "postgres", "password", {
    host: "db",
    dialect: "postgres",
});
// const sequelize = new Sequelize(
//   process.env.DB_NAME ?? "",
//   process.env.DB_USER ?? "",
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//   }
// )
exports.default = sequelize;