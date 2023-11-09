import { Knex } from 'knex';
import { RoundData } from '../utils/history'; // Assuming RoundData interface is defined in historyRoutes.ts

export class HistoryService {
  constructor(private knex: Knex) {
  }

  async getRoundData(roundId: number){
    console.log({roundId});
    const roundData = await this.knex('round')
    .select('*')
    return roundData;
  }
}