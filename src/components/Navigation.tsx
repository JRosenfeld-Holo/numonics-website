"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

const NAV_LINKS = [
  { href: "#collabs", label: "Collabs" },
  { href: "#release", label: "Latest Release" },
  { href: "#about",   label: "About" },
  { href: "#beats",   label: "Nu Beats" },
];

export default function Navigation() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full sticky top-0 z-50 bg-[#050505] border-b border-outline-variant">
        {/* Main bar */}
        <div className="flex justify-between items-center px-4 md:px-12 py-5 md:py-8">
          {/* Animated soundwave logo */}
          <a href="#" aria-label="Numonics — back to top">
            <svg width="100" height="40" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <style>{`
                @keyframes bar-pulse {
                  0%, 100% { transform: scaleY(1); }
                  50%       { transform: scaleY(0.2); }
                }
                .sw-bar { transform-origin: center; animation: bar-pulse 1s ease-in-out infinite; }
              `}</style>
              <rect className="sw-bar" x="0"   y="20" width="6" height="8"  fill="#ff0099" style={{animationDelay:"0.0s"}}/>
              <rect className="sw-bar" x="9"   y="14" width="6" height="20" fill="#ff0099" style={{animationDelay:"0.15s"}}/>
              <rect className="sw-bar" x="18"  y="6"  width="6" height="36" fill="#ff0099" style={{animationDelay:"0.3s"}}/>
              <rect className="sw-bar" x="27"  y="10" width="6" height="28" fill="#ff0099" style={{animationDelay:"0.1s"}}/>
              <rect className="sw-bar" x="36"  y="2"  width="6" height="44" fill="#ff0099" style={{animationDelay:"0.45s"}}/>
              <rect className="sw-bar" x="45"  y="8"  width="6" height="32" fill="#ff0099" style={{animationDelay:"0.2s"}}/>
              <rect className="sw-bar" x="54"  y="16" width="6" height="16" fill="#ff0099" style={{animationDelay:"0.55s"}}/>
              <rect className="sw-bar" x="63"  y="4"  width="6" height="40" fill="#ff0099" style={{animationDelay:"0.35s"}}/>
              <rect className="sw-bar" x="72"  y="10" width="6" height="28" fill="#ff0099" style={{animationDelay:"0.05s"}}/>
              <rect className="sw-bar" x="81"  y="18" width="6" height="12" fill="#ff0099" style={{animationDelay:"0.4s"}}/>
              <rect className="sw-bar" x="90"  y="12" width="6" height="24" fill="#ff0099" style={{animationDelay:"0.25s"}}/>
              <rect className="sw-bar" x="99"  y="6"  width="6" height="36" fill="#ff0099" style={{animationDelay:"0.5s"}}/>
              <rect className="sw-bar" x="108" y="16" width="6" height="16" fill="#ff0099" style={{animationDelay:"0.1s"}}/>
            </svg>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex gap-12 items-center">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="font-headline uppercase tracking-[-0.02em] font-bold text-white hover:bg-[#ff0099] hover:text-[#000000] transition-colors duration-200 cursor-pointer px-1">
                {label}
              </a>
            ))}
          </div>

          {/* Right: booking + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookingOpen(true)}
              className="font-headline uppercase tracking-[-0.02em] font-bold text-white border-2 border-white px-4 md:px-6 py-2 text-sm md:text-base hover:bg-[#ff0099] hover:border-[#ff0099] hover:text-[#000000] transition-all active:scale-95 cursor-pointer"
            >
              Booking
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-outline-variant bg-[#050505]">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 font-headline uppercase tracking-widest font-bold text-white border-b border-outline-variant hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
