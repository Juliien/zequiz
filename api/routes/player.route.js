const bodyParser = require('body-parser');
const PlayerController = require('../controllers/player.controller');
const AuthenticationMiddleware = require('../middlewares/authentication.middleware');
const PermissionMiddleware = require('../middlewares/permission.middleware');

const authMiddleware = new AuthenticationMiddleware();
const permissionMiddleware = new PermissionMiddleware();
const controller = new PlayerController();


module.exports = function (app) {
  app.post(process.env.API_URL + '/player', bodyParser.json(), async (req, res) => controller.createPlayer(req, res));
  app.post(process.env.API_URL + '/player/score', bodyParser.json(), async (req, res) => controller.updatePlayerScore(req, res));
  app.get(process.env.API_URL + '/player/:id', bodyParser.json(), async (req, res) => controller.getPlayerById(req, res));

  app.delete(process.env.API_URL + '/players',
    async (req, res, next) => authMiddleware.verifyToken(req, res, next),
    async (req, res, next) => permissionMiddleware.permissionRequire(req, res, next, process.env.ADMIN),
    async (req, res) => controller.purgePlayers(req, res));
};
