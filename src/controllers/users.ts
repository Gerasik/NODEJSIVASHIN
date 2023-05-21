import { Request, Response } from "express"
import PDFDocument from "pdfkit"
import blobStream from "blob-stream"

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

const createUser = async (req: Request, res: Response) => {
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const image = req.file ? req.file.filename : ""
  const imagePath = req.file ? req.file.path : ""
  const user = await User.findOne({ where: { email } })
  const pdf = await generatePDF(`${firstName} ${lastName}`, imagePath)
  if (user) {
    res.status(400).json({ message: "User already exist" })
  } else {
    try {
      const newUser = await User.create({
        email,
        firstName,
        lastName,
        image,
        pdf,
      })

      res.status(201).send({ message: "User created!", user: newUser })
    } catch (error) {
      console.log(error)
    }
  }
}

async function generatePDF(text: string, image: string): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    const doc = new PDFDocument()
    const stream = doc.pipe(blobStream())

    doc.text(text)
    doc.image(image, { fit: [500, 500] })

    doc.end()
    stream.on("finish", () => {
      const blob = stream.toBlob()
      resolve(blob)
    })
    stream.on("error", reject)
  })
}

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const image = req.file ? req.file.path : ""

  try {
    const user = await User.findByPk(userId)
    if (!user) {
      res.status(404).json({ message: "User not found!" })
    } else {
      if (email) {
        user.email = email
      }
      if (firstName) {
      }
      if (lastName) {
      }
      if (image) {
      }
      const result = await user.save()
      res.status(200).json({ message: "User updated!", user: result })
    }
  } catch (error) {
    console.log(error)
  }
  // const updatedName = req.body.name;
  // const updatedEmail = req.body.email;
  // User.findByPk(userId)
  //   .then(user => {
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found!' });
  //     }
  //     user.name = updatedName;
  //     user.email = updatedEmail;
  //     return user.save();
  //   })
  //   .then(result => {
  //     res.status(200).json({message: 'User updated!', user: result});
  //   })
  //   .catch(err => console.log(err));
}

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId
  try {
    const user = await User.findByPk(userId)
    if (!user) {
      res.status(404).json({ message: "User not found!" })
    } else {
      await User.destroy({
        where: {
          id: userId,
        },
      })
      res.status(200).json({ message: "User deleted!" })
    }
  } catch (error) {
    console.log(error)
  }
}

export default { getUsers, createUser, updateUser, deleteUser }
