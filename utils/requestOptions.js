export const requestOptions = (cityName) => {
  return {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    params: {
      q: `${cityName}`,
      lang: "en",
      units: "metric",
    },
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": "db7ee5e803msh2d21f7b82050fe8p1ebaf1jsn61998401b62d",
    },
  };
};
