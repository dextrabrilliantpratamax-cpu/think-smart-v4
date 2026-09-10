import { ALL_16_TENSES } from '../data/tensesData';
import { MEDIEVAL_VOCABULARY_FLASHCARDS, LISTENING_LAB_ITEMS } from '../data/curriculumData';
import { UTBK_2026_QUESTIONS } from '../data/utbkQuestions';

export type SearchCategory = 'all' | 'tenses' | 'vocab' | 'utbk' | 'listening' | 'icebreaking' | 'modules';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: SearchCategory;
  categoryLabel: string;
  badgeColor: string;
  targetTab: 'home' | 'tenses' | 'vocab' | 'utbk' | 'ai' | 'icebreaking' | 'listening' | 'progress';
  targetId?: string;
  meta?: {
    pronounceText?: string;
    grade?: string;
    difficulty?: string;
    tag?: string;
    score?: number;
    extraAction?: string;
  };
}

export const QUICK_MODULES: SearchResultItem[] = [
  {
    id: 'mod-beranda',
    title: 'Beranda & Profil PT Tiga Serangkai',
    subtitle: 'Portal Resmi Pendamping Buku Teks Bahasa Inggris SMA',
    description: 'Visi misi digital, profil sejarah penerbit Tiga Serangkai Solo sejak 1958, sertifikasi ISO 9001, dan rangkuman modul belajar.',
    category: 'modules',
    categoryLabel: 'Portal Utama',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300',
    targetTab: 'home',
  },
  {
    id: 'mod-tenses',
    title: '16 Tenses English Reference',
    subtitle: 'Garis Waktu Present, Past, Future, dan Past Future',
    description: 'Panduan tenses lengkap dengan rumus (+/-/?), situasi pemakaian (usage), aturan subjek, time signals, dan latihan kuis interaktif.',
    category: 'modules',
    categoryLabel: 'Tata Bahasa',
    badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-300',
    targetTab: 'tenses',
  },
  {
    id: 'mod-vocab',
    title: 'Bank Kosakata Medieval & Akademia',
    subtitle: '25 Frasa Kuno & Istilah Bahasa Inggris Klasik-Modern',
    description: 'Flashcard 3D berputar, pelafalan audio suara, audio player interaktif, bedah etimologi kuno, dan kuis power-up arena.',
    category: 'modules',
    categoryLabel: 'Kosakata',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
    targetTab: 'vocab',
  },
  {
    id: 'mod-utbk',
    title: 'Simulasi UTBK / SNBT 2026',
    subtitle: 'Latihan Literasi Bahasa Inggris Standar Nasional',
    description: '11 Paket latihan (77 Soal) reading passages, inference, vocabulary in context, main idea, dan pembahasan kunci jawaban.',
    category: 'modules',
    categoryLabel: 'SNBT 2026',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
    targetTab: 'utbk',
  },
  {
    id: 'mod-listening',
    title: 'Listening Lab (British & American Accent)',
    subtitle: 'Latihan Menyimak Dialog & Monolog SMA',
    description: 'Audio speech synthesis jernih aksen UK & US, kecepatan putar dinamis, transkrip sinkron, dan soal pemahaman audio.',
    category: 'modules',
    categoryLabel: 'Listening',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300',
    targetTab: 'listening',
  },
  {
    id: 'mod-icebreaking',
    title: 'Zona Fun & Educational Games',
    subtitle: 'Game Edukasi Bahasa Inggris Interaktif',
    description: 'Permainan sambung kata kilat (Life Sentence), Frankensentence, mesin waktu tenses & irregular verbs, serta arena kuis edukatif.',
    category: 'modules',
    categoryLabel: 'Fun Games',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
    targetTab: 'icebreaking',
  },
  {
    id: 'mod-progress',
    title: 'Progress Belajar & Evaluasi Harian',
    subtitle: 'Catatan Belajar, Kuis Harian, & Rekapitulasi Nilai Siswa',
    description: 'Pantau streak hari belajar, statistik penguasaan kosakata, riwayat kuis, target skor UTBK, dan status kelulusan modul.',
    category: 'modules',
    categoryLabel: 'Evaluasi',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300',
    targetTab: 'progress',
  },
];

export const ICE_BREAKING_ITEMS: SearchResultItem[] = [
  {
    id: 'game-word-chain',
    title: 'Life Sentence (Sambung Kata Kilat)',
    subtitle: 'Mini Game Kosakata Cepat',
    description: 'Tantangan menyambung huruf terakhir dari kata sebelumnya dalam bahasa Inggris. Mengasah kecepatan memori kata.',
    category: 'icebreaking',
    categoryLabel: 'Mini Game',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
    targetTab: 'icebreaking',
    meta: { tag: 'Vocabulary' }
  },
  {
    id: 'game-tenses-timemachine',
    title: 'Mesin Waktu Tenses (Verb 1-2-3)',
    subtitle: 'Tebak Perubahan Bentuk Kata Kerja',
    description: 'Ubah kata kerja bentuk present, past, dan past participle sesuai sinyal waktu yang ditantang.',
    category: 'icebreaking',
    categoryLabel: 'Mini Game',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
    targetTab: 'icebreaking',
    meta: { tag: 'Grammar' }
  },
  {
    id: 'game-sentence-builder',
    title: 'Frankensentence (Susun Kalimat)',
    subtitle: 'Susun Balok Kata Menjadi Kalimat Utuh & Hindari Jebakan',
    description: 'Susun kata-kata acak menjadi kalimat yang gramatikal, hindari kata jebakan, dan raih streak setinggi mungkin.',
    category: 'icebreaking',
    categoryLabel: 'Mini Game',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
    targetTab: 'icebreaking',
    meta: { tag: 'Syntax' }
  },
];

// Build Full Search Index
export function buildUniversalSearchIndex(): SearchResultItem[] {
  const index: SearchResultItem[] = [];

  // 1. Core Modules & Quick Access
  index.push(...QUICK_MODULES);

  // 2. Fun Games
  index.push(...ICE_BREAKING_ITEMS);

  // 3. 16 Tenses
  ALL_16_TENSES.forEach((tense) => {
    const timeSignalsList = tense.timeSignals ? tense.timeSignals.join(', ') : '';
    index.push({
      id: tense.id,
      title: tense.title,
      subtitle: tense.formula || 'Rumus Tata Bahasa',
      description: `${tense.description} Sinyal Waktu: ${timeSignalsList}. ${tense.academicNotes || ''}`,
      category: 'tenses',
      categoryLabel: '16 Tenses',
      badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-300',
      targetTab: 'tenses',
      targetId: tense.id,
      meta: {
        tag: `Bab ${tense.chapterNumber}`,
        pronounceText: tense.title,
      }
    });
  });

  // 4. Medieval English Vocabulary (25 Frasa Kuno)
  MEDIEVAL_VOCABULARY_FLASHCARDS.forEach((vocab, idx) => {
    index.push({
      id: vocab.id,
      title: vocab.phrase,
      subtitle: `${vocab.meaning} (${vocab.modernEnglish})`,
      description: `Pelafalan: [${vocab.phonetic}]. Kategori: ${vocab.category}. ${vocab.historicalNote || ''}`,
      category: 'vocab',
      categoryLabel: 'Medieval Vocab',
      badgeColor: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-300',
      targetTab: 'vocab',
      targetId: vocab.id,
      meta: {
        pronounceText: vocab.phrase,
        tag: `#${idx + 1} ${vocab.category}`,
      }
    });
  });

  // 5. UTBK / SNBT Questions & Passages
  UTBK_2026_QUESTIONS.forEach((q, idx) => {
    index.push({
      id: q.id,
      title: `${q.title} — Soal ${idx + 1}`,
      subtitle: `Skill: ${q.skillType} · Level: ${q.difficulty || 'Standar UTBK'}`,
      description: `${q.question} Cuplikan bacaan: "${q.passage.slice(0, 160)}..."`,
      category: 'utbk',
      categoryLabel: 'UTBK Soal',
      badgeColor: 'bg-blue-100 text-blue-900 dark:bg-blue-900/60 dark:text-blue-300',
      targetTab: 'utbk',
      targetId: q.id,
      meta: {
        difficulty: q.difficulty,
        tag: q.skillType,
      }
    });
  });

  // 6. Listening Lab Audio Topics & Dialogues
  LISTENING_LAB_ITEMS.forEach((lab) => {
    const dialogPreview = lab.transcript.map(t => `${t.speaker}: ${t.text}`).slice(0, 2).join(' | ');
    index.push({
      id: lab.id,
      title: lab.title,
      subtitle: `Kelas ${lab.gradeLevel} SMA · Aksen ${lab.accent}`,
      description: `Topik: ${lab.topic}. Pembicara: ${lab.speaker}. Dialog: "${dialogPreview}"`,
      category: 'listening',
      categoryLabel: 'Listening Audio',
      badgeColor: 'bg-teal-100 text-teal-900 dark:bg-teal-900/60 dark:text-teal-300',
      targetTab: 'listening',
      targetId: lab.id,
      meta: {
        grade: `Kelas ${lab.gradeLevel}`,
        pronounceText: lab.audioText || lab.title,
      }
    });
  });

  return index;
}

const GLOBAL_SEARCH_INDEX = buildUniversalSearchIndex();

/**
 * Searches the universal index with query scoring
 */
export function searchUniversalIndex(
  query: string,
  category: SearchCategory = 'all'
): SearchResultItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    if (category === 'all') {
      return GLOBAL_SEARCH_INDEX.slice(0, 15);
    }
    return GLOBAL_SEARCH_INDEX.filter(item => item.category === category);
  }

  const queryTerms = trimmed.split(/\s+/).filter(Boolean);

  const scoredResults: { item: SearchResultItem; score: number }[] = [];

  for (const item of GLOBAL_SEARCH_INDEX) {
    if (category !== 'all' && item.category !== category) {
      continue;
    }

    const titleLower = item.title.toLowerCase();
    const subtitleLower = item.subtitle.toLowerCase();
    const descLower = item.description.toLowerCase();
    const categoryLower = item.categoryLabel.toLowerCase();

    let score = 0;

    // Exact title matches get maximum score
    if (titleLower === trimmed) {
      score += 120;
    } else if (titleLower.startsWith(trimmed)) {
      score += 80;
    } else if (titleLower.includes(trimmed)) {
      score += 50;
    }

    // Subtitle exact / partial matches
    if (subtitleLower.includes(trimmed)) {
      score += 35;
    }

    // Description match
    if (descLower.includes(trimmed)) {
      score += 20;
    }

    // Category label match
    if (categoryLower.includes(trimmed)) {
      score += 15;
    }

    // Multi-term matching
    let allTermsFound = true;
    for (const term of queryTerms) {
      const inTitle = titleLower.includes(term);
      const inSub = subtitleLower.includes(term);
      const inDesc = descLower.includes(term);

      if (inTitle) score += 25;
      else if (inSub) score += 15;
      else if (inDesc) score += 10;
      else allTermsFound = false;
    }

    if (allTermsFound && queryTerms.length > 1) {
      score += 30;
    }

    if (score > 0) {
      scoredResults.push({ item, score });
    }
  }

  // Sort descending by score
  scoredResults.sort((a, b) => b.score - a.score);

  return scoredResults.map(r => r.item);
}

/**
 * Text-to-speech helper for pronunciation in search results
 */
export function playSearchResultAudio(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}
