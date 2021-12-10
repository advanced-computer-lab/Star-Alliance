const jwt = require("jsonwebtoken");
const validAccessToken = require("./validAccessToken.js");
function authenticateUserToken(req, res, next) {
  return validAccessToken(req, res, next);
}

module.exports = authenticateUserToken;
