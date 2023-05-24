const express = require("express");
const router = express.Router();
const {
  createListing,
  getSingleListing,
  deleteListing,
  updateListing,
  addFavorite,
  deleteFavorite,
} = require("../controllers/listingsController");
const { validateListing } = require("../utils/validation");

router.post("/", validateListing, createListing);
router.get("/:listingId", getSingleListing);
router.delete("/:listingId", deleteListing);
router.patch("/:listingId", updateListing);
router.post("/:listingId/favorites", addFavorite);
router.delete("/:listingId/favorites", deleteFavorite);

module.exports = router;
