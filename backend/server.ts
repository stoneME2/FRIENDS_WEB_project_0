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
  const { nickname, email, password } = req.body;
  await prisma.user.create({
    data: {
      nickname,
      email,
      password,
    },
  });
  res.send("정상적으로 회원가입이 완료되었습니다.");
  console.log("정상적으로 회원가입이 완료되었습니다.");
});

app.listen(3000, () => {
  console.log("서버가 3000 포트에서 정상적으로 실행 중입니다.");
});
