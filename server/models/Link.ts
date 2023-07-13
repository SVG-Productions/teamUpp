import { LinkType } from "../types";

const knex = require("../dbConfig");

const addLinks = async (links: LinkType[]) => {
  try {
    const createdLinks = await knex("experiences_links")
      .insert(links)
      .returning("*");
    return createdLinks;
  } catch (error: any) {
    console.error("Database Error:" + error.message);
    throw new Error("Error adding experience link(s).");
  }
};

const deleteLink = async (linkId: string) => {
  try {
    const [deletedLink] = await knex("experiences_links")
      .where("id", linkId)
      .del()
      .returning("id");
    return deletedLink;
  } catch (error: any) {
    console.error("Database Error:" + error.message);
    throw new Error("Error deleting experience link.");
  }
};

module.exports = {
  addLinks,
  deleteLink,
};
