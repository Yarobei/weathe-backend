import config from "config";

const weatherAccessCookie = config.get("cookie.weatherAccessCookie");
const weatherRefreshCookie = config.get("cookie.weatherRefreshCookie");

export const checkCookie = (cookie) => {
  const cookieArr = cookie?.split("; ");
  const accessTokenFromCookie = cookieArr
    ?.find((item) => item.split("=")[0] === weatherAccessCookie)
    ?.split("=")[1];
  const refreshTokenFromCookie = cookieArr
    ?.find((item) => item.split("=")[0] === weatherRefreshCookie)
    ?.split("=")[1];
  return [accessTokenFromCookie, refreshTokenFromCookie];
};
