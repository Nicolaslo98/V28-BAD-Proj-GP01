import { Request, Response } from 'express';
import { RankService } from '../service/rank-service';

export class RankController {
    constructor(private rankService: RankService) {}
    getRankData = async(req: Request, res: Response)=> {
      const roomId: number = Number(req.params.roomId);
      try {
        const rankData = await this.rankService.getRankData(roomId);
        res.json({success: true, message:'Get rank data successfully ', rankData: rankData});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
}