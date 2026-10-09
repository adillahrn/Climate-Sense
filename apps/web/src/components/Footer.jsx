import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-forestDark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <a className="flex items-center gap-3 mb-4" href="#">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-brand-primary">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <span className="text-lg font-extrabold tracking-tight">
                Climate<span className="text-brand-primary">Sense</span>
              </span>
            </a>
            <p className="text-sm text-emerald-200/70 leading-relaxed max-w-xs">
              Environmental intelligence backed by satellite data, community action, and cryptographic trust.
            </p>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-100/70">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Explore
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Data Hub
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  AI Analyst
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Verification
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300 mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-100/70">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Programs
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Volunteer
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Impact
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Partners
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300 mb-4">
              Stay Updated
            </h4>
            <p className="text-sm text-emerald-100/70 mb-3">
              Get the latest environmental insights delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/10 text-sm text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="Your email"
                type="email"
              />
              <button className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primaryHover text-white text-sm font-bold rounded-full transition-colors shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/50">
          <span>© 2025 ClimateSense. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a className="hover:text-white transition-colors" href="#">
              Privacy
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Terms
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
