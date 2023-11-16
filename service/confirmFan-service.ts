import { Knex } from 'knex';
import { GameData } from '../utils/model';

export class ConfirmFanService {
  constructor(private knex: Knex) {
  }

  async inputFan(gameData: GameData) {
    try {

      await this.knex('round')
        .insert({
          score_e: gameData.player_e,
          score_s: gameData.player_s,
          score_n: gameData.player_n,
          score_w: gameData.player_w,
          game_id: +gameData.gameId
        })
      const result = await this.knex('round')
        .join('game', { 'round.game_id': 'game.id' })
        .groupBy('game.id')
        .sum('score_e as player_e')
        .sum('score_s as player_s')
        .sum('score_n as player_n')
        .sum('score_w as player_w')
        .where({ 'game.id': +gameData.gameId })

      const e_result = await this.knex('round')
        .join('game', { 'round.game_id': 'game.id' })
        .select('game.player_e')
        .groupBy('game.player_e')
        .sum('score_e as player_e_score')

      const s_result = await this.knex('round')
        .join('game', { 'round.game_id': 'game.id' })
        .select('game.player_s')
        .groupBy('game.player_s')
        .sum('score_s as player_s_score')

      const w_result = await this.knex('round')
        .join('game', { 'round.game_id': 'game.id' })
        .select('game.player_w')
        .groupBy('game.player_w')
        .sum('score_w as player_w_score')

      const n_result = await this.knex('round')
        .join('game', { 'round.game_id': 'game.id' })
        .select('game.player_n')
        .groupBy('game.player_n')
        .sum('score_n as player_n_score')

      console.log(e_result)
      await this.knex('player')
        .update({
          user_total_score: e_result[0].player_e_score
        })
        .where({ id: e_result[0].player_e })

      await this.knex('player')
        .update({
          user_total_score: s_result[0].player_s_score
        })
        .where({ id: s_result[0].player_s })

      await this.knex('player')
        .update({
          user_total_score: w_result[0].player_w_score
        })
        .where({ id: w_result[0].player_w })

      await this.knex('player')
        .update({
          user_total_score: n_result[0].player_n_score
        })
        .where({ id: n_result[0].player_n })

      return result;

    } catch (error) {
      console.error(error)
    }
  }

  async calculateFan() {
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