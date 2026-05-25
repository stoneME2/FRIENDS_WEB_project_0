import express from "express";
import { signupController, loginUserController, getMeController } from "./user.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const app = express();

app.post("/signup", signupController);
app.post("/login", loginUserController);
app.get("/me", verifyToken, getMeController);
