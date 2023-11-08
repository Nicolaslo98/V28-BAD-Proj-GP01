import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("mahjong_fan", (table) => {
        table.increments();
        table.integer("capture_image");
        table.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<void> {
}