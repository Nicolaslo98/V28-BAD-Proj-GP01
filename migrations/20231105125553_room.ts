import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("room", (table) => {
        table.increments();
        table.integer("room_name");
        table.integer("password");
        table.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("room");
}

