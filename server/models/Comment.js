const knex = require("../dbConfig");

const getListingComments = async (listingId) => {
  try {
    const comments = await knex("comments")
      .select("*")
      .where("listingId", listingId);
    return comments;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

module.exports = { getListingComments };
