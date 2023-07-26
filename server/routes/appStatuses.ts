const express = require("express");
const router = express.Router();
const { requireAuth } = require("../utils/auth");

const {
  updateUserAppStatuses,
  addUserAppStatus,
  editUserAppStatus,
} = require("../controllers/appStatusesController");

router.post("/", requireAuth, addUserAppStatus);
router.patch("/", requireAuth, editUserAppStatus);
router.patch("/status-order", requireAuth, updateUserAppStatuses);

module.exports = router;
export {};
