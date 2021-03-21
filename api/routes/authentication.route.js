const bodyParser = require('body-parser');
const AuthenticationController = require('../controllers/authentication.controller');
const AuthenticationMiddleware = require('../middlewares/authentication.middleware');
const PermissionMiddleware = require('../middlewares/permission.middleware');
const controller = new AuthenticationController();
const authMiddleware = new AuthenticationMiddleware();
const permissionMiddleware = new PermissionMiddleware();


module.exports = function (app) {
  app.post(process.env.API_URL + '/register', bodyParser.json(), async (req, res) => controller.register(req, res));
  app.post(process.env.API_URL + '/login', bodyParser.json(), async (req, res) => controller.login(req, res));
  app.post(process.env.API_URL + '/logout',
    async (req, res, next) => authMiddleware.verifyToken(req, res, next),
    async (req, res) => controller.logout(req, res)
  );
  app.get(process.env.API_URL + '/user',
    async (req, res, next) => authMiddleware.verifyToken(req, res, next),
    async (req, res) => controller.getUserById(req, res)
  );
};
