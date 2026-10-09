const ARCHIVE_BASE = 'https://archive-api.open-meteo.com/v1/archive';

/**
 * Fetch historical weather data for a date range.
 * Defaults to last 30 days if no dates provided.
 * @param {number} lat
 * @param {number} lon
 * @param {string} [startDate] - YYYY-MM-DD
 * @param {string} [endDate] - YYYY-MM-DD
 * @returns {Promise<{data: object|null, error: string|null, fetchedAt: string}>}
 */
export async function fetchHistoricalWeather(lat, lon, startDate, endDate) {
  if (!startDate || !endDate) {
    const now = new Date();
    const end = new Date(now);
    end.setDate(end.getDate() - 1); // yesterday (archive may lag 1 day)
    const start = new Date(end);
    start.setDate(start.getDate() - 29); // 30 days total
    startDate = start.toISOString().split('T')[0];
    endDate = end.toISOString().split('T')[0];
  }

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    start_date: startDate,
    end_date: endDate,
    daily: [
      'temperature_2m_mean',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'wind_speed_10m_max',
    ].join(','),
    timezone: 'auto',
  });

  try {
    const res = await fetch(`${ARCHIVE_BASE}?${params}`);
    if (!res.ok) {
      throw new Error(`Open-Meteo Archive API error: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    return {
      data: json,
      error: null,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[historicalService]', err);
    return {
      data: null,
      error: err.message || 'Failed to fetch historical weather data',
      fetchedAt: new Date().toISOString(),
    };
  }
}
