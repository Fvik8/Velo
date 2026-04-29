import React from 'react';

export const VeloLogo = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 200 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="VELO Logo"
  >
    <path 
      d="M20 10L40 50L60 10" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="animate-pulse"
    />
    <text 
      x="70" 
      y="45" 
      fill="currentColor" 
      style={{ fontFamily: 'var(--font-serif)', fontSize: '40px', fontWeight: '500', letterSpacing: '0.05em' }}
    >
      VELO
    </text>
    {/* Subtle drop curve on the V */}
    <path 
      d="M25 20C28 25 22 28 20 32" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      opacity="0.6"
    />
  </svg>
);
