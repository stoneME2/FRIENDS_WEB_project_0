import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/auth.middleware";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("셉쎄요는 당신 유행어 - 하셨쎄요는 나의 유행어");
});

app.post("/signup", async (req, res) => {
  try {
    const { nickname, email, password } = req.body;

    if (!nickname || !email || !password) {
      return res
        .status(400)
        .json({ message: "모든 항목을 작성해주시길 바랍니다." });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (email == user?.email) {
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }

    await prisma.user.create({
      data: {
        nickname,
        email,
        password,
      },
    });
    res.send("정상적으로 회원가입이 완료되었습니다.");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "이메일, 비밀번호 모두 입력해주시기 바랍니다." });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "존재하지 않는 이메일입니다." });
    }

    if (req.body.password !== user.password) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign(
      {
        type: "JWT",
        user: user.id,
        email: user.email,
      },
      process.env.SECRET_KEY!,
      {
        expiresIn: process.env.EXPIREIN! as jwt.SignOptions["expiresIn"], //env 값은 런타임에 들어옴, expiresIn => 특수 타입으로 정의되어 있음 ex) "15m"
      },
    );

    return res.status(200).json({
      message: "정상적으로 로그인이 완료되었습니다.",
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
});

app.get("/me", verifyToken, (req, res) => {
  const { email, nickname } = req.user!;
  return res.status(200).json({ email, nickname});
});

app.listen(PORT, (err) => {
  if(err) {
    console.error('서버 실행 실패:', err);
    return;
  }
  console.log("서버가 3000 포트에서 정상적으로 실행 중입니다.");
});
