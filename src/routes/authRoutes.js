import { Router } from "express";
import { loginUserSchema, registerUserSchema } from "../validations/authValidations.js";
import { login, logoutUser, refreshUserSession, register } from "../controllers/authControllers.js";
import { celebrate } from "celebrate";
const router=Router();

router.post('/auth/register',celebrate(registerUserSchema),register);
router.post('/auth/login', celebrate(loginUserSchema),login);
router.post('/auth/logout',logoutUser);
router.post('/auth/refresh',refreshUserSession);

export default router;
