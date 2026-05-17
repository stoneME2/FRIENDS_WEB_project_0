import express from 'express';

const app = express();

app.listen(3000, () => {
    console.log("서버가 3000 포트에서 정상적으로 실행 중입니다.");
})

app.get('/', (req, res) => {
    res.send("셉쎄요는 당신 유행어 - 하셨쎄요는 나의 유행어");
})
