import { Request, Response } from "express";
import { RoomService } from "../service/room-service"
import expressSession from "express-session"
import path, { dirname } from "path";

export class RoomController {

    constructor(private roomService: RoomService) {
    }
    
    //Method: POST '/api/room
    checkRoom = async (req: Request, res: Response) => {
        try {
            const room_name = req.body.room_name

            const room = await this.roomService.findRoom(room_name)
            
            if (room.length == 0) {
                res.json({ success: true, message: "no existing name" })
            } else {
                res.status(400)
                res.json({ success: false, message: "has existing room" })
            } 
        } catch (err) {
            res.status(403)
            res.json({ success: false, message: "fail to check room", err })
        }
    }

    //Method: POST '/api/room/create
    createRoom = async (req: Request, res: Response) => {
        try {
            const room_name = req.body.room_name
            const password = req.body.password
            const room = await this.roomService.findRoom(room_name)

            if (room.length == 0) {
                await this.roomService.roomSetup(room_name, password)
                res.json({ success: true, message: "create room successfully" })
            }
        } catch (err) {
            res.json({ success: false, message: "fail to create room", err })
        }
    }

    //Method: POST '/api/room/join
    joinRoom = async (req: Request, res: Response) => {
        try {
            const room_name = req.body.room_name
            const password = req.body.password
            const room = await this.roomService.joinRoom(room_name, password)

            if (room.length == 0) {
                res.status(400)
                    .json({
                        success: false,
                        message: "wrong room_name or password"
                    });
                return;
            }
        } catch (err) {
            res.json({ success: false, message: " fail to join room", err })
        }
    }
}