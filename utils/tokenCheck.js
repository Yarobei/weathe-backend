import jwt from "jsonwebtoken";

const { TOKEN_KEY_ACCESS, TOKEN_KEY_REFRESH } = process.env;

export const isAccessValidHandle = async (accessTokenFromCookie) => {
  return await jwt.verify(
    accessTokenFromCookie,
    TOKEN_KEY_ACCESS,
    (err, decoded) => !err,
  );
};

export const isRefreshValidHandle = async (refreshTokenFromCookie) => {
  return await jwt.verify(
    refreshTokenFromCookie,
    TOKEN_KEY_REFRESH,
    (err, decoded) => !err,
  );
};
