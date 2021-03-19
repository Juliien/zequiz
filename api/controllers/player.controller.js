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
          isReady: false,
          score: -1,
          createDate: date.toISOString(),
          closeDate: null
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

  async getPlayerById(req, res) {
    if(req.params.id) {
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

  async playerIsReady(req, res) {
    if(req.params.id) {
      try {
        const player = await Player.findOne({_id: req.params.id});
        if(player && !player.isReady) {
          await Player.updateOne({_id: player._id}, {isReady: true});
          return res.status(204).end();
        }
        return res.status(409).end();
      } catch (e) {
          return res.status(500).send(e);
      }
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
