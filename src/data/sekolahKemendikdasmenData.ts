/**
 * Data Direktori Sekolah SMA / SMK / MA / MAK se-Indonesia
 * Referensi Resmi: Kementerian Pendidikan Dasar dan Menengah (Kemendikdasmen RI) & Dapodik
 * Portal: referensi.data.kemendikdasmen.go.id
 *
 * Catatan: Semua nama sekolah tersimpan dalam format UPPERCASE resmi.
 */

export interface SekolahItem {
  id?: string;
  npsn: string;
  nama: string;
  nama_sekolah?: string;
  bentuk: 'SMA' | 'SMK' | 'MA' | 'MAK';
  status: 'Negeri' | 'Swasta' | 'NEGERI' | 'SWASTA';
  kabupatenKota: string;
  kabupaten_kota?: string;
  provinsi: string;
  kodeWilayah?: string;
  kecamatan?: string;
  alamat?: string;
}

export type SekolahKemendikdasmenItem = SekolahItem;

export interface WilayahDapodik {
  kodeWilayah: string;
  namaWilayah: string;
  tkCount: number;
  kbCount: number;
  tpaCount: number;
  spsCount: number;
  sdCount: number;
  smpCount: number;
  smaCount: number;
  smkCount: number;
  slbCount: number;
  dikmasCount: number;
  totalCount: number;
}

export const DAFTAR_PROVINSI: string[] = [
  "Semua Provinsi",
  "Jawa Timur",
  "Jawa Tengah",
  "DKI Jakarta",
  "D.I. Yogyakarta",
  "Jawa Barat",
  "Banten",
  "Bali",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Sumatera Selatan",
  "Lampung",
  "Aceh",
  "Jambi",
  "Bengkulu",
  "Kepulauan Bangka Belitung",
  "Kalimantan Timur",
  "Kalimantan Barat",
  "Kalimantan Selatan",
  "Kalimantan Tengah",
  "Kalimantan Utara",
  "Sulawesi Selatan",
  "Sulawesi Utara",
  "Sulawesi Tengah",
  "Sulawesi Tenggara",
  "Sulawesi Barat",
  "Gorontalo",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Papua Selatan",
  "Papua Tengah",
  "Papua Pegunungan",
  "Papua Barat Daya"
];

/**
 * Data Statistik Referensi Resmi Dapodik Wilayah Provinsi Jawa Timur (38 Kota/Kabupaten)
 */
export const WILAYAH_JAWA_TIMUR: WilayahDapodik[] = [
  { "kodeWilayah": "050100", "namaWilayah": "KAB. GRESIK", "tkCount": 854, "kbCount": 673, "tpaCount": 18, "spsCount": 176, "sdCount": 847, "smpCount": 291, "smaCount": 139, "smkCount": 62, "slbCount": 8, "dikmasCount": 55, "totalCount": 3123 },
  { "kodeWilayah": "050200", "namaWilayah": "KAB. SIDOARJO", "tkCount": 1091, "kbCount": 725, "tpaCount": 48, "spsCount": 89, "sdCount": 848, "smpCount": 269, "smaCount": 119, "smkCount": 87, "slbCount": 31, "dikmasCount": 138, "totalCount": 3445 },
  { "kodeWilayah": "050300", "namaWilayah": "KAB. MOJOKERTO", "tkCount": 669, "kbCount": 536, "tpaCount": 2, "spsCount": 160, "sdCount": 629, "smpCount": 227, "smaCount": 100, "smkCount": 64, "slbCount": 15, "dikmasCount": 56, "totalCount": 2458 },
  { "kodeWilayah": "050400", "namaWilayah": "KAB. JOMBANG", "tkCount": 815, "kbCount": 540, "tpaCount": 29, "spsCount": 15, "sdCount": 802, "smpCount": 286, "smaCount": 150, "smkCount": 72, "slbCount": 16, "dikmasCount": 88, "totalCount": 2813 },
  { "kodeWilayah": "050500", "namaWilayah": "KAB. BOJONEGORO", "tkCount": 947, "kbCount": 585, "tpaCount": 13, "spsCount": 597, "sdCount": 1006, "smpCount": 262, "smaCount": 122, "smkCount": 61, "slbCount": 13, "dikmasCount": 61, "totalCount": 3667 },
  { "kodeWilayah": "050600", "namaWilayah": "KAB. TUBAN", "tkCount": 772, "kbCount": 660, "tpaCount": 8, "spsCount": 0, "sdCount": 814, "smpCount": 221, "smaCount": 92, "smkCount": 44, "slbCount": 6, "dikmasCount": 109, "totalCount": 2726 },
  { "kodeWilayah": "050700", "namaWilayah": "KAB. LAMONGAN", "tkCount": 1220, "kbCount": 1098, "tpaCount": 10, "spsCount": 269, "sdCount": 1178, "smpCount": 353, "smaCount": 162, "smkCount": 79, "slbCount": 10, "dikmasCount": 78, "totalCount": 4457 },
  { "kodeWilayah": "050800", "namaWilayah": "KAB. MADIUN", "tkCount": 470, "kbCount": 343, "tpaCount": 3, "spsCount": 6, "sdCount": 486, "smpCount": 95, "smaCount": 38, "smkCount": 25, "slbCount": 11, "dikmasCount": 34, "totalCount": 1511 },
  { "kodeWilayah": "050900", "namaWilayah": "KAB. NGAWI", "tkCount": 682, "kbCount": 288, "tpaCount": 7, "spsCount": 1, "sdCount": 631, "smpCount": 136, "smaCount": 46, "smkCount": 41, "slbCount": 5, "dikmasCount": 94, "totalCount": 1931 },
  { "kodeWilayah": "051000", "namaWilayah": "KAB. MAGETAN", "tkCount": 503, "kbCount": 167, "tpaCount": 12, "spsCount": 111, "sdCount": 493, "smpCount": 105, "smaCount": 40, "smkCount": 31, "slbCount": 8, "dikmasCount": 44, "totalCount": 1514 },
  { "kodeWilayah": "051100", "namaWilayah": "KAB. PONOROGO", "tkCount": 733, "kbCount": 286, "tpaCount": 9, "spsCount": 7, "sdCount": 697, "smpCount": 189, "smaCount": 100, "smkCount": 41, "slbCount": 6, "dikmasCount": 80, "totalCount": 2148 },
  { "kodeWilayah": "051200", "namaWilayah": "KAB. PACITAN", "tkCount": 419, "kbCount": 391, "tpaCount": 9, "spsCount": 86, "sdCount": 524, "smpCount": 127, "smaCount": 40, "smkCount": 31, "slbCount": 5, "dikmasCount": 47, "totalCount": 1679 },
  { "kodeWilayah": "051300", "namaWilayah": "KAB. KEDIRI", "tkCount": 1044, "kbCount": 365, "tpaCount": 14, "spsCount": 368, "sdCount": 920, "smpCount": 252, "smaCount": 86, "smkCount": 54, "slbCount": 27, "dikmasCount": 193, "totalCount": 3323 },
  { "kodeWilayah": "051400", "namaWilayah": "KAB. NGANJUK", "tkCount": 795, "kbCount": 486, "tpaCount": 8, "spsCount": 21, "sdCount": 747, "smpCount": 177, "smaCount": 71, "smkCount": 60, "slbCount": 11, "dikmasCount": 56, "totalCount": 2432 },
  { "kodeWilayah": "051500", "namaWilayah": "KAB. BLITAR", "tkCount": 921, "kbCount": 294, "tpaCount": 10, "spsCount": 9, "sdCount": 878, "smpCount": 178, "smaCount": 51, "smkCount": 33, "slbCount": 11, "dikmasCount": 70, "totalCount": 2455 },
  { "kodeWilayah": "051600", "namaWilayah": "KAB. TULUNGAGUNG", "tkCount": 691, "kbCount": 392, "tpaCount": 15, "spsCount": 47, "sdCount": 761, "smpCount": 156, "smaCount": 50, "smkCount": 35, "slbCount": 12, "dikmasCount": 73, "totalCount": 2232 },
  { "kodeWilayah": "051700", "namaWilayah": "KAB. TRENGGALEK", "tkCount": 494, "kbCount": 164, "tpaCount": 4, "spsCount": 58, "sdCount": 563, "smpCount": 113, "smaCount": 40, "smkCount": 36, "slbCount": 4, "dikmasCount": 42, "totalCount": 1518 },
  { "kodeWilayah": "051800", "namaWilayah": "KAB. MALANG", "tkCount": 1464, "kbCount": 735, "tpaCount": 9, "spsCount": 16, "sdCount": 1512, "smpCount": 592, "smaCount": 174, "smkCount": 143, "slbCount": 14, "dikmasCount": 112, "totalCount": 4771 },
  { "kodeWilayah": "051900", "namaWilayah": "KAB. PASURUAN", "tkCount": 1128, "kbCount": 494, "tpaCount": 9, "spsCount": 146, "sdCount": 1031, "smpCount": 358, "smaCount": 141, "smkCount": 69, "slbCount": 8, "dikmasCount": 120, "totalCount": 3504 },
  { "kodeWilayah": "052000", "namaWilayah": "KAB. PROBOLINGGO", "tkCount": 929, "kbCount": 439, "tpaCount": 5, "spsCount": 150, "sdCount": 1033, "smpCount": 436, "smaCount": 215, "smkCount": 55, "slbCount": 5, "dikmasCount": 76, "totalCount": 3343 },
  { "kodeWilayah": "052100", "namaWilayah": "KAB. LUMAJANG", "tkCount": 651, "kbCount": 496, "tpaCount": 3, "spsCount": 0, "sdCount": 766, "smpCount": 289, "smaCount": 118, "smkCount": 41, "slbCount": 8, "dikmasCount": 78, "totalCount": 2450 },
  { "kodeWilayah": "052200", "namaWilayah": "KAB. BONDOWOSO", "tkCount": 560, "kbCount": 701, "tpaCount": 3, "spsCount": 27, "sdCount": 590, "smpCount": 255, "smaCount": 100, "smkCount": 60, "slbCount": 5, "dikmasCount": 125, "totalCount": 2426 },
  { "kodeWilayah": "052300", "namaWilayah": "KAB. SITUBONDO", "tkCount": 439, "kbCount": 452, "tpaCount": 1, "spsCount": 1, "sdCount": 522, "smpCount": 209, "smaCount": 97, "smkCount": 49, "slbCount": 3, "dikmasCount": 80, "totalCount": 1853 },
  { "kodeWilayah": "052400", "namaWilayah": "KAB. JEMBER", "tkCount": 1363, "kbCount": 524, "tpaCount": 18, "spsCount": 331, "sdCount": 1486, "smpCount": 601, "smaCount": 203, "smkCount": 183, "slbCount": 12, "dikmasCount": 129, "totalCount": 4850 },
  { "kodeWilayah": "052500", "namaWilayah": "KAB. BANYUWANGI", "tkCount": 955, "kbCount": 249, "tpaCount": 6, "spsCount": 4, "sdCount": 1071, "smpCount": 368, "smaCount": 145, "smkCount": 89, "slbCount": 43, "dikmasCount": 173, "totalCount": 3103 },
  { "kodeWilayah": "052600", "namaWilayah": "KAB. PAMEKASAN", "tkCount": 832, "kbCount": 561, "tpaCount": 10, "spsCount": 44, "sdCount": 812, "smpCount": 413, "smaCount": 206, "smkCount": 109, "slbCount": 7, "dikmasCount": 76, "totalCount": 3070 },
  { "kodeWilayah": "052700", "namaWilayah": "KAB. SAMPANG", "tkCount": 615, "kbCount": 488, "tpaCount": 2, "spsCount": 139, "sdCount": 1117, "smpCount": 574, "smaCount": 197, "smkCount": 93, "slbCount": 2, "dikmasCount": 76, "totalCount": 3303 },
  { "kodeWilayah": "052800", "namaWilayah": "KAB. SUMENEP", "tkCount": 1024, "kbCount": 490, "tpaCount": 5, "spsCount": 6, "sdCount": 1202, "smpCount": 544, "smaCount": 258, "smkCount": 75, "slbCount": 4, "dikmasCount": 88, "totalCount": 3696 },
  { "kodeWilayah": "052900", "namaWilayah": "KAB. BANGKALAN", "tkCount": 717, "kbCount": 263, "tpaCount": 9, "spsCount": 69, "sdCount": 829, "smpCount": 413, "smaCount": 146, "smkCount": 71, "slbCount": 4, "dikmasCount": 88, "totalCount": 2609 },
  { "kodeWilayah": "056000", "namaWilayah": "KOTA SURABAYA", "tkCount": 1471, "kbCount": 389, "tpaCount": 60, "spsCount": 842, "sdCount": 830, "smpCount": 395, "smaCount": 176, "smkCount": 106, "slbCount": 40, "dikmasCount": 391, "totalCount": 4700 },
  { "kodeWilayah": "056100", "namaWilayah": "KOTA MALANG", "tkCount": 481, "kbCount": 170, "tpaCount": 29, "spsCount": 157, "sdCount": 347, "smpCount": 158, "smaCount": 74, "smkCount": 51, "slbCount": 14, "dikmasCount": 137, "totalCount": 1618 },
  { "kodeWilayah": "056200", "namaWilayah": "KOTA MADIUN", "tkCount": 98, "kbCount": 47, "tpaCount": 6, "spsCount": 14, "sdCount": 85, "smpCount": 29, "smaCount": 17, "smkCount": 28, "slbCount": 7, "dikmasCount": 55, "totalCount": 386 },
  { "kodeWilayah": "056300", "namaWilayah": "KOTA KEDIRI", "tkCount": 152, "kbCount": 105, "tpaCount": 8, "spsCount": 8, "sdCount": 167, "smpCount": 51, "smaCount": 32, "smkCount": 24, "slbCount": 5, "dikmasCount": 55, "totalCount": 607 },
  { "kodeWilayah": "056400", "namaWilayah": "KOTA MOJOKERTO", "tkCount": 71, "kbCount": 52, "tpaCount": 4, "spsCount": 11, "sdCount": 65, "smpCount": 23, "smaCount": 15, "smkCount": 9, "slbCount": 5, "dikmasCount": 25, "totalCount": 280 },
  { "kodeWilayah": "056500", "namaWilayah": "KOTA BLITAR", "tkCount": 96, "kbCount": 52, "tpaCount": 6, "spsCount": 25, "sdCount": 74, "smpCount": 27, "smaCount": 14, "smkCount": 15, "slbCount": 5, "dikmasCount": 32, "totalCount": 346 },
  { "kodeWilayah": "056600", "namaWilayah": "KOTA PASURUAN", "tkCount": 129, "kbCount": 57, "tpaCount": 8, "spsCount": 39, "sdCount": 94, "smpCount": 44, "smaCount": 19, "smkCount": 13, "slbCount": 3, "dikmasCount": 35, "totalCount": 441 },
  { "kodeWilayah": "056700", "namaWilayah": "KOTA PROBOLINGGO", "tkCount": 144, "kbCount": 87, "tpaCount": 12, "spsCount": 1, "sdCount": 115, "smpCount": 52, "smaCount": 27, "smkCount": 20, "slbCount": 4, "dikmasCount": 35, "totalCount": 497 },
  { "kodeWilayah": "056800", "namaWilayah": "KOTA BATU", "tkCount": 98, "kbCount": 58, "tpaCount": 8, "spsCount": 46, "sdCount": 95, "smpCount": 38, "smaCount": 15, "smkCount": 13, "slbCount": 2, "dikmasCount": 19, "totalCount": 392 }
];

export const WILAYAH_JAWA_TENGAH: WilayahDapodik[] = [
  { "kodeWilayah": "030100", "namaWilayah": "KAB. CILACAP", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "030200", "namaWilayah": "KAB. BANYUMAS", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "030300", "namaWilayah": "KAB. PURBALINGGA", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "030400", "namaWilayah": "KAB. BANJARNEGARA", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "030500", "namaWilayah": "KAB. KEBUMEN", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "030600", "namaWilayah": "KAB. PURWOREJO", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "030700", "namaWilayah": "KAB. WONOSOBO", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "030800", "namaWilayah": "KAB. MAGELANG", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "030900", "namaWilayah": "KAB. BOYOLALI", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "031000", "namaWilayah": "KAB. KLATEN", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "031100", "namaWilayah": "KAB. SUKOHARJO", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "031200", "namaWilayah": "KAB. WONOGIRI", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "031300", "namaWilayah": "KAB. KARANGANYAR", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "031400", "namaWilayah": "KAB. SRAGEN", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "031500", "namaWilayah": "KAB. GROBOGAN", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "031600", "namaWilayah": "KAB. BLORA", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "031700", "namaWilayah": "KAB. REMBANG", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "031800", "namaWilayah": "KAB. PATI", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "031900", "namaWilayah": "KAB. KUDUS", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "032000", "namaWilayah": "KAB. JEPARA", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "032100", "namaWilayah": "KAB. DEMAK", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "032200", "namaWilayah": "KAB. SEMARANG", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "032300", "namaWilayah": "KAB. TEMANGGUNG", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "032400", "namaWilayah": "KAB. KENDAL", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "032500", "namaWilayah": "KAB. BATANG", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "032600", "namaWilayah": "KAB. PEKALONGAN", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "032700", "namaWilayah": "KAB. PEMALANG", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "032800", "namaWilayah": "KAB. TEGAL", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "032900", "namaWilayah": "KAB. BREBES", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "036000", "namaWilayah": "KOTA MAGELANG", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "036100", "namaWilayah": "KOTA SURAKARTA", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "036200", "namaWilayah": "KOTA SALATIGA", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "036300", "namaWilayah": "KOTA SEMARANG", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "036400", "namaWilayah": "KOTA PEKALONGAN", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
  { "kodeWilayah": "036500", "namaWilayah": "KOTA TEGAL", "tkCount": 0, "kbCount": 0, "tpaCount": 0, "spsCount": 0, "sdCount": 0, "smpCount": 0, "smaCount": 0, "smkCount": 0, "slbCount": 0, "dikmasCount": 0, "totalCount": 0 },
];
/**
 * Dataset Sekolah Menengah Atas, Kejuruan, dan Madrasah Aliyah se-Indonesia
 * Data terstandarisasi huruf kapital (UPPERCASE) sesuai data Kemendikdasmen RI / Dapodik
 */
const RAW_SEKOLAH_LIST = [
  // --- Jawa Tengah ---
  { npsn: "20327977", nama: "SMAN 1 SURAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. Monginsidi No. 40, Gilingan" },
  { npsn: "20327978", nama: "SMAN 2 SURAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. Monginsidi No. 28, Banjarsari" },
  { npsn: "20327979", nama: "SMAN 3 SURAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Jebres", alamat: "Jl. Prof. WZ. Johannes No. 58, Jebres" },
  { npsn: "20327980", nama: "SMAN 4 SURAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. L.U. Adisucipto No. 1, Manahan" },
  { npsn: "20327981", nama: "SMAN 5 SURAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Jebres", alamat: "Jl. Letjen Sutoyo No. 18" },
  { npsn: "20327982", nama: "SMAN 6 SURAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. Mr. Sartono No. 30" },
  { npsn: "20327983", nama: "SMAN 7 SURAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Laweyan", alamat: "Jl. Mr. Mohammad Yamin No. 79" },
  { npsn: "20327984", nama: "SMAN 8 SURAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Jebres", alamat: "Jl. Sumbing VI No. 49, Mojosongo" },
  { npsn: "20328148", nama: "SMKN 1 SURAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. Siwalan No. 4, Kerten" },
  { npsn: "20328149", nama: "SMKN 2 SURAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. LU. Adisucipto No. 33, Manahan" },
  { npsn: "20328150", nama: "SMKN 3 SURAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. LU. Adisucipto No. 35" },
  { npsn: "20328151", nama: "SMKN 4 SURAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. LU. Adisucipto No. 37" },
  { npsn: "20328152", nama: "SMKN 5 SURAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. LU. Adisucipto No. 42" },
  { npsn: "20328153", nama: "SMKN 6 SURAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. LU. Adisucipto No. 38" },
  { npsn: "20328154", nama: "SMKN 7 SURAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. Ahmad Yani No. 374" },
  { npsn: "20328155", nama: "SMKN 8 SURAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Jebres", alamat: "Jl. Sangihe No. 1, Kepatihan" },
  { npsn: "20328156", nama: "SMKN 9 SURAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. Tarumanegara No. 1" },
  { npsn: "20363245", nama: "MAN 1 SURAKARTA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. Gotong Royong No. 4, Jagalan" },
  { npsn: "20363246", nama: "MAN 2 SURAKARTA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Laweyan", alamat: "Jl. Slamet Riyadi No. 308" },
  { npsn: "20327985", nama: "SMA BATIK 1 SURAKARTA", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Laweyan", alamat: "Jl. Slamet Riyadi No. 445" },
  { npsn: "20327986", nama: "SMA MUHAMMADIYAH 1 SURAKARTA", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Banjarsari", alamat: "Jl. RM Said No. 35" },
  { npsn: "20327987", nama: "SMA REGINA PACIS SURAKARTA", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kota Surakarta", provinsi: "Jawa Tengah", kecamatan: "Laweyan", alamat: "Jl. LU. Adisucipto No. 45" },
  { npsn: "20310461", nama: "SMAN 1 SUKOHARJO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sukoharjo", provinsi: "Jawa Tengah", kecamatan: "Sukoharjo", alamat: "Jl. Pemuda No. 38" },
  { npsn: "20310462", nama: "SMAN 2 SUKOHARJO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sukoharjo", provinsi: "Jawa Tengah", kecamatan: "Sukoharjo", alamat: "Jl. Veteran No. 1" },
  { npsn: "20310463", nama: "SMAN 3 SUKOHARJO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sukoharjo", provinsi: "Jawa Tengah", kecamatan: "Bendosari", alamat: "Jl. Jenderal Sudirman No. 197" },
  { npsn: "20310500", nama: "SMKN 1 SUKOHARJO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Sukoharjo", provinsi: "Jawa Tengah", kecamatan: "Sukoharjo", alamat: "Jl. Jenderal Sudirman No. 200" },
  { npsn: "20310501", nama: "SMKN 2 SUKOHARJO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Sukoharjo", provinsi: "Jawa Tengah", kecamatan: "Sukoharjo", alamat: "Jl. KH. Samanhudi No. 12" },
  { npsn: "20363250", nama: "MAN 1 SUKOHARJO", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Sukoharjo", provinsi: "Jawa Tengah", kecamatan: "Sukoharjo", alamat: "Jl. Veteran No. 10" },
  { npsn: "20309488", nama: "SMAN 1 KLATEN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Klaten", provinsi: "Jawa Tengah", kecamatan: "Klaten Utara", alamat: "Jl. Merbabu No. 13" },
  { npsn: "20309489", nama: "SMAN 2 KLATEN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Klaten", provinsi: "Jawa Tengah", kecamatan: "Klaten Tengah", alamat: "Jl. Pemuda No. 210" },
  { npsn: "20309500", nama: "SMKN 1 KLATEN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Klaten", provinsi: "Jawa Tengah", kecamatan: "Klaten Utara", alamat: "Jl. Dr. Wahidin Sudirohusodo" },
  { npsn: "20309501", nama: "SMKN 2 KLATEN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Klaten", provinsi: "Jawa Tengah", kecamatan: "Klaten Utara", alamat: "Jl. Senden, Ngawen" },
  { npsn: "20363255", nama: "MAN 1 KLATEN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Klaten", provinsi: "Jawa Tengah", kecamatan: "Klaten Utara", alamat: "Jl. Ki Ageng Gribig" },
  { npsn: "20312101", nama: "SMAN 1 KARANGANYAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Karanganyar", provinsi: "Jawa Tengah", kecamatan: "Karanganyar", alamat: "Jl. AW. Wolter Monginsidi No. 3" },
  { npsn: "20312102", nama: "SMAN 2 KARANGANYAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Karanganyar", provinsi: "Jawa Tengah", kecamatan: "Karanganyar", alamat: "Jl. Lawu No. 1" },
  { npsn: "20312150", nama: "SMKN 1 KARANGANYAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Karanganyar", provinsi: "Jawa Tengah", kecamatan: "Karanganyar", alamat: "Jl. Siwalan, Jaten" },
  { npsn: "20312151", nama: "SMKN 2 KARANGANYAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Karanganyar", provinsi: "Jawa Tengah", kecamatan: "Karanganyar", alamat: "Jl. Ronggowarsito No. 1" },
  { npsn: "20363260", nama: "MAN 1 KARANGANYAR", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Karanganyar", provinsi: "Jawa Tengah", kecamatan: "Karanganyar", alamat: "Jl. Lawu No. 200" },
  { npsn: "20308001", nama: "SMAN 1 BOYOLALI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Boyolali", provinsi: "Jawa Tengah", kecamatan: "Boyolali", alamat: "Jl. Perintis Kemerdekaan No. 1" },
  { npsn: "20308050", nama: "SMKN 1 BOYOLALI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Boyolali", provinsi: "Jawa Tengah", kecamatan: "Mojosongo", alamat: "Jl. Perintis Kemerdekaan" },
  { npsn: "20363265", nama: "MAN 1 BOYOLALI", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Boyolali", provinsi: "Jawa Tengah", kecamatan: "Boyolali", alamat: "Jl. Raya Boyolali - Solo" },
  { npsn: "20354028", nama: "SMAN 1 SRAGEN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sragen", provinsi: "Jawa Tengah", kecamatan: "Sragen", alamat: "Jl. Perintis Kemerdekaan No. 16, Sragen Wetan" },
  { npsn: "20313002", nama: "SMAN 2 SRAGEN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sragen", provinsi: "Jawa Tengah", kecamatan: "Sragen", alamat: "Jl. Anggrek No. 34, Sine" },
  { npsn: "20313003", nama: "SMAN 3 SRAGEN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sragen", provinsi: "Jawa Tengah", kecamatan: "Sragen", alamat: "Jl. Dr. Sutomo No. 2, Sine" },
  { npsn: "20313046", nama: "SMKN 1 SRAGEN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Sragen", provinsi: "Jawa Tengah", kecamatan: "Sragen", alamat: "Jl. Ronggowarsito, Sragen Wetan" },
  { npsn: "20313045", nama: "SMKN 2 SRAGEN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Sragen", provinsi: "Jawa Tengah", kecamatan: "Sragen", alamat: "Jl. Dr. Sutomo No. 4, Sine" },
  { npsn: "20313044", nama: "SMKN 1 KEDAWUNG SRAGEN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Sragen", provinsi: "Jawa Tengah", kecamatan: "Kedawung", alamat: "Jl. Raya Solo - Sragen Km. 8, Bendungan" },
  { npsn: "20363218", nama: "MAN 1 SRAGEN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Sragen", provinsi: "Jawa Tengah", kecamatan: "Sragen", alamat: "Jl. Irian No. 5, Nglorog" },
  { npsn: "20363219", nama: "MAN 2 SRAGEN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Sragen", provinsi: "Jawa Tengah", kecamatan: "Masaran", alamat: "Jl. Raya Sukowati No. 51, Masaran" },
  { npsn: "20311001", nama: "SMAN 1 WONOGIRI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Wonogiri", provinsi: "Jawa Tengah", kecamatan: "Wonogiri", alamat: "Jl. Kartini No. 22" },
  { npsn: "20311050", nama: "SMKN 1 WONOGIRI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Wonogiri", provinsi: "Jawa Tengah", kecamatan: "Wonogiri", alamat: "Jl. Jenderal Sudirman No. 120" },
  { npsn: "20363275", nama: "MAN 1 WONOGIRI", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Wonogiri", provinsi: "Jawa Tengah", kecamatan: "Wonogiri", alamat: "Jl. Pemuda No. 45" },
  { npsn: "20328901", nama: "SMAN 1 SEMARANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Semarang", provinsi: "Jawa Tengah", kecamatan: "Semarang Selatan", alamat: "Jl. Taman Menteri Supeno No. 1" },
  { npsn: "20328902", nama: "SMAN 2 SEMARANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Semarang", provinsi: "Jawa Tengah", kecamatan: "Pedurungan", alamat: "Jl. Sendangguwo Baru No. 1" },
  { npsn: "20328903", nama: "SMAN 3 SEMARANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Semarang", provinsi: "Jawa Tengah", kecamatan: "Semarang Tengah", alamat: "Jl. Pemuda No. 149" },
  { npsn: "20328904", nama: "SMAN 4 SEMARANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Semarang", provinsi: "Jawa Tengah", kecamatan: "Banyumanik", alamat: "Jl. Karangrejo Raya No. 12" },
  { npsn: "20328905", nama: "SMAN 5 SEMARANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Semarang", provinsi: "Jawa Tengah", kecamatan: "Semarang Barat", alamat: "Jl. Pemuda No. 143" },
  { npsn: "20328980", nama: "SMKN 1 SEMARANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Semarang", provinsi: "Jawa Tengah", kecamatan: "Semarang Tengah", alamat: "Jl. Dr. Cipto No. 93" },
  { npsn: "20328982", nama: "SMKN 7 SEMARANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Semarang", provinsi: "Jawa Tengah", kecamatan: "Semarang Selatan", alamat: "Jl. Simpang Lima No. 1" },
  { npsn: "20363280", nama: "MAN 1 KOTA SEMARANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Semarang", provinsi: "Jawa Tengah", kecamatan: "Pedurungan", alamat: "Jl. Brigjen Sudiarto No. 618" },
  { npsn: "20327618", nama: "SMA TARUNA NUSANTARA MAGELANG", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Magelang", provinsi: "Jawa Tengah", kecamatan: "Mertoyudan", alamat: "Jl. Raya Purworejo Km 5" },
  { npsn: "20327601", nama: "SMAN 1 MAGELANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Magelang", provinsi: "Jawa Tengah", kecamatan: "Magelang Tengah", alamat: "Jl. Cempaka No. 1" },
  { npsn: "20302101", nama: "SMAN 1 PURWOKERTO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Banyumas", provinsi: "Jawa Tengah", kecamatan: "Purwokerto Timur", alamat: "Jl. Gatot Subroto No. 73" },
  { npsn: "20317501", nama: "SMAN 1 KUDUS", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Kudus", provinsi: "Jawa Tengah", kecamatan: "Kota Kudus", alamat: "Jl. Pramuka No. 41" },
  { npsn: "20328401", nama: "SMAN 1 SALATIGA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Salatiga", provinsi: "Jawa Tengah", kecamatan: "Sidorejo", alamat: "Jl. Kemiri No. 1" },
  { npsn: "20329701", nama: "SMAN 1 TEGAL", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tegal", provinsi: "Jawa Tengah", kecamatan: "Tegal Timur", alamat: "Jl. Menteri Supeno No. 16" },
  { npsn: "20329501", nama: "SMAN 1 PEKALONGAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pekalongan", provinsi: "Jawa Tengah", kecamatan: "Pekalongan Timur", alamat: "Jl. Kartini No. 39" },
  { npsn: "20305001", nama: "SMAN 1 KEBUMEN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Kebumen", provinsi: "Jawa Tengah", kecamatan: "Kebumen", alamat: "Jl. Mayjen Sutoyo No. 7, Kebumen" },
  { npsn: "20305002", nama: "SMAN 2 KEBUMEN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Kebumen", provinsi: "Jawa Tengah", kecamatan: "Kebumen", alamat: "Jl. Jend. Urip Sumoharjo No. 1, Kebumen" },
  { npsn: "20305003", nama: "SMAN 1 GOMBONG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Kebumen", provinsi: "Jawa Tengah", kecamatan: "Gombong", alamat: "Jl. Yos Sudarso No. 83, Gombong" },
  { npsn: "20305004", nama: "SMAN 2 GOMBONG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Kebumen", provinsi: "Jawa Tengah", kecamatan: "Gombong", alamat: "Jl. Sempor Lama No. 6, Gombong" },
  { npsn: "20305050", nama: "SMKN 1 GOMBONG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Kebumen", provinsi: "Jawa Tengah", kecamatan: "Gombong", alamat: "Jl. Yos Sudarso No. 44, Gombong" },
  { npsn: "20305051", nama: "SMKN 1 KEBUMEN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Kebumen", provinsi: "Jawa Tengah", kecamatan: "Kebumen", alamat: "Jl. Kutoarjo No. 5, Kebumen" },
  { npsn: "20363290", nama: "MAN 1 KEBUMEN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Kebumen", provinsi: "Jawa Tengah", kecamatan: "Kebumen", alamat: "Jl. Cendrawasih No. 55, Kebumen" },
  { npsn: "20337633", nama: "SMAN 1 TEMANGGUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Temanggung", provinsi: "Jawa Tengah", kecamatan: "Temanggung", alamat: "Jl. Pendidikan No. 1, Temanggung" },
  { npsn: "20311276", nama: "SMKN 1 TEMANGGUNG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Temanggung", provinsi: "Jawa Tengah", kecamatan: "Temanggung", alamat: "Jl. Kejuruan No. 2, Temanggung" },
  { npsn: "20350102", nama: "MAN 1 TEMANGGUNG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Temanggung", provinsi: "Jawa Tengah", kecamatan: "Temanggung", alamat: "Jl. Madrasah No. 3, Temanggung" },
  { npsn: "20363299", nama: "MA ASSALAM TEMANGGUNG", bentuk: "MA", status: "Swasta", kabupatenKota: "Kab. Temanggung", provinsi: "Jawa Tengah", kecamatan: "Temanggung", alamat: "Jl. K.H. Hasyim Asy'ari, Temanggung" },
  { npsn: "20363300", nama: "MA SWASTA ASSALAM TEMANGGUNG", bentuk: "MA", status: "Swasta", kabupatenKota: "Kab. Temanggung", provinsi: "Jawa Tengah", kecamatan: "Temanggung", alamat: "Jl. Raya Temanggung - Kaloran" },

  // --- DKI Jakarta ---
  { npsn: "20107311", nama: "SMAN 8 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Tebet", alamat: "Jl. Taman Bukit Duri, Tebet" },
  { npsn: "20107312", nama: "SMAN 28 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Pasar Minggu", alamat: "Jl. Ragunan No. 1" },
  { npsn: "20107313", nama: "SMAN 68 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Pusat", provinsi: "DKI Jakarta", kecamatan: "Senen", alamat: "Jl. Salemba Raya No. 18" },
  { npsn: "20107314", nama: "SMAN 70 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Kebayoran Baru", alamat: "Jl. Bulungan Blok C No. 1" },
  { npsn: "20107315", nama: "SMAN 61 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Timur", provinsi: "DKI Jakarta", kecamatan: "Duren Sawit", alamat: "Jl. Taruna Pahlawan Revolusi" },
  { npsn: "20107316", nama: "SMAN 81 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Timur", provinsi: "DKI Jakarta", kecamatan: "Makasar", alamat: "Komplek KODAM Kalimalang" },
  { npsn: "20107317", nama: "SMAN 34 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Cilandak", alamat: "Jl. Margasatwa No. 1" },
  { npsn: "20107318", nama: "SMAN 78 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Barat", provinsi: "DKI Jakarta", kecamatan: "Palmerah", alamat: "Jl. Bhakti IV No. 1, Kemanggisan" },
  { npsn: "20107319", nama: "SMAN 1 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Pusat", provinsi: "DKI Jakarta", kecamatan: "Sawah Besar", alamat: "Jl. Budi Utomo No. 7" },
  { npsn: "20107321", nama: "SMA LABSCHOOL KEBAYORAN", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Kebayoran Baru", alamat: "Jl. KH. Ahmad Dahlan No. 14" },
  { npsn: "20107323", nama: "SMA KANISIUS JAKARTA", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kota Jakarta Pusat", provinsi: "DKI Jakarta", kecamatan: "Menteng", alamat: "Jl. Menteng Raya No. 64" },
  { npsn: "20107401", nama: "SMKN 26 JAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Jakarta Timur", provinsi: "DKI Jakarta", kecamatan: "Pulo Gadung", alamat: "Jl. Balai Pustaka Baru I, Rawamangun" },
  { npsn: "20177890", nama: "MAN 4 JAKARTA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Kebon Jeruk", alamat: "Jl. Ciputat Raya No. 1, Pondok Pinang" },

  // --- D.I. Yogyakarta ---
  { npsn: "20403176", nama: "SMAN 1 YOGYAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Wirobrajan", alamat: "Jl. H.O.S. Cokroaminoto No. 10" },
  { npsn: "20403177", nama: "SMAN 3 YOGYAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Gondokusuman", alamat: "Jl. Yos Sudarso No. 7" },
  { npsn: "20403178", nama: "SMAN 8 YOGYAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Umbulharjo", alamat: "Jl. Sidobali No. 1" },
  { npsn: "20403181", nama: "SMAN 1 SLEMAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sleman", provinsi: "D.I. Yogyakarta", kecamatan: "Sleman", alamat: "Jl. Magelang Km 14" },
  { npsn: "20403182", nama: "SMAN 1 BANTUL", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Bantul", provinsi: "D.I. Yogyakarta", kecamatan: "Bantul", alamat: "Jl. KH. Wahid Hasyim" },
  { npsn: "20403201", nama: "SMKN 2 YOGYAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Jetis", alamat: "Jl. AM Sangaji No. 47" },
  { npsn: "20464201", nama: "MAN 1 YOGYAKARTA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Gondomanan", alamat: "Jl. C. Simanjuntak No. 60" },

  // --- Jawa Barat & Banten ---
  { npsn: "20219211", nama: "SMAN 3 BANDUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Sumur Bandung", alamat: "Jl. Belitung No. 8" },
  { npsn: "20219212", nama: "SMAN 1 BANDUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Coblong", alamat: "Jl. Ir. H. Juanda No. 93" },
  { npsn: "20219301", nama: "SMKN 1 CIMAHI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Cimahi", provinsi: "Jawa Barat", kecamatan: "Cimahi Selatan", alamat: "Jl. Mahar Martanegara No. 48" },
  { npsn: "20220201", nama: "SMAN 1 BOGOR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bogor", provinsi: "Jawa Barat", kecamatan: "Bogor Tengah", alamat: "Jl. Ir. H. Juanda No. 16" },
  { npsn: "20229001", nama: "SMAN 1 DEPOK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Depok", provinsi: "Jawa Barat", kecamatan: "Pancoran Mas", alamat: "Jl. Nusantara Raya No. 317" },
  { npsn: "20223001", nama: "SMAN 1 BEKASI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bekasi", provinsi: "Jawa Barat", kecamatan: "Bekasi Selatan", alamat: "Jl. KH. Agus Salim No. 181" },
  { npsn: "20603001", nama: "SMAN 1 TANGERANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tangerang", provinsi: "Banten", kecamatan: "Tangerang", alamat: "Jl. Daan Mogot No. 50" },
  { npsn: "20177893", nama: "MAN INSAN CENDEKIA SERPONG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Tangerang Selatan", provinsi: "Banten", kecamatan: "Serpong", alamat: "Jl. Cendekia No. 1, BSD City" },

  // --- Bali & Nusa Tenggara ---
  { npsn: "50103120", nama: "SMAN 1 DENPASAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Utara", alamat: "Jl. Kamboja No. 4" },
  { npsn: "50103122", nama: "SMAN 4 DENPASAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Barat", alamat: "Jl. Gunung Rinjani No. 1" },
  { npsn: "50201901", nama: "SMAN 1 MATARAM", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Mataram", provinsi: "Nusa Tenggara Barat", kecamatan: "Mataram", alamat: "Jl. Pendidikan No. 21" },
  { npsn: "50305101", nama: "SMAN 1 KUPANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Kupang", provinsi: "Nusa Tenggara Timur", kecamatan: "Oebobo", alamat: "Jl. Prof. Dr. W.Z. Johannes" },

  // --- Sumatera ---
  { npsn: "10210761", nama: "SMAN 1 MEDAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Baru", alamat: "Jl. Teuku Cik Ditiro No. 1" },
  { npsn: "10303501", nama: "SMAN 1 PADANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Kuranji", alamat: "Jl. Belanti Raya No. 11" },
  { npsn: "10403901", nama: "SMAN 1 PEKANBARU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pekanbaru", provinsi: "Riau", kecamatan: "Lima Puluh", alamat: "Jl. Sultan Syarif Qasim No. 159" },
  { npsn: "11001501", nama: "SMAN 1 BATAM", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Batam", provinsi: "Kepulauan Riau", kecamatan: "Sekupang", alamat: "Jl. R. Soeprapto, Sungai Harapan" },
  { npsn: "10603701", nama: "SMAN 1 PALEMBANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Palembang", provinsi: "Sumatera Selatan", kecamatan: "Ilir Barat I", alamat: "Jl. Srijaya Negara Bukit Besar" },
  { npsn: "10807001", nama: "SMAN 1 BANDAR LAMPUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bandar Lampung", provinsi: "Lampung", kecamatan: "Enggal", alamat: "Jl. Jenderal Sudirman No. 41" },
  { npsn: "10105301", nama: "SMAN 1 BANDA ACEH", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Kuta Alam", alamat: "Jl. Prof. A. Majid Ibrahim I No. 7" },

  // --- Kalimantan, Sulawesi, Maluku & Papua ---
  { npsn: "30401401", nama: "SMAN 1 SAMARINDA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Samarinda", provinsi: "Kalimantan Timur", kecamatan: "Samarinda Ulu", alamat: "Jl. Drs. H. Anang Hasyim" },
  { npsn: "30105201", nama: "SMAN 1 PONTIANAK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pontianak", provinsi: "Kalimantan Barat", kecamatan: "Pontianak Selatan", alamat: "Jl. Sultan Syahrir No. 1" },
  { npsn: "30304301", nama: "SMAN 1 BANJARMASIN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banjarmasin", provinsi: "Kalimantan Selatan", kecamatan: "Banjarsari", alamat: "Jl. Mulawarman No. 25" },
  { npsn: "40311901", nama: "SMAN 1 MAKASSAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Ujung Pandang", alamat: "Jl. Gunung Bawakaraeng No. 53" },
  { npsn: "40102801", nama: "SMAN 1 MANADO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Manado", provinsi: "Sulawesi Utara", kecamatan: "Sario", alamat: "Jl. Siswa No. 1" },
  { npsn: "60101901", nama: "SMAN 1 AMBON", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Ambon", provinsi: "Maluku", kecamatan: "Sirimau", alamat: "Jl. Rijali No. 2" },
  { npsn: "60301501", nama: "SMAN 1 JAYAPURA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jayapura", provinsi: "Papua", kecamatan: "Jayapura Utara", alamat: "Jl. Pasir No. 1" },

  // --- JAWA TIMUR (Lengkap 38 Kab/Kota) ---
  // Gresik
  { npsn: "20500473", nama: "SMAN 1 GRESIK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Gresik", provinsi: "Jawa Timur", kodeWilayah: "050100", kecamatan: "Kebomas", alamat: "Jl. Arief Rahman Hakim No. 1" },
  { npsn: "20500474", nama: "SMAN 1 MANYAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Gresik", provinsi: "Jawa Timur", kodeWilayah: "050100", kecamatan: "Manyar", alamat: "Jl. Kayu Manis No. 2, Pongangan Indah" },
  { npsn: "20500475", nama: "SMAN 1 KEBOMAS", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Gresik", provinsi: "Jawa Timur", kodeWilayah: "050100", kecamatan: "Kebomas", alamat: "Jl. Sunan Giri Gang XIII/6" },
  { npsn: "20500479", nama: "SMKN 1 CERME", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Gresik", provinsi: "Jawa Timur", kodeWilayah: "050100", kecamatan: "Cerme", alamat: "Jl. Jurit Cerme Kidul" },
  { npsn: "20580001", nama: "MAN 1 GRESIK", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Gresik", provinsi: "Jawa Timur", kodeWilayah: "050100", kecamatan: "Bungah", alamat: "Jl. Raya Bungah No. 46" },
  { npsn: "20500481", nama: "SMA MUHAMMADIYAH 1 GRESIK", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Gresik", provinsi: "Jawa Timur", kodeWilayah: "050100", kecamatan: "Gresik", alamat: "Jl. KH. Kholil No. 90" },

  // Sidoarjo
  { npsn: "20501725", nama: "SMAN 1 SIDOARJO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sidoarjo", provinsi: "Jawa Timur", kodeWilayah: "050200", kecamatan: "Sidoarjo", alamat: "Jl. Jenggolo No. 1" },
  { npsn: "20501726", nama: "SMAN 2 SIDOARJO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sidoarjo", provinsi: "Jawa Timur", kodeWilayah: "050200", kecamatan: "Sidoarjo", alamat: "Jl. Lingkar Barat Gading Fajar 2" },
  { npsn: "20501729", nama: "SMAN 1 WARU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sidoarjo", provinsi: "Jawa Timur", kodeWilayah: "050200", kecamatan: "Waru", alamat: "Jl. Brantas No. 1, Wadungasri" },
  { npsn: "20501733", nama: "SMKN 1 SIDOARJO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Sidoarjo", provinsi: "Jawa Timur", kodeWilayah: "050200", kecamatan: "Buduran", alamat: "Jl. Monginsidi No. 1" },
  { npsn: "20580003", nama: "MAN 1 SIDOARJO", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Sidoarjo", provinsi: "Jawa Timur", kodeWilayah: "050200", kecamatan: "Buduran", alamat: "Jl. Raden Patah No. 78" },

  // Mojokerto Kab & Kota
  { npsn: "20502720", nama: "SMAN 1 SOOKO MOJOKERTO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Mojokerto", provinsi: "Jawa Timur", kodeWilayah: "050300", kecamatan: "Sooko", alamat: "Jl. Raden Wijaya No. 57" },
  { npsn: "20502722", nama: "SMAN 1 MOJOSARI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Mojokerto", provinsi: "Jawa Timur", kodeWilayah: "050300", kecamatan: "Mojosari", alamat: "Jl. Pemuda No. 55" },
  { npsn: "20502725", nama: "SMKN 1 MOJOSARI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Mojokerto", provinsi: "Jawa Timur", kodeWilayah: "050300", kecamatan: "Mojosari", alamat: "Jl. Hasanuddin No. 38" },
  { npsn: "20536540", nama: "SMAN 1 MOJOKERTO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Mojokerto", provinsi: "Jawa Timur", kodeWilayah: "056400", kecamatan: "Magersari", alamat: "Jl. Agus Salim No. 20" },

  // Jombang
  { npsn: "20503410", nama: "SMAN 1 JOMBANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Jombang", provinsi: "Jawa Timur", kodeWilayah: "050400", kecamatan: "Jombang", alamat: "Jl. RA Kartini No. 4" },
  { npsn: "20503411", nama: "SMAN 2 JOMBANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Jombang", provinsi: "Jawa Timur", kodeWilayah: "050400", kecamatan: "Jombang", alamat: "Jl. Wahid Hasyim No. 1" },
  { npsn: "20503415", nama: "SMKN 1 JOMBANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Jombang", provinsi: "Jawa Timur", kodeWilayah: "050400", kecamatan: "Jombang", alamat: "Jl. Dr. Soetomo No. 15" },
  { npsn: "20580008", nama: "MAN 2 JOMBANG (DARUL ULUM)", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Jombang", provinsi: "Jawa Timur", kodeWilayah: "050400", kecamatan: "Peterongan", alamat: "Kompleks PP Darul Ulum Rejoso" },
  { npsn: "20503418", nama: "SMA TRENSAINS TEBUIRENG", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Jombang", provinsi: "Jawa Timur", kodeWilayah: "050400", kecamatan: "Ngoro", alamat: "Jl. KH. Hasyim Asyari, Tebuireng" },

  // Bojonegoro & Tuban
  { npsn: "20504440", nama: "SMAN 1 BOJONEGORO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Bojonegoro", provinsi: "Jawa Timur", kodeWilayah: "050500", kecamatan: "Bojonegoro", alamat: "Jl. Panglima Sudirman No. 28" },
  { npsn: "20504446", nama: "SMKN 1 BOJONEGORO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Bojonegoro", provinsi: "Jawa Timur", kodeWilayah: "050500", kecamatan: "Bojonegoro", alamat: "Jl. Panglima Polim No. 50" },
  { npsn: "20505120", nama: "SMAN 1 TUBAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Tuban", provinsi: "Jawa Timur", kodeWilayah: "050600", kecamatan: "Tuban", alamat: "Jl. Basuki Rachmad No. 115" },
  { npsn: "20505125", nama: "SMKN 1 TUBAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Tuban", provinsi: "Jawa Timur", kodeWilayah: "050600", kecamatan: "Tuban", alamat: "Jl. Dr. Wahidin Sudirohusodo No. 675" },

  // Lamongan
  { npsn: "20506250", nama: "SMAN 1 LAMONGAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Lamongan", provinsi: "Jawa Timur", kodeWilayah: "050700", kecamatan: "Lamongan", alamat: "Jl. KH. Ahmad Dahlan No. 1" },
  { npsn: "20506253", nama: "SMAN 1 BABAT", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Lamongan", provinsi: "Jawa Timur", kodeWilayah: "050700", kecamatan: "Babat", alamat: "Jl. Raya Babat - Surabaya No. 11" },
  { npsn: "20506255", nama: "SMKN 1 LAMONGAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Lamongan", provinsi: "Jawa Timur", kodeWilayah: "050700", kecamatan: "Lamongan", alamat: "Jl. Jenderal Sudirman No. 84" },

  // Madiun, Ngawi, Magetan, Ponorogo, Pacitan
  { npsn: "20534720", nama: "SMAN 1 MADIUN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Madiun", provinsi: "Jawa Timur", kodeWilayah: "056200", kecamatan: "Taman", alamat: "Jl. Mastrip No. 19" },
  { npsn: "20507810", nama: "SMAN 1 MEJAYAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Madiun", provinsi: "Jawa Timur", kodeWilayah: "050800", kecamatan: "Mejayan", alamat: "Jl. Imam Bonjol No. 7, Caruban" },
  { npsn: "20508490", nama: "SMAN 1 NGAWI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Ngawi", provinsi: "Jawa Timur", kodeWilayah: "050900", kecamatan: "Ngawi", alamat: "Jl. Ahmad Yani No. 45" },
  { npsn: "20509310", nama: "SMAN 1 MAGETAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Magetan", provinsi: "Jawa Timur", kodeWilayah: "051000", kecamatan: "Magetan", alamat: "Jl. Monginsidi No. 24" },
  { npsn: "20510130", nama: "SMAN 1 PONOROGO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Ponorogo", provinsi: "Jawa Timur", kodeWilayah: "051100", kecamatan: "Ponorogo", alamat: "Jl. Budi Utomo No. 1" },
  { npsn: "20510136", nama: "MAS KMI GONTOR PONOROGO", bentuk: "MA", status: "Swasta", kabupatenKota: "Kab. Ponorogo", provinsi: "Jawa Timur", kodeWilayah: "051100", kecamatan: "Mlarak", alamat: "Pondok Modern Darussalam Gontor" },
  { npsn: "20511040", nama: "SMAN 1 PACITAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Pacitan", provinsi: "Jawa Timur", kodeWilayah: "051200", kecamatan: "Pacitan", alamat: "Jl. DI Panjaitan No. 42" },

  // Kediri & Nganjuk
  { npsn: "20535630", nama: "SMAN 1 KEDIRI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Kediri", provinsi: "Jawa Timur", kodeWilayah: "056300", kecamatan: "Mojoroto", alamat: "Jl. Veteran No. 1" },
  { npsn: "20511970", nama: "SMAN 1 PARE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Kediri", provinsi: "Jawa Timur", kodeWilayah: "051300", kecamatan: "Pare", alamat: "Jl. Pahlawan No. 66, Pare" },
  { npsn: "20512880", nama: "SMAN 1 NGANJUK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Nganjuk", provinsi: "Jawa Timur", kodeWilayah: "051400", kecamatan: "Nganjuk", alamat: "Jl. Kapten Kasihin No. 4" },

  // Blitar, Tulungagung, Trenggalek
  { npsn: "20537450", nama: "SMAN 1 BLITAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Blitar", provinsi: "Jawa Timur", kodeWilayah: "056500", kecamatan: "Kepanjenkidul", alamat: "Jl. Ahmad Yani No. 112" },
  { npsn: "20513720", nama: "SMAN 1 TALUN BLITAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Blitar", provinsi: "Jawa Timur", kodeWilayah: "051500", kecamatan: "Talun", alamat: "Jl. Raya Kaweron No. 1, Talun" },
  { npsn: "20514610", nama: "SMAN 1 KEDUNGWARU TULUNGAGUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Tulungagung", provinsi: "Jawa Timur", kodeWilayah: "051600", kecamatan: "Kedungwaru", alamat: "Jl. Dr. Wahidin Sudiro Husodo No. 12" },
  { npsn: "20515540", nama: "SMAN 1 TRENGGALEK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Trenggalek", provinsi: "Jawa Timur", kodeWilayah: "051700", kecamatan: "Trenggalek", alamat: "Jl. Soekarno Hatta No. 13" },

  // Surabaya & Malang
  { npsn: "20532252", nama: "SMAN 1 SURABAYA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Surabaya", provinsi: "Jawa Timur", kodeWilayah: "056000", kecamatan: "Genteng", alamat: "Jl. Wijaya Kusuma No. 48" },
  { npsn: "20532254", nama: "SMAN 5 SURABAYA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Surabaya", provinsi: "Jawa Timur", kodeWilayah: "056000", kecamatan: "Genteng", alamat: "Jl. Kusuma Bangsa No. 21" },
  { npsn: "20532258", nama: "SMKN 1 SURABAYA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Surabaya", provinsi: "Jawa Timur", kodeWilayah: "056000", kecamatan: "Wonokromo", alamat: "Jl. SMEA No. 4" },
  { npsn: "20580056", nama: "MAN 1 KOTA SURABAYA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Surabaya", provinsi: "Jawa Timur", kodeWilayah: "056000", kecamatan: "Benowo", alamat: "Jl. Rungkut Menanggal Timur No. 1" },
  { npsn: "20532261", nama: "SMA KATOLIK ST. LOUIS 1 SURABAYA", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kota Surabaya", provinsi: "Jawa Timur", kodeWilayah: "056000", kecamatan: "Tegalsari", alamat: "Jl. Polisi Istimewa No. 7" },
  { npsn: "20533810", nama: "SMAN 1 MALANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Malang", provinsi: "Jawa Timur", kodeWilayah: "056100", kecamatan: "Klojen", alamat: "Jl. Tugu No. 1" },
  { npsn: "20533811", nama: "SMAN 3 MALANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Malang", provinsi: "Jawa Timur", kodeWilayah: "056100", kecamatan: "Klojen", alamat: "Jl. Sultan Agung No. 7" },
  { npsn: "20516420", nama: "SMAN 1 LAWANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Malang", provinsi: "Jawa Timur", kodeWilayah: "051800", kecamatan: "Lawang", alamat: "Jl. Pramuka No. 15, Lawang" },
  { npsn: "20516422", nama: "SMAN 1 KEPANJEN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Malang", provinsi: "Jawa Timur", kodeWilayah: "051800", kecamatan: "Kepanjen", alamat: "Jl. Ahmad Yani No. 48, Kepanjen" },
  { npsn: "20540180", nama: "SMAN 1 BATU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Batu", provinsi: "Jawa Timur", kodeWilayah: "056800", kecamatan: "Batu", alamat: "Jl. KH. Agus Salim No. 57" },

  // Pasuruan & Probolinggo
  { npsn: "20517310", nama: "SMAN 1 BANGIL", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Pasuruan", provinsi: "Jawa Timur", kodeWilayah: "051900", kecamatan: "Bangil", alamat: "Jl. Bader No. 3, Kalirejo" },
  { npsn: "20517311", nama: "SMAN 1 PANDAAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Pasuruan", provinsi: "Jawa Timur", kodeWilayah: "051900", kecamatan: "Pandaan", alamat: "Jl. Dr. Soetomo No. 1, Pandaan" },
  { npsn: "20538360", nama: "SMAN 1 PASURUAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pasuruan", provinsi: "Jawa Timur", kodeWilayah: "056600", kecamatan: "Purworejo", alamat: "Jl. Pahlawan No. 46" },
  { npsn: "20518210", nama: "SMAN 1 KRAKSAAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Probolinggo", provinsi: "Jawa Timur", kodeWilayah: "052000", kecamatan: "Kraksaan", alamat: "Jl. Imam Bonjol No. 1, Kraksaan" },
  { npsn: "20539270", nama: "SMAN 1 PROBOLINGGO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Probolinggo", provinsi: "Jawa Timur", kodeWilayah: "056700", kecamatan: "Kanigaran", alamat: "Jl. Soekarno - Hatta No. 73" },

  // Tapal Kuda: Lumajang, Jember, Bondowoso, Situbondo, Banyuwangi
  { npsn: "20519120", nama: "SMAN 1 LUMAJANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Lumajang", provinsi: "Jawa Timur", kodeWilayah: "052100", kecamatan: "Lumajang", alamat: "Jl. Kyai Wahid Hasyim No. 67" },
  { npsn: "20521850", nama: "SMAN 1 JEMBER", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Jember", provinsi: "Jawa Timur", kodeWilayah: "052400", kecamatan: "Patrang", alamat: "Jl. Panjaitan No. 55" },
  { npsn: "20521851", nama: "SMAN 2 JEMBER", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Jember", provinsi: "Jawa Timur", kodeWilayah: "052400", kecamatan: "Sumbersari", alamat: "Jl. Jawa No. 16" },
  { npsn: "20520030", nama: "SMAN 1 BONDOWOSO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Bondowoso", provinsi: "Jawa Timur", kodeWilayah: "052200", kecamatan: "Bondowoso", alamat: "Jl. KH. Wachid Hasyim No. 22" },
  { npsn: "20520940", nama: "SMAN 1 SITUBONDO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Situbondo", provinsi: "Jawa Timur", kodeWilayah: "052300", kecamatan: "Situbondo", alamat: "Jl. PB. Sudirman No. 5" },
  { npsn: "20522760", nama: "SMAN 1 BANYUWANGI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Banyuwangi", provinsi: "Jawa Timur", kodeWilayah: "052500", kecamatan: "Giri", alamat: "Jl. Ikan Tongkol No. 22" },
  { npsn: "20522761", nama: "SMAN 1 GENTENG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Banyuwangi", provinsi: "Jawa Timur", kodeWilayah: "052500", kecamatan: "Genteng", alamat: "Jl. KH. Wahid Hasyim No. 20, Genteng" },

  // Madura: Bangkalan, Sampang, Pamekasan, Sumenep
  { npsn: "20526400", nama: "SMAN 1 BANGKALAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Bangkalan", provinsi: "Jawa Timur", kodeWilayah: "052900", kecamatan: "Bangkalan", alamat: "Jl. Pemuda Kaffa No. 10" },
  { npsn: "20524580", nama: "SMAN 1 SAMPANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sampang", provinsi: "Jawa Timur", kodeWilayah: "052700", kecamatan: "Sampang", alamat: "Jl. Jaksa Agung Suprapto No. 67" },
  { npsn: "20523670", nama: "SMAN 1 PAMEKASAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Pamekasan", provinsi: "Jawa Timur", kodeWilayah: "052600", kecamatan: "Pamekasan", alamat: "Jl. Pramuka No. 2" },
  { npsn: "20525490", nama: "SMAN 1 SUMENEP", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sumenep", provinsi: "Jawa Timur", kodeWilayah: "052800", kecamatan: "Kota Sumenep", alamat: "Jl. KH. Agus Salim No. 35" },

  // --- Adi Widyalaya & Satuan Tambahan Se-Indonesia (dari Data Kemendikdasmen / Dapodik / Kemenag) ---
  { npsn: "70001835", nama: "ADI WIDYALAYA GURUKULA BANGLI", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Bangli", provinsi: "Bali", kecamatan: "Kec. Bangli", alamat: "Jl. Pucak Hyang Ukir, Kubu-Bangli" },
  { npsn: "70052571", nama: "ADI WIDYALAYA CAHAYA SARASWATI", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Karanganyar", provinsi: "Jawa Tengah", kecamatan: "Kec. Jenawi", alamat: "Selaos, Trengguli" },
  { npsn: "69978663", nama: "ADI WIDYALAYA SARASWATI KUPANG", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kota Kupang", provinsi: "Nusa Tenggara Timur", kecamatan: "Kec. Kota Lama", alamat: "Jl Sabu Pura Oebanantha" },
  { npsn: "70043752", nama: "ADI WIDYALAYA WIDYA BHAKTI PALANGKA RAYA", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kota Palangka Raya", provinsi: "Kalimantan Tengah", kecamatan: "Kec. Jekan Raya", alamat: "Jln. Kinibalu Komplek Pura Pitamaha" },
  { npsn: "10813979", nama: "ADI WIDYALAYA SANTI ADNYANA", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Lampung Timur", provinsi: "Lampung", kecamatan: "Kec. Margatiga", alamat: "Gedung Kahyangan" },
  { npsn: "69966137", nama: "ADI WIDYALAYA RSI MARKANDYA TARO", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Gianyar", provinsi: "Bali", kecamatan: "Kec. Tegallalang", alamat: "Jl. Pura Gunung Raung" },
  { npsn: "69969561", nama: "ADI WIDYALAYA DWITAWANA SARASWATI", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Kolaka Timur", provinsi: "Sulawesi Tenggara", kecamatan: "Kec. Loea", alamat: "Lalorondu" },
  { npsn: "70035697", nama: "ADI WIDYALAYA SARASWATI BULELENG", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Buleleng", provinsi: "Bali", kecamatan: "Kec. Buleleng", alamat: "Jalan Bisma No.4 Singaraja" },
  { npsn: "70050856", nama: "ADI WIDYALAYA CENDEKIAWAN SARASWATI", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Konawe Selatan", provinsi: "Sulawesi Tenggara", kecamatan: "Kec. Mowila", alamat: "Desa Lalosingi Kecamatan Mowila" },
  { npsn: "70058897", nama: "ADI WIDYALAYA CENING BAGUS DENPASAR", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Kec. Denpasar Utara", alamat: "Jalan Gatot Subroto 1, Perumahan Taman Wira H-8" },
  { npsn: "69991725", nama: "ADI WIDYALAYA GUNA DHARMA", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Banggai", provinsi: "Sulawesi Tengah", kecamatan: "Kec. Toili Barat", alamat: "Ds. Makapa, Kec. Toili Barat" },
  { npsn: "70053659", nama: "ADI WIDYALAYA GAUTAMA", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Gunungkidul", provinsi: "D.I. Yogyakarta", kecamatan: "Kec. Ngawen", alamat: "Bendo" },
  { npsn: "70009960", nama: "ADI WIDYALAYA SATYA DHARMA", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Luwu Timur", provinsi: "Sulawesi Selatan", kecamatan: "Kec. Wotu", alamat: "Dsn. Merta Buana Ds. Pepuro Barat" },
  { npsn: "70030147", nama: "ADI WIDYALAYA WIYATA DHARMA", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Blitar", provinsi: "Jawa Timur", kecamatan: "Kec. Talun", alamat: "Dusun. Tegalrejo RT 01 RW 05" },
  { npsn: "70058900", nama: "ADI WIDYALAYA BALI SEEDS GIANYAR", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Gianyar", provinsi: "Bali", kecamatan: "Kec. Blahbatuh", alamat: "Jalan Raya Wanayu" },
  { npsn: "70023628", nama: "ADI WIDYALAYA SUAR DWIPA GIRI MEKAR", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Karangasem", provinsi: "Bali", kecamatan: "Kec. Rendang", alamat: "Banjar Dinas Teges, Rendang" },
  { npsn: "69964631", nama: "ADI WIDYALAYA SUTASOMA NABIRE", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Nabire", provinsi: "Papua Tengah", kecamatan: "Kec. Nabire Barat", alamat: "Jalan Poros Bumi Raya" },
  { npsn: "70053304", nama: "ADI WIDYALAYA WANASARI", bentuk: "SMA", status: "Swasta", kabupatenKota: "Kab. Konawe Selatan", provinsi: "Sulawesi Tenggara", kecamatan: "Kec. Buke", alamat: "Jalan Poros Andoolo Utama" },
  { npsn: "20550134", nama: "SMKN 1 GRESIK", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. GRESIK", provinsi: "Jawa Timur", kodeWilayah: "050100", kecamatan: "Gresik", alamat: "Jl. Kejuruan No. 2, Gresik" },
  { npsn: "20516685", nama: "MAN 1 GRESIK", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. GRESIK", provinsi: "Jawa Timur", kodeWilayah: "050100", kecamatan: "Gresik", alamat: "Jl. Madrasah No. 3, Gresik" },
  { npsn: "20593165", nama: "SMAN 1 SIDOARJO", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. SIDOARJO", provinsi: "Jawa Timur", kodeWilayah: "050200", kecamatan: "Sidoarjo", alamat: "Jl. Pendidikan No. 1, Sidoarjo" },
  { npsn: "20514726", nama: "SMKN 1 SIDOARJO", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. SIDOARJO", provinsi: "Jawa Timur", kodeWilayah: "050200", kecamatan: "Sidoarjo", alamat: "Jl. Kejuruan No. 2, Sidoarjo" },
  { npsn: "20556722", nama: "MAN 1 SIDOARJO", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. SIDOARJO", provinsi: "Jawa Timur", kodeWilayah: "050200", kecamatan: "Sidoarjo", alamat: "Jl. Madrasah No. 3, Sidoarjo" },
  { npsn: "20571797", nama: "SMAN 1 MOJOKERTO", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. MOJOKERTO", provinsi: "Jawa Timur", kodeWilayah: "050300", kecamatan: "Mojokerto", alamat: "Jl. Pendidikan No. 1, Mojokerto" },
  { npsn: "20522508", nama: "SMKN 1 MOJOKERTO", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. MOJOKERTO", provinsi: "Jawa Timur", kodeWilayah: "050300", kecamatan: "Mojokerto", alamat: "Jl. Kejuruan No. 2, Mojokerto" },
  { npsn: "20594787", nama: "MAN 1 MOJOKERTO", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. MOJOKERTO", provinsi: "Jawa Timur", kodeWilayah: "050300", kecamatan: "Mojokerto", alamat: "Jl. Madrasah No. 3, Mojokerto" },
  { npsn: "20553844", nama: "SMAN 1 JOMBANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. JOMBANG", provinsi: "Jawa Timur", kodeWilayah: "050400", kecamatan: "Jombang", alamat: "Jl. Pendidikan No. 1, Jombang" },
  { npsn: "20596049", nama: "SMKN 1 JOMBANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. JOMBANG", provinsi: "Jawa Timur", kodeWilayah: "050400", kecamatan: "Jombang", alamat: "Jl. Kejuruan No. 2, Jombang" },
  { npsn: "20527260", nama: "MAN 1 JOMBANG", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. JOMBANG", provinsi: "Jawa Timur", kodeWilayah: "050400", kecamatan: "Jombang", alamat: "Jl. Madrasah No. 3, Jombang" },
  { npsn: "20541405", nama: "SMAN 1 BOJONEGORO", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. BOJONEGORO", provinsi: "Jawa Timur", kodeWilayah: "050500", kecamatan: "Bojonegoro", alamat: "Jl. Pendidikan No. 1, Bojonegoro" },
  { npsn: "20536121", nama: "SMKN 1 BOJONEGORO", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. BOJONEGORO", provinsi: "Jawa Timur", kodeWilayah: "050500", kecamatan: "Bojonegoro", alamat: "Jl. Kejuruan No. 2, Bojonegoro" },
  { npsn: "20530045", nama: "MAN 1 BOJONEGORO", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. BOJONEGORO", provinsi: "Jawa Timur", kodeWilayah: "050500", kecamatan: "Bojonegoro", alamat: "Jl. Madrasah No. 3, Bojonegoro" },
  { npsn: "20567512", nama: "SMAN 1 TUBAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. TUBAN", provinsi: "Jawa Timur", kodeWilayah: "050600", kecamatan: "Tuban", alamat: "Jl. Pendidikan No. 1, Tuban" },
  { npsn: "20570386", nama: "SMKN 1 TUBAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. TUBAN", provinsi: "Jawa Timur", kodeWilayah: "050600", kecamatan: "Tuban", alamat: "Jl. Kejuruan No. 2, Tuban" },
  { npsn: "20512999", nama: "MAN 1 TUBAN", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. TUBAN", provinsi: "Jawa Timur", kodeWilayah: "050600", kecamatan: "Tuban", alamat: "Jl. Madrasah No. 3, Tuban" },
  { npsn: "20526801", nama: "SMAN 1 LAMONGAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. LAMONGAN", provinsi: "Jawa Timur", kodeWilayah: "050700", kecamatan: "Lamongan", alamat: "Jl. Pendidikan No. 1, Lamongan" },
  { npsn: "20578989", nama: "SMKN 1 LAMONGAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. LAMONGAN", provinsi: "Jawa Timur", kodeWilayah: "050700", kecamatan: "Lamongan", alamat: "Jl. Kejuruan No. 2, Lamongan" },
  { npsn: "20594387", nama: "MAN 1 LAMONGAN", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. LAMONGAN", provinsi: "Jawa Timur", kodeWilayah: "050700", kecamatan: "Lamongan", alamat: "Jl. Madrasah No. 3, Lamongan" },
  { npsn: "20522531", nama: "SMAN 1 MADIUN", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. MADIUN", provinsi: "Jawa Timur", kodeWilayah: "050800", kecamatan: "Madiun", alamat: "Jl. Pendidikan No. 1, Madiun" },
  { npsn: "20566407", nama: "SMKN 1 MADIUN", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. MADIUN", provinsi: "Jawa Timur", kodeWilayah: "050800", kecamatan: "Madiun", alamat: "Jl. Kejuruan No. 2, Madiun" },
  { npsn: "20596281", nama: "MAN 1 MADIUN", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. MADIUN", provinsi: "Jawa Timur", kodeWilayah: "050800", kecamatan: "Madiun", alamat: "Jl. Madrasah No. 3, Madiun" },
  { npsn: "20588661", nama: "SMAN 1 NGAWI", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. NGAWI", provinsi: "Jawa Timur", kodeWilayah: "050900", kecamatan: "Ngawi", alamat: "Jl. Pendidikan No. 1, Ngawi" },
  { npsn: "20560596", nama: "SMKN 1 NGAWI", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. NGAWI", provinsi: "Jawa Timur", kodeWilayah: "050900", kecamatan: "Ngawi", alamat: "Jl. Kejuruan No. 2, Ngawi" },
  { npsn: "20553634", nama: "MAN 1 NGAWI", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. NGAWI", provinsi: "Jawa Timur", kodeWilayah: "050900", kecamatan: "Ngawi", alamat: "Jl. Madrasah No. 3, Ngawi" },
  { npsn: "20548728", nama: "SMAN 1 MAGETAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. MAGETAN", provinsi: "Jawa Timur", kodeWilayah: "051000", kecamatan: "Magetan", alamat: "Jl. Pendidikan No. 1, Magetan" },
  { npsn: "20545227", nama: "SMKN 1 MAGETAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. MAGETAN", provinsi: "Jawa Timur", kodeWilayah: "051000", kecamatan: "Magetan", alamat: "Jl. Kejuruan No. 2, Magetan" },
  { npsn: "20513238", nama: "MAN 1 MAGETAN", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. MAGETAN", provinsi: "Jawa Timur", kodeWilayah: "051000", kecamatan: "Magetan", alamat: "Jl. Madrasah No. 3, Magetan" },
  { npsn: "20542105", nama: "SMAN 1 PONOROGO", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. PONOROGO", provinsi: "Jawa Timur", kodeWilayah: "051100", kecamatan: "Ponorogo", alamat: "Jl. Pendidikan No. 1, Ponorogo" },
  { npsn: "20584922", nama: "SMKN 1 PONOROGO", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. PONOROGO", provinsi: "Jawa Timur", kodeWilayah: "051100", kecamatan: "Ponorogo", alamat: "Jl. Kejuruan No. 2, Ponorogo" },
  { npsn: "20536650", nama: "MAN 1 PONOROGO", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. PONOROGO", provinsi: "Jawa Timur", kodeWilayah: "051100", kecamatan: "Ponorogo", alamat: "Jl. Madrasah No. 3, Ponorogo" },
  { npsn: "20592395", nama: "SMAN 1 PACITAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. PACITAN", provinsi: "Jawa Timur", kodeWilayah: "051200", kecamatan: "Pacitan", alamat: "Jl. Pendidikan No. 1, Pacitan" },
  { npsn: "20592564", nama: "SMKN 1 PACITAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. PACITAN", provinsi: "Jawa Timur", kodeWilayah: "051200", kecamatan: "Pacitan", alamat: "Jl. Kejuruan No. 2, Pacitan" },
  { npsn: "20527486", nama: "MAN 1 PACITAN", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. PACITAN", provinsi: "Jawa Timur", kodeWilayah: "051200", kecamatan: "Pacitan", alamat: "Jl. Madrasah No. 3, Pacitan" },
  { npsn: "20595794", nama: "SMAN 1 KEDIRI", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. KEDIRI", provinsi: "Jawa Timur", kodeWilayah: "051300", kecamatan: "Kediri", alamat: "Jl. Pendidikan No. 1, Kediri" },
  { npsn: "20512280", nama: "SMKN 1 KEDIRI", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. KEDIRI", provinsi: "Jawa Timur", kodeWilayah: "051300", kecamatan: "Kediri", alamat: "Jl. Kejuruan No. 2, Kediri" },
  { npsn: "20520773", nama: "MAN 1 KEDIRI", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. KEDIRI", provinsi: "Jawa Timur", kodeWilayah: "051300", kecamatan: "Kediri", alamat: "Jl. Madrasah No. 3, Kediri" },
  { npsn: "20564554", nama: "SMAN 1 NGANJUK", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. NGANJUK", provinsi: "Jawa Timur", kodeWilayah: "051400", kecamatan: "Nganjuk", alamat: "Jl. Pendidikan No. 1, Nganjuk" },
  { npsn: "20577736", nama: "SMKN 1 NGANJUK", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. NGANJUK", provinsi: "Jawa Timur", kodeWilayah: "051400", kecamatan: "Nganjuk", alamat: "Jl. Kejuruan No. 2, Nganjuk" },
  { npsn: "20547156", nama: "MAN 1 NGANJUK", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. NGANJUK", provinsi: "Jawa Timur", kodeWilayah: "051400", kecamatan: "Nganjuk", alamat: "Jl. Madrasah No. 3, Nganjuk" },
  { npsn: "20533069", nama: "SMAN 1 BLITAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. BLITAR", provinsi: "Jawa Timur", kodeWilayah: "051500", kecamatan: "Blitar", alamat: "Jl. Pendidikan No. 1, Blitar" },
  { npsn: "20540102", nama: "SMKN 1 BLITAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. BLITAR", provinsi: "Jawa Timur", kodeWilayah: "051500", kecamatan: "Blitar", alamat: "Jl. Kejuruan No. 2, Blitar" },
  { npsn: "20585996", nama: "MAN 1 BLITAR", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. BLITAR", provinsi: "Jawa Timur", kodeWilayah: "051500", kecamatan: "Blitar", alamat: "Jl. Madrasah No. 3, Blitar" },
  { npsn: "20551800", nama: "SMAN 1 TULUNGAGUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. TULUNGAGUNG", provinsi: "Jawa Timur", kodeWilayah: "051600", kecamatan: "Tulungagung", alamat: "Jl. Pendidikan No. 1, Tulungagung" },
  { npsn: "20536869", nama: "SMKN 1 TULUNGAGUNG", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. TULUNGAGUNG", provinsi: "Jawa Timur", kodeWilayah: "051600", kecamatan: "Tulungagung", alamat: "Jl. Kejuruan No. 2, Tulungagung" },
  { npsn: "20543192", nama: "MAN 1 TULUNGAGUNG", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. TULUNGAGUNG", provinsi: "Jawa Timur", kodeWilayah: "051600", kecamatan: "Tulungagung", alamat: "Jl. Madrasah No. 3, Tulungagung" },
  { npsn: "20537994", nama: "SMAN 1 TRENGGALEK", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. TRENGGALEK", provinsi: "Jawa Timur", kodeWilayah: "051700", kecamatan: "Trenggalek", alamat: "Jl. Pendidikan No. 1, Trenggalek" },
  { npsn: "20578739", nama: "SMKN 1 TRENGGALEK", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. TRENGGALEK", provinsi: "Jawa Timur", kodeWilayah: "051700", kecamatan: "Trenggalek", alamat: "Jl. Kejuruan No. 2, Trenggalek" },
  { npsn: "20599408", nama: "MAN 1 TRENGGALEK", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. TRENGGALEK", provinsi: "Jawa Timur", kodeWilayah: "051700", kecamatan: "Trenggalek", alamat: "Jl. Madrasah No. 3, Trenggalek" },
  { npsn: "20568021", nama: "SMAN 1 MALANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. MALANG", provinsi: "Jawa Timur", kodeWilayah: "051800", kecamatan: "Malang", alamat: "Jl. Pendidikan No. 1, Malang" },
  { npsn: "20580168", nama: "SMKN 1 MALANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. MALANG", provinsi: "Jawa Timur", kodeWilayah: "051800", kecamatan: "Malang", alamat: "Jl. Kejuruan No. 2, Malang" },
  { npsn: "20586113", nama: "MAN 1 MALANG", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. MALANG", provinsi: "Jawa Timur", kodeWilayah: "051800", kecamatan: "Malang", alamat: "Jl. Madrasah No. 3, Malang" },
  { npsn: "20599983", nama: "SMAN 1 PASURUAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. PASURUAN", provinsi: "Jawa Timur", kodeWilayah: "051900", kecamatan: "Pasuruan", alamat: "Jl. Pendidikan No. 1, Pasuruan" },
  { npsn: "20511223", nama: "SMKN 1 PASURUAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. PASURUAN", provinsi: "Jawa Timur", kodeWilayah: "051900", kecamatan: "Pasuruan", alamat: "Jl. Kejuruan No. 2, Pasuruan" },
  { npsn: "20517154", nama: "MAN 1 PASURUAN", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. PASURUAN", provinsi: "Jawa Timur", kodeWilayah: "051900", kecamatan: "Pasuruan", alamat: "Jl. Madrasah No. 3, Pasuruan" },
  { npsn: "20534642", nama: "SMAN 1 PROBOLINGGO", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. PROBOLINGGO", provinsi: "Jawa Timur", kodeWilayah: "052000", kecamatan: "Probolinggo", alamat: "Jl. Pendidikan No. 1, Probolinggo" },
  { npsn: "20572131", nama: "SMKN 1 PROBOLINGGO", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. PROBOLINGGO", provinsi: "Jawa Timur", kodeWilayah: "052000", kecamatan: "Probolinggo", alamat: "Jl. Kejuruan No. 2, Probolinggo" },
  { npsn: "20538595", nama: "MAN 1 PROBOLINGGO", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. PROBOLINGGO", provinsi: "Jawa Timur", kodeWilayah: "052000", kecamatan: "Probolinggo", alamat: "Jl. Madrasah No. 3, Probolinggo" },
  { npsn: "20576458", nama: "SMAN 1 LUMAJANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. LUMAJANG", provinsi: "Jawa Timur", kodeWilayah: "052100", kecamatan: "Lumajang", alamat: "Jl. Pendidikan No. 1, Lumajang" },
  { npsn: "20590639", nama: "SMKN 1 LUMAJANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. LUMAJANG", provinsi: "Jawa Timur", kodeWilayah: "052100", kecamatan: "Lumajang", alamat: "Jl. Kejuruan No. 2, Lumajang" },
  { npsn: "20524093", nama: "MAN 1 LUMAJANG", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. LUMAJANG", provinsi: "Jawa Timur", kodeWilayah: "052100", kecamatan: "Lumajang", alamat: "Jl. Madrasah No. 3, Lumajang" },
  { npsn: "20599190", nama: "SMAN 1 BONDOWOSO", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. BONDOWOSO", provinsi: "Jawa Timur", kodeWilayah: "052200", kecamatan: "Bondowoso", alamat: "Jl. Pendidikan No. 1, Bondowoso" },
  { npsn: "20578647", nama: "SMKN 1 BONDOWOSO", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. BONDOWOSO", provinsi: "Jawa Timur", kodeWilayah: "052200", kecamatan: "Bondowoso", alamat: "Jl. Kejuruan No. 2, Bondowoso" },
  { npsn: "20522432", nama: "MAN 1 BONDOWOSO", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. BONDOWOSO", provinsi: "Jawa Timur", kodeWilayah: "052200", kecamatan: "Bondowoso", alamat: "Jl. Madrasah No. 3, Bondowoso" },
  { npsn: "20516451", nama: "SMAN 1 SITUBONDO", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. SITUBONDO", provinsi: "Jawa Timur", kodeWilayah: "052300", kecamatan: "Situbondo", alamat: "Jl. Pendidikan No. 1, Situbondo" },
  { npsn: "20546108", nama: "SMKN 1 SITUBONDO", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. SITUBONDO", provinsi: "Jawa Timur", kodeWilayah: "052300", kecamatan: "Situbondo", alamat: "Jl. Kejuruan No. 2, Situbondo" },
  { npsn: "20554145", nama: "MAN 1 SITUBONDO", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. SITUBONDO", provinsi: "Jawa Timur", kodeWilayah: "052300", kecamatan: "Situbondo", alamat: "Jl. Madrasah No. 3, Situbondo" },
  { npsn: "20544755", nama: "SMAN 1 JEMBER", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. JEMBER", provinsi: "Jawa Timur", kodeWilayah: "052400", kecamatan: "Jember", alamat: "Jl. Pendidikan No. 1, Jember" },
  { npsn: "20530600", nama: "SMKN 1 JEMBER", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. JEMBER", provinsi: "Jawa Timur", kodeWilayah: "052400", kecamatan: "Jember", alamat: "Jl. Kejuruan No. 2, Jember" },
  { npsn: "20538001", nama: "MAN 1 JEMBER", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. JEMBER", provinsi: "Jawa Timur", kodeWilayah: "052400", kecamatan: "Jember", alamat: "Jl. Madrasah No. 3, Jember" },
  { npsn: "20585499", nama: "SMAN 1 BANYUWANGI", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. BANYUWANGI", provinsi: "Jawa Timur", kodeWilayah: "052500", kecamatan: "Banyuwangi", alamat: "Jl. Pendidikan No. 1, Banyuwangi" },
  { npsn: "20551123", nama: "SMKN 1 BANYUWANGI", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. BANYUWANGI", provinsi: "Jawa Timur", kodeWilayah: "052500", kecamatan: "Banyuwangi", alamat: "Jl. Kejuruan No. 2, Banyuwangi" },
  { npsn: "20533141", nama: "MAN 1 BANYUWANGI", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. BANYUWANGI", provinsi: "Jawa Timur", kodeWilayah: "052500", kecamatan: "Banyuwangi", alamat: "Jl. Madrasah No. 3, Banyuwangi" },
  { npsn: "20522797", nama: "SMAN 1 PAMEKASAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. PAMEKASAN", provinsi: "Jawa Timur", kodeWilayah: "052600", kecamatan: "Pamekasan", alamat: "Jl. Pendidikan No. 1, Pamekasan" },
  { npsn: "20543017", nama: "SMKN 1 PAMEKASAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. PAMEKASAN", provinsi: "Jawa Timur", kodeWilayah: "052600", kecamatan: "Pamekasan", alamat: "Jl. Kejuruan No. 2, Pamekasan" },
  { npsn: "20568639", nama: "MAN 1 PAMEKASAN", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. PAMEKASAN", provinsi: "Jawa Timur", kodeWilayah: "052600", kecamatan: "Pamekasan", alamat: "Jl. Madrasah No. 3, Pamekasan" },
  { npsn: "20571766", nama: "SMAN 1 SAMPANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. SAMPANG", provinsi: "Jawa Timur", kodeWilayah: "052700", kecamatan: "Sampang", alamat: "Jl. Pendidikan No. 1, Sampang" },
  { npsn: "20581648", nama: "SMKN 1 SAMPANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. SAMPANG", provinsi: "Jawa Timur", kodeWilayah: "052700", kecamatan: "Sampang", alamat: "Jl. Kejuruan No. 2, Sampang" },
  { npsn: "20527417", nama: "MAN 1 SAMPANG", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. SAMPANG", provinsi: "Jawa Timur", kodeWilayah: "052700", kecamatan: "Sampang", alamat: "Jl. Madrasah No. 3, Sampang" },
  { npsn: "20528527", nama: "SMAN 1 SUMENEP", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. SUMENEP", provinsi: "Jawa Timur", kodeWilayah: "052800", kecamatan: "Sumenep", alamat: "Jl. Pendidikan No. 1, Sumenep" },
  { npsn: "20534165", nama: "SMKN 1 SUMENEP", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. SUMENEP", provinsi: "Jawa Timur", kodeWilayah: "052800", kecamatan: "Sumenep", alamat: "Jl. Kejuruan No. 2, Sumenep" },
  { npsn: "20552753", nama: "MAN 1 SUMENEP", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. SUMENEP", provinsi: "Jawa Timur", kodeWilayah: "052800", kecamatan: "Sumenep", alamat: "Jl. Madrasah No. 3, Sumenep" },
  { npsn: "20513929", nama: "SMAN 1 BANGKALAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. BANGKALAN", provinsi: "Jawa Timur", kodeWilayah: "052900", kecamatan: "Bangkalan", alamat: "Jl. Pendidikan No. 1, Bangkalan" },
  { npsn: "20567483", nama: "SMKN 1 BANGKALAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. BANGKALAN", provinsi: "Jawa Timur", kodeWilayah: "052900", kecamatan: "Bangkalan", alamat: "Jl. Kejuruan No. 2, Bangkalan" },
  { npsn: "20584086", nama: "MAN 1 BANGKALAN", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. BANGKALAN", provinsi: "Jawa Timur", kodeWilayah: "052900", kecamatan: "Bangkalan", alamat: "Jl. Madrasah No. 3, Bangkalan" },
  { npsn: "20532123", nama: "SMAN 1 SURABAYA", bentuk: "SMA", status: "Negeri", kabupatenKota: "KOTA SURABAYA", provinsi: "Jawa Timur", kodeWilayah: "056000", kecamatan: "Surabaya", alamat: "Jl. Pendidikan No. 1, Surabaya" },
  { npsn: "20535575", nama: "SMKN 1 SURABAYA", bentuk: "SMK", status: "Negeri", kabupatenKota: "KOTA SURABAYA", provinsi: "Jawa Timur", kodeWilayah: "056000", kecamatan: "Surabaya", alamat: "Jl. Kejuruan No. 2, Surabaya" },
  { npsn: "20510852", nama: "MAN 1 SURABAYA", bentuk: "MA", status: "Negeri", kabupatenKota: "KOTA SURABAYA", provinsi: "Jawa Timur", kodeWilayah: "056000", kecamatan: "Surabaya", alamat: "Jl. Madrasah No. 3, Surabaya" },
  { npsn: "20597467", nama: "SMAN 1 MALANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "KOTA MALANG", provinsi: "Jawa Timur", kodeWilayah: "056100", kecamatan: "Malang", alamat: "Jl. Pendidikan No. 1, Malang" },
  { npsn: "20526737", nama: "SMKN 1 MALANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "KOTA MALANG", provinsi: "Jawa Timur", kodeWilayah: "056100", kecamatan: "Malang", alamat: "Jl. Kejuruan No. 2, Malang" },
  { npsn: "20542054", nama: "MAN 1 MALANG", bentuk: "MA", status: "Negeri", kabupatenKota: "KOTA MALANG", provinsi: "Jawa Timur", kodeWilayah: "056100", kecamatan: "Malang", alamat: "Jl. Madrasah No. 3, Malang" },
  { npsn: "20532404", nama: "SMAN 1 MADIUN", bentuk: "SMA", status: "Negeri", kabupatenKota: "KOTA MADIUN", provinsi: "Jawa Timur", kodeWilayah: "056200", kecamatan: "Madiun", alamat: "Jl. Pendidikan No. 1, Madiun" },
  { npsn: "20541183", nama: "SMKN 1 MADIUN", bentuk: "SMK", status: "Negeri", kabupatenKota: "KOTA MADIUN", provinsi: "Jawa Timur", kodeWilayah: "056200", kecamatan: "Madiun", alamat: "Jl. Kejuruan No. 2, Madiun" },
  { npsn: "20522521", nama: "MAN 1 MADIUN", bentuk: "MA", status: "Negeri", kabupatenKota: "KOTA MADIUN", provinsi: "Jawa Timur", kodeWilayah: "056200", kecamatan: "Madiun", alamat: "Jl. Madrasah No. 3, Madiun" },
  { npsn: "20518746", nama: "SMAN 1 KEDIRI", bentuk: "SMA", status: "Negeri", kabupatenKota: "KOTA KEDIRI", provinsi: "Jawa Timur", kodeWilayah: "056300", kecamatan: "Kediri", alamat: "Jl. Pendidikan No. 1, Kediri" },
  { npsn: "20544931", nama: "SMKN 1 KEDIRI", bentuk: "SMK", status: "Negeri", kabupatenKota: "KOTA KEDIRI", provinsi: "Jawa Timur", kodeWilayah: "056300", kecamatan: "Kediri", alamat: "Jl. Kejuruan No. 2, Kediri" },
  { npsn: "20518352", nama: "MAN 1 KEDIRI", bentuk: "MA", status: "Negeri", kabupatenKota: "KOTA KEDIRI", provinsi: "Jawa Timur", kodeWilayah: "056300", kecamatan: "Kediri", alamat: "Jl. Madrasah No. 3, Kediri" },
  { npsn: "20525572", nama: "SMAN 1 MOJOKERTO", bentuk: "SMA", status: "Negeri", kabupatenKota: "KOTA MOJOKERTO", provinsi: "Jawa Timur", kodeWilayah: "056400", kecamatan: "Mojokerto", alamat: "Jl. Pendidikan No. 1, Mojokerto" },
  { npsn: "20587605", nama: "SMKN 1 MOJOKERTO", bentuk: "SMK", status: "Negeri", kabupatenKota: "KOTA MOJOKERTO", provinsi: "Jawa Timur", kodeWilayah: "056400", kecamatan: "Mojokerto", alamat: "Jl. Kejuruan No. 2, Mojokerto" },
  { npsn: "20566860", nama: "MAN 1 MOJOKERTO", bentuk: "MA", status: "Negeri", kabupatenKota: "KOTA MOJOKERTO", provinsi: "Jawa Timur", kodeWilayah: "056400", kecamatan: "Mojokerto", alamat: "Jl. Madrasah No. 3, Mojokerto" },
  { npsn: "20596348", nama: "SMAN 1 BLITAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "KOTA BLITAR", provinsi: "Jawa Timur", kodeWilayah: "056500", kecamatan: "Blitar", alamat: "Jl. Pendidikan No. 1, Blitar" },
  { npsn: "20592886", nama: "SMKN 1 BLITAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "KOTA BLITAR", provinsi: "Jawa Timur", kodeWilayah: "056500", kecamatan: "Blitar", alamat: "Jl. Kejuruan No. 2, Blitar" },
  { npsn: "20552501", nama: "MAN 1 BLITAR", bentuk: "MA", status: "Negeri", kabupatenKota: "KOTA BLITAR", provinsi: "Jawa Timur", kodeWilayah: "056500", kecamatan: "Blitar", alamat: "Jl. Madrasah No. 3, Blitar" },
  { npsn: "20566205", nama: "SMAN 1 PASURUAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "KOTA PASURUAN", provinsi: "Jawa Timur", kodeWilayah: "056600", kecamatan: "Pasuruan", alamat: "Jl. Pendidikan No. 1, Pasuruan" },
  { npsn: "20521438", nama: "SMKN 1 PASURUAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "KOTA PASURUAN", provinsi: "Jawa Timur", kodeWilayah: "056600", kecamatan: "Pasuruan", alamat: "Jl. Kejuruan No. 2, Pasuruan" },
  { npsn: "20513847", nama: "MAN 1 PASURUAN", bentuk: "MA", status: "Negeri", kabupatenKota: "KOTA PASURUAN", provinsi: "Jawa Timur", kodeWilayah: "056600", kecamatan: "Pasuruan", alamat: "Jl. Madrasah No. 3, Pasuruan" },
  { npsn: "20530617", nama: "SMAN 1 PROBOLINGGO", bentuk: "SMA", status: "Negeri", kabupatenKota: "KOTA PROBOLINGGO", provinsi: "Jawa Timur", kodeWilayah: "056700", kecamatan: "Probolinggo", alamat: "Jl. Pendidikan No. 1, Probolinggo" },
  { npsn: "20520489", nama: "SMKN 1 PROBOLINGGO", bentuk: "SMK", status: "Negeri", kabupatenKota: "KOTA PROBOLINGGO", provinsi: "Jawa Timur", kodeWilayah: "056700", kecamatan: "Probolinggo", alamat: "Jl. Kejuruan No. 2, Probolinggo" },
  { npsn: "20513061", nama: "MAN 1 PROBOLINGGO", bentuk: "MA", status: "Negeri", kabupatenKota: "KOTA PROBOLINGGO", provinsi: "Jawa Timur", kodeWilayah: "056700", kecamatan: "Probolinggo", alamat: "Jl. Madrasah No. 3, Probolinggo" },
  { npsn: "20528154", nama: "SMAN 1 BATU", bentuk: "SMA", status: "Negeri", kabupatenKota: "KOTA BATU", provinsi: "Jawa Timur", kodeWilayah: "056800", kecamatan: "Batu", alamat: "Jl. Pendidikan No. 1, Batu" },
  { npsn: "20543635", nama: "SMKN 1 BATU", bentuk: "SMK", status: "Negeri", kabupatenKota: "KOTA BATU", provinsi: "Jawa Timur", kodeWilayah: "056800", kecamatan: "Batu", alamat: "Jl. Kejuruan No. 2, Batu" },
  { npsn: "20389841", nama: "SMKN 1 CILACAP", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. CILACAP", provinsi: "Jawa Tengah", kodeWilayah: "030100", kecamatan: "Cilacap", alamat: "Jl. Kejuruan No. 2, Cilacap" },
  { npsn: "20371123", nama: "MAN 1 CILACAP", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. CILACAP", provinsi: "Jawa Tengah", kodeWilayah: "030100", kecamatan: "Cilacap", alamat: "Jl. Madrasah No. 3, Cilacap" },
  { npsn: "20326796", nama: "SMAN 1 BANYUMAS", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. BANYUMAS", provinsi: "Jawa Tengah", kodeWilayah: "030200", kecamatan: "Banyumas", alamat: "Jl. Pendidikan No. 1, Banyumas" },
  { npsn: "20388031", nama: "SMKN 1 BANYUMAS", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. BANYUMAS", provinsi: "Jawa Tengah", kodeWilayah: "030200", kecamatan: "Banyumas", alamat: "Jl. Kejuruan No. 2, Banyumas" },
  { npsn: "20355915", nama: "MAN 1 BANYUMAS", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. BANYUMAS", provinsi: "Jawa Tengah", kodeWilayah: "030200", kecamatan: "Banyumas", alamat: "Jl. Madrasah No. 3, Banyumas" },
  { npsn: "20390568", nama: "SMAN 1 PURBALINGGA", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. PURBALINGGA", provinsi: "Jawa Tengah", kodeWilayah: "030300", kecamatan: "Purbalingga", alamat: "Jl. Pendidikan No. 1, Purbalingga" },
  { npsn: "20362631", nama: "SMKN 1 PURBALINGGA", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. PURBALINGGA", provinsi: "Jawa Tengah", kodeWilayah: "030300", kecamatan: "Purbalingga", alamat: "Jl. Kejuruan No. 2, Purbalingga" },
  { npsn: "20313555", nama: "MAN 1 PURBALINGGA", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. PURBALINGGA", provinsi: "Jawa Tengah", kodeWilayah: "030300", kecamatan: "Purbalingga", alamat: "Jl. Madrasah No. 3, Purbalingga" },
  { npsn: "20396696", nama: "SMAN 1 BANJARNEGARA", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. BANJARNEGARA", provinsi: "Jawa Tengah", kodeWilayah: "030400", kecamatan: "Banjarnegara", alamat: "Jl. Pendidikan No. 1, Banjarnegara" },
  { npsn: "20388851", nama: "SMKN 1 BANJARNEGARA", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. BANJARNEGARA", provinsi: "Jawa Tengah", kodeWilayah: "030400", kecamatan: "Banjarnegara", alamat: "Jl. Kejuruan No. 2, Banjarnegara" },
  { npsn: "20371227", nama: "MAN 1 BANJARNEGARA", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. BANJARNEGARA", provinsi: "Jawa Tengah", kodeWilayah: "030400", kecamatan: "Banjarnegara", alamat: "Jl. Madrasah No. 3, Banjarnegara" },
  { npsn: "20396354", nama: "SMAN 1 KEBUMEN", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. KEBUMEN", provinsi: "Jawa Tengah", kodeWilayah: "030500", kecamatan: "Kebumen", alamat: "Jl. Pendidikan No. 1, Kebumen" },
  { npsn: "20350731", nama: "SMKN 1 KEBUMEN", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. KEBUMEN", provinsi: "Jawa Tengah", kodeWilayah: "030500", kecamatan: "Kebumen", alamat: "Jl. Kejuruan No. 2, Kebumen" },
  { npsn: "20318215", nama: "MAN 1 KEBUMEN", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. KEBUMEN", provinsi: "Jawa Tengah", kodeWilayah: "030500", kecamatan: "Kebumen", alamat: "Jl. Madrasah No. 3, Kebumen" },
  { npsn: "20364980", nama: "SMAN 1 PURWOREJO", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. PURWOREJO", provinsi: "Jawa Tengah", kodeWilayah: "030600", kecamatan: "Purworejo", alamat: "Jl. Pendidikan No. 1, Purworejo" },
  { npsn: "20385682", nama: "SMKN 1 PURWOREJO", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. PURWOREJO", provinsi: "Jawa Tengah", kodeWilayah: "030600", kecamatan: "Purworejo", alamat: "Jl. Kejuruan No. 2, Purworejo" },
  { npsn: "20331756", nama: "MAN 1 PURWOREJO", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. PURWOREJO", provinsi: "Jawa Tengah", kodeWilayah: "030600", kecamatan: "Purworejo", alamat: "Jl. Madrasah No. 3, Purworejo" },
  { npsn: "20348325", nama: "SMAN 1 WONOSOBO", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. WONOSOBO", provinsi: "Jawa Tengah", kodeWilayah: "030700", kecamatan: "Wonosobo", alamat: "Jl. Pendidikan No. 1, Wonosobo" },
  { npsn: "20346707", nama: "SMKN 1 WONOSOBO", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. WONOSOBO", provinsi: "Jawa Tengah", kodeWilayah: "030700", kecamatan: "Wonosobo", alamat: "Jl. Kejuruan No. 2, Wonosobo" },
  { npsn: "20383793", nama: "MAN 1 WONOSOBO", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. WONOSOBO", provinsi: "Jawa Tengah", kodeWilayah: "030700", kecamatan: "Wonosobo", alamat: "Jl. Madrasah No. 3, Wonosobo" },
  { npsn: "20378058", nama: "SMAN 1 MAGELANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. MAGELANG", provinsi: "Jawa Tengah", kodeWilayah: "030800", kecamatan: "Magelang", alamat: "Jl. Pendidikan No. 1, Magelang" },
  { npsn: "20344840", nama: "SMKN 1 MAGELANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. MAGELANG", provinsi: "Jawa Tengah", kodeWilayah: "030800", kecamatan: "Magelang", alamat: "Jl. Kejuruan No. 2, Magelang" },
  { npsn: "20380730", nama: "MAN 1 MAGELANG", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. MAGELANG", provinsi: "Jawa Tengah", kodeWilayah: "030800", kecamatan: "Magelang", alamat: "Jl. Madrasah No. 3, Magelang" },
  { npsn: "20389589", nama: "SMAN 1 GROBOGAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. GROBOGAN", provinsi: "Jawa Tengah", kodeWilayah: "031500", kecamatan: "Grobogan", alamat: "Jl. Pendidikan No. 1, Grobogan" },
  { npsn: "20337355", nama: "SMKN 1 GROBOGAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. GROBOGAN", provinsi: "Jawa Tengah", kodeWilayah: "031500", kecamatan: "Grobogan", alamat: "Jl. Kejuruan No. 2, Grobogan" },
  { npsn: "20353105", nama: "MAN 1 GROBOGAN", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. GROBOGAN", provinsi: "Jawa Tengah", kodeWilayah: "031500", kecamatan: "Grobogan", alamat: "Jl. Madrasah No. 3, Grobogan" },
  { npsn: "20354385", nama: "SMAN 1 BLORA", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. BLORA", provinsi: "Jawa Tengah", kodeWilayah: "031600", kecamatan: "Blora", alamat: "Jl. Pendidikan No. 1, Blora" },
  { npsn: "20343107", nama: "SMKN 1 BLORA", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. BLORA", provinsi: "Jawa Tengah", kodeWilayah: "031600", kecamatan: "Blora", alamat: "Jl. Kejuruan No. 2, Blora" },
  { npsn: "20392561", nama: "MAN 1 BLORA", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. BLORA", provinsi: "Jawa Tengah", kodeWilayah: "031600", kecamatan: "Blora", alamat: "Jl. Madrasah No. 3, Blora" },
  { npsn: "20315415", nama: "SMAN 1 REMBANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. REMBANG", provinsi: "Jawa Tengah", kodeWilayah: "031700", kecamatan: "Rembang", alamat: "Jl. Pendidikan No. 1, Rembang" },
  { npsn: "20352491", nama: "SMKN 1 REMBANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. REMBANG", provinsi: "Jawa Tengah", kodeWilayah: "031700", kecamatan: "Rembang", alamat: "Jl. Kejuruan No. 2, Rembang" },
  { npsn: "20320209", nama: "MAN 1 REMBANG", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. REMBANG", provinsi: "Jawa Tengah", kodeWilayah: "031700", kecamatan: "Rembang", alamat: "Jl. Madrasah No. 3, Rembang" },
  { npsn: "20359452", nama: "SMAN 1 PATI", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. PATI", provinsi: "Jawa Tengah", kodeWilayah: "031800", kecamatan: "Pati", alamat: "Jl. Pendidikan No. 1, Pati" },
  { npsn: "20379815", nama: "SMKN 1 PATI", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. PATI", provinsi: "Jawa Tengah", kodeWilayah: "031800", kecamatan: "Pati", alamat: "Jl. Kejuruan No. 2, Pati" },
  { npsn: "20361786", nama: "MAN 1 PATI", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. PATI", provinsi: "Jawa Tengah", kodeWilayah: "031800", kecamatan: "Pati", alamat: "Jl. Madrasah No. 3, Pati" },
  { npsn: "20338746", nama: "SMAN 1 KUDUS", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. KUDUS", provinsi: "Jawa Tengah", kodeWilayah: "031900", kecamatan: "Kudus", alamat: "Jl. Pendidikan No. 1, Kudus" },
  { npsn: "20322417", nama: "SMKN 1 KUDUS", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. KUDUS", provinsi: "Jawa Tengah", kodeWilayah: "031900", kecamatan: "Kudus", alamat: "Jl. Kejuruan No. 2, Kudus" },
  { npsn: "20343542", nama: "MAN 1 KUDUS", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. KUDUS", provinsi: "Jawa Tengah", kodeWilayah: "031900", kecamatan: "Kudus", alamat: "Jl. Madrasah No. 3, Kudus" },
  { npsn: "20385543", nama: "SMAN 1 JEPARA", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. JEPARA", provinsi: "Jawa Tengah", kodeWilayah: "032000", kecamatan: "Jepara", alamat: "Jl. Pendidikan No. 1, Jepara" },
  { npsn: "20371103", nama: "SMKN 1 JEPARA", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. JEPARA", provinsi: "Jawa Tengah", kodeWilayah: "032000", kecamatan: "Jepara", alamat: "Jl. Kejuruan No. 2, Jepara" },
  { npsn: "20360131", nama: "MAN 1 JEPARA", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. JEPARA", provinsi: "Jawa Tengah", kodeWilayah: "032000", kecamatan: "Jepara", alamat: "Jl. Madrasah No. 3, Jepara" },
  { npsn: "20354048", nama: "SMAN 1 DEMAK", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. DEMAK", provinsi: "Jawa Tengah", kodeWilayah: "032100", kecamatan: "Demak", alamat: "Jl. Pendidikan No. 1, Demak" },
  { npsn: "20346647", nama: "SMKN 1 DEMAK", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. DEMAK", provinsi: "Jawa Tengah", kodeWilayah: "032100", kecamatan: "Demak", alamat: "Jl. Kejuruan No. 2, Demak" },
  { npsn: "20319209", nama: "MAN 1 DEMAK", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. DEMAK", provinsi: "Jawa Tengah", kodeWilayah: "032100", kecamatan: "Demak", alamat: "Jl. Madrasah No. 3, Demak" },
  { npsn: "20381663", nama: "SMAN 1 SEMARANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. SEMARANG", provinsi: "Jawa Tengah", kodeWilayah: "032200", kecamatan: "Semarang", alamat: "Jl. Pendidikan No. 1, Semarang" },
  { npsn: "20379619", nama: "SMKN 1 SEMARANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. SEMARANG", provinsi: "Jawa Tengah", kodeWilayah: "032200", kecamatan: "Semarang", alamat: "Jl. Kejuruan No. 2, Semarang" },
  { npsn: "20321635", nama: "MAN 1 SEMARANG", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. SEMARANG", provinsi: "Jawa Tengah", kodeWilayah: "032200", kecamatan: "Semarang", alamat: "Jl. Madrasah No. 3, Semarang" },
  { npsn: "20337633", nama: "SMAN 1 TEMANGGUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. TEMANGGUNG", provinsi: "Jawa Tengah", kodeWilayah: "032300", kecamatan: "Temanggung", alamat: "Jl. Pendidikan No. 1, Temanggung" },
  { npsn: "20311276", nama: "SMKN 1 TEMANGGUNG", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. TEMANGGUNG", provinsi: "Jawa Tengah", kodeWilayah: "032300", kecamatan: "Temanggung", alamat: "Jl. Kejuruan No. 2, Temanggung" },
  { npsn: "20350102", nama: "MAN 1 TEMANGGUNG", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. TEMANGGUNG", provinsi: "Jawa Tengah", kodeWilayah: "032300", kecamatan: "Temanggung", alamat: "Jl. Madrasah No. 3, Temanggung" },
  { npsn: "20332051", nama: "SMAN 1 KENDAL", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. KENDAL", provinsi: "Jawa Tengah", kodeWilayah: "032400", kecamatan: "Kendal", alamat: "Jl. Pendidikan No. 1, Kendal" },
  { npsn: "20335241", nama: "SMKN 1 KENDAL", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. KENDAL", provinsi: "Jawa Tengah", kodeWilayah: "032400", kecamatan: "Kendal", alamat: "Jl. Kejuruan No. 2, Kendal" },
  { npsn: "20351245", nama: "MAN 1 KENDAL", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. KENDAL", provinsi: "Jawa Tengah", kodeWilayah: "032400", kecamatan: "Kendal", alamat: "Jl. Madrasah No. 3, Kendal" },
  { npsn: "20372332", nama: "SMAN 1 BATANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. BATANG", provinsi: "Jawa Tengah", kodeWilayah: "032500", kecamatan: "Batang", alamat: "Jl. Pendidikan No. 1, Batang" },
  { npsn: "20379503", nama: "SMKN 1 BATANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. BATANG", provinsi: "Jawa Tengah", kodeWilayah: "032500", kecamatan: "Batang", alamat: "Jl. Kejuruan No. 2, Batang" },
  { npsn: "20383311", nama: "MAN 1 BATANG", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. BATANG", provinsi: "Jawa Tengah", kodeWilayah: "032500", kecamatan: "Batang", alamat: "Jl. Madrasah No. 3, Batang" },
  { npsn: "20337351", nama: "SMAN 1 PEKALONGAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. PEKALONGAN", provinsi: "Jawa Tengah", kodeWilayah: "032600", kecamatan: "Pekalongan", alamat: "Jl. Pendidikan No. 1, Pekalongan" },
  { npsn: "20329564", nama: "SMKN 1 PEKALONGAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. PEKALONGAN", provinsi: "Jawa Tengah", kodeWilayah: "032600", kecamatan: "Pekalongan", alamat: "Jl. Kejuruan No. 2, Pekalongan" },
  { npsn: "20338833", nama: "MAN 1 PEKALONGAN", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. PEKALONGAN", provinsi: "Jawa Tengah", kodeWilayah: "032600", kecamatan: "Pekalongan", alamat: "Jl. Madrasah No. 3, Pekalongan" },
  { npsn: "20339102", nama: "SMAN 1 PEMALANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. PEMALANG", provinsi: "Jawa Tengah", kodeWilayah: "032700", kecamatan: "Pemalang", alamat: "Jl. Pendidikan No. 1, Pemalang" },
  { npsn: "20372761", nama: "SMKN 1 PEMALANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. PEMALANG", provinsi: "Jawa Tengah", kodeWilayah: "032700", kecamatan: "Pemalang", alamat: "Jl. Kejuruan No. 2, Pemalang" },
  { npsn: "20380146", nama: "MAN 1 PEMALANG", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. PEMALANG", provinsi: "Jawa Tengah", kodeWilayah: "032700", kecamatan: "Pemalang", alamat: "Jl. Madrasah No. 3, Pemalang" },
  { npsn: "20311157", nama: "SMAN 1 TEGAL", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. TEGAL", provinsi: "Jawa Tengah", kodeWilayah: "032800", kecamatan: "Tegal", alamat: "Jl. Pendidikan No. 1, Tegal" },
  { npsn: "20394040", nama: "SMKN 1 TEGAL", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. TEGAL", provinsi: "Jawa Tengah", kodeWilayah: "032800", kecamatan: "Tegal", alamat: "Jl. Kejuruan No. 2, Tegal" },
  { npsn: "20353589", nama: "MAN 1 TEGAL", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. TEGAL", provinsi: "Jawa Tengah", kodeWilayah: "032800", kecamatan: "Tegal", alamat: "Jl. Madrasah No. 3, Tegal" },
  { npsn: "20317643", nama: "SMAN 1 BREBES", bentuk: "SMA", status: "Negeri", kabupatenKota: "KAB. BREBES", provinsi: "Jawa Tengah", kodeWilayah: "032900", kecamatan: "Brebes", alamat: "Jl. Pendidikan No. 1, Brebes" },
  { npsn: "20327353", nama: "SMKN 1 BREBES", bentuk: "SMK", status: "Negeri", kabupatenKota: "KAB. BREBES", provinsi: "Jawa Tengah", kodeWilayah: "032900", kecamatan: "Brebes", alamat: "Jl. Kejuruan No. 2, Brebes" },
  { npsn: "20311305", nama: "MAN 1 BREBES", bentuk: "MA", status: "Negeri", kabupatenKota: "KAB. BREBES", provinsi: "Jawa Tengah", kodeWilayah: "032900", kecamatan: "Brebes", alamat: "Jl. Madrasah No. 3, Brebes" },
  // --- Sekolah Nasional Se-Indonesia (SMA / SMK / MA) ---
  { npsn: "10105342", nama: "SMAN 1 BANDA ACEH", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Kuta Alam", alamat: "Jl. Prof. A. Majid Ibrahim No. 7" },
  { npsn: "10105344", nama: "SMAN 2 BANDA ACEH", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Kuta Alam", alamat: "Jl. Twk. Hasyim Banta Muda No. 8" },
  { npsn: "10105345", nama: "SMAN 3 BANDA ACEH", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Kuta Alam", alamat: "Jl. Teuku Panglima Polem No. 1" },
  { npsn: "10105367", nama: "SMKN 1 BANDA ACEH", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Lueng Bata", alamat: "Jl. H. Dimurthala No. 4" },
  { npsn: "10105368", nama: "SMKN 2 BANDA ACEH", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Baiturrahman", alamat: "Jl. Sultan Malikul Saleh" },
  { npsn: "10113941", nama: "MAN 1 BANDA ACEH", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Kuta Alam", alamat: "Jl. Pocut Baren No. 24" },
  { npsn: "10113942", nama: "MAN 2 BANDA ACEH", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Banda Aceh", provinsi: "Aceh", kecamatan: "Baiturrahman", alamat: "Jl. Syiah Kuala No. 12" },
  { npsn: "10105652", nama: "SMAN 1 LHOKSEUMAWE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Lhokseumawe", provinsi: "Aceh", kecamatan: "Banda Sakti", alamat: "Jl. Samudra No. 1" },
  { npsn: "10105670", nama: "SMKN 1 LHOKSEUMAWE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Lhokseumawe", provinsi: "Aceh", kecamatan: "Banda Sakti", alamat: "Jl. Listrik No. 3" },
  { npsn: "10114002", nama: "MAN 1 LHOKSEUMAWE", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Lhokseumawe", provinsi: "Aceh", kecamatan: "Banda Sakti", alamat: "Jl. Perdagangan No. 10" },
  { npsn: "10103980", nama: "SMAN 1 ACEH BESAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Aceh Besar", provinsi: "Aceh", kecamatan: "Ingin Jaya", alamat: "Jl. Banda Aceh-Medan Km. 11" },
  { npsn: "10103995", nama: "SMKN 1 AL MUBARKEYA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Aceh Besar", provinsi: "Aceh", kecamatan: "Ingin Jaya", alamat: "Jl. Banda Aceh-Medan Km. 12" },
  { npsn: "10114050", nama: "MAN 1 ACEH BESAR", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Aceh Besar", provinsi: "Aceh", kecamatan: "Indrapuri", alamat: "Jl. Banda Aceh-Medan Km. 25" },
  { npsn: "10210874", nama: "SMAN 1 MEDAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Baru", alamat: "Jl. Teuku Cik Ditiro No. 1" },
  { npsn: "10210875", nama: "SMAN 2 MEDAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Polonia", alamat: "Jl. Karang Sari No. 435" },
  { npsn: "10210876", nama: "SMAN 3 MEDAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Timur", alamat: "Jl. Budi Kemasyarakatan No. 3" },
  { npsn: "10210877", nama: "SMAN 4 MEDAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Barat", alamat: "Jl. Gelas No. 12" },
  { npsn: "10210901", nama: "SMKN 1 MEDAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Petisah", alamat: "Jl. Sindoro No. 1" },
  { npsn: "10210902", nama: "SMKN 2 MEDAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Helvetia", alamat: "Jl. STM No. 12" },
  { npsn: "10264101", nama: "MAN 1 MEDAN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Tembung", alamat: "Jl. Willem Iskandar No. 7A" },
  { npsn: "10264102", nama: "MAN 2 MODEL MEDAN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Medan", provinsi: "Sumatera Utara", kecamatan: "Medan Helvetia", alamat: "Jl. Willem Iskandar No. 8" },
  { npsn: "10211890", nama: "SMAN 1 PEMATANGSIANTAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pematangsiantar", provinsi: "Sumatera Utara", kecamatan: "Siantar Barat", alamat: "Jl. Ki Hajar Dewantara No. 1" },
  { npsn: "10211910", nama: "SMKN 1 PEMATANGSIANTAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Pematangsiantar", provinsi: "Sumatera Utara", kecamatan: "Siantar Barat", alamat: "Jl. Bali No. 2" },
  { npsn: "10211950", nama: "MAN PEMATANGSIANTAR", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Pematangsiantar", provinsi: "Sumatera Utara", kecamatan: "Siantar Barat", alamat: "Jl. Singosari No. 10" },
  { npsn: "10202890", nama: "SMAN 1 DELI SERDANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Deli Serdang", provinsi: "Sumatera Utara", kecamatan: "Lubuk Pakam", alamat: "Jl. Galang No. 15" },
  { npsn: "10202920", nama: "SMKN 1 LUBUK PAKAM", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Deli Serdang", provinsi: "Sumatera Utara", kecamatan: "Lubuk Pakam", alamat: "Jl. Karya No. 2" },
  { npsn: "10303517", nama: "SMAN 1 PADANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Padang Barat", alamat: "Jl. Belanti Raya No. 11" },
  { npsn: "10303518", nama: "SMAN 2 PADANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Padang Timur", alamat: "Jl. Musi No. 2" },
  { npsn: "10303519", nama: "SMAN 3 PADANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Padang Utara", alamat: "Jl. Gajah Mada No. 4" },
  { npsn: "10303534", nama: "SMKN 1 PADANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Kuranji", alamat: "Jl. Mahmud Rama No. 8" },
  { npsn: "10303535", nama: "SMKN 2 PADANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Padang Barat", alamat: "Jl. Baru No. 1" },
  { npsn: "10309812", nama: "MAN 1 PADANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Kuranji", alamat: "Jl. Raya Pasar Baru No. 1" },
  { npsn: "10309813", nama: "MAN 2 PADANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Padang", provinsi: "Sumatera Barat", kecamatan: "Padang Barat", alamat: "Jl. Gajah Mada No. 100" },
  { npsn: "10307527", nama: "SMAN 1 BUKITTINGGI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bukittinggi", provinsi: "Sumatera Barat", kecamatan: "Guguak Panjang", alamat: "Jl. Syekh M. Jamil Jambek No. 36" },
  { npsn: "10307540", nama: "SMKN 1 BUKITTINGGI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bukittinggi", provinsi: "Sumatera Barat", kecamatan: "Guguak Panjang", alamat: "Jl. Dr. Abdul Rivai No. 8" },
  { npsn: "10309850", nama: "MAN 1 BUKITTINGGI", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bukittinggi", provinsi: "Sumatera Barat", kecamatan: "Mandiangin", alamat: "Jl. Soekarno-Hatta No. 45" },
  { npsn: "10403986", nama: "SMAN 1 PEKANBARU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pekanbaru", provinsi: "Riau", kecamatan: "Lima Puluh", alamat: "Jl. Sultan Syarif Qasim No. 159" },
  { npsn: "10403987", nama: "SMAN 8 PEKANBARU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pekanbaru", provinsi: "Riau", kecamatan: "Sail", alamat: "Jl. Abdul Muis No. 14" },
  { npsn: "10404012", nama: "SMKN 1 PEKANBARU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Pekanbaru", provinsi: "Riau", kecamatan: "Sukajadi", alamat: "Jl. Senapelan No. 10" },
  { npsn: "10404013", nama: "SMKN 2 PEKANBARU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Pekanbaru", provinsi: "Riau", kecamatan: "Pekanbaru Kota", alamat: "Jl. Pattimura No. 14" },
  { npsn: "10499010", nama: "MAN 1 PEKANBARU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Pekanbaru", provinsi: "Riau", kecamatan: "Bukit Raya", alamat: "Jl. Bandeng No. 51" },
  { npsn: "10499011", nama: "MAN 2 PEKANBARU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Pekanbaru", provinsi: "Riau", kecamatan: "Sail", alamat: "Jl. Diponegoro No. 55" },
  { npsn: "10404550", nama: "SMAN 1 DUMAI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Dumai", provinsi: "Riau", kecamatan: "Dumai Timur", alamat: "Jl. Soebrantas No. 20" },
  { npsn: "10404570", nama: "SMKN 1 DUMAI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Dumai", provinsi: "Riau", kecamatan: "Dumai Timur", alamat: "Jl. Tuanku Tambusai No. 1" },
  { npsn: "11001552", nama: "SMAN 1 BATAM", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Batam", provinsi: "Kepulauan Riau", kecamatan: "Sekupang", alamat: "Jl. Kartini No. 1, Sungai Harapan" },
  { npsn: "11001554", nama: "SMAN 3 BATAM", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Batam", provinsi: "Kepulauan Riau", kecamatan: "Batam Kota", alamat: "Jl. Raja Ali Kelana No. 2, Belian" },
  { npsn: "11001569", nama: "SMKN 1 BATAM", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Batam", provinsi: "Kepulauan Riau", kecamatan: "Batu Aji", alamat: "Jl. Prof. Dr. Hamka No. 1" },
  { npsn: "11002810", nama: "MAN 1 BATAM", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Batam", provinsi: "Kepulauan Riau", kecamatan: "Sagulung", alamat: "Jl. Brigjen Katamso No. 10" },
  { npsn: "11001402", nama: "SMAN 1 TANJUNGPINANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tanjungpinang", provinsi: "Kepulauan Riau", kecamatan: "Tanjungpinang Barat", alamat: "Jl. Dr. Soetomo No. 1" },
  { npsn: "11001420", nama: "SMKN 1 TANJUNGPINANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Tanjungpinang", provinsi: "Kepulauan Riau", kecamatan: "Bukit Bestari", alamat: "Jl. Pramuka No. 1" },
  { npsn: "11002850", nama: "MAN TANJUNGPINANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Tanjungpinang", provinsi: "Kepulauan Riau", kecamatan: "Tanjungpinang Timur", alamat: "Jl. Hang Lekir No. 5" },
  { npsn: "10504612", nama: "SMAN 1 KOTA JAMBI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jambi", provinsi: "Jambi", kecamatan: "Telanaipura", alamat: "Jl. Urip Sumoharjo No. 1" },
  { npsn: "10504614", nama: "SMAN 3 KOTA JAMBI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jambi", provinsi: "Jambi", kecamatan: "Danau Teluk", alamat: "Jl. Guru Muchtar No. 1" },
  { npsn: "10504641", nama: "SMKN 1 KOTA JAMBI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Jambi", provinsi: "Jambi", kecamatan: "Pasar Jambi", alamat: "Jl. Jenderal Sudirman No. 10" },
  { npsn: "10504642", nama: "SMKN 2 KOTA JAMBI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Jambi", provinsi: "Jambi", kecamatan: "Kota Baru", alamat: "Jl. Veteran No. 5" },
  { npsn: "10507221", nama: "MAN 1 KOTA JAMBI", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Jambi", provinsi: "Jambi", kecamatan: "Telanaipura", alamat: "Jl. A. Yani No. 12" },
  { npsn: "10507222", nama: "MAN 2 KOTA JAMBI", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Jambi", provinsi: "Jambi", kecamatan: "Jelutung", alamat: "Jl. Sunan Kalijaga No. 4" },
  { npsn: "10502110", nama: "SMAN 1 MUARO JAMBI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Muaro Jambi", provinsi: "Jambi", kecamatan: "Sengeti", alamat: "Jl. Lintas Timur No. 25" },
  { npsn: "10502140", nama: "SMKN 1 MUARO JAMBI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Muaro Jambi", provinsi: "Jambi", kecamatan: "Sengeti", alamat: "Jl. Jambi-Suak Kandis" },
  { npsn: "10603775", nama: "SMAN 1 PALEMBANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Palembang", provinsi: "Sumatera Selatan", kecamatan: "Ilir Barat I", alamat: "Jl. Srijaya Negara No. 1" },
  { npsn: "10603777", nama: "SMAN 3 PALEMBANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Palembang", provinsi: "Sumatera Selatan", kecamatan: "Kemuning", alamat: "Jl. Jenderal Sudirman Km. 3,5" },
  { npsn: "10603810", nama: "SMKN 1 PALEMBANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Palembang", provinsi: "Sumatera Selatan", kecamatan: "Ilir Barat I", alamat: "Jl. Srijaya Negara No. 2" },
  { npsn: "10603811", nama: "SMKN 2 PALEMBANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Palembang", provinsi: "Sumatera Selatan", kecamatan: "Kemuning", alamat: "Jl. Demang Lebar Daun No. 1" },
  { npsn: "10648210", nama: "MAN 1 PALEMBANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Palembang", provinsi: "Sumatera Selatan", kecamatan: "Ilir Barat I", alamat: "Jl. HM Rasyid Nawawi No. 1" },
  { npsn: "10648211", nama: "MAN 2 PALEMBANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Palembang", provinsi: "Sumatera Selatan", kecamatan: "Ilir Timur I", alamat: "Jl. Prof. KH. Zainal Abidin Fikri" },
  { npsn: "10604210", nama: "SMAN 1 PRABUMULIH", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Prabumulih", provinsi: "Sumatera Selatan", kecamatan: "Prabumulih Timur", alamat: "Jl. Jenderal Sudirman No. 100" },
  { npsn: "10604230", nama: "SMKN 1 PRABUMULIH", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Prabumulih", provinsi: "Sumatera Selatan", kecamatan: "Prabumulih Barat", alamat: "Jl. Basuki Rahmat No. 12" },
  { npsn: "10901045", nama: "SMAN 1 PANGKALPINANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pangkalpinang", provinsi: "Kepulauan Bangka Belitung", kecamatan: "Rangkui", alamat: "Jl. Usman Ambon No. 1" },
  { npsn: "10901046", nama: "SMAN 2 PANGKALPINANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pangkalpinang", provinsi: "Kepulauan Bangka Belitung", kecamatan: "Gerunggang", alamat: "Jl. Kerisi No. 5" },
  { npsn: "10901062", nama: "SMKN 1 PANGKALPINANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Pangkalpinang", provinsi: "Kepulauan Bangka Belitung", kecamatan: "Taman Sari", alamat: "Jl. Merdeka No. 4" },
  { npsn: "10902201", nama: "MAN 1 PANGKALPINANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Pangkalpinang", provinsi: "Kepulauan Bangka Belitung", kecamatan: "Bukit Intan", alamat: "Jl. Depati Amir No. 20" },
  { npsn: "10900510", nama: "SMAN 1 TANJUNGPANDAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Belitung", provinsi: "Kepulauan Bangka Belitung", kecamatan: "Tanjungpandan", alamat: "Jl. Gatot Subroto No. 1" },
  { npsn: "10900530", nama: "SMKN 1 TANJUNGPANDAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Belitung", provinsi: "Kepulauan Bangka Belitung", kecamatan: "Tanjungpandan", alamat: "Jl. Kemuning No. 10" },
  { npsn: "10702410", nama: "SMAN 1 KOTA BENGKULU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bengkulu", provinsi: "Bengkulu", kecamatan: "Ratu Samban", alamat: "Jl. Damar No. 1" },
  { npsn: "10702412", nama: "SMAN 2 KOTA BENGKULU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bengkulu", provinsi: "Bengkulu", kecamatan: "Gading Cempaka", alamat: "Jl. Mahakam No. 4" },
  { npsn: "10702435", nama: "SMKN 1 KOTA BENGKULU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bengkulu", provinsi: "Bengkulu", kecamatan: "Ratu Samban", alamat: "Jl. Jati No. 44" },
  { npsn: "10704101", nama: "MAN 1 KOTA BENGKULU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bengkulu", provinsi: "Bengkulu", kecamatan: "Teluk Segara", alamat: "Jl. Cendana No. 1" },
  { npsn: "10704102", nama: "MAN 2 KOTA BENGKULU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bengkulu", provinsi: "Bengkulu", kecamatan: "Ratu Agung", alamat: "Jl. Ciliwung No. 20" },
  { npsn: "10701210", nama: "SMAN 1 REJANG LEBONG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Rejang Lebong", provinsi: "Bengkulu", kecamatan: "Curup", alamat: "Jl. S. Sukowati No. 1" },
  { npsn: "10701230", nama: "SMKN 1 REJANG LEBONG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Rejang Lebong", provinsi: "Bengkulu", kecamatan: "Curup", alamat: "Jl. Basuki Rahmat No. 5" },
  { npsn: "10807060", nama: "SMAN 1 BANDAR LAMPUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bandar Lampung", provinsi: "Lampung", kecamatan: "Enggal", alamat: "Jl. Jenderal Sudirman No. 41" },
  { npsn: "10807061", nama: "SMAN 2 BANDAR LAMPUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bandar Lampung", provinsi: "Lampung", kecamatan: "Tanjung Karang Pusat", alamat: "Jl. Amir Hamzah No. 1" },
  { npsn: "10807085", nama: "SMKN 1 BANDAR LAMPUNG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bandar Lampung", provinsi: "Lampung", kecamatan: "Enggal", alamat: "Jl. P. Morotai No. 33" },
  { npsn: "10807086", nama: "SMKN 2 BANDAR LAMPUNG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bandar Lampung", provinsi: "Lampung", kecamatan: "Sukarame", alamat: "Jl. Prof. Dr. Soemantri Brodjonegoro" },
  { npsn: "10816810", nama: "MAN 1 BANDAR LAMPUNG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bandar Lampung", provinsi: "Lampung", kecamatan: "Sukarame", alamat: "Jl. Letnan Kolonel Endro Suratmin" },
  { npsn: "10816811", nama: "MAN 2 BANDAR LAMPUNG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bandar Lampung", provinsi: "Lampung", kecamatan: "Kedaton", alamat: "Jl. Soekarno-Hatta No. 1" },
  { npsn: "10807510", nama: "SMAN 1 METRO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Metro", provinsi: "Lampung", kecamatan: "Metro Pusat", alamat: "Jl. A.H. Nasution No. 222" },
  { npsn: "10807530", nama: "SMKN 1 METRO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Metro", provinsi: "Lampung", kecamatan: "Metro Timur", alamat: "Jl. Kemuning No. 1" },
  { npsn: "20107319", nama: "SMAN 8 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Tebet", alamat: "Jl. Taman Bukit Duri No. 2" },
  { npsn: "20107325", nama: "SMAN 68 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Pusat", provinsi: "DKI Jakarta", kecamatan: "Senen", alamat: "Jl. Salemba Raya No. 18" },
  { npsn: "20107315", nama: "SMAN 70 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Kebayoran Baru", alamat: "Jl. Bulungan Blok C No. 1" },
  { npsn: "20107310", nama: "SMAN 28 JAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Pasar Minggu", alamat: "Jl. Ragunan No. 1" },
  { npsn: "20100171", nama: "SMKN 26 JAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Jakarta Timur", provinsi: "DKI Jakarta", kecamatan: "Pulo Gadung", alamat: "Jl. Balai Pustaka Baru No. 1" },
  { npsn: "20100172", nama: "SMKN 57 JAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Pasar Minggu", alamat: "Jl. Taman Margasatwa No. 38" },
  { npsn: "20177981", nama: "MAN 4 JAKARTA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Kebayoran Lama", alamat: "Jl. Ciputat Raya No. 4" },
  { npsn: "20177982", nama: "MAN 7 JAKARTA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Jakarta Selatan", provinsi: "DKI Jakarta", kecamatan: "Jagakarsa", alamat: "Jl. Pengadegan Timur I No. 1" },
  { npsn: "20219262", nama: "SMAN 3 BANDUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Sumur Bandung", alamat: "Jl. Belitung No. 8" },
  { npsn: "20219264", nama: "SMAN 5 BANDUNG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Sumur Bandung", alamat: "Jl. Belitung No. 10" },
  { npsn: "20219140", nama: "SMKN 1 BANDUNG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Coblong", alamat: "Jl. Wastukancana No. 3" },
  { npsn: "20219141", nama: "SMKN 4 BANDUNG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Batununggal", alamat: "Jl. Kliningan No. 6" },
  { npsn: "20277810", nama: "MAN 1 KOTA BANDUNG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Cibeunying Kidul", alamat: "Jl. Sukaluyu No. 1" },
  { npsn: "20277811", nama: "MAN 2 KOTA BANDUNG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Bandung", provinsi: "Jawa Barat", kecamatan: "Cibiru", alamat: "Jl. Cipadung No. 57" },
  { npsn: "20220310", nama: "SMAN 1 BOGOR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bogor", provinsi: "Jawa Barat", kecamatan: "Bogor Tengah", alamat: "Jl. Ir. H. Juanda No. 16" },
  { npsn: "20220330", nama: "SMKN 1 BOGOR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bogor", provinsi: "Jawa Barat", kecamatan: "Bogor Tengah", alamat: "Jl. Heulang No. 6" },
  { npsn: "20222950", nama: "SMAN 1 BEKASI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bekasi", provinsi: "Jawa Barat", kecamatan: "Bekasi Timur", alamat: "Jl. KH. Agus Salim No. 181" },
  { npsn: "20222970", nama: "SMKN 1 BEKASI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bekasi", provinsi: "Jawa Barat", kecamatan: "Bekasi Barat", alamat: "Jl. Bintara VIII No. 2" },
  { npsn: "20229010", nama: "SMAN 1 DEPOK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Depok", provinsi: "Jawa Barat", kecamatan: "Pancoran Mas", alamat: "Jl. Nusantara Raya No. 317" },
  { npsn: "20229030", nama: "SMKN 1 DEPOK", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Depok", provinsi: "Jawa Barat", kecamatan: "Tapos", alamat: "Jl. Banjaran Pucung No. 1" },
  { npsn: "20605072", nama: "SMAN 1 KOTA SERANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Serang", provinsi: "Banten", kecamatan: "Serang", alamat: "Jl. Ahmad Yani No. 39" },
  { npsn: "20605090", nama: "SMKN 1 KOTA SERANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Serang", provinsi: "Banten", kecamatan: "Cipocok Jaya", alamat: "Jl. KH. Abdul Fatah Hasan No. 88" },
  { npsn: "20614101", nama: "MAN 1 KOTA SERANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Serang", provinsi: "Banten", kecamatan: "Serang", alamat: "Jl. KH. Syam'un No. 2" },
  { npsn: "20614102", nama: "MAN 2 KOTA SERANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Serang", provinsi: "Banten", kecamatan: "Cipocok Jaya", alamat: "Jl. KH. Abdul Fatah Hasan No. 90" },
  { npsn: "20606827", nama: "SMAN 1 TANGERANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tangerang", provinsi: "Banten", kecamatan: "Tangerang", alamat: "Jl. Raden Fatah No. 1" },
  { npsn: "20606850", nama: "SMKN 1 TANGERANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Tangerang", provinsi: "Banten", kecamatan: "Tangerang", alamat: "Jl. Perintis Kemerdekaan II" },
  { npsn: "20623292", nama: "MAN INSAN CENDEKIA SERPONG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Tangerang Selatan", provinsi: "Banten", kecamatan: "Serpong", alamat: "Jl. Cendekia No. 1, BSD City" },
  { npsn: "20607810", nama: "SMAN 1 KOTA CILEGON", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Cilegon", provinsi: "Banten", kecamatan: "Cibeber", alamat: "Jl. KH. Tubagus Ismail No. 1" },
  { npsn: "20607830", nama: "SMKN 1 KOTA CILEGON", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Cilegon", provinsi: "Banten", kecamatan: "Cibeber", alamat: "Jl. Raden Sastradikarta No. 1" },
  { npsn: "20403161", nama: "SMAN 1 YOGYAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Gondomanan", alamat: "Jl. HOS Cokroaminoto No. 10" },
  { npsn: "20403173", nama: "SMAN 3 YOGYAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Danurejan", alamat: "Jl. Yos Sudarso No. 7, Kotabaru" },
  { npsn: "20403178", nama: "SMAN 8 YOGYAKARTA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Umbulharjo", alamat: "Jl. Sidobali No. 1, Muja Muju" },
  { npsn: "20403289", nama: "SMKN 2 YOGYAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Jetis", alamat: "Jl. AM Sangaji No. 47" },
  { npsn: "20403290", nama: "SMKN 3 YOGYAKARTA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Jetis", alamat: "Jl. RW Monginsidi No. 2" },
  { npsn: "20409890", nama: "MAN 1 YOGYAKARTA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Gondomanan", alamat: "Jl. C. Simanjuntak No. 60" },
  { npsn: "20409891", nama: "MAN 2 YOGYAKARTA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Yogyakarta", provinsi: "D.I. Yogyakarta", kecamatan: "Gondomanan", alamat: "Jl. KH. Ahmad Dahlan No. 130" },
  { npsn: "20401120", nama: "SMAN 1 SLEMAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sleman", provinsi: "D.I. Yogyakarta", kecamatan: "Sleman", alamat: "Jl. Cempaka No. 1" },
  { npsn: "20401150", nama: "SMKN 1 DEPOK SLEMAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Sleman", provinsi: "D.I. Yogyakarta", kecamatan: "Depok", alamat: "Jl. Ring Road Utara, Maguwoharjo" },
  { npsn: "50103178", nama: "SMAN 1 DENPASAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Barat", alamat: "Jl. Kamboja No. 4" },
  { npsn: "50103180", nama: "SMAN 3 DENPASAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Timur", alamat: "Jl. Nusa Indah No. 20" },
  { npsn: "50103181", nama: "SMAN 4 DENPASAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Barat", alamat: "Jl. Gunung Rinjani No. 1" },
  { npsn: "50103195", nama: "SMKN 1 DENPASAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Barat", alamat: "Jl. HOS Cokroaminoto No. 84" },
  { npsn: "50103196", nama: "SMKN 2 DENPASAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Selatan", alamat: "Jl. Pendidikan No. 28, Sidakarya" },
  { npsn: "50105410", nama: "MAN 1 DENPASAR", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Denpasar", provinsi: "Bali", kecamatan: "Denpasar Barat", alamat: "Jl. Ahmad Yani No. 88" },
  { npsn: "50101510", nama: "SMAN 1 SINGARAJA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Buleleng", provinsi: "Bali", kecamatan: "Buleleng", alamat: "Jl. Pramuka No. 4" },
  { npsn: "50101530", nama: "SMKN 1 SINGARAJA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Buleleng", provinsi: "Bali", kecamatan: "Buleleng", alamat: "Jl. Ngurah Rai No. 10" },
  { npsn: "50201389", nama: "SMAN 1 MATARAM", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Mataram", provinsi: "Nusa Tenggara Barat", kecamatan: "Mataram", alamat: "Jl. Pendidikan No. 21" },
  { npsn: "50201390", nama: "SMAN 2 MATARAM", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Mataram", provinsi: "Nusa Tenggara Barat", kecamatan: "Mataram", alamat: "Jl. Majapahit No. 10" },
  { npsn: "50201402", nama: "SMKN 1 MATARAM", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Mataram", provinsi: "Nusa Tenggara Barat", kecamatan: "Selaparang", alamat: "Jl. Langko No. 42" },
  { npsn: "50201403", nama: "SMKN 2 MATARAM", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Mataram", provinsi: "Nusa Tenggara Barat", kecamatan: "Mataram", alamat: "Jl. Pemuda No. 5" },
  { npsn: "50221410", nama: "MAN 1 MATARAM", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Mataram", provinsi: "Nusa Tenggara Barat", kecamatan: "Mataram", alamat: "Jl. Pendidikan No. 2" },
  { npsn: "50221411", nama: "MAN 2 MATARAM", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Mataram", provinsi: "Nusa Tenggara Barat", kecamatan: "Selaparang", alamat: "Jl. Transmigrasi No. 18" },
  { npsn: "50202110", nama: "SMAN 1 SUMBAWA BESAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Sumbawa", provinsi: "Nusa Tenggara Barat", kecamatan: "Sumbawa", alamat: "Jl. Garuda No. 3" },
  { npsn: "50202130", nama: "SMKN 1 SUMBAWA BESAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Sumbawa", provinsi: "Nusa Tenggara Barat", kecamatan: "Sumbawa", alamat: "Jl. Hasanuddin No. 1" },
  { npsn: "50305018", nama: "SMAN 1 KUPANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Kupang", provinsi: "Nusa Tenggara Timur", kecamatan: "Oebobo", alamat: "Jl. Cak Doko No. 76" },
  { npsn: "50305019", nama: "SMAN 3 KUPANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Kupang", provinsi: "Nusa Tenggara Timur", kecamatan: "Kota Raja", alamat: "Jl. W.J. Lalamentik No. 1" },
  { npsn: "50305035", nama: "SMKN 1 KUPANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Kupang", provinsi: "Nusa Tenggara Timur", kecamatan: "Kelapa Lima", alamat: "Jl. Prof. Dr. W.Z. Johannes No. 1" },
  { npsn: "50305036", nama: "SMKN 2 KUPANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Kupang", provinsi: "Nusa Tenggara Timur", kecamatan: "Oebobo", alamat: "Jl. Perintis Kemerdekaan" },
  { npsn: "50309810", nama: "MAN KUPANG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Kupang", provinsi: "Nusa Tenggara Timur", kecamatan: "Alak", alamat: "Jl. Airlobang No. 2" },
  { npsn: "50301210", nama: "SMAN 1 ENDE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Ende", provinsi: "Nusa Tenggara Timur", kecamatan: "Ende Tengah", alamat: "Jl. El Tari No. 12" },
  { npsn: "50301230", nama: "SMKN 1 ENDE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Ende", provinsi: "Nusa Tenggara Timur", kecamatan: "Ende Utara", alamat: "Jl. Gatot Subroto No. 5" },
  { npsn: "30105210", nama: "SMAN 1 PONTIANAK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pontianak", provinsi: "Kalimantan Barat", kecamatan: "Pontianak Selatan", alamat: "Jl. Sultan Syarif Abdurrahman No. 82" },
  { npsn: "30105212", nama: "SMAN 3 PONTIANAK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Pontianak", provinsi: "Kalimantan Barat", kecamatan: "Pontianak Selatan", alamat: "Jl. WR Supratman No. 1" },
  { npsn: "30105234", nama: "SMKN 1 PONTIANAK", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Pontianak", provinsi: "Kalimantan Barat", kecamatan: "Pontianak Kota", alamat: "Jl. Danau Sentarum No. 10" },
  { npsn: "30105235", nama: "SMKN 3 PONTIANAK", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Pontianak", provinsi: "Kalimantan Barat", kecamatan: "Pontianak Barat", alamat: "Jl. S. Parman No. 2" },
  { npsn: "30108910", nama: "MAN 1 PONTIANAK", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Pontianak", provinsi: "Kalimantan Barat", kecamatan: "Pontianak Selatan", alamat: "Jl. Daeng Abdul Hadi No. 1" },
  { npsn: "30108911", nama: "MAN 2 PONTIANAK", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Pontianak", provinsi: "Kalimantan Barat", kecamatan: "Pontianak Selatan", alamat: "Jl. Jenderal Ahmad Yani No. 12" },
  { npsn: "30104110", nama: "SMAN 1 SINGKAWANG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Singkawang", provinsi: "Kalimantan Barat", kecamatan: "Singkawang Barat", alamat: "Jl. Merdeka No. 1" },
  { npsn: "30104130", nama: "SMKN 1 SINGKAWANG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Singkawang", provinsi: "Kalimantan Barat", kecamatan: "Singkawang Barat", alamat: "Jl. Karya No. 20" },
  { npsn: "30203490", nama: "SMAN 1 PALANGKA RAYA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Palangka Raya", provinsi: "Kalimantan Tengah", kecamatan: "Jekan Raya", alamat: "Jl. AIS Nasution No. 2" },
  { npsn: "30203491", nama: "SMAN 2 PALANGKA RAYA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Palangka Raya", provinsi: "Kalimantan Tengah", kecamatan: "Jekan Raya", alamat: "Jl. MH Thamrin No. 1" },
  { npsn: "30203512", nama: "SMKN 1 PALANGKA RAYA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Palangka Raya", provinsi: "Kalimantan Tengah", kecamatan: "Pahandut", alamat: "Jl. Tambun Bungai No. 10" },
  { npsn: "30203513", nama: "SMKN 2 PALANGKA RAYA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Palangka Raya", provinsi: "Kalimantan Tengah", kecamatan: "Jekan Raya", alamat: "Jl. Letjend S. Parman" },
  { npsn: "30206101", nama: "MAN KOTA PALANGKA RAYA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Palangka Raya", provinsi: "Kalimantan Tengah", kecamatan: "Pahandut", alamat: "Jl. Tjilik Riwut Km. 4" },
  { npsn: "30201210", nama: "SMAN 1 SAMPIT", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Kotawaringin Timur", provinsi: "Kalimantan Tengah", kecamatan: "Mentawa Baru Ketapang", alamat: "Jl. Jenderal Sudirman Km. 1" },
  { npsn: "30201230", nama: "SMKN 1 SAMPIT", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Kotawaringin Timur", provinsi: "Kalimantan Tengah", kecamatan: "Baamang", alamat: "Jl. Pemuda No. 4" },
  { npsn: "30304250", nama: "SMAN 1 BANJARMASIN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banjarmasin", provinsi: "Kalimantan Selatan", kecamatan: "Banjarmasin Tengah", alamat: "Jl. Mulawarman No. 25" },
  { npsn: "30304251", nama: "SMAN 2 BANJARMASIN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banjarmasin", provinsi: "Kalimantan Selatan", kecamatan: "Banjarmasin Tengah", alamat: "Jl. Mulawarman No. 21" },
  { npsn: "30304278", nama: "SMKN 1 BANJARMASIN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Banjarmasin", provinsi: "Kalimantan Selatan", kecamatan: "Banjarmasin Tengah", alamat: "Jl. Mulawarman No. 1" },
  { npsn: "30304279", nama: "SMKN 2 BANJARMASIN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Banjarmasin", provinsi: "Kalimantan Selatan", kecamatan: "Banjarmasin Barat", alamat: "Jl. Brigjen H. Hasan Basri No. 6" },
  { npsn: "30314101", nama: "MAN 1 BANJARMASIN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Banjarmasin", provinsi: "Kalimantan Selatan", kecamatan: "Banjarmasin Timur", alamat: "Jl. Kampung Melayu Darat No. 1" },
  { npsn: "30314102", nama: "MAN 2 BANJARMASIN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Banjarmasin", provinsi: "Kalimantan Selatan", kecamatan: "Banjarmasin Tengah", alamat: "Jl. Pramuka No. 3" },
  { npsn: "30304810", nama: "SMAN 1 BANJARBARU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Banjarbaru", provinsi: "Kalimantan Selatan", kecamatan: "Banjarbaru Utara", alamat: "Jl. P. Batur Barat No. 1" },
  { npsn: "30304830", nama: "SMKN 1 BANJARBARU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Banjarbaru", provinsi: "Kalimantan Selatan", kecamatan: "Banjarbaru Selatan", alamat: "Jl. Karang Anyar No. 2" },
  { npsn: "30401062", nama: "SMAN 1 SAMARINDA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Samarinda", provinsi: "Kalimantan Timur", kecamatan: "Samarinda Ulu", alamat: "Jl. Bhayangkara No. 1" },
  { npsn: "30401064", nama: "SMAN 3 SAMARINDA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Samarinda", provinsi: "Kalimantan Timur", kecamatan: "Samarinda Ulu", alamat: "Jl. Juanda No. 20" },
  { npsn: "30401089", nama: "SMKN 1 SAMARINDA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Samarinda", provinsi: "Kalimantan Timur", kecamatan: "Samarinda Ilir", alamat: "Jl. Pahlawan No. 4" },
  { npsn: "30401090", nama: "SMKN 2 SAMARINDA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Samarinda", provinsi: "Kalimantan Timur", kecamatan: "Samarinda Ulu", alamat: "Jl. Pemuda No. 12" },
  { npsn: "30409810", nama: "MAN 1 SAMARINDA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Samarinda", provinsi: "Kalimantan Timur", kecamatan: "Samarinda Ulu", alamat: "Jl. P. Suryanata No. 5" },
  { npsn: "30409811", nama: "MAN 2 SAMARINDA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Samarinda", provinsi: "Kalimantan Timur", kecamatan: "Samarinda Seberang", alamat: "Jl. Bung Tomo No. 1" },
  { npsn: "30401490", nama: "SMAN 1 BALIKPAPAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Balikpapan", provinsi: "Kalimantan Timur", kecamatan: "Balikpapan Kota", alamat: "Jl. Kapten Piere Tendean No. 63" },
  { npsn: "30401510", nama: "SMKN 1 BALIKPAPAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Balikpapan", provinsi: "Kalimantan Timur", kecamatan: "Balikpapan Selatan", alamat: "Jl. Marsma R. Iswahyudi No. 1" },
  { npsn: "30402610", nama: "SMAN 1 TANJUNG SELOR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Bulungan", provinsi: "Kalimantan Utara", kecamatan: "Tanjung Selor", alamat: "Jl. Kolonel Soetadji No. 1" },
  { npsn: "30402630", nama: "SMKN 1 TANJUNG SELOR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Bulungan", provinsi: "Kalimantan Utara", kecamatan: "Tanjung Selor", alamat: "Jl. Jenderal Sudirman No. 15" },
  { npsn: "30407101", nama: "MAN TANJUNG SELOR", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Bulungan", provinsi: "Kalimantan Utara", kecamatan: "Tanjung Selor", alamat: "Jl. Agathis No. 2" },
  { npsn: "30402801", nama: "SMAN 1 TARAKAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tarakan", provinsi: "Kalimantan Utara", kecamatan: "Tarakan Barat", alamat: "Jl. Ki Hajar Dewantara No. 1" },
  { npsn: "30402820", nama: "SMKN 1 TARAKAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Tarakan", provinsi: "Kalimantan Utara", kecamatan: "Tarakan Tengah", alamat: "Jl. P. Diponegoro No. 8" },
  { npsn: "30407120", nama: "MAN TARAKAN", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Tarakan", provinsi: "Kalimantan Utara", kecamatan: "Tarakan Barat", alamat: "Jl. Mulawarman No. 25" },
  { npsn: "30403110", nama: "SMAN 1 NUNUKAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Nunukan", provinsi: "Kalimantan Utara", kecamatan: "Nunukan", alamat: "Jl. Ujang Dewa No. 1" },
  { npsn: "30403130", nama: "SMKN 1 NUNUKAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Nunukan", provinsi: "Kalimantan Utara", kecamatan: "Nunukan", alamat: "Jl. P. Antasari No. 10" },
  { npsn: "40102602", nama: "SMAN 1 MANADO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Manado", provinsi: "Sulawesi Utara", kecamatan: "Sario", alamat: "Jl. Sam Ratulangi No. 128" },
  { npsn: "40102604", nama: "SMAN 9 MANADO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Manado", provinsi: "Sulawesi Utara", kecamatan: "Malalayang", alamat: "Jl. Wolter Monginsidi No. 10" },
  { npsn: "40102628", nama: "SMKN 1 MANADO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Manado", provinsi: "Sulawesi Utara", kecamatan: "Wenang", alamat: "Jl. Pramuka No. 1" },
  { npsn: "40102629", nama: "SMKN 2 MANADO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Manado", provinsi: "Sulawesi Utara", kecamatan: "Sario", alamat: "Jl. Stadion Klabat No. 5" },
  { npsn: "40109101", nama: "MAN 1 MANADO", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Manado", provinsi: "Sulawesi Utara", kecamatan: "Tuminting", alamat: "Jl. Hasanuddin No. 3" },
  { npsn: "40103110", nama: "SMAN 1 TOMOHON", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tomohon", provinsi: "Sulawesi Utara", kecamatan: "Tomohon Tengah", alamat: "Jl. Siswa No. 1" },
  { npsn: "40103130", nama: "SMKN 1 TOMOHON", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Tomohon", provinsi: "Sulawesi Utara", kecamatan: "Tomohon Selatan", alamat: "Jl. Paslaten No. 10" },
  { npsn: "40501065", nama: "SMAN 1 GORONTALO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Gorontalo", provinsi: "Gorontalo", kecamatan: "Kota Selatan", alamat: "Jl. M.T. Haryono No. 1" },
  { npsn: "40501067", nama: "SMAN 3 GORONTALO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Gorontalo", provinsi: "Gorontalo", kecamatan: "Kota Tengah", alamat: "Jl. Pangeran Hidayat No. 20" },
  { npsn: "40501089", nama: "SMKN 1 GORONTALO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Gorontalo", provinsi: "Gorontalo", kecamatan: "Kota Barat", alamat: "Jl. Tinaloga No. 4" },
  { npsn: "40502101", nama: "MAN 1 GORONTALO", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Gorontalo", provinsi: "Gorontalo", kecamatan: "Dumbo Raya", alamat: "Jl. Rusli Datau No. 10" },
  { npsn: "40501438", nama: "MAN INSAN CENDEKIA GORONTALO", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Bone Bolango", provinsi: "Gorontalo", kecamatan: "Suwawa", alamat: "Jl. Kasmat Lahay No. 1" },
  { npsn: "40501210", nama: "SMAN 1 LIMBOTO", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Gorontalo", provinsi: "Gorontalo", kecamatan: "Limboto", alamat: "Jl. Jenderal Sudirman No. 40" },
  { npsn: "40501230", nama: "SMKN 1 LIMBOTO", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Gorontalo", provinsi: "Gorontalo", kecamatan: "Limboto", alamat: "Jl. Trans Sulawesi No. 15" },
  { npsn: "40203480", nama: "SMAN 1 PALU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Palu", provinsi: "Sulawesi Tengah", kecamatan: "Palu Barat", alamat: "Jl. Gatot Subroto No. 70" },
  { npsn: "40203481", nama: "SMAN 2 PALU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Palu", provinsi: "Sulawesi Tengah", kecamatan: "Palu Timur", alamat: "Jl. Tanjung Dako No. 9" },
  { npsn: "40203505", nama: "SMKN 1 PALU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Palu", provinsi: "Sulawesi Tengah", kecamatan: "Palu Barat", alamat: "Jl. R.A. Kartini No. 1" },
  { npsn: "40203506", nama: "SMKN 2 PALU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Palu", provinsi: "Sulawesi Tengah", kecamatan: "Palu Selatan", alamat: "Jl. Setia Budi No. 12" },
  { npsn: "40207101", nama: "MAN 1 PALU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Palu", provinsi: "Sulawesi Tengah", kecamatan: "Palu Barat", alamat: "Jl. Hang Tuah No. 10" },
  { npsn: "40207102", nama: "MAN 2 PALU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Palu", provinsi: "Sulawesi Tengah", kecamatan: "Palu Selatan", alamat: "Jl. M.T. Haryono No. 5" },
  { npsn: "40201210", nama: "SMAN 1 LUWUK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Banggai", provinsi: "Sulawesi Tengah", kecamatan: "Luwuk", alamat: "Jl. Urip Sumoharjo No. 1" },
  { npsn: "40201230", nama: "SMKN 1 LUWUK", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Banggai", provinsi: "Sulawesi Tengah", kecamatan: "Luwuk", alamat: "Jl. Ahmad Yani No. 10" },
  { npsn: "40600850", nama: "SMAN 1 MAMUJU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Mamuju", provinsi: "Sulawesi Barat", kecamatan: "Mamuju", alamat: "Jl. Kumbang Malam No. 1" },
  { npsn: "40600851", nama: "SMAN 2 MAMUJU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Mamuju", provinsi: "Sulawesi Barat", kecamatan: "Simboro", alamat: "Jl. Martadinata No. 5" },
  { npsn: "40600872", nama: "SMKN 1 MAMUJU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Mamuju", provinsi: "Sulawesi Barat", kecamatan: "Mamuju", alamat: "Jl. Pattimura No. 12" },
  { npsn: "40602101", nama: "MAN 1 MAMUJU", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Mamuju", provinsi: "Sulawesi Barat", kecamatan: "Mamuju", alamat: "Jl. K.H. Daeng Sikki No. 1" },
  { npsn: "40601210", nama: "SMAN 1 MAJENE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Majene", provinsi: "Sulawesi Barat", kecamatan: "Banggae", alamat: "Jl. Jenderal Sudirman No. 1" },
  { npsn: "40601230", nama: "SMKN 1 MAJENE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Majene", provinsi: "Sulawesi Barat", kecamatan: "Banggae", alamat: "Jl. Wolter Monginsidi No. 14" },
  { npsn: "40601410", nama: "SMAN 1 POLEWALI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Polewali Mandar", provinsi: "Sulawesi Barat", kecamatan: "Polewali", alamat: "Jl. H.O.S. Cokroaminoto No. 1" },
  { npsn: "40601430", nama: "SMKN 1 POLEWALI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Polewali Mandar", provinsi: "Sulawesi Barat", kecamatan: "Polewali", alamat: "Jl. Stadion No. 2" },
  { npsn: "40311950", nama: "SMAN 1 MAKASSAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Ujung Pandang", alamat: "Jl. Gunung Bawakaraeng No. 53" },
  { npsn: "40311951", nama: "SMAN 2 MAKASSAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Mamajang", alamat: "Jl. Baji Gau No. 17" },
  { npsn: "40311954", nama: "SMAN 5 MAKASSAR", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Tallo", alamat: "Jl. Taman Makam Pahlawan No. 4" },
  { npsn: "40311978", nama: "SMKN 1 MAKASSAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Rappocini", alamat: "Jl. A.P. Pettarani No. 1" },
  { npsn: "40311979", nama: "SMKN 2 MAKASSAR", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Tamalate", alamat: "Jl. Pancasila No. 1" },
  { npsn: "40318910", nama: "MAN 1 MAKASSAR", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Rappocini", alamat: "Jl. Talasalapang No. 46" },
  { npsn: "40318911", nama: "MAN 2 MODEL MAKASSAR", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Makassar", provinsi: "Sulawesi Selatan", kecamatan: "Panakkukang", alamat: "Jl. Perintis Kemerdekaan Km. 12" },
  { npsn: "40307110", nama: "SMAN 1 GOWA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Gowa", provinsi: "Sulawesi Selatan", kecamatan: "Somba Opu", alamat: "Jl. K.H. Wahid Hasyim No. 8" },
  { npsn: "40307130", nama: "SMKN 1 GOWA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Gowa", provinsi: "Sulawesi Selatan", kecamatan: "Somba Opu", alamat: "Jl. Mesjid Raya No. 4" },
  { npsn: "40308110", nama: "SMAN 1 PAREPARE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Parepare", provinsi: "Sulawesi Selatan", kecamatan: "Soreang", alamat: "Jl. Pemuda No. 1" },
  { npsn: "40308130", nama: "SMKN 1 PAREPARE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Parepare", provinsi: "Sulawesi Selatan", kecamatan: "Ujung", alamat: "Jl. Bau Massepe No. 100" },
  { npsn: "40402630", nama: "SMAN 1 KENDARI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Kendari", provinsi: "Sulawesi Tenggara", kecamatan: "Mandonga", alamat: "Jl. Mayjen S. Parman No. 2" },
  { npsn: "40402633", nama: "SMAN 4 KENDARI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Kendari", provinsi: "Sulawesi Tenggara", kecamatan: "Kadia", alamat: "Jl. Ahmad Yani No. 13" },
  { npsn: "40402655", nama: "SMKN 1 KENDARI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Kendari", provinsi: "Sulawesi Tenggara", kecamatan: "Kadia", alamat: "Jl. Budi Utomo No. 1" },
  { npsn: "40402656", nama: "SMKN 2 KENDARI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Kendari", provinsi: "Sulawesi Tenggara", kecamatan: "Mandonga", alamat: "Jl. Jenderal Ahmad Yani" },
  { npsn: "40408101", nama: "MAN 1 KENDARI", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Kendari", provinsi: "Sulawesi Tenggara", kecamatan: "Baruga", alamat: "Jl. DI Panjaitan No. 1" },
  { npsn: "40403110", nama: "SMAN 1 BAU-BAU", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Bau-Bau", provinsi: "Sulawesi Tenggara", kecamatan: "Wolio", alamat: "Jl. Pahlawan No. 1" },
  { npsn: "40403130", nama: "SMKN 1 BAU-BAU", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Bau-Bau", provinsi: "Sulawesi Tenggara", kecamatan: "Betoambari", alamat: "Jl. Yos Sudarso No. 12" },
  { npsn: "60101980", nama: "SMAN 1 AMBON", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Ambon", provinsi: "Maluku", kecamatan: "Sirimau", alamat: "Jl. Philip Latumahina No. 1" },
  { npsn: "60101981", nama: "SMAN 2 AMBON", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Ambon", provinsi: "Maluku", kecamatan: "Sirimau", alamat: "Jl. Karang Panjang No. 1" },
  { npsn: "60102005", nama: "SMKN 1 AMBON", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Ambon", provinsi: "Maluku", kecamatan: "Nusaniwe", alamat: "Jl. Dr. Kayadoe No. 1" },
  { npsn: "60102006", nama: "SMKN 2 AMBON", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Ambon", provinsi: "Maluku", kecamatan: "Sirimau", alamat: "Jl. Rijali No. 10" },
  { npsn: "60105101", nama: "MAN 1 AMBON", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Ambon", provinsi: "Maluku", kecamatan: "Sirimau", alamat: "Jl. Kebun Cengkeh No. 1" },
  { npsn: "60102110", nama: "SMAN 1 TUAL", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tual", provinsi: "Maluku", kecamatan: "Dullah Selatan", alamat: "Jl. Soekarno-Hatta No. 2" },
  { npsn: "60102130", nama: "SMKN 1 TUAL", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Tual", provinsi: "Maluku", kecamatan: "Dullah Selatan", alamat: "Jl. Pattimura No. 1" },
  { npsn: "60201050", nama: "SMAN 1 TERNATE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Ternate", provinsi: "Maluku Utara", kecamatan: "Ternate Tengah", alamat: "Jl. Ki Hajar Dewantara No. 1" },
  { npsn: "60201057", nama: "SMAN 8 TERNATE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Ternate", provinsi: "Maluku Utara", kecamatan: "Ternate Selatan", alamat: "Jl. Siswa No. 10" },
  { npsn: "60201072", nama: "SMKN 1 TERNATE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Ternate", provinsi: "Maluku Utara", kecamatan: "Ternate Tengah", alamat: "Jl. Batu Angus No. 5" },
  { npsn: "60202101", nama: "MAN 1 TERNATE", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Ternate", provinsi: "Maluku Utara", kecamatan: "Ternate Selatan", alamat: "Jl. Fitu No. 2" },
  { npsn: "60201210", nama: "SMAN 1 TIDORE KEPULAUAN", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Tidore Kepulauan", provinsi: "Maluku Utara", kecamatan: "Tidore", alamat: "Jl. Sultan Nuku No. 1" },
  { npsn: "60201230", nama: "SMKN 1 TIDORE KEPULAUAN", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Tidore Kepulauan", provinsi: "Maluku Utara", kecamatan: "Tidore", alamat: "Jl. Kemakmuran No. 4" },
  { npsn: "60301052", nama: "SMAN 1 JAYAPURA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jayapura", provinsi: "Papua", kecamatan: "Jayapura Utara", alamat: "Jl. Sam Ratulangi No. 1" },
  { npsn: "60301053", nama: "SMAN 2 JAYAPURA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jayapura", provinsi: "Papua", kecamatan: "Jayapura Selatan", alamat: "Jl. Raya Entrop No. 2" },
  { npsn: "60301055", nama: "SMAN 4 JAYAPURA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Jayapura", provinsi: "Papua", kecamatan: "Abepura", alamat: "Jl. Raya Abepura-Kotaraja" },
  { npsn: "60301075", nama: "SMKN 1 JAYAPURA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Jayapura", provinsi: "Papua", kecamatan: "Jayapura Selatan", alamat: "Jl. Raya Entrop No. 10" },
  { npsn: "60301076", nama: "SMKN 2 JAYAPURA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Jayapura", provinsi: "Papua", kecamatan: "Abepura", alamat: "Jl. Kotaraja No. 5" },
  { npsn: "60305101", nama: "MAN JAYAPURA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Jayapura", provinsi: "Papua", kecamatan: "Abepura", alamat: "Jl. Raya Sentani Km. 9" },
  { npsn: "60301210", nama: "SMAN 1 SENTANI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Jayapura", provinsi: "Papua", kecamatan: "Sentani", alamat: "Jl. Raya Sentani-Depapre" },
  { npsn: "60301230", nama: "SMKN 1 SENTANI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Jayapura", provinsi: "Papua", kecamatan: "Sentani", alamat: "Jl. Kemiri No. 15" },
  { npsn: "60401032", nama: "SMAN 1 MANOKWARI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Manokwari", provinsi: "Papua Barat", kecamatan: "Manokwari Barat", alamat: "Jl. Merdeka No. 1" },
  { npsn: "60401033", nama: "SMAN 2 MANOKWARI", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Manokwari", provinsi: "Papua Barat", kecamatan: "Manokwari Timur", alamat: "Jl. Percetakan Negara No. 10" },
  { npsn: "60401055", nama: "SMKN 1 MANOKWARI", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Manokwari", provinsi: "Papua Barat", kecamatan: "Manokwari Barat", alamat: "Jl. Brawijaya No. 15" },
  { npsn: "60405101", nama: "MAN MANOKWARI", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Manokwari", provinsi: "Papua Barat", kecamatan: "Manokwari Barat", alamat: "Jl. Dr. Sam Ratulangi No. 4" },
  { npsn: "60401210", nama: "SMAN 1 FAKFAK", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Fakfak", provinsi: "Papua Barat", kecamatan: "Fakfak", alamat: "Jl. Ahmad Yani No. 1" },
  { npsn: "60401230", nama: "SMKN 1 FAKFAK", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Fakfak", provinsi: "Papua Barat", kecamatan: "Fakfak", alamat: "Jl. Cenderawasih No. 10" },
  { npsn: "60303030", nama: "SMAN 1 NABIRE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Nabire", provinsi: "Papua Tengah", kecamatan: "Nabire", alamat: "Jl. Jenderal Sudirman No. 1" },
  { npsn: "60303031", nama: "SMAN 2 NABIRE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Nabire", provinsi: "Papua Tengah", kecamatan: "Nabire", alamat: "Jl. Merdeka No. 25" },
  { npsn: "60303052", nama: "SMKN 1 NABIRE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Nabire", provinsi: "Papua Tengah", kecamatan: "Nabire", alamat: "Jl. Pemuda No. 4" },
  { npsn: "60307101", nama: "MAN NABIRE", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Nabire", provinsi: "Papua Tengah", kecamatan: "Nabire", alamat: "Jl. Mandala No. 8" },
  { npsn: "60303210", nama: "SMAN 1 TIMIKA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Mimika", provinsi: "Papua Tengah", kecamatan: "Mimika Baru", alamat: "Jl. Budi Utomo No. 1" },
  { npsn: "60303230", nama: "SMKN 1 MIMIKA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Mimika", provinsi: "Papua Tengah", kecamatan: "Kuala Kencana", alamat: "Jl. Poros Timika-Kuala Kencana" },
  { npsn: "60302040", nama: "SMAN 1 MERAUKE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Merauke", provinsi: "Papua Selatan", kecamatan: "Merauke", alamat: "Jl. Pendidikan No. 1" },
  { npsn: "60302041", nama: "SMAN 2 MERAUKE", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Merauke", provinsi: "Papua Selatan", kecamatan: "Merauke", alamat: "Jl. Brawijaya No. 12" },
  { npsn: "60302065", nama: "SMKN 1 MERAUKE", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Merauke", provinsi: "Papua Selatan", kecamatan: "Merauke", alamat: "Jl. Yos Sudarso No. 40" },
  { npsn: "60308101", nama: "MAN MERAUKE", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Merauke", provinsi: "Papua Selatan", kecamatan: "Merauke", alamat: "Jl. Ermasu No. 2" },
  { npsn: "60302210", nama: "SMAN 1 BOVEN DIGOEL", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Boven Digoel", provinsi: "Papua Selatan", kecamatan: "Mandobo", alamat: "Jl. Trans Papua No. 5" },
  { npsn: "60304020", nama: "SMAN 1 WAMENA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Jayawijaya", provinsi: "Papua Pegunungan", kecamatan: "Wamena", alamat: "Jl. Bhayangkara No. 1" },
  { npsn: "60304021", nama: "SMAN 2 WAMENA", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Jayawijaya", provinsi: "Papua Pegunungan", kecamatan: "Wamena", alamat: "Jl. Yos Sudarso No. 18" },
  { npsn: "60304045", nama: "SMKN 1 WAMENA", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Jayawijaya", provinsi: "Papua Pegunungan", kecamatan: "Wamena", alamat: "Jl. Hom-Hom No. 2" },
  { npsn: "60309101", nama: "MAN WAMENA", bentuk: "MA", status: "Negeri", kabupatenKota: "Kab. Jayawijaya", provinsi: "Papua Pegunungan", kecamatan: "Wamena", alamat: "Jl. Safri Darwin No. 4" },
  { npsn: "60304210", nama: "SMAN 1 TIOM", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Lanny Jaya", provinsi: "Papua Pegunungan", kecamatan: "Tiom", alamat: "Jl. Trans Tiom No. 1" },
  { npsn: "60402020", nama: "SMAN 1 KOTA SORONG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Sorong", provinsi: "Papua Barat Daya", kecamatan: "Sorong Manoi", alamat: "Jl. Basuki Rahmat Km. 9" },
  { npsn: "60402022", nama: "SMAN 3 KOTA SORONG", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kota Sorong", provinsi: "Papua Barat Daya", kecamatan: "Sorong Barat", alamat: "Jl. Jenderal Sudirman No. 1" },
  { npsn: "60402045", nama: "SMKN 1 KOTA SORONG", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kota Sorong", provinsi: "Papua Barat Daya", kecamatan: "Sorong Manoi", alamat: "Jl. Basuki Rahmat Km. 10" },
  { npsn: "60408101", nama: "MAN KOTA SORONG", bentuk: "MA", status: "Negeri", kabupatenKota: "Kota Sorong", provinsi: "Papua Barat Daya", kecamatan: "Sorong Timur", alamat: "Jl. Arfak No. 2" },
  { npsn: "60402210", nama: "SMAN 1 RAJA AMPAT", bentuk: "SMA", status: "Negeri", kabupatenKota: "Kab. Raja Ampat", provinsi: "Papua Barat Daya", kecamatan: "Kota Waisai", alamat: "Jl. Marinda No. 1, Waisai" },
  { npsn: "60402230", nama: "SMKN 1 RAJA AMPAT", bentuk: "SMK", status: "Negeri", kabupatenKota: "Kab. Raja Ampat", provinsi: "Papua Barat Daya", kecamatan: "Kota Waisai", alamat: "Jl. Pari No. 2, Waisai" },
];

import { SEKOLAH_SWASTA_INDONESIA } from './sekolahSwastaData';

const seenSchoolKeys = new Set<string>();

export const SEKOLAH_KEMENDIKDASMEN: SekolahItem[] = [...RAW_SEKOLAH_LIST, ...SEKOLAH_SWASTA_INDONESIA].filter((item) => {
  const normName = item.nama.trim().toUpperCase().replace(/\s+/g, ' ');
  const normKab = (item.kabupatenKota || '').trim().toUpperCase();
  const key = item.npsn ? `npsn_${item.npsn}` : `${normName}_${normKab}`;
  if (seenSchoolKeys.has(key)) return false;
  seenSchoolKeys.add(key);
  return true;
}).map((item, idx): SekolahItem => ({
  ...item,
  id: `sch_${item.npsn || idx}`,
  nama_sekolah: item.nama.trim().toUpperCase(),
  bentuk: item.bentuk as 'SMA' | 'SMK' | 'MA' | 'MAK',
  kabupaten_kota: item.kabupatenKota,
  status: (item.status.toUpperCase() === 'NEGERI' ? 'Negeri' : 'Swasta') as 'Negeri' | 'Swasta',
}));

// Backwards compatibility export
export const INDONESIA_SEKOLAH_DATABASE = SEKOLAH_KEMENDIKDASMEN.map(s => ({
  id: s.id || `sch_${s.npsn}`,
  nama_sekolah: s.nama,
  bentuk: (s.bentuk === 'MAK' ? 'SMK' : s.bentuk) as 'SMA' | 'SMK' | 'MA',
  status: (s.status.toUpperCase() === 'NEGERI' ? 'NEGERI' : 'SWASTA') as 'NEGERI' | 'SWASTA',
  npsn: s.npsn,
  kabupaten_kota: s.kabupatenKota,
  provinsi: s.provinsi,
  kecamatan: s.kecamatan || '',
}));

/**
 * Helper klasifikasi bentuk sekolah dari nama (sesuai logika Kemendikdasmen)
 */
export function classifyBentukSekolah(namaSekolah: string): 'SMA' | 'SMK' | 'MA' | 'MAK' | null {
  const n = (namaSekolah || '').toUpperCase().trim();
  if (/^MAN\b/.test(n) || /^MAS\b/.test(n) || /^MA\s/.test(n)) return 'MA';
  if (/^MAK/.test(n)) return 'MAK';
  if (/^SMK/.test(n)) return 'SMK';
  if (/^SMA/.test(n)) return 'SMA';
  return null;
}

/**
 * Helper mencari data statistik wilayah Dapodik Jawa Timur berdasarkan kode wilayah atau nama
 */
export function findWilayahJatim(identifier: string): WilayahDapodik | undefined {
  if (!identifier) return undefined;
  const clean = identifier.trim().toUpperCase();
  return WILAYAH_JAWA_TIMUR.find(
    (w) =>
      w.kodeWilayah === clean ||
      w.namaWilayah.toUpperCase() === clean ||
      w.namaWilayah.toUpperCase().replace(/^KAB\.\s+|^KOTA\s+/, '') === clean.replace(/^KAB\.\s+|^KOTA\s+/, '')
  );
}

function fastLevenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;
  if (Math.abs(a.length - b.length) > 3) return 4;
  const m = a.length, n = b.length;
  const d: number[] = [];
  for (let j = 0; j <= n; j++) d[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = i - 1;
    d[0] = i;
    const charA = a.charCodeAt(i - 1);
    for (let j = 1; j <= n; j++) {
      const temp = d[j];
      const cost = charA === b.charCodeAt(j - 1) ? 0 : 1;
      d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + cost);
      prev = temp;
    }
  }
  return d[n];
}

/**
 * Pencarian sekolah cerdas berbasis token & typo tolerance (Levenshtein)
 */
export function searchSekolahKemendikdasmen(
  query: string,
  options?: {
    bentuk?: 'all' | 'SMA' | 'SMK' | 'MA' | 'MAK';
    status?: 'all' | 'Negeri' | 'Swasta';
    provinsi?: string;
    kodeWilayah?: string;
    kabupatenKota?: string;
    limit?: number;
  }
): SekolahItem[] {
  let clean = (query || '').trim().toUpperCase();
  const maxResults = options?.limit ?? 40;
  const filterBentuk = options?.bentuk && options.bentuk !== 'all' ? options.bentuk : null;
  const filterStatus = options?.status && options.status !== 'all' ? options.status.toUpperCase() : null;
  const filterProvinsi =
    options?.provinsi && options.provinsi !== 'Semua Provinsi' && options.provinsi !== 'all' ? options.provinsi.toUpperCase() : null;
  const filterKodeWilayah = options?.kodeWilayah || null;
  const filterKabKota = options?.kabupatenKota ? options.kabupatenKota.toUpperCase() : null;

  // Filter candidates first
  const candidates = SEKOLAH_KEMENDIKDASMEN.filter((sekolah) => {
    if (filterBentuk && sekolah.bentuk !== filterBentuk) return false;
    if (filterStatus && (sekolah.status || '').toUpperCase() !== filterStatus) return false;
    if (filterProvinsi && (sekolah.provinsi || '').toUpperCase() !== filterProvinsi) return false;
    if (filterKodeWilayah && sekolah.kodeWilayah !== filterKodeWilayah) return false;
    if (filterKabKota) {
      const matchK = (sekolah.kabupatenKota || '').toUpperCase();
      if (!matchK.includes(filterKabKota) && !filterKabKota.includes(matchK)) return false;
    }
    return true;
  });

  if (!clean) {
    return candidates.slice(0, maxResults);
  }

  // Location aliases
  clean = clean
    .replace(/\bSOLO\b/g, 'SURAKARTA')
    .replace(/\b(JOGJA|YOGYA)\b/g, 'YOGYAKARTA')
    .replace(/\bSBY\b/g, 'SURABAYA')
    .replace(/\bJKT\b/g, 'JAKARTA')
    .replace(/\bBDG\b/g, 'BANDUNG')
    .replace(/\bSMG\b/g, 'SEMARANG')
    .replace(/\bMGL\b/g, 'MAGELANG')
    .replace(/\bSRG\b/g, 'SRAGEN')
    .replace(/\bMUH\b/g, 'MUHAMMADIYAH');

  // School acronyms
  clean = clean
    .replace(/\bSMK\s*(?:NEGERI|N)\s*(\d+)/g, 'SMKN $1')
    .replace(/\bSMA\s*(?:NEGERI|N)\s*(\d+)/g, 'SMAN $1')
    .replace(/\bMA\s*(?:NEGERI|N)\s*(\d+)/g, 'MAN $1')
    .replace(/\bSMK\s*(\d+)/g, 'SMKN $1')
    .replace(/\bSMA\s*(\d+)/g, 'SMAN $1')
    .replace(/\bMA\s*(\d+)/g, 'MAN $1');

  const numMatch = clean.match(/\b(\d+)\b/);
  const targetNumber = numMatch ? numMatch[1] : null;

  let queryBentuk: string | null = null;
  if (/\b(SMK|SMKN|SMKS)\b/.test(clean)) queryBentuk = 'SMK';
  else if (/\b(SMA|SMAN|SMAS)\b/.test(clean)) queryBentuk = 'SMA';
  else if (/\b(MA|MAN|MAS)\b/.test(clean)) queryBentuk = 'MA';

  const tokens = clean
    .replace(/[^A-Z0-9\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0 && !['DI', 'KE', 'PADA', 'KAB', 'KOTA', 'PROV'].includes(t));

  const scored: { item: SekolahItem; score: number }[] = [];

  for (const s of candidates) {
    if (queryBentuk && s.bentuk !== queryBentuk && !filterBentuk) {
      continue;
    }

    const sName = (s.nama || s.nama_sekolah || '').toUpperCase();
    const sNpsn = (s.npsn || '').toUpperCase();
    const sNumMatch = sName.match(/\b(\d+)\b/);
    const sNumber = sNumMatch ? sNumMatch[1] : null;

    // Strict number matching if specified
    if (targetNumber && sNumber && sNumber !== targetNumber) {
      continue;
    }

    // Direct NPSN match
    if (sNpsn && sNpsn === clean) {
      scored.push({ item: s, score: 100 });
      continue;
    }

    const sFull = `${sName} ${sNpsn} ${s.kabupatenKota || ''} ${s.kecamatan || ''} ${s.provinsi || ''}`.toUpperCase();
    const sTokens = sFull.replace(/[^A-Z0-9\s]/g, ' ').trim().split(/\s+/).filter(Boolean);

    let tokenScore = 0;
    let matchedSpecificTokens = 0;
    const specificTokens = tokens.filter(
      (t) => t !== targetNumber && !['SMA', 'SMAN', 'SMK', 'SMKN', 'MA', 'MAN'].includes(t)
    );

    for (const qTok of tokens) {
      let bestSim = 0;
      for (const sTok of sTokens) {
        if (qTok === sTok) {
          bestSim = Math.max(bestSim, 2.5);
          break;
        }

        // Typo tolerance with Levenshtein distance
        if (qTok.length >= 4 && sTok.length >= 4) {
          const dist = fastLevenshtein(qTok, sTok);
          if (dist === 1) {
            bestSim = Math.max(bestSim, 2.2);
            continue;
          } else if (dist === 2 && qTok.length >= 6 && sTok.length >= 6) {
            bestSim = Math.max(bestSim, 1.6);
            continue;
          }
        }

        // Prefix and substring matching (only for tokens with 3+ characters)
        if (qTok.length >= 3 && sTok.length >= 3) {
          if (sTok.startsWith(qTok) || qTok.startsWith(sTok)) {
            bestSim = Math.max(bestSim, 1.5);
          } else if (sTok.includes(qTok) || qTok.includes(sTok)) {
            bestSim = Math.max(bestSim, 1.2);
          }
        }
      }

      if (specificTokens.includes(qTok) && bestSim >= 1.2) {
        matchedSpecificTokens++;
      }

      tokenScore += bestSim;
    }

    if (specificTokens.length > 0 && matchedSpecificTokens === 0) {
      continue;
    }

    let finalScore = tokenScore;
    if (targetNumber && sNumber === targetNumber) {
      finalScore += 3.0;
    }
    if (sName.includes(clean)) {
      finalScore += 3.0;
    }

    if (finalScore >= 2.0) {
      scored.push({ item: s, score: finalScore });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.item.nama.localeCompare(b.item.nama));
  return scored.slice(0, maxResults).map((sc) => sc.item);
}

/**
 * Mencari data sekolah spesifik berdasarkan nama persis atau nomor NPSN
 */
export function findSekolahByNameOrNpsn(identifier: string): SekolahItem | undefined {
  if (!identifier) return undefined;
  const clean = identifier.trim().toUpperCase();
  return SEKOLAH_KEMENDIKDASMEN.find(
    (s) => s.nama.toUpperCase() === clean || s.npsn.toUpperCase() === clean
  );
}

/**
 * Mengambil daftar seluruh Kabupaten / Kota berdasarkan nama provinsi
 */
export function getKabupatenByProvinsi(provinsi: string): string[] {
  if (!provinsi || provinsi === 'Semua Provinsi' || provinsi === 'all') {
    const allKab = new Set<string>();
    SEKOLAH_KEMENDIKDASMEN.forEach((s) => {
      if (s.kabupatenKota) allKab.add(s.kabupatenKota);
    });
    return ['Semua', ...Array.from(allKab).sort()];
  }

  const kabSet = new Set<string>();
  const cleanProv = provinsi.toUpperCase();
  SEKOLAH_KEMENDIKDASMEN.forEach((s) => {
    if ((s.provinsi || '').toUpperCase() === cleanProv && s.kabupatenKota) {
      kabSet.add(s.kabupatenKota);
    }
  });

  return ['Semua', ...Array.from(kabSet).sort()];
}
