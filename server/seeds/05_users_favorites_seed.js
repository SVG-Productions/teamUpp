const data = require("./data/users_favorites.json");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users_favorites").del();
  await knex("users_favorites").insert(data);
};
