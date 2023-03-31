const data = require("./data/users_teams.json");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users_teams').del()
  await knex('users_teams').insert(data);
};
