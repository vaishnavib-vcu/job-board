"use client";
import { motion } from "framer-motion";

export const MatchCircle = ({ score }: { score: number }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 shrink-0">
      <svg className="w-full h-full -rotate-90">
        <circle cx="32" cy="32" r={radius} stroke="#F1F5F9" strokeWidth="5" fill="transparent" />
        <motion.circle
          cx="32" cy="32" r={radius} stroke="#2563EB" strokeWidth="5" fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[10px] md:text-xs font-black text-blue-700">{score}%</span>
    </div>
  );
};
