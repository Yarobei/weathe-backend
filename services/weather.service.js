import axios from "axios";

import { requestOptions } from "../utils/requestOptions.js";

export const getWeatherForCity = (cityName) => {
  return axios
    .request(requestOptions(cityName))
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((error) => {
      const status = error.response?.status;
      if (status === 404) {
        return Promise.reject({
          status,
          message: "There is no city with such name",
        });
      } else if (status === 429) {
        return Promise.reject({
          status,
          message: "Surpassing the limit of your requests",
        });
      } else {
        return Promise.reject({
          status: 500,
          message: "Something went wrong on the server",
        });
      }
    });
};
