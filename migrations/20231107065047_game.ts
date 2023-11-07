import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("game", (table) => {
        table.increments();
        table.integer("player1_score");
        table.integer("player2_score");
        table.integer("player3_score");
        table.integer("player4_score");
        table.integer("round_id").unsigned();
        table.foreign("round_id").references("round.id");
        table.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("game");
}

