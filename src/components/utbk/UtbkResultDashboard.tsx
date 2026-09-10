import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Flag, 
  BarChart3, 
  Clock, 
  RotateCcw, 
  Flame, 
  ListOrdered, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { UtbkQuestion } from '../../types';

interface UtbkResultDashboardProps {
  finalScore: number;
  maxScore: number;
  timeSpentSeconds: number;
  accuracyPercentage: number;
  totalAnswered: number;
  correctCount: number;
  flaggedCount: number;
  incorrectQuestions: number[];
  correctQuestions: number[];
  unansweredQuestions: number[];
  difficultyStats: {
    Mudah: { total: number; correct: number; maxPoints: number; earnedPoints: number };
    Sedang: { total: number; correct: number; maxPoints: number; earnedPoints: number };
    Sulit: { total: number; correct: number; maxPoints: number; earnedPoints: number };
  };
  onJumpToPembahasan: (questionIndex: number) => void;
  onResetPractice: (subset?: number[]) => void;
  onOpenPembahasanTab: () => void;
  formatTime: (secs: number) => string;
}

export const UtbkResultDashboard: React.FC<UtbkResultDashboardProps> = ({
  finalScore,
  maxScore,
  timeSpentSeconds,
  accuracyPercentage,
  totalAnswered,
  correctCount,
  flaggedCount,
  incorrectQuestions,
  correctQuestions,
  unansweredQuestions,
  difficultyStats,
  onJumpToPembahasan,
  onResetPractice,
  onOpenPembahasanTab,
  formatTime,
}) => {
  // Determine PTN status
  let ptnStatus = '💪 Perlu Latihan Tambahan';
  let ptnDescription = 'Tingkatkan pemahaman kosakata dan strategi skimming teks untuk mendongkrak skor target.';
  let ptnBadgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';

  if (finalScore >= 750) {
    ptnStatus = '🌟 Sangat Kompetitif (Target PTN Top 3)';
    ptnDescription = 'Skor luar biasa! Sangat aman untuk pilihan jurusan favorit Saintek & Soshum di UI, ITB, UGM, Unair.';
    ptnBadgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  } else if (finalScore >= 600) {
    ptnStatus = '👍 Lolos Ambang Batas PTN Favorit';
    ptnDescription = 'Peluang besar lulus di mayoritas jurusan universitas negeri ternama seluruh Indonesia.';
    ptnBadgeColor = 'bg-teal-500/20 text-teal-300 border-teal-500/30';
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl p-5 sm:p-6 border border-indigo-800 flex flex-col lg:flex-row items-center justify-between gap-5 shadow-md">
        <div className="space-y-2 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[11px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ujian CBT Selesai & Dinilai</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-brand tracking-wide">
            Hasil Rekapitulasi Nilai UTBK SNBT 2026
          </h2>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
            {ptnDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 justify-center lg:justify-start text-xs text-slate-300">
            <span className="flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5 text-teal-400" /> Waktu: <b>{formatTime(timeSpentSeconds)}</b>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Akurasi: <b>{accuracyPercentage}%</b>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Terjawab: <b>{totalAnswered}/50</b>
            </span>
          </div>
        </div>

        {/* Score Box */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-4 bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-indigo-700/60 shadow-inner">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Perolehan Skor UTBK</div>
            <div className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight my-0.5 font-mono">
              {finalScore} <span className="text-xs sm:text-sm text-slate-400 font-semibold font-sans">/ {maxScore}</span>
            </div>
            <div className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md border mt-1 ${ptnBadgeColor}`}>
              {ptnStatus}
            </div>
          </div>
          <Award className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 shrink-0" />
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
          <div className="text-xs font-bold text-emerald-800 flex items-center justify-between">
            <span>Soal Benar</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-950 font-mono">
            {correctCount} <span className="text-xs font-medium text-emerald-700 font-sans">/ 50</span>
          </div>
          <div className="text-[10px] text-emerald-700 font-bold">+{finalScore} Poin</div>
        </div>

        <div className="p-3.5 sm:p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-1">
          <div className="text-xs font-bold text-rose-800 flex items-center justify-between">
            <span>Soal Salah</span>
            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-rose-950 font-mono">
            {incorrectQuestions.length} <span className="text-xs font-medium text-rose-700 font-sans">/ 50</span>
          </div>
          <div className="text-[10px] text-rose-700 font-semibold truncate">
            {incorrectQuestions.length > 0 ? 'Perlu evaluasi' : 'Sempurna!'}
          </div>
        </div>

        <div className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
          <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Belum Terisi</span>
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
            {unansweredQuestions.length} <span className="text-xs font-medium text-slate-500 font-sans">/ 50</span>
          </div>
          <div className="text-[10px] text-slate-500 font-medium">50 - {totalAnswered} soal</div>
        </div>

        <div className="p-3.5 sm:p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-1">
          <div className="text-xs font-bold text-amber-800 flex items-center justify-between">
            <span>Ragu-Ragu</span>
            <Flag className="w-4 h-4 text-amber-600 shrink-0" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-950 font-mono">
            {flaggedCount} <span className="text-xs font-medium text-amber-700 font-sans">Soal</span>
          </div>
          <div className="text-[10px] text-amber-700 font-medium">Ditandai</div>
        </div>
      </div>

      {/* Breakdown by Difficulty */}
      <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-indigo-600" /> Breakdown Tingkat Kesulitan & Bobot IRT
          </h3>
          <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">Standar SNPMB IRT</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Mudah */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-700 px-1.5 py-0.5 bg-emerald-50 rounded text-[11px]">
                Mudah (15 Pts)
              </span>
              <span className="font-bold text-slate-700">
                {difficultyStats.Mudah.correct}/{difficultyStats.Mudah.total}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full"
                style={{ width: `${(difficultyStats.Mudah.correct / (difficultyStats.Mudah.total || 1)) * 100}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500 flex justify-between font-medium">
              <span>Raihan: <b>{difficultyStats.Mudah.earnedPoints}</b></span>
              <span>Maks: {difficultyStats.Mudah.maxPoints}</span>
            </div>
          </div>

          {/* Sedang */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-700 px-1.5 py-0.5 bg-blue-50 rounded text-[11px]">
                Sedang (20 Pts)
              </span>
              <span className="font-bold text-slate-700">
                {difficultyStats.Sedang.correct}/{difficultyStats.Sedang.total}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full"
                style={{ width: `${(difficultyStats.Sedang.correct / (difficultyStats.Sedang.total || 1)) * 100}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500 flex justify-between font-medium">
              <span>Raihan: <b>{difficultyStats.Sedang.earnedPoints}</b></span>
              <span>Maks: {difficultyStats.Sedang.maxPoints}</span>
            </div>
          </div>

          {/* Sulit */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-purple-700 px-1.5 py-0.5 bg-purple-50 rounded text-[11px]">
                Sulit (25 Pts)
              </span>
              <span className="font-bold text-slate-700">
                {difficultyStats.Sulit.correct}/{difficultyStats.Sulit.total}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div 
                className="bg-purple-500 h-1.5 rounded-full"
                style={{ width: `${(difficultyStats.Sulit.correct / (difficultyStats.Sulit.total || 1)) * 100}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500 flex justify-between font-medium">
              <span>Raihan: <b>{difficultyStats.Sulit.earnedPoints}</b></span>
              <span>Maks: {difficultyStats.Sulit.maxPoints}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Mistake Review Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Incorrect list */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" /> Soal yang Salah ({incorrectQuestions.length})
            </h3>
            <span className="text-[10px] text-slate-500">Ketuk nomor untuk pelajari</span>
          </div>

          {incorrectQuestions.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
              {incorrectQuestions.map(no => (
                <button
                  key={no}
                  onClick={() => onJumpToPembahasan(no - 1)}
                  className="px-2.5 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-1 active:scale-95"
                >
                  <span>No. {no}</span>
                  <ArrowRight className="w-3 h-3 opacity-80" />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-700 font-bold p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
              🎉 Luar biasa! Tidak ada nomor soal yang salah (100% Benar).
            </p>
          )}
        </div>

        {/* Correct list */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Soal yang Benar ({correctQuestions.length})
            </h3>
            <span className="text-[10px] text-slate-500">Ketuk untuk lihat kunci</span>
          </div>

          {correctQuestions.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
              {correctQuestions.map(no => (
                <button
                  key={no}
                  onClick={() => onJumpToPembahasan(no - 1)}
                  className="px-2.5 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-bold hover:bg-emerald-200 transition-all cursor-pointer active:scale-95"
                >
                  No. {no}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500">Belum ada jawaban benar.</p>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onResetPractice()}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi Tryout Lengkap</span>
          </button>

          {incorrectQuestions.length > 0 && (
            <button
              onClick={() => onResetPractice(incorrectQuestions.map(no => no - 1))}
              className="w-full sm:w-auto px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Remedial Soal Salah ({incorrectQuestions.length})</span>
            </button>
          )}
        </div>

        <button
          onClick={onOpenPembahasanTab}
          className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <ListOrdered className="w-4 h-4" />
          <span>Buka Kunci Jawaban & Pembahasan Lengkap</span>
        </button>
      </div>
    </div>
  );
};
