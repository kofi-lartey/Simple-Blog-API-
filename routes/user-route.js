import { Router } from "express";
import { login, register } from "../controllers/user-controller.js";

export const userRoute = Router();

userRoute.post('/register',register)
userRoute.post('/login',login)