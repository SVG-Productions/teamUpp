const jobFieldsData = require("../utils/jobFieldsData");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex("teams")
    .whereNotIn("job_field", jobFieldsData)
    .update("job_field", "other");

  await knex.schema.alterTable("teams", (table) => {
    table.text("job_field").checkIn(jobFieldsData, "job_field_check").alter();
  });

  await knex.schema.createTable("users_job_fields", (table) => {
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .text("job_field")
      .checkIn(jobFieldsData, "job_field_check")
      .unique(["user_id", "job_field"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users_job_fields");

  await knex.schema.alterTable("teams", (table) => {
    table.dropChecks("job_field_check");
    table.string("job_field").alter();
  });
};
