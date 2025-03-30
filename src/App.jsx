import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { fetchWeather } from './services/weatherAPI';

function App() {
  const [city, setCity] = useState('Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dark, setDark] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
  });

  const getWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchWeather(cityName);
      setWeatherData(data);
      setCity(cityName);
      const updatedHistory = [cityName, ...searchHistory.filter((c) => c !== cityName)].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem('weatherSearchHistory', JSON.stringify(updatedHistory));
    } catch (err) {
      setError('City not found. Please check your spelling.');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getWeather(city);
  }, [city]);

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-200 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-center px-6 py-12 transition-all duration-300">
        <div className="max-w-md w-full space-y-6">
          <button
            onClick={() => setDark(!dark)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded shadow"
          >
            Toggle {dark ? 'Light' : 'Dark'} Mode
          </button>

          <h1 className="text-4xl font-bold dark:text-white">Weather Dashboard</h1>

          {searchHistory.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {searchHistory.map((c, i) => (
                <button
                  key={i}
                  onClick={() => getWeather(c)}
                  className="px-3 py-1 bg-blue-200 text-sm rounded hover:bg-blue-300"
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <SearchBar onSearch={getWeather} />
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {weatherData && !error && !loading && <WeatherCard data={weatherData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
