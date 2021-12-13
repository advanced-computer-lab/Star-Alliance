const jwt = require("jsonwebtoken");
const validAccessToken = require("./validAccessToken.js");

function authenticateAdminToken(req, res, next) {
  return validAccessToken(req, res, () => {
    // this is only accessable by admins not users
    if (!req.user.isAdmin) {
      console.log("User is not an admin, blocked (403");
      res.sendStatus(403);
    }

    next();
  });
}

module.exports = authenticateAdminToken;
