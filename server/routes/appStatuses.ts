const express = require("express");
const router = express.Router();
const { requireAuth } = require("../utils/auth");

const {
  updateUserAppStatuses,
  addUserAppStatus,
} = require("../controllers/appStatusesController");

router.post("/", requireAuth, addUserAppStatus);
router.patch("/", requireAuth, updateUserAppStatuses);

module.exports = router;
export {};
