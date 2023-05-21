import { Optional, DataTypes, Model } from "sequelize"
import db from "../util/database"

interface AdminFiled {
  id: number
  email: string
  userName?: string
  password?: string
}

export interface IngredientInput extends Optional<AdminFiled, "id"> {}
export interface IngredientOutput extends Required<AdminFiled> {}

class Admin extends Model<AdminFiled, IngredientInput> implements AdminFiled {
  public id!: number
  public email!: string
  public userName!: string
  public password!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    timestamps: true,
    sequelize: db,
    paranoid: true,
  }
)

export default Admin
