import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useWeatherData } from '../../hooks/useWeatherData';

const ExploreHeader = () => {
  const {
    locationName,
    locationDisplay,
    latitude,
    longitude,
    searchResults,
    searchLoading,
    searchLocation,
    setLocation,
    clearSearch,
  } = useWeatherData();

  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setQuery(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (value.trim().length >= 2) {
        debounceRef.current = setTimeout(() => {
          searchLocation(value);
          setShowResults(true);
        }, 400);
      } else {
        clearSearch();
        setShowResults(false);
      }
    },
    [searchLocation, clearSearch]
  );

  const handleSelectResult = useCallback(
    (result) => {
      setLocation(result.lat, result.lon, result.name, result.displayName);
      setQuery('');
      setShowResults(false);
      clearSearch();
    },
    [setLocation, clearSearch]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (query.trim().length >= 2) {
          searchLocation(query);
          setShowResults(true);
        }
      }
    },
    [query, searchLocation]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-gradient-to-b from-brand-mint/60 to-[#FAF8F0] pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Title */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-forestDark font-display tracking-tight">
              Explore Your Environment
            </h1>
            <p className="text-sm sm:text-base text-brand-textSlate mt-2 max-w-xl font-medium">
              Discover environmental patterns, understand local conditions, and inspect the data behind every insight.
            </p>
          </div>

          {/* Search + Location info */}
          <div className="flex flex-col items-end gap-2 min-w-0 md:min-w-[340px]" ref={containerRef}>
            <div className="relative w-full">
              <div className="w-full bg-white rounded-2xl shadow-soft border border-brand-borderGreen p-1.5 pl-4 flex items-center justify-between focus-within:ring-2 focus-within:ring-brand-primary transition-all">
                <div className="flex items-center gap-2 flex-1">
                  <svg className="w-4 h-4 text-brand-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    className="w-full bg-transparent border-none text-sm text-brand-forestDark placeholder-gray-400 focus:outline-none focus:ring-0 p-0"
                    placeholder="Search a city or location…"
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    id="explore-location-search"
                  />
                </div>
                <button
                  className="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primaryHover transition-colors flex items-center gap-1.5 shadow-sm"
                  onClick={() => { if (query.trim().length >= 2) { searchLocation(query); setShowResults(true); } }}
                >
                  {searchLoading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <span>Search</span>
                  )}
                </button>
              </div>
              {/* Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-brand-borderGreen overflow-hidden z-50 max-h-64 overflow-y-auto">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      className="w-full text-left px-4 py-3 hover:bg-brand-mint/50 transition-colors flex items-start gap-3 border-b border-gray-50 last:border-b-0"
                      onClick={() => handleSelectResult(result)}
                    >
                      <span className="text-brand-primary mt-0.5 text-sm">📍</span>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-brand-forestDark">{result.name}</div>
                        <div className="text-[11px] text-gray-500 truncate">{result.displayName}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Selected location */}
            <div className="flex items-center gap-2 text-xs text-brand-textSlate">
              <span className="text-brand-primary">📍</span>
              <span className="font-bold text-brand-forestDark">{locationName}</span>
              <span className="text-gray-400">•</span>
              <span>{latitude?.toFixed(4)}°, {longitude?.toFixed(4)}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreHeader;
