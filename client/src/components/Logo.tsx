import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
}

export const CarFairLogo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  variant = 'light',
  className = ''
}) => {
  // Dimensions based on size
  const iconDimensions = {
    sm: { w: 32, h: 32, text: 'text-lg', tagline: 'text-[9px]' },
    md: { w: 42, h: 42, text: 'text-2xl', tagline: 'text-[10px]' },
    lg: { w: 52, h: 52, text: 'text-3xl', tagline: 'text-xs' },
    xl: { w: 64, h: 64, text: 'text-4xl', tagline: 'text-sm' }
  }[size];

  const textColor = variant === 'dark' ? 'text-white' : 'text-slate-900';
  const taglineColor = variant === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Dynamic Vector Logo Icon */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-transform hover:scale-105"
        style={{ width: iconDimensions.w, height: iconDimensions.h }}
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Outer Shield / Hexagonal Emblem */}
          <defs>
            <linearGradient id="cf_shield_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="cf_car_grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="cf_accent_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Rounded Shield Container */}
          <path
            d="M50 4 C68 4 88 12 92 30 C94 56 74 82 50 96 C26 82 6 56 8 30 C12 12 32 4 50 4 Z"
            fill="url(#cf_shield_grad)"
          />

          {/* Inner Safety Rim */}
          <path
            d="M50 8 C65 8 84 15 88 31 C90 53 71 77 50 90 C29 77 10 53 12 31 C16 15 35 8 50 8 Z"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Sleek Aerodynamic Car Silhouette */}
          <path
            d="M24 60 C24 57 26 55 29 55 L33 55 L40 43 C42 39 46 37 51 37 L65 37 C70 37 74 40 76 45 L80 55 L82 55 C85 55 87 57 87 60 L87 66 C87 68 85 70 83 70 L81 70 C80 66 76 63 71 63 C66 63 62 66 61 70 L45 70 C44 66 40 63 35 63 C30 63 26 66 25 70 L23 70 C21 70 19 68 19 66 L19 60 Z"
            fill="url(#cf_car_grad)"
          />

          {/* Car Windshield & Side Windows */}
          <path
            d="M42 45 L49 45 L49 53 L36 53 Z M53 45 L64 45 C66 45 68 46 69 48 L71 53 L53 53 Z"
            fill="#1e3a8a"
          />

          {/* Speed line accents */}
          <path
            d="M16 46 L26 46 M12 51 L23 51"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Car Wheels */}
          <circle cx="35" cy="70" r="5.5" fill="#0f172a" />
          <circle cx="35" cy="70" r="2.5" fill="#94a3b8" />
          <circle cx="71" cy="70" r="5.5" fill="#0f172a" />
          <circle cx="71" cy="70" r="2.5" fill="#94a3b8" />

          {/* Collective Fair Badge / Checkmark Jewel on Top Right */}
          <circle cx="76" cy="24" r="13" fill="url(#cf_accent_grad)" />
          <circle cx="76" cy="24" r="12" stroke="#ffffff" strokeWidth="2" fill="none" />
          <path
            d="M71 24 L75 28 L82 20"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight leading-none ${iconDimensions.text} ${textColor}`}>
          Car<span className="text-blue-600">Fair</span>
        </div>
        {showTagline && (
          <span className={`font-semibold tracking-wider uppercase mt-1 ${iconDimensions.tagline} ${taglineColor}`}>
            Group Buying Network
          </span>
        )}
      </div>
    </div>
  );
};