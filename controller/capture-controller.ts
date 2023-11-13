import { Request, Response } from "express";
import { CaptureService } from "../service/capture-service"
import path from "path";
// import { passBase64 } from 'ts-base64toimage'
import formidable from 'formidable';

export class CaptureController {

    constructor(private captureService: CaptureService) {
    }

    captureImage = async (req: Request, res: Response) => {
        try {
            const form = formidable({
                uploadDir: path.join('private', 'photo'),
                keepExtensions: true
            });

            const formData = form.parse(req, (fields, files) => {
                return { fields, files };
            });
            res.json({ success: true, message: "capture image successfully 22" })
        } catch (err) {
            res.json({ success: false, message: "fail to capture image", err })
        }
    }
}