import config from "config";

import { checkCookie } from "../utils/checkCookie.js";
import {
  isAccessValidHandle,
  isRefreshValidHandle,
} from "../utils/tokenCheck.js";
import { refreshToken, token } from "../utils/tokenGenerator.js";

const accessTokenOptions = config.get("token.accessTokenOptions");
const refreshTokenOptions = config.get("token.refreshTokenOptions");
const weatherAccessCookie = config.get("cookie.weatherAccessCookie");
const weatherRefreshCookie = config.get("cookie.weatherRefreshCookie");

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
        res.cookie(weatherAccessCookie, token(), accessTokenOptions);
        res.cookie(weatherRefreshCookie, refreshToken(), refreshTokenOptions);
        next();
      } else {
        res.status(401).send();
      }
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send();
  }
};
