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
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  quiz: [{
    type: Object,
    required: false
  }],
  isStart: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model('Room', roomSchema);
