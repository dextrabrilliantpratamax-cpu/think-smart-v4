import React from 'react';

export interface TigaSerangkaiLogoProps {
  className?: string;
  variant?: 'icon' | 'full' | 'horizontal' | 'badge';
  size?: number | string;
  lightMode?: boolean;
}

export const TigaSerangkaiLogo: React.FC<TigaSerangkaiLogoProps> = ({
  className = '',
  variant = 'icon',
  size,
  lightMode = false,
}) => {
  // Official Tiga Serangkai Brand Colors
  const brandTeal = '#006769';
  const spineColor = '#004A4C';

  // Authentic 1:1 Vector Emblem matching the official Tiga Serangkai brand image exactly
  const LogoEmblem = (
    <svg
      viewBox="0 0 200 200"
      className={`aspect-square select-none ${size ? '' : 'w-full h-full'} ${className}`}
      style={size ? { width: size, height: size } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo Resmi Tiga Serangkai"
    >
      <g id="tiga-serangkai-emblem">
        {/* Outer Teal Open-Book Shield Shell */}
        <path
          d="M 24 26
             L 100 52
             L 176 26
             L 176 160
             L 100 186
             L 24 160
             Z"
          fill={brandTeal}
          stroke={brandTeal}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Center Spine Crease */}
        <line
          x1="100"
          y1="52"
          x2="100"
          y2="186"
          stroke={spineColor}
          strokeWidth="1.6"
          opacity="0.35"
        />

        {/* Left Page: Authentic Bold Letter 'T' */}
        <path
          d="M 28 30
             L 97 54
             L 97 80
             L 76 72
             L 76 174
             L 48 164
             L 48 62
             L 28 55
             Z"
          fill="#FFFFFF"
        />

        {/* Right Page: Authentic Fluid Letter 'S' / Pathway */}
        <path
          d="M 103 55
             C 126 76, 132 94, 114 122
             C 105 136, 103 158, 103 184
             C 128 175, 156 160, 168 144
             C 174 116, 146 100, 138 82
             C 130 66, 148 42, 166 28
             L 103 55
             Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );

  if (variant === 'icon') {
    return LogoEmblem;
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-teal-500/30 bg-teal-950/40 backdrop-blur-xs text-white ${className}`}>
        <div className="w-6 h-6 shrink-0 flex items-center justify-center">
          {LogoEmblem}
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span className="font-extrabold text-xs tracking-wider uppercase text-teal-200">
            Tiga Serangkai
          </span>
          <span className="text-[9px] text-teal-400 font-medium">Since 1959</span>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <div className="w-8 h-8 shrink-0 flex items-center justify-center">
          {LogoEmblem}
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span
            className="font-bold text-sm tracking-wide uppercase"
            style={{ color: lightMode ? '#0F172A' : '#FFFFFF' }}
          >
            Tiga Serangkai
          </span>
          <span className="text-[10px] text-teal-400 font-semibold tracking-wider">
            since 1959
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="w-14 h-14 mb-2 shrink-0 flex items-center justify-center">
        {LogoEmblem}
      </div>
      <div className="flex flex-col items-center">
        <span
          className="font-serif font-black tracking-widest text-base uppercase leading-tight"
          style={{ color: lightMode ? '#0F172A' : '#FFFFFF' }}
        >
          TIGA SERANGKAI
        </span>
        <span
          className="font-sans text-xs font-semibold tracking-wider mt-1 text-teal-600 dark:text-teal-400"
        >
          since 1959
        </span>
      </div>
    </div>
  );
};





