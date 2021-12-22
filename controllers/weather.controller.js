import { getWeatherForCity } from "../services/weather.service.js";

export class WeatherController {
  static async getWeatherForCity(req, res) {
    const cityName = req.query?.cityName;
    if (!cityName) {
      return res.status(400).json({ message: "City field is required" });
    }
    try {
      const response = await getWeatherForCity(cityName);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }
}
