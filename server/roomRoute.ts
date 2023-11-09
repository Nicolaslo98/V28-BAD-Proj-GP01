import express, { Request, Response } from "express";
import { roomController } from "./server";
export const roomRoutes = express.Router();

roomRoutes.post("/check",roomController.checkRoom)//Method: POST '/api/room
//Potato change check room fetch url
roomRoutes.post("/create",roomController.createRoom)//Method: POST '/api/room/create
roomRoutes.post("/join", roomController.joinRoom)//Method: POST '/api/room/join