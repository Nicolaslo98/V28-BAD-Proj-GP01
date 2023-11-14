import { Knex } from 'knex';
import { RoundData } from '../utils/model'; // Assuming RoundData interface is defined in historyRoutes.ts

export class HistoryService {
  constructor(private knex: Knex) {
  }

  async getRoundData(game_id: number){
    const roundData = await this.knex('round')
    .select('*')
    .where('game_id', game_id)
    return roundData;
  }
}