import React, { useState, useRef, useEffect } from 'react';
import { CrosswordLevel } from '../../data/crosswordLevels';
import {
  Trophy,
  Lock,
  Sparkles,
  CheckCircle2,
  Star,
  Play,
  ChevronRight,
  ChevronLeft,
  Layers,
  LayoutGrid,
  Zap,
  Award,
  Gamepad2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playFeedbackSound } from '../../utils/feedbackSound';

interface LevelSelectorProps {
  levels: CrosswordLevel[];
  unlockedLevel: number;
  bestScores: Record<number, number>;
  onSelectLevel: (levelNumber: number) => void;
  soundEnabled: boolean;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  levels,
  unlockedLevel,
  bestScores,
  onSelectLevel,
  soundEnabled,
}) => {
  // Start active on user's current progress level
  const defaultIndex = Math.max(0, Math.min(unlockedLevel - 1, levels.length - 1));
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
  const [viewMode, setViewMode] = useState<'slide' | 'grid'>('slide');
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const carouselContainerRef = useRef<HTMLDivElement | null>(null);

  const totalMaxPoints = levels.reduce((sum, l) => sum + l.totalPoints, 0);
  const totalEarnedPoints = (Object.values(bestScores) as number[]).reduce(
    (sum: number, score: number) => sum + (score || 0),
    0
  );
  const totalMasteryPercent =
    totalMaxPoints > 0 ? Math.min(100, Math.round((totalEarnedPoints / totalMaxPoints) * 100)) : 0;

  const getCefrTheme = (cefr: string) => {
    switch (cefr) {
      case 'A1':
        return {
          badge: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          chipActive: 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400/40',
          chipInactive: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20',
          gradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
          headerBg: 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500/30',
          borderActive: 'border-emerald-500/60 dark:border-emerald-500/60 ring-2 ring-emerald-500/30',
          glow: 'shadow-emerald-500/20',
          accentText: 'text-emerald-600 dark:text-emerald-400',
          btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30',
          title: 'Pemula',
          accentColor: '#10b981',
        };
      case 'A2':
        return {
          badge: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30',
          chipActive: 'bg-teal-600 text-white shadow-lg shadow-teal-500/30 ring-2 ring-teal-400/40',
          chipInactive: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20 hover:bg-teal-500/20',
          gradient: 'from-teal-500/15 via-teal-500/5 to-transparent',
          headerBg: 'bg-teal-500/10 dark:bg-teal-950/40 border-teal-500/30',
          borderActive: 'border-teal-500/60 dark:border-teal-500/60 ring-2 ring-teal-500/30',
          glow: 'shadow-teal-500/20',
          accentText: 'text-teal-600 dark:text-teal-400',
          btnBg: 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/30',
          title: 'Dasar',
          accentColor: '#14b8a6',
        };
      case 'B1':
        return {
          badge: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30',
          chipActive: 'bg-sky-600 text-white shadow-lg shadow-sky-500/30 ring-2 ring-sky-400/40',
          chipInactive: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20 hover:bg-sky-500/20',
          gradient: 'from-sky-500/15 via-sky-500/5 to-transparent',
          headerBg: 'bg-sky-500/10 dark:bg-sky-950/40 border-sky-500/30',
          borderActive: 'border-sky-500/60 dark:border-sky-500/60 ring-2 ring-sky-500/30',
          glow: 'shadow-sky-500/20',
          accentText: 'text-sky-600 dark:text-sky-400',
          btnBg: 'bg-sky-600 hover:bg-sky-700 text-white shadow-lg shadow-sky-600/30',
          title: 'Menengah',
          accentColor: '#0284c7',
        };
      case 'B2':
        return {
          badge: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
          chipActive: 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400/40',
          chipInactive: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20 hover:bg-indigo-500/20',
          gradient: 'from-indigo-500/15 via-indigo-500/5 to-transparent',
          headerBg: 'bg-indigo-500/10 dark:bg-indigo-950/40 border-indigo-500/30',
          borderActive: 'border-indigo-500/60 dark:border-indigo-500/60 ring-2 ring-indigo-500/30',
          glow: 'shadow-indigo-500/20',
          accentText: 'text-indigo-600 dark:text-indigo-400',
          btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30',
          title: 'Menengah Atas',
          accentColor: '#6366f1',
        };
      case 'C1':
        return {
          badge: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
          chipActive: 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 ring-2 ring-purple-400/40',
          chipInactive: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20 hover:bg-purple-500/20',
          gradient: 'from-purple-500/15 via-purple-500/5 to-transparent',
          headerBg: 'bg-purple-500/10 dark:bg-purple-950/40 border-purple-500/30',
          borderActive: 'border-purple-500/60 dark:border-purple-500/60 ring-2 ring-purple-500/30',
          glow: 'shadow-purple-500/20',
          accentText: 'text-purple-600 dark:text-purple-400',
          btnBg: 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/30',
          title: 'Mahir',
          accentColor: '#a855f7',
        };
      case 'C2':
        return {
          badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
          chipActive: 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/50',
          chipInactive: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20 hover:bg-amber-500/20',
          gradient: 'from-amber-500/15 via-amber-500/5 to-transparent',
          headerBg: 'bg-amber-500/10 dark:bg-amber-950/40 border-amber-500/30',
          borderActive: 'border-amber-500/70 dark:border-amber-500/70 ring-2 ring-amber-500/40',
          glow: 'shadow-amber-500/20',
          accentText: 'text-amber-600 dark:text-amber-400',
          btnBg: 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/30',
          title: 'Ahli Mahir',
          accentColor: '#f59e0b',
        };
      default:
        return {
          badge: 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30',
          chipActive: 'bg-slate-800 text-white',
          chipInactive: 'bg-slate-200 text-slate-700 border-slate-300',
          gradient: 'from-slate-500/10 via-slate-500/5 to-transparent',
          headerBg: 'bg-slate-100 dark:bg-slate-800 border-slate-200',
          borderActive: 'border-slate-400',
          glow: 'shadow-slate-500/10',
          accentText: 'text-slate-600 dark:text-slate-400',
          btnBg: 'bg-slate-800 text-white',
          title: 'Level',
          accentColor: '#64748b',
        };
    }
  };

  const calculateStars = (score: number, maxPoints: number) => {
    if (!score || score === 0) return 0;
    const ratio = score / maxPoints;
    if (ratio >= 0.95) return 3;
    if (ratio >= 0.7) return 2;
    if (ratio >= 0.4) return 1;
    return 0;
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      if (soundEnabled) playFeedbackSound('click');
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < levels.length - 1) {
      if (soundEnabled) playFeedbackSound('click');
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance && activeIndex < levels.length - 1) {
      // Swiped Left -> Next
      if (soundEnabled) playFeedbackSound('click');
      setActiveIndex((prev) => prev + 1);
    } else if (distance < -minSwipeDistance && activeIndex > 0) {
      // Swiped Right -> Prev
      if (soundEnabled) playFeedbackSound('click');
      setActiveIndex((prev) => prev - 1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeLevel = levels[activeIndex] || levels[0];
  const isCurrentActiveUnlocked = activeLevel.level <= unlockedLevel;
  const activeLevelBestScore = bestScores[activeLevel.level] || 0;
  const activeLevelPassingScore = Math.ceil(
    activeLevel.totalPoints * (activeLevel.passingScorePercent / 100)
  );
  const isActiveLevelPassed = activeLevelBestScore >= activeLevelPassingScore;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-8 text-white border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        {/* Ambient glow decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Standard CEFR Framework (A1 – C2)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
                <span>6 Tingkat Kesulitan Progresif</span>
              </span>
            </div>

            {/* Mode Switcher Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
              <button
                type="button"
                onClick={() => {
                  if (soundEnabled) playFeedbackSound('click');
                  setViewMode('slide');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'slide'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Mode Slide Arena</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (soundEnabled) playFeedbackSound('click');
                  setViewMode('grid');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Semua Level</span>
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>🔤 Letterally Stuck: CEFR Crossword Arena</span>
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed mt-1">
              Uji ketajaman kosakata dan kemampuan membaca definisi bahasa Inggris dari level pemula (A1) hingga mahir tinggi (C2). Selesaikan level dengan skor minimal 70% untuk membuka tantangan berikutnya!
            </p>
          </div>

          {/* Progress Bar Header */}
          <div className="p-3.5 sm:p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-2.5 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Akumulasi Penguasaan CEFR:</span>
              </span>
              <span className="text-amber-300 font-extrabold font-mono">
                {totalEarnedPoints} / {totalMaxPoints} Prestige ({totalMasteryPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-700/90 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 via-indigo-400 to-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.max(4, totalMasteryPercent)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SLIDE / CAROUSEL VIEW (Default on Mobile, and Toggleable) */}
      {/* ========================================================================= */}
      {(viewMode === 'slide' || typeof window !== 'undefined') && (
        <div className={`space-y-5 ${viewMode === 'grid' ? 'hidden md:block' : ''}`}>
          {/* CEFR Level Stepper Chips (Quick Jump Bar) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>Pilih Tingkat Kesulitan (A1 – C2):</span>
              </span>
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                Level {activeIndex + 1} / {levels.length}
              </span>
            </div>

            {/* Stepper Scroll Container */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
              {levels.map((lvl, idx) => {
                const theme = getCefrTheme(lvl.cefr);
                const isUnlocked = lvl.level <= unlockedLevel;
                const isSelected = idx === activeIndex;
                const bestScore = bestScores[lvl.level] || 0;
                const passingScore = Math.ceil(lvl.totalPoints * (lvl.passingScorePercent / 100));
                const isPassed = bestScore >= passingScore;

                return (
                  <button
                    key={lvl.level}
                    type="button"
                    onClick={() => {
                      if (soundEnabled) playFeedbackSound('click');
                      setActiveIndex(idx);
                    }}
                    className={`shrink-0 px-3 py-2 rounded-2xl text-xs font-black transition-all duration-200 flex items-center gap-2 border cursor-pointer select-none ${
                      isSelected
                        ? theme.chipActive
                        : isUnlocked
                        ? theme.chipInactive
                        : 'bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <span className="uppercase tracking-wide">{lvl.cefr}</span>
                    <span className="font-medium text-[11px] opacity-90 hidden xs:inline">
                      {theme.title}
                    </span>
                    {!isUnlocked ? (
                      <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                    ) : isPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Zap className="w-3 h-3 text-amber-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carousel Stage Container with Central Enlarged Card */}
          <div
            ref={carouselContainerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative isolate py-2 sm:py-4 px-1 sm:px-4 overflow-hidden select-none"
          >
            {/* Slide Track Container - Fixed Height for smooth transitions */}
            <div className="relative h-[480px] xs:h-[460px] sm:h-[480px] w-full flex items-center justify-center">
              {levels.map((lvl, idx) => {
                const offset = idx - activeIndex;
                const isCurrent = offset === 0;
                const isAdjacent = Math.abs(offset) === 1;
                const isUnlocked = lvl.level <= unlockedLevel;
                const bestScore = bestScores[lvl.level] || 0;
                const passingScore = Math.ceil(lvl.totalPoints * (lvl.passingScorePercent / 100));
                const isPassed = bestScore >= passingScore;
                const theme = getCefrTheme(lvl.cefr);
                const stars = calculateStars(bestScore, lvl.totalPoints);

                // Determine position based on offset
                let xPosition: string | number = 0;
                if (offset === 0) xPosition = '0%';
                else if (offset === -1) xPosition = '-78%';
                else if (offset === 1) xPosition = '78%';
                else if (offset < -1) xPosition = '-140%';
                else if (offset > 1) xPosition = '140%';

                return (
                  <motion.div
                    key={lvl.level}
                    animate={{
                      x: xPosition,
                      scale: isCurrent ? 1 : isAdjacent ? 0.86 : 0.72,
                      opacity: isCurrent ? 1 : isAdjacent ? 0.45 : 0,
                      zIndex: isCurrent ? 10 : isAdjacent ? 5 : 1,
                      pointerEvents: isCurrent || isAdjacent ? 'auto' : 'none',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 26,
                      mass: 0.7,
                    }}
                    onClick={() => {
                      if (!isCurrent) {
                        if (soundEnabled) playFeedbackSound('click');
                        setActiveIndex(idx);
                      }
                    }}
                    className={`absolute top-0 bottom-0 my-auto h-fit w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] rounded-3xl p-5 sm:p-7 bg-white dark:bg-slate-900 border flex flex-col justify-between cursor-pointer ${
                      isCurrent
                        ? `${theme.borderActive} ${theme.glow} shadow-2xl ring-2`
                        : 'border-slate-300 dark:border-slate-800 shadow-md hover:opacity-75'
                    }`}
                  >
                    {/* Decorative Top Gradient Accent */}
                    <div
                      className={`absolute inset-x-0 top-0 h-28 rounded-t-3xl bg-gradient-to-b ${theme.gradient} pointer-events-none`}
                    />

                    <div className="relative z-10 space-y-3.5">
                      {/* Top Bar: CEFR Badge & Star Rating / Lock Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-xl text-xs font-black border uppercase tracking-wider ${theme.badge}`}
                          >
                            {lvl.cefr} Level · {theme.title}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                            Grid {lvl.gridRows}×{lvl.gridCols}
                          </span>
                        </div>

                        {isUnlocked ? (
                          <div className="flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xl border border-amber-400/20">
                            {[1, 2, 3].map((starIdx) => (
                              <Star
                                key={starIdx}
                                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                                  starIdx <= stars
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-slate-300 dark:text-slate-700'
                                }`}
                              />
                            ))}
                          </div>
                        ) : (
                          <span className="flex items-center gap-1.5 text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl text-xs font-bold">
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                            <span>Terkunci</span>
                          </span>
                        )}
                      </div>

                      {/* Level Title & Subtitle */}
                      <div className="space-y-1 pt-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-lg sm:text-2xl text-slate-900 dark:text-white tracking-tight">
                            {lvl.title}
                          </h3>
                          {isPassed && (
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0" />
                          )}
                        </div>
                        <p className={`text-xs sm:text-sm font-bold ${theme.accentText}`}>
                          {lvl.subtitle}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                          {lvl.description}
                        </p>
                      </div>

                      {/* Highlight Specs Matrix */}
                      <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            Kata
                          </span>
                          <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 mt-0.5 block">
                            {lvl.words.length} Kata
                          </span>
                        </div>
                        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            Prestige
                          </span>
                          <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 mt-0.5 block">
                            {lvl.totalPoints} PTS
                          </span>
                        </div>
                        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            Rekor
                          </span>
                          <span className="text-xs sm:text-sm font-black text-amber-500 dark:text-amber-400 mt-0.5 block">
                            {bestScore > 0 ? `${bestScore} PTS` : '-'}
                          </span>
                        </div>
                      </div>

                      {/* Minimum Passing Requirement Badge */}
                      <div className="p-2 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between text-xs text-indigo-700 dark:text-indigo-300">
                        <span className="font-semibold flex items-center gap-1.5 text-[11px] sm:text-xs">
                          <Award className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>Syarat Lulus (70%):</span>
                        </span>
                        <span className="font-extrabold font-mono text-[11px] sm:text-xs">
                          Min. {passingScore} Prestige
                        </span>
                      </div>
                    </div>

                    {/* Main Play Action Button */}
                    <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800/80">
                      {isUnlocked ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (soundEnabled) playFeedbackSound('click');
                            onSelectLevel(lvl.level);
                          }}
                          className={`w-full py-3 sm:py-3.5 px-4 sm:px-5 rounded-2xl font-black text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg active:scale-98 ${
                            isPassed
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25'
                              : theme.btnBg
                          }`}
                        >
                          <Play className="w-4 h-4 fill-current shrink-0" />
                          <span>{bestScore > 0 ? 'Main Ulang Level' : 'Mulai Level Ini'}</span>
                          <ChevronRight className="w-4 h-4 ml-auto shrink-0" />
                        </button>
                      ) : (
                        <div className="py-2.5 sm:py-3 px-3 sm:px-4 rounded-2xl bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 select-none border border-slate-200 dark:border-slate-700/60">
                          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">
                            Terkunci: Min. {passingScore} Pts di Lv. {lvl.level - 1}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Carousel Controls: Left / Right Navigation & Dots */}
            <div className="flex items-center justify-between mt-3 max-w-[420px] mx-auto px-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm cursor-pointer"
                aria-label="Level Sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot Indicators with lock status */}
              <div className="flex items-center gap-1.5">
                {levels.map((lvl, idx) => {
                  const isUnlocked = lvl.level <= unlockedLevel;
                  const isSelected = idx === activeIndex;
                  return (
                    <button
                      key={lvl.level}
                      type="button"
                      onClick={() => {
                        if (soundEnabled) playFeedbackSound('click');
                        setActiveIndex(idx);
                      }}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        isSelected
                          ? 'w-7 h-2.5 bg-indigo-600 dark:bg-indigo-400'
                          : isUnlocked
                          ? 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                          : 'w-2.5 h-2.5 bg-slate-200 dark:bg-slate-800 opacity-60'
                      }`}
                      aria-label={`Pilih Level ${lvl.level}`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === levels.length - 1}
                className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm cursor-pointer"
                aria-label="Level Berikutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Gesture Swiping Helper Notice on Mobile */}
            <p className="text-center text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-2 flex items-center justify-center gap-1.5">
              <span>👈 Geser ke kanan / kiri untuk memilih level 👉</span>
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. GRID VIEW (Available on Desktop / When toggled) */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-300">
          {levels.map((lvl) => {
            const isUnlocked = lvl.level <= unlockedLevel;
            const bestScore = bestScores[lvl.level] || 0;
            const passingScore = Math.ceil(lvl.totalPoints * (lvl.passingScorePercent / 100));
            const isPassed = bestScore >= passingScore;
            const stars = calculateStars(bestScore, lvl.totalPoints);
            const isCurrentTarget = lvl.level === unlockedLevel && !isPassed;

            return (
              <div
                key={lvl.level}
                className={`relative rounded-3xl p-6 transition-all duration-300 border flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1'
                    : 'bg-slate-100/70 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 opacity-70'
                } ${isCurrentTarget ? 'ring-2 ring-indigo-500 shadow-indigo-500/10' : ''}`}
              >
                {/* Top Row: CEFR Badge & Star Rating / Status */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-black border uppercase tracking-wider ${
                          getCefrTheme(lvl.cefr).badge
                        }`}
                      >
                        {lvl.cefr} Level
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                        Grid {lvl.gridRows}×{lvl.gridCols}
                      </span>
                    </div>

                    {isUnlocked ? (
                      <div className="flex items-center gap-1">
                        {[1, 2, 3].map((starIdx) => (
                          <Star
                            key={starIdx}
                            className={`w-4 h-4 ${
                              starIdx <= stars
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-300 dark:text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Terkunci</span>
                      </span>
                    )}
                  </div>

                  {/* Level Title & Subtitle */}
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{lvl.title}</span>
                      {isPassed && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 font-sans">
                      {lvl.subtitle}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {lvl.description}
                    </p>
                  </div>
                </div>

                {/* Specs & Play Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Kata</span>
                      <span className="font-black text-slate-800 dark:text-slate-200">
                        {lvl.words.length} Kata
                      </span>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Prestige</span>
                      <span className="font-black text-slate-800 dark:text-slate-200">
                        {lvl.totalPoints} PTS
                      </span>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Rekor</span>
                      <span className="font-black text-amber-600 dark:text-amber-400">
                        {bestScore > 0 ? `${bestScore} PTS` : '-'}
                      </span>
                    </div>
                  </div>

                  {isUnlocked ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (soundEnabled) playFeedbackSound('click');
                        onSelectLevel(lvl.level);
                      }}
                      className={`w-full py-3 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 ${
                        isPassed
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
                      }`}
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{bestScore > 0 ? 'Main Ulang Level' : 'Mulai Level Ini'}</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </button>
                  ) : (
                    <div className="py-2.5 px-4 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 font-bold text-xs flex items-center justify-center gap-2 select-none">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Selesaikan Level {lvl.level - 1} (Min. {passingScore} Poin)</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

