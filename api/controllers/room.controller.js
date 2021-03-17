const Room = require('../models/room.model');
const ResponseUtil = require("../utils/response.util");

const response = new ResponseUtil();
const date = new Date();

class RoomController {

  async createRoom(req, res) {
    if (req.body.categoryId && req.body.quiz && req.body.playerId) {
      try {
        const room = new Room({
          players: [req.body.playerId],
          categoryId: req.body.categoryId,
          quiz: req.body.quiz,
          createDate: date.toISOString(),
          closeDate: null
        });
        await room.save();
        return res.status(201).json(room);
      } catch (e) {
        return res.status(500).json(e);
      }
    }
    return res.status(400).end();
  }

  async getRoomById(req, res) {
    if(req.params.id) {
      try {
        const room = await Room.findOne({_id: req.params.id}).populate('players');
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
    if(req.body.roomId && req.body.playerId) {
      try {
        const room = await Room.findOne({_id: req.body.roomId, closeDate: null});
        if(room) {
          if(!room.players.includes(req.body.playerId)) {
            await Room.updateOne({_id: room._id}, {
              $push: {players: req.body.playerId}
            });
            return res.status(204).end();
          }
          return res.status(409).end();
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
