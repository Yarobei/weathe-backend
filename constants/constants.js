export const accessTokenOptions = {
  httpOnly: true,
  maxAge: 300000,
  sameSite: "none",
  domain: "localhost",
  secure: true,
};

export const refreshTokenOptions = {
  httpOnly: true,
  maxAge: 3600 * 1000 * 24 * 30,
  sameSite: "none",
  domain: "localhost",
  secure: true,
};
