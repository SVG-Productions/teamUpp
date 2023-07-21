/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("application_statuses", function (table) {
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("app_status").notNullable();
    table.integer("index").notNullable();
    table.unique(["user_id", "app_status"]);
    table.unique(["user_id", "index"]);
  });

  const defaultStatuses = [
    "applied",
    "1st interview",
    "offer made",
    "archived",
  ];

  const userIds = await knex("users").select("id");

  userIds.forEach((userId) => {
    defaultStatuses.forEach(async (appStatus, index) => {
      const entry = { userId: userId.id, appStatus, index };
      await knex("application_statuses").insert(entry);
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("application_statuses");
};
