import React, { useEffect } from 'react';
import { CrosswordLevel } from '../../data/crosswordLevels';
import {
  Trophy,
  Star,
  PartyPopper,
  ArrowRight,
  RotateCcw,
  MapPin,
  CheckCircle2,
  Share2,
  Copy,
  Sparkles,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playFeedbackSound } from '../../utils/feedbackSound';

interface LevelCompleteModalProps {
  level: CrosswordLevel;
  score: number;
  elapsedSeconds: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  onBackToMap: () => void;
  soundEnabled: boolean;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  level,
  score,
  elapsedSeconds,
  hasNextLevel,
  onNextLevel,
  onReplay,
  onBackToMap,
  soundEnabled,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    // Grand celebration confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.6 },
        });
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.6 },
        });
      }, 300);
    } catch {
      // Ignore
    }

    if (soundEnabled) {
      playFeedbackSound('tada');
    }
  }, [soundEnabled]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const percentage = Math.min(100, Math.round((score / level.totalPoints) * 100));
  const stars = percentage >= 95 ? 3 : percentage >= 70 ? 2 : 1;

  const handleCopySummary = () => {
    const text = `🏆 *Teka-Teki Silang CEFR: Letterally Stuck*
━━━━━━━━━━━━━━━━━━━━
🎯 Level: ${level.title} (${level.cefr})
⭐ Bintang: ${'⭐'.repeat(stars)}
💯 Prestige: +${score} / ${level.totalPoints} PTS (${percentage}%)
📝 Kata Terpecahkan: ${level.words.length}/${level.words.length} Kata
⏱️ Waktu Pengerjaan: ${formatTime(elapsedSeconds)}
━━━━━━━━━━━━━━━━━━━━
Think Smart English — PT Tiga Serangkai`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      if (soundEnabled) playFeedbackSound('click');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-2 border-amber-500/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl space-y-6 relative overflow-hidden text-center">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Celebration Trophy & Star Rating */}
        <div className="space-y-3 relative z-10">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/30 animate-bounce">
            <Trophy className="w-10 h-10 fill-current" />
          </div>

          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                className={`w-8 h-8 ${
                  starIdx <= stars
                    ? 'text-amber-400 fill-amber-400 drop-shadow-md animate-pulse'
                    : 'text-slate-700'
                }`}
              />
            ))}
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Level Complete!</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {level.title}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 mt-1">
              Luar biasa! Seluruh kata dalam teka-teki silang berhasil kamu pecahkan dengan sempurna.
            </p>
          </div>
        </div>

        {/* Performance Metric Cards */}
        <div className="grid grid-cols-3 gap-3 relative z-10">
          <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Prestige</span>
            <span className="text-base sm:text-lg font-black text-amber-400 font-mono">
              +{score} PTS
            </span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Kata Terjawab</span>
            <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">
              {level.words.length}/{level.words.length}
            </span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Waktu</span>
            <span className="text-base sm:text-lg font-black text-blue-400 font-mono">
              {formatTime(elapsedSeconds)}
            </span>
          </div>
        </div>

        {/* Unlocked Message */}
        {hasNextLevel ? (
          <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-xs font-bold text-emerald-200 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Level {level.level + 1} Berhasil Terbuka! Siap untuk tantangan berikutnya?</span>
          </div>
        ) : (
          <div className="p-3.5 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-xs font-bold text-amber-200 flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>🎉 Selamat! Kamu telah menamatkan seluruh 6 Level CEFR Letterally Stuck!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5 relative z-10 pt-2">
          {hasNextLevel ? (
            <button
              type="button"
              onClick={onNextLevel}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Lanjut ke Level {level.level + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onBackToMap}
              className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-2xl text-sm transition-all shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Trophy className="w-4 h-4" />
              <span>Lihat Rekap Peta Level CEFR</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onReplay}
              className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Main Ulang</span>
            </button>

            <button
              type="button"
              onClick={onBackToMap}
              className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Peta Level</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopySummary}
            className="w-full py-2 bg-indigo-900/40 hover:bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Rekap Skor (Bagikan)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
