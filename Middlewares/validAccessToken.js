const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  const authHeader = req.cookies.accessToken;
  console.log("access token", req.cookies.accessToken);
  const token = authHeader;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    err && console.log(err && err.message);
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
