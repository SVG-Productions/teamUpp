/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("users", function (table) {
    table.string("avatar").defaultTo("/user/avatars/avatar1");
    table.string("photo").defaultTo("");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("users", function (table) {
    table.dropColumn("photo");
    table.dropColumn("avatar");
  });
};
