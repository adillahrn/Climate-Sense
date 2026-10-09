import React, { createContext, useState, useCallback, useEffect, useRef } from 'react';
import { fetchCurrentWeather } from '../services/weatherService';
import { fetchHistoricalWeather } from '../services/historicalService';
import { fetchAirQuality } from '../services/airQualityService';
import { searchLocations } from '../services/geocodingService';

const DEFAULT_LOCATION = {
  name: 'Istanbul',
  lat: 41.0082,
  lon: 28.9784,
  displayName: 'Istanbul, Turkey',
};

export const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
  const [location, setLocationState] = useState(DEFAULT_LOCATION);
  const [weather, setWeather] = useState({ data: null, error: null, fetchedAt: null });
  const [airQuality, setAirQuality] = useState({ data: null, error: null, fetchedAt: null });
  const [historicalData, setHistoricalData] = useState({ data: null, error: null, fetchedAt: null });
  const [loading, setLoading] = useState({ weather: true, airQuality: true, historical: true });
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const abortRef = useRef(null);

  // Fetch all data for a given lat/lon
  const fetchAllData = useCallback(async (lat, lon) => {
    // Cancel any in-flight requests conceptually
    if (abortRef.current) {
      abortRef.current.cancelled = true;
    }
    const thisRequest = { cancelled: false };
    abortRef.current = thisRequest;

    setLoading({ weather: true, airQuality: true, historical: true });

    // Fetch weather and air quality in parallel, historical separately
    const [weatherResult, aqResult] = await Promise.all([
      fetchCurrentWeather(lat, lon),
      fetchAirQuality(lat, lon),
    ]);

    if (thisRequest.cancelled) return;

    setWeather(weatherResult);
    setLoading((prev) => ({ ...prev, weather: false }));

    setAirQuality(aqResult);
    setLoading((prev) => ({ ...prev, airQuality: false }));

    // Fetch historical data (can be slightly delayed)
    const historicalResult = await fetchHistoricalWeather(lat, lon);
    if (thisRequest.cancelled) return;

    setHistoricalData(historicalResult);
    setLoading((prev) => ({ ...prev, historical: false }));
  }, []);

  // Set location and trigger data fetch
  const setLocation = useCallback(
    (lat, lon, name, displayName) => {
      setLocationState({ lat, lon, name: name || 'Unknown', displayName: displayName || name || 'Unknown' });
      fetchAllData(lat, lon);
    },
    [fetchAllData]
  );

  // Search for locations via geocoding
  const searchLocation = useCallback(async (query) => {
    setSearchLoading(true);
    const result = await searchLocations(query);
    setSearchLoading(false);
    if (result.data) {
      setSearchResults(result.data);
    }
    return result;
  }, []);

  // Clear search results
  const clearSearch = useCallback(() => {
    setSearchResults([]);
  }, []);

  // Initial fetch on mount — try geolocation, fallback to default
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Reverse geocode is not needed for initial — just use coordinates
          setLocation(pos.coords.latitude, pos.coords.longitude, 'Your Location', 'Current Location');
        },
        () => {
          // Geolocation denied or failed — use default
          fetchAllData(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
        },
        { timeout: 5000 }
      );
    } else {
      fetchAllData(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    location,
    weather,
    airQuality,
    historicalData,
    loading,
    searchResults,
    searchLoading,
    setLocation,
    searchLocation,
    clearSearch,
    refreshData: () => fetchAllData(location.lat, location.lon),
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
