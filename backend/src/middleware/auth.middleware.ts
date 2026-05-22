import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface JwtPaylod {
  type: string;
  user: string;
  email: string;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction,) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "인증이 유효하지 않습니다." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPaylod; //verify 결과 JwtPayload 타입 단언
    
    const userId = decoded.user;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if(!user) {
        return res.status(404).json({ message: '유저가 존재하지 않습니다.'});
    }

    req.user = user;

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
};
