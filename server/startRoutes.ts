import express, { Request, Response } from "express";
import { startController } from "./server";
export const startRoutes = express.Router();

startRoutes.post("/", startController.startGame)