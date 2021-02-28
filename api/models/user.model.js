const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nickname: {
    type: String,
    required: false
  },
  email: {
   type: String,
   required: true
  },
  password: {
    type: String,
    required: true
  },
  currentScore: {
    type: Number,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  permissionLevel: {
    type: Number,
    required: true
  },
  createDate : {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
