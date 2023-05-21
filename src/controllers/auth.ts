import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import Admin from "../models/admin"
import { Request, Response } from "express"
import { SECRET } from "../util/auth"

export const signup = (req: Request, res: Response) => {
  Admin.create({
    userName: req.body.userName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.send({ message: "User was registered successfully!" })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

export const signin = (req: Request, res: Response) => {
  Admin.findOne({
    where: {
      userName: req.body.userName,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." })
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        })
      }

      var token = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: 86400,
      })

      res.status(200).send({
        id: user.id,
        userName: user.userName,
        email: user.email,
        accessToken: token,
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}
