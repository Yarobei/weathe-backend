import jwt from "jsonwebtoken";
import config from "config";

import { User } from "../model/user.js";
import { connect } from "../config/database.js";

const tokenKeyAccess = config.get("token.tokenKeyAccess");
const tokenKeyRefresh = config.get("token.tokenKeyRefresh");

connect();

const user = await User.findOne({ id: "61b33711da2eb61149cb521b" });

export const token = () =>
  jwt.sign({ user_id: user._id }, tokenKeyAccess, {
    expiresIn: "5m",
  });

export const refreshToken = () =>
  jwt.sign({ user_id: user._id }, tokenKeyRefresh, {
    expiresIn: "30d",
  });
