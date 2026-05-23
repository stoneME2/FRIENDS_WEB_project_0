import { Request, Response } from "express";
import { signupUser } from "./user.service";

export const signup = async (req:Request, res:Response) => {
  try {
    signupUser(req.body);

    res.send("정상적으로 회원가입이 완료되었습니다.");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
}