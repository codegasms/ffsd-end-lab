import { Schema, model } from "mongoose";

export const sex = ["Male", "Female", "Transgender"];

export const surveySchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    unique: true,
  },
  name: String,
  gender: {
    type: String,
    enum: sex,
  },
  age: Number,
  education: String,
  yearsOfCoding: Number,
  industry: String,
  openSource: Boolean,
  versionControl: String,
  tools: String,
  hoursOfStudy: String,
});

export const Survey = model("Survey", surveySchema);
