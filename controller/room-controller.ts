import { Request, Response } from "express";
import { RoomService } from "../service/room-service"
import expressSession from "express-session"
import path, { dirname } from "path";

export class RoomController {

    constructor(private roomService: RoomService) {
    }

    createRoom = async (req: Request, res: Response) => {
        try {
            const room_name = req.body.room_name
            const password = req.body.password

            if (! room_name || ! password) {
                res.status(400)
                .json({
                    success: false,
                    message: " missing room_name or password"
                });
                return;
            }
            
            const room = await this.roomService.findRoom( room_name, password )

            if ( room.length == 0 ){
                res.status(400)
                .json({
                    success: false,
                    message: "wrong room_name or password"
                });
                return;
            }
            // await this.roomService.roomSetup( room_name, password )
            // res.json({ success: true, message: "create room successfully" })
        } catch (err) {
            res.json({ success: false, message: "fail to create room", err })
        }
    }
}