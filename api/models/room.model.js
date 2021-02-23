const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  createDate: {
    type: Date,
    required: true
  },
  closeDate: {
    type: Date,
    required: false
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: false
  }],
  code: {
    type: Number,
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  isStart: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model('Room', roomSchema);
