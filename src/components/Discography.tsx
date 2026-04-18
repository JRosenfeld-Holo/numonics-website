"use client";

import { TRACKS, usePlayer } from "@/context/PlayerContext";
import { Play, Pause } from "lucide-react";

function formatTime(s: number) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function Discography() {
  const { currentTrack, isPlaying, play, currentTime, duration } = usePlayer();

  return (
    <section id="beats" className="bg-surface-container-low py-16 md:py-32 px-6 md:px-12 relative brutalist-grid">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-4 md:gap-8">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-stroke-primary">
          Nu Beats
        </h2>
        <span className="text-on-surface-variant font-medium tracking-widest text-sm uppercase">
          [ {TRACKS.length.toString().padStart(2, "0")} TOTAL RELEASES ]
        </span>
      </div>

      <div className="space-y-4">
        {TRACKS.map((track, i) => {
          const isActive = currentTrack?.id === track.id;
          const isThisPlaying = isActive && isPlaying;

          return (
            <div
              key={track.id}
              onClick={() => play(track)}
              className={`group flex flex-col md:flex-row items-center justify-between py-6 px-5 md:py-10 md:px-8 border-b border-outline-variant transition-colors duration-300 cursor-pointer ${
                isActive ? "bg-primary" : "bg-surface hover:bg-primary"
              }`}
            >
              {/* Left: index + title */}
              <div className="flex items-center gap-12 w-full md:w-auto">
                <span
                  className={`text-2xl font-bold transition-colors ${
                    isActive ? "text-on-primary" : "text-on-surface-variant group-hover:text-on-primary"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`text-3xl md:text-6xl font-black uppercase tracking-tighter transition-colors ${
                    isActive ? "text-on-primary" : "group-hover:text-on-primary"
                  }`}
                >
                  {track.title}
                </h3>
              </div>

              {/* Right: time / play icon */}
              <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto mt-3 md:mt-0 justify-between md:justify-end">
                {isActive && (
                  <span
                    className={`text-sm font-bold tracking-widest tabular-nums ${
                      isActive ? "text-on-primary" : "text-on-surface-variant group-hover:text-on-primary"
                    }`}
                  >
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                )}
                <span className={`transition-colors ${isActive ? "text-on-primary" : "text-on-surface-variant group-hover:text-on-primary"}`}>
                  {isThisPlaying
                    ? <Pause size={36} fill="currentColor" />
                    : <Play size={36} fill="currentColor" />}
                </span>
              </div>

              {/* Progress bar (active track only) */}
              {isActive && (
                <div className="w-full h-[2px] bg-on-primary/20 mt-4 md:hidden">
                  <div
                    className="h-full bg-on-primary transition-all duration-300"
                    style={{ width: `${((currentTime / duration) || 0) * 100}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
