import { config } from "../config.js";

const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden : Route Authorized Only For Admins" });
  }
};

export default isAdmin;
