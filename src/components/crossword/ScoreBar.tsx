import React from 'react';
import { CrosswordLevel } from '../../data/crosswordLevels';
import {
  Trophy,
  ArrowLeft,
  Volume2,
  VolumeX,
  Lightbulb,
  RotateCcw,
  Timer,
  CheckCircle2,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { playFeedbackSound } from '../../utils/feedbackSound';

interface ScoreBarProps {
  level: CrosswordLevel;
  currentScore: number;
  solvedWordsCount: number;
  totalWordsCount: number;
  elapsedSeconds: number;
  hintsRemaining: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onBackToLevels: () => void;
  onUseHint: () => void;
  onResetGrid: () => void;
}

export const ScoreBar: React.FC<ScoreBarProps> = ({
  level,
  currentScore,
  solvedWordsCount,
  totalWordsCount,
  elapsedSeconds,
  hintsRemaining,
  soundEnabled,
  onToggleSound,
  onBackToLevels,
  onUseHint,
  onResetGrid,
}) => {
  const scorePercent = Math.min(100, Math.round((currentScore / level.totalPoints) * 100));
  const wordsPercent = Math.min(100, Math.round((solvedWordsCount / totalWordsCount) * 100));

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getCefrColor = (cefr: string) => {
    switch (cefr) {
      case 'A1':
        return 'bg-emerald-500 text-white';
      case 'A2':
        return 'bg-teal-500 text-white';
      case 'B1':
        return 'bg-blue-500 text-white';
      case 'B2':
        return 'bg-indigo-500 text-white';
      case 'C1':
        return 'bg-purple-500 text-white';
      case 'C2':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      {/* Top Row: Back Navigation, CEFR Badge & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) playFeedbackSound('click');
              onBackToLevels();
            }}
            className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            title="Kembali ke Pilihan Level"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Peta Level</span>
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${getCefrColor(
                level.cefr
              )}`}
            >
              {level.cefr}
            </span>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                {level.title}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {level.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar: Sound, Hint, Reset */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                : 'bg-rose-50 dark:bg-rose-950 text-rose-500 border-rose-200 dark:border-rose-800'
            }`}
            title={soundEnabled ? 'Matikan Efek Suara' : 'Nyalakan Efek Suara'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Hint Power-up */}
          <button
            type="button"
            onClick={onUseHint}
            disabled={hintsRemaining <= 0}
            className="px-3 py-2 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 rounded-xl font-bold text-xs transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
            title="Buka 1 Huruf pada Kotak yang Aktif"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Petunjuk ({hintsRemaining})</span>
          </button>

          {/* Reset Grid */}
          <button
            type="button"
            onClick={onResetGrid}
            className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            title="Hapus Huruf Belum Terkunci"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        {/* Metric 1: Live Score */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" /> Prestige
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-mono">
              {scorePercent}%
            </span>
          </div>
          <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-mono">
            {currentScore} <span className="text-xs text-slate-400">/ {level.totalPoints} Prestige</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${scorePercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Words Solved */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Kata Selesai
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono">
              {wordsPercent}%
            </span>
          </div>
          <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-mono">
            {solvedWordsCount} <span className="text-xs text-slate-400">/ {totalWordsCount} Kata</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${wordsPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Passing Threshold */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Syarat Lulus Level
          </div>
          <div className="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            Min. {Math.ceil(level.totalPoints * 0.7)} Poin (70%)
          </div>
          <p className="text-[10px] text-slate-400">
            {currentScore >= Math.ceil(level.totalPoints * 0.7)
              ? '✅ Syarat Lulus Terpenuhi!'
              : '🎯 Belum Lulus'}
          </p>
        </div>

        {/* Metric 4: Timer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-blue-500" /> Waktu Bermain
          </div>
          <div className="font-black text-sm sm:text-base text-slate-900 dark:text-white font-mono">
            {formatTime(elapsedSeconds)}
          </div>
          <p className="text-[10px] text-slate-400">Santai & Teliti</p>
        </div>
      </div>
    </div>
  );
};
