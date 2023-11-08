import express, { Request, Response } from "express";
import { captureController } from "./server";
export const captureRoutes = express.Router();

captureRoutes.post("/", captureController.captureImage)
