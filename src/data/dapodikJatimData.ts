/**
 * Data Wilayah dan Statistik Resmi Satuan Pendidikan Kemendikdasmen / Dapodik
 * Wilayah: Semua 38 Kota/Kabupaten di PROVINSI JAWA TIMUR
 * Sumber Data: Kementerian Pendidikan Dasar dan Menengah RI & Pusat Data Dapodik
 */

export interface WilayahDapodikStat {
  kodeWilayah: string;
  namaWilayah: string;
  tk: number;
  kb: number;
  tpa: number;
  sps: number;
  sd: number;
  smp: number;
  sma: number;
  smk: number;
  slb: number;
  dikmas: number;
  total: number;
}

export const WILAYAH_JAWA_TIMUR_DAPODIK: WilayahDapodikStat[] = [
  { kodeWilayah: "050100", namaWilayah: "KAB. GRESIK", tk: 854, kb: 673, tpa: 18, sps: 176, sd: 847, smp: 291, sma: 139, smk: 62, slb: 8, dikmas: 55, total: 3123 },
  { kodeWilayah: "050200", namaWilayah: "KAB. SIDOARJO", tk: 1091, kb: 725, tpa: 48, sps: 89, sd: 848, smp: 269, sma: 119, smk: 87, slb: 31, dikmas: 138, total: 3445 },
  { kodeWilayah: "050300", namaWilayah: "KAB. MOJOKERTO", tk: 669, kb: 536, tpa: 2, sps: 160, sd: 629, smp: 227, sma: 100, smk: 64, slb: 15, dikmas: 56, total: 2458 },
  { kodeWilayah: "050400", namaWilayah: "KAB. JOMBANG", tk: 815, kb: 540, tpa: 29, sps: 15, sd: 802, smp: 286, sma: 150, smk: 72, slb: 16, dikmas: 88, total: 2813 },
  { kodeWilayah: "050500", namaWilayah: "KAB. BOJONEGORO", tk: 947, kb: 585, tpa: 13, sps: 597, sd: 1006, smp: 262, sma: 122, smk: 61, slb: 13, dikmas: 61, total: 3667 },
  { kodeWilayah: "050600", namaWilayah: "KAB. TUBAN", tk: 772, kb: 660, tpa: 8, sps: 0, sd: 814, smp: 221, sma: 92, smk: 44, slb: 6, dikmas: 109, total: 2726 },
  { kodeWilayah: "050700", namaWilayah: "KAB. LAMONGAN", tk: 1220, kb: 1098, tpa: 10, sps: 269, sd: 1178, smp: 353, sma: 162, smk: 79, slb: 10, dikmas: 78, total: 4457 },
  { kodeWilayah: "050800", namaWilayah: "KAB. MADIUN", tk: 470, kb: 343, tpa: 3, sps: 6, sd: 486, smp: 95, sma: 38, smk: 25, slb: 11, dikmas: 34, total: 1511 },
  { kodeWilayah: "050900", namaWilayah: "KAB. NGAWI", tk: 682, kb: 288, tpa: 7, sps: 1, sd: 631, smp: 136, sma: 46, smk: 41, slb: 5, dikmas: 94, total: 1931 },
  { kodeWilayah: "051000", namaWilayah: "KAB. MAGETAN", tk: 503, kb: 167, tpa: 12, sps: 111, sd: 493, smp: 105, sma: 40, smk: 31, slb: 8, dikmas: 44, total: 1514 },
  { kodeWilayah: "051100", namaWilayah: "KAB. PONOROGO", tk: 733, kb: 286, tpa: 9, sps: 7, sd: 697, smp: 189, sma: 100, smk: 41, slb: 6, dikmas: 80, total: 2148 },
  { kodeWilayah: "051200", namaWilayah: "KAB. PACITAN", tk: 419, kb: 391, tpa: 9, sps: 86, sd: 524, smp: 127, sma: 40, smk: 31, slb: 5, dikmas: 47, total: 1679 },
  { kodeWilayah: "051300", namaWilayah: "KAB. KEDIRI", tk: 1044, kb: 365, tpa: 14, sps: 368, sd: 920, smp: 252, sma: 86, smk: 54, slb: 27, dikmas: 193, total: 3323 },
  { kodeWilayah: "051400", namaWilayah: "KAB. NGANJUK", tk: 795, kb: 486, tpa: 8, sps: 21, sd: 747, smp: 177, sma: 71, smk: 60, slb: 11, dikmas: 56, total: 2432 },
  { kodeWilayah: "051500", namaWilayah: "KAB. BLITAR", tk: 921, kb: 294, tpa: 10, sps: 9, sd: 878, smp: 178, sma: 51, smk: 33, slb: 11, dikmas: 70, total: 2455 },
  { kodeWilayah: "051600", namaWilayah: "KAB. TULUNGAGUNG", tk: 691, kb: 392, tpa: 15, sps: 47, sd: 761, smp: 156, sma: 50, smk: 35, slb: 12, dikmas: 73, total: 2232 },
  { kodeWilayah: "051700", namaWilayah: "KAB. TRENGGALEK", tk: 494, kb: 164, tpa: 4, sps: 58, sd: 563, smp: 113, sma: 40, smk: 36, slb: 4, dikmas: 42, total: 1518 },
  { kodeWilayah: "051800", namaWilayah: "KAB. MALANG", tk: 1464, kb: 735, tpa: 9, sps: 16, sd: 1512, smp: 592, sma: 174, smk: 143, slb: 14, dikmas: 112, total: 4771 },
  { kodeWilayah: "051900", namaWilayah: "KAB. PASURUAN", tk: 1128, kb: 494, tpa: 9, sps: 146, sd: 1031, smp: 358, sma: 141, smk: 69, slb: 8, dikmas: 120, total: 3504 },
  { kodeWilayah: "052000", namaWilayah: "KAB. PROBOLINGGO", tk: 929, kb: 439, tpa: 5, sps: 150, sd: 1033, smp: 436, sma: 215, smk: 55, slb: 5, dikmas: 76, total: 3343 },
  { kodeWilayah: "052100", namaWilayah: "KAB. LUMAJANG", tk: 651, kb: 496, tpa: 3, sps: 0, sd: 766, smp: 289, sma: 118, smk: 41, slb: 8, dikmas: 78, total: 2450 },
  { kodeWilayah: "052200", namaWilayah: "KAB. BONDOWOSO", tk: 560, kb: 701, tpa: 3, sps: 27, sd: 590, smp: 255, sma: 100, smk: 60, slb: 5, dikmas: 125, total: 2426 },
  { kodeWilayah: "052300", namaWilayah: "KAB. SITUBONDO", tk: 439, kb: 452, tpa: 1, sps: 1, sd: 522, smp: 209, sma: 97, smk: 49, slb: 3, dikmas: 80, total: 1853 },
  { kodeWilayah: "052400", namaWilayah: "KAB. JEMBER", tk: 1363, kb: 524, tpa: 18, sps: 331, sd: 1486, smp: 601, sma: 203, smk: 183, slb: 12, dikmas: 129, total: 4850 },
  { kodeWilayah: "052500", namaWilayah: "KAB. BANYUWANGI", tk: 955, kb: 249, tpa: 6, sps: 4, sd: 1071, smp: 368, sma: 145, smk: 89, slb: 43, dikmas: 173, total: 3103 },
  { kodeWilayah: "052600", namaWilayah: "KAB. PAMEKASAN", tk: 832, kb: 561, tpa: 10, sps: 44, sd: 812, smp: 413, sma: 206, smk: 109, slb: 7, dikmas: 76, total: 3070 },
  { kodeWilayah: "052700", namaWilayah: "KAB. SAMPANG", tk: 615, kb: 488, tpa: 2, sps: 139, sd: 1117, smp: 574, sma: 197, smk: 93, slb: 2, dikmas: 76, total: 3303 },
  { kodeWilayah: "052800", namaWilayah: "KAB. SUMENEP", tk: 1024, kb: 490, tpa: 5, sps: 6, sd: 1202, smp: 544, sma: 258, smk: 75, slb: 4, dikmas: 88, total: 3696 },
  { kodeWilayah: "052900", namaWilayah: "KAB. BANGKALAN", tk: 717, kb: 263, tpa: 9, sps: 69, sd: 829, smp: 413, sma: 146, smk: 71, slb: 4, dikmas: 88, total: 2609 },
  { kodeWilayah: "056000", namaWilayah: "KOTA SURABAYA", tk: 1471, kb: 389, tpa: 60, sps: 842, sd: 830, smp: 395, sma: 176, smk: 106, slb: 40, dikmas: 391, total: 4700 },
  { kodeWilayah: "056100", namaWilayah: "KOTA MALANG", tk: 481, kb: 170, tpa: 29, sps: 157, sd: 347, smp: 158, sma: 74, smk: 51, slb: 14, dikmas: 137, total: 1618 },
  { kodeWilayah: "056200", namaWilayah: "KOTA MADIUN", tk: 98, kb: 47, tpa: 6, sps: 14, sd: 85, smp: 29, sma: 17, smk: 28, slb: 7, dikmas: 55, total: 386 },
  { kodeWilayah: "056300", namaWilayah: "KOTA KEDIRI", tk: 152, kb: 105, tpa: 8, sps: 8, sd: 167, smp: 51, sma: 32, smk: 24, slb: 5, dikmas: 55, total: 607 },
  { kodeWilayah: "056400", namaWilayah: "KOTA MOJOKERTO", tk: 71, kb: 52, tpa: 4, sps: 11, sd: 65, smp: 23, sma: 15, smk: 9, slb: 5, dikmas: 25, total: 280 },
  { kodeWilayah: "056500", namaWilayah: "KOTA BLITAR", tk: 96, kb: 52, tpa: 6, sps: 25, sd: 74, smp: 27, sma: 14, smk: 15, slb: 5, dikmas: 32, total: 346 },
  { kodeWilayah: "056600", namaWilayah: "KOTA PASURUAN", tk: 129, kb: 57, tpa: 8, sps: 39, sd: 94, smp: 44, sma: 19, smk: 13, slb: 3, dikmas: 35, total: 441 },
  { kodeWilayah: "056700", namaWilayah: "KOTA PROBOLINGGO", tk: 144, kb: 87, tpa: 12, sps: 1, sd: 115, smp: 52, sma: 27, smk: 20, slb: 4, dikmas: 35, total: 497 },
  { kodeWilayah: "056800", namaWilayah: "KOTA BATU", tk: 98, kb: 58, tpa: 8, sps: 46, sd: 95, smp: 38, sma: 15, smk: 13, slb: 2, dikmas: 19, total: 392 }
];

/**
 * Mencari statistik wilayah Dapodik berdasarkan nama wilayah, kata kunci, atau kode wilayah (misal '050100' atau 'GRESIK')
 */
export function findDapodikWilayahStat(identifier: string): WilayahDapodikStat | undefined {
  if (!identifier) return undefined;
  const clean = identifier.trim().toUpperCase();

  // 1. Cek kecocokan kode wilayah persis (misal '050100')
  const byCode = WILAYAH_JAWA_TIMUR_DAPODIK.find(w => w.kodeWilayah === clean);
  if (byCode) return byCode;

  // 2. Cek kecocokan nama wilayah persis (misal 'KAB. GRESIK')
  const byExactName = WILAYAH_JAWA_TIMUR_DAPODIK.find(w => w.namaWilayah === clean);
  if (byExactName) return byExactName;

  // 3. Cek pencarian kata kunci nama (misal 'GRESIK' cocok ke 'KAB. GRESIK')
  const baseName = clean.replace(/^(KAB\.|KOTA|KABUPATEN)\s+/, '').trim();
  if (baseName.length >= 3) {
    const byKeyword = WILAYAH_JAWA_TIMUR_DAPODIK.find(w => {
      const wBase = w.namaWilayah.replace(/^(KAB\.|KOTA|KABUPATEN)\s+/, '').trim();
      return wBase.includes(baseName) || baseName.includes(wBase);
    });
    if (byKeyword) return byKeyword;
  }

  return undefined;
}

/**
 * Daftar nama ringkas Kota/Kabupaten Jawa Timur untuk dropdown selector
 */
export const LIST_KABKOT_JATIM = WILAYAH_JAWA_TIMUR_DAPODIK.map(w => ({
  kode: w.kodeWilayah,
  nama: w.namaWilayah,
  label: `${w.namaWilayah} (${w.kodeWilayah})`,
  smaSmk: w.sma + w.smk,
  total: w.total
}));
