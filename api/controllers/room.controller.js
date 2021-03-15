const Room = require('../models/category.model');
const ResponseUtil = require("../utils/response.util");

const response = new ResponseUtil();
const date = new Date();

class RoomController {

  async createRoom(req, res) {
    if (req.params.categoryId && req.body.quiz && req.body.playerId) {
      try {
        const room = new Room({
          players: [],
          categoryId: req.params.categoryId,
          quiz: req.body.quiz,
          createDate: date.toISOString(),
          closeDate: null
        });
        const newRoom = await room.save();
        if(newRoom) {
          await Room.updateOne({_id: newRoom._id}, {
            isStart: true,
            $push: {players: req.body.playerId}
          });
        }
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
          if(room.players.length > 2){
            return res.status(403).json(response.responseError(403, 'Forbidden', 'The room is full.'))
          }
          if(!room.players.includes()) {
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
