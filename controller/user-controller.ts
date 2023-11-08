import { Request, Response } from "express";
import { CaptureService } from "../service/capture-service"
import path from "path";
import formidable from 'formidable';

export class CaptureController {

    constructor(private captureService: CaptureService) {
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