import { Knex } from 'knex';

export class EplayerService {
  constructor(private knex: Knex) {
  }

  async getEPlayerData(room_id: number){
    const ePlayerData = await this.knex('player')
    .select('username', 'user_image')
    .where('room_id', room_id)
    return ePlayerData;
  }
}