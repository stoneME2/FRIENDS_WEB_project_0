import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get("/", (req,res) => {
  res.send('셉쎄요는 당신 유행어 - 하셨쎄요는 나의 유행어');
});

app.post("/signup", async (req, res) => {
  try {
    const { nickname, email, password } = req.body;

    if (!nickname || !email || !password) {
      return res
        .status(400)
        .json({ message: '모든 항목을 작성해주시길 바랍니다.' });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (email == user?.email) {
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.'});
    }

    await prisma.user.create({
      data: {
        nickname,
        email,
        password,
      },
    });
    res.send('정상적으로 회원가입이 완료되었습니다.');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

app.post('/login', async (req, res) => {
    try {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: '이메일, 비밀번호 모두 입력해주시기 바랍니다.'});
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(!user) {
        return res.status(404).json({ message: '존재하지 않는 이메일입니다.'});
    }

    if(req.body.password !== user.password) {
        return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.'});
    }

    const token = jwt.sign(
        { 
        type: "JWT",
        user: user.id,
        email: user.email,
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '15m',
        }
    )

    return res.status(200).json({
        message: "정상적으로 로그인이 완료되었습니다.",
        token,
    })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: '서버 에러가 발생했습니다.'});
    }
})

interface JwtPaylod {
    type: string;
    user: string;
    email: string;
}

app.get("/me", async (req, res) => {
    try{ 

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
  })

  return res.status(200).json({ user });

} catch (err) {
    console.error(err);

    if(err instanceof TokenExpiredError) { //err.message === 'jwt expired' 정확한 타입 인지를 위함
        return res.status(403).json({message: '토큰이 만료되었습니다.'})
    }

    return res.status(500).json({ message: '서버 에러가 발생했습니다.'});
}
});

app.listen(3000, () => {
  console.log("서버가 3000 포트에서 정상적으로 실행 중입니다.");
});
