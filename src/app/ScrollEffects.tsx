"use client";
import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? scrollY / max : 0;

      // ⭐ 星どんどん増光＆高速化
      document.documentElement.style.setProperty(
        "--star-opacity",
        String(0.5 + ratio * 0.8)
      );

      document.documentElement.style.setProperty(
        "--star-speed",
        `${10 - ratio * 7}s`
      );

      // 🌊 波も強くなる
      document.documentElement.style.setProperty(
        "--wave-opacity",
        String(0.15 + ratio * 0.35)
      );
    }; // ← ここ超重要！！関数閉じる

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期実行

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}

