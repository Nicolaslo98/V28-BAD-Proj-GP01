import express, { Request, Response } from "express";
import { roomController } from "./server";
export const roomRoutes = express.Router();

roomRoutes.post("/",roomController.createRoom)