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
    res.status(500).json({ message: "서버 에러" });
  }
});

app.listen(3000, () => {
  console.log("서버가 3000 포트에서 정상적으로 실행 중입니다.");
});
