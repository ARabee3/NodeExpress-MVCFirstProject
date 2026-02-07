import express from "express";
import hashPassword from "../../Middlewares/auth/hashPassword.js";
import { signup, signin, verifyEmail } from "./user.controller.js";
import { validate } from "../../Middlewares/validation.js";
import { signupVal, signinVal } from "./user.validation.js";

const userRouter = express.Router();

userRouter.post("/signup", validate(signupVal), hashPassword, signup);
userRouter.post("/signin", validate(signinVal), signin);
userRouter.get("/verify/:token", verifyEmail);

export default userRouter;
