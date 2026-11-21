import React, { useEffect, useState, useRef } from "react";

/**
 * Butterflow-Style Non-Intrusive Precision Custom Cursor
 * Subtle pinpoint + fluid trailing ring.
 * Strictly pointer-events-none so it never intercepts clicks or obscures text.
 */
export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest("button, a, input, select, textarea, [role='button']");
        setIsPointer(Boolean(interactiveEl));
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Smooth lerp loop for the trailing ring
    const renderLoop = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Central amber pinpoint dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-amber-400 pointer-events-none select-none z-[9999] transition-opacity duration-150 shadow-sm shadow-amber-400/50"
        style={{
          opacity: 0.9,
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* Outer fluid trailing ring - minimalist and non-blocking */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none select-none z-[9998] rounded-full transition-[width,height,margin,border-color,background-color] duration-200 ease-out ${
          isPointer
            ? "-ml-5 -mt-5 w-10 h-10 border border-amber-400/70 bg-amber-400/10 scale-105"
            : "-ml-3.5 -mt-3.5 w-7 h-7 border border-white/25 bg-white/[0.02]"
        }`}
        style={{
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </>
  );
};
