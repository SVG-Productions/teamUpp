const Listing = require("../models/Listing");

const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.createListing(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

module.exports = { createListing };
