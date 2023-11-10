import express from 'express';
import { rankController } from './server';
export const rankRoutes = express.Router();

rankRoutes.get('/room/:roomId', rankController.getRankData)//Method: GET '/api/rank/room/:roomId