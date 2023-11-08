import express, { Request, Response } from "express";
import { userController } from "./server";
export const userRoutes = express.Router();

userRoutes.post("/", userController.createUser)