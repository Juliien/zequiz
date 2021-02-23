const models = require('../models');
const Room = models.Room;
const Player = models.Player;
const date = new Date();

exports.createRoom = async (req, res) => {
  if (req.params.quizId) {
    try {
      let code = 0;
      let isCodeExist = true;
      let r;
      while(isCodeExist) {
        code = Math.floor(100000 + Math.random() * 900000);
        r = await Room.findOne({code: code, closeDate: null});
        if(!r) {
          isCodeExist = false;
        }
      }
      const newPlayer = new Player({
        score: -1,
        isEnd: false
      });
      const room = new Room({
        createDate: date.toISOString(),
        closeDate: null,
        players: [],
        code: code,
        quizId: req.params.quizId,
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
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findOne({_id: req.params.id});
    if (room) {
      return res.status(200).json(room);
    }
    return res.status(400).end();
  } catch (e) {
    return res.status(500).send(e);
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const room = await Room.findOne({code: req.params.code, closeDate: null});
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
      return res.status(200).json(room);
    }
      return res.status(404).end();
  } catch (e) {
    return res.status(500).send(e);
  }
};

exports.closeRoom = async (req, res) => {
  try {
    const room = await Room.updateOne({_id: req.params.id}, {closeDate: date.toISOString()});
    if (room.nModified === 1) {
      return res.status(204).end();
    }
    return res.status(400).end();
  } catch (e) {
    return res.status(500).send(e);
  }
};

