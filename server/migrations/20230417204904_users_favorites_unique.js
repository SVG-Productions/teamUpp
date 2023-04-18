/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("users_favorites", (table) => {
    table.unique(["user_id", "listing_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("users_favorites", (table) => {
    table.dropUnique(["user_id", "listing_id"]);
  });
};
