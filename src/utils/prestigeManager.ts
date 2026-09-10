import { StudentProfile, PrestigeBreakdown, PrestigeTierInfo } from '../types';

/**
 * PRESTIGE TIERS DEFINITION
 * Mengukur tingkat kemuliaan penguasaan Bahasa Inggris siswa dari pemula hingga maestro angkasa.
 */
export const PRESTIGE_TIERS: PrestigeTierInfo[] = [
  {
    tier: 1,
    roman: 'I',
    name: 'Novice Scholar',
    minPrestige: 0,
    maxPrestige: 499,
    badge: 'bg-amber-950/40 text-amber-400 border-amber-800/60',
    badgeBorder: 'border-amber-700/50',
    badgeText: 'text-amber-400',
    iconName: 'Feather',
    lore: 'Langkah awal merintis penguasaan tata bahasa dan khazanah kosakata.',
    perk: 'Akses ke seluruh latihan dasar 16 Tenses & Arena Kosakata',
    colorGradient: 'from-amber-700 to-amber-900',
  },
  {
    tier: 2,
    roman: 'II',
    name: 'Adept Linguist',
    minPrestige: 500,
    maxPrestige: 1499,
    badge: 'bg-slate-800/60 text-slate-200 border-slate-600/60',
    badgeBorder: 'border-slate-500/50',
    badgeText: 'text-slate-200',
    iconName: 'Shield',
    lore: 'Konstruksi kalimat semakin kokoh, ritme tenses kian alami diucapkan.',
    perk: 'Membuka Power-Ups Immunity & Double Prestige di Arena Quizizz',
    colorGradient: 'from-slate-500 to-slate-700',
  },
  {
    tier: 3,
    roman: 'III',
    name: 'Noble Grammarian',
    minPrestige: 1500,
    maxPrestige: 2999,
    badge: 'bg-amber-500/20 text-amber-300 border-amber-400/50',
    badgeBorder: 'border-amber-400/60',
    badgeText: 'text-amber-300',
    iconName: 'Award',
    lore: 'Mampu membedakan nuansa waktu lampau, sekarang, dan masa depan dengan presisi tinggi.',
    perk: 'Bonus +15% perolehan Prestige pada Teka-Teki Silang CEFR',
    colorGradient: 'from-amber-400 via-yellow-500 to-amber-600',
  },
  {
    tier: 4,
    roman: 'IV',
    name: 'Grand Sovereign',
    minPrestige: 3000,
    maxPrestige: 4999,
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50',
    badgeBorder: 'border-cyan-400/60',
    badgeText: 'text-cyan-300',
    iconName: 'Crown',
    lore: 'Kecakapan tingkat tinggi, mampu membedah naskah UTBK dan teks akademik bernuansa berat.',
    perk: 'Gelar Kehormatan Mahkota Biru & Akses Generator Frankensentence Lanjutan',
    colorGradient: 'from-cyan-400 via-teal-500 to-blue-600',
  },
  {
    tier: 5,
    roman: 'V',
    name: 'Mythic Archon',
    minPrestige: 5000,
    maxPrestige: 7499,
    badge: 'bg-purple-500/20 text-purple-300 border-purple-400/50',
    badgeBorder: 'border-purple-400/60',
    badgeText: 'text-purple-300',
    iconName: 'Sparkles',
    lore: 'Kecepatan analisa dan kedalaman leksikal setara pujangga literatur internasional.',
    perk: 'Aura Kristal Amethyst pada Lencana Profil & Efek Suara Universal Khas',
    colorGradient: 'from-purple-500 via-fuchsia-600 to-indigo-700',
  },
  {
    tier: 6,
    roman: 'VI',
    name: 'Grand Celestial Master',
    minPrestige: 7500,
    maxPrestige: Infinity,
    badge: 'bg-rose-500/20 text-rose-300 border-rose-400/60',
    badgeBorder: 'border-rose-400/70',
    badgeText: 'text-rose-300',
    iconName: 'Zap',
    lore: 'Puncak kemuliaan tertinggi siswa Tiga Serangkai. Menguasai seluruh dimensi Bahasa Inggris.',
    perk: 'Sertifikat Universal Prestige Eksklusif & Gelar Abadi Bintang Keemasan',
    colorGradient: 'from-rose-500 via-amber-500 to-orange-500',
  },
];

/**
 * Mendapatkan info tier berdasarkan nilai prestige
 */
export function getPrestigeTierInfo(prestige: number): PrestigeTierInfo {
  const safePrestige = Math.max(0, prestige || 0);
  for (let i = PRESTIGE_TIERS.length - 1; i >= 0; i--) {
    if (safePrestige >= PRESTIGE_TIERS[i].minPrestige) {
      return PRESTIGE_TIERS[i];
    }
  }
  return PRESTIGE_TIERS[0];
}

/**
 * Mendapatkan tier selanjutnya dan persentase progres
 */
export function getNextPrestigeTier(prestige: number): {
  nextTier: PrestigeTierInfo | null;
  pointsNeeded: number;
  progressPercent: number;
} {
  const currentTier = getPrestigeTierInfo(prestige);
  const nextTierIndex = PRESTIGE_TIERS.findIndex((t) => t.tier === currentTier.tier + 1);

  if (nextTierIndex === -1) {
    return {
      nextTier: null,
      pointsNeeded: 0,
      progressPercent: 100,
    };
  }

  const nextTier = PRESTIGE_TIERS[nextTierIndex];
  const span = nextTier.minPrestige - currentTier.minPrestige;
  const currentInTier = prestige - currentTier.minPrestige;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentInTier / span) * 100)));
  const pointsNeeded = Math.max(0, nextTier.minPrestige - prestige);

  return {
    nextTier,
    pointsNeeded,
    progressPercent,
  };
}

/**
 * Menghitung rincian 5 pilar Prestige secara akurat dari rekam jejak siswa:
 * 1. Grammar & Tenses: modul selesai (150 Prestige/modul) + akumulasi nilai kuis
 * 2. Vocabulary & Lore: kosakata tuntas (50 Prestige/kata) + poin Quizizz Arena
 * 3. Fun Games & Arena: Crossword (Letterally Stuck) + Sentence Builder + Word Chain
 * 4. UTBK Prep: target UTBK + latihan soal literasi
 * 5. Learning Streak: Konsistensi belajar harian (100 Prestige/hari + bonus tier)
 */
export function calculatePrestigeBreakdown(profile: StudentProfile): PrestigeBreakdown {
  // 1. Pilar Grammar & Tenses (including Listening Lab)
  const completedCount = profile.completedLessons?.length || 0;
  let quizSum = 0;
  if (profile.quizScores) {
    Object.values(profile.quizScores).forEach((score) => {
      quizSum += Math.round((score || 0) * 0.8); // Bobot 80% dari nilai kuis
    });
  }
  let listeningPrestige = 0;
  if (typeof window !== 'undefined') {
    try {
      const listeningSaved = localStorage.getItem('ts_listening_lab_state');
      if (listeningSaved) {
        const parsed = JSON.parse(listeningSaved);
        if (parsed.submitted) {
          const count = Object.keys(parsed.submitted).filter((k) => parsed.submitted[k]).length;
          listeningPrestige = count * 50;
        }
      }
      const directListening = localStorage.getItem('ts_listening_prestige');
      if (directListening) {
        listeningPrestige = Math.max(listeningPrestige, parseInt(directListening, 10) || 0);
      }
    } catch {
      // safe fallback
    }
  }
  const grammarPrestige = completedCount * 150 + quizSum + listeningPrestige;

  // 2. Pilar Vocabulary & Lore
  const vocabMastered = profile.vocabularyMastered || 0;
  let quizizzSavedPrestige = 0;
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('ts_quizizz_prestige');
      if (saved) quizizzSavedPrestige = parseInt(saved, 10) || 0;
    } catch {
      // safe fallback
    }
  }
  const vocabPrestige = vocabMastered * 50 + quizizzSavedPrestige;

  // 3. Pilar Fun Games & Arena
  let gamesPrestige = 0;
  if (typeof window !== 'undefined') {
    try {
      // Crossword best scores (check both active and legacy keys)
      const cwScoresActive = localStorage.getItem('ts_letterally_stuck_scores');
      const cwScoresLegacy = localStorage.getItem('ts_crossword_best_scores');
      const cwScores = cwScoresActive || cwScoresLegacy;
      if (cwScores) {
        const parsed = JSON.parse(cwScores);
        Object.values(parsed).forEach((s: any) => {
          gamesPrestige += typeof s === 'number' ? s : 0;
        });
      }
      // Sentence builder progress (check 5-levels v1 key and legacy)
      const sentScoresActive = localStorage.getItem('ts_sentence_builder_5levels_v1');
      const sentScoresLegacy = localStorage.getItem('ts_sentence_game_progress');
      if (sentScoresActive) {
        const parsed = JSON.parse(sentScoresActive);
        if (parsed.totalScore) gamesPrestige += parsed.totalScore;
      } else if (sentScoresLegacy) {
        const parsed = JSON.parse(sentScoresLegacy);
        if (parsed.totalScore) gamesPrestige += parsed.totalScore;
      }
      // Word chain highscore & accumulated prestige
      const chainScore = localStorage.getItem('ts_word_chain_highscore');
      const chainDirect = localStorage.getItem('ts_word_chain_prestige');
      if (chainDirect) {
        gamesPrestige += parseInt(chainDirect, 10) || 0;
      } else if (chainScore) {
        gamesPrestige += parseInt(chainScore, 10) || 0;
      }
    } catch {
      // safe fallback
    }
  }
  // Baseline minimum for exciting initial gameplay if not played yet
  if (gamesPrestige === 0 && completedCount > 0) {
    gamesPrestige = 180;
  }

  // 4. Pilar UTBK Prep
  let utbkPrestige = 250; // Base baseline
  if (profile.targetUtbkScore) {
    const numericTarget = parseInt(profile.targetUtbkScore.replace(/[^0-9]/g, ''), 10) || 700;
    utbkPrestige += Math.round(numericTarget * 0.4);
  }
  if (typeof window !== 'undefined') {
    try {
      const utbkHistory = localStorage.getItem('ts_utbk_history');
      if (utbkHistory) {
        const parsed = JSON.parse(utbkHistory);
        if (Array.isArray(parsed)) {
          parsed.forEach((item: any) => {
            if (item.score) utbkPrestige += Math.round(item.score * 0.5);
          });
        }
      }
      const utbkState = localStorage.getItem('ts_utbk_state_v5_cbt');
      if (utbkState) {
        const parsed = JSON.parse(utbkState);
        if (parsed.finalScore) {
          utbkPrestige += Math.round(parsed.finalScore * 0.5);
        }
      }
    } catch {
      // safe fallback
    }
  }

  // 5. Pilar Streak & Konsistensi Harian
  const streakDays = profile.streakDays || 1;
  const streakPrestige = streakDays * 100 + (streakDays >= 7 ? 300 : streakDays >= 3 ? 150 : 50);

  return {
    grammar: grammarPrestige,
    vocab: vocabPrestige,
    games: gamesPrestige,
    utbk: utbkPrestige,
    streak: streakPrestige,
  };
}

/**
 * Menghitung total Universal Prestige
 */
export function calculateUniversalPrestige(profile: StudentProfile): {
  totalPrestige: number;
  breakdown: PrestigeBreakdown;
  tier: PrestigeTierInfo;
  nextTierInfo: {
    nextTier: PrestigeTierInfo | null;
    pointsNeeded: number;
    progressPercent: number;
  };
} {
  const breakdown = calculatePrestigeBreakdown(profile);
  const computedTotal =
    breakdown.grammar + breakdown.vocab + breakdown.games + breakdown.utbk + breakdown.streak;

  // Nilai tersimpan di profil dipertahankan jika lebih tinggi (misal dari bonus langsung)
  const storedPrestige = profile.universalPrestige || 0;
  const finalTotal = Math.max(storedPrestige, computedTotal);

  const tier = getPrestigeTierInfo(finalTotal);
  const nextTierInfo = getNextPrestigeTier(finalTotal);

  return {
    totalPrestige: finalTotal,
    breakdown,
    tier,
    nextTierInfo,
  };
}

/**
 * Melakukan ritual "Penyatuan Universal Prestige" (Harmonization Ceremony):
 * Menyatukan seluruh pilar menjadi satu kesatuan Universal Prestige yang tersinkronisasi.
 */
export function unifyUniversalPrestige(profile: StudentProfile): {
  updatedProfile: StudentProfile;
  gainedDelta: number;
  isTierUpgraded: boolean;
  previousTier: PrestigeTierInfo;
  newTier: PrestigeTierInfo;
  breakdown: PrestigeBreakdown;
} {
  const previousPrestige = profile.universalPrestige || 0;
  const previousTier = getPrestigeTierInfo(previousPrestige);

  const { totalPrestige, breakdown, tier: newTier } = calculateUniversalPrestige(profile);

  // Berikan bonus penyatuan harmonisasi jika pertama kali / re-unify
  const harmonizedTotal = Math.max(totalPrestige, previousPrestige);
  const gainedDelta = Math.max(0, harmonizedTotal - previousPrestige);
  const finalTier = getPrestigeTierInfo(harmonizedTotal);
  const isTierUpgraded = finalTier.tier > previousTier.tier;

  const nowIso = new Date().toISOString();

  const updatedProfile: StudentProfile = {
    ...profile,
    universalPrestige: harmonizedTotal,
    prestigeBreakdown: breakdown,
    prestigeRank: finalTier.name,
    lastPrestigeUnification: nowIso,
  };

  // Simpan ke local storage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('ts_universal_prestige', harmonizedTotal.toString());
      localStorage.setItem('ts_student_profile', JSON.stringify(updatedProfile));
    } catch {
      // safe fallback
    }
  }

  return {
    updatedProfile,
    gainedDelta,
    isTierUpgraded,
    previousTier,
    newTier: finalTier,
    breakdown,
  };
}

/**
 * Mencatat penambahan prestige dari aktivitas tertentu ke cache lokal
 * dan memancarkan sinyal auto-sinkronisasi ke seluruh aplikasi.
 */
export function recordActivityPrestige(
  category: 'quizizz' | 'sentence' | 'sentence_builder' | 'crossword' | 'wordchain' | 'word_chain' | 'lesson' | 'utbk' | 'listening' | 'vocab' | string,
  amount: number
): void {
  if (typeof window === 'undefined' || amount <= 0) return;
  try {
    // Normalisasi category key
    const cleanCat = category.toLowerCase().replace('-', '_');

    if (cleanCat.includes('quizizz') || cleanCat.includes('medieval')) {
      const cur = parseInt(localStorage.getItem('ts_quizizz_prestige') || '0', 10);
      localStorage.setItem('ts_quizizz_prestige', (cur + amount).toString());
    } else if (cleanCat.includes('word')) {
      const cur = parseInt(localStorage.getItem('ts_word_chain_prestige') || '0', 10);
      localStorage.setItem('ts_word_chain_prestige', (cur + amount).toString());
    } else if (cleanCat.includes('listening')) {
      const cur = parseInt(localStorage.getItem('ts_listening_prestige') || '0', 10);
      localStorage.setItem('ts_listening_prestige', (cur + amount).toString());
    }

    // Update global universal prestige counter
    const currentGlobal = parseInt(localStorage.getItem('ts_universal_prestige') || '0', 10);
    const newGlobal = currentGlobal + amount;
    localStorage.setItem('ts_universal_prestige', newGlobal.toString());

    // Update profile in localStorage if present
    const savedProf = localStorage.getItem('ts_student_profile');
    if (savedProf) {
      try {
        const prof = JSON.parse(savedProf);
        prof.universalPrestige = Math.max(newGlobal, (prof.universalPrestige || 0) + amount);
        localStorage.setItem('ts_student_profile', JSON.stringify(prof));
      } catch {
        // safe fallback
      }
    }

    // Pancarkan event real-time universal
    window.dispatchEvent(
      new CustomEvent('ts_prestige_updated', {
        detail: {
          category: cleanCat,
          amount,
          timestamp: Date.now(),
        },
      })
    );
  } catch {
    // safe fallback
  }
}
