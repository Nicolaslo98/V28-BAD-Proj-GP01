import { Request, Response } from 'express';
import { HistoryService } from '../service/history-service';

export class HistoryController {
  //private service: HistoryService;
  constructor(private historyService: HistoryService) {}
  // function getRoundData(roundId: number): RoundData {
  //   ...
  // }
  getRoundData = async(req: Request, res: Response)=> {
    const roomId: number = Number(req.params.roomId);
    const game: number = Number(req.params.game);
    console.log(req.params.roomId);
    
    // console.log('P'+roundId); 
    try {
      const roundData = await this.historyService.getRoundData(roomId, game);
      // console.log(roundData);
      res.json({success: true, message:'Get round history successfully ', roundData: roundData});
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