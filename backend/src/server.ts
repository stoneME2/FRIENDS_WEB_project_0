import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 정상적으로 실행 중입니다.`);
});
