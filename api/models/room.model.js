const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  players: [{
    type: Object,
    required: false
  }],
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  quiz: {
    type: Object,
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
