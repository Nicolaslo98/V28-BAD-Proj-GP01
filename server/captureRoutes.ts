import express, { Request, Response } from "express";
import { mjService, mjController } from "./server";
export const captureRoutes = express.Router();

captureRoutes.post("/", mjController.captureImage)
