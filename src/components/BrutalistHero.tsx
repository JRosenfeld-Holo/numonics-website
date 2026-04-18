"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 2200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
        else setCount(target);
      };
      requestAnimationFrame(tick);
    };

    // Only fires once element enters viewport — works whether user scrolls to
    // it or it's already visible after a page interaction.
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) run(); },
      { threshold: 0.4, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

export default function BrutalistHero() {
  const { count, ref: counterRef } = useCountUp(2000000);
  return (
    <section className="relative flex flex-col md:flex-row items-stretch overflow-hidden brutalist-grid bg-surface">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-tr from-surface to-transparent"></div>

      {/* Text content */}
      <div className="relative z-10 w-full md:w-1/2 px-6 py-12 md:p-12 flex flex-col justify-center items-start gap-4 min-h-[420px] md:min-h-[700px]">
        <p className="hidden md:block text-xs font-bold uppercase tracking-[0.3em] text-white/50 font-label">
          <span className="block md:inline">South Florida Made</span>
          <span className="hidden md:inline">&nbsp;·&nbsp;</span>
          <span className="block md:inline">Dallas, Texas Paid</span>
        </p>
        <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter text-[#ff0099] uppercase font-headline">
          Numonics
        </h1>
        <p className="text-lg md:text-xl max-w-md font-medium tracking-tight text-white/50 font-body">
          Producer. Composer. Creator.
        </p>
        <div className="flex flex-wrap gap-3 mt-6 md:mt-8">
          <a
            href="https://www.instagram.com/numonics/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-primary text-on-primary px-6 md:px-8 py-4 md:py-5 font-bold uppercase tracking-widest hover:bg-primary-dim transition-colors cursor-pointer font-label text-sm md:text-base"
          >
            {/* Instagram icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            Instagram
          </a>
          <a
            href="https://open.spotify.com/search/Numonics"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-surface-container-high text-white px-6 md:px-8 py-4 md:py-5 font-bold uppercase tracking-widest border-2 border-transparent hover:border-primary hover:text-primary transition-all cursor-pointer font-label text-sm md:text-base"
          >
            {/* Spotify icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 11-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.52-.973c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 01.257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 11-.543-1.793c3.563-1.08 9.484-.871 13.223 1.327a.937.937 0 01-.063 1.623z"/>
            </svg>
            Spotify
          </a>
        </div>
      </div>

      {/* Image/video section */}
      <div className="relative w-full md:w-1/2 order-first md:order-last overflow-hidden">
        <div className="relative w-full h-[300px] md:h-0 md:pb-[115%]">

          {/* Background video — ping-pong loop (forward + reversed, seamless) */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/boombox-pingpong.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Edge blur mask — fades all 4 edges into the page background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(to right,  var(--color-surface) 0%, transparent 30%, transparent 70%, var(--color-surface) 100%),
                linear-gradient(to bottom, var(--color-surface) 0%, transparent 20%, transparent 80%, var(--color-surface) 100%)
              `,
              mixBlendMode: "normal",
            }}
          />

          {/* PNG composited on top */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/carousel/numonics-2.png"
            alt="Numonics"
            className="absolute inset-0 w-full h-full object-contain object-center"
            style={{ zIndex: 2 }}
          />
        </div>

        {/* Records Sold counter */}
        <div ref={counterRef} className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-primary text-on-primary p-4 md:p-8 w-[160px] md:w-[280px]" style={{ zIndex: 3 }}>
          <span className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 font-label">
            Records Sold
          </span>
          <h2 className="text-2xl md:text-5xl font-black tracking-tighter font-headline tabular-nums">
            {count.toLocaleString()}+
          </h2>
        </div>
      </div>
    </section>
  );
}
