import { Request, Response } from "express";
import {
  loginUserService,
  signupUserService,
  getUserService,
} from "./user.service";

export const signupController = async (req: Request, res: Response) => {
  try {
    const result = await signupUserService(req.body);

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      if (err.message === "모든 항목을 입력해주시길 바랍니다.") {
        return res.status(400).json({ message: err.message });
      }

      if (err.message === "이미 존재하는 이메일입니다.") {
        return res.status(409).json({ message: err.message });
      }

      return res.status(500).json({ message: "서버 에러가 발생했습니다." });
    }
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const result = await loginUserService(req.body);

    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "존재하지 않는 이메일입니다.") {
        return res.status(404).json({ message: "존재하지 않는 유저입니다." });
      }

      if (err.message === "모든 항목을 입력해주시길 바랍니다.") {
        return res.status(400).json({ message: err.message });
      }

      return res.status(500).json({ message: "서버 에러가 발생했습니다." });
    }
  }
};

export const getMeController = (req: Request, res: Response) => {
  try {
    const result = getUserService(req.body);

    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
};
