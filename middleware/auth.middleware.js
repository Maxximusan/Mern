const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
    if (!token) {
      res.status(401).json({ message: "Нет авторизации" });

      const decoded = jwt.verify(token, config.get("jwtSecretKey"));
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Нет авторизации" });
  }
};
