import { Request, Response, NextFunction } from "express";
import { RoomService } from "../service/room-service"
import expressSession from "express-session"
import '../server/session'
import path, { dirname } from "path";

export class RoomController {

    constructor(private roomService: RoomService) {
    }

    loginGuard = async (req:Request, res: Response, next: NextFunction) => {
        try {
            if (req.session.room) {
                res.json({ success: true, haveSession: true })
            } else {
                res.json({ success: true, haveSession: false })
            }
        } catch (err) {
            res.json({ success: false, message: "fail to check loginGuard", err })
        }
    }

    //Method: POST '/api/room/check
    checkRoom = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const room_name = req.body.room_name
            const room = await this.roomService.findRoom(room_name)

            if (room.length > 0) {
                res.json({ success: true, message: "has existing name" })
            } else {
                res.json({ success: false, message: "no existing room" })
            }

        } catch (err) {
            res.status(403)
            res.json({ success: false, message: "fail to check room", err })
        }
    }

    //Method: POST '/api/room/create
    createRoom = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const room_name: string = req.body.room_name
            const password: number = req.body.password
            const room = await this.roomService.findRoom(room_name)

            if (room.length > 0) {
                res.json({ success: false, message: "please back to create room name" })
            } else 
            if (room.length == 0) {
                const result: any = await this.roomService.roomSetup(room_name, password)
                req.session.room = {
                    roomId: result[0].id,
                    room_name: result[0].room_name
                }
            }
                res.json({ success: true, message: "create room successfully", room: req.session.room })
            return
        } catch (err) {
            console.log(err)
            res.json({ success: false, message: "fail to create room", err })
        }
    }

    //Method: POST '/api/room/join
    joinRoom = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const room_name = req.body.room_name
            const password = req.body.password
            const room = await this.roomService.joinRoom(room_name, password)
            console.log(room)
            if (room.length == 0) {
                res.status(400)
                    .json({
                        success: false,
                        message: "wrong room_name or password"
                    });
            } else 
            if (room.length > 0) {
                console.log("backend check pw")
                // const result: any = await this.roomService.joinRoom(room_name, password)
                req.session.room = {
                    roomId: room[0].id,
                    room_name: room[0].room_name
                }
                res.json({ success: true, message: "join room successfully", room: req.session.room })
                console.log("backend check pw step 2")
            }
        } catch (err) {
            res.json({ success: false, message: " fail to join room", err })
        }
    }

    logoutRoom = async (req: Request, res: Response, next: NextFunction) => {
        try {
          req.session.destroy((err) => {
            res.json({ success: true, message: "User logout" });
          });
        } catch (err) {
          res.json({ success: false, message: "fail to logout", err });
        }
      }

}