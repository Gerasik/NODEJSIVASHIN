import express, { Request, Response } from "express"
import db from "./util/database"
import userRoute from "./routes/users"

const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  next()
})

//test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World")
})

//CRUD routes
app.use("/users", userRoute)

//sync database
db.sync()
  .then((result) => {
    console.log("Database connected")
    app.listen(3000)
  })
  .catch((err) => console.log(err))
