const data = require("./data/listings");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("listings").del();
  await knex("listings").insert(data);
};
