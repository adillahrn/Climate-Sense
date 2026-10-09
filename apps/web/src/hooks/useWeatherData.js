import { useContext } from 'react';
import { LocationContext } from '../context/LocationContext';
import {
  getWeatherEmoji,
  getWeatherDescription,
  getAqiLabel,
  getAqiColor,
  getAqiBgColor,
  formatTemperature,
  getWindDirection,
  formatTimestamp,
} from '../utils/weatherUtils';

/**
 * Convenience hook for consuming weather data from LocationContext.
 * Provides raw data + computed/derived values.
 */
export function useWeatherData() {
  const ctx = useContext(LocationContext);

  if (!ctx) {
    throw new Error('useWeatherData must be used within a LocationProvider');
  }

  const { weather, airQuality, historicalData, loading, location } = ctx;

  // Derived current weather values
  const current = weather.data?.current || null;
  const daily = weather.data?.daily || null;
  const hourly = weather.data?.hourly || null;
  const currentAq = airQuality.data?.current || null;

  const derived = {
    // Current conditions
    temperature: current?.temperature_2m ?? null,
    temperatureFormatted: formatTemperature(current?.temperature_2m),
    feelsLike: current?.apparent_temperature ?? null,
    feelsLikeFormatted: formatTemperature(current?.apparent_temperature),
    humidity: current?.relative_humidity_2m ?? null,
    precipitation: current?.precipitation ?? null,
    weatherCode: current?.weather_code ?? null,
    weatherEmoji: getWeatherEmoji(current?.weather_code),
    weatherDescription: getWeatherDescription(current?.weather_code),
    windSpeed: current?.wind_speed_10m ?? null,
    windDirection: getWindDirection(current?.wind_direction_10m),
    isDay: current?.is_day === 1,

    // Air quality
    pm25: currentAq?.pm2_5 ?? null,
    pm10: currentAq?.pm10 ?? null,
    europeanAqi: currentAq?.european_aqi ?? null,
    usAqi: currentAq?.us_aqi ?? null,
    aqiLabel: getAqiLabel(currentAq?.european_aqi),
    aqiColor: getAqiColor(currentAq?.european_aqi),
    aqiBgColor: getAqiBgColor(currentAq?.european_aqi),

    // Daily forecast (7 days)
    dailyForecast: daily
      ? daily.time.map((date, i) => ({
          date,
          maxTemp: daily.temperature_2m_max[i],
          minTemp: daily.temperature_2m_min[i],
          precipitation: daily.precipitation_sum[i],
          weatherCode: daily.weather_code[i],
          windMax: daily.wind_speed_10m_max[i],
        }))
      : [],

    // Historical data (30-day trend)
    historicalTrend: historicalData.data?.daily
      ? historicalData.data.daily.time.map((date, i) => ({
          date,
          meanTemp: historicalData.data.daily.temperature_2m_mean[i],
          maxTemp: historicalData.data.daily.temperature_2m_max[i],
          minTemp: historicalData.data.daily.temperature_2m_min[i],
          precipitation: historicalData.data.daily.precipitation_sum[i],
        }))
      : [],

    // Timestamps
    weatherFetchedAt: formatTimestamp(weather.fetchedAt),
    aqFetchedAt: formatTimestamp(airQuality.fetchedAt),

    // Location info
    locationName: location.name,
    locationDisplay: location.displayName,
    latitude: location.lat,
    longitude: location.lon,
  };

  return {
    ...ctx,
    ...derived,
  };
}
