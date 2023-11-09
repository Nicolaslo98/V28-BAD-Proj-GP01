import express from 'express';
import { HistoryController } from '../controller/history-controller';
export const historyRoutes = express.Router();

export interface RoundData {
  id: number;
  roomId: number;
  player1: string;
  player2: string;
  player3: string;
  player4: string;
  score1: number;
  score2: number;
  score3: number;
  score4: number;
}

const router = express.Router();
const controller = new HistoryController();

router.get('/round/:roundId', async (req, res) => {
  await controller.getRoundData(req, res);
});

export default router;