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
exports.getMe = exports.signIn = exports.createUser = void 0;
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const salt = process.env.BCRYPT_SALT;
const secret = process.env.JWT_SECRET;
const expire = process.env.JWT_EXPIRE;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Password, Email } = req.body;
        let hashPassword;
        if (salt)
            hashPassword = yield bcrypt_1.default.hash(Password, bcrypt_1.default.genSaltSync(parseInt(salt)));
        yield User_1.User.create({ Name, Email, Password: hashPassword });
        res.status(200).json({ message: 'create user success' });
    }
    catch (error) {
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.createUser = createUser;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        const user = yield User_1.User.findOne({ Email });
        if (!user)
            return res.status(400).json({ message: 'wrong email' });
        const checkPassword = yield bcrypt_1.default.compare(Password, user.Password);
        if (!checkPassword)
            return res.status(400).json({ message: 'wrong password' });
        let token;
        if (secret)
            token = jsonwebtoken_1.default.sign({ Email, _id: user._id, Role: user.Role }, secret, { expiresIn: expire });
        yield User_1.User.updateOne({ _id: user._id }, { Token: token });
        res.status(200).json({ message: 'login success', token });
    }
    catch (error) {
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.signIn = signIn;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ user: req.user });
    }
    catch (error) {
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.getMe = getMe;
