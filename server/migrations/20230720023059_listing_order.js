/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("listings", function (table) {
    table.integer("index");
  });

  const userIds = await knex("users")
    .select("id", "application_statuses.app_status")
    .join("application_statuses", "id", "=", "application_statuses.user_id");

  userIds.forEach(async (userId) => {
    const userListings = await knex("listings")
      .select("id")
      .where("user_id", userId.id)
      .andWhere("listing_status", userId.appStatus);
    userListings.forEach(async (ul, i) => {
      await knex("listings").update({ index: i }).where("id", ul.id);
    });
  });

  await knex.schema.alterTable("listings", function (table) {
    table.integer("index").notNullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("listings", function (table) {
    table.dropColumn("index");
  });
};
