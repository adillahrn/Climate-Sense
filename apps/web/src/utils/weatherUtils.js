/**
 * Maps WMO Weather interpretation codes to emoji + description.
 * @see https://open-meteo.com/en/docs → WMO Weather interpretation codes
 */
const WMO_CODES = {
  0: { emoji: '☀️', description: 'Clear sky' },
  1: { emoji: '🌤️', description: 'Mainly clear' },
  2: { emoji: '⛅', description: 'Partly cloudy' },
  3: { emoji: '☁️', description: 'Overcast' },
  45: { emoji: '🌫️', description: 'Fog' },
  48: { emoji: '🌫️', description: 'Depositing rime fog' },
  51: { emoji: '🌦️', description: 'Light drizzle' },
  53: { emoji: '🌦️', description: 'Moderate drizzle' },
  55: { emoji: '🌧️', description: 'Dense drizzle' },
  56: { emoji: '🌧️', description: 'Light freezing drizzle' },
  57: { emoji: '🌧️', description: 'Dense freezing drizzle' },
  61: { emoji: '🌧️', description: 'Slight rain' },
  63: { emoji: '🌧️', description: 'Moderate rain' },
  65: { emoji: '🌧️', description: 'Heavy rain' },
  66: { emoji: '🌧️', description: 'Light freezing rain' },
  67: { emoji: '🌧️', description: 'Heavy freezing rain' },
  71: { emoji: '🌨️', description: 'Slight snowfall' },
  73: { emoji: '🌨️', description: 'Moderate snowfall' },
  75: { emoji: '❄️', description: 'Heavy snowfall' },
  77: { emoji: '🌨️', description: 'Snow grains' },
  80: { emoji: '🌦️', description: 'Slight rain showers' },
  81: { emoji: '🌧️', description: 'Moderate rain showers' },
  82: { emoji: '🌧️', description: 'Violent rain showers' },
  85: { emoji: '🌨️', description: 'Slight snow showers' },
  86: { emoji: '🌨️', description: 'Heavy snow showers' },
  95: { emoji: '⛈️', description: 'Thunderstorm' },
  96: { emoji: '⛈️', description: 'Thunderstorm with slight hail' },
  99: { emoji: '⛈️', description: 'Thunderstorm with heavy hail' },
};

/**
 * Get weather emoji for a WMO weather code.
 * @param {number} code - WMO weather code
 * @returns {string} emoji
 */
export function getWeatherEmoji(code) {
  return WMO_CODES[code]?.emoji || '🌡️';
}

/**
 * Get weather description for a WMO weather code.
 * @param {number} code - WMO weather code
 * @returns {string} description
 */
export function getWeatherDescription(code) {
  return WMO_CODES[code]?.description || 'Unknown';
}

/**
 * Get AQI label from European AQI value.
 * @param {number} aqi - European AQI value
 * @returns {string} label
 */
export function getAqiLabel(aqi) {
  if (aqi == null) return 'N/A';
  if (aqi <= 20) return 'Good';
  if (aqi <= 40) return 'Fair';
  if (aqi <= 60) return 'Moderate';
  if (aqi <= 80) return 'Poor';
  if (aqi <= 100) return 'Very Poor';
  return 'Hazardous';
}

/**
 * Get color class for AQI value.
 * @param {number} aqi - European AQI value
 * @returns {string} Tailwind color class
 */
export function getAqiColor(aqi) {
  if (aqi == null) return 'text-gray-400';
  if (aqi <= 20) return 'text-emerald-500';
  if (aqi <= 40) return 'text-lime-500';
  if (aqi <= 60) return 'text-yellow-500';
  if (aqi <= 80) return 'text-orange-500';
  if (aqi <= 100) return 'text-red-500';
  return 'text-purple-600';
}

/**
 * Get background color class for AQI value.
 * @param {number} aqi
 * @returns {string}
 */
export function getAqiBgColor(aqi) {
  if (aqi == null) return 'bg-gray-100';
  if (aqi <= 20) return 'bg-emerald-500';
  if (aqi <= 40) return 'bg-lime-500';
  if (aqi <= 60) return 'bg-yellow-500';
  if (aqi <= 80) return 'bg-orange-500';
  if (aqi <= 100) return 'bg-red-500';
  return 'bg-purple-600';
}

/**
 * Format temperature value.
 * @param {number|null} temp
 * @param {string} [unit='°C']
 * @returns {string}
 */
export function formatTemperature(temp, unit = '°C') {
  if (temp == null || isNaN(temp)) return 'N/A';
  return `${Math.round(temp)}${unit}`;
}

/**
 * Format a date string for display.
 * @param {string} isoString - ISO date string (YYYY-MM-DD or full ISO)
 * @param {object} [options]
 * @returns {string}
 */
export function formatDate(isoString, options = {}) {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  const defaults = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', { ...defaults, ...options });
}

/**
 * Get short day name from ISO date string.
 * @param {string} isoString
 * @returns {string}
 */
export function getShortDay(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return 'Today';
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

/**
 * Get wind direction text from degrees.
 * @param {number} deg
 * @returns {string}
 */
export function getWindDirection(deg) {
  if (deg == null) return 'N/A';
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return dirs[index];
}

/**
 * Format a timestamp for "last updated" display.
 * @param {string} isoString
 * @returns {string}
 */
export function formatTimestamp(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
