import { Sequelize } from "sequelize"

const sequelize = new Sequelize("db_name", "postgres", "password", {
  host: "db",
  dialect: "postgres",
})
// const sequelize = new Sequelize(
//   process.env.DB_NAME ?? "",
//   process.env.DB_USER ?? "",
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//   }
// )

export default sequelize
