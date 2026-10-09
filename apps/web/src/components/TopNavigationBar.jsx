import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TopNavigationBar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/explore', label: 'Explore' },
    { to: '/#data-hub', label: 'Data Hub', hash: true },
    { to: '/#community', label: 'Community', hash: true },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F0]/92 backdrop-blur-md border-b border-[#E7EFE1] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Brand Name */}
        <Link aria-label="ClimateSense Home" className="flex items-center gap-3 group" to="/">
          <div className="w-10 h-10 rounded-full bg-brand-primary/15 flex items-center justify-center text-brand-primary group-hover:scale-105 transition-transform duration-200 shrink-0">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight font-display text-brand-forestDark leading-none">Climate<span className="text-brand-primary">Sense</span></span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 text-[15px] font-bold text-brand-textSlate">
          {navLinks.map((link) =>
            link.hash ? (
              <a
                key={link.label}
                className="hover:text-brand-primary transition-colors"
                href={link.to}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                className={`transition-colors ${
                  isActive(link.to) ? 'text-brand-primary' : 'hover:text-brand-primary'
                }`}
                to={link.to}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-brand-forestDark hover:bg-brand-primary rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            to="/explore"
          >
            Get Started
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-brand-mint transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6 text-brand-forestDark" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-brand-borderGreen px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) =>
            link.hash ? (
              <a
                key={link.label}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-brand-textSlate hover:bg-brand-mint hover:text-brand-primary transition-colors"
                href={link.to}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  isActive(link.to)
                    ? 'bg-brand-mint text-brand-primary'
                    : 'text-brand-textSlate hover:bg-brand-mint hover:text-brand-primary'
                }`}
                to={link.to}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
};

export default TopNavigationBar;
