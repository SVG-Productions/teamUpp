const express = require("express");
const router = express.Router();
const {
  createListing,
  getSingleListing,
  deleteListing,
  updateListing,
} = require("../controllers/listingsController");
const { route } = require("./teams");

/* GET listings. */
router.get("/", function (req, res, next) {
  res.json({ users: ["listingOne", "listingTwo", "listingThree"] });
});

router.post("/", createListing);
router.get("/:listingId", getSingleListing);
router.delete("/:listingId", deleteListing);
router.patch("/:listingId", updateListing);

module.exports = router;
