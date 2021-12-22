import config from "config";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenGenerator.js";
import { compareHashes } from "../utils/compareHashes.js";

import { User } from "../model/user.js";

const accessCookieOptions = config.get("cookie.accessCookieOptions");
const refreshCookieOptions = config.get("cookie.refreshCookieOptions");
const weatherAccessCookie = config.get("cookie.weatherAccessCookie");
const weatherRefreshCookie = config.get("cookie.weatherRefreshCookie");

export class AuthorizationController {
  static async authCheck(req, res) {
    res.status(200).send();
  }

  static async logout(req, res) {
    res.cookie(weatherAccessCookie, "", { ...accessCookieOptions, maxAge: 0 });
    res.cookie(weatherRefreshCookie, "", {
      ...refreshCookieOptions,
      maxAge: 0,
    });
    res.status(200).send();
  }

  static async login(req, res) {
    const { username, password } = req.body;

    User.findOne({ username }).then((user) => {
      if (!user) {
        res.status(404).json({ message: "User doesn't exist" });
      } else {
        const isPasswordValid = compareHashes(password, user.password);
        if (isPasswordValid) {
          res.cookie(
            weatherAccessCookie,
            generateAccessToken(),
            accessCookieOptions,
          );
          res.cookie(
            weatherRefreshCookie,
            generateRefreshToken(),
            refreshCookieOptions,
          );
          res.status(200).send();
        } else {
          res.status(403).json({ message: "Invalid password" });
        }
      }
    });
  }
}
