import { Knex } from "knex";
import { ListingType, TeamType, UserType } from "../types";

const knex = require("../dbConfig");
const bcrypt = require("bcrypt");
const { DatabaseError } = require("pg");

const updateUserAppStatuses = async (userId: string, statusOrder: string[]) => {
  try {
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting user listings.");
  }
};

module.exports = {
  updateUserAppStatuses,
};
