"use client";

import { useState } from "react";

const ARTISTS: { name: string; img: string; objectPosition?: string }[] = [
  { name: "Arrested Development", img: "/carousel/Arrested-Development-Interview-Header.webp" },
  { name: "Black Rob",            img: "/carousel/black%20rob.webp" },
  { name: "Blu",                  img: "/carousel/blurapper.jpg", objectPosition: "75% center" },
  { name: "Freeway",              img: "/carousel/freeway.jpg" },
  { name: "Freddie Gibbs",        img: "/carousel/freddie%20gibbs.webp" },
  { name: "Mo3",                  img: "/carousel/mo3.webp" },
  { name: "Marlon Craft",         img: "/carousel/marloncraft-web.png" },
  { name: "¡Mayday!",             img: "/carousel/mayday.jpeg", objectPosition: "center 20%" },
  { name: "REKS",                 img: "/carousel/reks.jpg", objectPosition: "70% center" },
  { name: "Ronny J",              img: "/carousel/ronny-j-2018-cr-sam-silver-billboard-1548.webp" },
  { name: "Sly5thAve",           img: "/carousel/sly5thave.jpeg" },
];

export default function ArtistCarousel() {
  // Mo3 is at index 6 (after the swap); Marlon Craft is index 7 (one to the right)
  const mo3Index = ARTISTS.findIndex((a) => a.name === "Mo3");
  const [current, setCurrent] = useState(mo3Index);

  const move = (dir: number) => {
    setCurrent((c) => Math.max(0, Math.min(ARTISTS.length - 1, c + dir)));
  };

  return (
    <section id="collabs" className="relative py-24 bg-surface overflow-hidden brutalist-grid">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-b from-transparent via-surface to-surface" />

      {/* Header */}
      <div className="relative z-10 text-center mb-16 px-6">
        <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[#ff0099] mb-4 font-label">
          Collaborators
        </span>
        <h2 className="text-[clamp(2rem,6vw,5rem)] font-black uppercase tracking-tighter leading-none text-white font-headline">
          Artists I&apos;ve{" "}
          <span className="text-[#ff0099]">Worked With</span>
        </h2>
      </div>

      {/* Mobile: horizontal scroll grid */}
      <div className="md:hidden px-6 overflow-x-auto pb-4">
        <div className="flex gap-4 w-max">
          {ARTISTS.map((artist, i) => (
            <div
              key={artist.name}
              onClick={() => setCurrent(i)}
              className="relative overflow-hidden cursor-pointer shrink-0"
              style={{ width: 180, height: 230 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={artist.img}
                alt={artist.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={artist.objectPosition ? { objectPosition: artist.objectPosition } : undefined}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              {i === current && <div className="absolute inset-0 border-2 border-[#ff0099] pointer-events-none" />}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-sm font-black uppercase tracking-tight text-white leading-none">{artist.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: coverflow track */}
      <div
        className="relative hidden md:flex items-center justify-center"
        style={{ height: 420, perspective: "1200px" }}
      >
        <div
          className="relative flex items-center justify-center w-full"
          style={{ transformStyle: "preserve-3d", height: 420 }}
        >
          {ARTISTS.map((artist, i) => {
            const offset = i - current;
            const absOff = Math.abs(offset);
            const tx = offset * 230;
            const ry = offset < 0 ? 42 : offset > 0 ? -42 : 0;
            const scale = absOff === 0 ? 1 : 0.78;
            const zIndex = absOff === 0 ? 20 : 20 - absOff;
            const opacity = absOff > 3 ? 0 : 1 - absOff * 0.18;
            const brightness = absOff === 0 ? 1 : 0.5;

            return (
              <div
                key={artist.name}
                onClick={() => setCurrent(i)}
                className="absolute cursor-pointer overflow-hidden flex flex-col justify-end"
                style={{
                  width: 280, height: 360, borderRadius: 0,
                  transform: `translateX(${tx}px) rotateY(${ry}deg) scale(${scale})`,
                  zIndex, opacity,
                  filter: `brightness(${brightness})`,
                  transition: "all 0.55s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artist.img}
                  alt={artist.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={artist.objectPosition ? { objectPosition: artist.objectPosition } : undefined}
                />
                <div className="relative z-10 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ff0099] mb-1 font-label">
                    Artist
                  </p>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white font-headline leading-none">
                    {artist.name}
                  </h3>
                </div>
                {absOff === 0 && (
                  <div className="absolute inset-0 pointer-events-none border-2 border-[#ff0099]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation (desktop only) */}
      <div className="relative z-10 hidden md:flex justify-center gap-4 mt-10">
        <button
          onClick={() => move(-1)}
          disabled={current === 0}
          aria-label="Previous artist"
          className="w-12 h-12 border border-outline-variant text-white font-bold text-xl hover:border-primary hover:text-primary transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
        >
          ←
        </button>
        <div className="flex items-center gap-2">
          {ARTISTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to artist ${i + 1}`}
              className="transition-all duration-300 cursor-pointer"
              style={{ width: i === current ? 24 : 6, height: 6, background: i === current ? "#ff0099" : "#333" }}
            />
          ))}
        </div>
        <button
          onClick={() => move(1)}
          disabled={current === ARTISTS.length - 1}
          aria-label="Next artist"
          className="w-12 h-12 border border-outline-variant text-white font-bold text-xl hover:border-primary hover:text-primary transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
        >
          →
        </button>
      </div>
    </section>
  );
}
