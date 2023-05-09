const knex = require("../dbConfig");

const addLink = async (link) => {
  try {
    const [createdLink] = await knex("experiences_links")
      .insert(link)
      .returning("*");
    return createdLink;
  } catch (error) {
    throw new Error("Database Error:" + error.message);
  }
};

const deleteLink = async (linkId) => {
  try {
    const [deletedLink] = await knex("experiences_links")
      .where("id", linkId)
      .del()
      .returning("id");
    return deletedLink;
  } catch (error) {
    throw new Error("Database Error:" + error.message);
  }
};

module.exports = {
  addLink,
  deleteLink,
};
