import express from "express";
import { captureRoutes } from "./captureRoutes"
import { userRoutes } from "./userRoutes";

export const apiRoutes = express.Router();

apiRoutes.use('/camera', captureRoutes);
apiRoutes.use('/user', userRoutes);