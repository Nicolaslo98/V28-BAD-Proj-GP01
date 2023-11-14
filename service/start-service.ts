import { Knex } from "knex";

export class StartService{
    constructor(private knex: Knex) {
    }
    async startGame(id: number, player_e: string, player_s: string, player_w: string, player_n: string, room_id: number){
        const result = await this.knex('game')
        .insert(
            {   
                id:id,
                player_e: player_e,
                player_s: player_s,
                player_w: player_w,
                player_n: player_n,
                room_id: room_id
            }      
        )
        .returning(['id', 'player_e', 'player_s', 'player_w', 'player_n', 'room_id'] )
        return result    
    }
}