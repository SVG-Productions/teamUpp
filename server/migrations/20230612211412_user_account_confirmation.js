/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("users", function (table) {
    table
      .string("account_status")
      .defaultTo("pending")
      .checkIn(["active", "pending"]);
    table.string("confirmation_code").unique();
  });

  await knex("users").update({ account_status: "active" });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("users", function (table) {
    table.dropColumn("account_status");
    table.dropColumn("confirmation_code");
  });
};
