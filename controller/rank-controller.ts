import { Request, Response } from 'express';
import { RankService } from '../service/rank-service';

export class RankController {
    constructor(private rankService: RankService) {}
    getRankData = async(req: Request, res: Response)=> {
      try {
      const room_id = req.session.room!.roomId
      console.log('checking',req.session.room!.roomId)
        const rankData = await this.rankService.getRankData(room_id);
        res.json({success: true, message:'Get rank data successfully ', rankData: rankData});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
}