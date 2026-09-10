import React from 'react';
import { 
  Clock, 
  Flag, 
  Layers, 
  Settings2,
  BookOpen,
  FileQuestion,
  Columns
} from 'lucide-react';
import { UtbkQuestion } from '../../types';

interface UtbkMobileHeaderProps {
  currentQuestion: UtbkQuestion;
  currentRealIndex: number;
  totalQuestions: number;
  totalAnswered: number;
  flaggedCount: number;
  isFlagged: boolean;
  onToggleFlag: () => void;
  onOpenDrawer: () => void;
  onOpenTimerSettings: () => void;
  isTimerEnabled: boolean;
  timeLeftSeconds: number;
  isSirenAlert: boolean;
  isFiveMinuteWarning: boolean;
  formatTime: (secs: number) => string;
  mobileViewMode: 'split' | 'passage' | 'question';
  onChangeMobileViewMode: (mode: 'split' | 'passage' | 'question') => void;
  fontSize: 'sm' | 'base' | 'lg';
  onChangeFontSize: (size: 'sm' | 'base' | 'lg') => void;
}

export const UtbkMobileHeader: React.FC<UtbkMobileHeaderProps> = ({
  currentQuestion,
  currentRealIndex,
  totalQuestions,
  totalAnswered,
  flaggedCount,
  isFlagged,
  onToggleFlag,
  onOpenDrawer,
  onOpenTimerSettings,
  isTimerEnabled,
  timeLeftSeconds,
  isSirenAlert,
  isFiveMinuteWarning,
  formatTime,
  mobileViewMode,
  onChangeMobileViewMode,
  fontSize,
  onChangeFontSize,
}) => {
  const progressPercent = Math.round(((currentRealIndex + 1) / totalQuestions) * 100);

  return (
    <div className="lg:hidden sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs -mx-4 px-4 py-2.5 space-y-2 mb-4">
      {/* Top row: Timer & Quick status & Question drawer trigger */}
      <div className="flex items-center justify-between gap-2">
        {/* Number & Drawer trigger */}
        <button
          onClick={onOpenDrawer}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 font-bold text-xs active:scale-95 transition-transform"
        >
          <Layers className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>No. <b>{currentRealIndex + 1}</b>/{totalQuestions}</span>
          <span className="text-[10px] bg-indigo-200/80 px-1.5 py-0.2 rounded-md font-semibold text-indigo-800 ml-0.5">
            {totalAnswered}/{totalQuestions}
          </span>
        </button>

        {/* Difficulty Badge */}
        <div className="flex items-center gap-1">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border ${
            currentQuestion.difficulty === 'Sulit'
              ? 'bg-purple-50 text-purple-700 border-purple-200'
              : currentQuestion.difficulty === 'Mudah'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-blue-50 text-blue-700 border-blue-200'
          }`}>
            +{currentQuestion.pointWeight || 20} Pts
          </span>
        </div>

        {/* Timer Chip */}
        <div className="flex items-center gap-1.5">
          <div
            onClick={onOpenTimerSettings}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-mono font-black border cursor-pointer ${
              isSirenAlert
                ? 'bg-red-600 text-white border-red-700 animate-pulse'
                : isFiveMinuteWarning
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : isTimerEnabled
                ? 'bg-slate-900 text-teal-300 border-slate-800'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${isSirenAlert ? 'text-white' : 'text-teal-400'}`} />
            <span>{isTimerEnabled ? formatTime(timeLeftSeconds) : '∞ UNTIMED'}</span>
          </div>

          {/* Quick Ragu Flag */}
          <button
            onClick={onToggleFlag}
            className={`p-1.5 rounded-xl border transition-all ${
              isFlagged
                ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs'
                : 'bg-slate-50 text-slate-500 border-slate-200 active:bg-amber-50'
            }`}
            title="Tandai Ragu-ragu"
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div 
          className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* View Switcher: Bacaan / Soal / Split */}
      <div className="flex items-center justify-between gap-2 pt-0.5">
        <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold w-full max-w-[280px]">
          <button
            type="button"
            onClick={() => onChangeMobileViewMode('split')}
            className={`flex-1 py-1 px-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              mobileViewMode === 'split'
                ? 'bg-white text-indigo-700 shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Columns className="w-3 h-3" />
            <span className="text-[11px]">Lengkap</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeMobileViewMode('passage')}
            className={`flex-1 py-1 px-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              mobileViewMode === 'passage'
                ? 'bg-white text-indigo-700 shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span className="text-[11px]">Bacaan</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeMobileViewMode('question')}
            className={`flex-1 py-1 px-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              mobileViewMode === 'question'
                ? 'bg-white text-indigo-700 shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileQuestion className="w-3 h-3" />
            <span className="text-[11px]">Soal</span>
          </button>
        </div>

        {/* Font Zoomer */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold shrink-0">
          <button
            onClick={() => onChangeFontSize('sm')}
            className={`px-1.5 py-0.5 rounded-lg text-[10px] ${fontSize === 'sm' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-500'}`}
          >
            A-
          </button>
          <button
            onClick={() => onChangeFontSize('base')}
            className={`px-1.5 py-0.5 rounded-lg text-[10px] ${fontSize === 'base' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-500'}`}
          >
            A
          </button>
          <button
            onClick={() => onChangeFontSize('lg')}
            className={`px-1.5 py-0.5 rounded-lg text-[10px] ${fontSize === 'lg' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-500'}`}
          >
            A+
          </button>
        </div>
      </div>
    </div>
  );
};
