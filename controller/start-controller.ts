import { Request, Response } from "express";
import { StartService } from "../service/start-service";
import '../server/session'

export class StartController {
    
        constructor(private startService: StartService) {
        }
    
        startGame = async (req: Request, res: Response) => {
            try {
                const id = req.body.id
                const player_e = req.body.player_e
                const player_s = req.body.player_s
                const player_w = req.body.player_w
                const player_n = req.body.player_n
                const room_id = req.body.room?.roomId
                const startResult = await this.startService.startGame( (req.session.room?.roomId as number), (player_e as string), (player_s as string), (player_w as string), (player_n as string), (room_id as number) )
                res.json({ success: true, message: "start game successfully", startData: startResult });
            } catch (err) {
                res.json({ success: false, message: "fail to start game", err });
            }
        }
}

