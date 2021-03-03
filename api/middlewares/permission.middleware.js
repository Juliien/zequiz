class PermissionMiddleware {

  permissionRequire(req, res, next, permissionList) {
    let authorization = false;
    for(let level of permissionList) {
      if (req.decoded.permissionLevel.toString() === level) {
        authorization = true;
      }
    }

    if (authorization) {
      next();
    } else {
      return res.status(401).json({message: "Unauthorized! Permission refused!"});
    }
  }
}

module.exports = PermissionMiddleware;

