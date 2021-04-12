const bodyParser = require('body-parser');
const CategoryController = require('../controllers/category.controller');
const AuthenticationMiddleware = require('../middlewares/authentication.middleware');
const PermissionMiddleware = require('../middlewares/permission.middleware');

const controller = new CategoryController();
const authMiddleware = new AuthenticationMiddleware();
const permissionMiddleware = new PermissionMiddleware();


module.exports = function (app) {
  app.post(process.env.API_URL + '/category',
    async (req, res, next) => authMiddleware.verifyToken(req, res, next),
    async (req, res, next) => permissionMiddleware.permissionRequire(req, res, next,process.env.ADMIN),
    async (req, res) => controller.insertCategory(req, res));
  app.get(process.env.API_URL + '/categories', async (req, res) => controller.getCategories(req, res));
  app.get(process.env.API_URL + '/category/new', async (req, res) => controller.getNewCategory(req, res));
  app.post(process.env.API_URL + '/category/views', bodyParser.json(), async (req, res) => controller.addView(req, res));
  app.post(process.env.API_URL + '/category/rate', bodyParser.json(), async (req, res) => controller.addRate(req, res));
  app.get(process.env.API_URL + '/category/most/viewed', async (req, res) => controller.getViews(req, res));
  app.get(process.env.API_URL + '/category/:id', bodyParser.json(), async (req, res) => controller.getCategoryByID(req, res));
  app.delete(process.env.API_URL + '/category/:id', bodyParser.json(),
    async (req, res, next) => authMiddleware.verifyToken(req, res, next),
    async (req, res, next) => permissionMiddleware.permissionRequire(req, res, next,process.env.ADMIN),
    async (req, res) => controller.deleteCategory(req, res));
};
