/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.alterTable("users", (table) => {
    table.unique("email");
    table.unique("username");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.alterTable("users", (table) => {
    table.dropUnique(["email", "username"]);
  });
};
