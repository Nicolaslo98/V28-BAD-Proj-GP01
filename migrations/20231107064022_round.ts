import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("round", (table) => {
        table.increments();
        table.integer("score_e");
        table.integer("score_s");
        table.integer("score_w");
        table.integer("score_n");
        table.integer("game_id").unsigned();
        table.foreign("game_id").references("game.id");
        table.timestamps(false, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("round");
}