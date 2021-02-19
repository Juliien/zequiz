const bodyParser = require('body-parser');

module.exports = function (app) {
  app.get(process.env.API_URL + '/test', bodyParser.json(),  async (req, res) => {
    return res.status(200).json({message: 'api v1'});
  });
};
