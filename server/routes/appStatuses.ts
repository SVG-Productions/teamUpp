const express = require("express");
const router = express.Router();
const { requireAuth } = require("../utils/auth");

const {
  updateUserAppStatuses,
} = require("../controllers/appStatusesController");

router.patch("/", requireAuth, updateUserAppStatuses);
