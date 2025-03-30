import React from "react";

const WeatherCard = ({ data }) => {
  const { name, weather, main, wind } = data;
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-md w-full max-w-sm text-center border border-white/50 dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <img src={iconUrl} alt={weather[0].description} className="mx-auto" />
      <p className="text-4xl font-bold mb-1">{main.temp}°C</p>
      <p className="text-lg mb-2">{weather[0].main}</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind: {wind.speed} km/h</p>
    </div>
  );
};

export default WeatherCard;
