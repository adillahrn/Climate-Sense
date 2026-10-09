import React, { useState, useCallback } from 'react';
import { useWeatherData } from '../../hooks/useWeatherData';
import { generateAnalysis } from '../../services/aiService';

const AIClimateAnalyst = () => {
  const { weather, airQuality, historicalData, location, loading } = useWeatherData();
  const [analysis, setAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  const handleGenerate = useCallback(async () => {
    setAnalysisLoading(true);
    setAnalysisError(null);
    const result = await generateAnalysis(
      weather.data,
      airQuality.data,
      historicalData.data,
      location
    );
    setAnalysisLoading(false);
    if (result.error) {
      setAnalysisError(result.error);
      if (!result.configured) {
        setAnalysis({ notConfigured: true });
      }
    } else {
      setAnalysis(result.data);
    }
  }, [weather.data, airQuality.data, historicalData.data, location]);

  const isDataReady = !loading.weather && !loading.airQuality;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-card border border-brand-borderGreen flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-lg shadow-soft">
          🤖
        </div>
        <div>
          <h3 className="text-base font-extrabold text-brand-forestDark">AI Climate Analyst</h3>
          <p className="text-[11px] text-gray-400 font-medium">Powered by environmental data analysis</p>
        </div>
      </div>

      <div className="flex-1">
        {/* Not yet generated */}
        {!analysis && !analysisLoading && !analysisError && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🌍</div>
            <p className="text-sm text-gray-500 font-medium mb-1">
              Generate an AI-powered analysis of environmental conditions
            </p>
            <p className="text-[11px] text-gray-400 mb-5">
              for {location.name} using current weather, air quality, and historical trends
            </p>
            <button
              onClick={handleGenerate}
              disabled={!isDataReady}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-sm font-bold rounded-xl hover:from-violet-600 hover:to-indigo-700 transition-all shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>✨</span>
              <span>Generate Analysis</span>
            </button>
          </div>
        )}

        {/* Loading */}
        {analysisLoading && (
          <div className="text-center py-8">
            <div className="w-10 h-10 border-3 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-gray-500 font-medium">Analyzing environmental data…</p>
            <p className="text-[11px] text-gray-400 mt-1">This may take a few seconds</p>
          </div>
        )}

        {/* Error / Not configured */}
        {analysisError && (
          <div className="py-4">
            <div className={`rounded-xl p-4 ${analysis?.notConfigured ? 'bg-amber-50 border border-amber-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-start gap-2">
                <span className="text-base mt-0.5">{analysis?.notConfigured ? '🔑' : '⚠️'}</span>
                <div>
                  <div className={`text-sm font-bold ${analysis?.notConfigured ? 'text-amber-800' : 'text-red-800'}`}>
                    {analysis?.notConfigured ? 'API Configuration Required' : 'Analysis Failed'}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{analysisError}</p>
                  {analysis?.notConfigured && (
                    <p className="text-[11px] text-gray-500 mt-2">
                      Add <code className="bg-amber-100 px-1 rounded text-[10px]">VITE_GEMINI_API_KEY=your_key</code> to your <code className="bg-amber-100 px-1 rounded text-[10px]">.env</code> file to enable AI analysis.
                    </p>
                  )}
                </div>
              </div>
            </div>
            {!analysis?.notConfigured && (
              <button
                onClick={handleGenerate}
                className="mt-3 text-xs font-bold text-violet-600 hover:text-violet-700"
              >
                ↻ Retry Analysis
              </button>
            )}
          </div>
        )}

        {/* Analysis result */}
        {analysis && !analysis.notConfigured && !analysisError && (
          <div className="space-y-4">
            {/* Summary */}
            {analysis.summary && (
              <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl p-3.5 border border-violet-100">
                <div className="text-[10px] uppercase font-bold text-violet-500 tracking-wider mb-1">Summary</div>
                <p className="text-sm text-gray-700 leading-relaxed">{analysis.summary}</p>
              </div>
            )}

            {/* Observations */}
            {analysis.observations?.length > 0 && (
              <div>
                <div className="text-xs font-bold text-brand-forestDark mb-2">Key Observations</div>
                <ul className="space-y-1.5">
                  {analysis.observations.map((obs, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0"></span>
                      {obs}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Implications */}
            {analysis.implications?.length > 0 && (
              <div>
                <div className="text-xs font-bold text-brand-forestDark mb-2">Potential Implications</div>
                <ul className="space-y-1.5">
                  {analysis.implications.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-amber-500 mt-0.5 shrink-0">⚡</span>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {analysis.recommendations?.length > 0 && (
              <div>
                <div className="text-xs font-bold text-brand-forestDark mb-2">Recommendations</div>
                <ul className="space-y-1.5">
                  {analysis.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Refresh */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">
                Based on data retrieved for {location.name}
              </span>
              <button
                onClick={handleGenerate}
                className="text-[11px] font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1"
              >
                <span>↻</span> Refresh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIClimateAnalyst;
