import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { SECRET } from "../util/auth"

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers["x-access-token"]

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    })
  }

  jwt.verify(token as string, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      })
    }
    if (decoded) {
      // @ts-ignore
      req.userId = (decoded as jwt.JwtPayload).id
    }
    next()
  })
}
