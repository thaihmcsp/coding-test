import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, getOneCategory, updateCategory } from "../controllers/categoryController";
import { checkAdmin, checkToken } from "../middleWare/auth";
import { categoryValidate } from "../middleWare/validator/categoryValidate";
const router = Router();

router.get('/get-all-categories', getAllCategory);
router.get('/get-one-category/:categoryID', getOneCategory);
router.post('/create-category', checkToken, checkAdmin, categoryValidate, createCategory);
router.patch('/update-category/:categoryID', checkToken, checkAdmin, categoryValidate, updateCategory);
router.delete('/delete-category/:categoryID', checkToken, checkAdmin, deleteCategory);

export default router;