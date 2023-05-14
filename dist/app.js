"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./util/database"));
const users_1 = __importDefault(require("./routes/users"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
//test route
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "/index.html"));
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
