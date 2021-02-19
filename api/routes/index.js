module.exports = function (app) {
  require('./category.route')(app);
  require('./room.route')(app);
};
