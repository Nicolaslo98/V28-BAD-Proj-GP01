import { Knex } from 'knex';

export class ConfirmFanService {
  constructor(private knex: Knex) {
  }

  async inputFan( score_e: number, score_s: number, score_n: number, score_w: number){
    const result = await this.knex('round')
    .insert({
      score_e: score_e, 
      score_s: score_s, 
      score_n: score_n,
      score_w: score_w 
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