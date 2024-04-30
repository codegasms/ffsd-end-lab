import { Router } from "express";
import { User } from "../models/user.js";
import { Survey } from "../models/survey.js";
import verify from "../middlewares/verify.js";
import isAdmin from "../middlewares/isAdmin.js";

import { config } from "../config.js";

const router = Router();
router.use(verify);

router.post("/create", async (req, res) => {
  const survey = new Survey({
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    education: req.body.education,
    yearsOfCoding: req.body.yearsOfCoding,
    industry: req.body.industry,
    openSource: req.body.openSource,
    versionControl: req.body.versionControl,
    tools: req.body.tools,
    hoursOfStudy: req.body.hoursOfStudy,
  });

  await survey.save();
  res
    .status(200)
    .json({ message: "Survey created successfully", survey: survey });
});

router.get("/list", isAdmin, async (req, res) => {
  const surveys = await Survey.find().exec();
  return res.status(200).json({ surveys: surveys });
});

export default router;
