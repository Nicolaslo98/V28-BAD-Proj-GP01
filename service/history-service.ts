import { Knex } from 'knex';
import { RoundData } from '../utils/model'; // Assuming RoundData interface is defined in historyRoutes.ts

export class HistoryService {
  constructor(private knex: Knex) {
  }

  async getRoundData(game_id: number){
    const roundData = await this.knex('game')
    .join('round', 'game.id', '=', 'round.game_id')
    .select('player_e, score_e, player_s, score_s, player_w, score_w, player_n, score_n')
    return roundData;
  }

  
}