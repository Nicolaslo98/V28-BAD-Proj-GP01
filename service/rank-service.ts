import { Knex } from 'knex';

export class RankService {
  constructor(private knex: Knex) {
  }

  async getRankData(room_id: number){
    const rankData = await this.knex('player')
    .select('username', 'user_total_score')
    .orderBy('user_total_score', 'desc')
    return rankData;
  }
}