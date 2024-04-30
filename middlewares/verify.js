import { config } from "../config.js";
import jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, config.jwt.secret, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "Missing Authentication Header" });
  }
};

export default verify;
