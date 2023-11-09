import express from 'express';
import { eplayerController } from './server';

export const eplayerRoutes = express.Router();

eplayerRoutes.get('/room/:roomId', eplayerController.getEPlayerData)//Method: GET '/api/eplayer/room/:roomId