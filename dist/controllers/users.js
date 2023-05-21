"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfkit_1 = __importDefault(require("pdfkit"));
const blob_stream_1 = __importDefault(require("blob-stream"));
const user_1 = __importDefault(require("../models/user"));
const getUsers = (_req, res) => {
    user_1.default.findAll()
        .then((users) => {
        res.status(200).json({ users: users });
    })
        .catch((err) => console.log(err));
};
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield user_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "User not found!" });
        }
        else {
            res.status(200).json({ message: "User founded!", user });
        }
    }
    catch (error) {
        console.log(error);
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const image = req.file ? req.file.filename : "";
    const user = yield user_1.default.findOne({ where: { email } });
    if (user) {
        res.status(400).json({ message: "User already exist" });
    }
    else {
        try {
            const newUser = yield user_1.default.create({
                email,
                firstName,
                lastName,
                image,
            });
            res.status(201).send({ message: "User created!", user: newUser });
        }
        catch (error) {
            console.log(error);
        }
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const image = req.file ? req.file.path : "";
    try {
        const user = yield user_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "User not found!" });
        }
        else {
            if (email) {
                user.email = email;
            }
            if (firstName) {
                user.firstName = firstName;
            }
            if (lastName) {
                user.lastName = lastName;
            }
            if (image) {
                user.image = image;
            }
            const result = yield user.save();
            res.status(200).json({ message: "User updated!", user: result });
        }
    }
    catch (error) {
        console.log(error);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield user_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "User not found!" });
        }
        else {
            yield user_1.default.destroy({
                where: {
                    id: userId,
                },
            });
            res.status(200).json({ message: "User deleted!" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
const createPdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield user_1.default.findOne({ where: { email } });
    if (!user) {
        res.status(400).json({ message: "User not found", result: false });
    }
    else {
        const pdf = yield generatePDF(`${user.firstName} ${user.lastName}`, user.image ? "public/" + user.image : "");
    }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const image = req.file ? req.file.filename : "";
    const imagePath = req.file ? req.file.path : "";
    const user = yield user_1.default.findOne({ where: { email } });
    if (user) {
        res.status(400).json({ message: "User already exist" });
    }
    else {
        try {
            const newUser = yield user_1.default.create({
                email,
                firstName,
                lastName,
                image,
                pdf,
            });
            res.status(201).send({ message: "User created!", user: newUser });
        }
        catch (error) {
            console.log(error);
        }
    }
});
function generatePDF(text, image) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const doc = new pdfkit_1.default();
            const stream = doc.pipe((0, blob_stream_1.default)());
            doc.text(text);
            doc.image(image, { fit: [500, 500] });
            doc.end();
            stream.on("finish", () => {
                const blob = stream.toBlob();
                resolve(blob);
            });
            stream.on("error", reject);
        });
    });
}
exports.default = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    createPdf,
};
