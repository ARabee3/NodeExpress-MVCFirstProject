import express from "express";
import hashPassword from "../../Middlewares/auth/hashPassword.js";
import { signup, signin, verifyEmail } from "./user.controller.js";
const userRouter = express.Router();

userRouter.post("/signup", hashPassword, signup);
userRouter.post("/signin", signin);
userRouter.get("/verify/:token", verifyEmail);

export default userRouter;
