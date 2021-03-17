require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cors = require('cors');
const routes = require('./routes');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('room', msg => {
    io.emit('room', msg);
  });

  socket.on('disconnect', () => {});
});

server.listen(5000, () => console.log('Websocket started on port 5000'));

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(error => console.log('MongoDB Connection Error:' + error.message));

app.use(cors());

routes(app);

app.listen(process.env.PORT, () => console.log('Server started on port ' + process.env.PORT));

module.exports = app;
