import express from 'express';
import { HistoryController } from '../controller/history-controller';
export const historyRoutes = express.Router();
import { RoundData } from '../utils/history';
import { HistoryService } from '../service/history-service';
import knex from '../main';

const router = express.Router();
const service = new HistoryService(knex);
const controller = new HistoryController(service);

router.get('/round/:roundId', async (req, res) => {
await controller.getRoundData(req, res);
});

export default router;