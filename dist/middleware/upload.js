"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const date_fns_1 = require("date-fns");
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "public");
    },
    filename(req, file, cb) {
        const date = (0, date_fns_1.format)(new Date(), "ddLLyyyy-HHmmss_SSS");
        cb(null, `${date} - ${file.originalname}`);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.default = (0, multer_1.default)({ storage, fileFilter });
