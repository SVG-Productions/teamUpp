/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("listings", function (table) {
    table.decimal("salary_amount", null);
    table.string("salary_frequency").checkIn(["hourly", "monthly", "yearly"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("listings", function (table) {
    table.dropColumn("salary_amount");
    table.dropColumn("salary_frequency");
  });
};
