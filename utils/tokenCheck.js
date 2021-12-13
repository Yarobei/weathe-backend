import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { TOKEN_KEY_ACCESS, TOKEN_KEY_REFRESH } = process.env;

export const isAccessValidHandle = async (accessTokenFromCookie) => {
  return await jwt.verify(
    accessTokenFromCookie,
    TOKEN_KEY_ACCESS,
    (err) => !err,
  );
};

export const isRefreshValidHandle = async (refreshTokenFromCookie) => {
  return await jwt.verify(
    refreshTokenFromCookie,
    TOKEN_KEY_REFRESH,
    (err) => !err,
  );
};
