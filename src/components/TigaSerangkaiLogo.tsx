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
  // Official Think Smart brand emblem — the authentic logo asset
  const LogoEmblem = (
    <img
      src="/think_smart_logo.png"
      alt="Logo Think Smart"
      className={`aspect-square select-none object-contain ${size ? '' : 'w-full h-full'} ${className}`}
      style={size ? { width: size, height: size } : undefined}
      draggable={false}
    />
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





