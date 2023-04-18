const express = require("express");
const router = express.Router();

const { getSingleListing } = require("../controllers/listingsController");

router.get("/:listingId", getSingleListing);

module.exports = router;
