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
exports.changeUserInfo = exports.deleteUser = exports.changePassword = exports.getOneUser = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const Book_1 = require("../models/Book");
dotenv_1.default.config();
const salt = process.env.BCRYPT_SALT;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find().select(['-Password', '-Token']);
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({ message: 'server error', error });
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findById(req.params.userID).select(['-Password', '-Token']);
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: 'server error', error });
    }
});
exports.getOneUser = getOneUser;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { Password, currentPassword } = req.body;
        const userID = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const user = yield User_1.User.findById(userID);
        if (!user)
            return res.status(400).json({ message: 'not allowed' });
        const checkPassword = yield bcrypt_1.default.compare(currentPassword, user === null || user === void 0 ? void 0 : user.Password);
        if (!checkPassword)
            return res.status(400).json({ message: 'wrong password' });
        let hashPassword;
        if (salt)
            hashPassword = yield bcrypt_1.default.hash(Password, bcrypt_1.default.genSaltSync(parseInt(salt)));
        yield User_1.User.updateOne({ _id: userID }, { Password: hashPassword, Token: '' });
        res.status(200).json({ message: 'change password success, please login again with new password' });
    }
    catch (error) {
        res.status(500).json({ message: 'server error', error });
    }
});
exports.changePassword = changePassword;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Book_1.Book.deleteMany({ AuthorID: req.params.userID });
        yield User_1.User.deleteOne({ _id: req.params.userID });
        res.status(200).json({ message: 'deleted author and book' });
    }
    catch (error) {
        res.status(500).json({ message: 'server error', error });
    }
});
exports.deleteUser = deleteUser;
const changeUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        yield User_1.User.updateOne({ _id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id }, { Name: req.body.Name });
        res.status(200).json({ message: 'update success' });
    }
    catch (error) {
        res.status(500).json({ message: 'server error', error });
    }
});
exports.changeUserInfo = changeUserInfo;
