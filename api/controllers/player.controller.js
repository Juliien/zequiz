const models = require('../models');
const Player = models.Player;

class PlayerController {

  async getPlayerById(req, res) {
    if (req.params.id) {
      try {
        const player = await Player.findById(req.params.id);
        if(player) {
          return res.status(200).json(player);
        }
        return res.status(404).end();
      } catch (e) {
        return res.status(500).send(e);
      }
    }
    return res.status(400).end();
  }

  async updateScore(req, res) {
    if (req.params.id && req.body.score) {
      try {
        const player = await Player.findById(req.params.id);
        if(player) {
          await Player.updateOne({_id: player._id}, {
            score: req.body.score
          });
          return res.status(204).end();
        }
        return res.status(404).end();
      } catch (e) {
        return res.status(500).send(e);
      }
    }
  }

  async playerEndQuiz(req, res) {
    if (req.params.id) {
      try {
        const player = await Player.findById(req.params.id);
        if(player) {
          await Player.updateOne({_id: player._id}, {
            isEnd: true
          });
          return res.status(204).end();
        }
        return res.status(404).end();
      } catch (e) {
        return res.status(500).send(e);
      }
    }
  }

  async purgePlayer(req, res) {
    try {
      await Player.deleteMany({isEnd: true});
      return res.status(204).end();
    } catch (e) {
      return res.status(500).send(e)
    }
  }
}

module.exports = PlayerController;
