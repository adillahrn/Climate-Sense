/**
 * AI Climate Analyst service.
 * Uses Gemini API if VITE_GEMINI_API_KEY is configured.
 * Otherwise returns a structured stub indicating configuration is needed.
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

function buildPrompt(weatherData, aqData, historicalData, location) {
  const current = weatherData?.current || {};
  const daily = weatherData?.daily || {};
  const aq = aqData?.current || {};
  const hist = historicalData?.daily || {};

  return `You are an environmental data analyst for ClimateSense. Analyze the following real environmental data for ${location.name} (${location.lat?.toFixed(4)}, ${location.lon?.toFixed(4)}).

CURRENT CONDITIONS:
- Temperature: ${current.temperature_2m ?? 'N/A'}°C (feels like ${current.apparent_temperature ?? 'N/A'}°C)
- Humidity: ${current.relative_humidity_2m ?? 'N/A'}%
- Precipitation: ${current.precipitation ?? 'N/A'} mm
- Wind: ${current.wind_speed_10m ?? 'N/A'} km/h
- Weather Code: ${current.weather_code ?? 'N/A'}

AIR QUALITY:
- PM2.5: ${aq.pm2_5 ?? 'N/A'} µg/m³
- PM10: ${aq.pm10 ?? 'N/A'} µg/m³
- European AQI: ${aq.european_aqi ?? 'N/A'}

7-DAY FORECAST (max temps): ${daily.temperature_2m_max?.join(', ') ?? 'N/A'}
7-DAY FORECAST (min temps): ${daily.temperature_2m_min?.join(', ') ?? 'N/A'}
7-DAY FORECAST (precipitation): ${daily.precipitation_sum?.join(', ') ?? 'N/A'}

HISTORICAL (last 30 days avg temps): ${hist.temperature_2m_mean?.slice(-7)?.join(', ') ?? 'N/A'}

Provide a structured JSON response with these exact keys:
{
  "summary": "2-3 sentence overview of current conditions",
  "observations": ["observation 1", "observation 2", "observation 3"],
  "implications": ["implication 1", "implication 2"],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
  "dataQuality": "brief note on data completeness"
}

Only reference data that was actually provided. Do not invent measurements.`;
}

export async function generateAnalysis(weatherData, aqData, historicalData, location) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return {
      data: null,
      error: 'AI analysis requires a Gemini API key. Set VITE_GEMINI_API_KEY in your .env file.',
      configured: false,
    };
  }

  const prompt = buildPrompt(weatherData, aqData, historicalData, location);

  try {
    const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response from Gemini API');

    const parsed = JSON.parse(text);
    return {
      data: parsed,
      error: null,
      configured: true,
      generatedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[aiService]', err);
    return {
      data: null,
      error: err.message || 'Failed to generate AI analysis',
      configured: true,
    };
  }
}
