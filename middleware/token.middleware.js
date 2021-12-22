import config from "config";

import { parseCookie } from "../utils/parseCookie.js";
import {
  accessDecodeHandle,
  refreshDecodeHandle,
} from "../utils/tokenCheck.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenGenerator.js";

const accessCookieOptions = config.get("cookie.accessCookieOptions");
const refreshCookieOptions = config.get("cookie.refreshCookieOptions");
const weatherAccessCookie = config.get("cookie.weatherAccessCookie");
const weatherRefreshCookie = config.get("cookie.weatherRefreshCookie");

export const ensureAuthorized = async (req, res, next) => {
  try {
    const [accessTokenFromCookie, refreshTokenFromCookie] = parseCookie(
      req.headers["cookie"],
    );
    if (!accessTokenFromCookie && !refreshTokenFromCookie) {
      return res.status(401).send();
    }

    const accessDecoded = await accessDecodeHandle(accessTokenFromCookie);
    if (accessDecoded) {
      return next();
    }

    const refreshDecoded = await refreshDecodeHandle(refreshTokenFromCookie);
    if (refreshDecoded) {
      res.cookie(
        weatherAccessCookie,
        generateAccessToken(refreshDecoded.user_id),
        accessCookieOptions,
      );
      res.cookie(
        weatherRefreshCookie,
        generateRefreshToken(refreshDecoded.user_id),
        refreshCookieOptions,
      );
      return next();
    }

    res.status(401).send();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong on the server" });
  }
};
