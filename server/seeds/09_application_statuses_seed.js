const data = require("./data/application_statuses.json");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("application_statuses").del();
  await knex("application_statuses").insert(data);
};
