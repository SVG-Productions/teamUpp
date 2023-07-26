/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex("users_favorites").del();
  await knex.schema.alterTable("users_favorites", function (table) {
    table
      .uuid("team_id")
      .notNullable()
      .references("id")
      .inTable("teams")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.dropUnique(["user_id", "listing_id"]);
    table.unique(["user_id", "listing_id", "team_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("users_favorites", function (table) {
    table.dropUnique(["user_id", "listing_id", "team_id"]);
    table.unique(["user_id", "listing_id"]);
    table.dropColumn("team_id");
  });
};
