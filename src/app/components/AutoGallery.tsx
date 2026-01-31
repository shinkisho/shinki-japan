"use client";
import { useState, useEffect, useRef } from "react";

export default function AutoGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState<number | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    const onKey = (e: KeyboardEvent) => {
      if (active === null) return;
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
  useEffect(() => {
    if (active === null || !scroller.current) return;

    requestAnimationFrame(() => {
      scroller.current!.scrollLeft =
        scroller.current!.clientWidth * active;
    });
  }, [active]);

  const next = () => {
    if (!scroller.current || active === null) return;
    const n = (active + 1) % images.length;
    scroller.current.scrollLeft = scroller.current.clientWidth * n;
    setActive(n);
  };

  const prev = () => {
    if (!scroller.current || active === null) return;
    const n = (active - 1 + images.length) % images.length;
    scroller.current.scrollLeft = scroller.current.clientWidth * n;
    setActive(n);
  };

  return (
    <>
      {/* STRIP */}
      <div className="overflow-hidden">
        <div className="flex gap-6 auto-scroll w-max">
          {[...images, ...images].map((img, i) => (
            <img
              key={i}
              src={`/${img}`}
              onClick={() => setActive(i % images.length)}
              className="w-[260px] h-[360px] object-cover cursor-pointer grayscale hover:grayscale-0 transition duration-700"
            />
          ))}
        </div>
      </div>

      {/* FULL */}
      {active !== null && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 text-white text-4xl"
          >
            ×
          </button>

          <button
            onClick={prev}
            className="absolute left-6 text-white text-6xl opacity-70 hover:opacity-100"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute right-6 text-white text-6xl opacity-70 hover:opacity-100"
          >
            ›
          </button>

          <div
            ref={scroller}
            className="flex overflow-hidden w-full h-full scroll-smooth"
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={`/${img}`}
                className="w-full h-full object-contain flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}
      
    </>
    
  );
  
}

