import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Crown,
  Zap,
  ArrowRight,
  CalendarCheck,
  Sparkles,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { getStreakTier, getNextStreakTier } from './streakTiers';
import { StreakFlameAnimation } from './StreakFlameAnimation';
import { playFeedbackSound } from '../../utils/feedbackSound';
import { formatIndonesianDate, getCurrentWeekStreakDays } from '../../utils/streakManager';
import confetti from 'canvas-confetti';

export interface TikTokStreakCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  previousStreak: number;
  newStreak: number;
  isTierUpgrade?: boolean;
  onOpenStreakGallery?: () => void;
  studentName?: string;
  startDate?: string;
  autoCloseSeconds?: number;
}

interface TwinkleStar {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  initialOpacity: number;
}

export const TikTokStreakCelebration: React.FC<TikTokStreakCelebrationProps> = ({
  isOpen,
  onClose,
  previousStreak,
  newStreak,
  isTierUpgrade = false,
  onOpenStreakGallery,
  studentName = 'Siswa Cendekia',
  startDate,
  autoCloseSeconds = 0,
}) => {
  const effectiveStreak = newStreak || 1;
  const initialStartStreak = Math.min(previousStreak, Math.max(0, effectiveStreak - 1));

  const [displayedStreak, setDisplayedStreak] = useState<number>(initialStartStreak);
  const [hasLanded, setHasLanded] = useState<boolean>(false);

  const tier = getStreakTier(effectiveStreak);
  const prevTier = getStreakTier(previousStreak);
  const isActualTierUpgrade = isTierUpgrade || tier.id !== prevTier.id;
  const isIridescent = tier.id === 'iridescent-apex';
  const { nextTier, daysRemaining } = getNextStreakTier(effectiveStreak);

  // 7-Day calendar strip
  const weekDays = getCurrentWeekStreakDays(effectiveStreak);

  // Calculate percentage within current tier
  const currentTierMin = tier.minDays;
  const currentTierMax = tier.maxDays === Infinity ? 900 : tier.maxDays;
  const tierSpan = Math.max(1, currentTierMax - currentTierMin + 1);
  const progressRatio = Math.min(
    100,
    Math.max(12, ((effectiveStreak - currentTierMin + 1) / tierSpan) * 100)
  );

  // Generate calm twinkling starfield particles
  const stars: TwinkleStar[] = useMemo(() => {
    const starList: TwinkleStar[] = [];
    const colors = ['#ffffff', '#fef08a', '#fed7aa', '#fde047', '#cbd5e1'];
    for (let i = 0; i < 36; i++) {
      starList.push({
        id: i,
        top: Math.floor(Math.random() * 96) + 2,
        left: Math.floor(Math.random() * 96) + 2,
        size: Math.random() < 0.6 ? 1.5 : Math.random() < 0.88 ? 2.5 : 3.5,
        duration: 2.4 + Math.random() * 3.2,
        delay: Math.random() * 3,
        color: colors[i % colors.length],
        initialOpacity: 0.15 + Math.random() * 0.4,
      });
    }
    return starList;
  }, []);

  // Trigger celebration sequence only upon opening
  useEffect(() => {
    if (!isOpen) return;

    // Reset initial counter states cleanly upon opening
    const startVal = Math.min(previousStreak, Math.max(0, effectiveStreak - 1));
    setDisplayedStreak(startVal);
    setHasLanded(false);

    // 1. Play initial TikTok celebratory sound
    playFeedbackSound('tiktok_streak_celebrate');

    // 2. Launch celebratory soft confetti
    const fireConfetti = () => {
      try {
        confetti({
          particleCount: 75,
          spread: 85,
          origin: { y: 0.55, x: 0.5 },
          colors: tier.particleColors,
          ticks: 240,
          scalar: 1.05,
        });

        setTimeout(() => {
          confetti({
            particleCount: 45,
            angle: 55,
            spread: 65,
            origin: { x: 0.08, y: 0.6 },
            colors: tier.particleColors,
          });
          confetti({
            particleCount: 45,
            angle: 125,
            spread: 65,
            origin: { x: 0.92, y: 0.6 },
            colors: tier.particleColors,
          });
        }, 200);
      } catch {
        // Safe fallback
      }
    };

    fireConfetti();

    // 3. Smooth spring roll to the target streak number after brief buildup
    const rollTimer = setTimeout(() => {
      setDisplayedStreak(effectiveStreak);
      setHasLanded(true);

      if (isActualTierUpgrade) {
        playFeedbackSound('tiktok_tier_unlock');
      } else {
        playFeedbackSound('tiktok_counter_tick');
      }
    }, 420);

    return () => {
      clearTimeout(rollTimer);
    };
  }, [isOpen, effectiveStreak, previousStreak, isActualTierUpgrade, tier]);

  // Optional auto-close timer
  useEffect(() => {
    if (isOpen && autoCloseSeconds > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseSeconds * 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseSeconds, onClose]);

  const handleContinueLearning = () => {
    playFeedbackSound('click');
    onClose();
  };

  const handleOpenGallery = () => {
    playFeedbackSound('click');
    onClose();
    if (onOpenStreakGallery) {
      setTimeout(() => {
        onOpenStreakGallery();
      }, 300);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="tiktok-streak-root-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.24, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Animated Calm Atmosphere Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          >
            {/* Calm Twinkling Starfield */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {stars.map((star) => (
                <motion.div
                  key={`tt-star-${star.id}`}
                  className="absolute rounded-full"
                  style={{
                    top: `${star.top}%`,
                    left: `${star.left}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    backgroundColor: star.color,
                    boxShadow:
                      star.size > 2
                        ? `0 0 8px 1px ${star.color}99, 0 0 16px 2px ${star.color}44`
                        : `0 0 4px 1px ${star.color}66`,
                  }}
                  animate={{
                    opacity: [star.initialOpacity, 0.95, star.initialOpacity],
                    scale: [1, 1.35, 1],
                  }}
                  transition={{
                    duration: star.duration,
                    delay: star.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Soft Breathing Ambient Nebula Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{
                  scale: [0.95, 1.08, 0.95],
                  opacity: [0.25, 0.38, 0.25],
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className={`w-[450px] h-[450px] sm:w-[620px] sm:h-[620px] rounded-full blur-[130px] transition-all ${
                  isIridescent ? 'animate-iridescent-glow' : ''
                }`}
                style={{ backgroundColor: tier.primaryColor }}
              />
            </div>
          </div>

          {/* TikTok Vertical Reel Showcase Card with Smooth Exit Animation */}
          <motion.div
            key="tiktok-streak-card-content"
            initial={{ scale: 0.84, opacity: 0, y: 35 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{
              scale: 0.9,
              opacity: 0,
              y: 35,
              transition: { duration: 0.22, ease: [0.32, 0, 0.67, 0] },
            }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            className={`relative z-20 w-full max-w-sm sm:max-w-md bg-gradient-to-b from-slate-900/96 via-slate-950/98 to-slate-900/96 border text-white rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.85)] overflow-hidden my-auto backdrop-blur-2xl transition-all ${
              isIridescent ? 'animate-iridescent-border border-pink-500/60' : tier.badgeBorder
            }`}
          >
            {/* Top Clean Header - Badge Only */}
            <div className="px-5 pt-4 pb-3 flex items-center justify-center relative z-30 border-b border-white/10">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-black tracking-wider bg-black/60 border border-white/15 backdrop-blur-md shadow-xs">
                <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-rose-400 bg-clip-text text-transparent uppercase">
                  Presensi Harian Aktif
                </span>
              </div>
            </div>

            {/* Main TikTok Visual Stage */}
            <div className="p-4 sm:p-6 text-center space-y-4 relative z-20">
              {/* Spotlight Morphological Flame Avatar with Expanding Aura */}
              <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
                {/* Outer Sonic Flame Aura Rings */}
                <motion.div
                  animate={{
                    scale: hasLanded ? [1, 1.25, 1] : [1, 1.12, 1],
                    opacity: hasLanded ? [0.4, 0.85, 0.4] : [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: hasLanded ? 1.6 : 2.2,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 rounded-full blur-xl"
                  style={{ backgroundColor: tier.primaryColor }}
                />

                {/* Central Glowing Stage Plate */}
                <motion.div
                  animate={
                    hasLanded
                      ? {
                          scale: [1, 1.06, 1],
                          rotate: [0, -2, 2, 0],
                        }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-950/85 border border-white/25 backdrop-blur-md flex items-center justify-center shadow-2xl shadow-black/80 ring-1 ring-white/10"
                >
                  <StreakFlameAnimation
                    streakDays={effectiveStreak}
                    size="hero"
                    showLabel={false}
                    interactive={true}
                    variant="standalone"
                  />
                </motion.div>

                {/* Floating Sparkle Pin */}
                <div className="absolute -top-1 -right-1 p-1.5 rounded-full bg-amber-500/30 border border-amber-400/50 text-amber-300 animate-bounce">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* Dynamic Smooth Rolling Slot Reel Counter Display */}
              <div className="space-y-1.5 pt-1">
                <div className="relative flex items-center justify-center">
                  {/* Glowing shockwave halo when the counter lands */}
                  {hasLanded && (
                    <motion.div
                      key={`shockwave-ring-${displayedStreak}`}
                      initial={{ scale: 0.6, opacity: 0.9 }}
                      animate={{ scale: 2.1, opacity: 0 }}
                      transition={{ duration: 0.65, ease: 'easeOut' }}
                      className="absolute w-24 h-24 rounded-full border-2 border-amber-400/80 pointer-events-none"
                    />
                  )}

                  {/* Flame Icon */}
                  <motion.span
                    animate={hasLanded ? { scale: [1, 1.3, 1], rotate: [0, -10, 8, 0] } : { scale: 1 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="text-4xl sm:text-5xl mr-2 select-none drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  >
                    🔥
                  </motion.span>

                  {/* Vertical Rolling Slot Reel Track */}
                  <div className="relative h-14 sm:h-16 overflow-hidden flex items-center justify-center min-w-[3rem] sm:min-w-[4rem]">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={`reel-num-${displayedStreak}`}
                        initial={{ y: 45, opacity: 0, scale: 0.8, filter: 'blur(3px)' }}
                        animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ y: -45, opacity: 0, scale: 0.8, filter: 'blur(3px)' }}
                        transition={{
                          y: { type: 'spring', damping: 15, stiffness: 280, mass: 0.75 },
                          opacity: { duration: 0.2 },
                          scale: { type: 'spring', damping: 15, stiffness: 280 },
                          filter: { duration: 0.16 },
                        }}
                        className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.65)] tabular-nums select-none"
                      >
                        {displayedStreak}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* "Hari!" Suffix */}
                  <motion.span
                    animate={hasLanded ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-300 via-orange-300 to-rose-400 bg-clip-text text-transparent uppercase ml-2 select-none"
                  >
                    Hari!
                  </motion.span>
                </div>

                {/* Micro Pill Badge with Spring Entrance upon Landing */}
                <div className="h-6 flex items-center justify-center">
                  <AnimatePresence>
                    {hasLanded && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, y: 6 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', damping: 14, stiffness: 360, delay: 0.08 }}
                        className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 border border-amber-400/40 shadow-xs"
                      >
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span className="text-[10px] font-black tracking-wider text-amber-200 uppercase">
                          {displayedStreak > previousStreak
                            ? `+${displayedStreak - previousStreak} Hari Presensi Tercatat!`
                            : '🔥 Presensi Harian Terjaga!'}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* 7-Day Weekly Attendance Tracker Strip */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 px-1">
                  <span className="flex items-center gap-1.5">
                    <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Presensi Minggu Ini</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black">
                    +50 XP Harian
                  </span>
                </div>

                {/* 7 Days Strip */}
                <div className="grid grid-cols-7 gap-1">
                  {weekDays.map((w, idx) => (
                    <div
                      key={`tt-day-${w.dayShort}-${w.dateNumber}-${idx}`}
                      className={`p-1.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                        w.isToday
                          ? 'bg-gradient-to-b from-amber-500/30 to-orange-500/30 border border-amber-400 ring-2 ring-amber-400/50 shadow-md scale-105'
                          : w.isClaimed
                          ? 'bg-white/10 border border-white/15'
                          : 'bg-white/5 border border-white/5 opacity-50'
                      }`}
                    >
                      <span className="text-[9px] font-bold uppercase text-slate-400">
                        {w.dayShort}
                      </span>
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center">
                        {w.isToday ? (
                          <motion.span
                            animate={hasLanded ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                            className="text-xs select-none"
                          >
                            🔥
                          </motion.span>
                        ) : w.isClaimed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <span className="text-[10px] font-bold text-slate-500">{w.dateNumber}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TikTok Tier Achievement Banner */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-white/10 via-white/15 to-white/10 border border-white/20 backdrop-blur-md space-y-2 shadow-inner"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-white shadow-2xs"
                      style={{ backgroundColor: tier.accentHex }}
                    >
                      Rank {tier.rankRoman}
                    </span>
                    <span className="font-extrabold text-sm sm:text-base text-white">
                      {tier.name}
                    </span>
                  </div>

                  <span className="text-xs font-black text-amber-300">
                    {tier.energyMultiplier}
                  </span>
                </div>

                {tier.archetype && (
                  <div className="text-[11px] font-extrabold text-amber-200/90 tracking-wide text-left flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>{tier.archetype}</span>
                  </div>
                )}

                <div className="text-[11px] font-medium text-slate-300 text-left flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{tier.buffDescription}</span>
                </div>

                {/* Progress bar towards next tier */}
                <div className="pt-1 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-300">
                    <span>Progres Evolusi</span>
                    <span>
                      {nextTier
                        ? `${daysRemaining} hari lagi ke ${nextTier.name}`
                        : '🌟 Peringkat Apex Zenith!'}
                    </span>
                  </div>
                  <div className="w-full bg-black/60 rounded-full h-2 p-0.5 border border-white/20 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: `${Math.max(5, progressRatio - 8)}%` }}
                      animate={{ width: `${progressRatio}%` }}
                      transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
                      style={{
                        backgroundColor: tier.accentHex,
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Motivational Slogan & Student Personalization */}
              <div className="space-y-1 text-xs text-slate-300">
                <p className="font-medium text-slate-200">
                  Luar biasa, <b className="text-amber-300 font-bold">{studentName}</b>! Pertahankan api belajarmu hari ini.
                </p>
                {startDate && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-400">
                    <CalendarCheck className="w-3 h-3 text-emerald-400" />
                    <span>Mulai aktif: {formatIndonesianDate(startDate)}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleContinueLearning}
                  className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-slate-950 font-black text-sm tracking-wide transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95 group"
                >
                  <span>Lanjutkan Belajar 🚀</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {onOpenStreakGallery && (
                  <button
                    type="button"
                    onClick={handleOpenGallery}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-300" />
                    <span>Buka Galeri 8-Tier Api</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
