const bodyParser = require('body-parser');
const AuthenticationController = require('../controllers').AuthenticationController;
const AuthenticationMiddleware = require('../middlewares').AuthenticationMiddleware;
const PermissionMiddleware = require('../middlewares').PermissionMiddleware;
const controller = new AuthenticationController();
const authMiddleware = new AuthenticationMiddleware();
const permissionMiddleware = new PermissionMiddleware();


module.exports = function (app) {
  app.post(process.env.API_URL + '/register', bodyParser.json(), async (req, res) => controller.register(req, res));
  app.post(process.env.API_URL + '/login', bodyParser.json(), async (req, res) => controller.login(req, res));
  app.post(process.env.API_URL + '/logout', bodyParser.json(),
    async (req, res, next) => authMiddleware.verifyToken(req, res, next),
    async (req, res, next) => permissionMiddleware.permissionRequire(req, res, next,
      [process.env.FREE, process.env.PAID, process.env.ADMIN]),
    async (req, res) => controller.logout(req, res)
  );
};
