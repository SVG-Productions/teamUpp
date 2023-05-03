const jobFields = require("../../client/src/utils/jobFields");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex("teams")
    .whereNotIn("job_field", jobFields)
    .update("job_field", "other");

  await knex.schema.alterTable("teams", (table) => {
    table.text("job_field").checkIn(jobFields, "job_field_check").alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("teams", (table) => {
    table.dropChecks("job_field_check");
    table.string("job_field").alter();
  });
};
