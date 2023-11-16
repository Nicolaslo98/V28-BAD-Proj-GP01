import { Knex } from 'knex';
import { GameData } from '../utils/model';

export class ConfirmFanService {
  constructor(private knex: Knex) {
  }

  async inputFan( gameData: GameData ){
    await this.knex('round')
    .insert({
      score_e: gameData.player_e, 
      score_s: gameData.player_s, 
      score_n: gameData.player_n,
      score_w: gameData.player_w,
      game_id: +gameData.gameId
    })
    const result = await this.knex('round')
    .join('game', {'round.game_id' : 'game.id'})
    .groupBy('game.id')
    .sum('score_e as player_e')
    .sum('score_s as player_s')
    .sum('score_n as player_n')
    .sum('score_w as player_w')
    .where({'game.id': +gameData.gameId})
    console.log(result)
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