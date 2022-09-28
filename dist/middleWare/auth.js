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
exports.checkAdmin = exports.checkToken = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token || !secret)
            return res.status(400).json({ message: 'not loged in' });
        const data = jsonwebtoken_1.default.verify(token, secret);
        const user = yield User_1.User.findOne({ _id: data._id, Token: token }).select(['-Token', '-Password']);
        if (!user)
            return res.status(400).json({ message: 'not authorized' });
        req.user = user;
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'not authorized' });
    }
});
exports.checkToken = checkToken;
const checkAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user.Role !== 'admin')
        return res.status(400).json({ message: 'not allowed' });
    next();
});
exports.checkAdmin = checkAdmin;
