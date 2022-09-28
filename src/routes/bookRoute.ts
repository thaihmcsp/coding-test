import { Router } from "express";
import { addBook, countAllBooks, deleteBook, getAllBooks, getBookByAuthor, getOneBook, updateBook } from "../controllers/bookController";
import { checkToken } from "../middleWare/auth";
import { addBookValidate, getOneBookValidate, updateBookValidate } from "../middleWare/validator/bookValidate";
import { getOneUserValidate } from "../middleWare/validator/userValidate";
const router = Router();

router.get('/get-all-books', getAllBooks);
router.get('/count-all-books', countAllBooks);
router.get('/get-one-book/:bookID', getOneBookValidate, getOneBook);
router.post('/add-book', checkToken, addBookValidate, addBook);
router.patch('/update-book/:bookID', checkToken, updateBookValidate, updateBook);
router.delete('/delete-book/:bookID', checkToken, getOneBookValidate, deleteBook);

//  get book by author and group by category
router.get('/get-books-by-author/:userID', getOneUserValidate, getBookByAuthor);

export default router;