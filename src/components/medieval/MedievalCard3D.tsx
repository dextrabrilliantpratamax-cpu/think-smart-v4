import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MedievalVocabItem } from '../../types';
import {
  Volume2,
  Bookmark,
  CheckCircle,
  HelpCircle,
  Crown,
  Scroll,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RotateCw,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MedievalCard3DProps {
  card: MedievalVocabItem;
  currentIndex: number;
  totalCards: number;
  isFlipped: boolean;
  direction: number; // 1 for next, -1 for prev
  isMastered: boolean;
  isBookmarked: boolean;
  isPlayingAudio: boolean;
  playbackSpeed: number;
  themeStyle: 'medieval' | 'modern';
  onFlip: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleMastered: () => void;
  onToggleBookmark: () => void;
  onPlayAudio: (speed?: number) => void;
  onSetPlaybackSpeed: (speed: number) => void;
}

export const MedievalCard3D: React.FC<MedievalCard3DProps> = ({
  card,
  currentIndex,
  totalCards,
  isFlipped,
  direction,
  isMastered,
  isBookmarked,
  isPlayingAudio,
  playbackSpeed,
  themeStyle,
  onFlip,
  onNext,
  onPrev,
  onToggleMastered,
  onToggleBookmark,
  onPlayAudio,
  onSetPlaybackSpeed,
}) => {
  const triggerMasterConfetti = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMastered) {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#d97706', '#8b5cf6', '#10b981', '#fbbf24']
      });
    }
    onToggleMastered();
  };

  const cardVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 240 : -240,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 320, damping: 28 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 240 : -240,
      opacity: 0,
      scale: 0.94,
      transition: {
        duration: 0.18,
        ease: 'easeInOut',
      },
    }),
  };

  const isParchment = themeStyle === 'medieval';

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none px-0.5 sm:px-0">
      {/* Top Deck Info Bar */}
      <div className="w-full flex items-center justify-between p-1.5 sm:p-2 mb-3 text-xs rounded-2xl border transition-all shadow-xs flashcard-deck-bar bg-white/70 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold bg-amber-500/10 text-amber-800 border border-amber-500/20 text-[11px] deck-counter-badge shadow-2xs">
            <Crown className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Kartu {currentIndex + 1} / {totalCards}</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[160px] deck-category-label">
            {card.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Playback speed toggle */}
          <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px] font-bold deck-speed-toggle">
            <button
              onClick={() => onSetPlaybackSpeed(1.0)}
              className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                playbackSpeed === 1.0 ? 'bg-white text-indigo-700 shadow-xs deck-speed-active' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Kecepatan Normal"
            >
              1.0x
            </button>
            <button
              onClick={() => onSetPlaybackSpeed(0.75)}
              className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                playbackSpeed === 0.75 ? 'bg-amber-100 text-amber-900 shadow-xs deck-speed-active' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Kecepatan Lambat (Latihan Pengucapan)"
            >
              0.75x
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={onToggleBookmark}
            className={`p-2 rounded-xl border transition-all cursor-pointer deck-bookmark-button ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-600 shadow-xs is-bookmarked'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
            title={isBookmarked ? 'Hapus dari Bintang Favorit' : 'Tandai Bintang Favorit'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* 3D Card Stage with Perspective */}
      <div
        className="w-full relative [perspective:1400px] min-h-[440px] sm:min-h-[470px] flex items-center justify-center cursor-pointer"
        onClick={onFlip}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={card.id}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.35}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) {
                onNext();
              } else if (info.offset.x > 60) {
                onPrev();
              }
            }}
            className="w-full h-full absolute inset-0 flex items-center justify-center"
            style={{ perspective: 1400 }}
          >
            {/* Card Dual Face Container */}
            <div className="w-full h-full relative rounded-3xl [transform-style:preserve-3d]">
              {/* ================= FRONT OF CARD (Medieval English Phrase) ================= */}
              <motion.div
                initial={false}
                animate={{
                  rotateY: isFlipped ? 180 : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 1, 0.5, 1],
                }}
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  pointerEvents: isFlipped ? 'none' : 'auto',
                }}
                className={`w-full h-full rounded-3xl p-5 sm:p-8 flex flex-col justify-between absolute inset-0 border shadow-md transition-colors ${
                  isParchment
                    ? 'bg-gradient-to-br from-[#FFFDF7] via-[#FAF3E0] to-[#F5EAD4] border-[#DEC49C] text-[#332211] shadow-[#E4D5BE]/60'
                    : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
                }`}
              >
                {/* Parchment Vintage Ornamental Corner Accents */}
                <div className="absolute top-3 left-3 w-4 sm:w-5 h-4 sm:h-5 border-t-2 border-l-2 border-amber-600/40 rounded-tl-lg pointer-events-none" />
                <div className="absolute top-3 right-3 w-4 sm:w-5 h-4 sm:h-5 border-t-2 border-r-2 border-amber-600/40 rounded-tr-lg pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 sm:w-5 h-4 sm:h-5 border-b-2 border-l-2 border-amber-600/40 rounded-bl-lg pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-4 sm:w-5 h-4 sm:h-5 border-b-2 border-r-2 border-amber-600/40 rounded-br-lg pointer-events-none" />

                {/* Front Card Header */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-900/10 text-amber-900 border border-amber-800/20 flex items-center gap-1">
                      <Scroll className="w-3 h-3 text-amber-700" />
                      <span className="truncate max-w-[120px] sm:max-w-none">{card.categoryEn}</span>
                    </span>
                    {isMastered && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> Dikuasai
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayAudio();
                    }}
                    className={`p-2.5 rounded-full transition-transform active:scale-95 cursor-pointer shadow-xs flex items-center gap-1.5 ${
                      isPlayingAudio
                        ? 'bg-amber-600 text-white ring-4 ring-amber-300 animate-pulse'
                        : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                    }`}
                    title="Dengarkan Pengucapan Asli"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Volume2 className="w-4 h-4 animate-bounce" />
                        <span className="text-[10px] font-bold hidden sm:inline">Memutar...</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-amber-800" />
                        <span className="text-[10px] font-bold hidden sm:inline">Audio</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Center Medieval Phrase Content */}
                <div className="my-auto py-4 sm:py-6 text-center space-y-3 sm:space-y-4 relative z-10">
                  <div className="inline-block relative px-2">
                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#2B1B0F] leading-tight font-serif drop-shadow-2xs">
                      "{card.phrase}"
                    </h2>
                  </div>

                  {/* Phonetics & Pronunciation Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
                    <div className="px-3 py-1 rounded-xl bg-amber-950/5 border border-amber-900/15 text-xs font-mono text-amber-950 font-semibold tracking-wide">
                      <span className="text-[10px] uppercase font-bold text-amber-700 mr-1">IPA:</span>
                      {card.pronounce}
                    </div>

                    <div className="px-3 py-1 rounded-xl bg-amber-800/10 border border-amber-800/20 text-xs font-sans text-amber-900 font-bold">
                      <span className="text-[10px] uppercase font-bold text-amber-700 mr-1">Lafal:</span>
                      {card.phonetic}
                    </div>
                  </div>

                  {/* Modern English preview hint */}
                  <div className="text-[11px] text-amber-900/75 font-medium flex items-center justify-center gap-1.5 pt-0.5">
                    <Globe className="w-3.5 h-3.5 text-amber-700/80 shrink-0" />
                    <span className="truncate">Modern: <b className="text-amber-950 font-bold">{card.modernEnglish}</b></span>
                  </div>
                </div>

                {/* Front Card Footer with Clean Instruction */}
                <div className="pt-2.5 border-t border-amber-900/10 flex items-center justify-center text-[11px] font-bold text-amber-800/85 relative z-10 text-center">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Ketuk kartu untuk melihat arti & tata bahasa</span>
                  </span>
                </div>
              </motion.div>

              {/* ================= BACK OF CARD (Meaning, Breakdown, & Historical Context) ================= */}
              <motion.div
                initial={false}
                animate={{
                  rotateY: isFlipped ? 0 : -180,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 1, 0.5, 1],
                }}
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  pointerEvents: isFlipped ? 'auto' : 'none',
                }}
                className={`w-full h-full rounded-3xl p-5 sm:p-8 flex flex-col justify-between absolute inset-0 border shadow-md transition-colors ${
                  isParchment
                    ? 'bg-gradient-to-br from-[#FAF5E8] via-[#F4E8CE] to-[#ECE0C4] border-[#DEC49C] text-[#2D1C10] shadow-[#E4D5BE]/60'
                    : 'bg-indigo-50/50 border-indigo-200 text-slate-900 shadow-slate-200/50'
                }`}
              >
                {/* Back Card Header */}
                <div className="flex items-center justify-between border-b border-amber-900/15 pb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-900/10 text-amber-900 shrink-0">
                      Arti & Makna
                    </span>
                    <span className="text-xs font-serif italic text-amber-950/80 font-bold truncate">
                      "{card.phrase}"
                    </span>
                  </div>

                  <span className="text-[10px] font-extrabold text-amber-800 flex items-center gap-1 shrink-0">
                    <RotateCw className="w-3 h-3" /> Balik
                  </span>
                </div>

                {/* Back Card Body */}
                <div className="my-auto py-2.5 space-y-2.5 text-left overflow-y-auto max-h-[250px] pr-1 custom-scrollbar">
                  {/* Indonesian Translation Big Callout */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white/90 border border-amber-900/15 shadow-2xs">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                      Arti Bahasa Indonesia:
                    </div>
                    <div className="text-lg sm:text-2xl font-black text-[#1E1108] mt-0.5 font-sans leading-snug">
                      {card.meaning}
                    </div>
                  </div>

                  {/* Archaic Word Breakdown */}
                  {card.breakdown && card.breakdown.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 text-amber-600" />
                        Bedah Kosakata Kuno:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {card.breakdown.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl bg-amber-900/5 border border-amber-900/10 text-[11px]"
                          >
                            <span className="font-bold font-serif text-amber-950 mr-1.5 bg-amber-200/60 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px]">
                              {item.term}
                            </span>
                            <span className="text-amber-900 leading-snug">{item.explanation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Historical & Cultural Context Note */}
                  {card.historicalNote && (
                    <div className="p-2.5 rounded-xl bg-amber-600/10 border border-amber-600/20 text-xs text-amber-950 leading-relaxed font-medium">
                      <span className="font-bold text-amber-900 flex items-center gap-1 mb-0.5 text-[11px]">
                        <Crown className="w-3.5 h-3.5 text-amber-700" />
                        Catatan Sejarah:
                      </span>
                      {card.historicalNote}
                    </div>
                  )}
                </div>

                {/* Back Card Footer Actions */}
                <div className="pt-2.5 border-t border-amber-900/15 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayAudio();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 border border-amber-300 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Lafalkan</span>
                  </button>

                  <button
                    onClick={triggerMasterConfetti}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                      isMastered
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        : 'bg-amber-800 hover:bg-amber-900 text-white'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{isMastered ? 'Sudah Dikuasai ✓' : 'Tandai Dikuasai'}</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Symmetrical 3-Button Controls Grid (Guaranteed 1-Screen fit, No Overflow) */}
      <div className="w-full grid grid-cols-3 gap-2 sm:gap-3 mt-4 flashcard-bottom-controls">
        {/* 1. Tombol Sebelumnya */}
        <button
          onClick={onPrev}
          className="w-full py-2.5 px-2 bg-white hover:bg-amber-50 text-slate-800 border border-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-2xs transition-all active:scale-95 cursor-pointer min-h-[44px] deck-btn-prev"
          aria-label="Kartu Sebelumnya"
        >
          <ArrowLeft className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="truncate">Sebelumnya</span>
        </button>

        {/* 2. Tombol Kuasai Kata */}
        <button
          onClick={triggerMasterConfetti}
          className={`w-full py-2.5 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-all active:scale-95 cursor-pointer min-h-[44px] deck-btn-master ${
            isMastered
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500 is-mastered'
              : 'bg-amber-600 hover:bg-amber-700 text-white border border-amber-500'
          }`}
          aria-label="Tandai Dikuasai"
        >
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">{isMastered ? 'Dikuasai ✓' : 'Kuasai Kata'}</span>
        </button>

        {/* 3. Tombol Berikutnya */}
        <button
          onClick={onNext}
          className="w-full py-2.5 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-all active:scale-95 cursor-pointer min-h-[44px] deck-btn-next"
          aria-label="Kartu Berikutnya"
        >
          <span className="truncate">Berikutnya</span>
          <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
        </button>
      </div>
    </div>
  );
};

