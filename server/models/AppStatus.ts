const knex = require("../dbConfig");

const updateUserAppStatuses = async (statusOrder: string[]) => {
  try {
    for (const [i, s] of statusOrder.entries()) {
      await knex("application_statuses").andWhere("id", s).update({ index: i });
    }
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error updating app statuses.");
  }
};

const addUserAppStatus = async (status: {
  userId: string;
  index: number;
  appStatus: string;
}) => {
  try {
    const [newStatus] = await knex("application_statuses")
      .insert(status)
      .returning("*");
    return newStatus;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error adding app status.");
  }
};

const editUserAppStatus = async (newStatus: string, oldStatus: string) => {
  try {
    await knex("application_statuses")
      .andWhere("id", oldStatus)
      .update({ appStatus: newStatus });
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error editing app status.");
  }
};

const deleteUserAppStatus = async (statusId: string) => {
  try {
    await knex("application_statuses").where("id", statusId).del();
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error deleting app status.");
  }
};

module.exports = {
  updateUserAppStatuses,
  addUserAppStatus,
  editUserAppStatus,
  deleteUserAppStatus,
};
