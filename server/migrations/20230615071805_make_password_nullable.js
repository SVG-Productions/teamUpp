/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("users", function (table) {
    table.string("hashed_password").nullable().alter();
    table.string("auth_type");
  });

  await knex("users")
    .whereNot("hashed_password", null)
    .update({ auth_type: "email" });

  await knex.schema.alterTable("users", function (table) {
    table.string("auth_type").notNullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("users", function (table) {
    table.string("hashed_password").notNullable().alter();
    table.dropColumn("auth_type");
  });
};
