import express from "express";
import cors from "cors";

import { AuthorizationController } from "./controllers/authorization.controller.js";

import { checkToken } from "./middleware/token.middleware.js";
import { WeatherController } from "./controllers/weather.controller.js";

const { CORS_ORIGIN } = process.env;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: CORS_ORIGIN,
  }),
);

app.get("/authorization", checkToken, AuthorizationController.authCheck);

app.post("/login", AuthorizationController.login);

app.get("/weather", checkToken, WeatherController.getWeather);

export { app };
