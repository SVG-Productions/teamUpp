const knex = require("../dbConfig");

const updateUserAppStatuses = async (userId: string, statusOrder: string[]) => {
  try {
    await knex("application_statuses").where("user_id", userId).del();
    statusOrder.forEach(async (s, i) => {
      await knex("application_statuses")
        .where("user_id", userId)
        .andWhere("app_status", s)
        .insert({ userId, appStatus: s, index: i });
    });
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting user listings.");
  }
};

module.exports = {
  updateUserAppStatuses,
};
