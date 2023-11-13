import { Request, Response } from 'express';
import { HistoryService } from '../service/history-service';

export class HistoryController {
  constructor(private historyService: HistoryService) {}
  getRoundData = async(req: Request, res: Response)=> {
    const roomId: number = Number(req.params.roomId);
    // const roomId: number | undefined = req.session.room?.roomId
    const game: number = Number(req.params.game);
    // const game: number | undefined = req.session.room?.roomId.game?.game
    console.log(req.params.roomId);
    try {
      const roundData = await this.historyService.getRoundData(roomId, game);
      res.json({success: true, message:'Get round history successfully ', roundData: roundData});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}