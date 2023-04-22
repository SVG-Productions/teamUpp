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
        "listings.teamId",
        "listings.userId",
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

const updateListing = async (listingId, updates) => {
  try {
    const [updatedListing] = await knex("listings")
      .where("id", listingId)
      .update(updates)
      .returning("*");
    return updatedListing;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const deleteListing = async (listingId) => {
  try {
    const [deletedListing] = await knex("listings")
      .where("id", listingId)
      .del()
      .returning("*");
    return deletedListing;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};
const addFavorite = async (userId, listingId) => {
  try {
    const [addedFavorite] = await knex("users_favorites")
      .insert({
        userId,
        listingId,
      })
      .returning(["user_id", "listing_id"]);

    return addedFavorite;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const deleteFavorite = async (userId, listingId) => {
  try {
    const [deletedFavorite] = await knex("users_favorites")
      .where("user_id", userId)
      .andWhere("listing_id", listingId)
      .del()
      .returning("*");
    return deletedFavorite;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

module.exports = {
  createListing,
  getSingleListing,
  deleteListing,
  updateListing,
  addFavorite,
  deleteFavorite,
};
