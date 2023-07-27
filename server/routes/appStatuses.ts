const express = require("express");
const router = express.Router();
const { requireAuth } = require("../utils/auth");

const {
  updateUserAppStatuses,
  addUserAppStatus,
  editUserAppStatus,
  deleteUserAppStatus,
} = require("../controllers/appStatusesController");

router.post("/", requireAuth, addUserAppStatus);
router.patch("/status-order", requireAuth, updateUserAppStatuses);
router.patch("/:statusId", requireAuth, editUserAppStatus);
// router.delete("/:statusId", requireAuth, deleteUserAppStatus);

module.exports = router;
export {};
