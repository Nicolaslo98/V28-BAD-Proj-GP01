import { Request, Response } from 'express';
import { HistoryService } from '../service/history-service';

export class HistoryController {
  //private service: HistoryService;
  constructor(private historyService: HistoryService) {}
  getRoundData=async(req: Request, res: Response)=> {
    const roundId: number = Number(req.params.roundId);
    console.log('P'+roundId); 
    try {
      const roundData = await this.historyService.getRoundData(roundId);
      console.log(roundData);
      // if (roundData) {
      //   res.json(roundData);
      // } else {
      //   res.status(404).json({ error: 'Round data not found' });
      // }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}