import { Knex } from 'knex';
import { RoundData } from '../utils/history'; // Assuming RoundData interface is defined in historyRoutes.ts

export class HistoryService {
  constructor(private knex: Knex) {
  }

  async getRoundData(room_id: number, game: number){
    const roundData = await this.knex('round')
    .select('*')
    .where('room_id', room_id)
    .andWhere('game', game)
    return roundData;
  }
}