const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  num: {
    type: Number,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  createDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Category', categorySchema);
