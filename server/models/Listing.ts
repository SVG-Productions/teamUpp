import { ListingType } from "../types";

const knex = require("../dbConfig");

const createListing = async (listing: ListingType) => {
  try {
    const { teamId, ...updatedListing } = listing;
    const [createdListing] = await knex("listings")
      .insert(updatedListing)
      .returning(["id", "jobTitle", "companyName"]);

    await knex("teams_listings").insert({
      listingId: createdListing.id,
      teamID: listing.teamId,
    });

    return createdListing;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error creating listing.");
  }
};
const getSingleListing = async (listingId: string) => {
  try {
    const listing = await knex("listings")
      .join("users", "users.id", "listings.userId")
      .join("teams_listings", "teams_listings.listing_id", "listings.id")
      .join("teams", "teams.id", "teams_listings.teamId")
      .select(
        "listings.*",
        "users.username as username",
        "teams.name as teamName"
      )
      .where("listings.id", listingId)
      .andWhere("team.id")
      .first();
    return listing;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting listing.");
  }
};

const updateListing = async (listingId: string, updates: ListingType) => {
  try {
    const [updatedListing] = await knex("listings")
      .where("id", listingId)
      .update(updates)
      .returning("*");
    return updatedListing;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error updating listing.");
  }
};

const deleteListing = async (listingId: string) => {
  try {
    const [deletedListing] = await knex("listings")
      .where("id", listingId)
      .del()
      .returning("*");
    return deletedListing;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error deleting listing.");
  }
};
const addFavorite = async (
  userId: string,
  listingId: string,
  teamId: string
) => {
  try {
    const [addedFavorite] = await knex("users_favorites")
      .insert({
        userId,
        listingId,
        teamId,
      })
      .returning(["user_id", "listing_id"]);

    return addedFavorite;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error adding listing to favorites.");
  }
};

const deleteFavorite = async (
  userId: string,
  listingId: string,
  teamId: string
) => {
  try {
    const [deletedFavorite] = await knex("users_favorites")
      .where("user_id", userId)
      .andWhere("listing_id", listingId)
      .andWhere("team_id", teamId)
      .del()
      .returning("*");
    return deletedFavorite;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error deleting listing from favorites.");
  }
};

const getListingComments = async (listingId: string, teamId: string) => {
  try {
    const comments = await knex("comments")
      .join("users", "comments.userId", "=", "users.id")
      .select("comments.*", "username", "photo", "avatar")
      .where("listingId", listingId)
      .andWhere("teamId", teamId)
      .orderBy("createdAt", "desc");
    return comments;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting listing comments.");
  }
};

const getListingExperiences = async (listingId: string) => {
  try {
    const experiences = await knex("experiences")
      .join("users", "experiences.userId", "=", "users.id")
      .select("experiences.*", "username")
      .where("listing_id", listingId)
      .orderBy("createdAt", "desc");
    return experiences;
  } catch (error: any) {
    console.error("Database Error: " + error.message);
    throw new Error("Error getting listing experiences.");
  }
};

module.exports = {
  createListing,
  getSingleListing,
  deleteListing,
  updateListing,
  addFavorite,
  deleteFavorite,
  getListingComments,
  getListingExperiences,
};
