/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("users_job_fields", (table) => {
    table.dropUnique("job_field");
    table.unique(["user_id", "job_field"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("users_job_fields", (table) => {
    table.unique("job_field");
    table.dropUnique(["user_id", "job_field"]);
  });
};
