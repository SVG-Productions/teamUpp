const knex = require("../dbConfig");

const createListing = async (listing) => {
  try {
    const [createdListing] = await knex("listings")
      .insert(listing)
      .returning(["id", "jobTitle", "companyName"]);
    return createdListing;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

module.exports = { createListing };
