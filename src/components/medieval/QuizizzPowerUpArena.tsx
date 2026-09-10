import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MedievalVocabItem } from '../../types';
import {
  Zap,
  Shield,
  Sparkles,
  Flame,
  Trophy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Swords,
  Crown,
  BookOpen,
  Lock,
  BatteryCharging
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playFeedbackSound } from '../../utils/feedbackSound';
import { recordActivityPrestige } from '../../utils/prestigeManager';

export type PowerUpType = 'Double Score' | '50-50' | 'Immunity' | 'Royal Hint' | 'Streak Surge';

interface PowerUpItem {
  id: PowerUpType;
  name: string;
  shortName: string;
  description: string;
  icon: React.ReactNode;
  badgeBg: string;
  activeBorder: string;
  glowColor: string;
}

const POWER_UP_DEFINITIONS: Record<PowerUpType, PowerUpItem> = {
  'Double Score': {
    id: 'Double Score',
    name: 'Double Prestige (2x Nilai)',
    shortName: 'Double 2X',
    description: 'Menggandakan perolehan nilai soal ini menjadi 200 Prestige!',
    icon: <Flame className="w-4 h-4 text-orange-400 animate-bounce" />,
    badgeBg: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
    activeBorder: 'border-orange-500 ring-2 ring-orange-400/50',
    glowColor: 'rgba(249, 115, 22, 0.4)',
  },
  '50-50': {
    id: '50-50',
    name: '50-50 (Eliminasi Opsi)',
    shortName: '50-50',
    description: 'Menghapus 2 opsi jawaban salah secara instan!',
    icon: <Zap className="w-4 h-4 text-cyan-300 animate-pulse" />,
    badgeBg: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white',
    activeBorder: 'border-cyan-400 ring-2 ring-cyan-300/50',
    glowColor: 'rgba(6, 182, 212, 0.4)',
  },
  'Immunity': {
    id: 'Immunity',
    name: 'Immunity (Kekebalan)',
    shortName: 'Immunity',
    description: 'Menyelamatkan jika salah menjawab, Prestige & streak tetap aman!',
    icon: <Shield className="w-4 h-4 text-emerald-300" />,
    badgeBg: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white',
    activeBorder: 'border-emerald-400 ring-2 ring-emerald-300/50',
    glowColor: 'rgba(16, 185, 129, 0.4)',
  },
  'Royal Hint': {
    id: 'Royal Hint',
    name: 'Royal Hint (Petunjuk Istana)',
    shortName: 'Royal Hint',
    description: 'Membuka petunjuk petikan naskah dan makna padanan modern!',
    icon: <BookOpen className="w-4 h-4 text-fuchsia-300" />,
    badgeBg: 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white',
    activeBorder: 'border-fuchsia-400 ring-2 ring-fuchsia-300/50',
    glowColor: 'rgba(217, 70, 239, 0.4)',
  },
  'Streak Surge': {
    id: 'Streak Surge',
    name: 'Streak Surge (Pusaka Combo)',
    shortName: 'Streak +2',
    description: 'Mendongkrak combo streak +2 level & bonus instan +150 Prestige!',
    icon: <Crown className="w-4 h-4 text-amber-300 animate-pulse" />,
    badgeBg: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white',
    activeBorder: 'border-violet-400 ring-2 ring-violet-300/50',
    glowColor: 'rgba(139, 92, 246, 0.4)',
  },
};

const ALL_POWER_UPS: PowerUpType[] = [
  'Double Score',
  '50-50',
  'Immunity',
  'Royal Hint',
  'Streak Surge',
];

const MAX_BOOST_QUOTA = 2;

interface QuizizzQuestion {
  id: string;
  sourceItem: MedievalVocabItem;
  type: 'archaic_to_indo' | 'indo_to_archaic';
  prompt: string;
  subPrompt?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  clueText: string;
}

interface QuizizzPowerUpArenaProps {
  cards: MedievalVocabItem[];
  onAddScore?: (points: number) => void;
  themeStyle?: 'medieval' | 'modern';
}

export const QuizizzPowerUpArena: React.FC<QuizizzPowerUpArenaProps> = ({
  cards,
  onAddScore,
  themeStyle = 'medieval',
}) => {
  // Generate randomized quiz questions from vocabulary pool
  const questions: QuizizzQuestion[] = useMemo(() => {
    if (!cards || cards.length === 0) return [];
    const pool = [...cards].sort(() => 0.5 - Math.random());
    const selected = pool.slice(0, 8); // 8 questions per session

    return selected.map((item, idx) => {
      const isArchaicToIndo = idx % 2 === 0;
      if (isArchaicToIndo) {
        const wrong = cards
          .filter((c) => c.id !== item.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((c) => c.meaning);
        const options = [...wrong, item.meaning].sort(() => 0.5 - Math.random());
        return {
          id: `q-quizizz-${item.id}-${idx}`,
          sourceItem: item,
          type: 'archaic_to_indo',
          prompt: `Apa arti makna dari ungkapan: "${item.phrase}"?`,
          subPrompt: `Pelafalan: ${item.phonetic} (${item.pronounce})`,
          options,
          correctAnswer: item.meaning,
          explanation: `"${item.phrase}" bermakna "${item.meaning}". Dalam Bahasa Inggris modern setara dengan "${item.modernEnglish}".`,
          clueText: `Petunjuk: Padanan modern adalah "${item.modernEnglish}" | Kategori: ${item.category}`,
        };
      } else {
        const wrong = cards
          .filter((c) => c.id !== item.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((c) => c.phrase);
        const options = [...wrong, item.phrase].sort(() => 0.5 - Math.random());
        return {
          id: `q-quizizz-${item.id}-${idx}`,
          sourceItem: item,
          type: 'indo_to_archaic',
          prompt: `Manakah padanan Medieval English untuk: "${item.meaning}"?`,
          subPrompt: `Kategori: ${item.category}`,
          options,
          correctAnswer: item.phrase,
          explanation: `Ungkapan yang tepat adalah "${item.phrase}" (dibaca: ${item.phonetic}).`,
          clueText: `Petunjuk: Fonetik pelafalan berbunyi /${item.phonetic}/ (${item.pronounce})`,
        };
      }
    });
  }, [cards]);

  // Game States
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [isGameCompleted, setIsGameCompleted] = useState<boolean>(false);

  // Power-Ups Bag State with 2 Boosts Quota constraint
  const [boostsRemaining, setBoostsRemaining] = useState<number>(MAX_BOOST_QUOTA);
  const [usedPowerUps, setUsedPowerUps] = useState<PowerUpType[]>([]);
  const [activePowerUp, setActivePowerUp] = useState<PowerUpType | null>(null);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [powerUpNotice, setPowerUpNotice] = useState<string | null>(null);
  const [revealedHint, setRevealedHint] = useState<string | null>(null);
  const [pointsEarnedNotice, setPointsEarnedNotice] = useState<number | null>(null);
  const [wasSavedByImmunity, setWasSavedByImmunity] = useState<boolean>(false);

  const currentQ = questions[currentIdx];

  // Activate Power-Up handler (Respects 2 boosts quota ceiling)
  const handleUsePowerUp = (powerUp: PowerUpType) => {
    if (isAnswerSubmitted) return;
    if (boostsRemaining <= 0) return;
    if (usedPowerUps.includes(powerUp)) return;
    if (activePowerUp === powerUp) return;

    // Deduct from 2 boosts quota and track as used
    setBoostsRemaining((prev) => Math.max(0, prev - 1));
    setUsedPowerUps((prev) => [...prev, powerUp]);
    setActivePowerUp(powerUp);

    playFeedbackSound('sparkle');

    if (powerUp === 'Double Score') {
      setPowerUpNotice('🔥 DOUBLE SCORE AKTIF! Poin soal ini akan digandakan menjadi 200 XP!');
    } else if (powerUp === 'Immunity') {
      setPowerUpNotice('🛡️ IMMUNITY AKTIF! Perisai kekebalan melindungi Anda jika menjawab salah.');
    } else if (powerUp === '50-50') {
      setPowerUpNotice('⚡ 50-50 AKTIF! 2 pilihan jawaban yang salah telah dieliminasi.');
      // Find 2 incorrect options to eliminate
      const wrongChoices = currentQ.options.filter((opt) => opt !== currentQ.correctAnswer);
      const shuffledWrong = wrongChoices.sort(() => 0.5 - Math.random());
      const toRemove = shuffledWrong.slice(0, 2);
      setEliminatedOptions(toRemove);
    } else if (powerUp === 'Royal Hint') {
      setPowerUpNotice('📜 ROYAL HINT AKTIF! Naskah petunjuk makna telah dibukakan untuk Anda.');
      setRevealedHint(currentQ.clueText);
    } else if (powerUp === 'Streak Surge') {
      setPowerUpNotice('👑 STREAK SURGE AKTIF! Combo bertambah +2 dan bonus instan +150 XP diperoleh!');
      const newStreak = streak + 2;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setScore((prev) => prev + 150);
      if (onAddScore) onAddScore(150);
      playFeedbackSound('tier_apex');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#8B5CF6', '#EC4899', '#F59E0B'],
      });
    }
  };

  // Submit Answer Logic
  const handleAnswer = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(option);
    setIsAnswerSubmitted(true);

    const isCorrect = option === currentQ.correctAnswer;
    const doubleActive = activePowerUp === 'Double Score';
    const immunityActive = activePowerUp === 'Immunity';

    // Base point system: 100 base, 200 if Double Score active
    const pointsGained = doubleActive ? 200 : 100;

    if (isCorrect) {
      // Correct answer
      playFeedbackSound('tier_apex');
      setScore((prev) => prev + pointsGained);
      setPointsEarnedNotice(pointsGained);
      setWasSavedByImmunity(false);

      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      recordActivityPrestige('quizizz', pointsGained);
      if (onAddScore) onAddScore(pointsGained);

      // Trigger celebratory confetti for 2x or high streaks
      if (doubleActive || newStreak >= 3) {
        confetti({
          particleCount: doubleActive ? 65 : 40,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#F59E0B', '#10B981', '#6366F1', '#EC4899'],
        });
      }
    } else {
      // Wrong answer
      if (immunityActive) {
        // Immunity saves the player and still awards full points!
        playFeedbackSound('sunrise');
        setWasSavedByImmunity(true);
        setScore((prev) => prev + pointsGained);
        setPointsEarnedNotice(pointsGained);

        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > maxStreak) setMaxStreak(newStreak);

        recordActivityPrestige('quizizz', pointsGained);
        if (onAddScore) onAddScore(pointsGained);

        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10B981', '#34D399', '#059669'],
        });
      } else {
        playFeedbackSound('click');
        setWasSavedByImmunity(false);
        setPointsEarnedNotice(0);
        setStreak(0);
      }
    }
  };

  // Next Question
  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setActivePowerUp(null);
      setEliminatedOptions([]);
      setPowerUpNotice(null);
      setRevealedHint(null);
      setPointsEarnedNotice(null);
      setWasSavedByImmunity(false);
    } else {
      setIsGameCompleted(true);
      playFeedbackSound('flame_evolve');
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  };

  // Restart Quizizz game session with full 2 quota refresh
  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setIsGameCompleted(false);
    setBoostsRemaining(MAX_BOOST_QUOTA);
    setUsedPowerUps([]);
    setActivePowerUp(null);
    setEliminatedOptions([]);
    setPowerUpNotice(null);
    setRevealedHint(null);
    setPointsEarnedNotice(null);
    setWasSavedByImmunity(false);
  };

  if (!currentQ && !isGameCompleted) {
    return (
      <div className="p-6 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        Menyiapkan Arena Kuis...
      </div>
    );
  }

  // GAME OVER / SUMMARY SCREEN
  if (isGameCompleted) {
    const totalPossibleBase = questions.length * 100;
    const accuracy = Math.min(Math.round((score / totalPossibleBase) * 100), 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-lg mx-auto text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-slate-950 shadow-lg shadow-orange-500/20">
            <Trophy className="w-9 h-9 text-slate-950" />
          </div>

          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1 rounded-full inline-block">
              🎉 GAME OVER • QUIZIZZ BOOSTING SUMMARY
            </span>
            <h2 className="text-3xl font-black text-white mt-3 font-serif">
              Hasil Arena Boosting Kamu
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Hebat! Kamu telah menyelesaikan simulasi Quizizz dengan sistem 5 Power-Ups & 2 Kuota Boost.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Prestige</span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {score} <span className="text-xs font-bold text-amber-300">Prestige</span>
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Akurasi / Boost</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{accuracy}%</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Max Combo</span>
              <span className="text-2xl font-black text-orange-400 font-mono flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-orange-500" /> {maxStreak}x
              </span>
            </div>
          </div>

          {/* Power-up usage report */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-left space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Status Pemakaian Kuota Boost:
              </span>
              <span className="text-xs font-mono font-bold text-amber-400">
                {usedPowerUps.length} / {MAX_BOOST_QUOTA} Kuota Terpakai
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_POWER_UPS.map((itemKey) => {
                const wasUsed = usedPowerUps.includes(itemKey);
                return (
                  <span
                    key={itemKey}
                    className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
                      wasUsed
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800/60 text-slate-500 border-slate-700/60 opacity-60'
                    }`}
                  >
                    {wasUsed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Lock className="w-3 h-3 text-slate-500" />
                    )}
                    <span>{itemKey} {wasUsed ? '(Terpakai)' : '(Tak Dipakai)'}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-950" />
            <span>Mainkan Lagi dengan Kuota Boost Baru (2/2)</span>
          </button>
        </div>
      </motion.div>
    );
  }

  // ACTIVE QUIZ INTERFACE
  return (
    <div className="space-y-4">
      {/* Quizizz Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white shadow-md flex flex-wrap items-center justify-between gap-3">
        {/* Left: Arena Badge & Live Streak Combo */}
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 bg-gradient-to-r from-indigo-600/30 to-violet-600/30 border border-indigo-500/40 text-indigo-300 rounded-full text-xs font-black flex items-center gap-1.5 shadow-xs">
            <Swords className="w-3.5 h-3.5 text-indigo-400" />
            <span>Arena Tantangan</span>
          </span>

          {streak > 1 && (
            <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/40 text-orange-300 rounded-full text-xs font-black flex items-center gap-1 animate-pulse">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              Combo {streak}x!
            </span>
          )}
        </div>

        {/* Right: Live Score Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 shadow-xs">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-400">Skor:</span>
            <span className="text-sm sm:text-base font-black text-amber-400 font-mono">
              {score} <span className="text-[10px] text-amber-300 font-sans font-bold">XP</span>
            </span>
          </div>
        </div>
      </div>

      {/* Power-Ups Deck / 5 Power-Ups Selection with 2 Quota Indicator */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-extrabold text-amber-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Pilih 2 Power-Ups dari 5 Pusaka Boosting</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10 text-[11px]">
            <span className="text-slate-400 font-medium">Sisa Slot Boost:</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: MAX_BOOST_QUOTA }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i < boostsRemaining ? 'bg-amber-400 ring-2 ring-amber-400/40 shadow-xs' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <strong className="text-amber-300 font-mono ml-1">{boostsRemaining} Kuota</strong>
          </div>
        </div>

        {/* 5 Power-Up Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {ALL_POWER_UPS.map((key) => {
            const item = POWER_UP_DEFINITIONS[key];
            const wasUsed = usedPowerUps.includes(key);
            const isCurrentActive = activePowerUp === key;
            const canActivate = boostsRemaining > 0 && !wasUsed && !isAnswerSubmitted;

            return (
              <button
                key={key}
                onClick={() => handleUsePowerUp(key)}
                disabled={!canActivate && !isCurrentActive}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-1.5 ${
                  isCurrentActive
                    ? `${item.badgeBg} border-white shadow-lg ring-2 ring-white/50 cursor-default`
                    : canActivate
                    ? 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 hover:border-amber-400 text-white cursor-pointer active:scale-98 shadow-xs'
                    : wasUsed
                    ? 'bg-slate-950/70 border-slate-800 text-slate-600 opacity-40 cursor-not-allowed'
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-500 opacity-40 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isCurrentActive ? 'bg-black/30' : 'bg-slate-700/60'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span className="font-black text-xs">{item.shortName}</span>
                  </div>

                  {isCurrentActive ? (
                    <span className="px-1.5 py-0.5 bg-white text-slate-950 text-[9px] font-black rounded uppercase tracking-wider animate-pulse">
                      AKTIF
                    </span>
                  ) : wasUsed ? (
                    <span className="text-[9px] text-slate-500 font-semibold line-through">Terpakai</span>
                  ) : boostsRemaining === 0 ? (
                    <span className="text-[9px] text-slate-500 font-semibold flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> Kuota 0
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 bg-amber-400/20 text-amber-300 text-[9px] font-bold rounded">
                      SIAP
                    </span>
                  )}
                </div>

                <p
                  className={`text-[10px] leading-tight font-medium ${
                    isCurrentActive ? 'text-white/90' : 'text-slate-400'
                  }`}
                >
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Active Power-Up Notification Banner */}
      <AnimatePresence>
        {powerUpNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between gap-3 shadow-md ${
              activePowerUp === 'Double Score'
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : activePowerUp === 'Immunity'
                ? 'bg-emerald-600 text-white border-emerald-400'
                : activePowerUp === '50-50'
                ? 'bg-cyan-600 text-white border-cyan-400'
                : activePowerUp === 'Royal Hint'
                ? 'bg-fuchsia-600 text-white border-fuchsia-400'
                : 'bg-violet-600 text-white border-violet-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{powerUpNotice}</span>
            </div>
            <span className="px-2.5 py-0.5 bg-black/20 rounded-lg text-[10px] uppercase font-black tracking-wider">
              Boosting Terpasang
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed Royal Hint Box if activated */}
      <AnimatePresence>
        {revealedHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-amber-50/90 border border-amber-300 rounded-2xl p-4 text-xs text-amber-950 font-medium flex items-start gap-3 shadow-sm"
          >
            <div className="p-2 bg-amber-200/80 rounded-xl text-amber-900 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <span className="font-extrabold text-amber-900 text-xs block uppercase tracking-wide">
                📜 Petunjuk Gulungan Kerajaan (Royal Hint):
              </span>
              <p className="text-amber-950 font-semibold">{revealedHint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Question Card (Quizizz Style) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Question Header */}
        <div className="space-y-2">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
              {currentQ.type === 'archaic_to_indo'
                ? 'Terjemahkan Frasa Kuno'
                : 'Pilih Frasa Medieval'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif leading-snug">
            {currentQ.prompt}
          </h3>

          {currentQ.subPrompt && (
            <p className="text-xs text-slate-500 font-medium">{currentQ.subPrompt}</p>
          )}
        </div>

        {/* Options Grid (Quizizz Color Palette & Animations) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentQ.options.map((option, idx) => {
            const isEliminated = eliminatedOptions.includes(option);
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQ.correctAnswer;

            // Quizizz distinct vibrant theme colors per card button
            const quizizzColors = [
              'border-rose-200 hover:border-rose-400 bg-rose-50/50 hover:bg-rose-50 text-rose-950',
              'border-blue-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-50 text-blue-950',
              'border-amber-200 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-50 text-amber-950',
              'border-emerald-200 hover:border-emerald-400 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-950',
            ];

            let buttonClass = quizizzColors[idx % 4];

            if (isEliminated) {
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 text-slate-400 text-xs flex items-center justify-between opacity-30 select-none line-through"
                >
                  <span>{String.fromCharCode(65 + idx)}. [Dihapus oleh 50-50]</span>
                  <Zap className="w-4 h-4 text-slate-300" />
                </div>
              );
            }

            if (isAnswerSubmitted) {
              if (isCorrect) {
                buttonClass =
                  'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400/50 font-bold shadow-md';
              } else if (isSelected && !isCorrect) {
                buttonClass =
                  wasSavedByImmunity
                    ? 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-400/50 font-bold'
                    : 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-300/50';
              } else {
                buttonClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-40';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={isAnswerSubmitted || isEliminated}
                className={`p-4 sm:p-5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${buttonClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center font-mono text-xs font-black shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug">{option}</span>
                </div>

                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 animate-bounce" />
                )}

                {isAnswerSubmitted && isSelected && !isCorrect && (
                  wasSavedByImmunity ? (
                    <Shield className="w-6 h-6 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                  )
                )}
              </button>
            );
          })}
        </div>

        {/* Post-Answer Feedback Banner (Quizizz Points & Immunity Toast) */}
        {isAnswerSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border text-xs leading-relaxed space-y-2 ${
              selectedOption === currentQ.correctAnswer
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : wasSavedByImmunity
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-extrabold text-sm flex items-center gap-2">
                {selectedOption === currentQ.correctAnswer ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>BENAR! Mantap Sekali!</span>
                  </>
                ) : wasSavedByImmunity ? (
                  <>
                    <Shield className="w-5 h-5 text-emerald-600 animate-pulse" />
                    <span>SALAH! Tapi 🛡️ IMMUNITY menyelamatkan Anda!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>KURANG TEPAT! Kunci Jawaban: "{currentQ.correctAnswer}"</span>
                  </>
                )}
              </div>

              {pointsEarnedNotice !== null && pointsEarnedNotice > 0 && (
                <span className="px-3 py-1 bg-slate-900 text-amber-400 font-mono font-black text-xs rounded-xl shadow-xs border border-slate-800">
                  +{pointsEarnedNotice} XP {activePowerUp === 'Double Score' ? '🔥 (2X DOUBLE SCORE)' : ''}
                </span>
              )}
            </div>

            <p className="text-xs opacity-90">{currentQ.explanation}</p>
          </motion.div>
        )}

        {/* Next Question CTA */}
        {isAnswerSubmitted && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            <span>{currentIdx + 1 === questions.length ? 'Lihat Skor Akhir Quizizz' : 'Lanjut ke Pertanyaan Berikutnya'}</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        )}
      </div>
    </div>
  );
};
