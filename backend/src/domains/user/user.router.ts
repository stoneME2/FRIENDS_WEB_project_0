import express from "express";
import { signupController, loginUserController, getMeController } from "./user.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const userRouter = express.Router();

userRouter.post("/register", signupController);
userRouter.post("/login", loginUserController);
userRouter.get("/me", verifyToken, getMeController);

export default userRouter;