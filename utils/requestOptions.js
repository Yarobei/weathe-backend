const { X_RAPIDAPI_URL, X_RAPIDAPI_HOST, X_RAPIDAPI_KEY } = process.env;

export const requestOptions = (cityName) => {
  return {
    method: "GET",
    url: X_RAPIDAPI_URL,
    params: {
      q: `${cityName}`,
      lang: "en",
      units: "metric",
    },
    headers: {
      "x-rapidapi-host": X_RAPIDAPI_HOST,
      "x-rapidapi-key": X_RAPIDAPI_KEY,
    },
  };
};
