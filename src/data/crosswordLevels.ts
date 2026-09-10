export interface CrosswordWord {
  number: number;
  direction: 'across' | 'down';
  word: string;
  clue: string;
  row: number;
  col: number;
  points: number;
}

export interface CrosswordLevelRaw {
  level: number;
  cefr: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  subtitle: string;
  description: string;
  passingScorePercent: number; // e.g. 70
  words: CrosswordWord[];
}

export interface CrosswordLevel extends CrosswordLevelRaw {
  gridRows: number;
  gridCols: number;
  totalPoints: number;
}

export const RAW_CROSSWORD_LEVELS: CrosswordLevelRaw[] = [
  // =========================================================================
  // LEVEL 1: A1 - Pemula (Beginner)
  // Grid: 8x11 | 5 Kata | 10 Poin/Kata | Total 50 Poin
  // =========================================================================
  {
    level: 1,
    cefr: 'A1',
    title: 'Level 1: Pemula (A1)',
    subtitle: 'Everyday Objects & Basic Vocab',
    description: 'Kosakata dasar benda di sekitar rumah dan kehidupan sehari-hari.',
    passingScorePercent: 70,
    words: [
      {
        number: 1,
        direction: 'across',
        word: 'CHAIR',
        clue: 'A piece of furniture you sit on, usually with a back and four legs.',
        row: 0,
        col: 6,
        points: 10,
      },
      {
        number: 2,
        direction: 'down',
        word: 'HOUSE',
        clue: 'A building where a family lives.',
        row: 0,
        col: 7,
        points: 10,
      },
      {
        number: 3,
        direction: 'down',
        word: 'TABLE',
        clue: 'A piece of furniture with a flat top and legs, used for eating or writing.',
        row: 3,
        col: 3,
        points: 10,
      },
      {
        number: 4,
        direction: 'across',
        word: 'APPLE',
        clue: 'A round fruit, often red or green, that grows on trees.',
        row: 4,
        col: 3,
        points: 10,
      },
      {
        number: 5,
        direction: 'across',
        word: 'WATER',
        clue: 'A clear liquid that people and animals drink to live.',
        row: 7,
        col: 0,
        points: 10,
      },
    ],
  },

  // =========================================================================
  // LEVEL 2: A2 - Dasar (Elementary)
  // Grid: 10x12 | 6 Kata | 15 Poin/Kata | Total 90 Poin
  // =========================================================================
  {
    level: 2,
    cefr: 'A2',
    title: 'Level 2: Dasar (A2)',
    subtitle: 'Daily Routines, Feelings & Time',
    description: 'Aktivitas harian, waktu, perasaan, dan lingkungan pertemanan.',
    passingScorePercent: 70,
    words: [
      {
        number: 1,
        direction: 'across',
        word: 'WEEKEND',
        clue: "Saturday and Sunday, the days when many people don't work.",
        row: 0,
        col: 5,
        points: 15,
      },
      {
        number: 2,
        direction: 'down',
        word: 'EVENING',
        clue: 'The part of the day between afternoon and night.',
        row: 0,
        col: 9,
        points: 15,
      },
      {
        number: 3,
        direction: 'down',
        word: 'FRIEND',
        clue: 'A person you know well and like.',
        row: 4,
        col: 7,
        points: 15,
      },
      {
        number: 4,
        direction: 'down',
        word: 'HOBBY',
        clue: 'An activity you do for fun in your free time.',
        row: 5,
        col: 4,
        points: 15,
      },
      {
        number: 5,
        direction: 'across',
        word: 'MORNING',
        clue: 'The part of the day between sunrise and noon.',
        row: 6,
        col: 3,
        points: 15,
      },
      {
        number: 6,
        direction: 'across',
        word: 'HAPPY',
        clue: 'Feeling good and pleased about something.',
        row: 9,
        col: 0,
        points: 15,
      },
    ],
  },

  // =========================================================================
  // LEVEL 3: B1 - Menengah Awal (Intermediate)
  // Grid: 12x11 | 8 Kata | 20 Poin/Kata | Total 160 Poin
  // =========================================================================
  {
    level: 3,
    cefr: 'B1',
    title: 'Level 3: Menengah Awal (B1)',
    subtitle: 'Environment, Travel & Technology',
    description: 'Kalimat rumpang tematik mengenai perjalanan, lingkungan, dan energi.',
    passingScorePercent: 70,
    words: [
      {
        number: 1,
        direction: 'down',
        word: 'FACTORY',
        clue: 'This ___ produces thousands of cars every year.',
        row: 0,
        col: 8,
        points: 20,
      },
      {
        number: 2,
        direction: 'across',
        word: 'VILLAGE',
        clue: 'My grandparents live in a small ___ near the mountains.',
        row: 1,
        col: 4,
        points: 20,
      },
      {
        number: 3,
        direction: 'across',
        word: 'AIRPORT',
        clue: 'We need to be at the ___ two hours before our flight.',
        row: 3,
        col: 2,
        points: 20,
      },
      {
        number: 4,
        direction: 'down',
        word: 'WEATHER',
        clue: 'The ___ forecast says it will rain tomorrow.',
        row: 5,
        col: 0,
        points: 20,
      },
      {
        number: 5,
        direction: 'down',
        word: 'LUGGAGE',
        clue: 'Please make sure your ___ fits in the overhead compartment.',
        row: 5,
        col: 4,
        points: 20,
      },
      {
        number: 6,
        direction: 'across',
        word: 'JOURNEY',
        clue: 'After a long ___, they finally arrived at the hotel.',
        row: 6,
        col: 2,
        points: 20,
      },
      {
        number: 7,
        direction: 'across',
        word: 'GARBAGE',
        clue: 'Please take out the ___ before it starts to smell.',
        row: 8,
        col: 4,
        points: 20,
      },
      {
        number: 8,
        direction: 'across',
        word: 'ENERGY',
        clue: 'Solar panels convert sunlight into ___.',
        row: 10,
        col: 0,
        points: 20,
      },
    ],
  },

  // =========================================================================
  // LEVEL 4: B2 - Menengah Atas (Upper Intermediate)
  // Grid: 13x13 | 9 Kata | 25 Poin/Kata | Total 225 Poin
  // =========================================================================
  {
    level: 4,
    cefr: 'B2',
    title: 'Level 4: Menengah Atas (B2)',
    subtitle: 'Character, Strategy & Social Concepts',
    description: 'Kosakata analitis, psikologis, dan perencanaan strategis.',
    passingScorePercent: 70,
    words: [
      {
        number: 1,
        direction: 'down',
        word: 'INFLUENCE',
        clue: 'Social media has a huge ___ on how young people think.',
        row: 0,
        col: 2,
        points: 25,
      },
      {
        number: 2,
        direction: 'down',
        word: 'STRATEGY',
        clue: 'The team needed a new ___ to win the competition.',
        row: 1,
        col: 0,
        points: 25,
      },
      {
        number: 3,
        direction: 'down',
        word: 'CHALLENGE',
        clue: 'Learning a new language later in life is a real ___.',
        row: 1,
        col: 4,
        points: 25,
      },
      {
        number: 4,
        direction: 'across',
        word: 'RELIABLE',
        clue: "You can always count on her; she's extremely ___.",
        row: 3,
        col: 0,
        points: 25,
      },
      {
        number: 5,
        direction: 'down',
        word: 'ARGUMENT',
        clue: 'They had a heated ___ about which policy was better.',
        row: 4,
        col: 12,
        points: 25,
      },
      {
        number: 6,
        direction: 'down',
        word: 'ANXIOUS',
        clue: 'I felt ___ while waiting for my exam results.',
        row: 6,
        col: 9,
        points: 25,
      },
      {
        number: 7,
        direction: 'across',
        word: 'CONFIDENT',
        clue: 'She felt completely ___ before the job interview.',
        row: 7,
        col: 2,
        points: 25,
      },
      {
        number: 8,
        direction: 'across',
        word: 'ACHIEVE',
        clue: 'It took years of hard work to ___ her goals.',
        row: 9,
        col: 6,
        points: 25,
      },
      {
        number: 9,
        direction: 'across',
        word: 'GENEROUS',
        clue: "He's incredibly ___; he always shares what he has.",
        row: 12,
        col: 2,
        points: 25,
      },
    ],
  },

  // =========================================================================
  // LEVEL 5: C1 - Mahir (Advanced)
  // Grid: 14x14 | 10 Kata | 30 Poin/Kata | Total 300 Poin
  // =========================================================================
  {
    level: 5,
    cefr: 'C1',
    title: 'Level 5: Mahir (C1)',
    subtitle: 'Academic Rigor, Logic & Critical Thinking',
    description: 'Kosakata akademik tingkat lanjut untuk esai dan argumentasi ilmiah.',
    passingScorePercent: 70,
    words: [
      {
        number: 1,
        direction: 'down',
        word: 'COHERENT',
        clue: 'Logical and well-organized; easy to follow.',
        row: 0,
        col: 8,
        points: 30,
      },
      {
        number: 2,
        direction: 'across',
        word: 'AMBIGUOUS',
        clue: 'Having more than one possible meaning; unclear.',
        row: 1,
        col: 2,
        points: 30,
      },
      {
        number: 3,
        direction: 'down',
        word: 'INEVITABLE',
        clue: 'Certain to happen; impossible to avoid.',
        row: 1,
        col: 13,
        points: 30,
      },
      {
        number: 4,
        direction: 'down',
        word: 'PERVASIVE',
        clue: 'Spreading widely throughout an area or group.',
        row: 2,
        col: 1,
        points: 30,
      },
      {
        number: 5,
        direction: 'across',
        word: 'CREDIBLE',
        clue: 'Able to be believed; trustworthy and convincing.',
        row: 3,
        col: 6,
        points: 30,
      },
      {
        number: 6,
        direction: 'down',
        word: 'RESILIENT',
        clue: 'Able to recover quickly from difficulties; tough.',
        row: 5,
        col: 4,
        points: 30,
      },
      {
        number: 7,
        direction: 'down',
        word: 'PARADOX',
        clue: 'A statement that seems self-contradictory but may be true.',
        row: 6,
        col: 10,
        points: 30,
      },
      {
        number: 8,
        direction: 'across',
        word: 'SUBSTANTIAL',
        clue: 'Of considerable importance, size, or worth.',
        row: 7,
        col: 1,
        points: 30,
      },
      {
        number: 9,
        direction: 'across',
        word: 'METICULOUS',
        clue: 'Showing great attention to detail; extremely careful.',
        row: 11,
        col: 3,
        points: 30,
      },
      {
        number: 10,
        direction: 'across',
        word: 'SCRUTINY',
        clue: 'Critical observation or close examination.',
        row: 13,
        col: 0,
        points: 30,
      },
    ],
  },

  // =========================================================================
  // LEVEL 6: C2 - Mahir Tinggi (Mastery / Proficiency)
  // Grid: 17x17 | 12 Kata | 40 Poin/Kata | Total 480 Poin
  // =========================================================================
  {
    level: 6,
    cefr: 'C2',
    title: 'Level 6: Mahir Tinggi (C2)',
    subtitle: 'Nuanced Lexicon, Philosophy & Mastery',
    description: 'Tingkat tertinggi penguasaan leksikon bahasa Inggris klasik & modern.',
    passingScorePercent: 70,
    words: [
      {
        number: 1,
        direction: 'down',
        word: 'PLAUSIBLE',
        clue: 'Seeming reasonable or probable; believable.',
        row: 0,
        col: 4,
        points: 40,
      },
      {
        number: 2,
        direction: 'across',
        word: 'CONUNDRUM',
        clue: 'A confusing and difficult problem or question.',
        row: 0,
        col: 6,
        points: 40,
      },
      {
        number: 2,
        direction: 'down',
        word: 'CIRCUMSPECT',
        clue: 'Wary and unwilling to take risks; very cautious.',
        row: 0,
        col: 6,
        points: 40,
      },
      {
        number: 3,
        direction: 'down',
        word: 'GRATUITOUS',
        clue: 'Uncalled for; done without any good reason.',
        row: 2,
        col: 12,
        points: 40,
      },
      {
        number: 4,
        direction: 'across',
        word: 'PERFUNCTORY',
        clue: 'Done as a routine, without real interest or effort.',
        row: 3,
        col: 0,
        points: 40,
      },
      {
        number: 5,
        direction: 'down',
        word: 'UBIQUITOUS',
        clue: 'Seeming to be present everywhere at the same time.',
        row: 5,
        col: 0,
        points: 40,
      },
      {
        number: 6,
        direction: 'down',
        word: 'EPHEMERAL',
        clue: 'Lasting for a very short time; fleeting.',
        row: 7,
        col: 10,
        points: 40,
      },
      {
        number: 7,
        direction: 'across',
        word: 'SERENDIPITY',
        clue: 'Finding something valuable or pleasant by pure chance.',
        row: 8,
        col: 3,
        points: 40,
      },
      {
        number: 8,
        direction: 'down',
        word: 'EQUIVOCAL',
        clue: 'Open to more than one interpretation; deliberately vague.',
        row: 8,
        col: 16,
        points: 40,
      },
      {
        number: 9,
        direction: 'across',
        word: 'INSCRUTABLE',
        clue: 'Impossible to understand or interpret; mysterious.',
        row: 10,
        col: 0,
        points: 40,
      },
      {
        number: 10,
        direction: 'across',
        word: 'OBFUSCATE',
        clue: 'To deliberately make something unclear or confusing.',
        row: 12,
        col: 2,
        points: 40,
      },
      {
        number: 11,
        direction: 'across',
        word: 'PRAGMATIC',
        clue: 'Dealing with things sensibly and realistically.',
        row: 14,
        col: 8,
        points: 40,
      },
    ],
  },
];

/**
 * Derives gridRows, gridCols, and totalPoints dynamically from words array
 */
export function processLevel(raw: CrosswordLevelRaw): CrosswordLevel {
  let maxRow = 0;
  let maxCol = 0;
  let totalPoints = 0;

  for (const word of raw.words) {
    totalPoints += word.points;
    const len = word.word.length;
    if (word.direction === 'across') {
      const endCol = word.col + len - 1;
      if (word.row > maxRow) maxRow = word.row;
      if (endCol > maxCol) maxCol = endCol;
    } else {
      const endRow = word.row + len - 1;
      if (endRow > maxRow) maxRow = endRow;
      if (word.col > maxCol) maxCol = word.col;
    }
  }

  return {
    ...raw,
    gridRows: maxRow + 1,
    gridCols: maxCol + 1,
    totalPoints,
  };
}

export const CROSSWORD_LEVELS: CrosswordLevel[] = RAW_CROSSWORD_LEVELS.map(processLevel);

export function getCrosswordLevel(levelNumber: number): CrosswordLevel | undefined {
  return CROSSWORD_LEVELS.find((lvl) => lvl.level === levelNumber);
}
