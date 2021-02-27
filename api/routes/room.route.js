const bodyParser = require('body-parser');
const RoomController = require('../controllers').RoomController;


module.exports = function (app) {
  app.post(process.env.API_URL + '/room/:quizId', bodyParser.json(), RoomController.createRoom);
  app.get(process.env.API_URL + '/room/:id', bodyParser.json(), RoomController.getRoomById);
  app.post(process.env.API_URL + '/room/join/:id', bodyParser.json(), RoomController.joinRoom);
  app.post(process.env.API_URL + '/room/close/:id', bodyParser.json(), RoomController.closeRoom);
  app.delete(process.env.API_URL + '/room/:key', bodyParser.json(), RoomController.purgeRoom);
};
