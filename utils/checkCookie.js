export const checkCookie = (cookie) => {
  const cookieArr = cookie?.split("; ");
  const accessTokenFromCookie = cookieArr
    ?.find((item) => item.split("=")[0] === "weather_access")
    ?.split("=")[1];
  const refreshTokenFromCookie = cookieArr
    ?.find((item) => item.split("=")[0] === "weather_refresh")
    ?.split("=")[1];
  return [accessTokenFromCookie, refreshTokenFromCookie];
};
