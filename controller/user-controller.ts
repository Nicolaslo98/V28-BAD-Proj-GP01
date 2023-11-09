import { Request, Response } from "express";
import { UserService } from "../service/user-service"
import path, { dirname } from "path";
import formidable from 'formidable';
import { RoomController } from "./room-controller";
import { RoomService } from "../service/room-service";

export class UserController {

    constructor(private userService: UserService, private roomService: RoomService) {
    }

    createUser = async (req: Request, res: Response) => {
        try {
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
            form.parse(req, async (error, fields, files ) => {
                const user_image = (files.file as formidable.File)?.newFilename
                // const room_id = this.roomService.roomSetup
                // await this.userService.userSetUp( (fields.username as string), user_image, room.id )
            });
                res.json({ success: true, message: "create player successfully" })
        } catch (err) {
            res.json({ success: false, message: "fail to create user", err })
        }
    }
}