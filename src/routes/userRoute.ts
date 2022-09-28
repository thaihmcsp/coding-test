import { Router } from "express";
import { changePassword, changeUserInfo, deleteUser, getAllUsers, getOneUser } from "../controllers/userController";
import { checkAdmin, checkToken } from "../middleWare/auth";
import { changeInfoValidate, changePasswordValidate, getOneUserValidate } from "../middleWare/validator/userValidate";
const router = Router();

router.get('/get-all-users', checkToken, checkAdmin, getAllUsers);
router.get('/get-one-user/:userID', checkToken, getOneUserValidate, getOneUser);
router.patch('/change-password', checkToken, changePasswordValidate, changePassword);
router.patch('/update-user-info', checkToken, changeInfoValidate, changeUserInfo);
router.delete('/delete-user/:userID', checkToken, checkAdmin, getOneUserValidate, deleteUser);

export default router;