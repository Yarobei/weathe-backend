import express from "express";
import cors from "cors";
import axios from "axios";

import { checkCookie } from "./utils/checkCookie.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "./constants/constants.js";
import { requestOptions } from "./utils/requestOptions.js";
import { refreshToken, token } from "./utils/tokenGenerator.js";
import {
  isAccessValidHandle,
  isRefreshValidHandle,
} from "./utils/tokenCheck.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "https://localhost:3000",
  }),
);

app.get("/authorization", async (req, res) => {
  const [accessTokenFromCookie, refreshTokenFromCookie] = checkCookie(
    req.headers["cookie"],
  );
  if (accessTokenFromCookie && refreshTokenFromCookie) {
    const isAccessValid = await isAccessValidHandle(accessTokenFromCookie);
    if (isAccessValid) {
      res.status(200).send();
    } else {
      const isRefreshValid = await isRefreshValidHandle(refreshTokenFromCookie);

      if (isRefreshValid) {
        res.cookie("weather_access", token, accessTokenOptions);
        res.cookie("weather_refresh", refreshToken, refreshTokenOptions);
        res.status(200).json({ signedIn: true });
      } else {
        res.status(401).send();
      }
    }
  } else if (refreshTokenFromCookie) {
    const isRefreshValid = await isRefreshValidHandle(refreshTokenFromCookie);
    if (isRefreshValid) {
      res.cookie("weather_access", token, accessTokenOptions);
      res.cookie("weather_refresh", refreshToken, refreshTokenOptions);
      res.status(200).json({ signedIn: true });
    } else {
      res.status(401).send();
    }
  } else {
    res.status(401).send();
  }
});

app.post("/login", async (req, res) => {
  res.cookie("weather_access", token, accessTokenOptions);
  res.cookie("weather_refresh", refreshToken, refreshTokenOptions);
  res.status(200).json({ signedIn: true });
});

app.get("/weather", async (req, res) => {
  const [accessTokenFromCookie, refreshTokenFromCookie] = checkCookie(
    req.headers["cookie"],
  );
  if (accessTokenFromCookie && refreshTokenFromCookie) {
    const isAccessValid = await isAccessValidHandle(accessTokenFromCookie);
    if (isAccessValid) {
      await axios
        .request(requestOptions(req.query.cityName))
        .then((response) => {
          res.status(200).json(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const isRefreshValid = await isRefreshValidHandle(refreshTokenFromCookie);
      if (isRefreshValid) {
        await axios
          .request(requestOptions(req.query.cityName))
          .then((response) => {
            res.cookie("weather_access", token, accessTokenOptions);
            res.cookie("weather_refresh", refreshToken, refreshTokenOptions);
            res.status(200).json(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        res.status(401).send();
      }
    }
  } else if (refreshTokenFromCookie) {
    const isRefreshValid = await isRefreshValidHandle(refreshTokenFromCookie);
    if (isRefreshValid) {
      await axios
        .request(requestOptions(req.query.cityName))
        .then((response) => {
          res.cookie("weather_access", token, accessTokenOptions);
          res.cookie("weather_refresh", refreshToken, refreshTokenOptions);
          res.status(200).json(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      res.status(401).send();
    }
  } else {
    res.status(401).send();
  }
});

export { app };
