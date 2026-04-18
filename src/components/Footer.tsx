"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

export default function Footer() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="w-full px-6 md:px-12 py-12 md:py-16 bg-[#0a0a0a] relative z-10 border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">

          {/* Brand + copyright */}
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-black text-white tracking-tighter font-headline">NUMONICS</div>
            <p className="font-label text-[0.75rem] uppercase tracking-[0.1em] font-medium text-white/40 max-w-xs">
              &copy;{year} Numonics. All Rights Reserved.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 mt-2">
              <a
                href="https://www.instagram.com/numonics/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-[0.75rem] uppercase tracking-[0.1em] font-medium text-white/50 hover:text-[#ff0099] transition-colors cursor-pointer"
              >
                Instagram
              </a>
              <a
                href="https://open.spotify.com/search/Numonics"
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-[0.75rem] uppercase tracking-[0.1em] font-medium text-white/50 hover:text-[#ff0099] transition-colors cursor-pointer"
              >
                Spotify
              </a>
              <a className="font-label text-[0.75rem] uppercase tracking-[0.1em] font-medium text-white/50 hover:text-[#ff0099] transition-colors cursor-pointer">
                Apple Music
              </a>
              <a className="font-label text-[0.75rem] uppercase tracking-[0.1em] font-medium text-white/50 hover:text-[#ff0099] transition-colors cursor-pointer">
                YouTube
              </a>
            </div>
          </div>

          {/* Booking CTA */}
          <div className="flex flex-col gap-4 md:items-end">
            <p className="text-white/50 text-sm max-w-xs md:text-right leading-relaxed">
              Ready to create something? Beats, licensing, placements, custom production — let&apos;s talk.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-primary text-on-primary px-8 py-4 font-black uppercase tracking-widest hover:bg-primary-dim transition-colors cursor-pointer font-label w-fit"
            >
              Book Numonics
            </button>
          </div>

        </div>
      </footer>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
