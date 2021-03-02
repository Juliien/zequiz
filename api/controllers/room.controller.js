const models = require('../models');
const Room = models.Room;
const Player = models.Player;
const date = new Date();

class RoomController {

  async createRoom(req, res) {
    if (req.params.quizId, req.body.quiz) {
      try {
        const newPlayer = new Player({
          score: -1,
          isEnd: false
        });
        const room = new Room({
          createDate: date.toISOString(),
          closeDate: null,
          players: [],
          quizId: req.params.quizId,
          quiz: req.body.quiz,
          isStart: false
        });
        const player = await newPlayer.save();
        const newRoom = await room.save();

        await Room.updateOne({_id: newRoom._id}, {
          $push: {players: player._id}
        });
        return res.status(200).json(newRoom);
      } catch (e) {
        return res.status(500).send(e);
      }
    }
    return res.status(400).end();
  }

  async getRoomById(req, res) {
    if(req.params.id) {
      try {
        const room = await Room.findOne({_id: req.params.id});
        if (room) {
          return res.status(200).json(room);
        }
        return res.status(404).end();
      } catch (e) {
        return res.status(500).send(e);
      }
    }
    return res.status(400).send();
  }

  async joinRoom(req, res) {
    if(req.params.id) {
      try {
        const room = await Room.findOne({_id: req.params.id, closeDate: null});
        if(room) {
          const newPlayer = new Player({
            score: -1,
            isEnd: false
          });
          const player = await newPlayer.save();
          if(player && !room.players.includes(player._id)) {
            await Room.updateOne({_id: room._id}, {
              isStart: true,
              $push: {players: player._id}
            });
          }
          return res.status(204).end();
        }
        return res.status(404).end();
      } catch (e) {
        return res.status(500).send(e);
      }
    }
    return res.status(400).end();
  }

  async closeRoom(req, res) {
    if(req.params.id) {
      try {
        const room = await Room.updateOne({_id: req.params.id}, {closeDate: date.toISOString()});
        if (room.nModified === 1) {
          return res.status(204).end();
        }
        return res.status(400).end();
      } catch (e) {
        return res.status(500).send(e);
      }
    }
    return res.status(400).end();
  }

  async purgeRoom(req, res) {
    try {
      await Room.deleteMany({closeDate:{$ne:null}});
      return res.status(204).end();
    } catch (e) {
      return res.status(500).send(e);
    }
  }
}

module.exports = RoomController;
