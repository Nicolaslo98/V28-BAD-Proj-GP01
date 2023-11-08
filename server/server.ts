import express from "express";
import dotenv from "dotenv";
import { sessionMiddleware } from "./session";
import { Request, Response } from "express";
import path from "path";
import fs from 'fs';
// import { passBase64 } from 'ts-base64toimage'
import { MjController } from "../controller/mj-controller";
import { MjService } from "../service/mj-service";
import { urlRoutes } from "./urlRoutes";

dotenv.config();
const app = express();

//Knex
import knex from "../main";
export const mjService = new MjService(knex)
export const mjController = new MjController(mjService)

//Request Log
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Request: ${req.path}`);
  next();
});

//Third party middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(sessionMiddleware);

//Routes
import { apiRoutes } from "./apiRoutes";
app.use("/api", apiRoutes);
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/", urlRoutes);

//404 Handler
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "404.html"));
});

//Port
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});

