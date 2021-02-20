const bodyParser = require('body-parser');
const RoomController = require('../controllers').RoomController;


module.exports = function (app) {
  app.post(process.env.API_URL + '/room', bodyParser.json(), RoomController.createRoom);
  app.get(process.env.API_URL + '/room/check', RoomController.checkRoom);
  app.post(process.env.API_URL + '/room/custom', bodyParser.json(), RoomController.joinCustomRoom);
  app.get(process.env.API_URL + '/room/:id', bodyParser.json(), RoomController.getRoomById);
  app.post(process.env.API_URL + '/room/:id', bodyParser.json(), RoomController.joinRoom);
};
