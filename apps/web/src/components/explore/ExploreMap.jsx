import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useWeatherData } from '../../hooks/useWeatherData';

// Fix default marker icon (leaflet asset issue with bundlers)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to re-center map when location changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 12, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

const LAYERS = [
  { id: 'overview', label: 'Overview', emoji: '🗺️' },
  { id: 'weather', label: 'Weather', emoji: '⛅' },
  { id: 'airquality', label: 'Air Quality', emoji: '💨' },
  { id: 'rainfall', label: 'Rainfall', emoji: '🌧️' },
];

const ExploreMap = () => {
  const {
    latitude,
    longitude,
    locationName,
    weatherDescription,
    temperatureFormatted,
    aqiLabel,
    pm25,
    loading,
  } = useWeatherData();

  const [activeLayer, setActiveLayer] = useState('overview');

  const center = latitude && longitude ? [latitude, longitude] : [41.0082, 28.9784];

  return (
    <div className="mt-6">
      {/* Layer selector */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        {LAYERS.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeLayer === layer.id
                ? 'bg-brand-primary text-white shadow-soft'
                : 'bg-white text-brand-forestDark border border-brand-borderGreen hover:bg-brand-mint'
            }`}
          >
            <span>{layer.emoji}</span>
            <span>{layer.label}</span>
          </button>
        ))}
      </div>

      {/* Map container */}
      <div className="rounded-3xl overflow-hidden shadow-card border border-brand-borderGreen relative">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: '50vh', minHeight: '360px', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center}>
            <Popup>
              <div className="text-center min-w-[160px]">
                <div className="font-bold text-brand-forestDark text-sm">{locationName}</div>
                {!loading.weather && (
                  <div className="text-xs text-gray-600 mt-1">
                    {temperatureFormatted} • {weatherDescription}
                  </div>
                )}
                {!loading.airQuality && pm25 != null && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    Air Quality: {aqiLabel} (PM2.5: {pm25} µg/m³)
                  </div>
                )}
                <div className="text-[10px] text-gray-400 mt-1">
                  {center[0].toFixed(4)}°, {center[1].toFixed(4)}°
                </div>
              </div>
            </Popup>
          </Marker>
          <MapUpdater center={center} />
        </MapContainer>

        {/* Layer indicator overlay */}
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg border border-brand-borderGreen">
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Active Layer</div>
          <div className="text-sm font-bold text-brand-forestDark flex items-center gap-1.5">
            <span>{LAYERS.find((l) => l.id === activeLayer)?.emoji}</span>
            {LAYERS.find((l) => l.id === activeLayer)?.label}
            {activeLayer !== 'overview' && (
              <span className="text-[9px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full ml-1">
                Data overlay coming soon
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreMap;
