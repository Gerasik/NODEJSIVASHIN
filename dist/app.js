"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./util/database"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
//test route
app.get("/", (req, res) => {
    res.render("pages/index");
});
app.get("/create_new", (req, res) => {
    res.render("pages/new");
});
//CRUD routes
app.use("/users", users_1.default);
//sync database
database_1.default.sync({ force: true })
    .then((result) => {
    console.log("Database connected");
    app.listen(3000);
})
    .catch((err) => console.log(err));
