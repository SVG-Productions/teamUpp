/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("teams", (table) => {
    table.renameColumn("isPrivate", "is_private");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("teams", (table) => {
    table.renameColumn("is_private", "isPrivate");
  });
};
