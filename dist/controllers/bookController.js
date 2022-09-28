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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookByAuthor = exports.deleteBook = exports.updateBook = exports.addBook = exports.getOneBook = exports.countAllBooks = exports.getAllBooks = void 0;
const Book_1 = require("../models/Book");
const Category_1 = require("../models/Category");
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Book_1.Book.find().populate('CategoryID').populate('AuthorID');
        res.status(200).json({ books });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.getAllBooks = getAllBooks;
const countAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Book_1.Book.count();
        res.status(200).json({ books });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.countAllBooks = countAllBooks;
const getOneBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const BookID = req.params.bookID;
        const books = yield Book_1.Book.findOne({ _id: BookID }).populate('CategoryID').populate('AuthorID');
        res.status(200).json({ books });
    }
    catch (error) {
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.getOneBook = getOneBook;
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { Name, CategoryID } = req.body;
        const AuthorID = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const book = yield Book_1.Book.create({ Name, CategoryID, AuthorID });
        res.status(200).json({ book });
    }
    catch (error) {
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.addBook = addBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const BookID = req.params.bookID;
        const { Name, CategoryID } = req.body;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        const checkOwner = yield Book_1.Book.findOne({ _id: BookID, AuthorID: userId });
        if (!checkOwner)
            return res.status(400).json({ message: 'not allowed' });
        const book = yield Book_1.Book.findOneAndUpdate({ _id: BookID }, { Name, CategoryID }, { new: true, runValidators: true });
        res.status(200).json({ book, message: 'update success' });
    }
    catch (error) {
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const BookID = req.params.bookID;
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        const checkOwner = yield Book_1.Book.findOne({ _id: BookID, AuthorID: userId });
        if (!checkOwner)
            return res.status(400).json({ message: 'not allowed' });
        yield Book_1.Book.deleteOne({ _id: BookID });
        res.status(200).json({ message: 'delete success' });
    }
    catch (error) {
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.deleteBook = deleteBook;
const getBookByAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AuthorID = req.params.userID;
        const bookGroup = yield Book_1.Book.aggregate([{ $match: { AuthorID: AuthorID } },
            { $group: {
                    _id: '$CategoryID',
                    books: { $push: { Name: '$Name', CategoryID: "$CategoryID", AuthorID: '$AuthorID' } }
                } }
        ]);
        yield Category_1.Category.populate(bookGroup, { path: 'books.CategoryID' });
        res.status(200).json({ bookGroup });
    }
    catch (error) {
        res.status(500).json({ error, message: 'server error' });
    }
});
exports.getBookByAuthor = getBookByAuthor;
