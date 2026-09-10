import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Flame,
  Sparkles,
  Zap,
  CheckCircle2,
  Calendar,
  RefreshCw,
  Plus,
  Crown,
  Award,
  Lock,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
} from 'lucide-react';
import { STREAK_TIERS, StreakTier, getStreakTier, getNextStreakTier } from './streakTiers';
import { StreakFlameAnimation } from './StreakFlameAnimation';
import { TikTokStreakCelebration } from './TikTokStreakCelebration';
import { MarqueeText } from './MarqueeText';
import { playFeedbackSound } from '../../utils/feedbackSound';
import confetti from 'canvas-confetti';

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakDays: number;
  onUpdateStreak: (newDays: number) => void;
  studentName?: string;
}

export const StreakModal: React.FC<StreakModalProps> = ({
  isOpen,
  onClose,
  streakDays,
  onUpdateStreak,
  studentName = 'Student',
}) => {
  const [selectedPreviewTier, setSelectedPreviewTier] = useState<StreakTier | null>(null);
  const [hasCheckedInToday, setHasCheckedInToday] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'gallery' | 'ranks'>('gallery');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isTikTokCelebrationOpen, setIsTikTokCelebrationOpen] = useState<boolean>(false);
  const [celebrationPrevStreak, setCelebrationPrevStreak] = useState<number>(streakDays);
  const [celebrationNewStreak, setCelebrationNewStreak] = useState<number>(streakDays);
  const [celebrationTierUpgrade, setCelebrationTierUpgrade] = useState<boolean>(false);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const currentTier = getStreakTier(streakDays);
  // Ensure selected preview tier cannot be a past tier
  const activeTier =
    selectedPreviewTier && selectedPreviewTier.rankLevel >= currentTier.rankLevel
      ? selectedPreviewTier
      : currentTier;
  const { nextTier, daysRemaining } = getNextStreakTier(streakDays);

  const isIridescent = activeTier.id === 'iridescent-apex';

  // Calculate tier progress (0 to 100%)
  const currentTierMin = currentTier.minDays;
  const currentTierMax = currentTier.maxDays === Infinity ? 900 : currentTier.maxDays;
  const tierSpan = Math.max(1, currentTierMax - currentTierMin + 1);
  const progressInTier = Math.min(
    100,
    Math.max(12, ((streakDays - currentTierMin + 1) / tierSpan) * 100)
  );

  const currentTierIndex = STREAK_TIERS.findIndex((t) => t.id === currentTier.id);

  // Auto-scroll mobile carousel to current/active tier on open or tab change
  useEffect(() => {
    if (isOpen && activeTab === 'gallery') {
      const timer = setTimeout(() => {
        if (mobileScrollRef.current) {
          const targetIdx = selectedPreviewTier
            ? STREAK_TIERS.findIndex((t) => t.id === selectedPreviewTier.id)
            : currentTierIndex;
          scrollToSlide(targetIdx >= 0 ? targetIdx : 0);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeTab]);

  const scrollToSlide = (index: number) => {
    if (mobileScrollRef.current && index >= 0 && index < STREAK_TIERS.length) {
      const container = mobileScrollRef.current;
      const targetCard = container.children[index] as HTMLElement;
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        setActiveSlideIndex(index);
      }
    }
  };

  const handleMobileScroll = () => {
    if (mobileScrollRef.current) {
      const container = mobileScrollRef.current;
      const scrollLeft = container.scrollLeft;
      const firstChild = container.firstElementChild as HTMLElement;
      const itemWidth = firstChild ? firstChild.offsetWidth + 12 : 280;
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex >= 0 && newIndex < STREAK_TIERS.length && newIndex !== activeSlideIndex) {
        setActiveSlideIndex(newIndex);
      }
    }
  };

  const handleClaimDailyStreak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasCheckedInToday) return;

    const prev = streakDays;
    const next = streakDays + 1;
    onUpdateStreak(next);
    setHasCheckedInToday(true);

    const prevTierObj = getStreakTier(prev);
    const nextTierObj = getStreakTier(next);
    setCelebrationPrevStreak(prev);
    setCelebrationNewStreak(next);
    setCelebrationTierUpgrade(nextTierObj.id !== prevTierObj.id);
    setIsTikTokCelebrationOpen(true);
  };

  const handleSelectTier = (tier: StreakTier) => {
    // User CANNOT select or revert to previous tiers
    if (tier.rankLevel < currentTier.rankLevel) {
      playFeedbackSound('click');
      return;
    }
    setSelectedPreviewTier(tier);
    playFeedbackSound((`tier_${tier.rankLevel}` as any) || 'flame_ignite');
  };

  const handleTestStreakDays = (targetDays: number) => {
    // Only allow advancing or setting current/future tiers
    const targetTier = getStreakTier(targetDays);
    if (targetTier.rankLevel < currentTier.rankLevel) {
      return;
    }
    const prev = streakDays;
    onUpdateStreak(targetDays);
    setSelectedPreviewTier(null);

    setCelebrationPrevStreak(prev);
    setCelebrationNewStreak(targetDays);
    setCelebrationTierUpgrade(targetTier.id !== currentTier.id);
    setIsTikTokCelebrationOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            key="streak-modal-wrapper"
            className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-5 overflow-y-auto bg-slate-950/80 backdrop-blur-md"
          >
            {/* Modal Backdrop */}
            <motion.div
              key="streak-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0"
            />

            {/* Modal Content Container */}
            <motion.div
              key="streak-modal-content"
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 360 }}
              className="relative w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 my-auto text-slate-800 dark:text-slate-100 transition-colors mx-3 sm:mx-auto"
            >
          {/* Header Showcase Banner */}
          <div
            className="p-4 sm:p-7 text-white relative overflow-hidden transition-colors duration-500"
            style={{
              background: isIridescent
                ? 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 30%, #3B0764 70%, #831843 100%)'
                : `linear-gradient(135deg, #0B1120 0%, #1E293B 40%, ${activeTier.secondaryColor} 100%)`,
            }}
          >
            {/* Ambient Background Glow Orb */}
            <div
              className={`absolute -right-16 -top-16 w-72 h-72 rounded-full blur-3xl opacity-50 pointer-events-none transition-all duration-700 ${
                isIridescent ? 'animate-iridescent-glow' : ''
              }`}
              style={{ backgroundColor: activeTier.primaryColor }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer z-20"
              title="Tutup jendela"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 relative z-10 text-center sm:text-left">
              {/* Main Animated Flame Avatar Stage */}
              <div className="relative flex flex-col items-center shrink-0">
                <div className="p-3 sm:p-5 rounded-3xl bg-slate-950/75 border border-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-2xl min-w-[96px] min-h-[96px] sm:min-w-[120px] sm:min-h-[120px]">
                  <StreakFlameAnimation
                    streakDays={selectedPreviewTier ? selectedPreviewTier.minDays : streakDays}
                    size="hero"
                    showLabel={false}
                    interactive={true}
                    variant="standalone"
                  />
                </div>

                {/* Rank Insignia Pill */}
                <div className="mt-2 sm:mt-2.5 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] font-black tracking-wider whitespace-nowrap bg-slate-950/85 dark:bg-slate-950/90 text-white shadow-lg border border-white/25 dark:border-white/20 backdrop-blur-md flex items-center justify-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse shadow-xs"
                    style={{ backgroundColor: activeTier.accentHex }}
                  />
                  <span className="text-white font-black tracking-wide">Rank {activeTier.rankRoman} · {activeTier.powerLevel}</span>
                </div>
              </div>

              {/* Title, Rank Info & Next Milestone Progress */}
              <div className="space-y-2 sm:space-y-2.5 flex-1 min-w-0 w-full">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-black bg-white/20 border border-white/25 text-white backdrop-blur-xs shadow-2xs">
                    <Crown className="w-3 h-3 text-amber-300" />
                    <span>{activeTier.rankTitle}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-black bg-indigo-400/20 text-indigo-200 border border-indigo-300/30">
                    <Zap className="w-3 h-3 text-indigo-300" />
                    <span>{activeTier.energyMultiplier}</span>
                  </span>
                </div>

                <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white break-words">
                  {selectedPreviewTier
                    ? selectedPreviewTier.name
                    : `${streakDays} ${streakDays === 1 ? 'Day' : 'Days'} Consecutive Streak!`}
                </h2>

                {/* 1.a: Information description hidden on mobile, visible on desktop */}
                <p className="hidden sm:block text-xs text-slate-200 leading-relaxed max-w-lg">
                  {activeTier.description}
                </p>

                {/* 1.c: Rank Buff Strip hidden on mobile header, preserved in Tab 2 */}
                <div className="hidden sm:flex px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-amber-200 font-bold items-center gap-2">
                  <Award className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Benefit: {activeTier.buffDescription}</span>
                </div>

                {/* Progress Bar towards next tier milestone */}
                <div className="pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-200 font-bold mb-1.5">
                    {/* 1.b: "5 day solar amber" hidden on mobile, visible on desktop */}
                    <span className="hidden sm:inline-flex shrink-0 font-extrabold text-amber-200 items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>{activeTier.flameTitle}</span>
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-300 font-medium w-full sm:w-auto text-center sm:text-right">
                      {nextTier
                        ? `${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} to ${nextTier.name}`
                        : '🌟 Apex Zenith Crown Achieved!'}
                    </span>
                  </div>
                  <div className="w-full bg-black/50 rounded-full h-2.5 sm:h-3 p-0.5 border border-white/25 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressInTier}%` }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="h-full rounded-full relative overflow-hidden shadow-inner"
                      style={{
                        background: isIridescent
                          ? 'linear-gradient(90deg, #EC4899, #8B5CF6, #3B82F6, #06B6D4, #10B981, #FDE047)'
                          : `linear-gradient(90deg, ${activeTier.primaryColor}, ${activeTier.coreColor})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Symmetrical 2-Tab Navigation Bar */}
          <div className="px-3 sm:px-6 py-2 sm:py-2.5 border-y border-slate-200 dark:border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-2 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 shadow-inner">
            {/* Symmetrical Segmented Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-200/80 dark:bg-slate-900 rounded-2xl border border-slate-300/80 dark:border-slate-800 w-full sm:w-auto sm:min-w-[380px] gap-1">
              <button
                onClick={() => setActiveTab('gallery')}
                className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer select-none ${
                  activeTab === 'gallery'
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/25 ring-1 ring-amber-300/40'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeTab === 'gallery' ? 'text-white' : 'text-amber-500 dark:text-amber-400'}`} />
                <span>Evolusi 8-Tier Api</span>
              </button>

              <button
                onClick={() => setActiveTab('ranks')}
                className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer select-none ${
                  activeTab === 'ranks'
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white shadow-md shadow-indigo-500/25 ring-1 ring-purple-300/40'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800'
                }`}
              >
                <Crown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeTab === 'ranks' ? 'text-white' : 'text-purple-500 dark:text-purple-400'}`} />
                <span>Peringkat & Privilege</span>
              </button>
            </div>

            {/* Reset Preview Button (if user is currently previewing a future tier) */}
            {selectedPreviewTier && selectedPreviewTier.id !== currentTier.id && (
              <button
                onClick={() => setSelectedPreviewTier(null)}
                className="text-xs font-black text-amber-600 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/70 hover:bg-amber-200 dark:hover:bg-amber-900/90 border border-amber-300 dark:border-amber-500/50 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs self-center"
                title="Kembali ke tier streak aktif Anda"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Kembali ke Tier Anda</span>
              </button>
            )}
          </div>

          {/* Modal Body */}
          <div className="p-3.5 sm:p-7 space-y-4 sm:space-y-6 max-h-[60vh] sm:max-h-[58vh] overflow-y-auto custom-scrollbar">
            {/* 1.d: Daily Attendance Action Banner - Streamlined on Mobile */}
            <div className="p-3 sm:p-4.5 rounded-2xl bg-gradient-to-r from-indigo-50 via-slate-50 to-amber-50 dark:from-indigo-950/60 dark:via-slate-900/90 dark:to-amber-950/50 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 shadow-xs">
              <div className="space-y-0.5 text-left">
                <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="hidden sm:inline">Presensi Harian & Latihan Bahasa Inggris</span>
                  <span className="inline sm:hidden">Presensi Harian</span>
                </div>
                <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  {hasCheckedInToday
                    ? 'Hebat! Streak harian telah aktif hari ini!'
                    : 'Selesaikan 1 latihan untuk menambah streak hari ini!'}
                </div>
                {/* 1.d: Hapus basa-basi pada mobile */}
                <div className="hidden sm:block text-xs text-slate-600 dark:text-slate-300 font-medium">
                  Konsistensi presensi & latihan membuka 8 evolusi api dari 7 hari hingga 900 hari (2,5 tahun) dengan bonus XP hingga 3.0x.
                </div>
              </div>

              <button
                onClick={handleClaimDailyStreak}
                disabled={hasCheckedInToday}
                className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 shrink-0 shadow-md cursor-pointer ${
                  hasCheckedInToday
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-indigo-500/25'
                }`}
              >
                {hasCheckedInToday ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Streak Aktif Hari Ini</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Klaim Presensi (+1 Hari)</span>
                  </>
                )}
              </button>
            </div>

            {/* TAB 1: 8-TIER FLAME EVOLUTION GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-2.5 sm:space-y-3">
                {/* 1.e: Header info text block hidden on mobile, visible on desktop */}
                <div className="hidden sm:block">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>Galeri Evolusi Bentuk Api & Peringkat (Akumulasi s.d 2,5 Tahun / 900 Hari)</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    Setiap tingkatan tier memiliki bentuk morfologi api, aura gerak, dan partikel yang unik. Tier yang telah dilampaui terkunci secara permanen.
                  </p>
                </div>

                {/* 2. MOBILE ONLY: Horizontal Animated Slide Carousel */}
                <div className="block sm:hidden">
                  {/* Slide Carousel Header Bar with Navigation Controls */}
                  <div className="flex items-center justify-between mb-2 px-1">
                    <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 dark:text-slate-200">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>Geser Tier ({activeSlideIndex + 1}/{STREAK_TIERS.length})</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => scrollToSlide(Math.max(0, activeSlideIndex - 1))}
                        disabled={activeSlideIndex === 0}
                        className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        title="Tier Sebelumnya"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSlide(Math.min(STREAK_TIERS.length - 1, activeSlideIndex + 1))}
                        disabled={activeSlideIndex === STREAK_TIERS.length - 1}
                        className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        title="Tier Berikutnya"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scroll Track */}
                  <div
                    ref={mobileScrollRef}
                    onScroll={handleMobileScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-3 py-1.5 px-0.5 no-scrollbar scroll-smooth touch-pan-x"
                  >
                    {STREAK_TIERS.map((tier, idx) => {
                      const isUnlocked = streakDays >= tier.minDays;
                      const isCurrent = currentTier.id === tier.id;
                      const isPast = currentTier.rankLevel > tier.rankLevel;
                      const isSelected = activeTier.id === tier.id;
                      const isTierIridescent = tier.id === 'iridescent-apex';

                      const nextThreshold = tier.maxDays === Infinity ? 40 : tier.maxDays + 1;
                      const cardProgress = Math.min(
                        100,
                        Math.max(
                          0,
                          isUnlocked
                            ? streakDays >= nextThreshold
                              ? 100
                              : ((streakDays - tier.minDays) / (nextThreshold - tier.minDays)) * 100
                            : 0
                        )
                      );

                      return (
                        <div
                          key={tier.id}
                          onClick={() => handleSelectTier(tier)}
                          className={`w-[80vw] max-w-[285px] shrink-0 snap-center p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group select-none ${
                            isPast
                              ? 'bg-slate-100/50 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800/60 opacity-60'
                              : isSelected
                              ? `ring-2 ring-indigo-500 shadow-lg ${tier.badgeBg} ${tier.badgeBorder}`
                              : isCurrent
                              ? 'bg-gradient-to-b from-amber-50/90 to-white dark:from-amber-950/30 dark:to-slate-900 ring-2 ring-amber-400 dark:ring-amber-500 border-amber-300 dark:border-amber-500/70 shadow-md'
                              : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/90 border-slate-200 dark:border-slate-800 shadow-xs'
                          } ${isTierIridescent && isSelected ? 'animate-iridescent-border' : ''}`}
                        >
                          {/* Header of Tier Card */}
                          <div className="flex items-center justify-between w-full mb-2.5 gap-2 min-w-0">
                            <div className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-1 flex items-center justify-center shrink-0 shadow-2xs ${isPast ? 'grayscale' : ''}`}>
                              <StreakFlameAnimation
                                streakDays={tier.minDays === 0 ? 1 : tier.minDays}
                                size="sm"
                                showLabel={false}
                                interactive={false}
                                variant="standalone"
                              />
                            </div>

                            <div className="flex flex-col items-end shrink-0 min-w-0 max-w-[calc(100%-48px)]">
                              <span
                                className={`text-[10px] font-black px-2 py-0.5 rounded-md text-white shadow-2xs inline-flex items-center gap-1 max-w-full whitespace-nowrap ${isPast ? 'bg-slate-500' : ''}`}
                                style={!isPast ? { backgroundColor: tier.accentHex } : undefined}
                              >
                                <span className="shrink-0">Rank {tier.rankRoman}</span>
                                <span className="opacity-70">·</span>
                                <span className="shrink-0">{tier.timeLabel}</span>
                              </span>
                              <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                                {tier.energyMultiplier}
                              </span>
                            </div>
                          </div>

                          {/* Title & Morphology Archetype */}
                          <div className="space-y-0.5 w-full min-w-0 overflow-hidden">
                            <div className={`text-xs font-black ${isPast ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'}`}>
                              <MarqueeText text={tier.name} speed="normal" />
                            </div>
                            <div className={`text-[10px] font-bold ${isPast ? 'text-slate-400 dark:text-slate-500' : 'text-indigo-600 dark:text-indigo-400'}`}>
                              <MarqueeText text={tier.archetype} speed="slow" />
                            </div>
                          </div>

                          {/* Inset Progress Bar for Tier */}
                          <div className="my-2 space-y-1">
                            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${cardProgress}%`,
                                  backgroundColor: isPast ? '#94A3B8' : tier.accentHex,
                                }}
                              />
                            </div>
                          </div>

                          {/* Status Footer */}
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold">
                            {isCurrent ? (
                              <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-black">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                <span>Tier Aktif</span>
                              </span>
                            ) : isPast ? (
                              <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1 font-semibold">
                                <Lock className="w-3 h-3 text-slate-400" />
                                <span>Terlewati</span>
                              </span>
                            ) : (
                              <span className="text-indigo-600 dark:text-indigo-300 flex items-center gap-1 font-bold">
                                <span>Mendatang</span>
                                <ChevronRight className="w-3 h-3" />
                              </span>
                            )}

                            {!isPast ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTestStreakDays(tier.minDays === 0 ? 2 : tier.minDays);
                                }}
                                title="Simulasikan streak tier ini"
                                className="text-[10px] text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-100 underline font-black cursor-pointer shrink-0"
                              >
                                Simulasi
                              </button>
                            ) : (
                              <span className="text-[9px] text-slate-400 dark:text-slate-600 font-medium">Terkunci</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Interactive Pagination Indicator Dots on Mobile */}
                  <div className="flex items-center justify-center gap-1.5 pt-2">
                    {STREAK_TIERS.map((t, dotIdx) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => scrollToSlide(dotIdx)}
                        className={`transition-all rounded-full ${
                          dotIdx === activeSlideIndex
                            ? 'w-5 h-1.5 bg-indigo-600 dark:bg-indigo-400'
                            : 'w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700'
                        }`}
                        title={`Lihat ${t.name}`}
                      />
                    ))}
                  </div>
                </div>

                {/* DESKTOP ONLY: Symmetrical 4-Column Grid (Completely unchanged for desktop/landscape) */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {STREAK_TIERS.map((tier) => {
                    const isUnlocked = streakDays >= tier.minDays;
                    const isCurrent = currentTier.id === tier.id;
                    const isPast = currentTier.rankLevel > tier.rankLevel;
                    const isSelected = activeTier.id === tier.id;
                    const isTierIridescent = tier.id === 'iridescent-apex';

                    // Calculate card internal progress
                    const nextThreshold = tier.maxDays === Infinity ? 40 : tier.maxDays + 1;
                    const cardProgress = Math.min(
                      100,
                      Math.max(
                        0,
                        isUnlocked
                          ? streakDays >= nextThreshold
                            ? 100
                            : ((streakDays - tier.minDays) / (nextThreshold - tier.minDays)) * 100
                          : 0
                      )
                    );

                    return (
                      <div
                        key={tier.id}
                        onClick={() => handleSelectTier(tier)}
                        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group min-w-0 ${
                          isPast
                            ? 'bg-slate-100/50 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800/60 opacity-60 cursor-not-allowed'
                            : isSelected
                            ? `ring-2 ring-indigo-500 shadow-md ${tier.badgeBg} ${tier.badgeBorder} cursor-pointer`
                            : isCurrent
                            ? 'bg-gradient-to-b from-amber-50/90 to-white dark:from-amber-950/30 dark:to-slate-900 ring-2 ring-amber-400 dark:ring-amber-500 border-amber-300 dark:border-amber-500/70 shadow-md cursor-pointer'
                            : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/90 border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-indigo-500/50 cursor-pointer'
                        } ${isTierIridescent && isSelected ? 'animate-iridescent-border' : ''}`}
                      >
                        {/* Header of Tier Card: Inset Flame Stage & Rank Badge */}
                        <div className="flex items-center justify-between w-full mb-3 gap-2 min-w-0">
                          <div className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-1 flex items-center justify-center shrink-0 shadow-2xs transition-transform ${!isPast ? 'group-hover:scale-105' : 'grayscale'}`}>
                            <StreakFlameAnimation
                              streakDays={tier.minDays === 0 ? 1 : tier.minDays}
                              size="sm"
                              showLabel={false}
                              interactive={false}
                              variant="standalone"
                            />
                          </div>

                          <div className="flex flex-col items-end shrink-0 min-w-0 max-w-[calc(100%-48px)]">
                            <span
                              className={`text-[9.5px] sm:text-[10px] font-black px-2 py-0.5 rounded-md text-white shadow-2xs inline-flex items-center gap-1 max-w-full whitespace-nowrap ${isPast ? 'bg-slate-500' : ''}`}
                              style={!isPast ? { backgroundColor: tier.accentHex } : undefined}
                            >
                              <span className="shrink-0">Rank {tier.rankRoman}</span>
                              <span className="opacity-70">·</span>
                              <span className="shrink-0">{tier.timeLabel}</span>
                            </span>
                            <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                              {tier.energyMultiplier}
                            </span>
                          </div>
                        </div>

                        {/* Title & Morphology Archetype */}
                        <div className="space-y-0.5 w-full min-w-0 overflow-hidden">
                          <div className={`text-xs font-black ${isPast ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300'}`}>
                            <MarqueeText text={tier.name} speed="normal" />
                          </div>
                          <div className={`text-[10px] font-bold ${isPast ? 'text-slate-400 dark:text-slate-500' : 'text-indigo-600 dark:text-indigo-400'}`}>
                            <MarqueeText text={tier.archetype} speed="slow" />
                          </div>
                        </div>

                        {/* Inset Progress Bar for Tier */}
                        <div className="my-2.5 space-y-1">
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${cardProgress}%`,
                                backgroundColor: isPast ? '#94A3B8' : tier.accentHex,
                              }}
                            />
                          </div>
                        </div>

                        {/* Symmetrical Status Footer */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold">
                          {isCurrent ? (
                            <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-black">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              <span>Tier Aktif</span>
                            </span>
                          ) : isPast ? (
                            <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1 font-semibold">
                              <Lock className="w-3 h-3 text-slate-400" />
                              <span>Terlewati</span>
                            </span>
                          ) : (
                            <span className="text-indigo-600 dark:text-indigo-300 flex items-center gap-1 font-bold">
                              <span>Mendatang</span>
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          )}

                          {!isPast ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTestStreakDays(tier.minDays === 0 ? 2 : tier.minDays);
                              }}
                              title="Simulasikan streak tier ini"
                              className="text-[10px] text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-100 underline font-black cursor-pointer shrink-0"
                            >
                              Simulasi
                            </button>
                          ) : (
                            <span className="text-[9px] text-slate-400 dark:text-slate-600 font-medium">Terkunci</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: RANK & PRIVILEGE PROGRESSION LADDER */}
            {activeTab === 'ranks' && (
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-100/70 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2.5 sm:space-y-3 shadow-inner">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                    <Crown className="w-4 h-4 text-amber-500" />
                    <span>Hierarki 8 Peringkat Api & Hak Istimewa Belajar</span>
                  </div>

                  <div className="space-y-2 sm:space-y-2.5">
                    {STREAK_TIERS.map((tier) => {
                      const isCurrent = currentTier.id === tier.id;
                      const isPast = currentTier.rankLevel > tier.rankLevel;

                      return (
                        <div
                          key={tier.id}
                          onClick={() => handleSelectTier(tier)}
                          className={`p-3 sm:p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 transition-all ${
                            isCurrent
                              ? 'bg-amber-50 dark:bg-gradient-to-r dark:from-amber-950/60 dark:via-slate-900/90 dark:to-amber-950/40 border-amber-400 dark:border-amber-500/80 shadow-md shadow-amber-950/30 cursor-pointer'
                              : isPast
                              ? 'bg-slate-100/50 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800/60 opacity-60 cursor-not-allowed'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/90 hover:border-indigo-400 dark:hover:border-indigo-500/50 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-1 flex items-center justify-center shrink-0 ${isPast ? 'grayscale' : ''}`}>
                              <StreakFlameAnimation
                                streakDays={tier.minDays === 0 ? 1 : tier.minDays}
                                size="sm"
                                showLabel={false}
                                interactive={false}
                                variant="standalone"
                              />
                            </div>
                            <div className="space-y-0.5 min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <span className={`text-xs font-black ${isPast ? 'text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                                  Rank {tier.rankRoman} · {tier.rankTitle}
                                </span>
                                {isCurrent && (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-600 text-white shadow-2xs">
                                    Peringkat Saat Ini
                                  </span>
                                )}
                                {isPast && (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                    Telah Dilewati
                                  </span>
                                )}
                              </div>
                              <div className={`text-[11px] font-bold ${isPast ? 'text-slate-400 dark:text-slate-500' : 'text-indigo-600 dark:text-indigo-300'}`}>
                                {tier.buffDescription}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 sm:gap-3 self-end sm:self-center shrink-0">
                            <span className={`text-xs font-black ${isPast ? 'text-slate-400 dark:text-slate-500' : 'text-amber-600 dark:text-amber-300'}`}>
                              {tier.energyMultiplier}
                            </span>
                            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700">
                              {tier.timeLabel} ({tier.periodLabel})
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Symmetrical Quick Milestone Simulation Strip */}
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 shadow-inner">
              <div className="text-xs font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5 shrink-0">
                <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>Simulasi Milestone 8 Tier:</span>
              </div>
              <div className="flex overflow-x-auto sm:flex-wrap items-center gap-1.5 w-full sm:w-auto no-scrollbar py-0.5">
                {[
                  { d: 7, r: 'I', label: '7 Hari', sub: '1 Minggu' },
                  { d: 30, r: 'II', label: '30 Hari', sub: '1 Bulan' },
                  { d: 90, r: 'III', label: '90 Hari', sub: '3 Bulan' },
                  { d: 180, r: 'IV', label: '180 Hari', sub: '1 Sem' },
                  { d: 360, r: 'V', label: '360 Hari', sub: '1 Thn' },
                  { d: 540, r: 'VI', label: '540 Hari', sub: '1.5 Thn' },
                  { d: 720, r: 'VII', label: '720 Hari', sub: '2 Thn' },
                  { d: 900, r: 'VIII', label: '900 Hari', sub: '2.5 Thn' },
                ].map((item) => {
                  const targetTier = getStreakTier(item.d);
                  const isPastMilestone = currentTier.rankLevel > targetTier.rankLevel;
                  const isCurrentMilestone = currentTier.rankLevel === targetTier.rankLevel;

                  return (
                    <button
                      key={item.d}
                      disabled={isPastMilestone}
                      onClick={() => handleTestStreakDays(item.d)}
                      title={`Simulasikan streak ${item.label} (${item.sub})`}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 select-none shrink-0 ${
                        isCurrentMilestone
                          ? 'bg-slate-950 dark:bg-gradient-to-r dark:from-amber-400 dark:to-orange-500 text-white dark:text-slate-950 shadow-md ring-1 ring-white/20 cursor-pointer'
                          : isPastMilestone
                          ? 'bg-slate-200/50 dark:bg-slate-900/60 text-slate-400 dark:text-slate-600 border border-slate-200/50 dark:border-slate-800 cursor-not-allowed opacity-50'
                          : 'bg-white dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-2xs cursor-pointer hover:border-indigo-400'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] font-bold opacity-80">· {item.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-3.5 sm:p-5 bg-slate-100/80 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
            <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              Profil Siswa: <b className="text-slate-900 dark:text-amber-300 font-black">{studentName}</b>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setCelebrationPrevStreak(Math.max(0, streakDays - 1));
                  setCelebrationNewStreak(streakDays);
                  setCelebrationTierUpgrade(false);
                  setIsTikTokCelebrationOpen(true);
                }}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-black transition-all shadow-md cursor-pointer active:scale-95 flex items-center gap-1.5"
                title="Lihat animasi selebrasi ala TikTok"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                <span>Selebrasi TikTok</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 text-white rounded-xl text-xs font-black transition-all shadow-md cursor-pointer active:scale-95"
              >
                Tutup Galeri
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>

  {/* TikTok Style Streak Celebration Modal */}
  <TikTokStreakCelebration
    isOpen={isTikTokCelebrationOpen}
    onClose={() => setIsTikTokCelebrationOpen(false)}
    previousStreak={celebrationPrevStreak}
    newStreak={celebrationNewStreak}
    isTierUpgrade={celebrationTierUpgrade}
    studentName={studentName}
    onOpenStreakGallery={() => {
      setIsTikTokCelebrationOpen(false);
    }}
  />
</>
  );
};
