import { ListingType, TeamType } from "../types";

const knex = require("../dbConfig");

const createListing = async (listing: ListingType) => {
  try {
    const [appliedStatus] = await knex("application_statuses")
      .where("application_statuses.user_id", listing.userId)
      .andWhere("application_statuses.app_status", "applied");
    const currentListings = await knex("listings")
      .where("listings.user_id", listing.userId)
      .andWhere("listings.status_id", appliedStatus.id);
    const [createdListing] = await knex("listings")
      .insert({
        ...listing,
        index: currentListings.length,
        statusId: appliedStatus.id,
      })
      .returning(["id", "jobTitle", "companyName"]);

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
      .join(
        "application_statuses",
        "application_statuses.id",
        "listings.status_id"
      )
      .select(
        "listings.*",
        "users.username as username",
        "application_statuses.app_status"
      )
      .where("listings.id", listingId)
      .first();
    const sharedTeams = await knex
      .table("teams_listings")
      .where("listing_id", listingId)
      .pluck("team_id");
    console.log(sharedTeams);
    return { ...listing, sharedTeams };
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
  getListingExperiences,
};
