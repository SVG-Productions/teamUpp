const express = require("express");
const router = express.Router();
const {
  createListing,
  getSingleListing,
  deleteListing,
  updateListing,
} = require("../controllers/listingsController");

router.post("/", createListing);
router.get("/:listingId", getSingleListing);
router.delete("/:listingId", deleteListing);
router.patch("/:listingId", updateListing);

module.exports = router;
