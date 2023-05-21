import { Request, Response, NextFunction } from "express"
import Admin from "../models/admin"

export const checkDuplicateUsernameOrEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("🚀 ~ file: verifySignUp.ts:10 ~ req.body:", req.body)
  const userName = req.body.userName

  if (!userName) {
    res.status(400).send({ message: "userName is required" })
  }

  Admin.findOne({
    where: {
      userName: req.body.userName,
    },
  }).then((admin) => {
    if (admin) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      })
      return
    }

    Admin.findOne({
      where: {
        email: req.body.email,
      },
    }).then((admin) => {
      if (admin) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        })
        return
      }

      next()
    })
  })
}
