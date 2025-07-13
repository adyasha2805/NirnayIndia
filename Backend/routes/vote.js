const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Vote = require('../models/Vote'); // Make sure you have this model

router.post('/cast', auth, async (req, res) => {
  try {
    const { candidateName, party, state, voterEmail } = req.body;

    // Check if user has already voted
    const existingVote = await Vote.findOne({ voterEmail });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already cast your vote' });
    }

    // Create new vote
    const vote = new Vote({
      candidateName,
      party,
      state,
      voterEmail
    });

    await vote.save();
    res.status(200).json({ message: 'Vote cast successfully' });
  } catch (error) {
    console.error('Vote casting error:', error);
    res.status(500).json({ message: 'Error casting vote' });
  }
});

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
          name: '$_id.candidateName',
          party: '$_id.party',
          state: '$_id.state',
          votes: 1
        }
      }
    ]);
    
    res.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Error fetching results' });
  }
});

module.exports = router;