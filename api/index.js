require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cors = require('cors');
const routes = require('./routes');

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(error => console.log('MongoDB Connection Error:' + error.message));

const whitelist = ['http://localhost:4200', 'https://www.zequiz.net']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

routes(app);

app.listen(process.env.PORT, () => console.log('Server started on port ' + process.env.PORT));

module.exports = app;
