import express from "express";
import { Request, Response } from "express";
import path from "path";

const app = express();

app.get("/", function (req: Request, res: Response) {
    res.end("Hello World");
  });

//Port
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});