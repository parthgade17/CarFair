import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showTagline?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
}

export const CarFairLogo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'light',
  className = ''
}) => {
  const heights = {
    sm: 'h-11 sm:h-12',
    md: 'h-16',
    lg: 'h-24',
    xl: 'h-36',
    hero: 'h-64 sm:h-80'
  }[size];

  const logoSrc = variant === 'dark' ? '/carfair-logo-white.png' : '/carfair-logo.png';

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt="CarFair — Smart Buyers Ki Smart Deal"
        className={`${heights} w-auto object-contain transition-transform hover:scale-102`}
      />
    </div>
  );
};