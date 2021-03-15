
class PlayerController {
  async createPlayer(req, res) {
    if(req.body.score) {
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
