const FORECAST_BASE = 'https://api.open-meteo.com/v1/forecast';

/**
 * Fetch current weather + 7-day daily forecast + 48h hourly forecast.
 * Open-Meteo is free, no API key required, CORS enabled.
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<{data: object|null, error: string|null, fetchedAt: string}>}
 */
export async function fetchCurrentWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'is_day',
    ].join(','),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'weather_code',
      'wind_speed_10m_max',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'precipitation_probability',
      'weather_code',
    ].join(','),
    timezone: 'auto',
    forecast_days: '7',
    forecast_hours: '48',
  });

  try {
    const res = await fetch(`${FORECAST_BASE}?${params}`);
    if (!res.ok) {
      throw new Error(`Open-Meteo Forecast API error: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    return {
      data: json,
      error: null,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[weatherService]', err);
    return {
      data: null,
      error: err.message || 'Failed to fetch weather data',
      fetchedAt: new Date().toISOString(),
    };
  }
}
