const Listing = require("../models/Listing");

const createListing = async (req, res, next) => {
  try {
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
    res.status(200).json(listing);
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
    res.status(200).json({ message: "Listing deleted.", deletedListing });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createListing,
  getSingleListing,
  deleteListing,
  updateListing,
};
