import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useWeatherData } from '../hooks/useWeatherData';

const HeroSection = () => {
  const {
    locationName,
    locationDisplay,
    latitude,
    longitude,
    temperature,
    temperatureFormatted,
    weatherEmoji,
    weatherDescription,
    aqiLabel,
    aqiColor,
    pm25,
    loading,
    searchResults,
    searchLoading,
    searchLocation,
    setLocation,
    clearSearch,
  } = useWeatherData();

  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Debounced search
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

  // Handle result selection
  const handleSelectResult = useCallback(
    (result) => {
      setLocation(result.lat, result.lon, result.name, result.displayName);
      setQuery('');
      setShowResults(false);
      clearSearch();
    },
    [setLocation, clearSearch]
  );

  // Handle search button click
  const handleSearch = useCallback(() => {
    if (query.trim().length >= 2) {
      searchLocation(query);
      setShowResults(true);
    }
  }, [query, searchLocation]);

  // Handle enter key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="relative pt-8 pb-14 lg:pt-14 lg:pb-20 overflow-hidden hero-pattern" id="home">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Column */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint border border-brand-borderGreen text-brand-midForest text-xs md:text-sm font-bold mb-6">
              <span className="text-base">🌿</span>
              <span>Verified Climate-Tech Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-forestDark font-display leading-[1.15] mb-5 tracking-tight">
              Understand your environment.<br />
              <span className="text-brand-primary">Act before it's too late.</span>
            </h1>
            <p className="text-base sm:text-lg text-brand-textSlate max-w-xl mb-6 leading-relaxed font-medium">
              Turn environmental data into clear insights, verify data integrity, and discover meaningful ways to take action.
            </p>
            {/* Embedded Location Search Bar */}
            <div className="relative w-full max-w-md mb-6" ref={searchContainerRef}>
              <div className="w-full bg-white rounded-full shadow-md border border-brand-borderGreen p-1.5 pl-4 flex items-center justify-between focus-within:ring-2 focus-within:ring-brand-primary transition-all">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 flex-1">
                  <svg className="w-4 h-4 text-brand-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <input
                    className="w-full bg-transparent border-none text-xs sm:text-sm text-brand-forestDark placeholder-gray-400 focus:outline-none focus:ring-0 p-0"
                    placeholder="Search a city or location…"
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    id="hero-location-search"
                  />
                </div>
                <button
                  aria-label="Search"
                  className="px-4 py-2 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-primaryHover transition-colors flex items-center gap-1.5 shadow-sm"
                  onClick={handleSearch}
                >
                  {searchLoading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>Search</span>
                      <span>➔</span>
                    </>
                  )}
                </button>
              </div>
              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-brand-borderGreen overflow-hidden z-50">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      className="w-full text-left px-4 py-3 hover:bg-brand-mint/50 transition-colors flex items-start gap-3 border-b border-gray-50 last:border-b-0"
                      onClick={() => handleSelectResult(result)}
                    >
                      <span className="text-brand-primary mt-0.5">📍</span>
                      <div>
                        <div className="text-sm font-bold text-brand-forestDark">{result.name}</div>
                        <div className="text-[11px] text-gray-500 line-clamp-1">{result.displayName}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {showResults && searchResults.length === 0 && !searchLoading && query.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-brand-borderGreen p-4 z-50">
                  <p className="text-sm text-gray-500 text-center">No locations found for "{query}"</p>
                </div>
              )}
            </div>
            {/* Dual Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold rounded-full text-base shadow-soft hover:shadow-card transition-all duration-200 group" href="#explore">
                <span>Explore Your Environment</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">➔</span>
              </a>
              <a className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-50 text-brand-forestDark border border-brand-borderGreen font-bold rounded-full text-base shadow-sm transition-all duration-200" href="#data-hub">
                <span>Discover Data</span>
                <svg className="w-4 h-4 fill-current text-brand-primary" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </a>
            </div>
            {/* Mini Trust Note */}
            <div className="mt-8 flex items-center gap-3 text-xs text-brand-textSlate">
              <div className="flex -space-x-2">
                <span className="w-7 h-7 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-700">BD</span>
                <span className="w-7 h-7 rounded-full bg-lime-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-lime-800">JK</span>
                <span className="w-7 h-7 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-teal-800">YO</span>
              </div>
              <p><strong className="text-brand-forestDark font-bold">120+ Communities</strong> actively verifying satellite &amp; field observations</p>
            </div>
          </div>
          {/* Hero Right Column: Playful Illustrated Landscape Map */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full max-w-lg mx-auto aspect-square sm:aspect-[5/4] lg:aspect-[6/5]">
              {/* Main Organic Map Canvas */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#77C959] via-[#4BA739] to-[#2B7322] p-4 shadow-2xl overflow-hidden border-4 border-white/70">
                {/* Illustrated Clouds */}
                <div className="absolute top-4 left-6 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-1.5 shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-white -mt-1.5"></div>
                  <span className="text-[11px] font-bold text-brand-deepGreen">Live Monitored Zone</span>
                </div>
                <div className="absolute top-10 right-10 bg-white/40 rounded-full w-14 h-4"></div>
                {/* Organic Contours & Water Graphic */}
                <svg className="w-full h-full opacity-35" fill="none" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-50 140 C 120 170, 200 80, 320 120 C 420 150, 480 320, 550 350" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="24"></path>
                  <path d="M-20 280 C 100 240, 220 380, 340 310 C 450 250, 510 420, 560 480" stroke="#72CCFF" strokeLinecap="round" strokeWidth="34"></path>
                  <circle cx="150" cy="220" fill="#3E8332" r="80"></circle>
                  <circle cx="380" cy="190" fill="#327327" r="95"></circle>
                  <circle cx="270" cy="390" fill="#29621F" r="110"></circle>
                </svg>
                {/* Interactive Pulse Markers */}
                <div className="absolute top-1/3 left-1/3 group cursor-pointer">
                  <span className="absolute w-8 h-8 rounded-full bg-brand-lime opacity-80 map-pulse"></span>
                  <div className="relative w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-primary text-xs font-bold border-2 border-brand-primary">
                    🌲
                  </div>
                </div>
                <div className="absolute top-1/2 right-1/4 group cursor-pointer">
                  <span className="absolute w-7 h-7 rounded-full bg-emerald-300 opacity-80 map-pulse"></span>
                  <div className="relative w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-xs font-bold text-brand-deepGreen border border-brand-midForest">
                    💧
                  </div>
                </div>
                {/* Tree Illustrations */}
                <div className="absolute bottom-5 left-10 opacity-90 hidden sm:flex items-end gap-1.5">
                  <span className="text-5xl">🌳</span>
                  <span className="text-3xl">🌲</span>
                  <span className="text-4xl">🌱</span>
                </div>
              </div>
              {/* Floating Weather Badge (Left Middle) — LIVE DATA */}
              <div className="absolute bottom-28 -left-3 sm:-left-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-card p-3 border border-brand-borderGreen flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                  {loading.weather ? (
                    <span className="w-5 h-5 border-2 border-amber-300 border-t-amber-600 rounded-full animate-spin"></span>
                  ) : (
                    weatherEmoji
                  )}
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Temperature</div>
                  {loading.weather ? (
                    <div className="h-5 w-12 bg-gray-200 rounded animate-pulse mt-1"></div>
                  ) : (
                    <div className="text-lg font-black text-brand-forestDark">{temperatureFormatted}</div>
                  )}
                </div>
              </div>
              {/* Floating Air Quality Badge (Top Right) — LIVE DATA */}
              <div className="absolute top-16 right-0 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-card p-3.5 border border-brand-borderGreen flex items-center gap-3 z-20 transform hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-brand-mint flex items-center justify-center text-xl">
                  {loading.airQuality ? (
                    <span className="w-5 h-5 border-2 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></span>
                  ) : (
                    '🍃'
                  )}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wide font-bold text-gray-400">Air Quality</div>
                  {loading.airQuality ? (
                    <>
                      <div className="h-4 w-14 bg-gray-200 rounded animate-pulse mt-1"></div>
                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mt-1"></div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-sm font-extrabold ${aqiColor}`}>{aqiLabel}</span>
                        <span className={`w-2 h-2 rounded-full ${aqiLabel === 'Good' ? 'bg-emerald-500 animate-ping' : aqiLabel === 'Fair' ? 'bg-lime-500' : 'bg-amber-500'}`}></span>
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium">
                        PM2.5 {pm25 != null ? `${pm25} µg/m³` : 'N/A'}
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* Floating Location Badge (Bottom) — LIVE DATA */}
              <div className="absolute -bottom-6 left-4 right-4 sm:left-8 sm:right-8 bg-white rounded-2xl shadow-card p-3.5 border border-gray-100 flex items-center justify-between z-20 hover:border-brand-primary transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-900/10 flex items-center justify-center text-2xl shrink-0">
                    🌱
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-brand-forestDark leading-snug">{locationName}</h4>
                      <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Live Data</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {weatherDescription} • {latitude?.toFixed(2)}°, {longitude?.toFixed(2)}°
                    </p>
                  </div>
                </div>
                <a aria-label="Explore Node" className="w-8 h-8 rounded-full bg-brand-mint text-brand-primary hover:bg-brand-primary hover:text-white flex items-center justify-center text-xs font-bold transition-colors" href="#explore">
                  ➔
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
