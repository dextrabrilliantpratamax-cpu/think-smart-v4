import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  Volume2,
  Clock,
  BookOpen,
  GraduationCap,
  Headphones,
  Gamepad2,
  Compass,
  ArrowRight,
  Sparkles,
  TrendingUp,
  History,
  Trash2,
  CornerDownLeft,
  Filter
} from 'lucide-react';
import {
  SearchResultItem,
  SearchCategory,
  searchUniversalIndex,
  playSearchResultAudio
} from '../../utils/searchIndex';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (result: SearchResultItem) => void;
  initialQuery?: string;
}

const RECENT_SEARCHES_KEY = 'ts_recent_search_history';

const POPULAR_SUGGESTIONS = [
  { label: 'Simple Present Tense', category: 'tenses' as SearchCategory },
  { label: 'Hark / Prithee (Medieval)', category: 'vocab' as SearchCategory },
  { label: 'Past Continuous Tense', category: 'tenses' as SearchCategory },
  { label: 'Literasi UTBK 2026', category: 'utbk' as SearchCategory },
  { label: 'British Accent Listening', category: 'listening' as SearchCategory },
  { label: 'Life Sentence (Word Chain)', category: 'icebreaking' as SearchCategory },
  { label: 'Frankensentence Game', category: 'icebreaking' as SearchCategory },
  { label: 'Profil PT Tiga Serangkai', category: 'modules' as SearchCategory },
];

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
      return saved ? JSON.parse(saved) : ['Simple Present', 'Hark', 'UTBK Passage'];
    } catch {
      return ['Simple Present', 'Hark', 'UTBK Passage'];
    }
  });

  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Sync initial query when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen, initialQuery]);

  // Compute search results
  const searchResults = useMemo(() => {
    return searchUniversalIndex(query, selectedCategory);
  }, [query, selectedCategory]);

  // Save recent search
  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== term.toLowerCase());
      const updated = [term.trim(), ...filtered].slice(0, 8);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const removeRecentSearch = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches((prev) => {
      const updated = prev.filter((s) => s !== term);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  const handleSelect = (item: SearchResultItem) => {
    saveRecentSearch(query.trim() || item.title);
    onSelectResult(item);
    onClose();
  };

  const handleAudioPlay = (item: SearchResultItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const textToSpeak = item.meta?.pronounceText || item.title;
    playSearchResultAudio(textToSpeak);
    setPlayingAudioId(item.id);
    setTimeout(() => setPlayingAudioId(null), 2500);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (searchResults.length > 0 && searchResults[selectedIndex]) {
          handleSelect(searchResults[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector(
        `[data-result-index="${selectedIndex}"]`
      ) as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const categoryIcons: Record<SearchCategory, React.ReactNode> = {
    all: <Sparkles className="w-3.5 h-3.5" />,
    tenses: <Clock className="w-3.5 h-3.5" />,
    vocab: <BookOpen className="w-3.5 h-3.5" />,
    utbk: <GraduationCap className="w-3.5 h-3.5" />,
    listening: <Headphones className="w-3.5 h-3.5" />,
    icebreaking: <Gamepad2 className="w-3.5 h-3.5" />,
    modules: <Compass className="w-3.5 h-3.5" />,
  };

  const categories: Array<{ id: SearchCategory; label: string }> = [
    { id: 'all', label: 'Semua Materi' },
    { id: 'tenses', label: '16 Tenses' },
    { id: 'vocab', label: 'Kosakata Kuno' },
    { id: 'utbk', label: 'Soal UTBK' },
    { id: 'listening', label: 'Listening Lab' },
    { id: 'icebreaking', label: 'Fun Games' },
    { id: 'modules', label: 'Portal Utama' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-16 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card Box */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10">
        {/* Top Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/70 dark:bg-slate-900/90">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-800/60">
            <Search className="w-5 h-5" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Ketik topik belajar, rumus tenses, frasa kuno, soal UTBK, audio..."
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />

          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Hapus pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="px-2 py-1 text-[11px] font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-200/70 dark:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Filter Category Chips */}
        <div className="px-4 sm:px-5 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto custom-scrollbar shrink-0">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1 shrink-0">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedIndex(0);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {categoryIcons[cat.id]}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Results / Suggestions Area */}
        <div
          ref={resultsContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar"
        >
          {/* If query is empty and has recent / popular suggestions */}
          {!query.trim() && (
            <div className="space-y-4">
              {recentSearches.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5" /> Riwayat Pencarian Terakhir
                    </span>
                    <button
                      onClick={clearAllRecent}
                      className="text-[11px] text-slate-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Hapus Semua
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setQuery(term);
                          setSelectedIndex(0);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-xl transition-colors cursor-pointer group border border-slate-200/60 dark:border-slate-700"
                      >
                        <span>{term}</span>
                        <button
                          onClick={(e) => removeRecentSearch(term, e)}
                          className="text-slate-400 hover:text-rose-500 p-0.5 rounded-full"
                          title="Hapus kata ini"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Suggestions */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" /> Topik Populer Pendamping Buku
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {POPULAR_SUGGESTIONS.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setQuery(sug.label);
                        setSelectedCategory(sug.category);
                        setSelectedIndex(0);
                      }}
                      className="p-2.5 bg-slate-50 dark:bg-slate-800/70 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs">
                          {categoryIcons[sug.category]}
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {sug.label}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results List */}
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-semibold px-1">
                <span>Ditemukan {searchResults.length} materi relevan</span>
                <span className="hidden sm:inline text-[11px]">Gunakan ↑ ↓ lalu Enter untuk membuka</span>
              </div>

              {searchResults.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const isPlaying = playingAudioId === item.id;

                return (
                  <div
                    key={item.id}
                    data-result-index={idx}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-indigo-50/90 dark:bg-indigo-950/50 border-indigo-500 dark:border-indigo-400 shadow-sm'
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${item.badgeColor}`}
                        >
                          {item.categoryLabel}
                        </span>

                        {item.meta?.tag && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            {item.meta.tag}
                          </span>
                        )}

                        {item.meta?.difficulty && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200/60">
                            {item.meta.difficulty}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <span>{item.title}</span>
                      </h4>

                      <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                        {item.subtitle}
                      </p>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Actions on Right */}
                    <div
                      className="flex items-center gap-1.5 shrink-0 pt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.meta?.pronounceText && (
                        <button
                          onClick={(e) => handleAudioPlay(item, e)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            isPlaying
                              ? 'bg-indigo-600 text-white border-indigo-600 animate-pulse'
                              : 'bg-slate-100 dark:bg-slate-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'
                          }`}
                          title="Dengarkan Suara / Audio"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => handleSelect(item)}
                        className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs font-bold cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                        }`}
                        title="Buka Materi"
                      >
                        <span className="hidden sm:inline">Buka</span>
                        <CornerDownLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            query.trim() && (
              <div className="p-10 text-center space-y-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700">
                <Search className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Tidak ada materi yang sesuai dengan "{query}"
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Coba gunakan kata kunci lain seperti <b>"past tense"</b>, <b>"thou"</b>, <b>"listening"</b>, atau reset kategori ke <b>"Semua Materi"</b>.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setQuery('');
                    setSelectedCategory('all');
                    inputRef.current?.focus();
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs hover:bg-indigo-700 transition-colors"
                >
                  Reset Pencarian
                </button>
              </div>
            )
          )}
        </div>

        {/* Footer Hint Bar */}
        <div className="p-3 px-5 bg-slate-100/80 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">
                ↓
              </kbd>
              <span>Pilih item</span>
            </span>

            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">
                ↵
              </kbd>
              <span>Buka modul</span>
            </span>

            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">
                ESC
              </kbd>
              <span>Tutup</span>
            </span>
          </div>

          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            Think Smart Universal Search
          </span>
        </div>
      </div>
    </div>
  );
};
