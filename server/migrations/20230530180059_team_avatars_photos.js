/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("teams", function (table) {
    table
      .string("avatar")
      .notNullable()
      .defaultTo("/team/avatars/teamavatar1.png");
    table.string("photo").defaultTo("");
  });

  await knex.schema.alterTable("teams", function (table) {
    table.string("avatar").notNullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("teams", function (table) {
    table.dropColumn("photo");
    table.dropColumn("avatar");
  });
};
