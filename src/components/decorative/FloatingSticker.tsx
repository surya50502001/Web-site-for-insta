"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingStickerProps {
  text: string;
  subtext?: string;
  emoji?: string;
  rotation?: number;
  bg?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
}

export const FloatingSticker: React.FC<FloatingStickerProps> = ({
  text,
  subtext,
  emoji,
  rotation = -4,
  bg = "#FFF9E6",
  textColor = "#1C1917",
  borderColor = "#E6D5AC",
  className = "",
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: rotation + 4 }}
      whileTap={{ scale: 0.96 }}
      style={{ rotate: `${rotation}deg` }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border shadow-sm select-none cursor-pointer transition-shadow hover:shadow-md ${className}`}
      style-bg={bg}
    >
      <div
        className="flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs font-medium tracking-tight"
        style={{
          backgroundColor: bg,
          color: textColor,
          borderColor: borderColor,
        }}
      >
        {emoji && <span className="text-sm">{emoji}</span>}
        <div className="flex flex-col text-left leading-tight">
          <span className="font-semibold">{text}</span>
          {subtext && <span className="text-[10px] opacity-75">{subtext}</span>}
        </div>
      </div>
    </motion.div>
  );
};

export const StampBadge: React.FC<{
  title: string;
  subtitle: string;
  color?: string;
  className?: string;
}> = ({ title, subtitle, color = "#C28E5C", className = "" }) => {
  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center p-3 rounded-full border-2 border-dashed aspect-square text-center select-none ${className}`}
      style={{ borderColor: color, color: color }}
    >
      <div className="text-[9px] font-mono tracking-widest uppercase opacity-80">
        {subtitle}
      </div>
      <div className="text-xs font-bold tracking-tight uppercase px-1">
        {title}
      </div>
      <div className="text-[8px] font-mono mt-0.5 opacity-60">
        ★ VERIFIED ★
      </div>
    </div>
  );
};

export const CartoonCamera: React.FC<{
  className?: string;
  onClick?: () => void;
}> = ({ className = "w-10 h-10", onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: 6 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`cursor-pointer inline-flex items-center justify-center ${className}`}
      title="Click to take a virtual photo!"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Camera body */}
        <rect
          x="4"
          y="14"
          width="40"
          height="28"
          rx="6"
          fill="#1C1917"
          stroke="#38332E"
          strokeWidth="2"
        />
        {/* Top prism */}
        <path
          d="M16 14L19 8H29L32 14H16Z"
          fill="#292524"
          stroke="#38332E"
          strokeWidth="1.5"
        />
        {/* Shutter button */}
        <rect x="33" y="6" width="6" height="3" rx="1.5" fill="#E87A5D" />
        {/* Lens outer */}
        <circle cx="24" cy="28" r="9" fill="#0C0A09" stroke="#78716C" strokeWidth="2" />
        {/* Lens glass */}
        <circle cx="24" cy="28" r="6" fill="#1C1917" />
        {/* Glass reflection sparkle */}
        <circle cx="22" cy="26" r="2" fill="#38BDF8" opacity="0.8" />
        {/* Red dot badge (Leica homage) */}
        <circle cx="10" cy="20" r="2" fill="#EF4444" />
      </svg>
    </motion.div>
  );
};
