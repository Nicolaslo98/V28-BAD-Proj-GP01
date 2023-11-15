import { Request, Response } from 'express';
import { RankService } from '../service/rank-service';

export class RankController {
    constructor(private rankService: RankService) {}
    getRankData = async(req: Request, res: Response)=> {
      const roomId: number | undefined = req.session.room?.roomId
      if (!roomId) {
        res.status(400).json({ error: 'Room id not found' });
        return;
      }
      try {
        const rankData = await this.rankService.getRankData(roomId);
        res.json({success: true, message:'Get rank data successfully ', rankData: rankData});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
}