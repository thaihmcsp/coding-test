"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const auth_1 = require("../middleWare/auth");
const bookValidate_1 = require("../middleWare/validator/bookValidate");
const userValidate_1 = require("../middleWare/validator/userValidate");
const router = (0, express_1.Router)();
router.get('/get-all-books', bookController_1.getAllBooks);
router.get('/count-all-books', bookController_1.countAllBooks);
router.get('/get-one-book/:bookID', bookValidate_1.getOneBookValidate, bookController_1.getOneBook);
router.post('/add-book', auth_1.checkToken, bookValidate_1.addBookValidate, bookController_1.addBook);
router.patch('/update-book/:bookID', auth_1.checkToken, bookValidate_1.updateBookValidate, bookController_1.updateBook);
router.delete('/delete-book/:bookID', auth_1.checkToken, bookValidate_1.getOneBookValidate, bookController_1.deleteBook);
//  get book by author and group by category
router.get('/get-books-by-author/:userID', userValidate_1.getOneUserValidate, bookController_1.getBookByAuthor);
exports.default = router;
