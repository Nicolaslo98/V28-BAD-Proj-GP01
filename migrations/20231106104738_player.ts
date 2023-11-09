import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("player", (table) => {
        table.increments();
        table.string("username");
        table.string("user_image");
        table.integer("user_total_score");
        table.integer("room_id").unsigned();
        table.foreign("room_id").references("room.id");
        table.timestamps(false, true);
      });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("player");
}

