import { Request, Response } from "express"

import User from "../models/user"

// CRUD Controllers

//get all users
const getUsers = (_req: Request, res: Response) => {
  User.findAll()
    .then((users) => {
      res.status(200).json({ users: users })
    })
    .catch((err) => console.log(err))
}

const createUser = (req: Request, res: Response) => {
  console.log(
    "🚀 ~ file: users.ts:18 ~ createUser ~ req.body.firstName:",
    req.body
  )
  res.status(201).send("created")
}

export default { getUsers, createUser }
