import React, { useState } from 'react';
import { X, Send, Layers, Check, Flag, HelpCircle } from 'lucide-react';
import { UtbkQuestion } from '../../types';

interface UtbkQuestionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  questions: UtbkQuestion[];
  selectedIndex: number;
  userAnswers: Record<string, number>;
  flaggedQuestions: Record<string, boolean>;
  onSelectQuestion: (index: number) => void;
  onSubmitExam: () => void;
}

export const UtbkQuestionDrawer: React.FC<UtbkQuestionDrawerProps> = ({
  isOpen,
  onClose,
  questions,
  selectedIndex,
  userAnswers,
  flaggedQuestions,
  onSelectQuestion,
  onSubmitExam,
}) => {
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered' | 'flagged'>('all');

  if (!isOpen) return null;

  const total = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const unansweredCount = total - answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center bg-slate-950/70 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[85vh] sm:max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Daftar Nomor Soal ({total})</h3>
              <p className="text-[11px] text-slate-500 font-medium">Ketuk nomor untuk langsung lompat ke soal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-slate-100/70 border-b border-slate-200 flex gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Semua ({total})
          </button>
          <button
            onClick={() => setFilter('answered')}
            className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
              filter === 'answered'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-white text-emerald-700 border border-emerald-200'
            }`}
          >
            <Check className="w-3 h-3" />
            <span>Terjawab ({answeredCount})</span>
          </button>
          <button
            onClick={() => setFilter('flagged')}
            className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
              filter === 'flagged'
                ? 'bg-amber-500 text-white shadow-2xs'
                : 'bg-white text-amber-700 border border-amber-200'
            }`}
          >
            <Flag className="w-3 h-3" />
            <span>Ragu ({flaggedCount})</span>
          </button>
          <button
            onClick={() => setFilter('unanswered')}
            className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
              filter === 'unanswered'
                ? 'bg-slate-700 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            <HelpCircle className="w-3 h-3" />
            <span>Belum ({unansweredCount})</span>
          </button>
        </div>

        {/* Grid of 50 numbers */}
        <div className="p-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
            {questions.map((q, idx) => {
              const qId = q.id;
              const isCurrent = idx === selectedIndex;
              const isAnswered = userAnswers[qId] !== undefined;
              const isFlagged = !!flaggedQuestions[qId];

              // Filtering
              if (filter === 'answered' && !isAnswered) return null;
              if (filter === 'unanswered' && isAnswered) return null;
              if (filter === 'flagged' && !isFlagged) return null;

              let btnCls = 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';

              if (isCurrent) {
                btnCls = 'bg-indigo-600 text-white font-black border-indigo-700 ring-2 ring-indigo-300 shadow-xs scale-105';
              } else if (isFlagged) {
                btnCls = 'bg-amber-400 text-amber-950 font-bold border-amber-500 shadow-xs';
              } else if (isAnswered) {
                btnCls = 'bg-emerald-500 text-white font-bold border-emerald-600 shadow-2xs';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(idx);
                    onClose();
                  }}
                  className={`h-11 rounded-xl border text-xs flex flex-col items-center justify-center relative transition-all active:scale-95 cursor-pointer ${btnCls}`}
                >
                  <span className="font-bold text-xs">{idx + 1}</span>
                  {isAnswered && !isCurrent && (
                    <span className="text-[9px] font-semibold opacity-90">
                      {String.fromCharCode(65 + (userAnswers[qId] || 0))}
                    </span>
                  )}
                  {isFlagged && !isCurrent && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-600 rounded-full border border-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 font-semibold pt-4 mt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-indigo-600 shrink-0" />
              <span>Nomor Aktif</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-emerald-500 shrink-0" />
              <span>Terisi ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-amber-400 shrink-0" />
              <span>Ragu-Ragu ({flaggedCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-slate-200 shrink-0" />
              <span>Belum Terisi ({unansweredCount})</span>
            </div>
          </div>
        </div>

        {/* Submit Button in Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={() => {
              onClose();
              onSubmitExam();
            }}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Kumpulkan & Selesaikan Ujian Sekarang</span>
          </button>
        </div>
      </div>
    </div>
  );
};
