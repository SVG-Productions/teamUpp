/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex("comments").del();
  await knex.schema.alterTable("comments", function (table) {
    table
      .uuid("team_id")
      .references("id")
      .inTable("teams")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("comments", function (table) {
    table.dropColumn("team_id");
  });
};
