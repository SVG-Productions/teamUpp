const knex = require("../dbConfig");

const updateUserAppStatuses = async (userId: string, statusOrder: string[]) => {
  try {
    for (const [i, s] of statusOrder.entries()) {
      await knex("application_statuses")
        .where("user_id", userId)
        .andWhere("app_status", s)
        .update({ index: i });
    }
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error updating app statuses.");
  }
};

module.exports = {
  updateUserAppStatuses,
};
