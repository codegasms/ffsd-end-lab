import { config } from "../config.js";
import jwt from "jsonwebtoken";

function extractTokenFromHeader(req) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    return token;
  }
  return null;
}

function extractTokenFromCookie(req) {
  console.log("cookie", req.cookies);

  if (!req.cookies) return null;
  const cookieToken = req.cookies.accessToken;
  console.log("cookie token", cookieToken);
  if (cookieToken) return cookieToken;
  return null;
}

const verify = (req, res, next) => {
  const token = extractTokenFromCookie(req) || extractTokenFromHeader(req);
  if (token) {
    jwt.verify(token, config.jwt.secret, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "Missing Authentication Header or Cookie" });
  }
};

export default verify;
