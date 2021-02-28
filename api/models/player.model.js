const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    default: null
  },
  score: {
    type: Number,
    required: true
  },
  isEnd : {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Player', playerSchema);
