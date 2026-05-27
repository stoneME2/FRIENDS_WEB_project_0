import express from 'express';
import { verifyToken } from '../../middleware/auth.middleware';
import { createRoomController } from './room.controller';

const roomRouter = express.Router();

roomRouter.post('/', verifyToken, createRoomController);

export default roomRouter;
