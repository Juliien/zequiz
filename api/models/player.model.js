const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
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
