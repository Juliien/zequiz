const bCrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const ResponseUtil = require("../utils/response.util");
const User = require('../models/user.model');

const response = new ResponseUtil();
const date = new Date();


class AuthenticationController {

  async register(req, res) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (req.body.email && emailRegex.test(String(req.body.email).toLowerCase()) && req.body.nickname && req.body.password) {
      try {
        const mail = await User.findOne({email: req.body.email});
        const name = await User.findOne({nickname: req.body.nickname});
        if(!mail && !name) {
          const user = new User({
            nickname: req.body.nickname,
            email: req.body.email,
            password: bCrypt.hashSync(req.body.password, 10),
            photoUrl: 'avatar_1.png',
            permissionLevel: 1,
            token: null,
            createDate: date.toISOString(),
            closeDate: null
          });
          await user.save();
          return res.status(201).end();
        }
        return res.status(409).json(response.responseError(409, 'Conflict', 'This user already exists.'));
      } catch (e) {
        return res.status(500).json(response.responseError(500, 'Internal Server Error', 'error: ' + e));
      }
    }
    return res.status(400).json(response.responseError(400, 'Bad Request', 'One or all fields are empty.'));
  }

  async login(req, res) {
    if (req.body.email && req.body.password) {
      try {
        const user = await User.findOne({email: req.body.email});
        if (user && !user.closeDate && bCrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({id: user._id, permissionLevel: user.permissionLevel},
            process.env.JWT_SECRET, {expiresIn: '1h'});

          await User.updateOne({_id: user.id}, {token: token});
          const loggedUser = await User.findOne({_id: user.id});
          return res.status(200).json(loggedUser);
        }
        return res.status(401).json(response.responseError(401, 'Unauthorized', 'Wrong email or password.'));
      } catch (e) {
        return res.status(500).json(response.responseError(500, 'Internal Server Error', 'error: ' + e));
      }
    }
    return res.status(400).json(response.responseError(400, 'Bad Request', 'Fields can\'t be empty.'));
  }

  async logout(req, res) {
    try {
        await User.updateOne({_id: req.decoded.id}, {token: null});
        return res.status(204).end();
    } catch (e) {
      return res.status(500).json(response.responseError(500, 'Internal Server Error', 'error: ' + e));
    }
  }

  async getUserById(req, res) {
    try {
      const user = await User.findOne({_id: req.decoded.id});
      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).end();
    }
  }
}

module.exports = AuthenticationController;
