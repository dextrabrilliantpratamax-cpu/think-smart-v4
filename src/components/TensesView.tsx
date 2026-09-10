import React, { useState, useEffect } from 'react';
import { LessonItem } from '../types';
import { ALL_16_TENSES } from '../data/tensesData';
import { TenseQuizCard } from './TenseQuizCard';
import {
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Award,
  BookMarked,
  Layers,
  CheckCircle
} from 'lucide-react';

interface TensesViewProps {
  completedLessons: string[];
  onCompleteLesson: (lessonId: string, score?: number) => void;
  searchQuery?: string;
  targetTenseId?: string;
}

// Helper function to render text with selective bolding (**bold**) for optimal reading comfort
const renderFormattedText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-slate-900 dark:text-slate-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

export const TensesView: React.FC<TensesViewProps> = ({
  completedLessons,
  onCompleteLesson,
  searchQuery: externalSearchQuery = '',
  targetTenseId,
}) => {
  // State
  const [expandedTenses, setExpandedTenses] = useState<Record<string, boolean>>({
    'tense-1': true, // Open the first tense by default for immediate preview
  });
  const [filterCategory, setFilterCategory] = useState<'all' | 'present' | 'past' | 'future' | 'past-future'>('all');
  const [searchQuery, setSearchQuery] = useState<string>(externalSearchQuery);
  const [showSubjectGuide, setShowSubjectGuide] = useState<boolean>(true);

  // Sync external search query if provided
  useEffect(() => {
    if (externalSearchQuery !== undefined) {
      setSearchQuery(externalSearchQuery);
    }
  }, [externalSearchQuery]);

  // Expand and scroll to target tense if provided from global search
  useEffect(() => {
    if (targetTenseId) {
      setExpandedTenses((prev) => ({ ...prev, [targetTenseId]: true }));
      setFilterCategory('all');
      setTimeout(() => {
        const el = document.getElementById(targetTenseId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [targetTenseId]);

  // Toggle single tense accordion
  const toggleTense = (id: string) => {
    setExpandedTenses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Expand all / Collapse all
  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    ALL_16_TENSES.forEach((t) => {
      allOpen[t.id] = true;
    });
    setExpandedTenses(allOpen);
  };

  const collapseAll = () => {
    setExpandedTenses({});
  };

  // Filter tenses
  const filteredTenses = ALL_16_TENSES.filter((tense) => {
    const titleLower = tense.title.toLowerCase();
    const descLower = tense.description.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = titleLower.includes(query) || descLower.includes(query);

    if (!matchesSearch) return false;

    if (filterCategory === 'present') {
      return titleLower.startsWith('present') || titleLower.startsWith('simple present');
    }
    if (filterCategory === 'past') {
      return (
        (titleLower.startsWith('past') || titleLower.startsWith('simple past')) &&
        !titleLower.includes('future')
      );
    }
    if (filterCategory === 'future') {
      return (
        (titleLower.startsWith('future') || titleLower.startsWith('simple future')) &&
        !titleLower.includes('past')
      );
    }
    if (filterCategory === 'past-future') {
      return titleLower.includes('past future');
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" /> Modul Tata Bahasa Lengkap
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>160 Soal & Pembahasan Lengkap</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">16 Tenses Bahasa Inggris Lengkap</h1>
          <p className="text-slate-300 text-xs mt-1 max-w-xl leading-relaxed">
            Klik pada tenses apa saja untuk langsung membuka rumus, bedah kata, penjelasan, contoh kalimat, dan kuis uji pemahaman di bawahnya!
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-5 py-3.5 rounded-xl border border-slate-700 text-center">
          <Award className="w-8 h-8 text-amber-400 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Progres Belajar
            </span>
            <span className="text-xl font-extrabold text-indigo-400">
              {completedLessons.length} <span className="text-sm text-slate-400">/ {ALL_16_TENSES.length} Tenses</span>
            </span>
          </div>
        </div>
      </div>

      {/* Guide Section: Apa itu Subject & Komponen Rumus Tenses? */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-all">
        <button
          onClick={() => setShowSubjectGuide(!showSubjectGuide)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50/70 via-white to-blue-50/70 dark:from-slate-800/60 dark:via-slate-900 dark:to-indigo-950/40 border-b border-slate-100 dark:border-slate-800 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Panduan Komponen Rumus: Apa itu Subject, Verb, & Auxiliary?
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pahami arti kata di setiap rumus tenses agar mudah menghafal dan membuat kalimat.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>{showSubjectGuide ? 'Sembunyikan Panduan' : 'Buka Panduan'}</span>
            {showSubjectGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showSubjectGuide && (
          <div className="p-5 space-y-4 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: Subject */}
              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-600 text-white font-bold text-xs">
                    1. Subject (Subjek / Pelaku)
                  </span>
                </div>
                <p className="font-normal text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Pelaku atau pokok pembicaraan utama dalam kalimat yang melakukan tindakan.
                </p>
                <div className="space-y-1.5 text-slate-700 dark:text-slate-300 pt-1">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-xs">Kata Ganti Orang (Pronouns):</span>
                    <ul className="list-disc list-inside mt-1 space-y-1 text-xs text-slate-600 dark:text-slate-400 font-normal">
                      <li><strong className="font-semibold text-slate-900 dark:text-slate-200">I</strong> = Saya</li>
                      <li><strong className="font-semibold text-slate-900 dark:text-slate-200">You</strong> = Kamu / Kalian</li>
                      <li><strong className="font-semibold text-slate-900 dark:text-slate-200">We</strong> = Kami / Kita</li>
                      <li><strong className="font-semibold text-slate-900 dark:text-slate-200">They</strong> = Mereka</li>
                      <li><strong className="font-semibold text-slate-900 dark:text-slate-200">He</strong> = Dia (laki-laki tunggal)</li>
                      <li><strong className="font-semibold text-slate-900 dark:text-slate-200">She</strong> = Dia (perempuan tunggal)</li>
                      <li><strong className="font-semibold text-slate-900 dark:text-slate-200">It</strong> = Benda / Hewan / Hal tunggal</li>
                    </ul>
                  </div>
                  <div className="text-xs pt-1 font-normal text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-slate-200">Contoh Nama / Benda:</span> <span>Budi, The teacher, Water, Students</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Verb */}
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-700 text-white font-bold text-xs">
                    2. Verb (Kata Kerja)
                  </span>
                </div>
                <p className="font-normal text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Aktivitas, tindakan, atau proses yang dilakukan oleh Subject.
                </p>
                <div className="space-y-1.5 text-slate-700 dark:text-slate-300 pt-1 text-xs">
                  <div className="bg-white dark:bg-slate-800/80 p-2 rounded-lg border border-emerald-100/80 dark:border-emerald-900/40">
                    <strong className="text-emerald-950 dark:text-emerald-300 font-bold block">Verb 1 (Base / Present):</strong>
                    <span className="text-slate-600 dark:text-slate-400 font-normal">Bentuk dasar/sekarang (misal: <em>study, read, write, eat</em>)</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800/80 p-2 rounded-lg border border-emerald-100/80 dark:border-emerald-900/40">
                    <strong className="text-emerald-950 dark:text-emerald-300 font-bold block">Verb 2 (Past):</strong>
                    <span className="text-slate-600 dark:text-slate-400 font-normal">Bentuk lampau (misal: <em>studied, read, wrote, ate</em>)</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800/80 p-2 rounded-lg border border-emerald-100/80 dark:border-emerald-900/40">
                    <strong className="text-emerald-950 dark:text-emerald-300 font-bold block">Verb 3 (Past Participle):</strong>
                    <span className="text-slate-600 dark:text-slate-400 font-normal">Bentuk selesai/pasif (misal: <em>studied, read, written, eaten</em>)</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800/80 p-2 rounded-lg border border-emerald-100/80 dark:border-emerald-900/40">
                    <strong className="text-emerald-950 dark:text-emerald-300 font-bold block">Verb-ing (Present Participle):</strong>
                    <span className="text-slate-600 dark:text-slate-400 font-normal">Bentuk sedang berlangsung (misal: <em>studying, reading, writing</em>)</span>
                  </div>
                </div>
              </div>

              {/* Box 3: Auxiliary / To Be */}
              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-amber-700 text-white font-bold text-xs">
                    3. Auxiliary & To Be (Kata Bantu)
                  </span>
                </div>
                <p className="font-normal text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Kata bantu kerja penanda waktu dan sifat kalimat.
                </p>
                <div className="space-y-1.5 text-slate-700 dark:text-slate-300 pt-1 text-xs">
                  <div className="bg-white dark:bg-slate-800/80 p-1.5 rounded-lg border border-amber-100/80 dark:border-amber-900/40">
                    <strong className="text-amber-950 dark:text-amber-300 font-bold">To Be (am, is, are):</strong> <span className="text-slate-600 dark:text-slate-400 font-normal">Masa sekarang (Continuous)</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800/80 p-1.5 rounded-lg border border-amber-100/80 dark:border-amber-900/40">
                    <strong className="text-amber-950 dark:text-amber-300 font-bold">To Be (was, were):</strong> <span className="text-slate-600 dark:text-slate-400 font-normal">Masa lampau (Past Continuous)</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800/80 p-1.5 rounded-lg border border-amber-100/80 dark:border-amber-900/40">
                    <strong className="text-amber-950 dark:text-amber-300 font-bold">Have / Has / Had:</strong> <span className="text-slate-600 dark:text-slate-400 font-normal">Penanda selesai (Perfect Tense)</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800/80 p-1.5 rounded-lg border border-amber-100/80 dark:border-amber-900/40">
                    <strong className="text-amber-950 dark:text-amber-300 font-bold">Will / Would:</strong> <span className="text-slate-600 dark:text-slate-400 font-normal">Penanda masa depan (Future Tense)</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800/80 p-1.5 rounded-lg border border-amber-100/80 dark:border-amber-900/40">
                    <strong className="text-amber-950 dark:text-amber-300 font-bold">Do / Does / Did:</strong> <span className="text-slate-600 dark:text-slate-400 font-normal">Kata bantu kalimat tanya & negatif</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar: Filters, Search, and Expand All */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tenses (cth: Continuous, Perfect, Past)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>

          {/* Quick Action Buttons: Expand All & Collapse All */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronDown className="w-3.5 h-3.5" /> Buka Semua (16)
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronUp className="w-3.5 h-3.5" /> Tutup Semua
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Semua (16 Tenses)
          </button>
          <button
            onClick={() => setFilterCategory('present')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterCategory === 'present'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Present Tenses (4)
          </button>
          <button
            onClick={() => setFilterCategory('past')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterCategory === 'past'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Past Tenses (4)
          </button>
          <button
            onClick={() => setFilterCategory('future')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterCategory === 'future'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Future Tenses (4)
          </button>
          <button
            onClick={() => setFilterCategory('past-future')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterCategory === 'past-future'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Past Future Tenses (4)
          </button>
        </div>
      </div>

      {/* Accordion List of 16 Tenses */}
      <div className="space-y-4">
        {filteredTenses.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-2">
            <Layers className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <div className="text-slate-700 dark:text-slate-300 font-bold text-sm">Tidak ada tenses yang sesuai</div>
            <p className="text-slate-400 dark:text-slate-500 text-xs">Coba ganti kata kunci pencarian atau filter kategori.</p>
          </div>
        ) : (
          filteredTenses.map((tense, index) => {
            const isExpanded = !!expandedTenses[tense.id];
            const isCompleted = completedLessons.includes(tense.id);

            return (
              <div
                key={tense.id}
                id={tense.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                  isExpanded
                    ? 'border-indigo-300 dark:border-indigo-500/50 ring-2 ring-indigo-50/70 dark:ring-indigo-950/40 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Accordion Header (Click to toggle direct explanation right below) */}
                <button
                  onClick={() => toggleTense(tense.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <span
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center shrink-0 shadow-xs ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isExpanded
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {isCompleted ? '✓' : tense.chapterNumber || index + 1}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                          {tense.title}
                        </h3>
                        {isCompleted && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold uppercase border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Selesai
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {tense.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                      {tense.durationMinutes} mnt
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform ${
                        isExpanded
                          ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rotate-180'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Accordion Content (Rendered directly underneath the card!) */}
                {isExpanded && (
                  <div className="border-t border-slate-100 dark:border-slate-800 p-5 sm:p-6 bg-slate-50/40 dark:bg-slate-950/40 space-y-6">
                    {/* Formula Card */}
                    <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-xl space-y-2 shadow-xs border border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                          RUMUS FORMAL (ACADEMIC FORMULA)
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Subject = Pelaku, Verb = Kata Kerja
                        </span>
                      </div>
                      <div className="font-mono text-xs sm:text-sm font-bold text-slate-100 tracking-wide whitespace-pre-wrap leading-relaxed bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
                        {tense.formula}
                      </div>
                    </div>

                    {/* Core Concept & Explanation */}
                    <div className="bg-gradient-to-br from-indigo-900/5 via-slate-50/50 to-blue-900/5 dark:from-indigo-950/20 dark:via-slate-900/50 dark:to-blue-950/20 p-5 rounded-2xl border border-indigo-100/80 dark:border-indigo-900/40 space-y-3.5 shadow-2xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                          <BookMarked className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                            Konsep Dasar {tense.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                            Pahami esensi logika waktu dan makna di balik tense ini
                          </p>
                        </div>
                      </div>

                      {/* Clean comfortable reading paragraph */}
                      <div className="text-sm sm:text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed font-normal bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
                        {renderFormattedText(tense.explanation)}
                      </div>

                      {/* Structured Grid: Kapan Digunakan & Aturan Subjek */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        {/* Kapan Digunakan (Usage Situations) */}
                        {tense.usageWhen && tense.usageWhen.length > 0 && (
                          <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
                            <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-300 font-bold text-xs sm:text-sm uppercase tracking-wider">
                              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                              Kapan Tense Ini Digunakan?
                            </div>
                            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-normal">
                              {tense.usageWhen.map((point, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm shrink-0 leading-none mt-1">✦</span>
                                  <div>{renderFormattedText(point)}</div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Aturan Subjek & Kata Kerja (Subject Rules) */}
                        {tense.subjectRules && tense.subjectRules.length > 0 && (
                          <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
                            <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-300 font-bold text-xs sm:text-sm uppercase tracking-wider">
                              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                              Aturan Subjek & Kata Kerja
                            </div>
                            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-normal">
                              {tense.subjectRules.map((rule, rIdx) => (
                                <li key={rIdx} className="flex items-start gap-2.5 leading-relaxed">
                                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm shrink-0 leading-none mt-1">✓</span>
                                  <div>{renderFormattedText(rule)}</div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Time Signals / Adverbs of Time */}
                      {tense.timeSignals && tense.timeSignals.length > 0 && (
                        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2.5">
                          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs sm:text-sm uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            Kata Keterangan Waktu (Time Signals / Kata Kunci)
                          </div>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {tense.timeSignals.map((signal, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 text-xs font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-700 dark:hover:text-indigo-300 hover:border-indigo-200 transition-colors"
                              >
                                {signal}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Academic Notes */}
                    {tense.academicNotes && (
                      <div className="p-4 sm:p-5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 rounded-xl space-y-1.5 text-xs sm:text-sm">
                        <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
                          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>Catatan Akademis & Tips Penulisan Formal</span>
                        </div>
                        <p className="text-amber-950/90 dark:text-amber-200/90 leading-relaxed font-normal">
                          {renderFormattedText(tense.academicNotes)}
                        </p>
                      </div>
                    )}

                    {/* Examples List */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider">
                        Contoh Kalimat Lengkap
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {tense.examples.map((ex, exIdx) => (
                          <div
                            key={exIdx}
                            className="p-3.5 sm:p-4 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl space-y-1.5 shadow-2xs"
                          >
                            <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {ex.english}
                            </div>
                            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal italic">
                              {ex.indonesian}
                            </div>
                            {ex.usageNote && (
                              <span className="inline-block mt-1 text-[11px] font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-800">
                                {ex.usageNote}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Quiz Direct Section */}
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-5">
                      <TenseQuizCard
                        tense={tense}
                        isCompleted={isCompleted}
                        onCompleteLesson={onCompleteLesson}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
