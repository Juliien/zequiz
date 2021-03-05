const bodyParser = require('body-parser');
const PlayerController = require('../controllers').PlayerController;
const controller = new PlayerController();
const AuthenticationMiddleware = require('../middlewares').AuthenticationMiddleware;
const PermissionMiddleware = require('../middlewares').PermissionMiddleware;
const authMiddleware = new AuthenticationMiddleware();
const permissionMiddleware = new PermissionMiddleware();

module.exports = function (app) {
  app.get(process.env.API_URL + '/player/:id', async (req, res) => controller.getPlayerById(req, res));
  app.post(process.env.API_URL + '/player/score/:id', bodyParser.json(), async (req, res) => controller.updateScore(req, res));
  app.post(process.env.API_URL + '/player/end/:id', bodyParser.json(), async (req, res) => controller.playerEndQuiz(req, res));

  app.delete(process.env.API_URL + '/player',
    async (req, res, next) => authMiddleware.verifyToken(req, res, next),
    async (req, res, next) => permissionMiddleware.permissionRequire(req, res, next,[process.env.ADMIN]),
    async (req, res) => controller.purgePlayer(req, res));
};

