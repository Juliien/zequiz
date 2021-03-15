const jwt = require("jsonwebtoken");
const ResponseUtil = require("../utils/response.util");
const response = new ResponseUtil();

class AuthenticationMiddleware {

  async verifyToken(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send(response.responseError(401, 'Unauthorized', 'Token invalid or expired.'));
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).json(response.responseError(403, 'Forbidden', 'No token provided.'));
    }
  }
}

module.exports = AuthenticationMiddleware;
