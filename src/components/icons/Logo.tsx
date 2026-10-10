import React from 'react';

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Gear outer */}
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" strokeDasharray="15 5" />
      {/* Inner circle */}
      <circle cx="50" cy="50" r="25" fill="currentColor" fillOpacity="0.2" />
      {/* Bike silhouette (simplified) */}
      <path 
        d="M30 65 L40 65 L45 55 L70 55 L75 65 L85 65 M50 55 L55 40 L70 40 M65 40 L70 35" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Wheels */}
      <circle cx="35" cy="65" r="7" stroke="currentColor" strokeWidth="3" />
      <circle cx="80" cy="65" r="7" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
