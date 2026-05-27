import { Request, Response } from "express";
import { createRoomService } from "./room.service";

export const createRoomController = async (req: Request, res: Response) => {
  try {
    const result = await createRoomService(req.body, req.user);
    res.status(201).json({ result });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
};
