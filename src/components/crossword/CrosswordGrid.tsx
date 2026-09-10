import React, { useRef, useEffect } from 'react';
import { CrosswordLevel, CrosswordWord } from '../../data/crosswordLevels';
import { Check, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface CrosswordGridProps {
  level: CrosswordLevel;
  gridState: Record<string, string>; // key: `${row}_${col}` -> single uppercase letter
  activeCell: { row: number; col: number } | null;
  activeWord: CrosswordWord | null;
  solvedWordKeys: Set<string>; // set of `${word.number}_${word.direction}`
  shakeWordKey: string | null;
  flashWordKey: string | null;
  onCellClick: (row: number, col: number) => void;
  onCellDoubleClick?: (row: number, col: number) => void;
  onKeyDown: (e: React.KeyboardEvent, row: number, col: number) => void;
  onInputLetter?: (letter: string) => void;
  onBackspace?: () => void;
}

export const CrosswordGrid: React.FC<CrosswordGridProps> = ({
  level,
  gridState,
  activeCell,
  activeWord,
  solvedWordKeys,
  shakeWordKey,
  flashWordKey,
  onCellClick,
  onCellDoubleClick,
  onKeyDown,
  onInputLetter,
  onBackspace,
}) => {
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeInputRef = useRef<HTMLInputElement | null>(null);

  // Derive cell map for all words in the level
  const cellCoverageMap: Record<
    string,
    {
      words: CrosswordWord[];
      startNumber?: number;
      correctLetter: string;
    }
  > = {};

  level.words.forEach((word) => {
    const wordKey = `${word.number}_${word.direction}`;
    for (let i = 0; i < word.word.length; i++) {
      const r = word.direction === 'across' ? word.row : word.row + i;
      const c = word.direction === 'across' ? word.col + i : word.col;
      const key = `${r}_${c}`;

      if (!cellCoverageMap[key]) {
        cellCoverageMap[key] = {
          words: [],
          correctLetter: word.word[i],
        };
      }
      cellCoverageMap[key].words.push(word);

      if (i === 0) {
        cellCoverageMap[key].startNumber = word.number;
      }
    }
  });

  // Calculate cell size based on grid dimensions and zoom
  const baseCellSize = React.useMemo(() => {
    if (level.gridCols <= 11) return 40;
    if (level.gridCols <= 14) return 34;
    return 30; // Level 6 (17x17)
  }, [level.gridCols]);

  const effectiveCellSize = Math.round(baseCellSize * zoomLevel);

  // Auto-focus input element when activeCell changes
  useEffect(() => {
    if (activeInputRef.current) {
      activeInputRef.current.focus({ preventScroll: true });
    }
  }, [activeCell]);

  return (
    <div className="flex flex-col items-center w-full space-y-3">
      {/* Zoom / Grid Controls */}
      <div className="w-full flex items-center justify-between px-2 text-xs font-bold text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            📐 Grid: {level.gridRows} × {level.gridCols}
          </span>
          {activeWord && (
            <span className="hidden sm:inline-block bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 font-extrabold">
              {activeWord.number} {activeWord.direction === 'across' ? 'Across (→)' : 'Down (↓)'} ({activeWord.word.length} Huruf)
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setZoomLevel((prev) => Math.max(0.75, Number((prev - 0.15).toFixed(2))))}
            disabled={zoomLevel <= 0.75}
            className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
            title="Perkecil Grid"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-1.5 text-[10px] font-mono text-slate-600 dark:text-slate-300">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoomLevel((prev) => Math.min(1.5, Number((prev + 0.15).toFixed(2))))}
            disabled={zoomLevel >= 1.5}
            className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
            title="Perbesar Grid"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer ml-1"
            title="Reset Zoom (100%)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid Container (Scrollable on small devices or big grids) */}
      <div
        ref={containerRef}
        className="w-full max-w-full overflow-auto p-4 sm:p-6 bg-slate-900/90 dark:bg-slate-950 rounded-3xl border-2 border-slate-700/60 shadow-2xl flex items-center justify-center custom-scrollbar"
        style={{
          minHeight: `${Math.min(500, level.gridRows * effectiveCellSize + 48)}px`,
        }}
      >
        <div
          className="grid select-none bg-slate-950 p-2 sm:p-3 rounded-2xl border border-slate-800 shadow-inner"
          style={{
            gridTemplateRows: `repeat(${level.gridRows}, ${effectiveCellSize}px)`,
            gridTemplateColumns: `repeat(${level.gridCols}, ${effectiveCellSize}px)`,
            gap: '2px',
          }}
        >
          {Array.from({ length: level.gridRows }).map((_, r) =>
            Array.from({ length: level.gridCols }).map((_, c) => {
              const cellKey = `${r}_${c}`;
              const cellInfo = cellCoverageMap[cellKey];
              const isBlocked = !cellInfo;

              if (isBlocked) {
                return (
                  <div
                    key={cellKey}
                    className="w-full h-full bg-slate-900 dark:bg-slate-950 rounded-[4px] opacity-90 border border-slate-800/40"
                  />
                );
              }

              // Playable cell calculations
              const userLetter = gridState[cellKey] || '';
              const isCellActive = activeCell?.row === r && activeCell?.col === c;

              // Check if cell is in current active word
              const isInActiveWord = activeWord
                ? cellInfo.words.some(
                    (w) => w.number === activeWord.number && w.direction === activeWord.direction
                  )
                : false;

              // Check if all words containing this cell are solved
              const isSolved = cellInfo.words.some((w) =>
                solvedWordKeys.has(`${w.number}_${w.direction}`)
              );

              // Check if cell belongs to a shaking or flashing word
              const isShaking = cellInfo.words.some(
                (w) => `${w.number}_${w.direction}` === shakeWordKey
              );
              const isFlashing = cellInfo.words.some(
                (w) => `${w.number}_${w.direction}` === flashWordKey
              );

              return (
                <div
                  key={cellKey}
                  onClick={() => onCellClick(r, c)}
                  onDoubleClick={() => onCellDoubleClick?.(r, c)}
                  className={`relative w-full h-full flex items-center justify-center rounded-[5px] font-black cursor-pointer transition-all duration-150 ${
                    isFlashing
                      ? 'bg-emerald-400 text-slate-950 ring-4 ring-emerald-300 scale-105 z-20 animate-pulse'
                      : isShaking
                      ? 'bg-rose-500 text-white ring-2 ring-rose-400 animate-shake z-20'
                      : isCellActive
                      ? 'bg-amber-300 dark:bg-amber-400 text-slate-950 ring-3 ring-amber-400 dark:ring-amber-300 shadow-lg scale-105 z-20'
                      : isInActiveWord
                      ? 'bg-indigo-100 dark:bg-indigo-900/90 text-indigo-950 dark:text-indigo-100 ring-1 ring-indigo-400/50'
                      : isSolved
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/80'
                      : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                  }`}
                  style={{
                    fontSize: `${Math.max(12, Math.round(effectiveCellSize * 0.52))}px`,
                  }}
                >
                  {/* Clue number in top-left */}
                  {cellInfo.startNumber !== undefined && (
                    <span
                      className={`absolute top-0.5 left-1 font-mono font-bold leading-none select-none ${
                        isCellActive
                          ? 'text-slate-950'
                          : isSolved
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                      style={{
                        fontSize: `${Math.max(8, Math.round(effectiveCellSize * 0.26))}px`,
                      }}
                    >
                      {cellInfo.startNumber}
                    </span>
                  )}

                  {/* Solved checkmark subtle badge */}
                  {isSolved && !isCellActive && (
                    <div className="absolute bottom-0.5 right-0.5 opacity-40">
                      <Check
                        style={{
                          width: `${Math.max(8, Math.round(effectiveCellSize * 0.25))}px`,
                          height: `${Math.max(8, Math.round(effectiveCellSize * 0.25))}px`,
                        }}
                      />
                    </div>
                  )}

                  {/* Letter display or invisible input for native keyboard binding */}
                  <span className="select-none uppercase font-extrabold tracking-wider">
                    {userLetter}
                  </span>

                  {/* Active Cell Invisible Input for seamless Mobile/Desktop focus capture */}
                  {isCellActive && (
                    <input
                      ref={activeInputRef}
                      type="text"
                      inputMode="text"
                      autoCapitalize="characters"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      enterKeyHint="next"
                      value=""
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val) {
                          const lastChar = val.slice(-1);
                          if (/^[a-zA-Z]$/.test(lastChar)) {
                            onInputLetter?.(lastChar);
                          }
                        }
                      }}
                      onKeyDown={(e) => onKeyDown(e, r, c)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full p-0 m-0 border-0 z-30"
                      aria-label={`Kotak baris ${r + 1} kolom ${c + 1}`}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
