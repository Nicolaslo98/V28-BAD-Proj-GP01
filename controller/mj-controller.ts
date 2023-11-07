import { Request, Response } from "express";
import { MjService } from "../service/mj-service"
import path from "path";
import { passBase64 } from 'ts-base64toimage'

export class MjController {

    constructor(private buildingService: MjService) {
    }

    captureImage = async (req: Request, res: Response) => {
        try {
            const imageData = req.body.data;
            const folderPath = path.join(__dirname, 'photo');
            const filename = `image_${Date.now()}.png`;
            passBase64.toImage(imageData, 
                {
                  path: folderPath,
                  fileName: filename,
                  fileExtension: 'png'
                })
        } catch (err) {
            res.json({ success: false, message: "fail to capture image", err})
        }
    }
}