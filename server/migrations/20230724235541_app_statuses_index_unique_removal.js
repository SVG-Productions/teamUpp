/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("application_statuses", function (table) {
    table.dropUnique(["user_id", "index"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("application_statuses", function (table) {
    table.unique(["user_id", "index"]);
  });
};
