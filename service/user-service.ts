import { Knex } from "knex";

export class UserService {

    constructor(private knex: Knex) {

    }
    
    async userSetUp() {
        const result = await this.knex('player')
        .insert(
            {
                username: "username",
                user_image: "user_image"
            }
        )
        .returning("id, user_image")
        return result
    }

}