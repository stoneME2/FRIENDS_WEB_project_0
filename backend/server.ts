import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("셉쎄요는 당신 유행어 - 하셨쎄요는 나의 유행어");
});

app.post("/signup", async (req, res) => {
  try {
    const { nickname, email, password } = req.body;

    if (!nickname || !email || !password) {
      throw new Error("400");
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (email == user?.email) {
      throw new Error("409");
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
    if (err instanceof Error) {
      if (err.message === "400")
        return res.status(400).json("빠진 문항이 없도록 작성해주세요.");
      if (err.message === "409")
        return res.status(409).json("중복된 이메일입니다.");
    }
  }
});

app.listen(3000, () => {
  console.log("서버가 3000 포트에서 정상적으로 실행 중입니다.");
});
