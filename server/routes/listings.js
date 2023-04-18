const express = require("express");
const router = express.Router();
const {
  createListing,
  getSingleListing,
  deleteListing,
} = require("../controllers/listingsController");

/* GET listings. */
router.get("/", function (req, res, next) {
  res.json({ users: ["listingOne", "listingTwo", "listingThree"] });
});

router.post("/", createListing);
router.get("/:listingId", getSingleListing);
router.delete("/:listingId", deleteListing);

module.exports = router;
