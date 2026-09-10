import {
  SEKOLAH_KEMENDIKDASMEN,
  DAFTAR_PROVINSI,
  WILAYAH_JAWA_TIMUR,
  searchSekolahKemendikdasmen,
  SekolahItem,
} from '../data/sekolahKemendikdasmenData';

export interface SchoolItem {
  id: string;
  npsn: string;
  nama_sekolah: string;
  bentuk: 'SMA' | 'SMK' | 'MA';
  status: 'Negeri' | 'Swasta' | 'NEGERI' | 'SWASTA';
  alamat?: string;
  kecamatan: string;
  kabupaten_kota: string;
  provinsi: string;
  website?: string | null;
  slug?: string;
  pendaftaran_status?: string | null;
  pendaftaran_link?: string | null;
}

export interface SearchSchoolParams {
  query?: string;
  bentuk?: 'SMA' | 'SMK' | 'MA' | 'all';
  provinsi?: string;
  kabupaten?: string;
  kecamatan?: string;
  status?: string;
  limit?: number;
  page?: number;
  sortBy?: 'relevance' | 'name_asc' | 'name_desc';
  signal?: AbortSignal;
}

export interface SearchSchoolResponse {
  success: boolean;
  data: SchoolItem[];
  total: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  responseTimeMs?: number;
}

export interface SchoolFilterMetadata {
  provinsiList: string[];
  kabupatenList: string[];
  kecamatanMap: Record<string, string[]>;
  kabupatenByProvinsi?: Record<string, string[]>;
}

export interface SchoolStats {
  totalSekolah: number;
  totalSMA: number;
  totalSMK: number;
  totalMA: number;
  totalNegeri: number;
  totalSwasta: number;
}

/**
 * Searches schools by hitting backend SQLite API (/api/schools)
 * with graceful in-memory fallback to Kemendikdasmen / Dapodik dataset.
 */
export async function searchSchoolsApi(params: SearchSchoolParams): Promise<SearchSchoolResponse> {
  const {
    query = '',
    bentuk,
    provinsi,
    kabupaten,
    kecamatan,
    status,
    limit = 20,
    page = 1,
    sortBy = 'relevance',
    signal,
  } = params;

  try {
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    if (bentuk && bentuk !== 'all') searchParams.set('bentuk', bentuk);
    if (provinsi && provinsi !== 'Semua' && provinsi !== 'Semua Provinsi' && provinsi !== 'all') {
      searchParams.set('provinsi', provinsi);
    }
    if (kabupaten && kabupaten !== 'Semua' && kabupaten !== 'all') {
      searchParams.set('kabupaten', kabupaten);
    }
    if (kecamatan && kecamatan !== 'Semua' && kecamatan !== 'all') {
      searchParams.set('kecamatan', kecamatan);
    }
    if (status && status !== 'Semua' && status !== 'all') {
      searchParams.set('status', status);
    }
    searchParams.set('limit', String(limit));
    searchParams.set('page', String(page));
    searchParams.set('sortBy', sortBy);

    const response = await fetch(`/api/schools?${searchParams.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal,
    });

    if (response.ok) {
      const json = await response.json();
      if (json && Array.isArray(json.data)) {
        return {
          success: true,
          data: json.data.map((item: any) => ({
            id: item.id || `sch_${item.npsn}`,
            npsn: item.npsn || '',
            nama_sekolah: item.nama_sekolah || item.nama || '',
            bentuk: (item.bentuk || 'SMA') as 'SMA' | 'SMK' | 'MA',
            status: item.status || 'Negeri',
            alamat: item.alamat || '',
            kecamatan: item.kecamatan || '',
            kabupaten_kota: item.kabupaten_kota || item.kabupatenKota || '',
            provinsi: item.provinsi || '',
            website: item.website || null,
            slug: item.slug || '',
            pendaftaran_status: item.pendaftaran_status || null,
            pendaftaran_link: item.pendaftaran_link || null,
          })),
          total: json.total ?? json.data.length,
          page: json.page ?? page,
          limit: json.limit ?? limit,
          totalPages: json.totalPages ?? 1,
          responseTimeMs: json.responseTimeMs,
        };
      }
    }
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw err;
    }
    console.warn('Fallback to local Kemendikdasmen school database:', err);
  }

  // Graceful in-memory fallback
  const localResults = searchSekolahKemendikdasmen(query, {
    bentuk: bentuk === 'all' ? undefined : (bentuk as any),
    provinsi: provinsi && provinsi !== 'Semua' && provinsi !== 'Semua Provinsi' ? provinsi : undefined,
    kabupatenKota: kabupaten && kabupaten !== 'Semua' ? kabupaten : undefined,
    limit,
  });

  const mapped: SchoolItem[] = localResults.map((s) => ({
    id: s.id || `sch_${s.npsn}`,
    npsn: s.npsn,
    nama_sekolah: s.nama,
    bentuk: (s.bentuk === 'MAK' ? 'SMK' : s.bentuk) as 'SMA' | 'SMK' | 'MA',
    status: s.status,
    alamat: s.alamat,
    kecamatan: s.kecamatan || '',
    kabupaten_kota: s.kabupatenKota,
    provinsi: s.provinsi,
  }));

  // Handle custom entry if user typed a school name that isn't in preset
  if (query.trim().length >= 3 && mapped.length === 0) {
    let detectedBentuk: 'SMA' | 'SMK' | 'MA' = 'SMA';
    const cleanLower = query.toLowerCase();
    if (/\bsmk\b|\bsmkn\b|\bsmks\b/i.test(cleanLower)) detectedBentuk = 'SMK';
    else if (/\bma\b|\bman\b|\bmas\b|madrasah|assalam/i.test(cleanLower)) detectedBentuk = 'MA';

    let detectedStatus: 'Negeri' | 'Swasta' = 'Swasta';
    if (/\bnegeri\b|\bsman\b|\bsmkn\b|\bman\b/i.test(cleanLower)) {
      detectedStatus = 'Negeri';
    } else if (/\bswasta\b|assalam|muhammadiyah|nu|smas|smks|mas|yayasan|pembina/i.test(cleanLower)) {
      detectedStatus = 'Swasta';
    }

    let detectedKab = kabupaten && kabupaten !== 'Semua' ? kabupaten : 'Kab. Temanggung';
    let detectedProv = provinsi && provinsi !== 'Semua' && provinsi !== 'Semua Provinsi' ? provinsi : 'Jawa Tengah';

    if (cleanLower.includes('temanggung')) {
      detectedKab = 'Kab. Temanggung';
      detectedProv = 'Jawa Tengah';
    } else if (cleanLower.includes('semarang')) {
      detectedKab = 'Kota Semarang';
      detectedProv = 'Jawa Tengah';
    } else if (cleanLower.includes('kebumen')) {
      detectedKab = 'Kab. Kebumen';
      detectedProv = 'Jawa Tengah';
    } else if (cleanLower.includes('magelang')) {
      detectedKab = 'Kab. Magelang';
      detectedProv = 'Jawa Tengah';
    } else if (cleanLower.includes('surakarta') || cleanLower.includes('solo')) {
      detectedKab = 'Kota Surakarta';
      detectedProv = 'Jawa Tengah';
    } else if (cleanLower.includes('sidoarjo')) {
      detectedKab = 'Kab. Sidoarjo';
      detectedProv = 'Jawa Timur';
    } else if (cleanLower.includes('surabaya')) {
      detectedKab = 'Kota Surabaya';
      detectedProv = 'Jawa Timur';
    }

    mapped.push({
      id: `custom_${Date.now()}`,
      nama_sekolah: query.toUpperCase().trim(),
      bentuk: bentuk && bentuk !== 'all' ? bentuk : detectedBentuk,
      status: detectedStatus,
      npsn: `${Math.floor(10000000 + Math.random() * 90000000)}`,
      kabupaten_kota: detectedKab,
      provinsi: detectedProv,
      kecamatan: 'Kemendikdasmen RI',
      alamat: 'Alamat Terdaftar Siswa',
    });
  }

  return {
    success: true,
    data: mapped,
    total: mapped.length,
    page: 1,
    limit,
    totalPages: 1,
  };
}

/**
 * Fetches available filter choices (Provinces, Regencies, Districts)
 */
export async function fetchSchoolFilters(): Promise<SchoolFilterMetadata> {
  try {
    const res = await fetch('/api/schools/filters');
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return {
          provinsiList: data.provinsiList,
          kabupatenList: data.kabupatenList,
          kecamatanMap: data.kecamatanMap,
          kabupatenByProvinsi: data.kabupatenByProvinsi,
        };
      }
    }
  } catch (err) {
    console.warn('Could not fetch filters from server, using local fallback:', err);
  }

  // Fallback metadata
  const kabList = WILAYAH_JAWA_TIMUR.map((w) => w.namaWilayah);
  const kecMap: Record<string, string[]> = {};
  for (const k of kabList) {
    kecMap[k] = [];
  }

  return {
    provinsiList: DAFTAR_PROVINSI,
    kabupatenList: kabList,
    kecamatanMap: kecMap,
  };
}

/**
 * Fetches school statistics aggregated by region
 */
export async function fetchSchoolStats(
  provinsi?: string,
  kabupaten?: string,
  bentuk?: string
): Promise<SchoolStats> {
  try {
    const params = new URLSearchParams();
    if (provinsi) params.set('provinsi', provinsi);
    if (kabupaten) params.set('kabupaten', kabupaten);
    if (bentuk) params.set('bentuk', bentuk);

    const res = await fetch(`/api/schools/stats?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return {
          totalSekolah: data.totalSekolah || 0,
          totalSMA: data.totalSMA || 0,
          totalSMK: data.totalSMK || 0,
          totalMA: data.totalMA || 0,
          totalNegeri: data.totalNegeri || 0,
          totalSwasta: data.totalSwasta || 0,
        };
      }
    }
  } catch (err) {
    console.warn('Could not fetch school stats, using local estimate:', err);
  }

  // Fallback estimates
  const total = SEKOLAH_KEMENDIKDASMEN.length;
  return {
    totalSekolah: total,
    totalSMA: SEKOLAH_KEMENDIKDASMEN.filter((s) => s.bentuk === 'SMA').length,
    totalSMK: SEKOLAH_KEMENDIKDASMEN.filter((s) => s.bentuk === 'SMK').length,
    totalMA: SEKOLAH_KEMENDIKDASMEN.filter((s) => s.bentuk === 'MA').length,
    totalNegeri: SEKOLAH_KEMENDIKDASMEN.filter((s) => s.status === 'Negeri').length,
    totalSwasta: SEKOLAH_KEMENDIKDASMEN.filter((s) => s.status === 'Swasta').length,
  };
}
