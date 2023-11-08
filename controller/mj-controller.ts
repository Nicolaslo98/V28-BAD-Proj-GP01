import { Request, Response } from "express";
import { MjService } from "../service/mj-service"
import path from "path";
// import { passBase64 } from 'ts-base64toimage'
import formidable from 'formidable';

export class MjController {

    constructor(private mjService: MjService) {
    }

    captureImage = async (req: Request, res: Response) => {
        try {
            const form = formidable({
                uploadDir: path.join('server', 'photo'),
                keepExtensions: true
            });

            const formData = form.parse(req, (fields, files) => {
                return { fields, files };
            });
            res.json({ success: true, message: "capture image successfully" })
        } catch (err) {
            res.json({ success: false, message: "fail to capture image", err })
        }
    }
}