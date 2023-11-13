import { Knex } from "knex";

export class UserService {

    constructor(private knex: Knex) {

    }
    
    async userSetUp(username:string, user_image:string, room_id: number) {
        const result = await this.knex('player')
        .insert(
            {
                username: username,
                user_image: user_image,
                user_total_score: 0,
                room_id: room_id
            }      
        )
<<<<<<< HEAD
=======
        .returning (['id','username', 'room_id'])
>>>>>>> 3dd991459fa96dff0a6e7cbed394647fe261f9aa
        return result
    }
}