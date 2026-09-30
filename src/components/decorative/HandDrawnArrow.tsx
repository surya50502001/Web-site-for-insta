import React from "react";

interface HandDrawnArrowProps {
  className?: string;
  variant?: "curved-down" | "loop-right" | "pointer-left" | "scribble-swirl";
  color?: string;
}

export const HandDrawnArrow: React.FC<HandDrawnArrowProps> = ({
  className = "w-12 h-12",
  variant = "curved-down",
  color = "currentColor",
}) => {
  if (variant === "loop-right") {
    return (
      <svg
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M10 45C25 15 50 10 65 25C75 35 70 50 55 48C40 46 35 30 50 20C65 10 85 20 92 35"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1 1"
        />
        <path
          d="M84 25L92 35L78 40"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "pointer-left") {
    return (
      <svg
        viewBox="0 0 80 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M72 15C55 22 35 18 18 32"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 24L18 32L28 39"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Default: curved-down
  return (
    <svg
      viewBox="0 0 70 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 10C28 18 48 35 45 60"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 52L45 61L54 48"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ScribbleUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = "w-full h-3",
  color = "#E87A5D",
}) => {
  return (
    <svg
      viewBox="0 0 240 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M3 11C45 4 100 13 145 7C175 3 210 12 237 9"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ScribbleCircle: React.FC<{ className?: string; color?: string }> = ({
  className = "w-24 h-12",
  color = "#D4A373",
}) => {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 32C12 15 40 8 75 10C105 12 115 25 110 40C102 55 60 56 30 52C15 50 8 38 18 25C26 15 55 12 90 18"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 0.5"
      />
    </svg>
  );
};
