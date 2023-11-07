import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("round", (table) => {
        table.increments();
        table.integer("score");
        table.integer("player_id").unsigned();
        table.foreign("player_id").references("player.id");
        table.timestamps(false, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("round");
}

