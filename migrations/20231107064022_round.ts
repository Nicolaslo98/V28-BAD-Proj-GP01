import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("round", (table) => {
        table.increments();
        table.integer("player_e");
        table.integer("score_e");
        table.integer("player_s");
        table.integer("score_s");
        table.integer("player_w");
        table.integer("score_w");
        table.integer("player_n");
        table.integer("score_n");
        table.integer("room_id").unsigned();
        table.foreign("room_id").references("room.id");
        table.timestamps(false, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("round");
}