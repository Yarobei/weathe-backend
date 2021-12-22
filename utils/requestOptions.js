import config from "config";

const openWeatherMapUrl = config.get("rapidApi.openWeatherMapUrl");
const openWeatherMapKey = config.get("rapidApi.openWeatherMapKey");

export const requestOptions = (cityName) => {
  return {
    method: "GET",
    url: openWeatherMapUrl,
    params: {
      q: `${cityName}`,
      lang: "en",
      units: "metric",
      appid: openWeatherMapKey,
    },
  };
};
