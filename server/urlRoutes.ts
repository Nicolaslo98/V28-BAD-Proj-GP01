import express, { Request, Response, NextFunction } from "express";
import path from "path";

export const urlRoutes = express.Router();
urlRoutes.use(urlRedirect);

export function urlRedirect(req: Request, res: Response, next: NextFunction) {
    switch (req.path) {
      case "/":
        res.sendFile(path.join(__dirname, "../public", "main.html"));
        return;
    }
  }