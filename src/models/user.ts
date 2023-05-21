import { Optional, DataTypes, Model } from "sequelize"
import db from "../util/database"

interface UserFiled {
  id: number
  email: string
  firstName?: string
  lastName?: string
  image?: string
  pdf?: Blob
}

export interface IngredientInput extends Optional<UserFiled, "id"> {}
export interface IngredientOutput extends Required<UserFiled> {}

class User extends Model<UserFiled, IngredientInput> implements UserFiled {
  public id!: number
  public email!: string
  public firstName!: string
  public lastName!: string
  public image!: string
  public pdf!: Blob

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    image: DataTypes.STRING,
    pdf: { type: DataTypes.BLOB, allowNull: true },
  },
  {
    timestamps: true,
    sequelize: db,
    paranoid: true,
  }
)

export default User
