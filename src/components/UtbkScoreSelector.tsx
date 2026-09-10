import React from 'react';
import { Target, Sparkles, TrendingUp, Award, Check } from 'lucide-react';

interface UtbkScoreSelectorProps {
  value: number | string;
  onChange: (score: number) => void;
  compact?: boolean;
}

export const SCORE_STEPS = [450, 500, 550, 600, 650, 700, 750, 800, 820];

export function parseUtbkScore(val: number | string | undefined): number {
  if (typeof val === 'number') {
    return Math.min(820, Math.max(450, val));
  }
  if (!val) return 700;
  const num = parseInt(val.replace(/\D/g, ''), 10);
  if (isNaN(num)) return 700;
  return Math.min(820, Math.max(450, num));
}

export function getScoreCategory(score: number): {
  tier: string;
  badgeColor: string;
  badgeBg: string;
  badgeBorder: string;
  description: string;
  targetEstimate: string;
  percentile: string;
} {
  if (score >= 800) {
    return {
      tier: 'Target Prestasi Puncak (Top Tier)',
      badgeColor: 'text-amber-700',
      badgeBg: 'bg-amber-50',
      badgeBorder: 'border-amber-200',
      description: 'Skor impian kompetisi tertinggi untuk Fakultas Kedokteran (UI/UGM/Unair), STEI ITB, & FTI.',
      targetEstimate: 'Kedokteran UI/UGM, STEI ITB, Aktuaria',
      percentile: 'Top 1% Nasional',
    };
  }
  if (score >= 700) {
    return {
      tier: 'Target Unggulan PTN Top 3',
      badgeColor: 'text-indigo-700',
      badgeBg: 'bg-indigo-50',
      badgeBorder: 'border-indigo-200',
      description: 'Sangat aman dan kompetitif untuk jurusan favorit rumpun Saintek & Soshum di UI, ITB, UGM, ITS, Undip.',
      targetEstimate: 'Ilmu Komputer, Hukum UI, Manajemen UGM',
      percentile: 'Top 5% - 8% Nasional',
    };
  }
  if (score >= 600) {
    return {
      tier: 'Target Kompetitif PTN Favorit',
      badgeColor: 'text-emerald-700',
      badgeBg: 'bg-emerald-50',
      badgeBorder: 'border-emerald-200',
      description: 'Peluang besar lulus di mayoritas jurusan favorit universitas negeri ternama seluruh Indonesia.',
      targetEstimate: 'Teknik, Psikologi, Hubungan Internasional, Akuntansi',
      percentile: 'Top 15% - 25% Nasional',
    };
  }
  if (score >= 500) {
    return {
      tier: 'Target Standar Kelulusan PTN',
      badgeColor: 'text-sky-700',
      badgeBg: 'bg-sky-50',
      badgeBorder: 'border-sky-200',
      description: 'Di atas rata-rata nilai nasional (~520). Aman untuk berbagai program studi pilihan di berbagai PTN.',
      targetEstimate: 'Pendidikan, Sastra, Agroteknologi, Ilmu Komunikasi',
      percentile: 'Top 40% - 50% Nasional',
    };
  }
  return {
    tier: 'Target Fondasi & Penguatan Awal',
    badgeColor: 'text-slate-700',
    badgeBg: 'bg-slate-100',
    badgeBorder: 'border-slate-300',
    description: 'Fokus pada pemahaman konsep dasar grammar 16 tenses, reading passages pendek, dan kosakata harian.',
    targetEstimate: 'Fondasi persiapan materi dasar UTBK SNBT',
    percentile: 'Standar Awal',
  };
}

export const UtbkScoreSelector: React.FC<UtbkScoreSelectorProps> = ({
  value,
  onChange,
  compact = false,
}) => {
  const currentScore = parseUtbkScore(value);
  const info = getScoreCategory(currentScore);

  // Percentage on slider from min 450 to max 820
  const minScore = 450;
  const maxScore = 820;
  const progressPercent = Math.min(100, Math.max(0, ((currentScore - minScore) / (maxScore - minScore)) * 100));

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = Number(e.target.value);
    // Find closest step in SCORE_STEPS
    const closest = SCORE_STEPS.reduce((prev, curr) =>
      Math.abs(curr - rawVal) < Math.abs(prev - rawVal) ? curr : prev
    );
    onChange(closest);
  };

  const presetChips = [
    { score: 550, label: '550 (Standar PTN)' },
    { score: 650, label: '650 (Favorit)' },
    { score: 750, label: '750 (Top 3 PTN)' },
    { score: 820, label: '820 (Maksimal)' },
  ];

  return (
    <div className="space-y-3.5 select-none">
      {/* Header Display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">Pilih Target Skor UTBK / SNBT</span>
            <span className="text-[11px] text-slate-500 font-medium">Rentang rata-rata nasional: 200 – 820</span>
          </div>
        </div>

        {/* Selected Score Highlight Tag */}
        <div className="text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 text-white rounded-xl shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-sm font-black tracking-wide">{currentScore}</span>
            <span className="text-[10px] text-indigo-200 font-medium">poin</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Line Bar Container */}
      <div className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
        {/* Custom Range Track & Slider */}
        <div className="space-y-2 pt-1">
          <div className="relative flex items-center">
            {/* Custom Background Track */}
            <div className="absolute left-0 right-0 h-2.5 bg-slate-200 rounded-full overflow-hidden">
              {/* Gradient Filled Portion */}
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-amber-500 rounded-full transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Native HTML Range Input Styled for Precision */}
            <input
              type="range"
              min={minScore}
              max={maxScore}
              step={10}
              value={currentScore}
              onChange={handleSliderChange}
              aria-label="Target Skor UTBK SNBT"
              className="relative w-full h-2.5 opacity-0 cursor-pointer z-20"
            />

            {/* Visual Thumb Indicator (Tracked to slider progress) */}
            <div
              className="absolute pointer-events-none -translate-x-1/2 w-6 h-6 bg-white border-3 border-indigo-600 rounded-full shadow-md flex items-center justify-center transition-all duration-150 z-10"
              style={{ left: `${progressPercent}%` }}
            >
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            </div>
          </div>

          {/* Interactive Tick Step Points on the Line Bar */}
          <div className="relative w-full flex justify-between items-center text-[10px] font-semibold text-slate-500 pt-1">
            {SCORE_STEPS.map((step) => {
              const isSelected = step === currentScore;
              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => onChange(step)}
                  className={`flex flex-col items-center group transition-colors cursor-pointer focus:outline-none ${
                    isSelected ? 'text-indigo-700 font-bold scale-110' : 'hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mb-1 transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 ring-2 ring-indigo-200'
                        : step <= currentScore
                        ? 'bg-indigo-400'
                        : 'bg-slate-300 group-hover:bg-slate-400'
                    }`}
                  />
                  <span>{step}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Recommendation Preset Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-200/80">
          <span className="text-[10px] text-slate-500 font-bold mr-1">Rekomendasi Cepat:</span>
          {presetChips.map((preset) => {
            const isChosen = currentScore === preset.score;
            return (
              <button
                key={preset.score}
                type="button"
                onClick={() => onChange(preset.score)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                  isChosen
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {isChosen && <Check className="w-3 h-3 text-amber-300 shrink-0" />}
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Insight Card for Selected Score */}
        {!compact && (
          <div className={`p-3 rounded-xl border ${info.badgeBg} ${info.badgeBorder} space-y-1.5 transition-all`}>
            <div className="flex items-center justify-between flex-wrap gap-1">
              <div className="flex items-center gap-1.5">
                <Award className={`w-4 h-4 ${info.badgeColor}`} />
                <span className={`text-xs font-bold ${info.badgeColor}`}>{info.tier}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-700">
                {info.percentile}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {info.description}
            </p>
            <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1 pt-0.5">
              <TrendingUp className="w-3 h-3 text-indigo-500 shrink-0" />
              <span>Estimasi jurusan: <b className="text-slate-700">{info.targetEstimate}</b></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
