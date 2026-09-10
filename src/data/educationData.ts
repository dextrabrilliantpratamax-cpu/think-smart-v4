export type EducationLevel = 'SMA' | 'SMK' | 'MA';

export interface EducationOption {
  id: EducationLevel;
  name: string;
  fullName: string;
  shortDesc: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  activeColor: string;
  tagColor: string;
  accentBg: string;
}

export const EDUCATION_LEVELS: EducationOption[] = [
  {
    id: 'SMA',
    name: 'SMA',
    fullName: 'Sekolah Menengah Atas',
    shortDesc: 'Pendidikan Menengah Atas (MIPA, IPS, Bahasa)',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/50',
    badgeText: 'text-blue-700 dark:text-blue-300',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    activeColor: 'border-blue-600 bg-blue-50/90 dark:bg-blue-950/60 ring-2 ring-blue-500/20 text-blue-900 dark:text-blue-100',
    tagColor: 'bg-blue-600 text-white',
    accentBg: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'SMK',
    name: 'SMK',
    fullName: 'Sekolah Menengah Kejuruan',
    shortDesc: 'Pendidikan Vokasi & Keterampilan Kejuruan Terapan',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/50',
    badgeText: 'text-amber-700 dark:text-amber-300',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    activeColor: 'border-amber-600 bg-amber-50/90 dark:bg-amber-950/60 ring-2 ring-amber-500/20 text-amber-900 dark:text-amber-100',
    tagColor: 'bg-amber-600 text-white',
    accentBg: 'from-amber-600 to-orange-700',
  },
  {
    id: 'MA',
    name: 'MA',
    fullName: 'Madrasah Aliyah',
    shortDesc: 'Pendidikan Menengah Keagamaan & Sains Terintegrasi',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/50',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    activeColor: 'border-emerald-600 bg-emerald-50/90 dark:bg-emerald-950/60 ring-2 ring-emerald-500/20 text-emerald-900 dark:text-emerald-100',
    tagColor: 'bg-emerald-600 text-white',
    accentBg: 'from-emerald-600 to-teal-700',
  },
];

export interface MajorOption {
  id: string;
  label: string;
  shortLabel: string;
  badgeLabel: string;
  description: string;
  categoryTag: string;
  englishFocus: string;
  recommendedRoleTip: string;
}

export const SMA_MA_MAJORS: MajorOption[] = [
  {
    id: 'MIPA',
    label: 'MIPA (Matematika & Ilmu Alam)',
    shortLabel: 'MIPA',
    badgeLabel: 'MIPA',
    description: 'Matematika, Fisika, Kimia, Biologi',
    categoryTag: 'Sains & Teknologi',
    englishFocus: 'Scientific & Academic English, Research Texts, UTBK Science Literacy',
    recommendedRoleTip: 'Fokus pada kosakata riset, metode ilmiah, eksak, dan analisis data.',
  },
  {
    id: 'IPS',
    label: 'IPS (Ilmu Pengetahuan Sosial)',
    shortLabel: 'IPS',
    badgeLabel: 'IPS',
    description: 'Sosiologi, Ekonomi, Geografi, Sejarah',
    categoryTag: 'Sosial & Humaniora',
    englishFocus: 'Social Debate, Economic Terminology, Critical Reading & Argumentation',
    recommendedRoleTip: 'Fokus pada teks opini sosial, wacana publik, ekonomi, dan penalaran logika.',
  },
  {
    id: 'Bahasa',
    label: 'Bahasa & Budaya',
    shortLabel: 'Bahasa',
    badgeLabel: 'Bahasa',
    description: 'Sastra, Linguistik, Antropologi, Bahasa Asing',
    categoryTag: 'Linguistik & Sastra',
    englishFocus: 'Advanced Literature, Figurative Speech, Cross-Cultural & Linguistic Analysis',
    recommendedRoleTip: 'Fokus pada idiom, gaya bahasa sastra (figurative language), dan wacana budaya.',
  },
];

export const SMK_MAJORS: MajorOption[] = [
  {
    id: 'TKJ',
    label: 'Teknik Komputer & Jaringan (TKJ)',
    shortLabel: 'TKJ',
    badgeLabel: 'TKJ',
    description: 'Jaringan, Server, Cloud & Hardware',
    categoryTag: 'Teknologi Informasi',
    englishFocus: 'IT Infrastructure & Network Technical English',
    recommendedRoleTip: 'Penguasaan istilah protokol, manual teknis, konfigurasi, dan standar telekomunikasi.',
  },
  {
    id: 'RPL',
    label: 'Rekayasa Perangkat Lunak (RPL)',
    shortLabel: 'RPL',
    badgeLabel: 'RPL',
    description: 'Pemrograman Web, Mobile, Database',
    categoryTag: 'Software Engineering',
    englishFocus: 'Developer Docs, Coding Standards & API English',
    recommendedRoleTip: 'Membaca dokumentasi teknis API, syntax error handling, dan komunikasi engineering.',
  },
  {
    id: 'DKV',
    label: 'Desain Komunikasi Visual (DKV)',
    shortLabel: 'DKV',
    badgeLabel: 'DKV',
    description: 'Grafis, Animasi, UI/UX & Multimedia',
    categoryTag: 'Seni & Desain Kreatif',
    englishFocus: 'Creative Design, Typography & Multimedia English',
    recommendedRoleTip: 'Istilah visual arts, client briefing, copywriting, dan industri kreatif global.',
  },
  {
    id: 'AKL',
    label: 'Akuntansi & Keuangan Lembaga (AKL)',
    shortLabel: 'AKL',
    badgeLabel: 'AKL',
    description: 'Pembukuan, Audit, Perbankan & Pajak',
    categoryTag: 'Bisnis & Keuangan',
    englishFocus: 'Accounting, Financial Reports & Auditing English',
    recommendedRoleTip: 'Laporan keuangan internasional (IFRS), perbankan, dan korespondensi bisnis.',
  },
  {
    id: 'MPLB',
    label: 'Manajemen Perkantoran & Logistik (MPLB)',
    shortLabel: 'MPLB',
    badgeLabel: 'MPLB',
    description: 'Administrasi, Tata Kelola & Layanan Bisnis',
    categoryTag: 'Administrasi Bisnis',
    englishFocus: 'Business Letters, Email Etiquette & Office Admin',
    recommendedRoleTip: 'Format korespondensi formal, meeting minutes, dan administrasi perkantoran modern.',
  },
  {
    id: 'BDP',
    label: 'Bisnis Daring & Pemasaran (BDP)',
    shortLabel: 'BDP',
    badgeLabel: 'BDP',
    description: 'E-Commerce, Digital Marketing & Retail',
    categoryTag: 'Pemasaran & Bisnis',
    englishFocus: 'Digital Marketing, Advertising & Sales English',
    recommendedRoleTip: 'Kampanye pemasaran digital, negosiasi dagang, dan customer engagement internasional.',
  },
  {
    id: 'TKR',
    label: 'Teknik Kendaraan Ringan / Otomotif (TKR)',
    shortLabel: 'TKR',
    badgeLabel: 'TKR',
    description: 'Mesin Otomotif, Mekatronika & Transmisi',
    categoryTag: 'Teknik & Rekayasa',
    englishFocus: 'Automotive Manuals & Technical Service English',
    recommendedRoleTip: 'Manual servis kendaraan resmi luar negeri dan diagram mekanik teknis.',
  },
  {
    id: 'Perhotelan',
    label: 'Perhotelan & Pariwisata / Kuliner',
    shortLabel: 'Perhotelan',
    badgeLabel: 'Perhotelan',
    description: 'Front Office, Hospitality & Food Beverage',
    categoryTag: 'Pariwisata & Hospitaliti',
    englishFocus: 'Hospitality, Concierge & Customer Service English',
    recommendedRoleTip: 'Komunikasi langsung dengan tamu mancanegara, reservasi hotel, dan table manner.',
  },
  {
    id: 'Farmasi',
    label: 'Farmasi Klinis & Layanan Kesehatan',
    shortLabel: 'Farmasi/Kesehatan',
    badgeLabel: 'Farmasi',
    description: 'Farmakologi, Keperawatan & Laboratorium',
    categoryTag: 'Kesehatan & Medis',
    englishFocus: 'Medical Terminology & Pharmacology English',
    recommendedRoleTip: 'Kosakata medis, resep obat, leaflet farmasi, dan pedoman kesehatan internasional.',
  },
  {
    id: 'Lainnya',
    label: 'Jurusan Kejuruan Lainnya (Kustom)',
    shortLabel: 'Kejuruan',
    badgeLabel: 'Kejuruan',
    description: 'Jurusan Vokasi Terapan Lainnya',
    categoryTag: 'Vokasi Lain',
    englishFocus: 'General Workplace & Applied Professional English',
    recommendedRoleTip: 'Bahasa Inggris terapan untuk dunia kerja, wawancara kerja, dan komunikasi profesional.',
  },
];

export function getEducationLevelInfo(level?: EducationLevel | string): EducationOption {
  const found = EDUCATION_LEVELS.find((l) => l.id === level);
  return found || EDUCATION_LEVELS[0];
}

export function getMajorInfo(level?: EducationLevel | string, majorId?: string): MajorOption | undefined {
  if (level === 'SMK') {
    return SMK_MAJORS.find((m) => m.id === majorId || m.shortLabel === majorId || m.label === majorId) || SMK_MAJORS[0];
  }
  return SMA_MA_MAJORS.find((m) => m.id === majorId || m.shortLabel === majorId || m.label === majorId) || SMA_MA_MAJORS[0];
}

export function getStudentFullTag(level?: EducationLevel | string, major?: string, grade?: string): string {
  const lvl = level || 'SMA';
  const mj = major || (lvl === 'SMK' ? 'TKJ' : 'MIPA');
  const gr = grade || 'XII';
  return `Kelas ${gr} · ${lvl} ${mj}`;
}
