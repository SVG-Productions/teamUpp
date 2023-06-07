/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users_socials", (table) => {
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("social");
  });

  const currentSocials = await knex("users").select("id", "github", "linkedin");
  currentSocials.forEach(async (social) => {
    if (social.github) {
      await knex("users_socials").insert({
        userId: social.id,
        social: social.github,
      });
    }
    if (social.linkedin) {
      await knex("users_socials").insert({
        userId: social.id,
        social: social.linkedin,
      });
    }
  });

  await knex.schema.alterTable("users", function (table) {
    table.dropColumn("github");
    table.dropColumn("linkedin");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("users", function (table) {
    table.string("github");
    table.string("linkedin");
  });
  const currentSocials = await knex("users_socials").select(
    "user_id",
    "social"
  );
  currentSocials.forEach(async (social) => {
    if (social.social.includes("github.com")) {
      await knex("users")
        .where("id", social.userId)
        .update({ github: social.social });
    }
    if (social.social.includes("linkedin.com")) {
      await knex("users")
        .where("id", social.userId)
        .update({ linkedin: social.social });
    }
  });
  await knex.schema.dropTableIfExists("users_socials");
};
