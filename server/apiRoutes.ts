import express from "express";
import { captureRoutes } from "./captureRoutes"

export const apiRoutes = express.Router();

apiRoutes.use('/homepage',captureRoutes);