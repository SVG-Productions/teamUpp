const knex = require("../dbConfig");

const getSingleListing = async (listingId) => {
  try {
    const listing = await knex("listings").where("id", listingId).first();
    return listing;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

module.exports = {
  getSingleListing,
};
