import express from "express";
import { signup } from "./user.controller";

const app = express();

app.post("/signup", signup);