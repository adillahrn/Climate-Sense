import React, { useState, useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useWeatherData } from '../../hooks/useWeatherData';

const TIME_RANGES = [
  { id: '7d', label: '7 Days', days: 7 },
  { id: '14d', label: '14 Days', days: 14 },
  { id: '30d', label: '30 Days', days: 30 },
];

const CHART_TABS = [
  { id: 'temperature', label: 'Temperature', emoji: '🌡️' },
  { id: 'precipitation', label: 'Precipitation', emoji: '🌧️' },
  { id: 'airquality', label: 'Air Quality', emoji: '💨' },
];

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-brand-borderGreen px-3.5 py-2.5 text-xs">
      <div className="font-bold text-brand-forestDark mb-1">
        {new Date(label).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-gray-600">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
          <span>{p.name}:</span>
          <span className="font-bold text-brand-forestDark">{p.value != null ? `${p.value.toFixed(1)}${unit || ''}` : 'N/A'}</span>
        </div>
      ))}
    </div>
  );
};

const HistoricalTrends = () => {
  const { historicalTrend, historicalData, loading } = useWeatherData();
  const [timeRange, setTimeRange] = useState('7d');
  const [activeChart, setActiveChart] = useState('temperature');

  const selectedDays = TIME_RANGES.find((r) => r.id === timeRange)?.days || 7;

  const filteredData = useMemo(
    () => historicalTrend.slice(-selectedDays),
    [historicalTrend, selectedDays]
  );

  const chartData = useMemo(
    () =>
      filteredData.map((d) => ({
        ...d,
        dateLabel: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      })),
    [filteredData]
  );

  // Calculate stats
  const stats = useMemo(() => {
    if (!chartData.length) return null;
    const temps = chartData.map((d) => d.meanTemp).filter((t) => t != null);
    const precips = chartData.map((d) => d.precipitation).filter((p) => p != null);
    if (!temps.length) return null;
    return {
      avgTemp: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1),
      maxTemp: Math.max(...temps).toFixed(1),
      minTemp: Math.min(...temps).toFixed(1),
      totalPrecip: precips.reduce((a, b) => a + b, 0).toFixed(1),
    };
  }, [chartData]);

  const dateRange = chartData.length
    ? `${chartData[0]?.dateLabel} — ${chartData[chartData.length - 1]?.dateLabel}`
    : '';

  return (
    <div className="mt-8">
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-card border border-brand-borderGreen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-extrabold text-brand-forestDark">Historical Environmental Trends</h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {dateRange && `${dateRange} • `}Source: Open-Meteo Archive (ERA5)
            </p>
          </div>
          {/* Time range selector */}
          <div className="flex items-center gap-1.5 bg-gray-100 rounded-xl p-1">
            {TIME_RANGES.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeRange === range.id
                    ? 'bg-white text-brand-forestDark shadow-sm'
                    : 'text-gray-500 hover:text-brand-forestDark'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        {stats && !loading.historical && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-brand-cream rounded-xl px-3 py-2 border border-brand-borderGreen">
              <div className="text-[10px] font-bold text-gray-400 uppercase">Avg Temp</div>
              <div className="text-lg font-extrabold text-brand-forestDark">{stats.avgTemp}°C</div>
            </div>
            <div className="bg-brand-cream rounded-xl px-3 py-2 border border-brand-borderGreen">
              <div className="text-[10px] font-bold text-gray-400 uppercase">Max Temp</div>
              <div className="text-lg font-extrabold text-red-600">{stats.maxTemp}°C</div>
            </div>
            <div className="bg-brand-cream rounded-xl px-3 py-2 border border-brand-borderGreen">
              <div className="text-[10px] font-bold text-gray-400 uppercase">Min Temp</div>
              <div className="text-lg font-extrabold text-blue-600">{stats.minTemp}°C</div>
            </div>
            <div className="bg-brand-cream rounded-xl px-3 py-2 border border-brand-borderGreen">
              <div className="text-[10px] font-bold text-gray-400 uppercase">Total Precip</div>
              <div className="text-lg font-extrabold text-brand-primary">{stats.totalPrecip} mm</div>
            </div>
          </div>
        )}

        {/* Chart tabs */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto">
          {CHART_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeChart === tab.id
                  ? 'bg-brand-forestDark text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chart area */}
        <div className="h-64 sm:h-80">
          {loading.historical ? (
            <div className="h-full w-full bg-gray-50 rounded-2xl animate-pulse flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-3 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin mx-auto mb-2"></div>
                <span className="text-xs text-gray-400 font-medium">Loading historical data…</span>
              </div>
            </div>
          ) : chartData.length === 0 ? (
            <div className="h-full w-full bg-gray-50 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl mb-2 block">📊</span>
                <span className="text-sm text-gray-500 font-medium">No historical data available for this location</span>
              </div>
            </div>
          ) : (
            <>
              {activeChart === 'temperature' && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#08A82A" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#08A82A" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="maxGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="dateLabel" tick={{ fontSize: 10, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} tickLine={false} axisLine={false} unit="°C" />
                    <Tooltip content={<CustomTooltip unit="°C" />} />
                    <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                    <Area type="monotone" dataKey="maxTemp" name="Max" stroke="#EF4444" fill="url(#maxGradient)" strokeWidth={1.5} dot={false} />
                    <Area type="monotone" dataKey="meanTemp" name="Mean" stroke="#08A82A" fill="url(#tempGradient)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#08A82A' }} />
                    <Area type="monotone" dataKey="minTemp" name="Min" stroke="#3B82F6" fill="transparent" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              )}

              {activeChart === 'precipitation' && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="dateLabel" tick={{ fontSize: 10, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} tickLine={false} axisLine={false} unit="mm" />
                    <Tooltip content={<CustomTooltip unit=" mm" />} />
                    <Bar dataKey="precipitation" name="Precipitation" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {activeChart === 'airquality' && (
                <div className="h-full w-full bg-gray-50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl mb-2 block">💨</span>
                    <span className="text-sm text-gray-500 font-medium">Historical air quality charts</span>
                    <p className="text-[11px] text-gray-400 mt-1">Coming soon — requires extended AQ archive data</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoricalTrends;
