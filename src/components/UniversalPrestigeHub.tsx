import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  RefreshCw,
  CheckCircle2,
  BookOpen,
  Gamepad2,
  Target,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudentProfile } from '../types';
import {
  calculateUniversalPrestige,
  unifyUniversalPrestige,
} from '../utils/prestigeManager';
import { playFeedbackSound } from '../utils/feedbackSound';

interface UniversalPrestigeHubProps {
  profile: StudentProfile;
  onProfileUpdate: (updated: StudentProfile) => void;
  onNavigateToTab?: (tab: string) => void;
  onClose?: () => void;
}

export const UniversalPrestigeHub: React.FC<UniversalPrestigeHubProps> = ({
  profile,
  onProfileUpdate,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedDelta, setSyncedDelta] = useState<number | null>(null);

  const { totalPrestige, breakdown } = calculateUniversalPrestige(profile);

  const handleSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    playFeedbackSound('sparkle');

    setTimeout(() => {
      const result = unifyUniversalPrestige(profile);
      onProfileUpdate(result.updatedProfile);
      playFeedbackSound('tier_apex');

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#6366F1', '#10B981'],
        });
      } catch {
        // safe fallback
      }

      setSyncedDelta(result.gainedDelta);
      setIsSyncing(false);

      setTimeout(() => setSyncedDelta(null), 3000);
    }, 400);
  };

  const metrics = [
    {
      label: 'Tenses & Kuis',
      value: breakdown.grammar,
      icon: <BookOpen className="w-3.5 h-3.5 text-indigo-400" />,
    },
    {
      label: 'Kosakata',
      value: breakdown.vocab,
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
    },
    {
      label: 'Mini Games',
      value: breakdown.games,
      icon: <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />,
    },
    {
      label: 'Simulasi UTBK',
      value: breakdown.utbk,
      icon: <Target className="w-3.5 h-3.5 text-rose-400" />,
    },
    {
      label: 'Streak Belajar',
      value: breakdown.streak,
      icon: <Flame className="w-3.5 h-3.5 text-orange-400" />,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Hero Prestige Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-amber-500/30 p-6 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-amber-400/90 block">
              UNIVERSAL PRESTIGE
            </span>
            <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 mt-1">
              {totalPrestige.toLocaleString('id-ID')}
              <span className="text-sm font-sans font-semibold text-slate-400 ml-2">PTS</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0 ${
              isSyncing
                ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-wait'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md border border-amber-300/40'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkronkan Poin'}</span>
          </button>
        </div>

        {/* Sync Toast Notification */}
        <AnimatePresence>
          {syncedDelta !== null && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-emerald-400"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Poin tersinkronisasi. {syncedDelta > 0 ? `+${syncedDelta} PTS baru ditambahkan.` : 'Seluruh poin sudah termutakhir.'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rincian Poin Singkat */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between"
          >
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
              {item.icon}
              <span className="text-[11px] font-semibold truncate">{item.label}</span>
            </div>
            <span className="text-base font-black font-mono text-slate-900 dark:text-slate-100">
              {item.value.toLocaleString('id-ID')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
