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

    createUser = async (req: Request, res: Response) => {
        try {
            const { username, user_image } = req.body
            if(username.length >= 1 && user_image >= 1) {
                res.json({ success: true, message: "create player successfully" })
            }
        } catch (err) {
            res.json({ success: false, message: "fail to create user", err})
        }
    }
}