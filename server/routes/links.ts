const express = require("express");
const router = express.Router();

const { addLink, deleteLink } = require("../controllers/linksController");

router.post("/", addLink);
router.delete("/:linkId", deleteLink);

module.exports = router;
export {};
