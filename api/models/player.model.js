const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  nickname: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  isOwner: {
    type: Boolean,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  createDate: {
    type: Date,
    required: true
  },
  closeDate: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model('Player', playerSchema);
