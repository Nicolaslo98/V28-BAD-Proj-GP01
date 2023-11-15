import { Knex } from "knex";
import { Game } from "../utils/model";
export class StartService{
    constructor(private knex: Knex) {
    }
    async startGame(game:Game){
        console.log(game)
        const result = await this.knex('game')
        .insert(
            {   
                player_e: +(game.player_e),
                player_s: +(game.player_s),
                player_w: +(game.player_w),
                player_n: +(game.player_n),
                room_id: game.room_id
            }      
        )
        .returning(['id', 'player_e', 'player_s', 'player_w', 'player_n', 'room_id'] )
        return result    
    } 
}