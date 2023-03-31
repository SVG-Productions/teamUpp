/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users", function (table) {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();
    table.string("username").notNullable();
    table.string("email").notNullable();
    table.boolean("is_email_public").defaultTo(false);
    table.string("hashed_password", 100).notNullable();
    table.string("first_name", 100);
    table.string("last_name", 100);
    table.timestamp("date_joined").defaultTo(knex.fn.now());
    table.string("linkedin");
    table.string("github");
    table.text("readme");
    table.specificType("team_ids", "uuid ARRAY");
    table.specificType("listing_ids", "uuid ARRAY");
    table.specificType("favorite_ids", "uuid ARRAY");
  });
  await knex.schema.createTable("teams", function (table) {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();
    table.specificType("user_ids", "uuid ARRAY").notNullable();
    table.specificType("listing_ids", "uuid ARRAY");
    table.string("name").notNullable();
    table.string("job_field");
    table.text("description").notNullable();
    table.boolean("isPrivate").defaultTo(false);
  });
  await knex.schema.createTable("listings", function (table) {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .uuid("team_id")
      .notNullable()
      .references("id")
      .inTable("teams")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.specificType("experience_ids", "uuid ARRAY");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("job_title").notNullable();
    table.string("job_link").notNullable();
    table.string("company_name").notNullable();
    table.text("company_details").notNullable();
    table.text("job_description").notNullable();
  });
  await knex.schema.createTable("experiences", function (table) {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .uuid("listing_id")
      .notNullable()
      .references("id")
      .inTable("listings")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("title").notNullable();
    table.text("content").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("experiences");
  await knex.schema.dropTableIfExists("listings");
  await knex.schema.dropTableIfExists("teams");
  await knex.schema.dropTableIfExists("users");
};
