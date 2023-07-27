/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("application_statuses", function (table) {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();
  });
  const statuses = await knex("application_statuses");

  await knex.schema.alterTable("listings", function (table) {
    table
      .uuid("status_id")
      .references("id")
      .inTable("application_statuses")
      .onUpdate("CASCADE");
  });
  statuses.forEach(async (s) => {
    await knex("listings")
      .where("user_id", s.userId)
      .andWhere("listing_status", s.appStatus)
      .update({ statusId: s.id });
  });
  await knex.schema.alterTable("listings", function (table) {
    table.uuid("status_id").notNullable().alter();
    table.dropColumn("listing_status");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("listings", function (table) {
    table.string("listing_status");
  });

  const statuses = await knex("application_statuses")
    .join("listings", "application_statuses.id", "listings.status_id")
    .select("listings.status_id", "application_statuses.app_status");

  for (const s of statuses) {
    await knex("listings")
      .where("status_id", s.statusId)
      .update({ listingStatus: s.appStatus });
  }

  await knex.schema.alterTable("listings", function (table) {
    table.dropColumn("status_id");
    table.string("listing_status").notNullable().alter();
  });
  await knex.schema.alterTable("application_statuses", function (table) {
    table.dropColumn("id");
  });
};
