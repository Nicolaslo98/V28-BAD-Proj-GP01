import express from "express";
import dotenv from "dotenv";
import { sessionMiddleware } from "./session";
import { Request, Response } from "express";
import path from "path";

dotenv.config();
const app = express();

app.get("/", function (req: Request, res: Response) {
  res.end("Hello World");
});

//Request Log
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Request: ${req.path}`);
  next();
});

//Third party middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware);

//Port
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});