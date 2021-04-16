const bodyParser = require('body-parser');
const axios = require('axios');
const cryptoJS = require("crypto-js");

module.exports = function (app) {
  app.get(process.env.API_URL + '/quiz/:num', bodyParser.json(), async (req, res) => {
    if(req.params.num) {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&category=' + req.params.num.toString() +'&type=boolean');
        if(response.data.results) {
          const encryptJson = cryptoJS.AES.encrypt(JSON.stringify(response.data.results), process.env.SECRET_KEY).toString();
          return res.status(200).json(encryptJson);
        }
        return res.status(404).end();
      } catch (e) {
        res.status(500).json(e);
      }
    }
    return res.status(400).end();
  });
};
