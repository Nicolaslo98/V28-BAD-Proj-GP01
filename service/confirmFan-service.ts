import { Knex } from 'knex';
import { GameData } from '../utils/model';

export class ConfirmFanService {
  constructor(private knex: Knex) {
  }

  async inputFan( gameData: GameData ){
    const result = await this.knex('round')
    .insert({
      score_e: gameData.player_e, 
      score_s: gameData.player_s, 
      score_n: gameData.player_n,
      score_w: gameData.player_w,
      game_id: +gameData.gameId
    })
    .returning(['id'])
    return result;
  }

  async calculateFan( ){
    const result = await this.knex('round')
    .select
    (
      'score_e', 'score_s', 'score_w', 'score_n'
    )
    .sum({ 
      total_player_e: 'score_e', 
      total_player_s: 'score_s', 
      total_player_w: 'score_w', 
      total_player_n: 'score_n' 
    })
    return result;
  }
}