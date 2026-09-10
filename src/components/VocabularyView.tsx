import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MEDIEVAL_VOCABULARY_FLASHCARDS } from '../data/curriculumData';
import { MedievalVocabItem } from '../types';
import { MedievalCard3D } from './medieval/MedievalCard3D';
import { QuizizzPowerUpArena } from './medieval/QuizizzPowerUpArena';
import { MedievalLibraryList } from './medieval/MedievalLibraryList';
import { MedievalGrammarGuide } from './medieval/MedievalGrammarGuide';
import { useMedievalAudio } from './medieval/useMedievalAudio';
import { MarqueeText } from './streak/MarqueeText';
import {
  BookOpen,
  Crown,
  Swords,
  Scroll,
  Layers,
  Sparkles,
  Save,
  Zap,
  ArrowLeft
} from 'lucide-react';

const STORAGE_KEY = 'ts_medieval_vocab_state_v2';

// Fisher-Yates pure randomization for auto-shuffled experience
const shuffleCards = (array: MedievalVocabItem[]): MedievalVocabItem[] => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

interface VocabularyViewProps {
  vocabularyMastered?: number;
  onAddMasteredVocab?: () => void;
  searchQuery?: string;
  targetVocabId?: string;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  onAddMasteredVocab,
  searchQuery = '',
  targetVocabId,
}) => {
  const audio = useMedievalAudio();

  // Load persisted state
  const savedState = (() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  })();

  // Automatically randomize all vocabulary words upon opening / mounting
  const [cards] = useState<MedievalVocabItem[]>(() =>
    shuffleCards(MEDIEVAL_VOCABULARY_FLASHCARDS)
  );
  const [currentIndex, setCurrentIndex] = useState<number>(savedState?.currentIndex ?? 0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'flashcard' | 'quiz' | 'library'>(
    savedState?.activeTab || 'flashcard'
  );
  const [masteredIds, setMasteredIds] = useState<string[]>(
    savedState?.masteredIds || ['med-1', 'med-5']
  );
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(
    savedState?.bookmarkedIds || ['med-1', 'med-3', 'med-11']
  );
  const [themeStyle, setThemeStyle] = useState<'medieval' | 'modern'>(
    savedState?.themeStyle || 'medieval'
  );
  const [isGrammarGuideOpen, setIsGrammarGuideOpen] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string | null>(savedState?.lastSaved || null);

  // Jump to specific card if targetVocabId is provided
  useEffect(() => {
    if (targetVocabId) {
      const targetIdx = cards.findIndex(c => c.id === targetVocabId);
      if (targetIdx !== -1) {
        setCurrentIndex(targetIdx);
        setIsFlipped(false);
      }
    }
  }, [targetVocabId, cards]);

  // Autosave state to localStorage
  useEffect(() => {
    const now = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const payload = {
      currentIndex,
      activeTab,
      masteredIds,
      bookmarkedIds,
      themeStyle,
      lastSaved: now,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setLastSaved(now);
    } catch (e) {
      console.error('Autosave medieval vocabulary error:', e);
    }
  }, [currentIndex, activeTab, masteredIds, bookmarkedIds, themeStyle]);

  const currentCard = cards[currentIndex] || cards[0];

  // Navigation handlers with direction
  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleToggleMastered = useCallback(
    (targetId?: string) => {
      const idToToggle = targetId || currentCard.id;
      setMasteredIds((prev) => {
        const exists = prev.includes(idToToggle);
        const next = exists ? prev.filter((id) => id !== idToToggle) : [...prev, idToToggle];
        if (!exists && onAddMasteredVocab) {
          onAddMasteredVocab();
        }
        return next;
      });
    },
    [currentCard.id, onAddMasteredVocab]
  );

  const handleToggleBookmark = useCallback(
    (targetId?: string) => {
      const idToToggle = targetId || currentCard.id;
      setBookmarkedIds((prev) =>
        prev.includes(idToToggle) ? prev.filter((id) => id !== idToToggle) : [...prev, idToToggle]
      );
    },
    [currentCard.id]
  );

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (activeTab === 'flashcard') {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrev();
        } else if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleFlip();
        } else if (e.key.toLowerCase() === 's') {
          e.preventDefault();
          audio.speak(currentCard.phrase, currentCard.id);
        } else if (e.key.toLowerCase() === 'm') {
          e.preventDefault();
          handleToggleMastered();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, handleNext, handlePrev, handleFlip, handleToggleMastered, currentCard, audio]);

  const masteredPercentage = Math.round((masteredIds.length / cards.length) * 100);

  return (
    <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto">
      {/* Conditionally Rendered Hero Banner and Main Navigation Tabs (Only in Flashcard 3D mode) */}
      <AnimatePresence mode="wait">
        {activeTab === 'flashcard' && (
          <motion.div
            key="flashcard-hero-and-tabs"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
            className="space-y-4 sm:space-y-6 overflow-hidden"
          >
            {/* Medieval Royal Parchment Hero Banner */}
            <div
              className={`rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 text-white shadow-lg border relative overflow-hidden transition-all duration-300 ${
                themeStyle === 'medieval'
                  ? 'bg-gradient-to-r from-[#1E110A] via-[#2D1B11] to-[#170C06] border-[#8C6D3F]/40 shadow-amber-950/20'
                  : 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-slate-800 shadow-slate-900/30'
              }`}
            >
              {/* Subtle decorative background glow */}
              <div className="absolute -right-10 -top-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] sm:text-xs font-black tracking-wide">
                      <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Medieval English Vocabulary</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] sm:text-[11px] font-bold">
                      <Save className="w-3 h-3 text-emerald-400 animate-pulse shrink-0" />
                      <span>Autosave {lastSaved ? `(${lastSaved})` : ''}</span>
                    </div>
                  </div>

                  <h1 className="text-xl sm:text-3xl font-black tracking-tight font-serif text-white leading-tight">
                    Kosakata & Ungkapan Bahasa Inggris Abad Pertengahan
                  </h1>

                  <p className="text-slate-300 text-xs sm:text-xs leading-relaxed font-medium">
                    Pelajari 25 ungkapan klasik khas <i>Medieval & Early Modern English</i> lengkap dengan
                    makna bahasa Indonesia, pelafalan IPA, dan aturan tata bahasa istana (kata teracak otomatis saat dibuka).
                  </p>

                  {/* Action Buttons */}
                  <div className="pt-2 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2">
                    <button
                      onClick={() => setIsGrammarGuideOpen(true)}
                      className="w-full sm:w-auto px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer min-h-[40px]"
                    >
                      <BookOpen className="w-4 h-4 text-amber-950 shrink-0" />
                      <span>Buku Panduan Tata Bahasa (Thou/Thee)</span>
                    </button>

                    <button
                      onClick={() => setThemeStyle(themeStyle === 'medieval' ? 'modern' : 'medieval')}
                      className="w-full sm:w-auto px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs border border-white/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[40px]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Tema: {themeStyle === 'medieval' ? 'Parchment Kuno' : 'Modern Elegan'}</span>
                    </button>
                  </div>
                </div>

                {/* Quick Stats Panel (Symmetrical on Mobile) */}
                <div className="bg-black/35 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/10 grid grid-cols-2 lg:flex lg:flex-col items-center justify-around gap-3 sm:gap-4 shrink-0">
                  <div className="text-center">
                    <span className="text-[10px] text-amber-300/80 font-black uppercase tracking-wider block">
                      Total Kosakata
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-white font-serif">{cards.length} Frasa</span>
                  </div>

                  <div className="hidden lg:block h-px w-full bg-white/10" />

                  <div className="text-center">
                    <span className="text-[10px] text-emerald-300/80 font-black uppercase tracking-wider block">
                      Telah Dikuasai
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-400 font-serif">
                      {masteredIds.length} <span className="text-[11px] sm:text-xs text-emerald-300 font-sans font-bold">({masteredPercentage}%)</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Fill Bar */}
              <div className="mt-4 sm:mt-5 pt-3 border-t border-white/10 flex items-center gap-3 text-xs">
                <span className="text-slate-300 text-[11px] font-bold whitespace-nowrap">Progres Penguasaan:</span>
                <div className="flex-1 bg-black/40 rounded-full h-2 overflow-hidden border border-white/10">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${masteredPercentage}%` }}
                  />
                </div>
                <span className="text-amber-300 font-bold text-xs shrink-0">{masteredIds.length}/{cards.length}</span>
              </div>
            </div>

            {/* Symmetrical Mode Navigation Tabs (3 Clean Columns on Mobile with Marquee for Active Tabs) */}
            <div className="w-full border-b border-slate-200 pb-3 flashcard-mode-tabs-bar">
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                <button
                  onClick={() => setActiveTab('flashcard')}
                  className={`py-2.5 px-2 sm:px-4 rounded-xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[42px] overflow-hidden ${
                    activeTab === 'flashcard'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Layers className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                  <span className="truncate">Kartu 3D</span>
                </button>

                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`py-2.5 px-2 sm:px-4 rounded-xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[42px] overflow-hidden ${
                    activeTab === 'quiz'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Swords className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                  <span className="truncate">Tantangan Kuis</span>
                </button>

                <button
                  onClick={() => setActiveTab('library')}
                  className={`py-2.5 px-2 sm:px-4 rounded-xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[42px] overflow-hidden ${
                    activeTab === 'library'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Scroll className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                  <span className="truncate">Gulungan Kata</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleek Return & Switcher Navigation Header (Visible when in Quiz or Library Mode) */}
      <AnimatePresence>
        {activeTab !== 'flashcard' && (
          <motion.div
            key="focused-mode-header"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-2.5"
          >
            <button
              onClick={() => setActiveTab('flashcard')}
              className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70 border border-amber-300/80 dark:border-amber-700/50 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Kembali ke Kartu 3D</span>
            </button>

            {/* Quick Mode Switcher Tabs with Running Marquee Text on active */}
            <div className="flex items-center gap-1.5 flex-1 sm:flex-initial justify-end">
              <button
                onClick={() => setActiveTab('quiz')}
                className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer overflow-hidden ${
                  activeTab === 'quiz'
                    ? 'bg-amber-800 text-white shadow-xs min-w-[125px]'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Swords className="w-3.5 h-3.5 shrink-0" />
                {activeTab === 'quiz' ? (
                  <div className="overflow-hidden min-w-0 flex-1">
                    <MarqueeText text="Tantangan Kuis" className="text-xs font-bold text-white" speed="normal" alwaysScroll={true} />
                  </div>
                ) : (
                  <span className="truncate">Tantangan Kuis</span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('library')}
                className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer overflow-hidden ${
                  activeTab === 'library'
                    ? 'bg-amber-800 text-white shadow-xs min-w-[125px]'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Scroll className="w-3.5 h-3.5 shrink-0" />
                {activeTab === 'library' ? (
                  <div className="overflow-hidden min-w-0 flex-1">
                    <MarqueeText text="Gulungan Kata" className="text-xs font-bold text-white" speed="normal" alwaysScroll={true} />
                  </div>
                ) : (
                  <span className="truncate">Gulungan Kata</span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Mode Viewport */}
      {activeTab === 'flashcard' && (
        <div className="py-1">
          <MedievalCard3D
            card={currentCard}
            currentIndex={currentIndex}
            totalCards={cards.length}
            isFlipped={isFlipped}
            direction={direction}
            isMastered={masteredIds.includes(currentCard.id)}
            isBookmarked={bookmarkedIds.includes(currentCard.id)}
            isPlayingAudio={audio.isPlaying && audio.currentId === currentCard.id}
            playbackSpeed={audio.playbackSpeed}
            themeStyle={themeStyle}
            onFlip={handleFlip}
            onNext={handleNext}
            onPrev={handlePrev}
            onToggleMastered={() => handleToggleMastered()}
            onToggleBookmark={() => handleToggleBookmark()}
            onPlayAudio={(speed) => audio.speak(currentCard.phrase, currentCard.id, speed)}
            onSetPlaybackSpeed={audio.setPlaybackSpeed}
          />
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-slate-950 shadow-md shadow-amber-500/20">
              <Zap className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-amber-500 dark:text-amber-400 font-serif tracking-wide drop-shadow-sm">
                Arena Quizizz: Power-Ups & Boosting
              </h2>
            </div>
          </div>

          <QuizizzPowerUpArena
            cards={cards}
            onAddScore={() => {
              if (onAddMasteredVocab) onAddMasteredVocab();
            }}
            themeStyle={themeStyle}
          />
        </div>
      )}

      {activeTab === 'library' && (
        <MedievalLibraryList
          cards={cards}
          masteredIds={masteredIds}
          bookmarkedIds={bookmarkedIds}
          currentPlayingId={audio.currentId}
          searchQuery={searchQuery}
          onPlayAudio={(text, id) => audio.speak(text, id)}
          onToggleMastered={handleToggleMastered}
          onToggleBookmark={handleToggleBookmark}
          onSelectCardIndex={(idx) => {
            setCurrentIndex(idx);
            setActiveTab('flashcard');
            setIsFlipped(false);
          }}
        />
      )}

      {/* Grammar Guide Modal */}
      <MedievalGrammarGuide
        isOpen={isGrammarGuideOpen}
        onClose={() => setIsGrammarGuideOpen(false)}
      />
    </div>
  );
};

