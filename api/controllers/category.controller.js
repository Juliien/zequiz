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

  async getCategoryByID(req, res) {
    if(req.params.id) {
      try {
        const category = await Category.findById(req.params.id);
        if (category) {
          return res.status(200).json(category);
        }
        return res.status(404).end();
      } catch (e) {
        return res.status(500).send(e);
      }
    }
    return res.status(400).end();
  }

  async getNewCategory(req, res) {
    try {
      const news = await Category.find().sort({createDate: -1}).limit(3);
      if(news) {
        return res.status(200).json(news);
      }
      return res.status(404).end();
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  async getViews(req, res) {
    try {
      const views = await Category.find().sort({views: -1}).limit(3);
      if(views) {
        return res.status(200).json(views);
      }
      return res.status(404).end();
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  async addView(req, res) {
    if(req.body._id && req.body.views >= 0) {
      try {
        const updatedViews = await Category.updateOne({_id: req.body._id}, {views: req.body.views + 1});
        if(updatedViews.nModified === 1) {
          return res.status(204).end();
        }
        return res.status(401).end();
      } catch (e) {
        return res.status(500).send(e);
      }
    }
    return res.status(400).end();
  }

  async insertCategory(req, res) {
    if (req.body.name && req.body.num && req.body.photoUrl) {
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
        return res.status(500).send(e);
      }
    }
    return res.status(400).end();
  }

  async deleteCategory(req, res) {
    if(req.params.id) {
        try {
          await Category.deleteOne({_id: req.params.id});
          return res.status(204).end();
        } catch (e) {
          return res.status(500).send(e)
        }
    }
    return res.status(400).end();
  }
}

module.exports = CategoryController;
