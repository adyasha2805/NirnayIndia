const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true
  },
  party: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  voterEmail: {
    type: String,
    required: true,
    unique: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vote', voteSchema);