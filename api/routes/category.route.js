const bodyParser = require('body-parser');
const CategoryController = require('../controllers').CategoryController;
const controller = new CategoryController();

module.exports = function (app) {
  app.post(process.env.API_URL + '/category', bodyParser.json(), async (req, res) => controller.insertCategory(req, res));
  app.get(process.env.API_URL + '/categories', async (req, res) => controller.getCategories(req, res));
  app.get(process.env.API_URL + '/category/:num', async (req, res) => controller.getCategoryByNumber(req, res));
  app.delete(process.env.API_URL + '/category/:id', async (req, res) => controller.deleteCategory(req, res));
};
