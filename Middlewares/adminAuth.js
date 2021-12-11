const jwt = require("jsonwebtoken");
const validAccessToken = require("./validAccessToken.js");

function authenticateAdminToken(req, res, next) {
  return validAccessToken(req, res, () => {
    // this is only accessable by admins not users
    if (!req.user.isAdmin) res.sendStatus(403);

    next();
  });
}

module.exports = authenticateAdminToken;
