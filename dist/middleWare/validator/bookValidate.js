"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookValidate = exports.addBookValidate = exports.getOneBookValidate = void 0;
const fastest_validator_1 = __importDefault(require("fastest-validator"));
const v = new fastest_validator_1.default();
const getOneBookValidate = (req, res, next) => {
    const schema = {
        BookID: { type: "string", length: 24 }
    };
    const check = v.compile(schema);
    const result = check({ BookID: req.params.bookID });
    if (result !== true)
        return res.status(400).json({ result });
    next();
};
exports.getOneBookValidate = getOneBookValidate;
const addBookValidate = (req, res, next) => {
    const schema = {
        Name: { type: "string", min: 3, max: 255 },
        CategoryID: { type: "string", length: 24 },
    };
    const check = v.compile(schema);
    const result = check(req.body);
    if (result !== true)
        return res.status(400).json({ result });
    next();
};
exports.addBookValidate = addBookValidate;
const updateBookValidate = (req, res, next) => {
    const schema = {
        Name: { type: "string", min: 3, max: 255 },
        CategoryID: { type: "string", length: 24, optional: true },
        BookID: { type: "string", length: 24 }
    };
    req.body.BookID = req.params.bookID;
    const check = v.compile(schema);
    const result = check(req.body);
    if (result !== true)
        return res.status(400).json({ result });
    next();
};
exports.updateBookValidate = updateBookValidate;
