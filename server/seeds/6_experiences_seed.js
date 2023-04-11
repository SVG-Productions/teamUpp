const data = require("./data/experiences.json");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("experiences").del();
  await knex("experiences").insert(data);
};
