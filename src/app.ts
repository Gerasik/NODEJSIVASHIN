import express, { Request, Response } from "express"
import bodyparser from "body-parser"
import db from "./util/database"
import userRoute from "./routes/users"
import path from "path"

const app = express()

app.set("view engine", "ejs")

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  next()
})

app.use(express.static(path.join(__dirname, "../public")))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

//test route
app.get("/", (req: Request, res: Response) => {
  res.render("pages/index")
})

app.get("/create_new", (req: Request, res: Response) => {
  res.render("pages/new")
})

//CRUD routes
app.use("/users", userRoute)

//sync database
db.sync({ force: true })
  .then((result) => {
    console.log("Database connected")
    app.listen(3000)
  })
  .catch((err) => console.log(err))
