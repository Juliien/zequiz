const bodyParser = require('body-parser');
const RoomController = require('../controllers/room.controller');
const AuthenticationMiddleware = require('../middlewares/authentication.middleware');
const PermissionMiddleware = require('../middlewares/permission.middleware');

const controller = new RoomController();
const authMiddleware = new AuthenticationMiddleware();
const permissionMiddleware = new PermissionMiddleware();


module.exports = function (app) {
  app.post(process.env.API_URL + '/room', bodyParser.json(), async (req, res) => controller.createRoom(req, res));
  app.get(process.env.API_URL + '/room/:id', bodyParser.json(), async (req, res) => controller.getRoomById(req, res));
  app.post(process.env.API_URL + '/room/join', bodyParser.json(),async (req, res) => controller.joinRoom(req, res));
  app.post(process.env.API_URL + '/room/close/:id', bodyParser.json(), async (req, res) => controller.closeRoom(req, res));

  // app.delete(process.env.API_URL + '/room',
  //   async (req, res, next) => authMiddleware.verifyToken(req, res, next),
  //   async (req, res, next) => permissionMiddleware.permissionRequire(req, res, next,process.env.ADMIN),
  //   async (req, res) => controller.purgeRoom(req, res));
};
