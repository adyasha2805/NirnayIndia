// routes/admin.js
const express = require("express");
const Candidate = require("../models/Candidate");
const auth = require("../middleware/auth");

const router = express.Router();

// Add Candidate
router.post("/candidates", auth, async (req, res) => {
  const { name, party, state, logo } = req.body;

  if (!name || !party || !state) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const newCandidate = new Candidate({ name, party, state, logo });
    await newCandidate.save();
    res.status(201).json({ message: "✅ Candidate added successfully" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to add candidate", error: err.message });
  }
});

// Delete Candidate
router.delete("/candidates", auth, async (req, res) => {
  const { name, state } = req.body;

  try {
    const result = await Candidate.findOneAndDelete({ name, state });

    if (!result) return res.status(404).json({ message: "Candidate not found" });
    res.status(200).json({ message: "🗑️ Candidate deleted" });
  } catch (err) {
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

// Load Voting Results
router.get("/results", auth, async (req, res) => {
  try {
    const candidates = await Candidate.find({}, "-_id name party state votes").sort({ votes: -1 });
    res.status(200).json(candidates);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching results", error: err.message });
  }
});

module.exports = router;
