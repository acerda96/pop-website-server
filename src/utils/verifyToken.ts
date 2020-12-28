import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ error: "Unauthorized" });

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
}

export function verifyOptionalToken(req, res, next) {
  const authHeader = req.headers?.authorization;

  if (!authHeader) {
    return next();
  }

  const token =
    authHeader.split(" ").length > 1 ? authHeader.split(" ")[1] : authHeader;

  if (!token) return next();

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return next();
    }
    req.user = user;
    next();
  });
}
