import express from 'express';
import { historyController } from './server';

export const historyRoutes = express.Router();

historyRoutes.get('/game', historyController.getRoundData)//Method: GET '/api/history/game/:gameId
