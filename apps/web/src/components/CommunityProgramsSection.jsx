import React from 'react';

const CommunityProgramsSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-y border-brand-borderGreen/50" id="community">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-mint text-brand-midForest">COMMUNITY PROGRAMS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forestDark font-display mt-3 tracking-tight">Real Action for<br/>Greater Impact.</h2>
            <p className="text-brand-textSlate text-base max-w-xl mt-2 font-medium">Support high-priority local initiatives through verified donations or volunteer in the field.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-brand-forestDark text-white shadow-sm">All Initiatives</button>
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-gray-100 hover:bg-gray-200 text-brand-forestDark transition-colors">Reforestation</button>
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-gray-100 hover:bg-gray-200 text-brand-forestDark transition-colors">Marine Cleanup</button>
            <button className="px-4 py-2 rounded-full text-xs font-bold bg-gray-100 hover:bg-gray-200 text-brand-forestDark transition-colors">Campus Action</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <article className="bg-[#FAF8F0] rounded-3xl p-6 border border-brand-borderGreen flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 p-4 relative overflow-hidden flex flex-col justify-between text-white mb-5 shadow-inner">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white">🌱 Reforestation</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/30 backdrop-blur-md text-brand-lime">Verified</span>
                </div>
                <div>
                  <div className="text-3xl">🧑🌾🌳</div>
                  <div className="text-xs font-semibold text-emerald-100 mt-1">Bandung Urban Canopy Restoration</div>
                </div>
              </div>
              <h3 className="text-xl font-extrabold text-brand-forestDark font-display mb-1">GreenRoots</h3>
              <div className="space-y-1.5 text-xs text-brand-textSlate font-medium mb-5">
                <div className="flex items-center gap-2"><span className="text-brand-primary">📍</span><span>Bandung City Forest • Green Community</span></div>
                <div className="flex items-center gap-2"><span className="text-brand-primary">🌳</span><span>Target: 2,500 native saplings planted</span></div>
              </div>
              <div className="space-y-3 mb-6 bg-white p-3.5 rounded-2xl border border-brand-borderGreen">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-brand-forestDark">Funding Progress</span>
                    <span className="text-brand-midForest">$4,200 / $5,000 (84%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-brand-primary h-full rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-brand-forestDark">Volunteer Spots</span>
                    <span className="text-brand-textSlate">80 / 100 Filled</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-brand-forestDark h-full rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button className="py-2.5 px-3 bg-white hover:bg-gray-50 text-brand-forestDark border border-brand-borderGreen text-xs font-bold rounded-xl text-center shadow-sm transition-colors">Donate</button>
              <button className="py-2.5 px-3 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold rounded-xl text-center shadow-sm transition-colors">Volunteer / Join</button>
            </div>
          </article>
          {/* Card 2 */}
          <article className="bg-[#FAF8F0] rounded-3xl p-6 border border-brand-borderGreen flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-teal-600 via-cyan-700 to-blue-800 p-4 relative overflow-hidden flex flex-col justify-between text-white mb-5 shadow-inner">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white">🌊 Marine Cleanup</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/30 backdrop-blur-md text-cyan-100">Verified</span>
                </div>
                <div>
                  <div className="text-3xl">🏖️🧤</div>
                  <div className="text-xs font-semibold text-cyan-100 mt-1">Coastal Barrier Plastic Interception</div>
                </div>
              </div>
              <h3 className="text-xl font-extrabold text-brand-forestDark font-display mb-1">CleanEarth</h3>
              <div className="space-y-1.5 text-xs text-brand-textSlate font-medium mb-5">
                <div className="flex items-center gap-2"><span className="text-brand-primary">📍</span><span>Pantai Indah Kapuk • Clean Ocean Community</span></div>
                <div className="flex items-center gap-2"><span className="text-brand-primary">♻️</span><span>Target: 1,800 kg audited marine plastic</span></div>
              </div>
              <div className="space-y-3 mb-6 bg-white p-3.5 rounded-2xl border border-brand-borderGreen">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-brand-forestDark">Funding Progress</span>
                    <span className="text-teal-700">$3,150 / $4,500 (70%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-full rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-brand-forestDark">Volunteer Spots</span>
                    <span className="text-brand-textSlate">50 / 80 Filled</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-brand-forestDark h-full rounded-full" style={{ width: '62.5%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button className="py-2.5 px-3 bg-white hover:bg-gray-50 text-brand-forestDark border border-brand-borderGreen text-xs font-bold rounded-xl text-center shadow-sm transition-colors">Donate</button>
              <button className="py-2.5 px-3 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold rounded-xl text-center shadow-sm transition-colors">Volunteer / Join</button>
            </div>
          </article>
          {/* Card 3 */}
          <article className="bg-[#FAF8F0] rounded-3xl p-6 border border-brand-borderGreen flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-amber-600 via-orange-700 to-emerald-800 p-4 relative overflow-hidden flex flex-col justify-between text-white mb-5 shadow-inner">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white">🎓 Campus Net-Zero</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/30 backdrop-blur-md text-amber-100">Verified</span>
                </div>
                <div>
                  <div className="text-3xl">🏛️🌿</div>
                  <div className="text-xs font-semibold text-amber-100 mt-1">University Carbon Audit & Micro-Forest</div>
                </div>
              </div>
              <h3 className="text-xl font-extrabold text-brand-forestDark font-display mb-1">Campus Green Initiative</h3>
              <div className="space-y-1.5 text-xs text-brand-textSlate font-medium mb-5">
                <div className="flex items-center gap-2"><span className="text-brand-primary">📍</span><span>Universitas Indonesia • Student Climate Alliance</span></div>
                <div className="flex items-center gap-2"><span className="text-brand-primary">🌱</span><span>Target: 1,000 m² biodiverse canopy patch</span></div>
              </div>
              <div className="space-y-3 mb-6 bg-white p-3.5 rounded-2xl border border-brand-borderGreen">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-brand-forestDark">Funding Progress</span>
                    <span className="text-amber-700">$5,800 / $6,000 (96%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-brand-forestDark">Volunteer Spots</span>
                    <span className="text-brand-textSlate">200 / 220 Filled</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-brand-forestDark h-full rounded-full" style={{ width: '90.9%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button className="py-2.5 px-3 bg-white hover:bg-gray-50 text-brand-forestDark border border-brand-borderGreen text-xs font-bold rounded-xl text-center shadow-sm transition-colors">Donate</button>
              <button className="py-2.5 px-3 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold rounded-xl text-center shadow-sm transition-colors">Volunteer / Join</button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CommunityProgramsSection;
