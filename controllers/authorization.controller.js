import config from "config";

import { refreshToken, token } from "../utils/tokenGenerator.js";
import { compareHashes } from "../utils/compareHashes.js";

import { User } from "../model/user.js";

const accessTokenOptions = config.get("token.accessTokenOptions");
const refreshTokenOptions = config.get("token.refreshTokenOptions");
const weatherAccessCookie = config.get("cookie.weatherAccessCookie");
const weatherRefreshCookie = config.get("cookie.weatherRefreshCookie");

export class AuthorizationController {
  static async authCheck(req, res) {
    res.status(200).send();
  }

  static async login(req, res) {
    res.cookie("weather_access", token, accessTokenOptions);
    res.cookie("weather_refresh", refreshToken, refreshTokenOptions);
    res.status(200).json({ signedIn: true });
  }
}
