const express = require("express");
const router = express.Router();

const { validateLogin } = require("../utils/validation");
const {
  loginUser,
  logoutUser,
  restoreXsrfToken,
} = require("../controllers/sessionController");

router.post("/", validateLogin, loginUser);
router.delete("/", logoutUser);
// should not be available in production
if (process.env.NODE_ENV !== "production") {
  router.get("/csrf/restore", restoreXsrfToken);
}

module.exports = router;
