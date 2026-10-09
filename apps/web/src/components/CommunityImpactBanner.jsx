import React from 'react';

const CommunityImpactBanner = () => {
  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="impact">
      <div className="bg-[#0B3B24] rounded-4xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-8 bottom-4 opacity-15 hidden lg:block text-9xl pointer-events-none select-none">
          🌿
        </div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-lime text-brand-deepGreen mb-4">
              COMMUNITY IMPACT
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-[1.2] mb-4 text-white">
              Every Action
              <br />
              Logged and Measured.
            </h2>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              Full transparency from planted saplings to tree survival rates and audited recyclables across every active region.
            </p>
            <a
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-brand-lime text-brand-deepGreen hover:bg-white font-bold rounded-full text-sm shadow-md transition-all duration-200"
              href="#full-impact"
            >
              <span>View Full Impact</span>
              <span>→</span>
            </a>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-brand-lime mb-1">
                1.2K
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">Trees Planted</div>
              <div className="text-[11px] text-emerald-200/80 mt-1">92% survival rate</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-1">
                580
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">Active Volunteers</div>
              <div className="text-[11px] text-emerald-200/80 mt-1">Engaged weekly</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-1">
                12
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">Locations</div>
              <div className="text-[11px] text-emerald-200/80 mt-1">Across coastal & urban zones</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-brand-lime mb-1">
                85%
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">Verified</div>
              <div className="text-[11px] text-emerald-200/80 mt-1">Regular on-chain audit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpactBanner;
