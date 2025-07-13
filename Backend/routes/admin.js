const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Candidate = require('../models/Candidate');
const Vote = require('../models/Vote');

// Add new candidate
router.post('/candidates', auth, async (req, res) => {
  try {
    const { name, party, state, logo } = req.body;
    
    // Check if candidate already exists
    const existingCandidate = await Candidate.findOne({ name, state });
    if (existingCandidate) {
      return res.status(400).json({ message: 'Candidate already exists for this state' });
    }

    const newCandidate = new Candidate({
      name,
      party,
      state,
      logo: logo || `Logos/${party.toLowerCase()}.webp`
    });

    await newCandidate.save();
    res.status(201).json({ message: 'Candidate added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all candidates
router.get('/candidates', auth, async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get candidates by state
// Add this route to get candidates by state
router.get('/candidates/:state', auth, async (req, res) => {
  try {
    const { state } = req.params;
    const candidates = await Candidate.find({ state: state });
    
    if (!candidates || candidates.length === 0) {
      return res.status(404).json({ message: 'No candidates found for this state' });
    }
    
    res.json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ message: 'Error fetching candidates' });
  }
});

// Delete candidate
router.delete('/candidates', auth, async (req, res) => {
  try {
    const { name, state } = req.body;
    await Candidate.findOneAndDelete({ name, state });
    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get voting results
router.get('/results', auth, async (req, res) => {
  try {
    const results = await Vote.aggregate([
      {
        $group: {
          _id: {
            candidateName: '$candidateName',
            party: '$party',
            state: '$state'
          },
          votes: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          candidateName: '$_id.candidateName',
          party: '$_id.party',
          state: '$_id.state',
          votes: 1
        }
      }
    ]);
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
