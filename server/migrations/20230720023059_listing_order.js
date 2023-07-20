/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("listings", function (table) {
    table.integer("index");
  });

  const userIds = await knex("users").select("id");
  userIds.forEach(async (userId) => {
    const appStatuses = await knex("application_statuses")
      .select("app_status")
      .where("user_id", userId.id);
    appStatuses.forEach(async (appStatus) => {
      const userListings = await knex("listings")
        .select("id")
        .where("user_id", userId.id)
        .andWhere("listing_status", appStatus.app_status);
      userListings.forEach(async (ul, i) => {
        await knex("listings").update({ index: i }).where("id", ul.id);
      });
    });
  });

  //   await knex.schema.alterTable("listings", function (table) {
  //     table.integer("index").notNullable().alter();
  //   });
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
