const bodyParser = require('body-parser');
const PlayerController = require('../controllers/player.controller');

const controller = new PlayerController();


module.exports = function (app) {
  app.post(process.env.API_URL + '/player', bodyParser.json(), async (req, res) => controller.createPlayer(req, res));
  app.get(process.env.API_URL + '/player/:id', bodyParser.json(), async (req, res) => controller.getPlayerById(req, res));
  app.post(process.env.API_URL + '/player/:id', bodyParser.json(), async (req, res) => controller.playerIsReady(req, res));

  // app.delete(process.env.API_URL + '/room',
  //   async (req, res, next) => authMiddleware.verifyToken(req, res, next),
  //   async (req, res, next) => permissionMiddleware.permissionRequire(req, res, next,process.env.ADMIN),
  //   async (req, res) => controller.purgeRoom(req, res));
};
