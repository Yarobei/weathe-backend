import axios from "axios";

import { requestOptions } from "../utils/requestOptions.js";

export class WeatherController {
  static async getWeather(req, res) {
    await axios
      .request(requestOptions(req.query.cityName))
      .then((response) => {
        if (response.ok) {
          res.status(200).json(response.data);
        } else {
          res.status(response.status).json(response.data);
        }
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.statusText);
      });
  }
}
