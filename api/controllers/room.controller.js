const models = require('../models');
const Room = models.Room;
const User = models.User;
const date = new Date();

exports.createRoom = async (req, res) => {
  if (req.body.isCustom) {
    try {
      let code = 0;
      if(req.body.isCustom === "true") {
        let isCodeExist = true;
        let room;
        while(isCodeExist) {
          code = Math.floor(100000 + Math.random() * 900000);
          room = await Room.findOne({code: code});
          if(!room) {
            isCodeExist = false;
          }
        }
      }
      const room = new Room({
        createDate: date.toISOString(),
        isCustom: req.body.isCustom,
        code: code
      });
      await room.save();
      return res.status(200).json(room);
    } catch (e) {
      res.status(500).json("Error Server: " + e);
    }
  } else {
    res.status(400).json("Bad Request");
  }
};

exports.checkRoom = async (req, res) => {
  try {
    const room = await Room.findOne({isCustom: false, code: 0, closeDate: null,
      players: {$gte: 0, $lte: 99}});
    if(room) {
      return res.status(200).json(room);
    } else {
      return res.status(204).json();
    }
  } catch (e) {
    return res.status(500).json(e);
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findOne({_id: req.params.id});
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(400).json();
    }
  } catch (e) {
    res.status(500).json();
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const room = await Room.findOne({_id: req.params.id, players: {$gte: 0, $lte: 99}});
    const user = await User.findOne({_id: req.body.userId});
    if(room && user && !room.users.includes(user._id)) {
      await Room.updateOne({_id: room._id}, {
        players: room.players + 1,
        $push: {users: user._id}
      });
      return res.status(204).end();
    } else {
      return res.status(400).json();
    }
  } catch (e) {
    return res.status(500).json(e);
  }
};

exports.joinCustomRoom = async (req, res) => {
  try {
    const room = await Room.findOne({code: req.body.code, players: {$gte: 0, $lte: 99}});
    const user = await User.findOne({_id: req.body.userId});
    if(room && user && !room.users.includes(user._id)) {
      await Room.updateOne({_id: room._id}, {
        players: room.players + 1,
        $push: {users: user._id}
      });
      return res.status(200).json(room);
    } else {
      return res.status(400).json();
    }
  } catch (e) {
    return res.status(500).json(e);
  }
};

