import express from 'express';
import cors from 'cors';
import userRouter from './domains/user/user.router';
import roomRouter from './domains/room/room.router';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req,res) => {
    res.json({ 
        status: "ok",
        message: "health check 완료",
    })
})

app.use("/api/auth", userRouter);
app.use("/api/room", roomRouter);

export default app;