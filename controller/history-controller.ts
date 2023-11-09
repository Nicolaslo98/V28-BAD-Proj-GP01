import { Request, Response } from 'express';
import { HistoryService } from '../service/history-service';

export class HistoryController {
  private service: HistoryService;

  constructor( private historyService: HistoryService) {
  }

  public async getRoundData(req: Request, res: Response): Promise<void> {
    const roundId: number = Number(req.params.roundId);
    try {
      const roundData = await this.service.getRoundData(roundId);
      if (roundData) {
        res.json(roundData);
      } else {
        res.status(404).json({ error: 'Round data not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}