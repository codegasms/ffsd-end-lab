import { Schema, model } from "mongoose";

export const roles = ["user", "admin"];

export const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "user",
    enum: roles,
  },
});

export const User = model("User", userSchema);
