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
  photoUrl: {
    type: String,
    required: true
  },
  permissionLevel: {
    type: Number,
    required: true,
  },
  token: {
    type: String,
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

module.exports = mongoose.model('User', userSchema);
