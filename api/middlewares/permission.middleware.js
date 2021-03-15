const ResponseUtil = require("../utils/response.util");
const response = new ResponseUtil();

class PermissionMiddleware {

  permissionRequire(req, res, next, permission) {
    let authorization = false;
    if (req.decoded.permissionLevel.toString() === permission) {
      authorization = true;
    }

    if (authorization) {
      next();
    } else {
      return res.status(401).json(response.responseError(401, 'Unauthorized', 'Permission denied.'));
    }
  }
}

module.exports = PermissionMiddleware;

