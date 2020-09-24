import dotenv from "dotenv";

dotenv.config();

export const url =
  process.env.NODE_ENV === "production"
    ? "https://booklopedia.herokuapp.com"
    : "http://localhost:5000";
