const bodyParser = require('body-parser');
const RoomController = require('../controllers').RoomController;
const controller = new RoomController();


module.exports = function (app) {
  app.post(process.env.API_URL + '/room/:quizId', bodyParser.json(), async (req, res) => controller.createRoom(req, res));
  app.get(process.env.API_URL + '/room/:id', bodyParser.json(), async (req, res) => controller.getRoomById(req, res));
  app.post(process.env.API_URL + '/room/join/:id', bodyParser.json(),async (req, res) => controller.joinRoom(req, res));
  app.post(process.env.API_URL + '/room/close/:id', bodyParser.json(), async (req, res) => controller.closeRoom(req, res));
  app.delete(process.env.API_URL + '/room/:key', async (req, res) => controller.purgeRoom(req, res));
};
