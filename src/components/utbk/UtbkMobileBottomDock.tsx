import React from 'react';
import { ChevronLeft, ChevronRight, Send, Layers, Flag } from 'lucide-react';

interface UtbkMobileBottomDockProps {
  currentIndex: number;
  totalQuestions: number;
  totalAnswered: number;
  isFlagged: boolean;
  isLastQuestion: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleFlag: () => void;
  onOpenDrawer: () => void;
  onSubmitExam: () => void;
}

export const UtbkMobileBottomDock: React.FC<UtbkMobileBottomDockProps> = ({
  currentIndex,
  totalQuestions,
  totalAnswered,
  isFlagged,
  isLastQuestion,
  onPrev,
  onNext,
  onToggleFlag,
  onOpenDrawer,
  onSubmitExam,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 py-2.5 shadow-2xl">
      <div className="max-w-lg mx-auto flex items-center justify-between gap-2">
        {/* Prev button */}
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="h-11 px-3 bg-slate-100 text-slate-700 disabled:opacity-30 rounded-xl font-bold text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer border border-slate-200 shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        {/* Flag Ragu-Ragu toggle */}
        <button
          onClick={onToggleFlag}
          className={`h-11 px-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all shrink-0 cursor-pointer ${
            isFlagged
              ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs'
              : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}
        >
          <Flag className={`w-4 h-4 ${isFlagged ? 'fill-current' : ''}`} />
          <span className="text-[11px]">{isFlagged ? 'Ragu' : 'Tandai'}</span>
        </button>

        {/* Number Drawer trigger */}
        <button
          onClick={onOpenDrawer}
          className="h-11 px-3 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-xl text-xs font-black flex items-center gap-1.5 active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>{currentIndex + 1}/{totalQuestions}</span>
        </button>

        {/* Next or Submit button */}
        {isLastQuestion ? (
          <button
            onClick={onSubmitExam}
            className="h-11 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 active:scale-95 transition-all shadow-md cursor-pointer flex-1 justify-center animate-pulse"
          >
            <Send className="w-4 h-4" />
            <span>Kumpulkan</span>
          </button>
        ) : (
          <button
            onClick={onNext}
            className="h-11 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black flex items-center gap-1 active:scale-95 transition-all shadow-xs cursor-pointer flex-1 justify-center"
          >
            <span>Lanjut</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
