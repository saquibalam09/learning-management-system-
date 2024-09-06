import { Router } from "express";
import { register, login, logout, getProfile, forgotPassword, resetPassword, changePassword, updateUser } from "../controllers/user.controller.js";

import upload from "../middlewares/multer.middleware.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/register', upload.single("avatar"), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me',isLoggedIn, getProfile);
router.post('/reset', forgotPassword);
router.post('/reset/:resetToken', resetPassword);
router.post('/change-password', isLoggedIn, changePassword);
router.put("/update/:id", upload.single('avatar') , isLoggedIn , updateUser);



export default router;