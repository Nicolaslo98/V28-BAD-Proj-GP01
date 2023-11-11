import express from 'express';
import { historyController } from './server';

export const historyRoutes = express.Router();

historyRoutes.get('/round/:roundId', historyController.getRoundData)//Method: GET '/api/history/round/:roundId
