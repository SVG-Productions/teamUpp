const Listing = require("../models/Listing");

const createListing = async (req, res, next) => {
  try {
    console.log(req.body);
    const { salaryAmount, salaryFrequency } = req.body;
    if (salaryAmount && !salaryFrequency) {
      return res.status(400).json({
        message: "You must supply a frequency with the salary amount!",
      });
    }
    if (!salaryAmount && salaryFrequency) {
      return res.status(400).json({
        message: "You must supply an amount with the salary frequency!",
      });
    }
    const listing = await Listing.createListing(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const getSingleListing = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.getSingleListing(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }
    const comments = await Listing.getListingComments(listingId);
    const experiences = await Listing.getListingExperiences(listingId);

    res.status(200).json({ ...listing, comments, experiences });
  } catch (error) {
    next(error);
  }
};

const updateListing = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.updateListing(listingId, req.body);
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const deletedListing = await Listing.deleteListing(listingId);
    if (!deletedListing) {
      return res.status(404).json({ message: "Listing not found." });
    }
    res.status(200).json({ message: "Listing successfully deleted." });
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { listingId } = req.params;
    const addedFavorite = await Listing.addFavorite(id, listingId);

    res.status(201).json(addedFavorite);
  } catch (error) {
    next(error);
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { listingId } = req.params;
    const deletedFavorite = await Listing.deleteFavorite(id, listingId);
    if (!deletedFavorite) {
      return res.status(404).json({ message: "Favorite not found." });
    }
    res.status(200).json({ message: "Favorite successfully deleted." });
  } catch (error) {
    next(error);
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
