import jwt from "jsonwebtoken";
import config from "config";

const tokenKeyAccess = config.get("token.tokenKeyAccess");
const tokenKeyRefresh = config.get("token.tokenKeyRefresh");

export const accessDecodeHandle = async (accessTokenFromCookie) => {
  return await jwt.verify(
    accessTokenFromCookie,
    tokenKeyAccess,
    (err, decoded) => {
      if (err) {
        return null;
      }
      return decoded;
    },
  );
};

export const refreshDecodeHandle = async (refreshTokenFromCookie) => {
  return await jwt.verify(
    refreshTokenFromCookie,
    tokenKeyRefresh,
    (err, decoded) => {
      if (err) {
        return null;
      }
      return decoded;
    },
  );
};
