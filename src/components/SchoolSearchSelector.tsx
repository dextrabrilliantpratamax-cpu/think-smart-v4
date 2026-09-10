import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  School,
  Search,
  Check,
  Building,
  MapPin,
  Sparkles,
  ShieldCheck,
  Edit3,
  X,
  Info,
  SlidersHorizontal,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { EducationLevel } from '../types';
import { searchSchoolsApi, SchoolItem } from '../services/schoolApi';
import { DAFTAR_PROVINSI, getKabupatenByProvinsi } from '../data/sekolahKemendikdasmenData';

interface SchoolSearchSelectorProps {
  value: string;
  onChange: (schoolName: string, metadata?: any) => void;
  educationLevel?: EducationLevel;
  placeholder?: string;
  required?: boolean;
  label?: string;
  compact?: boolean;
  selectedProvince?: string;
  onProvinceChange?: (province: string) => void;
}

export const SchoolSearchSelector: React.FC<SchoolSearchSelectorProps> = ({
  value,
  onChange,
  educationLevel,
  placeholder = 'Cari nama sekolah SMA, SMK, MA se-Indonesia...',
  required = true,
  label = 'Asal Sekolah',
  compact = false,
  selectedProvince,
  onProvinceChange,
}) => {
  const [query, setQuery] = useState('');
  const [bentukFilter, setBentukFilter] = useState<'all' | 'SMA' | 'SMK' | 'MA'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Negeri' | 'Swasta'>('all');
  const [selectedProvinsi, setSelectedProvinsi] = useState<string>(
    selectedProvince || 'Semua Provinsi'
  );
  const [selectedKabupaten, setSelectedKabupaten] = useState<string>('Semua');
  const [showRegionFilter, setShowRegionFilter] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [serverResults, setServerResults] = useState<SchoolItem[]>([]);
  const [searchTimeMs, setSearchTimeMs] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verifiedSchool, setVerifiedSchool] = useState<SchoolItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync selectedProvince prop if changed externally
  useEffect(() => {
    if (selectedProvince && selectedProvince !== selectedProvinsi) {
      setSelectedProvinsi(selectedProvince);
    }
  }, [selectedProvince]);

  // Available Kabupaten options for ANY province in Indonesia
  const kabupatenOptions = useMemo(() => {
    return getKabupatenByProvinsi(selectedProvinsi);
  }, [selectedProvinsi]);

  // Auto-detect bentuk from string helper
  const detectBentukFromName = (name: string): 'SMA' | 'SMK' | 'MA' | undefined => {
    const upper = name.toUpperCase();
    if (/\bSMK\b/.test(upper) || upper.includes('SMK NEGERI') || upper.includes('SMKS')) return 'SMK';
    if (/\bMA\b/.test(upper) || /\bMAN\b/.test(upper) || /\bMAS\b/.test(upper) || upper.includes('MADRASAH ALIYAH')) return 'MA';
    if (/\bSMA\b/.test(upper) || /\bSMAN\b/.test(upper) || /\bSMAS\b/.test(upper) || upper.includes('SEKOLAH MENENGAH ATAS')) return 'SMA';
    return undefined;
  };

  // Query school API with debounce
  useEffect(() => {
    if (!isDropdownOpen) return;

    const controller = new AbortController();
    setIsLoading(true);

    const timer = setTimeout(() => {
      searchSchoolsApi({
        query,
        bentuk: bentukFilter !== 'all' ? bentukFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        provinsi: selectedProvinsi !== 'Semua Provinsi' ? selectedProvinsi : undefined,
        kabupaten: selectedKabupaten !== 'Semua' ? selectedKabupaten : undefined,
        limit: 20,
        signal: controller.signal,
      })
        .then((res) => {
          if (res.success) {
            const seen = new Set<string>();
            const uniqueResults = (res.data || []).filter((item) => {
              const key = item.npsn ? `npsn_${item.npsn}` : `${item.nama_sekolah?.trim().toUpperCase()}_${item.kabupaten_kota}`;
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            });
            setServerResults(uniqueResults);
            if (typeof res.responseTimeMs === 'number') {
              setSearchTimeMs(res.responseTimeMs);
            }
          }
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            setIsLoading(false);
          }
        });
    }, 150);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, bentukFilter, statusFilter, selectedProvinsi, selectedKabupaten, isDropdownOpen]);

  // Auto fetch school metadata (NPSN) if value exists without verifiedSchool
  useEffect(() => {
    if (value && !verifiedSchool && !isManualMode) {
      searchSchoolsApi({ query: value, limit: 1 })
        .then((res) => {
          if (res.success && res.data && res.data.length > 0) {
            setVerifiedSchool(res.data[0]);
          }
        })
        .catch(() => {});
    }
  }, [value, verifiedSchool, isManualMode]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSchool = (sekolah: SchoolItem) => {
    const upperName = (sekolah.nama_sekolah || '').toUpperCase();
    setVerifiedSchool(sekolah);
    onChange(upperName, sekolah);
    setIsDropdownOpen(false);
    setIsManualMode(false);
    setQuery('');
  };

  const handleSwitchToManual = () => {
    setIsManualMode(true);
    setIsDropdownOpen(false);
  };

  const handleClearSchool = () => {
    onChange('');
    setVerifiedSchool(null);
    setQuery('');
    setIsDropdownOpen(true);
  };

  const isRegionFiltered = selectedProvinsi !== 'Semua Provinsi' || selectedKabupaten !== 'Semua';

  return (
    <div ref={containerRef} className="space-y-1.5 text-left relative">
      {/* Label and Source indicator */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <School className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>{label}</span>
          {required && <span className="text-rose-500">*</span>}
        </label>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span className="hidden sm:inline">Dapodik / Kemendikdasmen RI</span>
          </span>
        </div>
      </div>

      {/* If School is Already Selected and NOT in Manual Mode: Display Clean Verified Card */}
      {value && !isManualMode && (
        <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 shadow-xs flex items-center justify-between gap-3 group transition-all">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
              <Building className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs text-slate-900 dark:text-white truncate flex items-center gap-1.5 flex-wrap">
                <span>{value}</span>
                {verifiedSchool && (
                  <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold shrink-0">
                    NPSN: {verifiedSchool.npsn}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                <span>
                  {verifiedSchool
                    ? `${verifiedSchool.kabupaten_kota}, ${verifiedSchool.provinsi}`
                    : 'Sekolah Siswa Terdaftar'}
                </span>
                {verifiedSchool?.status && (
                  <span className="text-[10px] text-slate-400">· {verifiedSchool.status}</span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClearSchool}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-[11px] font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1"
            title="Ganti nama sekolah"
          >
            <Edit3 className="w-3 h-3" />
            <span className="hidden sm:inline">Ganti</span>
          </button>
        </div>
      )}

      {/* If No School Selected OR Manual Typing Mode Active */}
      {(!value || isManualMode) && (
        <div className="space-y-2">
          {/* Main Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              required={required}
              value={isManualMode ? value : query}
              onChange={(e) => {
                const val = e.target.value;
                if (isManualMode) {
                  const detected = detectBentukFromName(val);
                  onChange(val, detected ? { bentuk: detected } : undefined);
                } else {
                  setQuery(val);
                  setIsDropdownOpen(true);
                }
              }}
              onFocus={() => {
                if (!isManualMode) setIsDropdownOpen(true);
              }}
              placeholder={isManualMode ? 'Ketik nama sekolah Anda...' : placeholder}
              className="w-full pl-10 pr-20 py-2.5 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400 transition-all"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {((isManualMode && value) || (!isManualMode && query)) && (
                <button
                  type="button"
                  onClick={() => {
                    if (isManualMode) onChange('');
                    else setQuery('');
                  }}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              {!isManualMode && (
                <button
                  type="button"
                  onClick={() => setShowRegionFilter(!showRegionFilter)}
                  className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                    isRegionFiltered || showRegionFilter
                      ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                  title="Filter Wilayah (Provinsi / Kabupaten)"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Bar (Jenjang & Status & Wilayah Toggle) */}
          {!isManualMode && (
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
                <div className="flex items-center gap-1 flex-wrap">
                  {/* Jenjang Filter */}
                  {(['all', 'SMA', 'SMK', 'MA'] as const).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        setBentukFilter(b);
                        setIsDropdownOpen(true);
                      }}
                      className={`px-2 py-0.5 rounded-lg font-bold transition-colors cursor-pointer ${
                        bentukFilter === b
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                      }`}
                    >
                      {b === 'all' ? 'Semua' : b}
                    </button>
                  ))}

                  <span className="text-slate-300 dark:text-slate-700">|</span>

                  {/* Status Filter (Negeri vs Swasta) */}
                  {(['all', 'Negeri', 'Swasta'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        setStatusFilter(st);
                        setIsDropdownOpen(true);
                      }}
                      className={`px-2 py-0.5 rounded-lg font-bold transition-colors cursor-pointer ${
                        statusFilter === st
                          ? st === 'Negeri'
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : st === 'Swasta'
                            ? 'bg-amber-600 text-white shadow-2xs'
                            : 'bg-indigo-600 text-white shadow-2xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                      }`}
                    >
                      {st === 'all' ? 'Semua' : st}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowRegionFilter(!showRegionFilter)}
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{selectedProvinsi === 'Semua Provinsi' ? 'Pilih Wilayah' : selectedProvinsi}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${showRegionFilter ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Collapsible Region Selector (Provinsi & Kabupaten/Kota) */}
              {showRegionFilter && (
                <div className="p-2.5 bg-indigo-50/50 dark:bg-slate-800/60 rounded-xl border border-indigo-100 dark:border-indigo-900/40 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                      Provinsi
                    </label>
                    <select
                      value={selectedProvinsi}
                      onChange={(e) => {
                        const newProv = e.target.value;
                        setSelectedProvinsi(newProv);
                        setSelectedKabupaten('Semua');
                        setIsDropdownOpen(true);
                        onProvinceChange?.(newProv);
                      }}
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      {DAFTAR_PROVINSI.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                      Kabupaten / Kota
                    </label>
                    <select
                      value={selectedKabupaten}
                      onChange={(e) => {
                        setSelectedKabupaten(e.target.value);
                        setIsDropdownOpen(true);
                      }}
                      disabled={kabupatenOptions.length <= 1}
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      {kabupatenOptions.map((kab) => (
                        <option key={kab} value={kab}>
                          {kab}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Autocomplete Dropdown List */}
          {isDropdownOpen && !isManualMode && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-2xl shadow-xl z-50 overflow-hidden max-h-64 flex flex-col">
              <div className="p-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {isLoading ? 'Mencari...' : `${serverResults.length} Sekolah Ditemukan`}
                  </span>
                  {searchTimeMs !== null && !isLoading && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                      ⚡ {searchTimeMs}ms
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSwitchToManual}
                  className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
                >
                  Ketik Manual
                </button>
              </div>

              <div className="overflow-y-auto custom-scrollbar p-1 divide-y divide-slate-100 dark:divide-slate-800">
                {isLoading && serverResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    <span>Memuat data direktori sekolah...</span>
                  </div>
                ) : serverResults.length > 0 ? (
                  serverResults.map((sekolah) => {
                    const isNegeri = sekolah.status?.toLowerCase() === 'negeri';
                    return (
                      <button
                        key={sekolah.id}
                        type="button"
                        onClick={() => handleSelectSchool(sekolah)}
                        className="w-full p-2.5 rounded-xl hover:bg-indigo-50/80 dark:hover:bg-indigo-950/40 text-left transition-colors cursor-pointer flex items-center justify-between gap-2 group"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                              {sekolah.nama_sekolah}
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                              {sekolah.bentuk}
                            </span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                isNegeri
                                  ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                  : 'bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                              }`}
                            >
                              {sekolah.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-2 mt-1 flex-wrap">
                            {sekolah.npsn && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono font-black text-[10.5px] border border-emerald-300 dark:border-emerald-800 shrink-0">
                                NPSN: {sekolah.npsn}
                              </span>
                            )}
                            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                              <span>{sekolah.kecamatan ? `${sekolah.kecamatan}, ` : ''}{sekolah.kabupaten_kota}, {sekolah.provinsi}</span>
                            </span>
                          </div>
                        </div>
                        <Check className="w-4 h-4 text-indigo-600 opacity-0 group-hover:opacity-100 shrink-0 transition-opacity" />
                      </button>
                    );
                  })
                ) : (
                  <div className="p-4 text-center space-y-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Sekolah &quot;{query}&quot; belum ditemukan di database.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        const schoolNameCustom = (query.trim() || 'SMA Terpilih').toUpperCase();
                        const detected = detectBentukFromName(schoolNameCustom);
                        onChange(schoolNameCustom, detected ? { bentuk: detected } : undefined);
                        setIsDropdownOpen(false);
                      }}
                      className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Gunakan nama &quot;{query || 'Sekolah Saya'}&quot;
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Quick Help */}
              <div className="p-2 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-between px-3">
                <span className="truncate">Database Kemendikdasmen RI • SMA, SMK, MA Se-Indonesia</span>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(false)}
                  className="font-bold hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}

          {/* Mode Manual Toggle Button */}
          <div className="flex items-center justify-between text-[11px] px-1">
            {isManualMode ? (
              <button
                type="button"
                onClick={() => setIsManualMode(false)}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <Search className="w-3 h-3" />
                <span>Pilih dari direktori sekolah resmi se-Indonesia</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSwitchToManual}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium cursor-pointer"
              >
                Sekolah tidak ditemukan? Masukkan manual
              </button>
            )}
          </div>
        </div>
      )}

      {/* Official Directory Kemendikdasmen Info Note */}
      <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 dark:text-slate-400 px-1 pt-0.5">
        <Info className="w-3 h-3 text-indigo-500 shrink-0" />
        <span className="truncate">
          Direktori terhubung dengan basis data Dikmen Kemendikdasmen RI (SMA, SMK, MA se-Indonesia).
        </span>
      </div>
    </div>
  );
};
