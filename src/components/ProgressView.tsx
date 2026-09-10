import React from 'react';
import { StudentProfile } from '../types';
import { Trophy, Award, BookOpen, Sparkles, Target, TrendingUp, Zap, Crown, RefreshCw } from 'lucide-react';
import { parseUtbkScore, getScoreCategory } from './UtbkScoreSelector';
import { StreakFlameAnimation } from './streak/StreakFlameAnimation';
import { MarqueeText } from './streak/MarqueeText';
import { getStreakTier, getNextStreakTier } from './streak/streakTiers';
import { calculateUniversalPrestige } from '../utils/prestigeManager';

interface ProgressViewProps {
  profile: StudentProfile;
  onUpdateStreak?: (newDays: number) => void;
  onOpenStreakGallery?: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  profile,
  onUpdateStreak,
  onOpenStreakGallery,
}) => {
  const totalLessons = 16;
  const progressPct = Math.round((profile.completedLessons.length / totalLessons) * 100);
  const scoreNum = parseUtbkScore(profile.targetUtbkScore);
  const scoreInfo = getScoreCategory(scoreNum);
  const currentTier = getStreakTier(profile.streakDays);
  const { nextTier, daysRemaining } = getNextStreakTier(profile.streakDays);
  const { totalPrestige } = calculateUniversalPrestige(profile);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold mb-2">
            <Trophy className="w-3.5 h-3.5" /> Laporan Akademik Siswa
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Track Progres Belajar</h1>
          <p className="text-slate-300 text-xs mt-1">
            Pantau pencapaian, jumlah kuis terselesaikan, dan statistik kesiapan UTBK Anda.
          </p>
        </div>

        <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-3 text-left sm:text-right shrink-0">
          <div className="text-xs font-black text-white">{profile.name}</div>
          <div className="text-[11px] text-amber-400 font-bold mt-0.5">
            Kelas {profile.classGrade} · {profile.educationLevel || 'SMA'} {profile.major || (profile.educationLevel === 'SMK' ? 'TKJ' : 'MIPA')}
          </div>
          {profile.schoolName && (
            <div className="text-[10px] text-slate-300 truncate max-w-[200px]">
              🏫 {profile.schoolName}
            </div>
          )}
        </div>
      </div>

      {/* Universal Prestige Spotlight Card (Display-Only) */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-amber-500/30 p-5 text-white shadow-md flex items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center font-mono font-black shadow-xs shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-amber-400">
              UNIVERSAL PRESTIGE
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white mt-0.5">
              {totalPrestige.toLocaleString('id-ID')}{' '}
              <span className="text-xs font-sans font-bold text-slate-400">PTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Tenses Tuntas</span>
            <BookOpen className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {profile.completedLessons.length} <span className="text-xs font-medium text-slate-400">/ 16</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Rata-Rata Nilai</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">88%</div>
          <span className="text-[11px] text-emerald-600 font-bold">Sangat Baik (A)</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Kosakata Dikuasai</span>
            <Sparkles className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{profile.vocabularyMastered}</div>
          <span className="text-[11px] text-slate-400 font-medium">Kata Akademik</span>
        </div>

        {/* Interactive Streak Card */}
        <div 
          onClick={onOpenStreakGallery}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2 cursor-pointer hover:border-amber-300 transition-all group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Learning Streak (Evolution)</span>
            <Zap className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-black text-amber-900">
              {profile.streakDays} <span className="text-xs font-bold text-slate-500">{profile.streakDays === 1 ? 'Day' : 'Days'}</span>
            </div>
            <StreakFlameAnimation
              streakDays={profile.streakDays}
              size="sm"
              showLabel={false}
              interactive={false}
            />
          </div>
          <div className="text-[11px] text-amber-700 font-medium flex items-center justify-between gap-2 overflow-hidden">
            <div className="flex-1 min-w-0 font-bold truncate">
              <span className="text-indigo-600 font-black mr-1">Rank {currentTier.rankRoman}:</span>
              <span>{currentTier.name}</span>
            </div>
            <span className="text-[10px] underline font-bold shrink-0 text-indigo-600">Lihat Galeri</span>
          </div>
        </div>
      </div>

      {/* Target UTBK Card with Rich Insights */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span>Status Target Skor & Kesiapan UTBK 2026</span>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
            {scoreInfo.percentile}
          </span>
        </h3>
        
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs text-slate-500 font-medium">Target Skor Subtes Literasi Bahasa Inggris:</div>
            <div className="flex items-baseline gap-2">
              <span className="font-black text-indigo-950 text-2xl">{scoreNum}</span>
              <span className="text-xs font-semibold text-indigo-600">/ 820 Poin Maksimal</span>
            </div>
            <div className="text-xs font-bold text-slate-700">{scoreInfo.tier}</div>
          </div>
          <div className="px-3.5 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold text-right sm:text-left">
            <div>Estimasi Peluang Jurusan:</div>
            <div className="text-[11px] font-normal text-emerald-700 mt-0.5">{scoreInfo.targetEstimate}</div>
          </div>
        </div>

        <p className="text-xs text-slate-600 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/60 leading-relaxed flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <span>{scoreInfo.description}</span>
        </p>
      </div>
    </div>
  );
};
