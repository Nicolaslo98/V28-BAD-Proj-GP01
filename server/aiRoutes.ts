import express, { Request, Response } from "express";
import { aiController } from "./server";
export const aiRoutes = express.Router();

aiRoutes.get("/", aiController.countMjFan)