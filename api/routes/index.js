module.exports = function (app) {
  require('./category.route')(app);
  require('./room.route')(app);
  require('./authentication.route')(app);
  require('./player.route')(app);
  //require('./quiz.route')(app);
};
