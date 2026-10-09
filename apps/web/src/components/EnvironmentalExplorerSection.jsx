import React from 'react';
import { useWeatherData } from '../hooks/useWeatherData';
import {
  formatTemperature,
  getWeatherEmoji,
  getShortDay,
  getAqiLabel,
} from '../utils/weatherUtils';

const SkeletonCard = () => (
  <div className="p-2.5 rounded-xl bg-brand-cream border border-brand-borderGreen animate-pulse">
    <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
    <div className="h-6 w-12 bg-gray-200 rounded mb-1"></div>
    <div className="h-3 w-20 bg-gray-200 rounded"></div>
  </div>
);

const EnvironmentalExplorerSection = () => {
  const {
    locationName,
    locationDisplay,
    temperature,
    temperatureFormatted,
    feelsLikeFormatted,
    humidity,
    precipitation,
    windSpeed,
    windDirection,
    weatherEmoji,
    weatherDescription,
    aqiLabel,
    europeanAqi,
    pm25,
    dailyForecast,
    historicalTrend,
    loading,
    weather,
    airQuality,
    historicalData,
  } = useWeatherData();

  // Build temperature trend chart from historical data (last 7 days of the 30-day set)
  const trendData = historicalTrend.slice(-7);
  const trendTemps = trendData.map((d) => d.meanTemp).filter((t) => t != null);
  const trendMin = Math.min(...(trendTemps.length ? trendTemps : [20]));
  const trendMax = Math.max(...(trendTemps.length ? trendTemps : [30]));
  const trendRange = trendMax - trendMin || 1;
  const trendAvg = trendTemps.length
    ? (trendTemps.reduce((a, b) => a + b, 0) / trendTemps.length).toFixed(1)
    : 'N/A';

  // Build SVG path for the trend line
  const buildTrendPath = () => {
    if (trendData.length < 2) return { line: '', area: '' };
    const w = 500;
    const h = 60;
    const padding = 5;
    const points = trendData.map((d, i) => {
      const x = (i / (trendData.length - 1)) * w;
      const y = d.meanTemp != null
        ? h - padding - ((d.meanTemp - trendMin) / trendRange) * (h - padding * 2)
        : h / 2;
      return { x, y };
    });
    const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
    const area = `${line} L ${w},${h} L 0,${h} Z`;
    return { line, area, lastPoint: points[points.length - 1] };
  };

  const trendPath = buildTrendPath();

  // Determine risk level from precipitation
  const getPrecipRisk = () => {
    if (precipitation == null) return { label: 'N/A', color: 'text-gray-400', dot: 'bg-gray-400' };
    if (precipitation > 50) return { label: 'High', color: 'text-red-700', dot: 'bg-red-500' };
    if (precipitation > 20) return { label: 'Medium', color: 'text-amber-700', dot: 'bg-amber-500' };
    return { label: 'Low', color: 'text-emerald-700', dot: 'bg-emerald-500' };
  };

  const getHeatRisk = () => {
    if (temperature == null) return { label: 'N/A', color: 'text-gray-400', dot: 'bg-gray-400' };
    if (temperature > 40) return { label: 'High', color: 'text-red-700', dot: 'bg-red-500' };
    if (temperature > 33) return { label: 'Medium', color: 'text-amber-700', dot: 'bg-amber-500' };
    return { label: 'Low', color: 'text-emerald-700', dot: 'bg-emerald-500' };
  };

  const floodRisk = getPrecipRisk();
  const heatRisk = getHeatRisk();

  const isDataReady = !loading.weather;
  const isAqReady = !loading.airQuality;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F0]" id="data-hub">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-brand-lime text-brand-forestDark mb-4">EXPLORE ENVIRONMENT</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-forestDark font-display leading-[1.2] mb-5 tracking-tight">One Place.<br />Complete Environmental Picture. 🍃</h2>
            <p className="text-base text-brand-textSlate leading-relaxed mb-8 font-medium">Monitor environmental conditions in real time and understand risk potentials across locations through integrated satellite observations and sensors.</p>
            <a className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold rounded-full text-sm shadow-soft transition-all duration-200" href="#explore-data">
              <span>Explore Environmental Data</span><span>➔</span>
            </a>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-card border border-brand-borderGreen">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                </div>
                <div className="px-3.5 py-1 bg-gray-50 rounded-full border border-gray-200 text-xs text-gray-500 font-medium flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                  {locationName || 'Select a location'}
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {isDataReady ? 'Live Feed' : 'Loading…'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Map area */}
                <div className="md:col-span-7 bg-[#1D3E24] rounded-2xl relative min-h-[260px] p-4 overflow-hidden border border-emerald-900/20">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#88D890_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="relative z-10 flex flex-col gap-1.5 w-32">
                    <button className="px-2.5 py-1.5 rounded-lg bg-white/95 text-brand-forestDark text-[11px] font-bold flex items-center gap-1.5 shadow-sm text-left"><span>{weatherEmoji}</span> Weather</button>
                    <button className="px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-sm text-left"><span>💨</span> Air Quality</button>
                    <button className="px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-sm text-left"><span>🌧️</span> Rainfall</button>
                    <button className="px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-sm text-left"><span>🔥</span> Hotspots</button>
                  </div>
                  <div className="absolute bottom-5 right-5 z-10 bg-white/95 rounded-xl px-3 py-2 shadow-lg border border-brand-borderGreen flex items-center gap-2">
                    <span className="text-base">📍</span>
                    <div>
                      <div className="text-xs font-black text-brand-forestDark leading-none">{locationName}</div>
                      <div className="text-[10px] text-gray-500 font-medium">{weatherDescription}</div>
                    </div>
                  </div>
                  <div className="absolute top-10 right-10 z-10 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-emerald-400 opacity-60 animate-ping absolute"></div>
                    <div className="w-4 h-4 rounded-full bg-emerald-500 border border-white"></div>
                  </div>
                </div>

                {/* Data cards */}
                <div className="md:col-span-5 flex flex-col justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-gray-500">Current Conditions</div>
                    <div className="text-[10px] text-gray-400 font-medium">
                      Source: Open-Meteo • {isDataReady ? 'Real-time' : 'Loading…'}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {isDataReady ? (
                      <>
                        <div className="p-2.5 rounded-xl bg-brand-cream border border-brand-borderGreen">
                          <div className="text-[10px] text-gray-500 font-semibold flex items-center gap-1">{weatherEmoji} Temp</div>
                          <div className="text-lg font-black text-brand-forestDark mt-0.5">{temperatureFormatted}</div>
                          <div className="text-[10px] text-gray-500 font-bold">Feels {feelsLikeFormatted}</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-brand-cream border border-brand-borderGreen">
                          <div className="text-[10px] text-gray-500 font-semibold flex items-center gap-1">🍃 Air Quality</div>
                          {isAqReady ? (
                            <>
                              <div className="text-lg font-black text-brand-forestDark mt-0.5">{europeanAqi ?? 'N/A'}</div>
                              <div className="text-[10px] text-emerald-600 font-bold">{aqiLabel}</div>
                            </>
                          ) : (
                            <>
                              <div className="h-6 w-10 bg-gray-200 rounded animate-pulse mt-1"></div>
                              <div className="h-3 w-14 bg-gray-200 rounded animate-pulse mt-1"></div>
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <SkeletonCard />
                        <SkeletonCard />
                      </>
                    )}
                  </div>

                  {/* Precipitation / Humidity row */}
                  {isDataReady ? (
                    <div className="p-2.5 rounded-xl bg-brand-cream border border-brand-borderGreen">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-gray-600">
                        <span>💧 Humidity:</span>
                        <strong className="text-brand-forestDark font-bold">{humidity != null ? `${humidity}%` : 'N/A'}</strong>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-gray-600 mt-1">
                        <span>🌧️ Precipitation:</span>
                        <strong className="text-brand-forestDark font-bold">{precipitation != null ? `${precipitation} mm` : 'N/A'}</strong>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-gray-600 mt-1">
                        <span>🌬️ Wind:</span>
                        <strong className="text-brand-forestDark font-bold">{windSpeed != null ? `${windSpeed} km/h ${windDirection}` : 'N/A'}</strong>
                      </div>
                    </div>
                  ) : (
                    <SkeletonCard />
                  )}

                  {/* Environmental Risk */}
                  {isDataReady ? (
                    <div className="p-2.5 rounded-xl bg-brand-cream border border-brand-borderGreen space-y-1.5">
                      <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Environmental Risk</div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-600">Extreme Heat:</span>
                        <span className={`inline-flex items-center gap-1 ${heatRisk.color} font-bold`}><span className={`w-1.5 h-1.5 rounded-full ${heatRisk.dot}`}></span>{heatRisk.label}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-600">Flood Risk:</span>
                        <span className={`inline-flex items-center gap-1 ${floodRisk.color} font-bold`}><span className={`w-1.5 h-1.5 rounded-full ${floodRisk.dot}`}></span>{floodRisk.label}</span>
                      </div>
                    </div>
                  ) : (
                    <SkeletonCard />
                  )}
                </div>
              </div>

              {/* 7-Day Forecast */}
              {dailyForecast.length > 0 && (
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="text-xs font-bold text-brand-forestDark mb-3">7-Day Forecast</div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {dailyForecast.map((day, i) => (
                      <div key={day.date} className="flex flex-col items-center min-w-[60px] p-2 rounded-xl bg-brand-cream border border-brand-borderGreen text-center">
                        <div className="text-[10px] font-bold text-gray-500">{getShortDay(day.date)}</div>
                        <div className="text-lg my-1">{getWeatherEmoji(day.weatherCode)}</div>
                        <div className="text-[11px] font-black text-brand-forestDark">{formatTemperature(day.maxTemp)}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{formatTemperature(day.minTemp)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Temperature Trend */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-brand-forestDark">Temperature Trend (Last 7 Days)</span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {loading.historical ? 'Loading…' : `Average ${trendAvg}°C`}
                  </span>
                </div>
                <div className="h-14 w-full">
                  {loading.historical ? (
                    <div className="h-full w-full bg-gray-100 rounded animate-pulse"></div>
                  ) : (
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 60">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#08A82A" stopOpacity="0.25"></stop>
                          <stop offset="100%" stopColor="#08A82A" stopOpacity="0"></stop>
                        </linearGradient>
                      </defs>
                      {trendPath.area && (
                        <path d={trendPath.area} fill="url(#chartGradient)"></path>
                      )}
                      {trendPath.line && (
                        <path d={trendPath.line} fill="none" stroke="#08A82A" strokeLinecap="round" strokeWidth="2.5"></path>
                      )}
                      {trendPath.lastPoint && (
                        <circle cx={trendPath.lastPoint.x} cy={trendPath.lastPoint.y} fill="#08A82A" r="4"></circle>
                      )}
                    </svg>
                  )}
                </div>
                {!loading.historical && trendData.length > 0 && (
                  <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1 px-1">
                    {trendData.map((d) => (
                      <span key={d.date}>
                        {new Date(d.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer with source */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-[10px] text-gray-400 gap-2">
                <div>Source: Open-Meteo (ECMWF, DWD, NOAA)</div>
                <div>
                  {weather.fetchedAt
                    ? `Last updated: ${new Date(weather.fetchedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}`
                    : 'Fetching data…'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalExplorerSection;
