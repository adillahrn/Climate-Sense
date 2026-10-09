import React from 'react';

const AIClimateAnalystSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F0]" id="ai-analyst">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-brand-mint text-brand-midForest">
            ANALYSIS & VERIFICATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forestDark font-display mt-3 tracking-tight">
            Intelligent Analysis.<br />Cryptographically Verified Evidence.
          </h2>
          <p className="text-brand-textSlate text-sm sm:text-base mt-3 font-medium">
            We pair conversational AI reasoning with immutable ledger proof so decision-makers and communities can trust every figure.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* AI Climate Analyst Chat Bubble Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-brand-borderGreen flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-mint text-brand-midForest flex items-center justify-center font-black text-sm">🤖</div>
                  <div>
                    <h3 className="text-sm font-extrabold text-brand-forestDark">AI Climate Analyst</h3>
                    <span className="text-[10px] text-gray-400 font-medium">Trained on Sentinel-2 & microclimate registries</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Active Model</span>
              </div>
              <div className="flex justify-end mb-4">
                <div className="bg-brand-forestDark text-white text-xs sm:text-sm font-semibold rounded-2xl rounded-tr-sm px-4 py-3 max-w-md shadow-sm">
                  Why is the heat risk increasing in this area?
                </div>
              </div>
              <div className="flex items-start gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-brand-mint text-brand-midForest flex items-center justify-center text-sm font-bold shrink-0 mt-1">🌿</div>
                <div className="bg-brand-cream border border-brand-borderGreen rounded-2xl rounded-tl-sm p-4 text-xs sm:text-sm text-brand-forestDark w-full space-y-2">
                  <p className="font-bold text-brand-forestDark">Heat risk is rising due to three correlated factors:</p>
                  <ul className="space-y-1.5 text-brand-textSlate font-medium">
                    <li className="flex items-start gap-1.5">
                      <span className="text-brand-primary font-bold">•</span>
                      <span>Average temp rose <strong className="text-brand-forestDark font-bold">1.8°C</strong> over last 7 days.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-brand-primary font-bold">•</span>
                      <span>Relative humidity dropped up to <strong className="text-brand-forestDark font-bold">12%</strong>.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-brand-primary font-bold">•</span>
                      <span>Tree canopy cover decreased in the urban perimeter.</span>
                    </li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-brand-borderGreen flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <a className="text-brand-midForest font-bold hover:underline flex items-center gap-1" href="#data-sources">🔗 View Sentinel-2 spectral layers →</a>
                    <span className="text-[11px] text-gray-500 font-bold">Confidence: 94%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <input 
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-brand-forestDark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all" 
                placeholder="Ask about moisture, canopy index, or flood danger…" 
                readOnly 
                type="text" 
              />
              <button aria-label="Send query" className="absolute right-2 top-1.5 w-8 h-8 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white flex items-center justify-center transition-colors shadow-sm">➔</button>
            </div>
          </div>
          {/* Blockchain Data Verification Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-brand-borderGreen flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm">🛡️</div>
                  <div>
                    <h3 className="text-sm font-extrabold text-brand-forestDark">Cryptographic Data Integrity</h3>
                    <span className="text-[10px] text-gray-400 font-medium">Tamper-proof verifiable environmental records</span>
                  </div>
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">Verified On-Chain</span>
              </div>
              <div className="bg-brand-cream rounded-2xl p-4 border border-brand-borderGreen space-y-3 mb-5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-textSlate font-medium">Record ID</span>
                  <span className="font-mono font-bold text-brand-forestDark">#CS-2025-0842</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-textSlate font-medium">Data Sources</span>
                  <span className="font-semibold text-brand-forestDark">Sentinel-2 & Ground Station BD-04</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-textSlate font-medium">Timestamp</span>
                  <span className="font-medium text-gray-600">18 Apr 2025 · 10:24:00 UTC</span>
                </div>
                <div className="pt-2 border-t border-brand-borderGreen/60">
                  <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">SHA-256 Proof Hash</div>
                  <div className="font-mono text-[11px] text-emerald-800 bg-white p-2 rounded-lg border border-brand-borderGreen select-all break-all">0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</div>
                </div>
              </div>
              <p className="text-xs text-brand-textSlate leading-relaxed mb-4">
                Blockchain records provide an immutable audit trail for environmental sensor data and activity logs, ensuring tamper-proof transparency for donors, citizens, and researchers.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-brand-textSlate font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Consensus finalized
              </span>
              <a className="font-bold text-brand-midForest hover:underline flex items-center gap-1" href="#audit">View Public Audit Log ➔</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIClimateAnalystSection;
