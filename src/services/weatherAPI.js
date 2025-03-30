const API_KEY = "389c762880e04bf81375965e3f723365"; 
/**
 * Fetches current weather data for the given city.
 * @param {string} city - City name
 * @returns {Promise<Object>}
 */
export const fetchWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch current weather.");
  }

  return data;
};

/**
 * Fetches 5-day weather forecast (3-hour intervals) for the given city.
 * @param {string} city - City name
 * @returns {Promise<Object>}
 */
export const fetchForecast = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch forecast.");
  }

  return data;
};
