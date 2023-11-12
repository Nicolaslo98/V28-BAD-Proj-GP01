import express, { Request, Response } from "express";
import { roomController } from "./server";
export const roomRoutes = express.Router();

roomRoutes.get("/", roomController.loginGuard)//Method: POST '/api/room
roomRoutes.post("/check", roomController.checkRoom)//Method: POST '/api/room/check
roomRoutes.post("/create",roomController.createRoom)//Method: POST '/api/room/create
roomRoutes.post("/join", roomController.joinRoom)//Method: POST '/api/room/join
roomRoutes.put("/logout", roomController.logoutRoom)//Method: POST '/api/room/logout