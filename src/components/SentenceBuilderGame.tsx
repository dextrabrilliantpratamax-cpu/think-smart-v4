import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  VolumeX,
  Lightbulb,
  ArrowRight,
  HelpCircle,
  Crown,
  Lock,
  Unlock,
  Check,
  AlertTriangle,
  BookOpen,
  Award,
  Share2,
  Undo2,
  Shuffle,
  GripHorizontal,
  ChevronRight,
  Star,
  Zap,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  SENTENCE_BUILDER_DATA,
  LEVEL_CONFIGS,
  DifficultyLevel,
  SentenceBuilderQuestion
} from '../data/sentenceBuilderData';
import { playFeedbackSound } from '../utils/feedbackSound';
import { recordActivityPrestige } from '../utils/prestigeManager';

interface WordToken {
  id: string;
  text: string;
  isDistractor: boolean;
}

interface StoredProgress {
  completedQuestionIds: Record<string, { score: number; hintUsed: boolean; attempts: number }>;
  unlockedLevels: DifficultyLevel[];
  totalScore: number;
  maxStreak: number;
}

const STORAGE_KEY = 'ts_sentence_builder_5levels_v1';

const LEVEL_ORDER: DifficultyLevel[] = ['rookie', 'scout', 'challenger', 'sweaty', 'goat'];

const PRAISE_MESSAGES = [
  '✨ Luar Biasa! Susunan Struktur Sempurna!',
  '🎉 Tepat Sekali! Tata Bahasa Sangat Akurat!',
  '🌟 Hebat! Kamu Menghindari Semua Kata Jebakan!',
  '🏆 Masterful Syntax! Kalimat Tersusun Presisi!',
  '🔥 Mantap! Pemahaman Grammar Tingkat Tinggi!',
  '🧠 Cerdas! Logika Struktur Bahasa Inggrismu Tajam!'
];

// List of words that should always retain their capitalization (proper nouns, title prefixes, pronoun I, etc.)
const PROPER_NOUNS = new Set([
  'i', "i'm", "i've", "i'll", "i'd",
  'andi', 'beni', 'budi', 'rina', 'rani', 'dewi', 'doni', 'siti', 'tono', 'dika', 'maya', 'bambang',
  'mr.', 'mrs.', 'ms.', 'dr.',
  'borobudur', 'prambanan', 'indonesia', 'indonesian', 'english', 'french', 'japanese',
  'bali', 'jakarta', 'asia', 'america'
]);

// Helper: Normalize word display in word bank (lower-case first word unless it's a proper noun)
const formatWordForBank = (w: string): string => {
  const clean = w.replace(/[.,!?;:"'()]/g, '').trim();
  const lower = clean.toLowerCase();
  
  if (PROPER_NOUNS.has(lower)) {
    return w; // Keep original capitalization for proper nouns / titles / I
  }
  
  // If it's a regular word capitalized at start of sentence, lowercase the first letter
  if (w.length > 0) {
    return w.charAt(0).toLowerCase() + w.slice(1);
  }
  return w;
};

// Helper: Normalize word for comparison (strips punctuation and lowers case)
const cleanWord = (w: string): string => {
  return w.replace(/[.,!?;:"'()]/g, '').trim().toLowerCase();
};

export interface SentenceBuilderGameProps {
  onAddScore?: (category: string, score: number) => void;
}

export const SentenceBuilderGame: React.FC<SentenceBuilderGameProps> = ({ onAddScore }) => {
  // --- STATE: USER PROGRESS & LOCAL STORAGE ---
  const [progress, setProgress] = useState<StoredProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load sentence builder progress:', e);
    }
    return {
      completedQuestionIds: {},
      unlockedLevels: ['rookie'],
      totalScore: 0,
      maxStreak: 0,
    };
  });

  // Save progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save sentence builder progress:', e);
    }
  }, [progress]);

  // --- COMPUTE UNLOCKED LEVELS DYNAMICALLY (LINEAR UNLOCK) ---
  const computedUnlockedLevels = useMemo<DifficultyLevel[]>(() => {
    const unlocked: DifficultyLevel[] = ['rookie'];
    for (let i = 0; i < LEVEL_ORDER.length - 1; i++) {
      const currentLevelKey = LEVEL_ORDER[i];
      const nextLevelKey = LEVEL_ORDER[i + 1];
      const questionsInCurrent = SENTENCE_BUILDER_DATA.filter((q) => q.level === currentLevelKey);
      const allCompleted = questionsInCurrent.length > 0 && questionsInCurrent.every((q) => !!progress.completedQuestionIds[q.id]);
      if (allCompleted) {
        unlocked.push(nextLevelKey);
      } else {
        break;
      }
    }
    return unlocked;
  }, [progress.completedQuestionIds]);

  // Sync unlockedLevels with state if newly opened
  useEffect(() => {
    if (computedUnlockedLevels.length !== progress.unlockedLevels.length) {
      setProgress((prev) => ({
        ...prev,
        unlockedLevels: computedUnlockedLevels,
      }));
    }
  }, [computedUnlockedLevels, progress.unlockedLevels.length]);

  // --- STATE: CURRENT GAME LEVEL & SUB-QUESTION ---
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>('rookie');
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState<number>(1);

  // Filter questions for the selected level
  const levelQuestions = useMemo(() => {
    return SENTENCE_BUILDER_DATA.filter((q) => q.level === selectedLevel);
  }, [selectedLevel]);

  // Find active question based on selectedQuestionNumber
  const currentQuestion: SentenceBuilderQuestion = useMemo(() => {
    return levelQuestions.find((q) => q.questionNumber === selectedQuestionNumber) || levelQuestions[0] || SENTENCE_BUILDER_DATA[0];
  }, [levelQuestions, selectedQuestionNumber]);

  const levelConfig = LEVEL_CONFIGS[selectedLevel] || LEVEL_CONFIGS.rookie;

  // --- STATE: CURRENT QUESTION TOKENS & CONSTRUCTION ---
  const [wordBank, setWordBank] = useState<WordToken[]>([]);
  const [constructedWords, setConstructedWords] = useState<WordToken[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; praiseIndex?: number } | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [isCollapsing, setIsCollapsing] = useState<boolean>(false);

  // Drag and Drop States
  const [draggedToken, setDraggedToken] = useState<{ token: WordToken; source: 'bank' | 'constructed'; index: number } | null>(null);
  const [isDragOverAnswerBar, setIsDragOverAnswerBar] = useState<boolean>(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Audio helper
  const triggerAudio = (type: 'correct' | 'wrong' | 'click' | 'tada' | 'hint') => {
    if (soundEnabled) {
      playFeedbackSound(type === 'hint' ? 'click' : type);
    }
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#10b981', '#6366f1', '#f59e0b', '#ec4899', '#3b82f6'],
      });
    } catch (e) {
      // Ignore if canvas-confetti fails
    }
  };

  // --- INITIALIZE QUESTION WITH SHUFFLED TOKENS ---
  useEffect(() => {
    if (!currentQuestion) return;

    // Reset interaction state
    setConstructedWords([]);
    setFeedback(null);
    setShowHint(false);
    setAttempts(0);
    setIsDragOverAnswerBar(false);
    setDragOverIndex(null);
    setIsCollapsing(false);

    // Extract target words and distractor words with normalized capitalization for word bank
    const targetWordTokens: WordToken[] = currentQuestion.words.map((w, idx) => ({
      id: `target-${idx}-${w}-${Math.random()}`,
      text: formatWordForBank(w),
      isDistractor: false,
    }));

    const distractorTokens: WordToken[] = currentQuestion.distractors.map((d, idx) => ({
      id: `distractor-${idx}-${d}-${Math.random()}`,
      text: formatWordForBank(d),
      isDistractor: true,
    }));

    // Combine and shuffle deterministically + randomly
    const combined = [...targetWordTokens, ...distractorTokens];
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }

    setWordBank(combined);
  }, [currentQuestion.id]);

  // Total required target words count
  const targetWordsCount = currentQuestion.words.length;
  const isCurrentQuestionCompleted = !!progress.completedQuestionIds[currentQuestion.id];

  // --- WORD BANK / CONSTRUCTION ACTIONS (CLICK & DRAG) ---
  const handleAddWordToConstruction = (token: WordToken, insertIndex?: number) => {
    if (isCollapsing) return;
    triggerAudio('click');
    setWordBank((prev) => prev.filter((item) => item.id !== token.id));
    setConstructedWords((prev) => {
      if (typeof insertIndex === 'number' && insertIndex >= 0 && insertIndex <= prev.length) {
        const copy = [...prev];
        copy.splice(insertIndex, 0, token);
        return copy;
      }
      return [...prev, token];
    });
    if (feedback) setFeedback(null);
  };

  const handleRemoveWordFromConstruction = (token: WordToken) => {
    if (isCollapsing) return;
    triggerAudio('click');
    setConstructedWords((prev) => prev.filter((item) => item.id !== token.id));
    setWordBank((prev) => [...prev, token]);
    if (feedback) setFeedback(null);
  };

  const handleResetCurrentConstruction = () => {
    if (isCollapsing) return;
    triggerAudio('click');
    setWordBank((prev) => [...prev, ...constructedWords]);
    setConstructedWords([]);
    setFeedback(null);
  };

  const handleUndoLastWord = () => {
    if (constructedWords.length === 0 || isCollapsing) return;
    triggerAudio('click');
    const lastWord = constructedWords[constructedWords.length - 1];
    setConstructedWords((prev) => prev.slice(0, prev.length - 1));
    setWordBank((prev) => [...prev, lastWord]);
    if (feedback) setFeedback(null);
  };

  // --- COLLAPSE / RETURN WRONG ASSEMBLED WORDS BACK TO BANK ---
  const triggerCollapseAndReset = () => {
    setIsCollapsing(true);
    triggerAudio('wrong');
    setCurrentStreak(0);
    setFeedback(null);

    // After animation duration, return all constructed words back to word bank
    setTimeout(() => {
      setWordBank((prev) => {
        const allWords = [...prev, ...constructedWords];
        // Shuffle the bank on collapse
        for (let i = allWords.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
        }
        return allWords;
      });
      setConstructedWords([]);
      setIsCollapsing(false);
    }, 600);
  };

  // --- DRAG AND DROP HANDLERS ---
  const handleDragStart = (
    e: React.DragEvent<HTMLButtonElement>,
    token: WordToken,
    source: 'bank' | 'constructed',
    index: number
  ) => {
    if (isCollapsing) {
      e.preventDefault();
      return;
    }
    setDraggedToken({ token, source, index });
    e.dataTransfer.setData('text/plain', token.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOverAnswerBar = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOverAnswerBar) setIsDragOverAnswerBar(true);
  };

  const handleDragLeaveAnswerBar = (e: React.DragEvent<HTMLDivElement>) => {
    // Only toggle off if leaving the parent container
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOverAnswerBar(false);
    setDragOverIndex(null);
  };

  const handleDropOnAnswerBar = (e: React.DragEvent<HTMLDivElement>, targetIndex?: number) => {
    e.preventDefault();
    setIsDragOverAnswerBar(false);
    setDragOverIndex(null);

    if (!draggedToken || isCollapsing) return;

    const { token, source, index: sourceIndex } = draggedToken;

    if (source === 'bank') {
      // Add from bank to constructed at targetIndex
      handleAddWordToConstruction(token, targetIndex);
    } else if (source === 'constructed') {
      // Re-order within constructed words
      if (typeof targetIndex === 'number' && targetIndex !== sourceIndex) {
        triggerAudio('click');
        setConstructedWords((prev) => {
          const copy = [...prev];
          const [removed] = copy.splice(sourceIndex, 1);
          copy.splice(targetIndex > sourceIndex ? targetIndex - 1 : targetIndex, 0, removed);
          return copy;
        });
      }
    }

    setDraggedToken(null);
  };

  const handleDropOnBank = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedToken || isCollapsing) return;

    if (draggedToken.source === 'constructed') {
      handleRemoveWordFromConstruction(draggedToken.token);
    }
    setDraggedToken(null);
  };

  // --- CHECK ASSEMBLED SENTENCE ---
  const handleCheckSentence = () => {
    if (isCollapsing) return;
    setAttempts((prev) => prev + 1);

    if (constructedWords.length === 0) {
      triggerAudio('wrong');
      return;
    }

    // Step 1: Check if any distractor word was included
    const hasDistractor = constructedWords.some((w) => w.isDistractor);

    // Step 2: Check word count matching
    const countMismatch = constructedWords.length !== targetWordsCount;

    // Step 3: Compare assembled tokens against expected tokens
    const assembledText = constructedWords.map((w) => cleanWord(w.text)).join(' ');
    const expectedTargetText = currentQuestion.words.map((w) => cleanWord(w)).join(' ');
    const isOrderMismatch = assembledText !== expectedTargetText;

    // IF ANY ERROR OCCURS: Collapse the wrong sentence and bounce words back to bank
    if (hasDistractor || countMismatch || isOrderMismatch) {
      triggerCollapseAndReset();
      return;
    }

    // IF 100% CORRECT:
    triggerAudio('tada');
    triggerConfetti();

    const newStreak = currentStreak + 1;
    setCurrentStreak(newStreak);

    // Score calculation: Level base points + streak bonus - attempts penalty - hint penalty
    const levelMultiplier =
      selectedLevel === 'rookie' ? 100 :
      selectedLevel === 'scout' ? 150 :
      selectedLevel === 'challenger' ? 200 :
      selectedLevel === 'sweaty' ? 300 : 400;

    const streakBonus = Math.min(newStreak * 20, 100);
    const hintPenalty = showHint ? 30 : 0;
    const attemptPenalty = Math.min(attempts * 10, 40);
    const earnedScore = Math.max(levelMultiplier + streakBonus - hintPenalty - attemptPenalty, 50);

    const randomPraise = Math.floor(Math.random() * PRAISE_MESSAGES.length);

    // Record Prestige and synchronize
    recordActivityPrestige('sentence_builder', earnedScore);
    if (onAddScore) onAddScore('sentence_builder', earnedScore);

    setFeedback({
      isCorrect: true,
      message: `${PRAISE_MESSAGES[randomPraise]} (+${earnedScore} Prestige)`,
      praiseIndex: randomPraise,
    });

    // Update progress
    setProgress((prev) => {
      const updatedCompleted = {
        ...prev.completedQuestionIds,
        [currentQuestion.id]: {
          score: earnedScore,
          hintUsed: showHint,
          attempts: attempts + 1,
        },
      };

      const newTotalScore = prev.totalScore + (prev.completedQuestionIds[currentQuestion.id] ? 0 : earnedScore);
      const newMaxStreak = Math.max(prev.maxStreak, newStreak);

      return {
        ...prev,
        completedQuestionIds: updatedCompleted,
        totalScore: newTotalScore,
        maxStreak: newMaxStreak,
      };
    });
  };

  // --- NAVIGATION: NEXT QUESTION ---
  const handleGoToNextQuestion = () => {
    triggerAudio('click');
    if (selectedQuestionNumber < 10) {
      setSelectedQuestionNumber((prev) => prev + 1);
    } else {
      // Find next unlocked level
      const currentIndex = LEVEL_ORDER.indexOf(selectedLevel);
      if (currentIndex < LEVEL_ORDER.length - 1) {
        const nextLevel = LEVEL_ORDER[currentIndex + 1];
        if (computedUnlockedLevels.includes(nextLevel)) {
          setSelectedLevel(nextLevel);
          setSelectedQuestionNumber(1);
        } else {
          // Stay on question 10 or show completion modal
          setSelectedQuestionNumber(10);
        }
      }
    }
  };

  // --- STATS CALCULATION FOR CURRENT LEVEL ---
  const completedInLevelCount = useMemo(() => {
    return levelQuestions.filter((q) => !!progress.completedQuestionIds[q.id]).length;
  }, [levelQuestions, progress.completedQuestionIds]);

  const levelCompletionPercent = Math.round((completedInLevelCount / 10) * 100);

  // Check if level is locked
  const isLevelUnlocked = (lvl: DifficultyLevel) => computedUnlockedLevels.includes(lvl);

  return (
    <div id="sentence-builder-arena" className="space-y-6">
      {/* =========================================================================
          TOP LEVEL SELECTOR TABS (5 LEVELS: ROOKIE -> SCOUT -> CHALLENGER -> SWEATY -> GOAT)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl shadow-md">
              🧩
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                Arena Frankensentence
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Susun kata-kata acak menjadi kalimat yang tepat, waspadai kata jebakan (*distractor trap*), dan buka level master!
              </p>
            </div>
          </div>

          {/* Overall Score & Streak Badge */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-black shadow-xs">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Prestige: {progress.totalScore}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-black shadow-xs">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Streak: {currentStreak} 🔥</span>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
              title={soundEnabled ? 'Matikan Suara' : 'Aktifkan Suara'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </div>

        {/* 5 Levels Tab Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {LEVEL_ORDER.map((lvlKey, idx) => {
            const cfg = LEVEL_CONFIGS[lvlKey];
            const isUnlocked = isLevelUnlocked(lvlKey);
            const isSelected = selectedLevel === lvlKey;
            const lvlQuestions = SENTENCE_BUILDER_DATA.filter((q) => q.level === lvlKey);
            const lvlDoneCount = lvlQuestions.filter((q) => !!progress.completedQuestionIds[q.id]).length;
            const isAllCompleted = lvlDoneCount === 10;

            return (
              <button
                key={lvlKey}
                disabled={!isUnlocked}
                onClick={() => {
                  if (isUnlocked) {
                    setSelectedLevel(lvlKey);
                    setSelectedQuestionNumber(1);
                    triggerAudio('click');
                  }
                }}
                className={`relative p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                  !isUnlocked
                    ? 'opacity-50 bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                    : isSelected
                    ? `bg-white dark:bg-slate-800 ${cfg.borderColor} shadow-md scale-[1.02] ring-2 ring-indigo-500/20 cursor-pointer`
                    : 'bg-slate-50/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 hover:bg-white dark:hover:bg-slate-800 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-xs font-black tracking-tight text-slate-900 dark:text-white">
                    {cfg.name}
                  </span>
                  {isAllCompleted ? (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                      ✓
                    </span>
                  ) : !isUnlocked ? (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <span className="text-[10px] font-extrabold text-slate-400">
                      {lvlDoneCount}/10
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    {cfg.rankTitle}
                  </div>
                </div>

                {/* Progress bar per level */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isAllCompleted
                        ? 'bg-emerald-500'
                        : isSelected
                        ? 'bg-indigo-500'
                        : 'bg-slate-400'
                    }`}
                    style={{ width: `${(lvlDoneCount / 10) * 100}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          SUB-SOAL SELECTOR GRID (SOAL 1 S/D 10 UNTUK LEVEL YANG AKTIF)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Daftar Sub-Soal Level {levelConfig.name}:
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-black text-xs border border-indigo-200 dark:border-indigo-800">
              Terselesaikan: {completedInLevelCount} / 10 Soal ({levelCompletionPercent}%)
            </span>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" /> Selesai
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500 ml-2" /> Aktif
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 ml-2" /> Belum
          </div>
        </div>

        {/* 10 Sub-Questions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {levelQuestions.map((q) => {
            const isCompleted = !!progress.completedQuestionIds[q.id];
            const isActive = q.questionNumber === selectedQuestionNumber;
            const qScore = progress.completedQuestionIds[q.id]?.score;

            return (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQuestionNumber(q.questionNumber);
                  triggerAudio('click');
                }}
                className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer text-center group ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105 ring-2 ring-indigo-300 dark:ring-indigo-800'
                    : isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-center gap-1 font-black text-xs">
                  <span>Soal {q.questionNumber}</span>
                  {isCompleted && (
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${
                        isActive ? 'text-emerald-200' : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    />
                  )}
                </div>

                <div
                  className={`text-[9px] font-semibold truncate max-w-full ${
                    isActive ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                  }`}
                  title={q.topic || q.subTitle}
                >
                  {q.topic || `Misi #${q.questionNumber}`}
                </div>

                {isCompleted && qScore && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                      isActive
                        ? 'bg-indigo-700 text-amber-300'
                        : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                    }`}
                  >
                    ★ {qScore}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          MAIN GAME ARENA (SOAL AKTIF, DROP ZONE JAWABAN & WORD BANK)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Soal Header Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-black ${levelConfig.bgLight} ${levelConfig.bgDark} border ${levelConfig.borderColor}`}>
                {levelConfig.badge} &bull; Soal #{currentQuestion.questionNumber} dari 10
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Fokus: <b>{currentQuestion.grammarPoint}</b>
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              {currentQuestion.subTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowHint(!showHint);
                triggerAudio('hint');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                showHint
                  ? 'bg-amber-100 dark:bg-amber-950 border-amber-400 text-amber-900 dark:text-amber-200'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>{showHint ? 'Tutup Petunjuk' : 'Bantuan Petunjuk (-30 Poin)'}</span>
            </button>

            {isCurrentQuestionCompleted && (
              <span className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Terselesaikan</span>
              </span>
            )}
          </div>
        </div>

        {/* Hint Box (if active) */}
        {showHint && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/50 rounded-2xl border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs leading-relaxed animate-in fade-in flex items-start gap-3">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-extrabold mb-0.5">Petunjuk Tata Bahasa:</div>
              <div>{currentQuestion.hint}</div>
            </div>
          </div>
        )}

        {/* Prompt Card: Instruksi Kalimat Bahasa Indonesia */}
        <div className="p-6 sm:p-7 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl border border-indigo-500/30 shadow-lg space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-black uppercase tracking-widest text-indigo-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Instruksi Kalimat (Bahasa Indonesia):</span>
            </div>
          </div>

          <div className="text-xl sm:text-2xl font-black text-white leading-snug">
            "{currentQuestion.indonesianMeaning}"
          </div>

          <div className="pt-1 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2 border-t border-indigo-800/60">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Waspadai kata jebakan yang tidak boleh dimasukkan ke dalam kalimat.</span>
            </div>
            <div className="text-indigo-200 text-[11px]">
              Drag / seret atau klik kata untuk menyusun
            </div>
          </div>
        </div>

        {/* =========================================================================
            ANSWER CONSTRUCTION BAR (DROP ZONE WITH ANIMATIONS)
            ========================================================================= */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Rancangan Susunan Jawaban:</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleUndoLastWord}
                disabled={constructedWords.length === 0}
                className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 disabled:opacity-40 text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
                title="Hapus kata terakhir"
              >
                <Undo2 className="w-3 h-3" />
                <span>Undo</span>
              </button>

              <button
                type="button"
                onClick={handleResetCurrentConstruction}
                disabled={constructedWords.length === 0}
                className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 disabled:opacity-40 text-rose-600 dark:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset semua susunan"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* THE INTERACTIVE ANSWER DROP BAR */}
          <div
            id="sentence-builder-answer-bar"
            onDragOver={handleDragOverAnswerBar}
            onDragLeave={handleDragLeaveAnswerBar}
            onDrop={(e) => handleDropOnAnswerBar(e, constructedWords.length)}
            className={`min-h-[96px] p-4 rounded-3xl border-2 transition-all duration-300 flex flex-wrap items-center gap-2.5 relative group ${
              isCollapsing
                ? 'border-rose-400 bg-rose-50/50 dark:bg-rose-950/30'
                : isDragOverAnswerBar
                ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 shadow-lg scale-[1.01] ring-4 ring-indigo-500/20'
                : constructedWords.length > 0
                ? 'border-indigo-300 dark:border-indigo-800/80 bg-slate-50/60 dark:bg-slate-900/60 shadow-inner'
                : 'border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/20 hover:border-indigo-400 hover:bg-indigo-50/30'
            }`}
          >
            {constructedWords.length === 0 ? (
              <div className="w-full text-center py-6 text-slate-400 dark:text-slate-500 text-xs sm:text-sm font-medium flex flex-col items-center justify-center gap-2 select-none pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                  <GripHorizontal className="w-4 h-4 animate-pulse" />
                </div>
                <span>Seret atau klik kata-kata dari bank kata di bawah ke dalam kotak ini</span>
              </div>
            ) : (
              constructedWords.map((token, index) => {
                // First word auto-capitalization visually
                const isFirst = index === 0;
                const displayText = isFirst
                  ? token.text.charAt(0).toUpperCase() + token.text.slice(1)
                  : token.text;

                return (
                  <div
                    key={token.id}
                    draggable={!isCollapsing}
                    onDragStart={(e) => handleDragStart(e, token, 'constructed', index)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDragOverIndex(index);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDropOnAnswerBar(e, index);
                    }}
                    className={`relative inline-flex items-center transition-all ${
                      isCollapsing ? 'animate-collapse-fall pointer-events-none' : ''
                    }`}
                  >
                    {/* Visual Insertion Marker when hovering over slot */}
                    {dragOverIndex === index && (
                      <div className="w-1.5 h-10 bg-indigo-600 rounded-full mx-1 animate-pulse" />
                    )}

                    <button
                      type="button"
                      disabled={isCollapsing}
                      onClick={() => handleRemoveWordFromConstruction(token)}
                      className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-indigo-400 dark:border-indigo-600 text-slate-900 dark:text-white font-extrabold text-sm sm:text-base shadow-sm hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-600 transition-all active:scale-95 cursor-pointer flex items-center gap-2 group/word"
                      title="Klik untuk kembalikan kata ke bank"
                    >
                      <span className="text-[10px] font-black text-indigo-400 dark:text-indigo-500">
                        {index + 1}.
                      </span>
                      <span>{displayText}</span>
                      <span className="text-xs text-slate-400 group-hover/word:text-rose-500 ml-0.5">
                        &times;
                      </span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* =========================================================================
            WORD BANK AREA (AVAILABLE WORDS + DISTRACTORS)
            ========================================================================= */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Papan Kata Tersedia ({wordBank.length} Kata):
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                (Klik atau seret kata ke atas)
              </span>
            </div>
          </div>

          {/* Word Bank Buttons Box */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={handleDropOnBank}
            className="p-5 rounded-3xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center gap-2.5 min-h-[100px]"
          >
            {wordBank.length === 0 ? (
              <div className="w-full text-center py-4 text-xs font-bold text-slate-400">
                Semua kata telah dimasukkan ke kotak rancangan jawaban di atas!
              </div>
            ) : (
              wordBank.map((token, idx) => (
                <button
                  key={token.id}
                  type="button"
                  draggable
                  onDragStart={(e) => handleDragStart(e, token, 'bank', idx)}
                  onClick={() => handleAddWordToConstruction(token)}
                  className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base shadow-xs hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md active:scale-95 transition-all cursor-pointer select-none flex items-center gap-1.5 group/token"
                >
                  <GripHorizontal className="w-3 h-3 text-slate-400 group-hover/token:text-indigo-500 opacity-60" />
                  <span>{token.text}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* =========================================================================
            ACTION BUTTONS: PERIKSA SUSUNAN, NEXT SOAL
            ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCheckSentence}
              disabled={constructedWords.length === 0}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-40 text-white font-black rounded-2xl text-sm transition-all shadow-md cursor-pointer active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Periksa Susunan Kalimat</span>
            </button>
          </div>

          {isCurrentQuestionCompleted && (
            <button
              type="button"
              onClick={handleGoToNextQuestion}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-sm transition-all shadow-md cursor-pointer flex items-center gap-2 active:scale-95 animate-in slide-in-from-right-4"
            >
              <span>{selectedQuestionNumber < 10 ? 'Misi Sub-Soal Berikutnya' : 'Level Selanjutnya'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* =========================================================================
            FEEDBACK CARD
            ========================================================================= */}
        {feedback && (
          <div
            className={`p-6 rounded-3xl border-2 space-y-3 animate-in zoom-in-95 duration-200 ${
              feedback.isCorrect
                ? 'bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-400 text-emerald-950 dark:text-emerald-100 shadow-md'
                : 'bg-rose-50/90 dark:bg-rose-950/60 border-rose-400 text-rose-950 dark:text-rose-100 shadow-md'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-extrabold text-sm sm:text-base">
                    {feedback.message}
                  </div>
                  {feedback.isCorrect && (
                    <div className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                      Kalimat Resmi: <b className="font-black">"{currentQuestion.correctSentence}"</b>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          LEVEL SUMMARY & STATS FOOTER
          ========================================================================= */}
      <div className="p-5 rounded-3xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-amber-500" />
          <div>
            <div className="font-black text-slate-800 dark:text-slate-200">
              Sistem Buka Level Linier (Linear Unlock)
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              Rookie &rarr; Scout &rarr; Challenger &rarr; Sweaty &rarr; GOAT (Selesaikan 10 soal untuk membuka level berikutnya).
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const text = `🎮 Skor Frankensentence saya di Fun Games: ${progress.totalScore} Poin! Streak tertinggi: ${progress.maxStreak}🔥 Level saat ini: ${levelConfig.name}!`;
              navigator.clipboard?.writeText(text);
              setCopiedShare(true);
              setTimeout(() => setCopiedShare(false), 2000);
            }}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedShare ? 'Tersalin ke Clipboard!' : 'Bagikan Skor'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
