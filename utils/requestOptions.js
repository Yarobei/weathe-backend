import config from "config";

const openWeatherMapUrl = config.get("openWeatherMapApi.openWeatherMapUrl");
const openWeatherMapKey = config.get("openWeatherMapApi.openWeatherMapKey");

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
