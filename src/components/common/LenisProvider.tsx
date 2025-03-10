"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        duration: 0.6,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        syncTouch: false, // ✅ Ensures fixed elements remain fixed
      });

      const update = (time: number) => {
        lenisRef.current?.raf(time);
        requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    }

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
