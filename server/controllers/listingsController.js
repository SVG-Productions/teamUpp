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

module.exports = { createListing, getSingleListing };
