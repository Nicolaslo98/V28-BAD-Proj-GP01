import express from "express";
import dotenv from "dotenv";
import { sessionMiddleware } from "./session";
import { Request, Response } from "express";
import path from "path";
import fs from 'fs';
import { passBase64 } from 'ts-base64toimage'

dotenv.config();
const app = express();


//Request Log
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Request: ${req.path}`);
  next();
});

//Third party middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(sessionMiddleware);


//
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'homepage.html'));
});

// Endpoint to handle the save image request
app.post('/homepage', (req, res) => {
  const imageData = req.body.data; // Assuming you have a body parser middleware to parse the request body

  // Specify the path to the folder where the images will be saved
  const folderPath = path.join(__dirname, 'photo');

  // Create the folder if it doesn't exist
  // if (!fs.existsSync(folderPath)) {
  //   fs.mkdirSync(folderPath);
  // }

  // Generate a unique filename for the image
  const filename = `image_${Date.now()}.png`;

  passBase64.toImage(imageData, 
  {
    path: folderPath,
    fileName: filename,
    fileExtension: 'png'
  }
)

  // Save the image data to the folder
  // const filePath = path.join(folderPath, filename);
  // fs.writeFileSync(filePath, imageData, 'base64');

  res.sendStatus(200);
});






const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

//Port
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});

