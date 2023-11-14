import { Request, Response } from "express";
import { StartService } from "../service/start-service";
import '../server/session'

export class StartController {
    
        constructor(private startService: StartService) {
        }
        startGame = async (req: Request, res: Response) => {
            try {
                const formObject = req.body; // Retrieve the form data directly from the request body
                console.log(formObject)
                
                const { player_e, player_s, player_w, player_n } = formObject; // Destructure the form data
    
                const room_id = req.session.room!.roomId  // Assuming you have the room ID stored in the session
    
                const startResult = await this.startService.startGame( {player_e, player_s, room_id, player_w, player_n, });
    
                res.json({ success: true, message: "start game successfully", startData: startResult });
            } catch (err) {
                res.json({ success: false, message: "fail to start game", err });
            }
        }
    }
