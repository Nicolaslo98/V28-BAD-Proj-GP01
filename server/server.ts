import express from "express";
import dotenv from "dotenv";
import { sessionMiddleware } from "./session";
import { Request, Response } from "express";
import path from "path";
import fs from 'fs';


dotenv.config();
const app = express();

//Knex
import knex from "../main";
import { CaptureController } from "../controller/capture-controller";
import { CaptureService } from "../service/capture-service";
export const captureService = new CaptureService(knex)
export const captureController = new CaptureController(captureService)

import { RoomController } from "../controller/room-controller";
import { RoomService } from "../service/room-service";
export const roomService = new RoomService(knex)
export const roomController = new RoomController(roomService)

import { UserController } from "../controller/user-controller";
import { UserService } from "../service/user-service";
export const userService = new UserService(knex)
export const userController = new UserController(userService, roomService)

//Request Log
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Request: ${req.path}`);
  next();
});

//Third party middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware);

//Routes
import { apiRoutes } from "./apiRoutes";
app.use("/api", apiRoutes);
app.use(express.static(path.join(__dirname, "..", "public"),{extensions: ['html', 'htm']}));
// app.use("/", urlRoutes);

//404 Handler
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "404.html"));
});

//Port
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});

