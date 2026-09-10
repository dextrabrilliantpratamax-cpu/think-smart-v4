import React, { useState, useEffect } from 'react';
import { LessonItem, QuizQuestion } from '../types';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Shuffle,
  PenTool,
  Check,
  HelpCircle,
  BookOpen,
  Zap
} from 'lucide-react';
import { recordActivityPrestige } from '../utils/prestigeManager';

interface TenseQuizCardProps {
  tense: LessonItem;
  isCompleted: boolean;
  onCompleteLesson: (lessonId: string, score?: number) => void;
}

interface QuestionAnswerRecord {
  questionId: string;
  selectedOption: number | null;
  textAnswer?: string;
  isSubmitted: boolean;
  isCorrect: boolean;
}

export const TenseQuizCard: React.FC<TenseQuizCardProps> = ({
  tense,
  isCompleted,
  onCompleteLesson,
}) => {
  const questions: QuizQuestion[] = tense.quizQuestions || [];
  const totalQuestions = questions.length;

  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, QuestionAnswerRecord>>({});
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [scramblePicks, setScramblePicks] = useState<string[]>([]);
  const [textInput, setTextInput] = useState<string>('');

  const currentQuestion: QuizQuestion | undefined =
    activeIdx !== null && questions[activeIdx] ? questions[activeIdx] : undefined;
  const currentRecord: QuestionAnswerRecord | undefined =
    activeIdx !== null ? answers[activeIdx] : undefined;

  // Reset scramble and text input when question index changes
  useEffect(() => {
    setScramblePicks([]);
    setTextInput(currentRecord?.textAnswer || '');
  }, [activeIdx, currentRecord]);

  const startQuiz = () => {
    setActiveIdx(0);
    setAnswers({});
    setIsQuizFinished(false);
  };

  const handleSelectOption = (optIndex: number) => {
    if (activeIdx === null || currentRecord?.isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [activeIdx]: {
        questionId: currentQuestion?.id || `q-${activeIdx}`,
        selectedOption: optIndex,
        textAnswer: textInput,
        isSubmitted: false,
        isCorrect: false,
      },
    }));
  };

  const handleWordChipClick = (word: string) => {
    if (currentRecord?.isSubmitted) return;
    const newPicks = [...scramblePicks, word];
    setScramblePicks(newPicks);
    const constructedSentence = newPicks.join(' ');
    
    // Automatically match with options if matching
    if (currentQuestion?.options) {
      const matchedIdx = currentQuestion.options.findIndex(
        (opt) => opt.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').trim() === constructedSentence.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').trim()
      );
      if (matchedIdx !== -1) {
        handleSelectOption(matchedIdx);
      }
    }
  };

  const handleResetScramble = () => {
    setScramblePicks([]);
  };

  const handleSubmitCurrent = () => {
    if (activeIdx === null || !currentQuestion) return;

    let selectedIdx = currentRecord?.selectedOption;
    let isCorrect = false;

    // Check for fill-in question by text input
    if (currentQuestion.questionType === 'fill-in' && textInput.trim().length > 0) {
      const cleanInput = textInput.trim().toLowerCase();
      const acceptable = [
        currentQuestion.correctAnswerText?.toLowerCase() || '',
        ...(currentQuestion.acceptableAnswers || []).map((a) => a.toLowerCase()),
      ].filter(Boolean);

      if (acceptable.some((ans) => cleanInput.includes(ans) || ans.includes(cleanInput))) {
        isCorrect = true;
      }
    }

    if (selectedIdx !== undefined && selectedIdx !== null) {
      if (selectedIdx === currentQuestion.correctAnswerIndex) {
        isCorrect = true;
      }
    }

    setAnswers((prev) => ({
      ...prev,
      [activeIdx]: {
        questionId: currentQuestion.id,
        selectedOption: selectedIdx ?? null,
        textAnswer: textInput,
        isSubmitted: true,
        isCorrect,
      },
    }));
  };

  const handleNext = () => {
    if (activeIdx === null) return;
    if (activeIdx + 1 < totalQuestions) {
      setActiveIdx(activeIdx + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (activeIdx === null || activeIdx <= 0) return;
    setActiveIdx(activeIdx - 1);
  };

  const finishQuiz = () => {
    setIsQuizFinished(true);
    const ansList = Object.values(answers) as QuestionAnswerRecord[];
    const correctCount = ansList.filter((a) => a.isCorrect).length;
    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    const earnedPrestige = Math.max(100, Math.round(finalScore * 1.5));
    recordActivityPrestige('lesson', earnedPrestige);
    onCompleteLesson(tense.id, finalScore);
  };

  const ansList = Object.values(answers) as QuestionAnswerRecord[];
  const correctAnswersCount = ansList.filter((a) => a.isCorrect).length;
  const answeredCount = ansList.filter((a) => a.isSubmitted).length;
  const percentageScore = totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0;

  // Helper badge color for question types
  const getQuestionTypeBadge = (type?: string, label?: string) => {
    const defaultLabel = label || 'Pilihan Ganda';
    switch (type) {
      case 'word-scramble':
        return {
          label: defaultLabel,
          bg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-purple-200 dark:border-purple-800',
        };
      case 'error-correction':
        return {
          label: defaultLabel,
          bg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        };
      case 'fill-in':
        return {
          label: defaultLabel,
          bg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        };
      case 'passive':
        return {
          label: defaultLabel,
          bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      case 'translation':
        return {
          label: defaultLabel,
          bg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
        };
      case 'complex-clause':
        return {
          label: defaultLabel,
          bg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
        };
      default:
        return {
          label: defaultLabel,
          bg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        };
    }
  };

  // 1. Initial State (Quiz not yet active)
  if (activeIdx === null && !isQuizFinished) {
    return (
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-500" /> Bank 10 Soal Lengkap & Pembahasan
              </span>
              {isCompleted && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Tuntas
                </span>
              )}
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              Kuis Uji Penguasaan: {tense.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-normal">
              Terdiri dari 10 variasi soal mendalam: Pilihan ganda, analisis kalimat, isian singkat, koreksi kesalahan gramatikal, transformasi pasif/interogatif, dan terjemahan.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isCompleted && (
              <button
                onClick={() => onCompleteLesson(tense.id, 100)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Tandai Selesai
              </button>
            )}
            <button
              onClick={startQuiz}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4 text-indigo-200" />
              <span>Mulai 10 Soal Kuis</span>
            </button>
          </div>
        </div>

        {/* Question format breakdown badges */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Format Soal:</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">MCQ Konteks</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">Isian Singkat</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">Koreksi Kesalahan</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">Transformasi Pasif</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">Susun Kata</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">Terjemahan</span>
        </div>
      </div>
    );
  }

  // 2. Finished State (Score Card & Evaluation)
  if (isQuizFinished) {
    return (
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 mx-auto text-indigo-600 dark:text-indigo-400 shadow-xs">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Hasil Latihan Kuis: {tense.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Kamu telah menyelesaikan seluruh 10 paket latihan soal tense ini.
          </p>
        </div>

        <div className="max-w-md mx-auto grid grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Benar</span>
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {correctAnswersCount}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Salah</span>
            <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
              {totalQuestions - correctAnswersCount}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Skor Kuis</span>
            <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {percentageScore}%
            </span>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" /> Prestige Didapat
            </span>
            <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              +{Math.max(100, Math.round(percentageScore * 1.5))}
            </span>
          </div>
        </div>

        {/* 10-Question Navigator for review */}
        <div className="max-w-lg mx-auto space-y-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Tinjau Pembahasan Tiap Soal:
          </span>
          <div className="flex flex-wrap justify-center gap-1.5">
            {questions.map((q, idx) => {
              const rec = answers[idx];
              const isCorrect = rec?.isCorrect;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setIsQuizFinished(false);
                    setActiveIdx(idx);
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center border cursor-pointer ${
                    isCorrect
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                      : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700'
                  }`}
                  title={`Soal ${idx + 1}: ${isCorrect ? 'Benar' : 'Salah'}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={startQuiz}
            className="px-5 py-2.5 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Ulangi Kuis 10 Soal
          </button>
        </div>
      </div>
    );
  }

  // 3. Active Quiz Question View
  const badgeInfo = getQuestionTypeBadge(currentQuestion?.questionType, currentQuestion?.questionTypeLabel);

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      {/* Top Header: Progress & Jump Matrix */}
      <div className="space-y-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Soal {activeIdx! + 1} dari {totalQuestions}
            </span>
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${badgeInfo.bg}`}>
              {badgeInfo.label}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-slate-500 dark:text-slate-400">Terjawab:</span>
            <span className="text-indigo-600 dark:text-indigo-400">
              {answeredCount} / {totalQuestions}
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {correctAnswersCount} Benar
            </span>
          </div>
        </div>

        {/* 10-Question Mini Navigator */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {questions.map((q, idx) => {
            const rec = answers[idx];
            const isCurrent = idx === activeIdx;
            const isDone = rec?.isSubmitted;
            const isCorrect = rec?.isCorrect;

            let btnStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
            if (isDone) {
              btnStyle = isCorrect
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700 font-bold'
                : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-400 dark:border-rose-700 font-bold';
            }
            if (isCurrent) {
              btnStyle += ' ring-2 ring-indigo-500 ring-offset-1 font-extrabold text-indigo-700 dark:text-indigo-300';
            }

            return (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all shrink-0 border cursor-pointer flex items-center justify-center ${btnStyle}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Prompt */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
        <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
          Pertanyaan:
        </span>
        <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-relaxed whitespace-pre-wrap">
          {currentQuestion?.question}
        </div>
      </div>

      {/* Special Interactivity: Word Scramble */}
      {currentQuestion?.questionType === 'word-scramble' && currentQuestion.scrambleWords && (
        <div className="p-4 bg-purple-50/60 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
              <Shuffle className="w-3.5 h-3.5" /> Susun Kata Acak:
            </span>
            {scramblePicks.length > 0 && !currentRecord?.isSubmitted && (
              <button
                onClick={handleResetScramble}
                className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
              >
                Reset Susunan
              </button>
            )}
          </div>

          {/* Constructed Sentence Box */}
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-purple-200 dark:border-purple-800 min-h-[44px] flex flex-wrap items-center gap-1.5 text-xs font-semibold text-purple-950 dark:text-purple-200">
            {scramblePicks.length === 0 ? (
              <span className="text-slate-400 italic text-xs">Klik kata-kata di bawah untuk menyusun kalimat...</span>
            ) : (
              scramblePicks.map((word, wIdx) => (
                <span
                  key={wIdx}
                  className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-200 rounded-md border border-purple-200 dark:border-purple-700"
                >
                  {word}
                </span>
              ))
            )}
          </div>

          {/* Available Word Chips */}
          {!currentRecord?.isSubmitted && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentQuestion.scrambleWords.map((word, wIdx) => (
                <button
                  key={wIdx}
                  onClick={() => handleWordChipClick(word)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 text-xs font-medium text-purple-900 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  {word}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Special Interactivity: Fill-In Field */}
      {currentQuestion?.questionType === 'fill-in' && !currentRecord?.isSubmitted && (
        <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 space-y-2">
          <label className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
            <PenTool className="w-3.5 h-3.5" /> Ketik Jawaban atau Pilih Opsi di Bawah:
          </label>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Ketik kata kerja yang tepat di sini..."
            className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      )}

      {/* Options List */}
      <div className="space-y-2.5">
        {currentQuestion?.options.map((opt, oIdx) => {
          const isSelected = currentRecord?.selectedOption === oIdx;
          const isCorrectKey = oIdx === currentQuestion.correctAnswerIndex;
          let btnStyle =
            'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-700/50';

          if (currentRecord?.isSubmitted) {
            if (isCorrectKey) {
              btnStyle =
                'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold';
            } else if (isSelected && !isCorrectKey) {
              btnStyle =
                'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-200 font-bold';
            }
          } else if (isSelected) {
            btnStyle =
              'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 dark:border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold';
          }

          return (
            <button
              key={oIdx}
              onClick={() => handleSelectOption(oIdx)}
              disabled={currentRecord?.isSubmitted}
              className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-xs shrink-0">
                  {String.fromCharCode(65 + oIdx)}
                </span>
                <span className="leading-snug">{opt}</span>
              </div>

              {currentRecord?.isSubmitted && (
                <div>
                  {isCorrectKey && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {isSelected && !isCorrectKey && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box (Revealed after submission) */}
      {currentRecord?.isSubmitted && (
        <div className="p-4 bg-gradient-to-r from-indigo-50/90 to-blue-50/90 dark:from-indigo-950/50 dark:to-blue-950/50 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-indigo-950 dark:text-indigo-200">
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Pembahasan Tata Bahasa & Kunci Jawaban:</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {currentQuestion?.explanation}
          </p>
          {currentQuestion?.correctAnswerText && (
            <div className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 pt-1 border-t border-indigo-100 dark:border-indigo-900/60">
              Jawaban Tepat: <span className="font-mono">{currentQuestion.correctAnswerText}</span>
            </div>
          )}
        </div>
      )}

      {/* Footer Action Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={activeIdx! === 0}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold disabled:opacity-40 transition-all flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Sebelumnya
          </button>
          <button
            onClick={startQuiz}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 font-semibold cursor-pointer ml-2"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        <div>
          {!currentRecord?.isSubmitted ? (
            <button
              onClick={handleSubmitCurrent}
              disabled={currentRecord?.selectedOption === null && textInput.trim().length === 0}
              className="bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-40 cursor-pointer shadow-xs"
            >
              Cek Jawaban
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>{activeIdx! + 1 < totalQuestions ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
