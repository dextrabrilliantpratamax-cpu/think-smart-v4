export interface StreakTier {
  minDays: number;
  maxDays: number; // inclusive or Infinity
  id: string;
  rankLevel: number;
  rankRoman: string;
  rankTitle: string;
  name: string;
  subtitle: string;
  description: string;
  archetype: string;
  timeLabel: string;
  periodLabel: string;
  morphology:
    | 'ember-spark'
    | 'solar-flare'
    | 'crimson-inferno'
    | 'mystic-violet'
    | 'azure-plasma'
    | 'emerald-phoenix'
    | 'diamond-radiance'
    | 'iridescent-supernova';
  temperature: string;
  energyMultiplier: string;
  buffDescription: string;
  flameDynamics: string;
  // Color palette for SVG & UI
  primaryColor: string;
  secondaryColor: string;
  coreColor: string;
  glowColor: string;
  bgGradient: string;
  badgeBorder: string;
  badgeBg: string;
  textColor: string;
  accentHex: string;
  particleColors: string[];
  auraAnimation: string;
  flameTitle: string;
  powerLevel: string;
}

export const STREAK_TIERS: StreakTier[] = [
  {
    minDays: 0,
    maxDays: 29,
    id: 'ember-orange',
    rankLevel: 1,
    rankRoman: 'I',
    rankTitle: 'Tier I · Api Bara Pemula (7 Hari)',
    name: 'Api Bara Oranye (Ember Flame)',
    subtitle: 'Tier I · Starter Warm Flame (1 Minggu - 1 Bulan)',
    description: 'Api pemula hangat berdenyut lembut yang menandai langkah awal konsistensi belajarmu. Capai milestone 7 hari pertama untuk memperkuat fondasi kebiasaan belajar!',
    archetype: 'Warm Hearth Ember (Fase 1 Minggu)',
    timeLabel: '7 Hari',
    periodLabel: '1 Minggu',
    morphology: 'ember-spark',
    temperature: '950°C',
    energyMultiplier: '1.0x XP',
    buffDescription: '+0% Base XP · Jiwa Semangat Pemula',
    flameDynamics: 'Siluet api bara oranye dengan lekukan teardrop lembut, denyut hangat, dan percikan bara halus.',
    primaryColor: '#F97316', // orange-500
    secondaryColor: '#EA580C', // orange-600
    coreColor: '#FED7AA', // orange-200
    glowColor: 'rgba(249, 115, 22, 0.45)',
    bgGradient: 'from-orange-500/15 via-amber-500/10 to-orange-600/5',
    badgeBorder: 'border-orange-300/80 dark:border-orange-500/40',
    badgeBg: 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/30',
    textColor: 'text-orange-700 dark:text-orange-300',
    accentHex: '#EA580C',
    particleColors: ['#F97316', '#FBBF24', '#FED7AA', '#FFEDD5'],
    auraAnimation: 'animate-pulse',
    flameTitle: '🔥 Api Bara Oranye (1-29 Hari · Target 7 Hari)',
    powerLevel: 'Tier I · Ember Hearth (7 Hari)',
  },
  {
    minDays: 30,
    maxDays: 89,
    id: 'solar-gold',
    rankLevel: 2,
    rankRoman: 'II',
    rankTitle: 'Tier II · Api Surya Emas (30 Hari / 1 Bulan)',
    name: 'Api Surya Emas (Solar Flame)',
    subtitle: 'Tier II · Radiant Solar Flame (1 Bulan Penuh)',
    description: 'Kobaran api emas ganda terang benderang dengan pendar lingkaran korona surya setelah 30 hari (1 bulan penuh) konsisten belajar setiap hari.',
    archetype: 'Radiant Solar Blaze (Fase 1 Bulan)',
    timeLabel: '30 Hari',
    periodLabel: '1 Bulan',
    morphology: 'solar-flare',
    temperature: '2,400°C',
    energyMultiplier: '1.25x XP',
    buffDescription: '+25% Bonus XP Kuis & Aura Surya',
    flameDynamics: 'Lidah api emas ganda yang menari lincah dengan lingkaran korona surya bercahaya.',
    primaryColor: '#EAB308', // yellow-500
    secondaryColor: '#CA8A04', // yellow-600
    coreColor: '#FEF08A', // yellow-200
    glowColor: 'rgba(234, 179, 8, 0.55)',
    bgGradient: 'from-amber-500/20 via-yellow-500/15 to-orange-400/10',
    badgeBorder: 'border-amber-400/90 dark:border-amber-500/40',
    badgeBg: 'bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100/50 dark:from-amber-950/40 dark:to-yellow-950/30',
    textColor: 'text-amber-800 dark:text-amber-300',
    accentHex: '#D97706',
    particleColors: ['#F59E0B', '#FBBF24', '#FDE047', '#FEF9C3'],
    auraAnimation: 'animate-pulse',
    flameTitle: '✨ Api Surya Emas (30-89 Hari · 1 Bulan)',
    powerLevel: 'Tier II · Solar Flare (30 Hari / 1 Bulan)',
  },
  {
    minDays: 90,
    maxDays: 179,
    id: 'crimson-ruby',
    rankLevel: 3,
    rankRoman: 'III',
    rankTitle: 'Tier III · Api Merah Delima (90 Hari / 3 Bulan)',
    name: 'Api Merah Delima (Crimson Inferno)',
    subtitle: 'Tier III · Intense Roaring Flame (Triwulan / 3 Bulan)',
    description: 'Kobaran api merah delima berkobar dahsyat dengan tiga lidah api magma tajam setelah 90 hari (3 bulan / 1 triwulan) dedikasi belajar tanpa putus.',
    archetype: 'Crimson Inferno Roar (Fase 3 Bulan)',
    timeLabel: '90 Hari',
    periodLabel: '3 Bulan',
    morphology: 'crimson-inferno',
    temperature: '5,800°C',
    energyMultiplier: '1.5x XP',
    buffDescription: '+50% Bonus XP & Kombo Api Berkobar',
    flameDynamics: 'Tiga lidah api merah membara yang berkobar gagah dengan inti magma berpijar.',
    primaryColor: '#EF4444', // red-500
    secondaryColor: '#BE123C', // rose-700
    coreColor: '#FECDD3', // rose-200
    glowColor: 'rgba(239, 68, 68, 0.6)',
    bgGradient: 'from-rose-500/20 via-red-500/15 to-pink-500/10',
    badgeBorder: 'border-red-400/90 dark:border-red-500/40',
    badgeBg: 'bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 dark:from-red-950/40 dark:to-rose-950/30',
    textColor: 'text-red-800 dark:text-red-300',
    accentHex: '#DC2626',
    particleColors: ['#EF4444', '#F43F5E', '#FDA4AF', '#FFE4E6'],
    auraAnimation: 'animate-pulse',
    flameTitle: '🩸 Api Merah Delima (90-179 Hari · 3 Bulan)',
    powerLevel: 'Tier III · Crimson Inferno (90 Hari / 3 Bulan)',
  },
  {
    minDays: 180,
    maxDays: 359,
    id: 'mystic-amethyst',
    rankLevel: 4,
    rankRoman: 'IV',
    rankTitle: 'Tier IV · Api Ungu Mistik (180 Hari / 1 Semester)',
    name: 'Api Ungu Mistik (Mystic Flame)',
    subtitle: 'Tier IV · Cosmic Nebula Flame (1 Semester / 6 Bulan)',
    description: 'Pusaran api ungu kosmik misterius dengan lidah api spiral meliuk anggun dan cincin debu galaksi setelah 180 hari (1 semester akademik penuh).',
    archetype: 'Cosmic Nebula Vortex (Fase 1 Semester)',
    timeLabel: '180 Hari',
    periodLabel: '1 Semester (6 Bulan)',
    morphology: 'mystic-violet',
    temperature: '14,000°K',
    energyMultiplier: '1.75x XP',
    buffDescription: '+75% Bonus XP & Pusaran Galaksi Mistik',
    flameDynamics: 'Lidah api spiral ungu berputar heliks anggun dengan cincin debu galaksi dan bintang kosmik.',
    primaryColor: '#A855F7', // purple-500
    secondaryColor: '#7E22CE', // purple-700
    coreColor: '#E9D5FF', // purple-200
    glowColor: 'rgba(168, 85, 247, 0.65)',
    bgGradient: 'from-purple-500/20 via-fuchsia-500/15 to-violet-500/10',
    badgeBorder: 'border-purple-400/90 dark:border-purple-500/40',
    badgeBg: 'bg-gradient-to-r from-purple-50 via-fuchsia-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/30',
    textColor: 'text-purple-900 dark:text-purple-300',
    accentHex: '#9333EA',
    particleColors: ['#A855F7', '#C084FC', '#E879F9', '#F5D0FE'],
    auraAnimation: 'animate-pulse',
    flameTitle: '🔮 Api Ungu Mistik (180-359 Hari · 1 Semester)',
    powerLevel: 'Tier IV · Mystic Nebula (180 Hari / 1 Semester)',
  },
  {
    minDays: 360,
    maxDays: 539,
    id: 'plasma-cyan',
    rankLevel: 5,
    rankRoman: 'V',
    rankTitle: 'Tier V · Api Biru Plasma (360 Hari / 1 Tahun)',
    name: 'Api Biru Plasma (Azure Plasma)',
    subtitle: 'Tier V · High-Voltage Plasma Storm (1 Tahun Penuh)',
    description: 'Api plasma cyan bersuhu super tinggi dengan lidah tombak aerodinamis modern dan busur kilatan listrik setelah 360 hari (1 tahun penuh) konsistensi belajar!',
    archetype: 'High-Voltage Plasma Storm (Fase 1 Tahun)',
    timeLabel: '360 Hari',
    periodLabel: '1 Tahun (2 Semester)',
    morphology: 'azure-plasma',
    temperature: '28,000°K',
    energyMultiplier: '2.0x XP',
    buffDescription: '+100% (2x) Bonus XP & Gelombang Kejut Listrik',
    flameDynamics: 'Lidah api plasma cyan berkecepatan tinggi dengan kilatan loncatan listrik superkonduktif.',
    primaryColor: '#06B6D4', // cyan-500
    secondaryColor: '#0284C7', // sky-600
    coreColor: '#CFFAFE', // cyan-100
    glowColor: 'rgba(6, 182, 212, 0.7)',
    bgGradient: 'from-cyan-500/20 via-sky-500/15 to-blue-500/10',
    badgeBorder: 'border-cyan-400/90 dark:border-cyan-500/40',
    badgeBg: 'bg-gradient-to-r from-cyan-50 via-sky-50 to-blue-50 dark:from-cyan-950/40 dark:to-sky-950/30',
    textColor: 'text-cyan-900 dark:text-cyan-300',
    accentHex: '#0891B2',
    particleColors: ['#06B6D4', '#38BDF8', '#7DD3FC', '#E0F2FE'],
    auraAnimation: 'animate-pulse',
    flameTitle: '⚡ Api Biru Plasma (360-539 Hari · 1 Tahun)',
    powerLevel: 'Tier V · Plasma Storm (360 Hari / 1 Tahun)',
  },
  {
    minDays: 540,
    maxDays: 719,
    id: 'emerald-phoenix',
    rankLevel: 6,
    rankRoman: 'VI',
    rankTitle: 'Tier VI · Api Zamrud Phoenix (540 Hari / 1,5 Tahun)',
    name: 'Api Zamrud Phoenix (Emerald Flame)',
    subtitle: 'Tier VI · Immortal Phoenix Feather (1,5 Tahun / 3 Semester)',
    description: 'Kobaran api hijau zamrud abadi dengan sayap bulu burung Phoenix yang meliuk anggun setelah 540 hari (1,5 tahun / 3 semester) perjuangan pantang menyerah.',
    archetype: 'Immortal Phoenix Feather (Fase 1,5 Tahun)',
    timeLabel: '540 Hari',
    periodLabel: '1,5 Tahun (3 Semester)',
    morphology: 'emerald-phoenix',
    temperature: '50,000°K',
    energyMultiplier: '2.25x XP',
    buffDescription: '+125% Bonus XP & Perlindungan Jiwa Abadi',
    flameDynamics: 'Lidah api bergelombang zamrud menyerupai sayap phoenix yang berkibar halus dengan permata zamrud.',
    primaryColor: '#10B981', // emerald-500
    secondaryColor: '#047857', // emerald-700
    coreColor: '#A7F3D0', // emerald-200
    glowColor: 'rgba(168, 185, 129, 0.7)',
    bgGradient: 'from-emerald-500/20 via-teal-500/15 to-green-500/10',
    badgeBorder: 'border-emerald-400/90 dark:border-emerald-500/40',
    badgeBg: 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/60 dark:from-emerald-950/40 dark:to-teal-950/30',
    textColor: 'text-emerald-900 dark:text-emerald-300',
    accentHex: '#059669',
    particleColors: ['#10B981', '#34D399', '#6EE7B7', '#D1FAE5'],
    auraAnimation: 'animate-pulse',
    flameTitle: '🌿 Api Zamrud Phoenix (540-719 Hari · 1,5 Tahun)',
    powerLevel: 'Tier VI · Phoenix Flame (540 Hari / 1,5 Tahun)',
  },
  {
    minDays: 720,
    maxDays: 899,
    id: 'diamond-radiance',
    rankLevel: 7,
    rankRoman: 'VII',
    rankTitle: 'Tier VII · Api Kristal Berlian (720 Hari / 2 Tahun)',
    name: 'Api Kristal Berlian (Diamond Radiance)',
    subtitle: 'Tier VII · Transcendent Crystal Flame (2 Tahun / 4 Semester)',
    description: 'Api kristal berlian geometris berfaset prisma tajam yang membiaskan kilau cahaya bintang murni setelah 720 hari (2 tahun penuh / 4 semester) konsistensi luar biasa.',
    archetype: 'Transcendent Crystal Prism (Fase 2 Tahun)',
    timeLabel: '720 Hari',
    periodLabel: '2 Tahun (4 Semester)',
    morphology: 'diamond-radiance',
    temperature: '90,000°K',
    energyMultiplier: '2.5x XP',
    buffDescription: '+150% Bonus XP & Refraksi Intan Kejernihan Pikir',
    flameDynamics: 'Faset geometris kristal berlian memantulkan kilatan suar cahaya bintang murni.',
    primaryColor: '#6366F1', // indigo-500
    secondaryColor: '#4338CA', // indigo-700
    coreColor: '#FFFFFF', // white
    glowColor: 'rgba(99, 102, 241, 0.75)',
    bgGradient: 'from-indigo-500/20 via-violet-500/15 to-pink-500/15',
    badgeBorder: 'border-indigo-400/90 dark:border-indigo-500/40',
    badgeBg: 'bg-gradient-to-r from-indigo-50 via-slate-50 to-violet-50 dark:from-indigo-950/40 dark:to-purple-950/30',
    textColor: 'text-indigo-950 dark:text-indigo-200',
    accentHex: '#4F46E5',
    particleColors: ['#FFFFFF', '#C7D2FE', '#E0E7FF', '#F472B6'],
    auraAnimation: 'animate-pulse',
    flameTitle: '💎 Api Kristal Berlian (720-899 Hari · 2 Tahun)',
    powerLevel: 'Tier VII · Diamond Radiance (720 Hari / 2 Tahun)',
  },
  {
    minDays: 900,
    maxDays: Infinity,
    id: 'iridescent-apex',
    rankLevel: 8,
    rankRoman: 'APEX',
    rankTitle: 'Apex Tier · Api Pelangi Supernova (900 Hari / 2,5 Tahun)',
    name: 'Api Pelangi Supernova (Iridescent Supernova)',
    subtitle: 'Apex Tier · Divine Supernova Rainbow Flame (2 Tahun 6 Bulan / 5 Semester)',
    description: 'Puncak tertinggi kedisiplinan belajar: Kobaran api pelangi spektakuler dengan cincin giroskop kosmik multi-axis setelah 900 hari (2 tahun 6 bulan / 5 semester)!',
    archetype: 'Divine Supernova Rainbow Flame (Fase 2 Tahun 6 Bulan)',
    timeLabel: '900+ Hari',
    periodLabel: '2 Tahun 6 Bulan (5 Semester)',
    morphology: 'iridescent-supernova',
    temperature: '180,000°K+',
    energyMultiplier: '3.0x XP',
    buffDescription: '+200% (3x) Max XP · Berkah Tertinggi Api Pelangi Ilahi',
    flameDynamics: 'Kobaran api pelangi multi-spektrum spektakuler dengan giroskop cincin kosmik dan pusaran supernova.',
    primaryColor: '#EC4899', // pink-500
    secondaryColor: '#8B5CF6', // purple-500
    coreColor: '#CFFAFE', // iridescent ice core
    glowColor: 'rgba(236, 72, 153, 0.85)',
    bgGradient: 'from-pink-500/25 via-purple-500/20 via-cyan-500/20 to-amber-500/25',
    badgeBorder: 'border-pink-400/90 dark:border-pink-500/60 shadow-md',
    badgeBg: 'bg-gradient-to-r from-pink-50 via-purple-50 via-cyan-50 to-amber-50 dark:from-pink-950/40 dark:via-purple-950/40 dark:to-cyan-950/40',
    textColor: 'text-pink-950 dark:text-pink-200',
    accentHex: '#EC4899',
    particleColors: ['#F472B6', '#C084FC', '#60A5FA', '#34D399', '#FDE047', '#FB7185', '#FFFFFF', '#E0E7FF'],
    auraAnimation: 'animate-spin-slow',
    flameTitle: '🌈 Api Pelangi Supernova (900+ Hari · 2 Tahun 6 Bulan)',
    powerLevel: 'Apex · Iridescent Supernova (900+ Hari / 2,5 Thn)',
  },
];

export function getStreakTier(days: number): StreakTier {
  const safeDays = Math.max(0, days);
  const matched = STREAK_TIERS.find(
    (tier) => safeDays >= tier.minDays && safeDays <= tier.maxDays
  );
  return matched || STREAK_TIERS[0];
}

export function getNextStreakTier(days: number): { nextTier: StreakTier | null; daysRemaining: number } {
  const currentTier = getStreakTier(days);
  const currentIndex = STREAK_TIERS.findIndex((t) => t.id === currentTier.id);
  if (currentIndex < STREAK_TIERS.length - 1) {
    const nextTier = STREAK_TIERS[currentIndex + 1];
    return {
      nextTier,
      daysRemaining: Math.max(1, nextTier.minDays - days),
    };
  }
  return { nextTier: null, daysRemaining: 0 };
}

/**
 * Formats streak days into human-friendly Indonesian time representation (Hari, Bulan, Semester, Tahun)
 */
export function formatStreakDuration(days: number): string {
  if (days <= 0) return '0 Hari';
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    const remDays = days % 7;
    if (weeks > 0 && remDays === 0) return `${days} Hari (${weeks} Minggu)`;
    return `${days} Hari`;
  }
  if (days < 180) {
    const months = (days / 30).toFixed(1).replace('.0', '');
    return `${days} Hari (~${months} Bulan)`;
  }
  if (days < 360) {
    const semesters = (days / 180).toFixed(1).replace('.0', '');
    return `${days} Hari (${semesters} Semester)`;
  }
  const years = (days / 360).toFixed(1).replace('.0', '');
  return `${days} Hari (~${years} Tahun)`;
}

