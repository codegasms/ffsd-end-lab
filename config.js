import { configDotenv } from "dotenv";

configDotenv();

export const config = {
  owner: process.env.OWNER || "Codegasms",
  port: process.env.SERVER_PORT || 3000,
  db: {
    url: process.env.DB_URL || "mongodb://localhost:27017/NewDB",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    ttl: process.env.JWT_TTL || "1d",
  },
};
