import React, { useState, useMemo } from 'react';
import { MedievalVocabItem } from '../../types';
import {
  Search,
  Volume2,
  Bookmark,
  CheckCircle,
  Sparkles,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowUpRight,
  Filter
} from 'lucide-react';

interface MedievalLibraryListProps {
  cards: MedievalVocabItem[];
  masteredIds: string[];
  bookmarkedIds: string[];
  currentPlayingId: string | null;
  searchQuery?: string;
  onPlayAudio: (text: string, id: string) => void;
  onToggleMastered: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onSelectCardIndex: (index: number) => void;
}

export const MedievalLibraryList: React.FC<MedievalLibraryListProps> = ({
  cards,
  masteredIds,
  bookmarkedIds,
  currentPlayingId,
  searchQuery = '',
  onPlayAudio,
  onToggleMastered,
  onToggleBookmark,
  onSelectCardIndex,
}) => {
  const [internalSearch, setInternalSearch] = useState<string>(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterMastered, setFilterMastered] = useState<'all' | 'unmastered' | 'mastered' | 'bookmarked'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync internal search when parent searchQuery prop changes
  React.useEffect(() => {
    setInternalSearch(searchQuery);
  }, [searchQuery]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(cards.map((c) => c.category)));
    return ['all', ...cats];
  }, [cards]);

  const filteredCards = useMemo(() => {
    return cards.filter((item) => {
      const q = (internalSearch || searchQuery).toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.phrase.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.phonetic.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.modernEnglish.toLowerCase().includes(q);

      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;

      const isMastered = masteredIds.includes(item.id);
      const isBookmarked = bookmarkedIds.includes(item.id);

      let matchesStatus = true;
      if (filterMastered === 'mastered') matchesStatus = isMastered;
      if (filterMastered === 'unmastered') matchesStatus = !isMastered;
      if (filterMastered === 'bookmarked') matchesStatus = isBookmarked;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [cards, internalSearch, searchQuery, selectedCategory, filterMastered, masteredIds, bookmarkedIds]);

  const handleCopy = (phrase: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phrase);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={internalSearch}
              onChange={(e) => setInternalSearch(e.target.value)}
              placeholder="Cari frasa kuno, arti Indonesia, pelafalan, atau kategori..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={filterMastered}
              onChange={(e) => setFilterMastered(e.target.value as any)}
              className="w-full sm:w-auto px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Semua Status ({cards.length})</option>
              <option value="unmastered">Belum Dikuasai ({cards.length - masteredIds.length})</option>
              <option value="mastered">Sudah Dikuasai ({masteredIds.length})</option>
              <option value="bookmarked">Bintang Favorit ({bookmarkedIds.length})</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-1 shrink-0">
            <Filter className="w-3 h-3" /> Kategori:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Quick Stats */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
        <span>Menampilkan {filteredCards.length} dari {cards.length} kosakata</span>
        <span>{masteredIds.length} Telah Dikuasai</span>
      </div>

      {/* Cards List Grid */}
      <div className="space-y-3">
        {filteredCards.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
            <Layers className="w-8 h-8 mx-auto text-slate-300" />
            <p className="font-bold text-xs">Tidak ada kosakata yang cocok dengan pencarian Anda.</p>
            <button
              onClick={() => {
                setInternalSearch('');
                setSelectedCategory('all');
                setFilterMastered('all');
              }}
              className="text-amber-700 font-bold text-xs underline cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          filteredCards.map((item) => {
            const originalIndex = cards.findIndex((c) => c.id === item.id);
            const isMastered = masteredIds.includes(item.id);
            const isBookmarked = bookmarkedIds.includes(item.id);
            const isExpanded = expandedId === item.id;
            const isPlaying = currentPlayingId === item.id;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all shadow-2xs hover:border-amber-300 ${
                  isMastered ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
                }`}
              >
                {/* Main Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                        {item.category}
                      </span>
                      {isMastered && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> Dikuasai
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-2">
                      <h4 className="text-lg sm:text-xl font-bold font-serif text-slate-900 leading-tight">
                        {item.phrase}
                      </h4>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      <span className="text-amber-900 font-bold">{item.meaning}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{item.pronounce}</span>
                      <span className="text-slate-500 font-sans text-[11px]">
                        Lafal: <b className="text-slate-700">{item.phonetic}</b>
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div
                    className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Audio Play */}
                    <button
                      onClick={() => onPlayAudio(item.phrase, item.id)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        isPlaying
                          ? 'bg-amber-600 text-white border-amber-600 animate-pulse'
                          : 'bg-slate-50 hover:bg-amber-50 text-amber-900 border-slate-200 hover:border-amber-300'
                      }`}
                      title="Putar Pelafalan Suara"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    {/* Copy */}
                    <button
                      onClick={(e) => handleCopy(item.phrase, item.id, e)}
                      className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-all cursor-pointer"
                      title="Salin Frasa"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {/* Bookmark Star */}
                    <button
                      onClick={() => onToggleBookmark(item.id)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        isBookmarked
                          ? 'bg-amber-50 border-amber-300 text-amber-600'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-400 border-slate-200'
                      }`}
                      title="Bintang Favorit"
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-600' : ''}`} />
                    </button>

                    {/* Mastered Check */}
                    <button
                      onClick={() => onToggleMastered(item.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isMastered
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isMastered ? 'Dikuasai' : 'Kuasai'}</span>
                    </button>

                    {/* Jump to 3D Card Deck */}
                    <button
                      onClick={() => onSelectCardIndex(originalIndex)}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                      title="Buka di Mode Flashcard 3D"
                    >
                      <span>Kartu 3D</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Expand Collapse Toggle */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="p-2 text-slate-400 hover:text-slate-700 rounded-lg"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expandable Details Area */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-[#FAF6EE] border-t border-amber-900/10 rounded-b-2xl space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-white rounded-xl border border-amber-900/10 space-y-1">
                        <div className="font-bold text-amber-900 text-[11px] uppercase">
                          Padanan Bahasa Inggris Modern:
                        </div>
                        <div className="text-slate-800 font-semibold">{item.modernEnglish}</div>
                      </div>

                      {item.historicalNote && (
                        <div className="p-3 bg-white rounded-xl border border-amber-900/10 space-y-1">
                          <div className="font-bold text-amber-900 text-[11px] uppercase">
                            Catatan Sejarah & Konteks:
                          </div>
                          <div className="text-slate-700 leading-relaxed">{item.historicalNote}</div>
                        </div>
                      )}
                    </div>

                    {item.breakdown && item.breakdown.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="font-bold text-amber-900 text-[11px] uppercase">
                          Bedah Kosakata Kuno (Word Breakdown):
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {item.breakdown.map((b, bIdx) => (
                            <div key={bIdx} className="p-2 bg-white/90 rounded-lg border border-amber-900/10">
                              <span className="font-bold text-amber-950 font-serif mr-1">{b.term}:</span>
                              <span className="text-slate-600 text-[11px]">{b.explanation}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
