const knex = require("../dbConfig");

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

module.exports = {
  getSingleListing,
};
