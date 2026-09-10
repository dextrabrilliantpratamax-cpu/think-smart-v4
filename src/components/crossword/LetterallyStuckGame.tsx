import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  CROSSWORD_LEVELS,
  CrosswordLevel,
  CrosswordWord,
  getCrosswordLevel,
} from '../../data/crosswordLevels';
import { LevelSelector } from './LevelSelector';
import { CrosswordGrid } from './CrosswordGrid';
import { ClueList } from './ClueList';
import { ScoreBar } from './ScoreBar';
import { LevelCompleteModal } from './LevelCompleteModal';
import { playFeedbackSound } from '../../utils/feedbackSound';
import { recordActivityPrestige } from '../../utils/prestigeManager';
import {
  HelpCircle,
  Sparkles,
  ChevronRight,
  ArrowRight,
  ArrowDown,
  Keyboard,
  Smartphone
} from 'lucide-react';

const STORAGE_KEY_UNLOCKED = 'ts_letterally_stuck_unlocked';
const STORAGE_KEY_SCORES = 'ts_letterally_stuck_scores';

export interface LetterallyStuckGameProps {
  onAddScore?: (category: string, score: number) => void;
}

export const LetterallyStuckGame: React.FC<LetterallyStuckGameProps> = ({ onAddScore }) => {
  // Persistence state
  const [unlockedLevel, setUnlockedLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_UNLOCKED);
      return saved ? Math.max(1, parseInt(saved, 10)) : 1;
    } catch {
      return 1;
    }
  });

  const [bestScores, setBestScores] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SCORES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Active level state (null = showing LevelSelector)
  const [selectedLevelNumber, setSelectedLevelNumber] = useState<number | null>(null);

  // In-game state
  const [gridState, setGridState] = useState<Record<string, string>>({});
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
  const [activeWord, setActiveWord] = useState<CrosswordWord | null>(null);
  const [solvedWordKeys, setSolvedWordKeys] = useState<Set<string>>(new Set());
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [hintsRemaining, setHintsRemaining] = useState<number>(3);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [shakeWordKey, setShakeWordKey] = useState<string | null>(null);
  const [flashWordKey, setFlashWordKey] = useState<string | null>(null);
  const [showLevelComplete, setShowLevelComplete] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  const currentLevel: CrosswordLevel | undefined = selectedLevelNumber
    ? getCrosswordLevel(selectedLevelNumber)
    : undefined;

  // Persist unlock & scores
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_UNLOCKED, unlockedLevel.toString());
    } catch {
      // Ignore
    }
  }, [unlockedLevel]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SCORES, JSON.stringify(bestScores));
    } catch {
      // Ignore
    }
  }, [bestScores]);

  // Start timer when level is loaded
  useEffect(() => {
    if (selectedLevelNumber && !showLevelComplete) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [selectedLevelNumber, showLevelComplete]);

  // Launch a level
  const handleStartLevel = (levelNumber: number) => {
    const lvl = getCrosswordLevel(levelNumber);
    if (!lvl) return;

    setSelectedLevelNumber(levelNumber);
    setGridState({});
    setSolvedWordKeys(new Set());
    setCurrentScore(0);
    setHintsRemaining(3);
    setElapsedSeconds(0);
    setShowLevelComplete(false);
    setShakeWordKey(null);
    setFlashWordKey(null);

    // Default active word is the first word in level
    if (lvl.words.length > 0) {
      const firstWord = lvl.words[0];
      setActiveWord(firstWord);
      setActiveCell({ row: firstWord.row, col: firstWord.col });
    }
  };

  // Find word covering coordinates
  const findWordsAtCell = (lvl: CrosswordLevel, r: number, c: number): CrosswordWord[] => {
    return lvl.words.filter((w) => {
      if (w.direction === 'across') {
        return w.row === r && c >= w.col && c < w.col + w.word.length;
      } else {
        return w.col === c && r >= w.row && r < w.row + w.word.length;
      }
    });
  };

  // Cell click handler
  const handleCellClick = (r: number, c: number) => {
    if (!currentLevel) return;

    const coveringWords = findWordsAtCell(currentLevel, r, c);
    if (coveringWords.length === 0) return;

    // If cell is already active, toggle direction if cell has multiple words
    if (activeCell?.row === r && activeCell?.col === c && coveringWords.length > 1) {
      const nextWord = coveringWords.find(
        (w) => w.direction !== activeWord?.direction
      ) || coveringWords[0];
      setActiveWord(nextWord);
      if (soundEnabled) playFeedbackSound('click');
      return;
    }

    setActiveCell({ row: r, col: c });

    // Pick best matching word (keep same direction if possible)
    let matchedWord = coveringWords.find((w) => w.direction === activeWord?.direction);
    if (!matchedWord) {
      matchedWord = coveringWords[0];
    }
    setActiveWord(matchedWord);
    if (soundEnabled) playFeedbackSound('click');
  };

  // Double click to toggle across/down
  const handleCellDoubleClick = (r: number, c: number) => {
    if (!currentLevel) return;
    const coveringWords = findWordsAtCell(currentLevel, r, c);
    if (coveringWords.length > 1) {
      const nextWord = coveringWords.find(
        (w) => w.direction !== activeWord?.direction
      ) || coveringWords[0];
      setActiveWord(nextWord);
      if (soundEnabled) playFeedbackSound('click');
    }
  };

  // Select a clue from the list
  const handleSelectWord = (word: CrosswordWord) => {
    if (!currentLevel) return;
    setActiveWord(word);

    // Find first empty cell in this word, or start of word
    let targetCell = { row: word.row, col: word.col };
    for (let i = 0; i < word.word.length; i++) {
      const r = word.direction === 'across' ? word.row : word.row + i;
      const c = word.direction === 'across' ? word.col + i : word.col;
      const letter = gridState[`${r}_${c}`];
      if (!letter) {
        targetCell = { row: r, col: c };
        break;
      }
    }
    setActiveCell(targetCell);
  };

  // Check if a specific word is complete and correct
  const evaluateWord = useCallback(
    (word: CrosswordWord, currentGrid: Record<string, string>) => {
      if (!currentLevel) return;

      const wordKey = `${word.number}_${word.direction}`;
      if (solvedWordKeys.has(wordKey)) return;

      let filledText = '';
      let isFullyFilled = true;

      for (let i = 0; i < word.word.length; i++) {
        const r = word.direction === 'across' ? word.row : word.row + i;
        const c = word.direction === 'across' ? word.col + i : word.col;
        const letter = currentGrid[`${r}_${c}`];
        if (!letter) {
          isFullyFilled = false;
          break;
        }
        filledText += letter.toUpperCase();
      }

      if (!isFullyFilled) return;

      if (filledText === word.word) {
        // Word is CORRECT!
        const newSolved = new Set(solvedWordKeys);
        newSolved.add(wordKey);
        setSolvedWordKeys(newSolved);

        const newScore = currentScore + word.points;
        setCurrentScore(newScore);

        setFlashWordKey(wordKey);
        setTimeout(() => setFlashWordKey(null), 1200);

        if (soundEnabled) playFeedbackSound('correct');

        // Check if all words in the level are solved
        if (newSolved.size >= currentLevel.words.length) {
          setTimeout(() => {
            handleLevelVictory(newScore);
          }, 800);
        }
      } else {
        // Word is WRONG
        setShakeWordKey(wordKey);
        setTimeout(() => setShakeWordKey(null), 600);
        if (soundEnabled) playFeedbackSound('wrong');
      }
    },
    [currentLevel, solvedWordKeys, currentScore, soundEnabled]
  );

  // Victory Handler
  const handleLevelVictory = (finalScore: number) => {
    if (!currentLevel) return;

    // Update best score for this level
    setBestScores((prev) => ({
      ...prev,
      [currentLevel.level]: Math.max(prev[currentLevel.level] || 0, finalScore),
    }));

    // Record Prestige and auto-synchronize to Universal Prestige Hub
    recordActivityPrestige('crossword', finalScore);
    if (onAddScore) onAddScore('crossword', finalScore);

    // Unlock next level if score reaches 70% passing threshold
    const passingThreshold = Math.ceil(currentLevel.totalPoints * 0.7);
    if (finalScore >= passingThreshold && currentLevel.level < 6) {
      setUnlockedLevel((prev) => Math.max(prev, currentLevel.level + 1));
    }

    setShowLevelComplete(true);
  };

  // Cell letter update & auto-advance
  const handleInputLetter = (letter: string) => {
    if (!currentLevel || !activeCell || !activeWord) return;

    const upperLetter = letter.toUpperCase();
    if (!/^[A-Z]$/.test(upperLetter)) return;

    const cellKey = `${activeCell.row}_${activeCell.col}`;
    const newGrid = { ...gridState, [cellKey]: upperLetter };
    setGridState(newGrid);

    if (soundEnabled) playFeedbackSound('click');

    // Auto-advance to next cell in active word
    const currentIndex =
      activeWord.direction === 'across'
        ? activeCell.col - activeWord.col
        : activeCell.row - activeWord.row;

    if (currentIndex < activeWord.word.length - 1) {
      const nextCell = {
        row: activeWord.direction === 'across' ? activeWord.row : activeWord.row + currentIndex + 1,
        col: activeWord.direction === 'across' ? activeWord.col + currentIndex + 1 : activeWord.col,
      };
      setActiveCell(nextCell);
    }

    // Evaluate the active word
    evaluateWord(activeWord, newGrid);

    // Also evaluate any intersecting word at this cell
    const intersectingWords = findWordsAtCell(currentLevel, activeCell.row, activeCell.col).filter(
      (w) => `${w.number}_${w.direction}` !== `${activeWord.number}_${activeWord.direction}`
    );
    intersectingWords.forEach((iw) => evaluateWord(iw, newGrid));
  };

  // Backspace handler
  const handleBackspace = () => {
    if (!currentLevel || !activeCell || !activeWord) return;

    const cellKey = `${activeCell.row}_${activeCell.col}`;
    const currentVal = gridState[cellKey];

    const currentIndex =
      activeWord.direction === 'across'
        ? activeCell.col - activeWord.col
        : activeCell.row - activeWord.row;

    if (currentVal) {
      // Clear current cell
      const newGrid = { ...gridState };
      delete newGrid[cellKey];
      setGridState(newGrid);
    } else if (currentIndex > 0) {
      // Move to previous cell and clear it
      const prevCell = {
        row: activeWord.direction === 'across' ? activeWord.row : activeWord.row + currentIndex - 1,
        col: activeWord.direction === 'across' ? activeWord.col + currentIndex - 1 : activeWord.col,
      };
      const prevKey = `${prevCell.row}_${prevCell.col}`;
      const newGrid = { ...gridState };
      delete newGrid[prevKey];
      setGridState(newGrid);
      setActiveCell(prevCell);
    }
  };

  // Global window key listener for seamless desktop typing
  useEffect(() => {
    if (!selectedLevelNumber || showLevelComplete) return;

    const onGlobalKeyDown = (e: KeyboardEvent) => {
      // Ignore if event target is another interactive input outside crossword
      if (
        document.activeElement &&
        document.activeElement.tagName === 'INPUT' &&
        document.activeElement.getAttribute('aria-label') === null
      ) {
        return;
      }

      if (activeCell) {
        // Delegate to existing handler
        handleKeyDown(e as unknown as React.KeyboardEvent, activeCell.row, activeCell.col);
      }
    };

    window.addEventListener('keydown', onGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', onGlobalKeyDown);
    };
  }, [selectedLevelNumber, showLevelComplete, activeCell, activeWord, currentLevel, gridState, solvedWordKeys]);

  // KeyDown event from keyboard or invisible input
  const handleKeyDown = (e: React.KeyboardEvent, r: number, c: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      handleBackspace();
    } else if (e.key === ' ') {
      // Space key: toggle direction if intersection cell
      e.preventDefault();
      if (currentLevel) {
        const coveringWords = findWordsAtCell(currentLevel, r, c);
        if (coveringWords.length > 1) {
          const nextWord = coveringWords.find(
            (w) => w.direction !== activeWord?.direction
          ) || coveringWords[0];
          setActiveWord(nextWord);
          if (soundEnabled) playFeedbackSound('click');
        }
      }
    } else if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault();
      // Jump to next unsolved word in level
      if (currentLevel) {
        const unsolved = currentLevel.words.filter(
          (w) => !solvedWordKeys.has(`${w.number}_${w.direction}`)
        );
        if (unsolved.length > 0) {
          const currentIdx = unsolved.findIndex(
            (w) => w.number === activeWord?.number && w.direction === activeWord?.direction
          );
          const nextWord = unsolved[(currentIdx + 1) % unsolved.length];
          handleSelectWord(nextWord);
        }
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (currentLevel && c + 1 < currentLevel.gridCols) {
        const targetWords = findWordsAtCell(currentLevel, r, c + 1);
        if (targetWords.length > 0) {
          setActiveCell({ row: r, col: c + 1 });
        }
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentLevel && c - 1 >= 0) {
        const targetWords = findWordsAtCell(currentLevel, r, c - 1);
        if (targetWords.length > 0) {
          setActiveCell({ row: r, col: c - 1 });
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentLevel && r + 1 < currentLevel.gridRows) {
        const targetWords = findWordsAtCell(currentLevel, r + 1, c);
        if (targetWords.length > 0) {
          setActiveCell({ row: r + 1, col: c });
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentLevel && r - 1 >= 0) {
        const targetWords = findWordsAtCell(currentLevel, r - 1, c);
        if (targetWords.length > 0) {
          setActiveCell({ row: r - 1, col: c });
        }
      }
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault();
      handleInputLetter(e.key);
    }
  };

  // Power-up Hint
  const handleUseHint = () => {
    if (!currentLevel || hintsRemaining <= 0 || !activeWord) return;

    // Find the first empty or wrong cell in the current active word
    let targetIndex = -1;
    for (let i = 0; i < activeWord.word.length; i++) {
      const r = activeWord.direction === 'across' ? activeWord.row : activeWord.row + i;
      const c = activeWord.direction === 'across' ? activeWord.col + i : activeWord.col;
      const key = `${r}_${c}`;
      const userLetter = gridState[key];
      const correctLetter = activeWord.word[i];

      if (!userLetter || userLetter.toUpperCase() !== correctLetter) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex === -1) return; // Word is already correct

    const r =
      activeWord.direction === 'across' ? activeWord.row : activeWord.row + targetIndex;
    const c =
      activeWord.direction === 'across' ? activeWord.col + targetIndex : activeWord.col;
    const key = `${r}_${c}`;
    const correctLetter = activeWord.word[targetIndex];

    const newGrid = { ...gridState, [key]: correctLetter };
    setGridState(newGrid);
    setHintsRemaining((prev) => Math.max(0, prev - 1));
    setActiveCell({ row: r, col: c });

    if (soundEnabled) playFeedbackSound('sparkle');

    // Re-evaluate word
    evaluateWord(activeWord, newGrid);
  };

  // Reset grid (clears user entries that are not part of locked solved words)
  const handleResetGrid = () => {
    setGridState({});
    setSolvedWordKeys(new Set());
    setCurrentScore(0);
    if (soundEnabled) playFeedbackSound('click');
  };

  // Navigation callbacks
  const handleNextLevel = () => {
    if (!currentLevel) return;
    const nextLvlNum = currentLevel.level + 1;
    if (nextLvlNum <= 6) {
      handleStartLevel(nextLvlNum);
    } else {
      setSelectedLevelNumber(null);
    }
  };

  const handleReplay = () => {
    if (selectedLevelNumber) {
      handleStartLevel(selectedLevelNumber);
    }
  };

  const handleBackToMap = () => {
    setSelectedLevelNumber(null);
    setShowLevelComplete(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. Level Map Selector View */}
      {!selectedLevelNumber || !currentLevel ? (
        <LevelSelector
          levels={CROSSWORD_LEVELS}
          unlockedLevel={unlockedLevel}
          bestScores={bestScores}
          onSelectLevel={handleStartLevel}
          soundEnabled={soundEnabled}
        />
      ) : (
        /* 2. Active Crossword Game View */
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header & Metrics */}
          <ScoreBar
            level={currentLevel}
            currentScore={currentScore}
            solvedWordsCount={solvedWordKeys.size}
            totalWordsCount={currentLevel.words.length}
            elapsedSeconds={elapsedSeconds}
            hintsRemaining={hintsRemaining}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled((prev) => !prev)}
            onBackToLevels={handleBackToMap}
            onUseHint={handleUseHint}
            onResetGrid={handleResetGrid}
          />

          {/* Active Clue Focus Banner */}
          {activeWord && (
            <div className="p-4 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-2xl border border-indigo-500/40 text-white flex flex-wrap items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                  {activeWord.number}
                </span>
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                    <span className="flex items-center gap-1 uppercase">
                      {activeWord.direction === 'across' ? (
                        <>
                          <ArrowRight className="w-3 h-3" /> Across (Mendatar)
                        </>
                      ) : (
                        <>
                          <ArrowDown className="w-3 h-3" /> Down (Menurun)
                        </>
                      )}
                    </span>
                    <span>· {activeWord.word.length} Huruf</span>
                    <span>· +{activeWord.points} Poin</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                    {activeWord.clue}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleUseHint}
                disabled={hintsRemaining <= 0}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-extrabold text-xs rounded-xl transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Buka Huruf</span>
              </button>
            </div>
          )}

          {/* Main Play Area: Crossword Grid (Left) + Clues List (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Crossword Grid Column */}
            <div className="lg:col-span-7 space-y-4">
              <CrosswordGrid
                level={currentLevel}
                gridState={gridState}
                activeCell={activeCell}
                activeWord={activeWord}
                solvedWordKeys={solvedWordKeys}
                shakeWordKey={shakeWordKey}
                flashWordKey={flashWordKey}
                onCellClick={handleCellClick}
                onCellDoubleClick={handleCellDoubleClick}
                onKeyDown={handleKeyDown}
                onInputLetter={handleInputLetter}
                onBackspace={handleBackspace}
              />

              {/* Intuitive Input Guidance Bar */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5 text-[11px] text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <Keyboard className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold">
                    <b>PC:</b> Ketik langsung huruf, panah untuk navigasi sel, <b>Backspace</b> untuk hapus, <b>Spasi</b> untuk ubah arah.
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
                  <span><b>HP:</b> Sentuh sel untuk mengetik via keyboard layar.</span>
                </div>
              </div>
            </div>

            {/* Clues Column */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <ClueList
                words={currentLevel.words}
                activeWord={activeWord}
                solvedWordKeys={solvedWordKeys}
                onSelectWord={handleSelectWord}
                soundEnabled={soundEnabled}
              />
            </div>
          </div>

          {/* Level Complete Victory Celebration Modal */}
          {showLevelComplete && (
            <LevelCompleteModal
              level={currentLevel}
              score={currentScore}
              elapsedSeconds={elapsedSeconds}
              hasNextLevel={currentLevel.level < 6}
              onNextLevel={handleNextLevel}
              onReplay={handleReplay}
              onBackToMap={handleBackToMap}
              soundEnabled={soundEnabled}
            />
          )}
        </div>
      )}
    </div>
  );
};
