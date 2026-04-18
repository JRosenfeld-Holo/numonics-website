"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 8;
const FRAME_NAMES = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(3, "0");
  return `/hero-frames-new/Fractal_mandala_rotating_202604181300_${num}.png`;
});

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blackOverlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const lenisTickerCb = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(lenisTickerCb);
    gsap.ticker.lagSmoothing(0);

    const frames: HTMLImageElement[] = FRAME_NAMES.map((src) => {
      const img = new window.Image();
      img.src = src;
      return img;
    });
    framesRef.current = frames;

    // Draw with cross-fade interpolation between adjacent frames
    function drawProgress(rawProgress: number) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;

      // Map progress to float frame index
      const frameFloat = rawProgress * (TOTAL_FRAMES - 1);
      const frameA = Math.floor(frameFloat);
      const frameB = Math.min(frameA + 1, TOTAL_FRAMES - 1);
      const blend = frameFloat - frameA;

      const imgA = frames[frameA];
      const imgB = frames[frameB];
      if (!imgA?.complete || imgA.naturalWidth === 0) return;

      function drawImg(img: HTMLImageElement, alpha: number) {
        if (!img?.complete || img.naturalWidth === 0) return;
        const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        ctx!.globalAlpha = alpha;
        ctx!.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      }

      ctx.clearRect(0, 0, cw, ch);
      drawImg(imgA, 1 - blend);
      if (blend > 0) drawImg(imgB, blend);
      ctx.globalAlpha = 1;
    }

    function resizeCanvas() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawProgress(progressRef.current);
    }

    frames[0].onload = () => resizeCanvas();
    if (frames[0].complete) resizeCanvas();

    let scrollTriggerInstance: globalThis.ScrollTrigger;

    function setupScrollTrigger() {
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      if (!sectionRef.current) return;

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        pin: true,
        pinSpacing: true,
        scrub: 2,
        onUpdate: (self) => {
          const p = self.progress;

          // --- Frames: 0% → 75% scroll ---
          const frameProgress = easeInOutCubic(Math.min(p / 0.75, 1));
          progressRef.current = frameProgress;
          drawProgress(frameProgress);

          // --- Black fade: 60% → 82% scroll ---
          const blackOpacity =
            p >= 0.6 ? Math.min((p - 0.6) / 0.22, 1) : 0;
          gsap.set(blackOverlayRef.current, { opacity: blackOpacity });

          // --- Logo: fade in 80% → 92%, scale 0.65 → 1.1 ---
          if (p >= 0.8) {
            const t = Math.min((p - 0.8) / 0.2, 1);
            const eased = easeInOutCubic(t);
            const logoOpacity = eased;
            const logoScale = 0.65 + eased * 0.55;
            gsap.set(logoRef.current, { opacity: logoOpacity });
            gsap.set(logoImgRef.current, { scale: logoScale });
          } else {
            gsap.set(logoRef.current, { opacity: 0 });
            gsap.set(logoImgRef.current, { scale: 0.65 });
          }
        },
      });
    }

    setTimeout(() => setupScrollTrigger(), 100);

    const handleResize = () => {
      resizeCanvas();
      ScrollTrigger.refresh();
      setupScrollTrigger();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gsap.ticker.remove(lenisTickerCb);
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative w-screen h-screen overflow-hidden bg-black"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Black fade overlay */}
      <div
        ref={blackOverlayRef}
        className="absolute inset-0 bg-black pointer-events-none z-10"
        style={{ opacity: 0 }}
      />

      {/* Logo reveal */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={logoImgRef}
            src="/logo.png"
            alt="Numonics"
            className="w-[320px] md:w-[520px] object-contain drop-shadow-[0_0_60px_rgba(255,0,153,0.9)]"
            style={{ transform: "scale(0.65)", transformOrigin: "center" }}
          />
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-white/50">
            Architect of Sound
          </p>
        </div>
      </div>
    </section>
  );
}
