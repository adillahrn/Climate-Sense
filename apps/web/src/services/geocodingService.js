const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org/search';

let lastRequestTime = 0;

/**
 * Search for locations using Nominatim (OSM) geocoding.
 * Enforces minimum 1-second gap between requests per Nominatim usage policy.
 * @param {string} query - Search query (city or location name)
 * @returns {Promise<{data: Array|null, error: string|null}>}
 */
export async function searchLocations(query) {
  if (!query || query.trim().length < 2) {
    return { data: [], error: null };
  }

  // Rate limiting: enforce minimum 1s between requests
  const now = Date.now();
  const timeSinceLast = now - lastRequestTime;
  if (timeSinceLast < 1000) {
    await new Promise((resolve) => setTimeout(resolve, 1000 - timeSinceLast));
  }

  const params = new URLSearchParams({
    q: query.trim(),
    format: 'json',
    addressdetails: '1',
    limit: '5',
  });

  try {
    lastRequestTime = Date.now();
    const res = await fetch(`${NOMINATIM_BASE}?${params}`, {
      headers: {
        'User-Agent': 'ClimateSense/1.0 (https://github.com/climatesense)',
      },
    });
    if (!res.ok) {
      throw new Error(`Nominatim API error: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    const results = json.map((item) => ({
      id: item.place_id,
      name: item.name || item.display_name.split(',')[0],
      displayName: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      country: item.address?.country || '',
      state: item.address?.state || '',
      type: item.type,
    }));
    return { data: results, error: null };
  } catch (err) {
    console.error('[geocodingService]', err);
    return {
      data: null,
      error: err.message || 'Failed to search locations',
    };
  }
}
