import jwt from "jsonwebtoken";
import config from "config";

const tokenKeyAccess = config.get("token.tokenKeyAccess");
const tokenKeyRefresh = config.get("token.tokenKeyRefresh");

export const isAccessValidHandle = async (accessTokenFromCookie) => {
  return await jwt.verify(accessTokenFromCookie, tokenKeyAccess, (err) => !err);
};

export const isRefreshValidHandle = async (refreshTokenFromCookie) => {
  return await jwt.verify(
    refreshTokenFromCookie,
    tokenKeyRefresh,
    (err) => !err,
  );
};
