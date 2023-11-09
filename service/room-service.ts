import { Knex } from "knex";

export class RoomService {

    constructor(private knex: Knex) {

    }
    async findRoom(room_name:string, password:number) {
        const result = await this.knex('room')
        .select('*')
        .where('room_name', room_name)
        .andWhere('password', password)
        return result
    }
    
    async roomSetup(room_name:string, password:number) {
        const result = await this.knex('room')
        .insert(
            {
                room_name: room_name,
                password: password,
            }
        )
        .returning (['password'])
        return result
    }
}