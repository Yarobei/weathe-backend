import jwt from "jsonwebtoken";
import { User } from "../model/user.js";
import { connect } from "../config/database.js";

const { TOKEN_KEY_ACCESS, TOKEN_KEY_REFRESH } = process.env;

connect();

const user = await User.findOne({ id: "61b33711da2eb61149cb521b" });

export const token = jwt.sign({ user_id: user._id }, TOKEN_KEY_ACCESS, {
  expiresIn: "5m",
});

export const refreshToken = jwt.sign({ user_id: user._id }, TOKEN_KEY_REFRESH, {
  expiresIn: "30d",
});
