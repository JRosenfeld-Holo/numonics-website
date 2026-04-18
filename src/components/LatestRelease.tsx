"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";

const VIDEO_ID = "Te_UA6Zvi4c";
const THUMBNAIL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const SRC_MUTED   = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${VIDEO_ID}&enablejsapi=1&iv_load_policy=3&disablekb=1`;
const SRC_UNMUTED = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&loop=1&playlist=${VIDEO_ID}&enablejsapi=1&iv_load_policy=3&disablekb=1`;

export default function LatestRelease() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [active, setActive] = useState(false);
  const [muted, setMuted] = useState(true);
  const { isPlaying, togglePlay } = usePlayer();

  function handlePlay() {
    setActive(true);
    // Pause the media player when user initiates video playback
    if (isPlaying) togglePlay();
  }

  function handleMuteToggle() {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (muted) {
      // Swap src to unmuted version — most reliable cross-browser approach
      iframe.src = SRC_UNMUTED;
      if (isPlaying) togglePlay();
    } else {
      iframe.src = SRC_MUTED;
    }
    setMuted((m) => !m);
  }

  return (
    <section id="release" className="relative bg-surface py-16 md:py-24 px-6 md:px-12 overflow-hidden brutalist-grid">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-b from-transparent via-surface to-surface" />

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[#ff0099] mb-4 font-label">
          Latest Release
        </span>
        <h2 className="text-[clamp(2rem,6vw,5rem)] font-black uppercase tracking-tighter leading-none text-white font-headline">
          If I Loved Me
        </h2>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mt-3 font-label">
          Marlon Craft
        </p>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff0099] mt-2 font-label">
          Produced by Numonics
        </p>
      </div>

      {/* Video embed */}
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>

          {!active ? (
            /* Facade: thumbnail + play button, no iframe until user clicks */
            <button
              onClick={handlePlay}
              aria-label="Play video"
              className="absolute inset-0 w-full h-full group cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={THUMBNAIL}
                alt="If I Loved Me — Marlon Craft"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={28} fill="currentColor" className="text-on-primary ml-1" />
                </div>
              </div>
            </button>
          ) : (
            /* Live iframe — only mounted after user clicks */
            <>
              <iframe
                ref={iframeRef}
                className="absolute inset-0 w-full h-full"
                src={SRC_MUTED}
                title="Marlon Craft - If I Loved Me"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <button
                onClick={handleMuteToggle}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="absolute bottom-4 right-4 z-10 w-11 h-11 bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Album info + Spotify link */}
      <div className="relative z-10 max-w-3xl mx-auto mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-outline-variant pt-6">
        <div>
          <span className="block text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-1 font-label">Album</span>
          <p className="text-lg font-black uppercase tracking-tight text-white font-headline">
            The Internet Killed The Neighborhood
          </p>
          <p className="text-sm text-white/50 mt-0.5 font-body">Marlon Craft</p>
        </div>
        <a
          href="https://open.spotify.com/search/The%20Internet%20Killed%20The%20Neighborhood%20Marlon%20Craft"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-surface-container-high text-white px-6 py-4 font-bold uppercase tracking-widest border-2 border-transparent hover:border-primary hover:text-primary transition-all font-label shrink-0 cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 11-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.52-.973c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 01.257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 11-.543-1.793c3.563-1.08 9.484-.871 13.223 1.327a.937.937 0 01-.063 1.623z"/>
          </svg>
          Listen on Spotify
        </a>
      </div>
    </section>
  );
}
