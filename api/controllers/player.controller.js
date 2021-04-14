const Player = require('../models/player.model');
const date = new Date();

class PlayerController {

  async createPlayer(req, res) {
    if (req.body.nickname && req.body.photoUrl) {
      try {
        let playerIsOwner = false;

        if(req.body.isOwner) {
          playerIsOwner = true;
        }

        const newPlayer = new Player({
          nickname: req.body.nickname,
          photoUrl: req.body.photoUrl,
          isOwner: playerIsOwner,
          score: -1,
          createDate: date.toISOString()
        });

        const player = await newPlayer.save();
        if(player) {
          return res.status(201).json(player);
        }
        return res.status(401).end();
      } catch (e) {
        return res.status(500).send(e);
      }
    }
    return res.status(400).end();
  }

  async updatePlayerScore(req, res) {
    if (req.body.playerId && req.body.score) {
      try {
        const player = await Player.findOne({_id: req.body.playerId});
        if(player) {
          await Player.updateOne({_id: player._id}, {score: req.body.score});
          return res.status(204).end();
        }
        return res.status(409).end();
      } catch (e) {
        return res.status(500).send(e);
      }
    }
  }

  async getPlayerById(req, res) {
    if (req.params.id) {
      try {
        const player = await Player.findOne({_id: req.params.id});
        if (player) {
          return res.status(200).json(player);
        }
        return res.status(404).end();
      } catch (e) {
        return res.status(500).send(e);
      }
    }
    return res.status(400).send();
  }

  async purgePlayers(req, res) {
    try {
      await Player.deleteMany({createDate:{$ne: date.toISOString()}, score:{$ne: -1}});
      return res.status(204).end();
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  calculateScore(score) {
    switch (score) {
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
  }
}

module.exports = PlayerController;
