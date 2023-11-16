import { Request, Response } from 'express';
import { HistoryService } from '../service/history-service';
import '../server/session'

export class HistoryController {
  constructor(private historyService: HistoryService) {}
  getRoundData = async(req: Request, res: Response)=> {
    const gameId: number | undefined = req.body.gameId;
    console.log('gameId: ', gameId);
      if (!gameId) {
        res.status(400).json({ error: 'Game id not found' });
        return;
      }
    try {
      const roundData = await this.historyService.getRoundData(gameId);
      console.log('roundData: ', roundData);
      res.json({success: true, message:'Get round history successfully ', roundData});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}