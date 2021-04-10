const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: false
  }],
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  quiz: {
    type: Object,
    required: true
  },
  isStart: {
    type: Boolean,
    required: false
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

module.exports = mongoose.model('Room', roomSchema);
