const jwt = require("jsonwebtoken");

module.exports = async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) res.status(401).send({ error: "Unauthorized" });

  const token =
    authHeader.split(" ").length > 1 ? authHeader.split(" ")[1] : authHeader;

  if (!token) return res.status(401).send({ error: "Unauthorized" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  });
};
