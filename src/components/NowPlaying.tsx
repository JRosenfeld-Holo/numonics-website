"use client";

import { usePlayer } from "@/context/PlayerContext";
import { useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, X } from "lucide-react";

function formatTime(s: number) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function NowPlaying() {
  const { currentTrack, isPlaying, progress, currentTime, duration, togglePlay, seek, playNext, playPrev } = usePlayer();
  const [dismissed, setDismissed] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  if (!currentTrack || dismissed) return null;

  function handleBarClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    seek((e.clientX - rect.left) / rect.width);
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[min(560px,calc(100vw-3rem))]">
      <div className="bg-surface-container-highest/80 backdrop-blur-[30px] border border-outline-variant border-l-4 border-l-primary shadow-2xl px-6 py-4">

        {/* Track info + dismiss */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-primary font-bold">
              Now Playing
            </span>
            <h4 className="text-base font-black uppercase tracking-tight leading-tight">
              {currentTrack.title}
            </h4>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-on-surface-variant tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Close player"
              className="text-white/30 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div
          ref={barRef}
          onClick={handleBarClick}
          aria-label="Seek"
          className="w-full h-1 bg-outline-variant cursor-pointer mb-4 group"
        >
          <div
            className="h-full bg-primary transition-none relative"
            style={{ width: `${progress * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={playPrev}
            aria-label="Previous track"
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <SkipBack size={22} fill="currentColor" />
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-11 h-11 bg-primary flex items-center justify-center hover:bg-primary-dim transition-colors cursor-pointer"
          >
            {isPlaying
              ? <Pause size={20} fill="currentColor" className="text-on-primary" />
              : <Play size={20} fill="currentColor" className="text-on-primary ml-0.5" />}
          </button>

          <button
            onClick={playNext}
            aria-label="Next track"
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <SkipForward size={22} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}
