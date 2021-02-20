const models = require('../models');
const Category = models.Category;
const date = new Date();

class CategoryController {

  async getCategories(req, res) {
    try {
      const categories = await Category.find();
      if (categories) {
        return res.status(200).json(categories);
      }
      return res.status(400).end();
    } catch (e) {
      return res.status(500).end();
    }
  }

  async insertCategory(req, res) {
    if (req.body.name && req.body.num && req.body.photoUrl && req.params.key) {
      if(req.params.key === process.env.ADMIN_KEY) {
        try {
          const newCategory = new Category({
            name: req.body.name,
            num:req.body.num,
            photoUrl: req.body.photoUrl,
            views: 0,
            rate: 0,
            createDate: date.toISOString()
          });
          await newCategory.save();
          return res.status(201).end();
        } catch (e) {
          return res.status(500).send("Error Server: " + e);
        }
      }
      return  res.status(401).end();
    }
    return res.status(400).end();
  }

  async deleteCategory(req, res) {
    if(req.params.id && req.params.key) {
      if(req.params.key === process.env.ADMIN_KEY) {
        try {
          await Category.deleteOne({_id: req.params.id});
          return res.status(204).end();
        } catch (e) {
          return res.status(500).send("Error Server: " + e)
        }
      }
      return res.status(401).end();
    }
    return res.status(400).end();
  }
}

module.exports = CategoryController;
