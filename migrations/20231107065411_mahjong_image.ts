import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("mahjong_image", (table) => {
        table.increments();
        table.integer("mahjong_image");
        table.integer("mahjong_suit");
        table.integer("mahjong_value");
        table.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("mahjong_image");
}