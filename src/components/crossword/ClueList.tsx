import React, { useState } from 'react';
import { CrosswordWord } from '../../data/crosswordLevels';
import {
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Volume2,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { playFeedbackSound } from '../../utils/feedbackSound';

interface ClueListProps {
  words: CrosswordWord[];
  activeWord: CrosswordWord | null;
  solvedWordKeys: Set<string>;
  onSelectWord: (word: CrosswordWord) => void;
  soundEnabled: boolean;
}

export const ClueList: React.FC<ClueListProps> = ({
  words,
  activeWord,
  solvedWordKeys,
  onSelectWord,
  soundEnabled,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'across' | 'down'>('all');

  const acrossWords = words.filter((w) => w.direction === 'across');
  const downWords = words.filter((w) => w.direction === 'down');

  const speakClue = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      if (soundEnabled) playFeedbackSound('click');
    }
  };

  const renderClueCard = (word: CrosswordWord) => {
    const wordKey = `${word.number}_${word.direction}`;
    const isSolved = solvedWordKeys.has(wordKey);
    const isCurrentActive =
      activeWord?.number === word.number && activeWord?.direction === word.direction;

    return (
      <button
        key={wordKey}
        type="button"
        onClick={() => {
          if (soundEnabled) playFeedbackSound('click');
          onSelectWord(word);
        }}
        className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3 relative group ${
          isCurrentActive
            ? 'bg-indigo-600 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400/40 scale-[1.01]'
            : isSolved
            ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            : 'bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'
        }`}
      >
        {/* Clue Number Badge */}
        <div
          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-black text-xs shadow-xs ${
            isCurrentActive
              ? 'bg-white text-indigo-700'
              : isSolved
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          {word.number}
        </div>

        {/* Clue Content */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <span
                className={`flex items-center gap-0.5 uppercase tracking-wider ${
                  isCurrentActive
                    ? 'text-indigo-200'
                    : isSolved
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-indigo-600 dark:text-indigo-400'
                }`}
              >
                {word.direction === 'across' ? (
                  <>
                    <ArrowRight className="w-3 h-3" /> Across
                  </>
                ) : (
                  <>
                    <ArrowDown className="w-3 h-3" /> Down
                  </>
                )}
              </span>
              <span
                className={`text-[10px] ${
                  isCurrentActive ? 'text-indigo-200' : 'text-slate-400'
                }`}
              >
                ({word.word.length} Letters)
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span
                className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                  isCurrentActive
                    ? 'bg-white/20 text-white'
                    : isSolved
                    ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                }`}
              >
                +{word.points} Pts
              </span>

              <button
                type="button"
                onClick={(e) => speakClue(e, word.clue)}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  isCurrentActive
                    ? 'text-indigo-100 hover:bg-white/20'
                    : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                title="Dengarkan Pelafalan Clue"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p
            className={`text-xs leading-relaxed ${
              isSolved && !isCurrentActive ? 'line-through opacity-70' : 'font-medium'
            }`}
          >
            {word.clue}
          </p>

          {isSolved && (
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              <span className="font-mono uppercase tracking-wider">{word.word}</span>
            </div>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {/* Clues Header & Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm text-slate-900 dark:text-white">
            Daftar Petunjuk (Clues)
          </span>
          <span className="text-[11px] font-bold text-slate-400">
            ({solvedWordKeys.size}/{words.length} Selesai)
          </span>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Semua
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('across')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'across'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Across (→)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('down')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'down'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Down (↓)
          </button>
        </div>
      </div>

      {/* Clues Scroll Area */}
      <div className="space-y-4 max-h-[520px] overflow-y-auto custom-scrollbar pr-1">
        {(activeTab === 'all' || activeTab === 'across') && (
          <div className="space-y-2">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 px-1">
              <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
              <span>Mendatar (Across) · {acrossWords.length} Soal</span>
            </div>
            <div className="space-y-2">
              {acrossWords.map(renderClueCard)}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'down') && (
          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 px-1">
              <ArrowDown className="w-3.5 h-3.5 text-indigo-500" />
              <span>Menurun (Down) · {downWords.length} Soal</span>
            </div>
            <div className="space-y-2">
              {downWords.map(renderClueCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
