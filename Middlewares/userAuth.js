const jwt = require("jsonwebtoken");
const validAccessToken = require("./validAccessToken.js");
function authenticateUserToken(req, res, next) {
  return validAccessToken(req, res, () => {
    // this is only accessable by users not admins
    if (req.user.isAdmin) res.sendStatus(403);

    next();
  });
}

module.exports = authenticateUserToken;
