import { Request, Response } from "express";
import { ConfirmFanService } from "../service/confirmFan-service"
import { StartService } from "../service/start-service";


export class ConfirmFanController {

    constructor(private confirmFanService: ConfirmFanService, private startService: StartService) {
    }

    confirmFan = async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            const scores = new Map<string, number>();
            const set: Array<{player_id: string, fan: number}> = req.body;
            set.reduce((acc, result) => {
                if (+result.fan > 0) acc.set(result.player_id, result.fan);
                if (+result.fan < 0) acc.set(result.player_id, result.fan);
                return acc;
            }, scores)
            const players = ["player_e", "player_s", "player_n", "player_w"];
            for (const player of players) {
                if (!scores.get(player)) scores.set(player, 0);
            }
            
            const score_e = scores.get("player_e") 
            const score_s = scores.get("player_s")
            const score_n = scores.get("player_n") 
            const score_w = scores.get("player_w")
            // const game_id = await this.startService.startGame( room_id, player_e, player_s, player_w, player_n )
            
            const result = await this.confirmFanService.inputFan(Number(score_e), Number(score_s), Number(score_n), Number(score_w))
            res.json({ success: true, message: "cal fan successfully" })
        } catch (err) {
            res.json({ success: false, message: "fail to cal fan", err })
        }
    }
}