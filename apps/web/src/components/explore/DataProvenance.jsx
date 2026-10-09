import React, { useState, useEffect } from 'react';
import { useWeatherData } from '../../hooks/useWeatherData';

/**
 * Compute SHA-256 hash of a data payload using Web Crypto API.
 */
async function computeSHA256(data) {
  const text = JSON.stringify(data);
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(text));
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const DataProvenance = () => {
  const { weather, airQuality, location, loading } = useWeatherData();
  const [hash, setHash] = useState(null);
  const [hashLoading, setHashLoading] = useState(false);

  // Compute hash whenever weather data changes
  useEffect(() => {
    if (weather.data && !loading.weather) {
      setHashLoading(true);
      const payload = {
        location: { lat: location.lat, lon: location.lon, name: location.name },
        weather: weather.data?.current,
        airQuality: airQuality.data?.current,
        fetchedAt: weather.fetchedAt,
      };
      computeSHA256(payload).then((h) => {
        setHash(h);
        setHashLoading(false);
      });
    }
  }, [weather.data, airQuality.data, location, loading.weather]);

  const recordId = `CS-${location.name?.slice(0, 3).toUpperCase() || 'UNK'}-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-card border border-brand-borderGreen flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-lg shadow-soft">
          🔗
        </div>
        <div>
          <h3 className="text-base font-extrabold text-brand-forestDark">Data Provenance</h3>
          <p className="text-[11px] text-gray-400 font-medium">Transparency and integrity tracking</p>
        </div>
      </div>

      <div className="flex-1 space-y-3">
        {/* Data source */}
        <div className="bg-brand-cream rounded-xl p-3 border border-brand-borderGreen">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Data Source</div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Provider:</span>
              <span className="font-bold text-brand-forestDark">Open-Meteo (ECMWF, DWD)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Location:</span>
              <span className="font-bold text-brand-forestDark">{location.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Coordinates:</span>
              <span className="font-bold text-brand-forestDark">
                {location.lat?.toFixed(4)}°, {location.lon?.toFixed(4)}°
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Retrieved:</span>
              <span className="font-bold text-brand-forestDark">
                {weather.fetchedAt
                  ? new Date(weather.fetchedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
                  : 'Pending…'}
              </span>
            </div>
          </div>
        </div>

        {/* Record hash */}
        <div className="bg-brand-cream rounded-xl p-3 border border-brand-borderGreen">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Record Integrity</div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Record ID:</span>
              <span className="font-mono text-[11px] font-bold text-brand-forestDark">{recordId}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">SHA-256 Hash:</span>
              {hashLoading || loading.weather ? (
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              ) : hash ? (
                <code className="text-[10px] font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded block break-all leading-relaxed">
                  {hash}
                </code>
              ) : (
                <span className="text-[11px] text-gray-400">Awaiting data…</span>
              )}
            </div>
          </div>
        </div>

        {/* Blockchain verification */}
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Blockchain Verification</div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 text-base mt-0.5">🔒</span>
            <div>
              <div className="text-xs font-bold text-amber-700">Verification Not Yet Available</div>
              <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                On-chain verification requires a configured blockchain network. When available, a data hash will be committed to the chain to ensure tamper-evident record keeping.
              </p>
              <p className="text-[10px] text-gray-400 mt-2 italic">
                Note: A hash match proves a record matches the committed hash. It does not prove the original measurement is accurate.
              </p>
            </div>
          </div>
          <button
            disabled
            className="mt-3 w-full py-2 rounded-xl bg-gray-200 text-gray-400 text-xs font-bold cursor-not-allowed"
          >
            Verify Record (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataProvenance;
