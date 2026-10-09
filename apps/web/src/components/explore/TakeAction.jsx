import React from 'react';
import { Link } from 'react-router-dom';

const TakeAction = () => {
  return (
    <div className="mt-8">
      <div className="bg-gradient-to-r from-brand-forestDark via-brand-deepGreen to-brand-midForest rounded-3xl p-6 sm:p-8 shadow-card overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-10 w-32 h-32 bg-white/5 rounded-full translate-y-1/2"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shrink-0">
              🌱
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-display">Take Action</h3>
              <p className="text-sm text-white/70 font-medium mt-0.5 max-w-md">
                Turn environmental awareness into action. Join community initiatives and contribute to real environmental impact.
              </p>
            </div>
          </div>
          <Link
            to="/community"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-brand-forestDark font-bold rounded-full text-sm shadow-soft hover:shadow-card hover:bg-brand-lime transition-all duration-200 group shrink-0"
          >
            <span>Explore Community</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">➔</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TakeAction;
