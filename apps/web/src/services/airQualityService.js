const AIR_QUALITY_BASE = 'https://air-quality-api.open-meteo.com/v1/air-quality';

/**
 * Fetch current air quality and hourly forecast.
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<{data: object|null, error: string|null, fetchedAt: string}>}
 */
export async function fetchAirQuality(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: [
      'pm10',
      'pm2_5',
      'european_aqi',
      'us_aqi',
    ].join(','),
    hourly: [
      'pm10',
      'pm2_5',
      'european_aqi',
    ].join(','),
    timezone: 'auto',
    forecast_days: '2',
  });

  try {
    const res = await fetch(`${AIR_QUALITY_BASE}?${params}`);
    if (!res.ok) {
      throw new Error(`Open-Meteo Air Quality API error: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    return {
      data: json,
      error: null,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[airQualityService]', err);
    return {
      data: null,
      error: err.message || 'Failed to fetch air quality data',
      fetchedAt: new Date().toISOString(),
    };
  }
}
