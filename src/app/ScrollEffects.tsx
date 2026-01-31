"use client";
import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? scrollY / max : 0;

      // ⭐ 星どんどん増光＆高速化
      document.documentElement.style.setProperty("--star-opacity", 0.5 + ratio * 0.8);
      document.documentElement.style.setProperty("--star-speed", `${10 - ratio * 7}s`);

      // 🌊 波も強くなる
      const waveOpacity = 0.15 + ratio * 0.5;
      document.documentElement.style.setProperty("--wave-opacity", waveOpacity.toString());
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
