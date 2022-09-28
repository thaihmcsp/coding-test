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
exports.createBook = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Book_1 = require("../models/Book");
const Category_1 = require("../models/Category");
const User_1 = require("../models/User");
const faker_1 = require("@faker-js/faker");
const bcrypt_1 = __importDefault(require("bcrypt"));
mongoose_1.default.connect(`mongodb://localhost/bookApp`);
const createRandomUser = () => __awaiter(void 0, void 0, void 0, function* () {
    let password = faker_1.faker.internet.password();
    try {
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        return {
            Name: faker_1.faker.internet.userName(),
            Email: faker_1.faker.internet.email(),
            Password: hashPassword
        };
    }
    catch (error) {
        return error;
    }
});
const createRandomBook = () => __awaiter(void 0, void 0, void 0, function* () {
    // let password = faker.internet.password();
    try {
        const category = yield Category_1.Category.findOne();
        const user = yield User_1.User.findOne();
        yield Book_1.Book.create({
            Name: faker_1.faker.internet.userName(),
            CategoryID: category === null || category === void 0 ? void 0 : category._id,
            AuthorID: user === null || user === void 0 ? void 0 : user._id
        });
    }
    catch (error) {
        return error;
    }
});
const createBook = () => {
    for (let i = 0; i < 1000; i++) {
        createRandomBook();
    }
};
exports.createBook = createBook;
