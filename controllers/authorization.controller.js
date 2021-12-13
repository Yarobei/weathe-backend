import { refreshToken, token } from "../utils/tokenGenerator.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../constants/constants.js";

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
