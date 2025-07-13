const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
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
  logo: {
    type: String,
    default: 'images/default-logo.png'
  }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);