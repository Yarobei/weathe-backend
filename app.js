import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import config from "config";

import { AuthorizationController } from "./controllers/authorization.controller.js";
import { WeatherController } from "./controllers/weather.controller.js";

import { ensureAuthorized } from "./middleware/token.middleware.js";
import { connectToDB } from "./config/database.js";

const corsOrigin = config.get("server.corsOrigin");

const app = express();

connectToDB();

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: corsOrigin,
  }),
);
app.use(bodyParser.json());

app.get("/authorization", checkToken, AuthorizationController.authCheck);

app.post("/login", AuthorizationController.login);

app.get("/logout", AuthorizationController.logout);

app.get("/weather", checkToken, WeatherController.getWeather);

export { app };
