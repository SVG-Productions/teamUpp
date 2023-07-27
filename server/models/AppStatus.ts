import { application } from "express";

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
    await knex("application_statuses").insert(status);
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error adding app status.");
  }
};

const editUserAppStatus = async (
  userId: string,
  newStatus: string,
  oldStatus: string
) => {
  try {
    await knex("application_statuses")
      .where("user_id", userId)
      .andWhere("id", oldStatus)
      .update({ appStatus: newStatus });
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error editing app status.");
  }
};

module.exports = {
  updateUserAppStatuses,
  addUserAppStatus,
  editUserAppStatus,
};
