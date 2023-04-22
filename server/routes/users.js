const express = require("express");
const router = express.Router();

const { validateSignup } = require("../utils/validation");
const {
  getAllUsers,
  getSingleUser,
  addUserFavorite,
  deleteUserFavorite,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/", validateSignup, createUser);
router.get("/:username", getSingleUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

router.post("/:userId/favorites", addUserFavorite);
router.delete("/:userId/favorites", deleteUserFavorite);

module.exports = router;
