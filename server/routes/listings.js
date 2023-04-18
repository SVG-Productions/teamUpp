const express = require("express");
const router = express.Router();
const {
  createListing,
  getSingleListing,
} = require("../controllers/listingsController");

/* GET listings. */
router.get("/", function (req, res, next) {
  res.json({ users: ["listingOne", "listingTwo", "listingThree"] });
});

router.post("/", createListing);
router.get("/:listingId", getSingleListing);

module.exports = router;
