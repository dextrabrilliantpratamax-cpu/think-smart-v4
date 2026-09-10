import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Moon,
  Sparkles,
  Star,
  Cloud,
  Check,
  Flame,
  Leaf,
  CloudRain,
  Wind,
  X,
  ChevronDown,
} from 'lucide-react';
import { useTheme, ReadingAmbiancePreset, ParticleIntensity, AnimationStyleOption } from '../../context/ThemeContext';
import confetti from 'canvas-confetti';

interface ThemeToggleProps {
  variant?: 'pill' | 'compact' | 'drawer';
  className?: string;
  showLabel?: boolean;
}

// Icon mapper for dynamic theme styles
const getStyleIcon = (iconName: AnimationStyleOption['iconName'], className: string = 'w-3.5 h-3.5') => {
  switch (iconName) {
    case 'wind':
      return <Wind className={className} />;
    case 'cloudRain':
      return <CloudRain className={className} />;
    case 'flame':
      return <Flame className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'star':
      return <Star className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

// Running text (Marquee ticker) component for long mode labels like Night Amber
const ThemeMarqueeText: React.FC<{ label: string; isMarquee?: boolean }> = ({ label, isMarquee }) => {
  if (!isMarquee) {
    return (
      <span className="text-[11px] font-bold tracking-tight block truncate text-center select-none w-full">
        {label}
      </span>
    );
  }

  return (
    <div className="w-full overflow-hidden relative select-none flex items-center justify-center">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="inline-flex items-center gap-2.5 whitespace-nowrap will-change-transform text-[11px] font-bold tracking-tight"
      >
        <span>{label}</span>
        <span className="text-[8px] text-amber-400/80">✦</span>
        <span>{label}</span>
        <span className="text-[8px] text-amber-400/80">✦</span>
      </motion.div>
    </div>
  );
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'pill',
  className = '',
  showLabel = false,
}) => {
  const {
    theme,
    toggleTheme,
    setTheme,
    ambiance,
    setAmbiance,
    particleIntensity,
    setParticleIntensity,
    getAvailableStylesForAmbiance,
  } = useTheme();

  const isDark = theme === 'dark';
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const availableStyles = getAvailableStylesForAmbiance(ambiance);

  // Close menu when clicked outside (for desktop popover & mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Trigger celestial particle burst
    try {
      confetti({
        particleCount: 22,
        spread: 55,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
        colors: isDark
          ? ['#F59E0B', '#FBBF24', '#FEF08A', '#FDE68A']
          : ['#818CF8', '#A78BFA', '#C084FC', '#E0E7FF'],
        ticks: 140,
        gravity: 1.1,
        scalar: 0.7,
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }

    toggleTheme({ x, y });
  };

  const AMBIANCE_OPTIONS: Array<{
    id: ReadingAmbiancePreset;
    label: string;
    bgPrimary: string;
    bgSurface: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentSecondary: string;
    borderColor: string;
  }> = [
    {
      id: null,
      label: 'Default',
      bgPrimary: isDark ? '#0B0F19' : '#F1F5F9',
      bgSurface: isDark ? '#0F172A' : '#FFFFFF',
      textPrimary: isDark ? '#F8FAFC' : '#0F172A',
      textSecondary: isDark ? '#94A3B8' : '#475569',
      accent: isDark ? '#6366F1' : '#4F46E5',
      accentSecondary: isDark ? '#FBBF24' : '#F59E0B',
      borderColor: isDark ? '#1E293B' : '#E2E8F0',
    },
    {
      id: 'cool_mint',
      label: 'Cool Mint',
      bgPrimary: '#08140F',
      bgSurface: 'rgba(14, 34, 25, 0.65)',
      textPrimary: '#F0FDF4',
      textSecondary: '#98C8AA',
      accent: '#10B981',
      accentSecondary: '#34D399',
      borderColor: 'rgba(52, 211, 153, 0.25)',
    },
    {
      id: 'night_amber',
      label: 'Night Amber',
      bgPrimary: '#170F08',
      bgSurface: '#211609',
      textPrimary: '#FFD79A',
      textSecondary: '#C9924F',
      accent: '#D97706',
      accentSecondary: '#F59E0B',
      borderColor: '#2E2013',
    },
  ];

  // Unified Active Mode Info for ALL states (Day, Night, Cool Mint, Night Amber)
  const getActiveModeInfo = () => {
    if (ambiance === 'cool_mint') {
      return {
        key: 'cool_mint',
        label: 'Cool Mint',
        shortLabel: 'Cool Mint',
        icon: <Leaf className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/40 shrink-0" />,
        badgeBg: 'bg-emerald-500/15 dark:bg-emerald-950/60 border-emerald-500/30',
        badgeText: 'text-emerald-700 dark:text-emerald-300',
        accentColor: '#10B981',
        themeDescription: 'Kaca kabut pinus & daun mint melayang',
      };
    }
    if (ambiance === 'night_amber') {
      return {
        key: 'night_amber',
        label: 'Night Amber',
        shortLabel: 'Night Amber',
        icon: <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/40 shrink-0" />,
        badgeBg: 'bg-amber-500/15 dark:bg-amber-950/60 border-amber-500/30',
        badgeText: 'text-amber-800 dark:text-amber-300',
        accentColor: '#F59E0B',
        themeDescription: 'Minim cahaya biru & percikan api hangat',
      };
    }
    if (isDark) {
      return {
        key: 'night',
        label: 'Night',
        shortLabel: 'Night',
        icon: <Moon className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/40 shrink-0" />,
        badgeBg: 'bg-indigo-500/15 dark:bg-indigo-950/60 border-indigo-500/30',
        badgeText: 'text-indigo-700 dark:text-indigo-300',
        accentColor: '#6366F1',
        themeDescription: 'Tema malam standar & langit berbintang',
      };
    }
    return {
      key: 'day',
      label: 'Day',
      shortLabel: 'Day',
      icon: <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/40 shrink-0" />,
      badgeBg: 'bg-amber-500/15 dark:bg-amber-950/40 border-amber-400/30',
      badgeText: 'text-amber-800 dark:text-amber-300',
      accentColor: '#F59E0B',
      themeDescription: 'Tema siang standar & mentari cerah',
    };
  };

  const activeMode = getActiveModeInfo();

  // =========================================================================
  // VARIANT: DRAWER (For Mobile Slide Drawer & Sidebar Navigation)
  // =========================================================================
  if (variant === 'drawer') {
    return (
      <div className={`p-3 bg-slate-800/90 rounded-2xl border border-slate-700/70 space-y-3 shadow-sm ${className}`}>
        {/* Header Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Tema & Suasana Layar</span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
            {isDark ? 'Mode Malam' : 'Mode Siang'}
          </span>
        </div>

        {/* Quick Segmented Mode Switcher (Day ☀️ / Night 🌙) */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-700/80">
          <button
            type="button"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setTheme('light', { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
            }}
            className={`flex items-center justify-center gap-2 py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              !isDark
                ? 'bg-amber-400 text-amber-950 shadow-md ring-1 ring-amber-300'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-950 animate-spin-slow' : ''}`} />
            <span>Day</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setTheme('dark', { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
            }}
            className={`flex items-center justify-center gap-2 py-2 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? 'bg-indigo-600 text-white shadow-md ring-1 ring-indigo-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-200" />
            <span>Night</span>
          </button>
        </div>

        {/* Ambiance Presets Grid */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-0.5">
            Suasana Baca
          </div>
          <div className="grid grid-cols-1 gap-1">
            {AMBIANCE_OPTIONS.map((opt) => {
              const isSelected = ambiance === opt.id;
              return (
                <button
                  key={opt.id ?? 'default'}
                  type="button"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setAmbiance(opt.id, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                  }}
                  className={`flex items-center justify-between py-1.5 px-2.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-indigo-950/70 border-indigo-500 ring-1 ring-indigo-400 shadow-xs text-white font-bold'
                      : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800/80 hover:border-slate-600 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: opt.accent }}
                    />
                    <span className="text-[11px] truncate">{opt.label}</span>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400 stroke-[3] shrink-0 ml-1.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animation Style Selector (Compact Bar) */}
        <div className="pt-2 border-t border-slate-700/60">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-0.5">
            Gaya Animasi
          </div>
          <div className="grid grid-cols-2 gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700/80">
            {availableStyles.map((st) => {
              const isActive = particleIntensity === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setParticleIntensity(st.id)}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {getStyleIcon(st.iconName, 'w-3 h-3')}
                  <span className="truncate">{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VARIANT: PILL (Header / Top Navbar Component - Single Unified Capsule)
  // =========================================================================
  return (
    <div ref={menuRef} className={`relative inline-flex items-center select-none ${className}`}>
      {/* Outer ambient glow on hover matching active mode accent */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.45 : 0,
          scale: isHovered ? 1.04 : 1,
        }}
        className="absolute -inset-1 rounded-2xl blur-xs pointer-events-none transition-opacity duration-300"
        style={{
          backgroundColor: activeMode.accentColor,
        }}
      />

      {/* 1 SINGLE UNIFIED STABLE BUTTON CONTAINER (RESPONSIVE COMPACT ON MOBILE, FULL EXPANDED ON DESKTOP) */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative z-10 inline-flex items-center w-[74px] sm:w-[196px] h-8.5 sm:h-9.5 px-1 sm:px-1.5 rounded-2xl border transition-colors duration-200 backdrop-blur-md shadow-2xs shrink-0 ${
          isMenuOpen
            ? 'bg-slate-900/95 border-indigo-500 ring-2 ring-indigo-500/25 text-white dark:bg-slate-900/95'
            : isDark
            ? 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600 text-slate-200'
            : 'bg-white/95 border-slate-200/90 hover:border-slate-300 text-slate-700'
        }`}
      >
        {/* Left Section: Interactive Celestial Toggle Switch */}
        <button
          type="button"
          onClick={handleToggle}
          title={
            isDark
              ? 'Beralih ke Mode Siang (Klik langsung)'
              : 'Beralih ke Mode Malam (Klik langsung)'
          }
          className="relative flex items-center justify-center cursor-pointer group focus:outline-hidden shrink-0"
        >
          <div
            className={`relative w-7 sm:w-11 h-5 sm:h-6 rounded-full p-0.5 sm:p-1 flex items-center ${
              isDark ? 'justify-end' : 'justify-start'
            } transition-colors duration-500 overflow-hidden shadow-inner shrink-0 ${
              isDark
                ? 'bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 border border-indigo-500/40'
                : 'bg-gradient-to-r from-amber-200 via-sky-200 to-sky-300 border border-amber-300/80'
            }`}
          >
            {/* Background elements in the sky */}
            {isDark ? (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-start pl-0.5 sm:pl-1.5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0.4, 0.95, 0.4], scale: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center gap-0.5 sm:gap-1 text-amber-200/90"
                >
                  <Star className="w-1.5 h-1.5 sm:w-2 sm:h-2 fill-amber-200 text-amber-200" />
                  <div className="w-0.5 h-0.5 rounded-full bg-cyan-200 opacity-70 hidden sm:block" />
                  <Star className="w-1.5 h-1.5 fill-purple-300 text-purple-300 hidden sm:block" />
                </motion.div>
              </div>
            ) : (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-0.5 sm:pr-1.5 opacity-75">
                <motion.div
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-white flex items-center"
                >
                  <Cloud className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white text-white/90 hidden sm:block" />
                </motion.div>
              </div>
            )}

            {/* Animated Thumb (Sun / Moon) with Interconnected Morph Transition */}
            <motion.div
              layout
              transition={{
                type: 'spring',
                stiffness: 600,
                damping: 32,
              }}
              className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center shadow-md relative z-10 shrink-0 ${
                isDark
                  ? 'bg-gradient-to-tr from-indigo-100 to-violet-100 text-indigo-900 border border-white/60'
                  : 'bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-300 text-amber-900 border border-yellow-200'
              }`}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0.2, rotate: -150, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.2, rotate: 150, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
                    className="flex items-center justify-center"
                  >
                    <Moon className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-indigo-800 text-indigo-800" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0.2, rotate: 150, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.2, rotate: -150, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
                    className="flex items-center justify-center"
                  >
                    <Sun className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-amber-900 animate-spin-slow" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </button>

        {/* Subtle Fixed Vertical Hairline Divider */}
        <div className="w-px h-3.5 sm:h-4.5 bg-slate-200 dark:bg-slate-700/80 mx-0.5 sm:mx-1.5 shrink-0" />

        {/* Right Section: Ambiance Selector Trigger (Compact Icon on Mobile, Full Info on Desktop) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
          }}
          title={`Suasana Aktif: ${activeMode.label} - Klik untuk kustomisasi suasana & efek`}
          className={`relative flex items-center justify-center sm:justify-between px-1 sm:px-1.5 py-0.5 rounded-xl text-xs font-bold transition-colors cursor-pointer select-none shrink-0 w-7 sm:w-[124px] h-full overflow-hidden ${
            isMenuOpen
              ? 'text-indigo-400 font-extrabold bg-indigo-500/15'
              : isDark
              ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
          }`}
        >
          {/* Pinned Left Symbol Badge with Fluid Morphing */}
          <div className="shrink-0 z-10 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode.key}
                initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={`p-1 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs ${activeMode.badgeBg}`}
              >
                {activeMode.icon}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Symmetrical Centered Mode Information with Slide-Up Kinetic Animation & Running Marquee (Desktop Only) */}
          <div className="hidden sm:flex flex-1 min-w-0 px-1 overflow-hidden items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode.key}
                initial={{ opacity: 0, y: 12, filter: 'blur(2px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(2px)' }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex items-center justify-center overflow-hidden"
              >
                <ThemeMarqueeText
                  label={activeMode.label}
                  isMarquee={activeMode.key === 'night_amber'}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pinned Right Chevron Dropdown Indicator (Desktop Only) */}
          <ChevronDown
            className={`hidden sm:block w-3 h-3 text-slate-400 transition-transform duration-200 shrink-0 z-10 ml-0.5 ${
              isMenuOpen ? 'rotate-180 text-indigo-400' : ''
            }`}
          />
        </button>
      </div>

      {/* Floating Theme & Atmosphere Menu (Popover on Desktop, Sheet underneath Header on Mobile) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Mobile Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 sm:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="liquid-glass-chrome fixed sm:absolute top-[4.25rem] sm:top-full left-3 right-3 sm:left-auto sm:right-0 sm:mt-2 w-auto sm:w-80 max-w-sm sm:max-w-none mx-auto sm:mx-0 p-3.5 sm:p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-50 text-slate-800 dark:text-slate-100 max-h-[calc(100vh-5.5rem)] overflow-y-auto"
            >
              {/* Mobile Drag Handle Indicator */}
              <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-2.5 sm:hidden" />

              {/* Minimalist Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-6.5 h-6.5 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                      Suasana Baca & Tema
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Kenyamanan visual membaca materi
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Tutup"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Segmented Mode Switcher (Day ☀️ / Night 🌙) */}
              <div className="grid grid-cols-2 gap-1.5 p-1 mb-3 bg-slate-100 dark:bg-slate-800/70 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                <button
                  type="button"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTheme('light', { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                  }}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !isDark
                      ? 'bg-amber-400 text-amber-950 shadow-xs ring-1 ring-amber-300'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-950 animate-spin-slow' : ''}`} />
                  <span>Mode Siang</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTheme('dark', { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                  }}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isDark
                      ? 'bg-indigo-600 text-white shadow-xs ring-1 ring-indigo-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-200" />
                  <span>Mode Malam</span>
                </button>
              </div>

              {/* Ambiance Presets (Compact, Direct) */}
              <div className="space-y-1.5 mb-3">
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider px-0.5">
                  Pilihan Suasana Baca
                </div>
                {AMBIANCE_OPTIONS.map((opt) => {
                  const isSelected = ambiance === opt.id;
                  return (
                    <button
                      key={opt.id ?? 'default'}
                      type="button"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = rect.left + rect.width / 2;
                        const y = rect.top + rect.height / 2;
                        setAmbiance(opt.id, { x, y });
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden backdrop-blur-md ${
                        isSelected
                          ? 'bg-indigo-50/90 dark:bg-indigo-950/70 border-indigo-400 dark:border-indigo-500/80 ring-1 ring-indigo-500/25 shadow-2xs font-bold text-indigo-950 dark:text-white'
                          : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800/70 font-semibold text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Compact Visual Swatch */}
                        <div
                          className="w-6 h-6 rounded-lg border flex items-center justify-center gap-0.5 shrink-0 shadow-2xs relative overflow-hidden"
                          style={{
                            backgroundColor: opt.bgPrimary,
                            borderColor: opt.borderColor,
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full shadow-2xs"
                            style={{ backgroundColor: opt.accent }}
                          />
                          <div
                            className="w-1.5 h-1.5 rounded-full opacity-80"
                            style={{ backgroundColor: opt.accentSecondary }}
                          />
                        </div>

                        <div>
                          <span className="text-xs truncate font-bold block">
                            {opt.label}
                          </span>
                          <span className="text-[9.5px] text-slate-500 dark:text-slate-400 block">
                            {opt.id === 'cool_mint'
                              ? 'Segar & daun mint melayang'
                              : opt.id === 'night_amber'
                              ? 'Hangat minim cahaya biru'
                              : 'Bintang & kontras seimbang'}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 ml-2">
                        {isSelected ? (
                          <div className="w-4.5 h-4.5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Particle Style Selector (Compact Bar) */}
              <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-1.5 px-0.5">
                  Gaya Animasi Partikel
                </div>

                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100/70 dark:bg-slate-800/50 rounded-xl border border-slate-200/70 dark:border-slate-700/50">
                  {availableStyles.map((st) => {
                    const isActive = particleIntensity === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setParticleIntensity(st.id)}
                        className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-white dark:bg-indigo-600 text-indigo-950 dark:text-white shadow-xs'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        {getStyleIcon(st.iconName, 'w-3.5 h-3.5 shrink-0')}
                        <span className="truncate">{st.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
