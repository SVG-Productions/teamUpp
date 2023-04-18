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
const getSingleListing = async (listingId) => {
  try {
    const listing = await knex("listings")
      .join("users", "users.id", "listings.userId")
      .join("teams", "teams.id", "listings.teamId")
      .select(
        "listings.id",
        "listings.jobTitle",
        "listings.jobLink",
        "listings.companyName",
        "listings.companyDetails",
        "listings.jobDescription",
        "listings.createdAt",
        "users.username as username",
        "teams.name as teamName"
      )
      .where("listings.id", listingId)
      .first();
    return listing;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const deleteListing = async (listingId) => {
  try {
    const deletedListing = await knex("listings").where("id", listingId).del();
    return deletedListing;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

module.exports = { createListing, getSingleListing, deleteListing };
