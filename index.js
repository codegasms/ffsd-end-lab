import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import surveyRoutes from "./routes/survey.js";

import { config } from "./config.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// app.use(cors({origin: [...list of allowed origins]}))
// if cors is required
// dont fking use liveserver
// express is already serving all files under public

app.use(cookieParser());

app.set("views", "views");

app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connect(config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

app.use("/auth", authRoutes);
app.use("/survey", surveyRoutes);

app.listen(config.port, () => {
  console.log("Server is running on port 3000");
});
