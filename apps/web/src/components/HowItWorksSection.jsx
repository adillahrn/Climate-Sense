import React from 'react';

const HowItWorksSection = () => {
  return (
    <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="how-it-works">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-brand-mint text-brand-midForest">
          HOW IT WORKS
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forestDark font-display mt-3 tracking-tight">
          From Satellite Observation<br />to Verifiable Field Action
        </h2>
        <p className="text-brand-textSlate text-sm sm:text-base mt-3 font-medium">
          An end-to-end intelligence loop designed for real transparency and grounded community impact.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
        {/* Step 1 */}
        <div className="bg-white rounded-3xl p-5 border border-brand-borderGreen shadow-card flex flex-col justify-between hover:-translate-y-1 transition-transform relative group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-full bg-brand-mint text-brand-midForest flex items-center justify-center text-xs font-black">
                01
              </span>
              <span className="text-2xl">🛰️</span>
            </div>
            <h3 className="text-base font-extrabold text-brand-forestDark mb-1">1. Explore</h3>
            <p className="text-xs text-brand-textSlate leading-relaxed">
              Satellite (Sentinel-2, NASA) and ground sensor ingestion across microclimates.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-[10px] font-bold text-brand-midForest">
            <span>Continuous Ingestion</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-3xl p-5 border border-brand-borderGreen shadow-card flex flex-col justify-between hover:-translate-y-1 transition-transform relative group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-full bg-brand-mint text-brand-midForest flex items-center justify-center text-xs font-black">
                02
              </span>
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-base font-extrabold text-brand-forestDark mb-1">2. Detect</h3>
            <p className="text-xs text-brand-textSlate leading-relaxed">
              Real-time anomaly identification in temperature, canopy loss, and moisture shifts.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-[10px] font-bold text-brand-midForest">
            <span>Anomaly Triggers</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-3xl p-5 border border-brand-borderGreen shadow-card flex flex-col justify-between hover:-translate-y-1 transition-transform relative group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-full bg-brand-mint text-brand-midForest flex items-center justify-center text-xs font-black">
                03
              </span>
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-base font-extrabold text-brand-forestDark mb-1">3. Explain</h3>
            <p className="text-xs text-brand-textSlate leading-relaxed">
              AI Climate Analyst translates raw data points into plain-language actionable causes.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-[10px] font-bold text-brand-midForest">
            <span>Contextual Insights</span>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white rounded-3xl p-5 border border-brand-borderGreen shadow-card flex flex-col justify-between hover:-translate-y-1 transition-transform relative group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-full bg-brand-mint text-brand-midForest flex items-center justify-center text-xs font-black">
                04
              </span>
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-base font-extrabold text-brand-forestDark mb-1">4. Verify</h3>
            <p className="text-xs text-brand-textSlate leading-relaxed">
              Cryptographic ledger anchoring creates an immutable audit trail for every reading.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-[10px] font-bold text-emerald-700">
            <span>SHA-256 Provenance</span>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-white rounded-3xl p-5 border border-brand-borderGreen shadow-card flex flex-col justify-between hover:-translate-y-1 transition-transform relative group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-8 h-8 rounded-full bg-brand-mint text-brand-midForest flex items-center justify-center text-xs font-black">
                05
              </span>
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-base font-extrabold text-brand-forestDark mb-1">5. Act</h3>
            <p className="text-xs text-brand-textSlate leading-relaxed">
              Local communities mobilize for targeted tree planting, cleanups, and audited micro-grants.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-[10px] font-bold text-brand-primary">
            <span>Direct Impact</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
