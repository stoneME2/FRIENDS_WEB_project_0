import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("셉쎄요는 당신 유행어 - 하셨쎄요는 나의 유행어");
});

app.listen(PORT, (err) => {
  if(err) {
    console.error('서버 실행 실패:', err);
    return;
  }
  console.log("서버가 3000 포트에서 정상적으로 실행 중입니다.");
});
