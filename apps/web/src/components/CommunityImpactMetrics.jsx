import React from 'react';

const CommunityImpactMetrics = () => {
  return (
    <section aria-label="Metrics Bar" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-brand-borderGreen shadow-card relative overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y-2 md:divide-y-0 md:divide-x-2 divide-brand-borderGreen/60">
          <div className="flex items-center gap-3 sm:gap-4 pt-4 md:pt-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-mint flex items-center justify-center text-2xl sm:text-3xl text-emerald-600 shrink-0">
              🌱
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-forestDark font-display">
                520+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-brand-textSlate">
                Trees Planted
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-mint flex items-center justify-center text-2xl sm:text-3xl text-green-600 shrink-0">
              📊
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-forestDark font-display">
                120+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-brand-textSlate">
                Verified Datasets
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-mint flex items-center justify-center text-2xl sm:text-3xl text-lime-600 shrink-0">
              📍
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-forestDark font-display">
                350+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-brand-textSlate">
                Monitored Regions
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-mint flex items-center justify-center text-2xl sm:text-3xl text-teal-600 shrink-0">
              🛡️
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-forestDark font-display">
                100%
              </div>
              <div className="text-xs sm:text-sm font-semibold text-brand-textSlate">
                Data Integrity
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpactMetrics;
