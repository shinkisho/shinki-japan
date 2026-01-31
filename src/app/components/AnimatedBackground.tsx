"use client";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">

      {/* ⭐ 巨大きらめき星レイヤー */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.9), transparent)," +
            "radial-gradient(3px 3px at 70% 60%, rgba(255,255,255,0.8), transparent)," +
            "radial-gradient(2px 2px at 40% 80%, rgba(255,255,255,0.85), transparent)",
          backgroundSize: "400px 400px",
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🌊 Dynamic Wave Light */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, rgba(120,160,255,0.35), transparent 60%)," +
            "radial-gradient(ellipse at 80% 130%, rgba(180,140,255,0.25), transparent 65%)," +
            "radial-gradient(ellipse at 20% 125%, rgba(140,180,255,0.3), transparent 60%)",
          mixBlendMode: "screen",
        }}
        animate={{
          y: [0, -40, 20],
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.65, 0.4],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🌑 Heroトーンの霧（薄く！） */}
      <div className="absolute inset-0 bg-[#141414]/35" />
    </div>
  );
}
