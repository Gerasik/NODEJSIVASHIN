import { Sequelize } from "sequelize"

const sequelize = new Sequelize("db_name", "postgres", "password", {
  host: "db",
  dialect: "postgres",
})

export default sequelize
