import React from 'react';
import {
  GraduationCap,
  Wrench,
  BookOpen,
  School,
  Check,
  Compass
} from 'lucide-react';
import { EducationLevel } from '../types';
import {
  EDUCATION_LEVELS,
  SMA_MA_MAJORS,
  SMK_MAJORS,
  getEducationLevelInfo,
  getMajorInfo
} from '../data/educationData';
import { SchoolSearchSelector } from './SchoolSearchSelector';
import { SekolahItem } from '../data/sekolahKemendikdasmenData';

interface EducationMajorSelectorProps {
  educationLevel: EducationLevel;
  onEducationLevelChange: (level: EducationLevel) => void;
  classGrade: 'X' | 'XI' | 'XII';
  onClassGradeChange: (grade: 'X' | 'XI' | 'XII') => void;
  major: string;
  onMajorChange: (major: string) => void;
  customMajor?: string;
  onCustomMajorChange?: (custom: string) => void;
  schoolName?: string;
  onSchoolNameChange?: (school: string, metadata?: Partial<SekolahItem>) => void;
  selectedProvince?: string;
  onProvinceChange?: (province: string) => void;
  compact?: boolean;
}

export const EducationMajorSelector: React.FC<EducationMajorSelectorProps> = ({
  educationLevel,
  onEducationLevelChange,
  classGrade,
  onClassGradeChange,
  major,
  onMajorChange,
  customMajor = '',
  onCustomMajorChange,
  schoolName = '',
  onSchoolNameChange,
  selectedProvince,
  onProvinceChange,
  compact = false,
}) => {
  const currentLevelInfo = getEducationLevelInfo(educationLevel);
  const isSmaOrMa = educationLevel === 'SMA' || educationLevel === 'MA';
  const activeMajorInfo = getMajorInfo(educationLevel, major);

  const handleLevelSelect = (newLevel: EducationLevel) => {
    onEducationLevelChange(newLevel);
    // Automatically switch to appropriate default major if incompatible
    if (newLevel === 'SMA' || newLevel === 'MA') {
      const isCurrentValidSmaMajor = SMA_MA_MAJORS.some((m) => m.id === major);
      if (!isCurrentValidSmaMajor) {
        onMajorChange('MIPA');
      }
    } else if (newLevel === 'SMK') {
      const isCurrentValidSmkMajor = SMK_MAJORS.some((m) => m.id === major);
      if (!isCurrentValidSmkMajor) {
        onMajorChange('TKJ');
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. ASAL SEKOLAH (SEKOLAH SE-INDONESIA DENGAN AUTO-FILL JENJANG) */}
      {onSchoolNameChange && (
        <SchoolSearchSelector
          value={schoolName}
          onChange={(val, meta) => {
            onSchoolNameChange(val, meta);
            if (meta?.bentuk && (meta.bentuk === 'SMA' || meta.bentuk === 'SMK' || meta.bentuk === 'MA')) {
              handleLevelSelect(meta.bentuk as EducationLevel);
            }
          }}
          educationLevel={educationLevel}
          selectedProvince={selectedProvince}
          onProvinceChange={onProvinceChange}
          placeholder="Cari nama sekolah SMA, SMK, MA se-Indonesia..."
          label="Asal Sekolah (Pilih dari Database Se-Indonesia)"
          required
        />
      )}

      {/* 2. JENJANG SATUAN PENDIDIKAN (SMA, SMK, MA) */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <School className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Jenjang Satuan Pendidikan</span>
        </label>

        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          {EDUCATION_LEVELS.map((lvl) => {
            const isSelected = educationLevel === lvl.id;
            const IconComponent =
              lvl.id === 'SMA'
                ? GraduationCap
                : lvl.id === 'SMK'
                ? Wrench
                : BookOpen;

            return (
              <button
                key={lvl.id}
                type="button"
                id={`btn-education-level-${lvl.id.toLowerCase()}`}
                onClick={() => handleLevelSelect(lvl.id)}
                className={`relative p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? `${lvl.activeColor} shadow-xs scale-[1.01]`
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-black text-xs transition-colors ${
                      isSelected
                        ? lvl.tagColor
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>

                <div>
                  <div className="font-black text-sm sm:text-base leading-tight text-slate-900 dark:text-white">
                    {lvl.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5 leading-tight">
                    {lvl.fullName}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. TINGKAT KELAS (X, XI, XII) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Tingkat Kelas
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['X', 'XI', 'XII'] as const).map((grade) => (
            <button
              key={grade}
              type="button"
              id={`btn-class-grade-${grade.toLowerCase()}`}
              onClick={() => onClassGradeChange(grade)}
              className={`py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                classGrade === grade
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-slate-300'
              }`}
            >
              Kelas {grade}
            </button>
          ))}
        </div>
      </div>

      {/* 4. JURUSAN / PEMINATAN DINAMIS KONDISIONAL */}
      <div className="space-y-2 p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-850/90 border border-slate-200 dark:border-slate-700/80">
        <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>{isSmaOrMa ? 'Peminatan / Jurusan' : 'Konsentrasi Keahlian / Jurusan'}</span>
        </label>

        {/* Kondisional A: SMA & MA -> Pilihan MIPA, IPS, Bahasa */}
        {isSmaOrMa && (
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SMA_MA_MAJORS.map((opt) => {
                const isSelected = major === opt.id;
                
                // Color badges for each major identity
                const badgeColor =
                  opt.id === 'MIPA'
                    ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800'
                    : opt.id === 'IPS'
                    ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800'
                    : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800';

                return (
                  <button
                    key={opt.id}
                    type="button"
                    id={`btn-major-${opt.id.toLowerCase()}`}
                    onClick={() => onMajorChange(opt.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/50 border-indigo-600 dark:border-indigo-400 shadow-xs ring-2 ring-indigo-500/20 text-slate-900 dark:text-white'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-750'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                        Jurusan {opt.shortLabel}
                      </span>
                      {isSelected ? (
                        <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      ) : (
                        <span className={`text-[9.5px] px-2 py-0.5 rounded-md font-extrabold border ${badgeColor}`}>
                          {opt.badgeLabel}
                        </span>
                      )}
                    </div>
                    <p className="text-[10.5px] text-slate-600 dark:text-slate-300 font-medium line-clamp-2 leading-relaxed">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Kondisional B: SMK -> Pilihan Jurusan Vokasi & Kustom */}
        {!isSmaOrMa && (
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SMK_MAJORS.map((opt) => {
                const isSelected = major === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    id={`btn-smk-major-${opt.id.toLowerCase()}`}
                    onClick={() => onMajorChange(opt.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-50/70 dark:bg-amber-950/50 border-amber-600 dark:border-amber-400 shadow-xs ring-2 ring-amber-500/20 text-slate-900 dark:text-white'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-slate-50 dark:hover:bg-slate-750'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-extrabold text-xs truncate text-slate-900 dark:text-slate-100">
                        {opt.shortLabel}
                      </span>
                      {isSelected && (
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-2 h-2" />
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold truncate mt-0.5 block">
                      {opt.categoryTag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Major Text Field if 'Lainnya' selected */}
            {major === 'Lainnya' && onCustomMajorChange && (
              <div className="pt-1.5">
                <input
                  type="text"
                  value={customMajor}
                  onChange={(e) => onCustomMajorChange(e.target.value)}
                  placeholder="Ketikkan nama jurusan SMK Anda..."
                  className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-600 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
