import { Request, Response } from "express";
import { UserService } from "../service/user-service"
import path, { dirname } from "path";
import formidable from 'formidable';

export class UserController {

    constructor(private userService: UserService) {
    }

    createUser = async (req: Request, res: Response) => {
        try {
            console.log('step1')
            const form = formidable({
                uploadDir: "./server/photo",
                keepExtensions: true,
                maxFiles: 1,
                maxFileSize: 1024 ** 2 * 200,
                filter: part => part.mimetype?.startsWith('image/') || false,
                filename: (_originalName, _originalExt, part) => {
                    const fieldName = part.name;
                    const timestamp = Date.now();
                    const ext = part.mimetype?.split("/").pop();
                    return `${fieldName}-${timestamp}.${ext}`;
                  },
            });
            form.parse(req, async (error, files, fields) => {
                const user_image = (fields.file as formidable.File)?.newFilename
                await this.userService.userSetUp( user_image, req.body.username )
            });
                res.json({ success: true, message: "create player successfully" })
        } catch (err) {
            res.json({ success: false, message: "fail to create user", err })
        }
    }
}