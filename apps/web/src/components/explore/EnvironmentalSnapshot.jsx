import React from 'react';
import { useWeatherData } from '../../hooks/useWeatherData';
import { formatTimestamp } from '../../utils/weatherUtils';

const MetricCard = ({ emoji, label, value, unit, sublabel, source, loading: isLoading }) => (
  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-borderGreen shadow-soft hover:shadow-card transition-shadow">
    {isLoading ? (
      <div className="animate-pulse">
        <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>
        <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
      </div>
    ) : (
      <>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <span className="text-base">{emoji}</span>
            {label}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-brand-forestDark font-display">
            {value ?? 'N/A'}
          </span>
          {unit && <span className="text-sm font-bold text-brand-textSlate">{unit}</span>}
        </div>
        {sublabel && (
          <div className="text-[11px] text-gray-500 font-medium mt-1">{sublabel}</div>
        )}
        {source && (
          <div className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100">{source}</div>
        )}
      </>
    )}
  </div>
);

const EnvironmentalSnapshot = () => {
  const {
    temperature,
    temperatureFormatted,
    feelsLikeFormatted,
    humidity,
    precipitation,
    windSpeed,
    windDirection,
    weatherDescription,
    pm25,
    europeanAqi,
    aqiLabel,
    loading,
    weather,
    airQuality,
  } = useWeatherData();

  const weatherTime = weather.fetchedAt ? formatTimestamp(weather.fetchedAt) : '';
  const aqTime = airQuality.fetchedAt ? formatTimestamp(airQuality.fetchedAt) : '';

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-extrabold text-brand-forestDark">Environmental Snapshot</h2>
        <span className="text-[11px] text-gray-400 font-medium">
          {weatherTime ? `Updated ${weatherTime}` : 'Fetching…'}
        </span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          emoji="🌡️"
          label="Temperature"
          value={temperature != null ? Math.round(temperature) : null}
          unit="°C"
          sublabel={`Feels like ${feelsLikeFormatted} • ${weatherDescription}`}
          source="Source: Open-Meteo (ECMWF)"
          loading={loading.weather}
        />
        <MetricCard
          emoji="💧"
          label="Humidity"
          value={humidity}
          unit="%"
          sublabel={humidity != null ? (humidity > 70 ? 'Relatively high' : humidity < 30 ? 'Relatively low' : 'Comfortable range') : null}
          source="Source: Open-Meteo (ECMWF)"
          loading={loading.weather}
        />
        <MetricCard
          emoji="🌧️"
          label="Precipitation"
          value={precipitation != null ? precipitation.toFixed(1) : null}
          unit="mm"
          sublabel={`Wind: ${windSpeed != null ? `${windSpeed} km/h ${windDirection}` : 'N/A'}`}
          source="Source: Open-Meteo (ECMWF)"
          loading={loading.weather}
        />
        <MetricCard
          emoji="🍃"
          label="PM2.5"
          value={pm25 != null ? pm25.toFixed(1) : null}
          unit="µg/m³"
          sublabel={europeanAqi != null ? `AQI: ${europeanAqi} — ${aqiLabel}` : 'Air quality data pending'}
          source={aqTime ? `Source: Open-Meteo AQ • ${aqTime}` : 'Source: Open-Meteo Air Quality'}
          loading={loading.airQuality}
        />
      </div>
    </div>
  );
};

export default EnvironmentalSnapshot;
