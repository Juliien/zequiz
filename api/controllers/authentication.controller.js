const models = require('../models');
const bCrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const date = new Date();
const User = models.User;


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
            currentScore: 500,
            photoUrl: 'avatar_1.png',
            permissionLevel: 1,
            token: null,
            createDate: date.toISOString(),
            closeDate: null
          });
          await user.save();
          return res.status(201).end();
        }
        return res.status(409).end();
      } catch (e) {
        return res.status(500).end();
      }
    }
    return res.status(400).end();
  }

  async login(req, res) {
    if (req.body.email && req.body.password) {
      try {
        const user = await User.findOne({email: req.body.email});
        if (user && !user.closeDate && bCrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({id: user._id, permissionLevel: user.permissionLevel},
            process.env.JWT_SECRET, {expiresIn: '30d'});

          await User.updateOne({_id: user.id}, {token: token});
          const loggedUser = await User.findOne({_id: user.id});
          return res.status(200).json(loggedUser);
        }
        return res.status(401).end();
      } catch (e) {
        return res.status(500).end();
      }
    }
    return res.status(400).end();
  }

  async logout(req, res) {
    try {
        await User.updateOne({_id: req.decoded.id}, {token: null});
        return res.status(204).end();
    } catch (e) {
      return res.status(500).end();
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

  async updateScore(req, res) {
    if(req.body.score) {
      let score = 0;
      switch (req.body.score) {
        case 0:
          score = -14;
          break;
        case 1:
          score = -12;
          break;
        case 2:
          score = -10;
          break;
        case 3:
          score = -8;
          break;
        case 4:
          score = -6;
          break;
        case 5:
          score = 10;
          break;
        case 6:
          score = 12;
          break;
        case 7:
          score = 14;
          break;
        case 8:
          score = 16;
          break;
        case 9:
          score = 18;
          break;
        case 10:
          score = 20;
          break;
      }
      if(req.body.opponentScore !== -1 && req.body.score > 4 && req.body.score > req.body.opponentScore) {
        score = score * 2;
      }
      try {
        const currentUser = await User.findOne({_id: req.decoded.id});
        await User.updateOne({_id: req.decoded.id}, {currentScore: currentUser.currentScore + score});
        const user = await User.findOne({_id: req.decoded.id});

        return res.status(200).json(user);
      } catch (e) {
        return res.status(500).end();
      }
    }
    return res.status(400).end();
  }

  async updateAvatar(req, res) {
    if (req.body.avatar) {
      try {
        await User.updateOne({_id: req.decoded.id}, {photoUrl: req.body.avatar});
        const user = await User.findOne({_id: req.decoded.id});
        return res.status(200).json(user);
      } catch (e) {
        return res.status(500).end();
      }
    }
    return res.status(400).end();
  }

  async getRanks(req, res) {
    try {
      const users = await User.find().sort({currentScore: -1}).limit(20);
      if(users) {
        return res.status(200).json(users);
      }
      return res.status(404).end();
    } catch (e) {
      return res.status(500).send(e);
    }
  }
}


module.exports = AuthenticationController;
