import Sequelize from "sequelize"
import db from "../util/database"

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: { type: Sequelize.STRING, allowNull: false },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  image: Sequelize.STRING,
  pdf: Sequelize.BLOB,
})

export default User
