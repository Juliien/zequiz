const bodyParser = require('body-parser');
const CategoryController = require('../controllers').CategoryController;
const controller = new CategoryController();

module.exports = function (app) {
  app.get(process.env.API_URL + '/categories', async (req, res) => controller.getCategories(req, res));
  app.get(process.env.API_URL + '/category/most/viewed', async (req, res) => controller.getViews(req, res));
  app.post(process.env.API_URL + '/category/views', bodyParser.json(), async (req, res) => controller.addView(req, res));
  app.get(process.env.API_URL + '/category/:id', async (req, res) => controller.getCategoryByID(req, res));
  app.post(process.env.API_URL + '/category/:key', bodyParser.json(), async (req, res) => controller.insertCategory(req, res));
  app.delete(process.env.API_URL + '/category/:id/:key', async (req, res) => controller.deleteCategory(req, res));
};
