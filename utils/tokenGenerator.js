import jwt from "jsonwebtoken";
import config from "config";

const tokenKeyAccess = config.get("token.tokenKeyAccess");
const tokenKeyRefresh = config.get("token.tokenKeyRefresh");
const tokenAccessOptions = config.get("token.tokenAccessOptions");
const tokenRefreshOptions = config.get("token.tokenRefreshOptions");

export const generateAccessToken = (user_id) =>
  jwt.sign({ user_id }, tokenKeyAccess, tokenAccessOptions);

export const generateRefreshToken = (user_id) =>
  jwt.sign({ user_id }, tokenKeyRefresh, tokenRefreshOptions);
