const data = require("./data/users_job_fields.json");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users_job_fields").del();
  await knex("users_job_fields").insert(data);
};
