import express from 'express';
import { RoundData } from '../utils/history';
import { historyController } from './server';

export const historyRoutes = express.Router();

historyRoutes.get('/round/:roundId', historyController.getRoundData)
