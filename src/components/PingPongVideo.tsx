"use client";

import { useEffect, useRef } from "react";

interface Props {
  src: string;
  className?: string;
}

export default function PingPongVideo({ src, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dirRef = useRef<1 | -1>(1);   // 1 = forward, -1 = reverse
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const FPS = 30;
  const FRAME = 1 / FPS;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function tick(now: number) {
      if (!video) return;
      const elapsed = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (dirRef.current === -1) {
        // Reverse: manually step currentTime backwards
        video.currentTime = Math.max(0, video.currentTime - elapsed);
        if (video.currentTime <= 0.05) {
          dirRef.current = 1;
          video.play();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    function handleEnded() {
      dirRef.current = -1;
      lastTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }

    video.addEventListener("ended", handleEnded);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener("ended", handleEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      autoPlay
      muted
      playsInline
    />
  );
}
