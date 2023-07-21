/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("teams_listings", function (table) {
    table
      .uuid("listing_id")
      .notNullable()
      .references("id")
      .inTable("listings")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .uuid("team_id")
      .notNullable()
      .references("id")
      .inTable("teams")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.unique(["listing_id", "team_id"]);
  });

  const listings = await knex("listings").select("id", "team_id");

  listings.forEach(async (listing) => {
    await knex("teams_listings").insert({
      listingId: listing.id,
      teamId: listing.teamId,
    });
  });

  await knex.schema.alterTable("listings", function (table) {
    table.dropColumn("team_id");
    table.string("listing_status").notNullable().defaultTo("applied");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("listings", function (table) {
    table.dropColumn("listing_status");
    table
      .uuid("team_id")
      .references("id")
      .inTable("teams")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });

  const teamsListings = await knex("teams_listings").select("*");
  teamsListings.forEach(async (tl) => {
    await knex("listings")
      .where("id", tl.listingId)
      .update({ teamId: tl.teamId });
  });

  await knex.schema.alterTable("listings", function (table) {
    table.uuid("team_id").notNullable().alter();
  });

  await knex.schema.dropTableIfExists("teams_listings");
};
