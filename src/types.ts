export interface MedievalVocabItem {
  id: string;
  phrase: string;
  meaning: string;
  pronounce: string;
  phonetic: string;
  category: string;
  categoryEn: string;
  modernEnglish: string;
  historicalNote?: string;
  breakdown?: Array<{ term: string; explanation: string }>;
}

export type EducationLevel = 'SMA' | 'SMK' | 'MA';

export interface PrestigeBreakdown {
  grammar: number;
  vocab: number;
  games: number;
  utbk: number;
  streak: number;
}

export interface PrestigeTierInfo {
  tier: number;
  roman: string;
  name: string;
  minPrestige: number;
  maxPrestige: number;
  badge: string;
  badgeBorder: string;
  badgeText: string;
  iconName: string;
  lore: string;
  perk: string;
  colorGradient: string;
}

export interface StudentProfile {
  name: string;
  educationLevel?: EducationLevel; // 'SMA' | 'SMK' | 'MA'
  classGrade: 'X' | 'XI' | 'XII';
  major?: string; // 'MIPA' | 'IPS' | 'Bahasa' or vocational majors for SMK
  customMajor?: string; // optional custom major text if 'Lainnya'
  schoolName?: string; // e.g. SMAN 1 Surakarta
  schoolNpsn?: string; // e.g. 20327977 (Kemendikdasmen)
  schoolCity?: string; // e.g. Kota Surakarta
  schoolProvince?: string; // e.g. Jawa Tengah
  targetUtbkScore?: string;
  accessCode: string;
  avatarLetter: string;
  avatarUrl?: string;
  joinedDate: string;
  completedLessons: string[]; // lesson IDs
  quizScores: Record<string, number>; // quizID -> score
  streakDays: number;
  totalStudyMinutes: number;
  vocabularyMastered: number;
  universalPrestige?: number; // Nilai akumulasi Universal Prestige
  prestigeBreakdown?: PrestigeBreakdown; // Rincian 5 pilar perolehan Prestige
  prestigeRank?: string; // Gelar kehormatan Prestige (e.g. "Noble Grammarian")
  lastPrestigeUnification?: string; // Timestamp ISO penyatuan terakhir
  email?: string;
  username?: string;
  googleUid?: string;
  isGoogleLinked?: boolean;
  lastSyncedAt?: string;
}

export interface LessonItem {
  id: string;
  category: 'tenses' | 'vocabulary' | 'reading' | 'listening' | 'writing' | 'ice-breaking' | 'speaking' | 'utbk';
  title: string;
  chapterNumber: number;
  gradeLevel: 'X' | 'XI' | 'XII' | 'All';
  description: string;
  durationMinutes: number;
  formula?: string;
  explanation: string;
  usageWhen?: string[]; // Poin-poin situasi kapan digunakan
  timeSignals?: string[]; // Kata keterangan waktu (Time Signals / Adverbs)
  subjectRules?: string[]; // Aturan subjek dan kata kerja
  academicNotes: string;
  examples: Array<{ english: string; indonesian: string; usageNote?: string }>;
  quizQuestions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  passage?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  categoryTag?: string;
  questionType?: 'mcq' | 'best-sentence' | 'fill-in' | 'error-correction' | 'passive' | 'interrogative' | 'negative' | 'reported-speech' | 'word-scramble' | 'context' | 'translation' | 'complex-clause' | 'transformation';
  questionTypeLabel?: string;
  correctAnswerText?: string;
  acceptableAnswers?: string[];
  scrambleWords?: string[];
  sourceReference?: string;
}

export interface UtbkQuestion {
  id: string;
  title: string;
  passage: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  skillType: string;
  difficulty?: 'Mudah' | 'Sedang' | 'Sulit';
  pointWeight?: number;
}

export interface GrammarCheckResult {
  correctedText: string;
  isCorrect: boolean;
  grammarExplanation: string;
  academicVocabularyTips: string[];
  errorCategory?: string;
  highlightedDiff?: Array<{ text: string; type: 'unchanged' | 'removed' | 'added' }>;
}

export interface WritingFeedbackResult {
  score: number;
  summaryFeedback: string;
  grammarScore: number;
  vocabularyScore: number;
  coherenceScore: number;
  strengths: string[];
  improvements: string[];
  academicRewrite: string;
}

export interface ListeningItem {
  id: string;
  title: string;
  gradeLevel: 'X' | 'XI' | 'XII';
  topic: string;
  speaker: string;
  accent: string;
  audioText: string;
  transcript: Array<{ speaker: string; text: string; time?: string; gender?: 'male' | 'female' }>;
  questions: QuizQuestion[];
}
