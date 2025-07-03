// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  addCandidate,
  deleteCandidate,
  getResults
} = require("../controllers/adminController");

router.post("/candidates", addCandidate);
router.delete("/candidates", deleteCandidate);
router.get("/results", getResults);

module.exports = router;
