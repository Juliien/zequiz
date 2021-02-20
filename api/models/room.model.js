const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  createDate: {
    type: Date,
    required: true
  },
  closeDate: {
    type: Date,
    required: false,
    default: null
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    default: []
  }],
  code: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Room', roomSchema);
