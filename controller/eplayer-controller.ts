import { Request, Response } from 'express';
import { EplayerService } from '../service/eplayer-service';

export class EplayerController {
    constructor(private ePlayerService: EplayerService) {}
    getEPlayerData = async(req: Request, res: Response)=> {
      const roomId: number = Number(req.params.roomId);
      try {
        const ePlayerData = await this.ePlayerService.getEPlayerData(roomId);
        res.json({success: true, message:'Get exist player successfully ', ePlayerData: ePlayerData});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
}