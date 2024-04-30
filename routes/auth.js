import { Router } from "express";
import { User } from "../models/user.js";
import verify from "../middlewares/verify.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { config } from "../config.js";

const router = Router();

router.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: hash,
  });

  const existing = await User.findOne({ username: req.body.username }).exec();
  if (existing) {
    return res.status(400).json({ message: "Username already taken" });
  } else {
    await user.save();
    res.status(200).json({ message: "User created successfully" });
  }
});

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      username: user.username,
      role: user.role,
      iat: Date.now(),
      signedBy: config.owner,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.ttl }
  );
};

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username: username }).exec();
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  const ispassvalid = await bcrypt.compare(password, user.password);
  if (ispassvalid) {
    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      accessToken: accessToken,
      message: "User logged in successfully",
    });
  } else {
    return res
      .status(401)
      .json({ message: "Invalid Credentials : Wrong Password" });
  }
});

router.get("/perms", verify, async (req, res) => {
  return res.status(200).json({ user: req.user });
});

export default router;
