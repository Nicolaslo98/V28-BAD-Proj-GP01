import { Knex } from "knex";

export class UserService {

    constructor(private knex: Knex) {

    }
    
    async userSetUp(username:string, user_image:string) {
        console.log("step2")
        const result = await this.knex('player')
        .insert(
            {
                username: username,
                user_image: user_image,
                user_total_score: 0,
                round: 0
            }
        )
        return result
    }
}