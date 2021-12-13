import { checkCookie } from "../utils/checkCookie.js";
import {
  isAccessValidHandle,
  isRefreshValidHandle,
} from "../utils/tokenCheck.js";
import { refreshToken, token } from "../utils/tokenGenerator.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../constants/constants.js";

export const checkToken = async (req, res, next) => {
  try {
    const [accessTokenFromCookie, refreshTokenFromCookie] = checkCookie(
      req.headers["cookie"],
    );
    if (!accessTokenFromCookie && !refreshTokenFromCookie) {
      res.status(401).send();
    }
    const isAccessValid = await isAccessValidHandle(accessTokenFromCookie);
    if (!isAccessValid) {
      const isRefreshValid = await isRefreshValidHandle(refreshTokenFromCookie);
      if (isRefreshValid) {
        res.cookie("weather_access", token, accessTokenOptions);
        res.cookie("weather_refresh", refreshToken, refreshTokenOptions);
        next();
      } else {
        res.status(401).send();
      }
    } else {
      next();
    }
  } catch (error) {
    console.log("Error:" + error);
    res.status(401).send();
  }
};
