import { Knex } from "knex";

export class RoomService {

    constructor(private knex: Knex) {

    }
    async findRoom(room_name:string) {
        const result = await this.knex('room')
        .select('*')
        .where('room_name', room_name)
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
        .returning (['id','room_name'])
        return result
    }

    async joinRoom(room_name:string, password:number){
        const result = await this.knex('room')
        .insert(
            {
                room_name: room_name,
                password: password,
            }
        )
        .returning (['room_name'])
        return result
    }
}