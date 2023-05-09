/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("experiences_links", function (table) {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();
    table
      .uuid("experience_id")
      .notNullable()
      .references("id")
      .inTable("experiences")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.text("description").notNullable();
    table.text("url").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("experiences_links");
};
