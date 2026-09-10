import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MedievalVocabItem } from '../../types';
import {
  Trophy,
  Swords,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Flame,
  Award,
  Crown,
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { recordActivityPrestige } from '../../utils/prestigeManager';

interface MedievalQuizArenaProps {
  cards: MedievalVocabItem[];
  onFinishQuiz?: (score: number) => void;
}

interface GeneratedQuestion {
  id: string;
  sourceItem: MedievalVocabItem;
  type: 'archaic_to_indo' | 'indo_to_archaic';
  prompt: string;
  subPrompt?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const MedievalQuizArena: React.FC<MedievalQuizArenaProps> = ({
  cards,
  onFinishQuiz,
}) => {
  // Generate random set of 10 questions from cards
  const questions: GeneratedQuestion[] = useMemo(() => {
    if (!cards || cards.length === 0) return [];

    const shuffledCards = [...cards].sort(() => 0.5 - Math.random());
    const selected = shuffledCards.slice(0, 10);

    return selected.map((item, idx) => {
      const isArchaicToIndo = idx % 2 === 0;

      if (isArchaicToIndo) {
        // Question: Medieval Phrase -> Indonesian Meaning
        const wrongOptions = cards
          .filter((c) => c.id !== item.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((c) => c.meaning);

        const options = [...wrongOptions, item.meaning].sort(() => 0.5 - Math.random());

        return {
          id: `quiz-${item.id}-${idx}`,
          sourceItem: item,
          type: 'archaic_to_indo',
          prompt: `Apa arti dari ungkapan: "${item.phrase}"?`,
          subPrompt: `Pelafalan: ${item.phonetic} (${item.pronounce})`,
          options,
          correctAnswer: item.meaning,
          explanation: `"${item.phrase}" berarti "${item.meaning}". Dalam Bahasa Inggris modern setara dengan "${item.modernEnglish}".`,
        };
      } else {
        // Question: Indonesian Meaning -> Medieval Phrase
        const wrongOptions = cards
          .filter((c) => c.id !== item.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((c) => c.phrase);

        const options = [...wrongOptions, item.phrase].sort(() => 0.5 - Math.random());

        return {
          id: `quiz-${item.id}-${idx}`,
          sourceItem: item,
          type: 'indo_to_archaic',
          prompt: `Bagaimana ungkapan Medieval English untuk: "${item.meaning}"?`,
          subPrompt: `Kategori: ${item.category}`,
          options,
          correctAnswer: item.phrase,
          explanation: `Ungkapan yang tepat adalah "${item.phrase}" (dibaca: ${item.phonetic}).`,
        };
      }
    });
  }, [cards]);

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(option);
    setIsAnswerSubmitted(true);

    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) {
      const newScore = score + 10 + Math.min(streak * 2, 10);
      setScore(newScore);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      const earnedPrestige = Math.max(score * 5, 50);
      recordActivityPrestige('quizizz', earnedPrestige);
      const finalScorePercent = Math.round((score / (questions.length * 10)) * 100);
      if (onFinishQuiz) onFinishQuiz(earnedPrestige);

      if (score >= questions.length * 8) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setStreak(0);
    setIsQuizCompleted(false);
  };

  if (!currentQ && !isQuizCompleted) {
    return <div className="p-8 text-center text-slate-500">Memuat soal kuis...</div>;
  }

  // Completed Screen
  if (isQuizCompleted) {
    const accuracy = Math.round((score / (questions.length * 10)) * 100);
    let rankTitle = 'Novice Scribe';
    let rankDesc = 'Terus berlatih untuk menguasai tata bahasa ksatria!';
    if (accuracy >= 90) {
      rankTitle = 'Grand Master of Olde English';
      rankDesc = 'Luar biasa! Pemahamanmu terhadap Medieval English setara bangsawan istana!';
    } else if (accuracy >= 70) {
      rankTitle = 'Royal Knight Scholar';
      rankDesc = 'Hebat! Kamu telah menguasai sebagian besar ungkapan dan frasa klasik.';
    } else if (accuracy >= 50) {
      rankTitle = 'Castle Squire';
      rankDesc = 'Cukup baik! Tingkatkan lagi dengan mengulang flashcard secara berkala.';
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto bg-gradient-to-br from-[#FFFDF8] via-[#FAF4E6] to-[#F5EADB] border border-[#DFC8A4] rounded-3xl p-8 text-center shadow-lg space-y-6"
      >
        <div className="w-16 h-16 mx-auto bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-800 shadow-inner">
          <Trophy className="w-8 h-8 text-amber-700" />
        </div>

        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full">
            Gelar Kehormatan Kamu
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950 mt-2 font-serif">
            {rankTitle}
          </h2>
          <p className="text-xs text-amber-900/80 mt-1 max-w-md mx-auto">{rankDesc}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-white/80 rounded-2xl border border-amber-900/10 text-center">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Perolehan Prestige</div>
            <div className="text-2xl font-black text-amber-700">+{Math.max(score * 5, 50)}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Akurasi</div>
            <div className="text-2xl font-black text-emerald-700">{Math.min(accuracy, 100)}%</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Max Streak</div>
            <div className="text-2xl font-black text-indigo-700 flex items-center justify-center gap-0.5">
              <Flame className="w-4 h-4 text-orange-500" /> {maxStreak}
            </div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi Tantangan Kuis</span>
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Quiz Header Info */}
      <div className="flex items-center justify-between px-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full text-[11px] flex items-center gap-1.5 shadow-xs">
            <Swords className="w-3.5 h-3.5 text-amber-700" />
            <span>Tantangan Kosakata</span>
          </span>
          {streak > 1 && (
            <span className="font-extrabold text-orange-600 bg-orange-100 border border-orange-200 px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1 animate-pulse">
              <Flame className="w-3 h-3 text-orange-500" /> Combo {streak}x!
            </span>
          )}
        </div>

        <div className="text-[11px] font-bold text-slate-600">
          Prestige: <span className="text-amber-700 font-extrabold">{score * 5}</span> PTS
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-amber-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="bg-gradient-to-br from-[#FFFDF8] via-[#FAF4E8] to-[#F4E9D8] border border-[#DEC49C] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
        >
          {/* Question Prompt */}
          <div className="space-y-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">
                {currentQ.type === 'archaic_to_indo' ? 'Terjemahkan Frasa' : 'Pilih Ungkapan Kuno'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-amber-950 font-serif leading-snug">
              {currentQ.prompt}
            </h3>

            {currentQ.subPrompt && (
              <p className="text-xs text-amber-900/70 font-medium">{currentQ.subPrompt}</p>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-2.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrectAnswer = option === currentQ.correctAnswer;

              let btnStyle =
                'bg-white/90 border-slate-200/90 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50';

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400/40 font-bold';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-300/40';
                } else {
                  btnStyle = 'bg-white/50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-amber-950/5 border border-amber-950/10 flex items-center justify-center font-mono text-[11px] font-bold text-amber-900 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswerSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                selectedOption === currentQ.correctAnswer
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/80 border-rose-200 text-rose-950'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {selectedOption === currentQ.correctAnswer
                    ? 'Benar Sekali!'
                    : `Kurang Tepat! Jawaban benar: "${currentQ.correctAnswer}"`}
                </span>
              </div>
              <p className="text-[11px] opacity-90">{currentQ.explanation}</p>
            </motion.div>
          )}

          {/* Next Button */}
          {isAnswerSubmitted && (
            <button
              onClick={handleNextQuestion}
              className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <span>{currentIdx + 1 === questions.length ? 'Lihat Hasil Akhir' : 'Lanjut ke Soal Berikutnya'}</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
