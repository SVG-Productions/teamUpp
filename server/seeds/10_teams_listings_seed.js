const data = require("./data/teams_listings.json");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("teams_listings").del();
  await knex("teams_listings").insert(data);
};
