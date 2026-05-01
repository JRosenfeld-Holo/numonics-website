"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const ARTISTS: { name: string; img: string; objectPosition?: string }[] = [
  { name: "Arrested Development", img: "/carousel/Arrested-Development-Interview-Header.webp" },
  { name: "Black Rob",            img: "/carousel/black%20rob.webp" },
  { name: "Blu",                  img: "/carousel/blurapper.jpg", objectPosition: "75% center" },
  { name: "Freeway",              img: "/carousel/freeway.jpg" },
  { name: "Freddie Gibbs",        img: "/carousel/freddie%20gibbs.webp" },
  { name: "Marlon Craft",         img: "/carousel/marloncraft-web.png" },
  { name: "Mo3",                  img: "/carousel/mo3.webp" },
  { name: "¡Mayday!",             img: "/carousel/mayday.jpeg", objectPosition: "center 20%" },
  { name: "REKS",                 img: "/carousel/reks.jpg", objectPosition: "70% center" },
  { name: "Ronny J",              img: "/carousel/ronny-j-2018-cr-sam-silver-billboard-1548.webp" },
  { name: "Sly5thAve",           img: "/carousel/sly5thave.jpeg" },
];

const N = ARTISTS.length;
const CENTER = Math.floor(N / 2); // slot 5 of 0–10

function rotateArr<T>(arr: T[], steps: number): T[] {
  const n = arr.length;
  const s = ((steps % n) + n) % n;
  return [...arr.slice(s), ...arr.slice(0, s)];
}

export default function ArtistCarousel() {
  // order[i] = ARTISTS index occupying slot i (left → right)
  const [order, setOrder] = useState<number[]>(() => ARTISTS.map((_, i) => i));

  const cardRefs  = useRef<Record<number, HTMLDivElement | null>>({});
  const innerRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const flipRef   = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const spinRef   = useRef<{ next: number; prev: number } | null>(null);

  const activeArtistIdx = order[CENTER];

  function go(steps: number) {
    if (steps === 0) return;
    const elements = Object.values(cardRefs.current).filter(Boolean) as HTMLElement[];
    flipRef.current = Flip.getState(elements);
    spinRef.current = { prev: order[CENTER], next: rotateArr(order, steps)[CENTER] };
    setOrder(o => rotateArr(o, steps));
  }

  // Runs after React commits DOM changes — animates from recorded "before" positions
  useLayoutEffect(() => {
    if (!flipRef.current) return;

    Flip.from(flipRef.current, {
      duration: 1.2,
      ease: "power3.inOut",
      absolute: true,
      nested: true,
    });

    if (spinRef.current) {
      const { next, prev } = spinRef.current;
      if (innerRefs.current[next])
        gsap.to(innerRefs.current[next]!, { rotation: "+=180", duration: 1.2, ease: "power3.inOut" });
      if (innerRefs.current[prev])
        gsap.to(innerRefs.current[prev]!, { rotation: "-=180", duration: 1.2, ease: "power3.inOut" });
    }

    flipRef.current = null;
    spinRef.current = null;
  }, [order]);

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

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden px-6 overflow-x-auto pb-4">
        <div className="flex gap-4 w-max">
          {ARTISTS.map((artist, i) => (
            <div
              key={artist.name}
              onClick={() => go(order.indexOf(i) - CENTER)}
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
              {activeArtistIdx === i && (
                <div className="absolute inset-0 border-2 border-[#ff0099] pointer-events-none" />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-sm font-black uppercase tracking-tight text-white leading-none">
                  {artist.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: GSAP Flip carousel */}
      <div className="hidden md:block overflow-hidden" style={{ height: "clamp(300px, 32vw, 440px)" }}>
        <div className="flex items-center justify-center h-full gap-4">
          {order.map((artistIdx, slotIdx) => {
            const artist = ARTISTS[artistIdx];
            const isActive = slotIdx === CENTER;
            const dist = Math.abs(slotIdx - CENTER);
            const opacity = dist > 4 ? 0 : 1 - dist * 0.14;

            return (
              <div
                key={artist.name}
                ref={el => { cardRefs.current[artistIdx] = el; }}
                onClick={() => go(slotIdx - CENTER)}
                className="relative flex-shrink-0"
                style={{
                  width:  isActive ? "clamp(220px, 24vw, 360px)" : "clamp(50px, 7vw, 100px)",
                  height: isActive ? "clamp(220px, 24vw, 360px)" : "clamp(50px, 7vw, 100px)",
                  cursor: isActive ? "default" : "pointer",
                  opacity,
                  zIndex: isActive ? 10 : 10 - dist,
                }}
              >
                {/* card-inner: rotation target, separate from layout */}
                <div
                  ref={el => { innerRefs.current[artistIdx] = el; }}
                  className="w-full h-full overflow-hidden"
                  style={{
                    filter: isActive
                      ? "brightness(1) grayscale(0)"
                      : "brightness(0.4) grayscale(0.5)",
                    transition: "filter 0.4s ease",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artist.img}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: artist.objectPosition ?? "center",
                      transform: "scale(1.1)",
                    }}
                  />
                </div>

                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 border-2 border-[#ff0099] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ff0099] mb-1 font-label">
                        Featured
                      </p>
                      <h3 className="text-lg font-black uppercase tracking-tight text-white font-headline leading-none">
                        {artist.name}
                      </h3>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation — desktop only */}
      <div className="relative z-10 hidden md:flex justify-center gap-4 mt-10">
        <button
          onClick={() => go(-1)}
          aria-label="Previous artist"
          className="w-12 h-12 border border-outline-variant text-white font-bold text-xl hover:border-primary hover:text-primary transition-colors cursor-pointer"
        >
          ←
        </button>
        <div className="flex items-center gap-2">
          {ARTISTS.map((a, i) => (
            <button
              key={i}
              onClick={() => go(order.indexOf(i) - CENTER)}
              aria-label={`Go to ${a.name}`}
              className="transition-all duration-300 cursor-pointer"
              style={{
                width:      activeArtistIdx === i ? 24 : 6,
                height:     6,
                background: activeArtistIdx === i ? "#ff0099" : "#333",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next artist"
          className="w-12 h-12 border border-outline-variant text-white font-bold text-xl hover:border-primary hover:text-primary transition-colors cursor-pointer"
        >
          →
        </button>
      </div>
    </section>
  );
}
