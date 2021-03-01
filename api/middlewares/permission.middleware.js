class PermissionMiddleware {
  async permissionRequire(req, res, next, permissionList) {
    let authorization = false;
    console.log(req.decoded.permissionLevel.toString());
    for(let level in permissionList) {
      if (req.decoded.permissionLevel.toString() === level) {
        authorization = true;
      }
    }

    if (authorization) {
      next();
    } else {
      return res.status(401).json({message: "Unauthorized !"});
    }
  }
}

module.exports = PermissionMiddleware;

