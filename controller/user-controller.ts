import { Request, Response } from "express";
import { UserService } from "../service/user-service"
import formidable from 'formidable';
import { RoomService } from "../service/room-service";
import '../server/session'
import expressSession from "express-session"

export class UserController {

    constructor(private userService: UserService, private roomService: RoomService) {
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const form = formidable({
                uploadDir: "./private/photo",
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
            form.parse(req, async (error, fields, files ) => {
                console.log({
                    error
                })
                const user_image = (files.image as formidable.File)?.newFilename
                const room_id = req.session.room?.roomId
                const playerResult = await this.userService.userSetUp( (fields.username as string), user_image, (room_id as number) )
                res.json({ success: true, message: "create player successfully", imageData: playerResult });
            });
        } catch (err) {
            res.json({ success: false, message: "fail to create user", err });
        }
    }
}