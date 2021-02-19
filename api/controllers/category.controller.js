const models = require('../models');

exports.getUserById = async (req, res) => {
  if (req.params.id) {
    try {
      // const user = await User.findOne({_id: req.params.id});
      if (true) {
        return res.status(200).json({message:"cool"});
      } else {
        return res.status(400).json();
      }
    } catch (e) {
      return res.status(500).json();
    }
  } else {
    return res.status(400).json();
  }
};

