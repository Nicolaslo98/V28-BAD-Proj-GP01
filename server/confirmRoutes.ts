import express from 'express';
import { confirmFanController } from './server';

export const confirmFanRoutes = express.Router();

confirmFanRoutes.post('/', confirmFanController.confirmFan)//Method: GET '/api/confirmFan
// confirmFanRoutes.get('/', confirmFanController.confirmFan)