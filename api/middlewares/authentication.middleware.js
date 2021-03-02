const jwt = require("jsonwebtoken");

class AuthenticationMiddleware {

  async verifyToken(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({message: "Unauthorized token"});
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).json({message: "No token provided!"});
    }
  }
}

module.exports = AuthenticationMiddleware;
