import React from 'react';

const ClosingBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="relative rounded-4xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 p-8 sm:p-14 overflow-hidden text-center text-white shadow-card">
        <div className="absolute inset-0 opacity-15 pointer-events-none flex items-end justify-between px-4 select-none">
          <span className="text-8xl">🌲</span>
          <span className="text-9xl">🌳</span>
          <span className="text-7xl">🌲</span>
          <span className="text-9xl">🌳</span>
          <span className="text-8xl">🌲</span>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-[1.2] mb-4">
            Together, we can
            <br />
            make our planet greener.
          </h2>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Join the growing network of communities turning climate intelligence into real-world impact.
          </p>
          <a
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-lime text-brand-deepGreen hover:bg-white font-extrabold rounded-full text-base shadow-lg transition-all duration-200"
            href="#get-started"
          >
            <span>Explore Now</span>
            <span>➔</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClosingBanner;
