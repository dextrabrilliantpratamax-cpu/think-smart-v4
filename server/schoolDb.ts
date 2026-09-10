import fs from "fs";
import path from "path";
import { DatabaseSync } from "node:sqlite";
import { SEKOLAH_KEMENDIKDASMEN, SekolahItem } from "../src/data/sekolahKemendikdasmenData";

export interface SchoolSummary {
  id: string;
  npsn: string;
  nama_sekolah: string;
  bentuk: "SMA" | "SMK" | "MA";
  status: "Negeri" | "Swasta";
  alamat: string;
  kecamatan: string;
  kabupaten_kota: string;
  provinsi: string;
  website: string | null;
  slug: string;
  pendaftaran_status: string | null;
  pendaftaran_link: string | null;
}

export interface SchoolDetail extends SchoolSummary {
  desa_kelurahan: string | null;
  kode_pos: string | null;
  telepon: string | null;
  email: string | null;
  pendaftaran_periode: string | null;
  pendaftaran_jalur: string | null;
  pendaftaran_syarat: string | null;
  pendaftaran_sumber: string | null;
}

export interface SearchOptions {
  query?: string;
  provinsi?: string;
  kabupaten?: string;
  kecamatan?: string;
  bentuk?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: "relevance" | "name_asc" | "name_desc";
}

// Bump this whenever the seed dataset changes so existing databases are rebuilt.
const SCHOOL_DATA_VERSION = 2;

let dbInstance: DatabaseSync | null = null;

export function getSchoolDb(): DatabaseSync {
  if (!dbInstance) {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dbPath = path.join(dataDir, "sekolah_jatim.db");
    const isNewDb = !fs.existsSync(dbPath);

    dbInstance = new DatabaseSync(dbPath, { open: true });

    // Performance pragmas
    try {
      dbInstance.exec("PRAGMA journal_mode = WAL;");
      dbInstance.exec("PRAGMA synchronous = NORMAL;");
      dbInstance.exec("PRAGMA cache_size = -64000;"); // 64MB cache
      dbInstance.exec("PRAGMA temp_store = MEMORY;");
    } catch (e) {
      console.warn("Pragma setup notice:", e);
    }

    // Initialize schema if newly created or table missing
    dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS schools (
        id TEXT PRIMARY KEY,
        npsn TEXT,
        nama_sekolah TEXT NOT NULL,
        bentuk TEXT NOT NULL,
        status TEXT NOT NULL,
        alamat TEXT,
        desa_kelurahan TEXT,
        kecamatan TEXT,
        kabupaten_kota TEXT NOT NULL,
        provinsi TEXT NOT NULL,
        kode_pos TEXT,
        telepon TEXT,
        email TEXT,
        website TEXT,
        slug TEXT,
        pendaftaran_status TEXT,
        pendaftaran_periode TEXT,
        pendaftaran_jalur TEXT,
        pendaftaran_syarat TEXT,
        pendaftaran_link TEXT,
        pendaftaran_sumber TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_schools_npsn ON schools(npsn);
      CREATE INDEX IF NOT EXISTS idx_schools_nama ON schools(nama_sekolah);
      CREATE INDEX IF NOT EXISTS idx_schools_kabupaten ON schools(kabupaten_kota);
      CREATE INDEX IF NOT EXISTS idx_schools_provinsi ON schools(provinsi);
      CREATE INDEX IF NOT EXISTS idx_schools_bentuk ON schools(bentuk);
      CREATE INDEX IF NOT EXISTS idx_schools_status ON schools(status);
    `);

    // Reseed when the DB is empty, undersized, or built from an older dataset version.
    const versionRow = dbInstance.prepare("PRAGMA user_version").get() as { user_version: number };
    const currentVersion = versionRow?.user_version ?? 0;
    const checkRow = dbInstance.prepare("SELECT COUNT(*) as count FROM schools").get() as { count: number };
    if (!checkRow || checkRow.count < 600 || currentVersion < SCHOOL_DATA_VERSION) {
      console.log(
        `Updating schools database... (current rows: ${checkRow?.count || 0}, version: ${currentVersion} -> ${SCHOOL_DATA_VERSION})`
      );
      seedInitialSchools(dbInstance);
      dbInstance.exec(`PRAGMA user_version = ${SCHOOL_DATA_VERSION};`);
      invalidateSchoolCache();
    }
  }
  return dbInstance;
}

// In-Memory Cache for fast static metadata
export interface FilterMetadata {
  provinsiList: string[];
  kabupatenList: string[];
  kecamatanMap: Record<string, string[]>;
  kabupatenByProvinsi: Record<string, string[]>;
}

let cachedFilters: FilterMetadata | null = null;
let cachedAllSchools: SchoolSummary[] | null = null;

export function invalidateSchoolCache() {
  cachedAllSchools = null;
  cachedFilters = null;
  statsCache.clear();
}

export function getAllSchoolsCached(): SchoolSummary[] {
  if (!cachedAllSchools) {
    const db = getSchoolDb();
    cachedAllSchools = db.prepare(`
      SELECT id, npsn, nama_sekolah, bentuk, status, alamat, kecamatan,
             kabupaten_kota, provinsi, website, slug, pendaftaran_status, pendaftaran_link
      FROM schools
      ORDER BY nama_sekolah ASC
    `).all() as unknown as SchoolSummary[];
  }
  return cachedAllSchools;
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

interface ParsedQuery {
  raw: string;
  normalized: string;
  tokens: string[];
  targetNumber: string | null;
  targetBentuk: 'SMA' | 'SMK' | 'MA' | null;
  targetStatus: 'Negeri' | 'Swasta' | null;
}

function parseSchoolQuery(raw: string): ParsedQuery {
  let q = (raw || '').trim().toUpperCase();

  // Location acronyms & aliases across Indonesia
  q = q
    .replace(/\bSOLO\b/g, 'SURAKARTA')
    .replace(/\b(JOGJA|YOGYA)\b/g, 'YOGYAKARTA')
    .replace(/\bSBY\b/g, 'SURABAYA')
    .replace(/\bJKT\b/g, 'JAKARTA')
    .replace(/\bBDG\b/g, 'BANDUNG')
    .replace(/\bSMG\b/g, 'SEMARANG')
    .replace(/\bMGL\b/g, 'MAGELANG')
    .replace(/\bSRG\b/g, 'SRAGEN')
    .replace(/\bKLT\b/g, 'KLATEN')
    .replace(/\bBYL\b/g, 'BOYOLALI')
    .replace(/\bSKH\b/g, 'SUKOHARJO')
    .replace(/\bWNG\b/g, 'WONOGIRI')
    .replace(/\bKRA\b/g, 'KARANGANYAR')
    .replace(/\bMUH\b/g, 'MUHAMMADIYAH');

  // School acronym normalization
  q = q
    .replace(/\bSMK\s*(?:NEGERI|N)\s*(\d+)/g, 'SMKN $1')
    .replace(/\bSMA\s*(?:NEGERI|N)\s*(\d+)/g, 'SMAN $1')
    .replace(/\bMA\s*(?:NEGERI|N)\s*(\d+)/g, 'MAN $1')
    .replace(/\bSMK\s*(\d+)/g, 'SMKN $1')
    .replace(/\bSMA\s*(\d+)/g, 'SMAN $1')
    .replace(/\bMA\s*(\d+)/g, 'MAN $1')
    .replace(/\bSMK\s*(?:NEGERI|N)\b/g, 'SMKN')
    .replace(/\bSMA\s*(?:NEGERI|N)\b/g, 'SMAN')
    .replace(/\bMA\s*(?:NEGERI|N)\b/g, 'MAN');

  const numMatch = q.match(/\b(\d+)\b/);
  const targetNumber = numMatch ? numMatch[1] : null;

  let targetBentuk: 'SMA' | 'SMK' | 'MA' | null = null;
  if (/\b(SMK|SMKN|SMKS)\b/.test(q)) targetBentuk = 'SMK';
  else if (/\b(SMA|SMAN|SMAS)\b/.test(q)) targetBentuk = 'SMA';
  else if (/\b(MA|MAN|MAS)\b/.test(q)) targetBentuk = 'MA';

  let targetStatus: 'Negeri' | 'Swasta' | null = null;
  if (/\b(NEGERI|SMAN|SMKN|MAN)\b/.test(q)) targetStatus = 'Negeri';
  else if (/\b(SWASTA|SMAS|SMKS|MAS|MUHAMMADIYAH|BATIK|TARUNA|AL-AZHAR|LABSCHOOL|KANISIUS|PETRA|WARGA|KRISTEN|KATOLIK|ISLAM)\b/.test(q)) targetStatus = 'Swasta';

  const tokens = q
    .replace(/[^A-Z0-9\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0 && !['DI', 'KE', 'PADA', 'KAB', 'KOTA', 'PROV'].includes(t));

  return {
    raw,
    normalized: q,
    tokens,
    targetNumber,
    targetBentuk,
    targetStatus,
  };
}
const statsCache = new Map<string, any>();

export function getCachedFilters(): FilterMetadata {
  if (cachedFilters) return cachedFilters;

  const db = getSchoolDb();

  const provRows = db.prepare("SELECT DISTINCT provinsi FROM schools WHERE provinsi IS NOT NULL AND provinsi != '' ORDER BY provinsi ASC").all() as Array<{ provinsi: string }>;
  const provinsiList = provRows.map((r) => r.provinsi);

  const kabRows = db.prepare("SELECT DISTINCT kabupaten_kota, provinsi FROM schools WHERE kabupaten_kota IS NOT NULL AND kabupaten_kota != '' ORDER BY kabupaten_kota ASC").all() as Array<{ kabupaten_kota: string; provinsi: string }>;
  const kabupatenList = kabRows.map((r) => r.kabupaten_kota);

  const kabupatenByProvinsi: Record<string, string[]> = {};
  for (const p of provinsiList) {
    kabupatenByProvinsi[p] = [];
  }
  for (const r of kabRows) {
    if (!kabupatenByProvinsi[r.provinsi]) {
      kabupatenByProvinsi[r.provinsi] = [];
    }
    if (!kabupatenByProvinsi[r.provinsi].includes(r.kabupaten_kota)) {
      kabupatenByProvinsi[r.provinsi].push(r.kabupaten_kota);
    }
  }

  const kecRows = db.prepare("SELECT DISTINCT kabupaten_kota, kecamatan FROM schools WHERE kecamatan IS NOT NULL AND kecamatan != '' ORDER BY kabupaten_kota ASC, kecamatan ASC").all() as Array<{ kabupaten_kota: string; kecamatan: string }>;

  const kecamatanMap: Record<string, string[]> = {};
  for (const kab of kabupatenList) {
    kecamatanMap[kab] = [];
  }
  for (const row of kecRows) {
    if (!kecamatanMap[row.kabupaten_kota]) {
      kecamatanMap[row.kabupaten_kota] = [];
    }
    if (!kecamatanMap[row.kabupaten_kota].includes(row.kecamatan)) {
      kecamatanMap[row.kabupaten_kota].push(row.kecamatan);
    }
  }

  cachedFilters = { provinsiList, kabupatenList, kecamatanMap, kabupatenByProvinsi };
  return cachedFilters;
}

export function getSchoolStats(provinsi?: string, kabupaten?: string, bentuk?: string) {
  const cacheKey = `${provinsi || "all"}_${kabupaten || "all"}_${bentuk || "all"}`;
  if (statsCache.has(cacheKey)) {
    return statsCache.get(cacheKey);
  }

  const db = getSchoolDb();
  const whereClauses: string[] = [];
  const params: any[] = [];

  if (provinsi && provinsi !== "all" && provinsi !== "Semua" && provinsi !== "Semua Provinsi") {
    whereClauses.push("provinsi = ?");
    params.push(provinsi);
  }
  if (kabupaten && kabupaten !== "all" && kabupaten !== "Semua") {
    whereClauses.push("kabupaten_kota = ?");
    params.push(kabupaten);
  }
  if (bentuk && bentuk !== "all" && bentuk !== "Semua") {
    whereClauses.push("bentuk = ?");
    params.push(bentuk);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const totalRow = db.prepare(`SELECT COUNT(*) as count FROM schools ${whereSql}`).get(...params) as { count: number };
  
  const bentukRows = db.prepare(`SELECT bentuk, COUNT(*) as count FROM schools ${whereSql} GROUP BY bentuk`).all(...params) as Array<{ bentuk: string; count: number }>;
  
  const statusRows = db.prepare(`SELECT status, COUNT(*) as count FROM schools ${whereSql} GROUP BY status`).all(...params) as Array<{ status: string; count: number }>;

  const bentukCounts: Record<string, number> = { SMA: 0, SMK: 0, MA: 0 };
  for (const row of bentukRows) {
    if (row.bentuk) bentukCounts[row.bentuk] = row.count;
  }

  const statusCounts: Record<string, number> = { Negeri: 0, Swasta: 0 };
  for (const row of statusRows) {
    if (row.status) statusCounts[row.status] = row.count;
  }

  const result = {
    totalSekolah: totalRow?.count || 0,
    totalSMA: bentukCounts["SMA"] || 0,
    totalSMK: bentukCounts["SMK"] || 0,
    totalMA: bentukCounts["MA"] || 0,
    totalNegeri: statusCounts["Negeri"] || 0,
    totalSwasta: statusCounts["Swasta"] || 0,
  };

  statsCache.set(cacheKey, result);
  return result;
}

export function getSchoolById(id: string): SchoolDetail | null {
  const db = getSchoolDb();
  const row = db.prepare(`
    SELECT 
      id, npsn, nama_sekolah, bentuk, status, alamat, desa_kelurahan,
      kecamatan, kabupaten_kota, provinsi, kode_pos, telepon, email,
      website, slug, pendaftaran_status, pendaftaran_periode, pendaftaran_jalur,
      pendaftaran_syarat, pendaftaran_link, pendaftaran_sumber
    FROM schools
    WHERE id = ? OR slug = ? OR npsn = ?
    LIMIT 1
  `).get(id, id, id) as unknown as SchoolDetail | undefined;

  return row || null;
}

export function searchSchools(options: SearchOptions) {
  const startTime = performance.now();
  const allSchools = getAllSchoolsCached();

  const query = options.query?.trim() || "";
  const provinsi = options.provinsi?.trim() || "";
  const kabupaten = options.kabupaten?.trim() || "";
  const kecamatan = options.kecamatan?.trim() || "";
  const bentuk = options.bentuk?.trim() || "";
  const status = options.status?.trim() || "";
  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(options.limit) || 20));
  const offset = (page - 1) * limit;
  const sortBy = options.sortBy || "relevance";

  const cleanProv = (provinsi && provinsi !== "all" && provinsi !== "Semua" && provinsi !== "Semua Provinsi")
    ? provinsi.toUpperCase()
    : null;
  const cleanKab = (kabupaten && kabupaten !== "all" && kabupaten !== "Semua")
    ? kabupaten.toUpperCase()
    : null;
  const cleanKec = (kecamatan && kecamatan !== "all" && kecamatan !== "Semua")
    ? kecamatan.toUpperCase()
    : null;
  const cleanBentuk = (bentuk && bentuk !== "all" && bentuk !== "Semua")
    ? bentuk.toUpperCase()
    : null;
  const cleanStatus = (status && status !== "all" && status !== "Semua")
    ? status.toUpperCase()
    : null;

  // 1. Initial filter pass based on criteria
  const filteredCandidates = allSchools.filter((s) => {
    if (cleanProv && (s.provinsi || "").toUpperCase() !== cleanProv) return false;
    if (cleanKab) {
      const sKab = (s.kabupaten_kota || "").toUpperCase();
      if (!sKab.includes(cleanKab) && !cleanKab.includes(sKab)) return false;
    }
    if (cleanKec) {
      const sKec = (s.kecamatan || "").toUpperCase();
      if (!sKec.includes(cleanKec) && !cleanKec.includes(sKec)) return false;
    }
    if (cleanBentuk && (s.bentuk || "").toUpperCase() !== cleanBentuk) return false;
    if (cleanStatus && (s.status || "").toUpperCase() !== cleanStatus) return false;
    return true;
  });

  // If no query string, return standard filtered & sorted results instantly
  if (!query) {
    let sorted = [...filteredCandidates];
    if (sortBy === "name_desc") {
      sorted.sort((a, b) => b.nama_sekolah.localeCompare(a.nama_sekolah));
    } else {
      sorted.sort((a, b) => a.nama_sekolah.localeCompare(b.nama_sekolah));
    }

    const total = sorted.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const paged = sorted.slice(offset, offset + limit);
    const responseTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

    return {
      success: true,
      total,
      page,
      limit,
      totalPages,
      responseTimeMs,
      data: paged,
    };
  }

  // 2. Query is present: High-speed fuzzy, typo-tolerant token evaluation
  const parsed = parseSchoolQuery(query);
  const scored: { school: SchoolSummary; score: number }[] = [];

  for (const s of filteredCandidates) {
    // If query specifically requested a bentuk (e.g. SMA, SMK, MA) and no conflicting explicit filter was set
    if (parsed.targetBentuk && !cleanBentuk && s.bentuk !== parsed.targetBentuk) {
      continue;
    }

    const sName = (s.nama_sekolah || "").toUpperCase();
    const sNpsn = (s.npsn || "").toUpperCase();
    const sNumMatch = sName.match(/\b(\d+)\b/);
    const sNumber = sNumMatch ? sNumMatch[1] : null;

    // Strict number matching if specified:
    // e.g. "SMA N 1 SURAKRTA" must strictly prioritize or match school #1, never school #2
    if (parsed.targetNumber && sNumber && sNumber !== parsed.targetNumber) {
      continue;
    }

    // Direct NPSN match gets immediate maximum score
    if (sNpsn && sNpsn === parsed.normalized) {
      scored.push({ school: s, score: 100 });
      continue;
    }

    const sFull = `${sName} ${sNpsn} ${s.kabupaten_kota || ""} ${s.kecamatan || ""} ${s.provinsi || ""} ${s.alamat || ""}`.toUpperCase();
    const sTokens = sFull.replace(/[^A-Z0-9\s]/g, " ").trim().split(/\s+/).filter(Boolean);

    let tokenScore = 0;
    let matchedSpecificTokens = 0;
    const specificTokens = parsed.tokens.filter(
      (t) => t !== parsed.targetNumber && !["SMA", "SMAN", "SMK", "SMKN", "MA", "MAN"].includes(t)
    );

    for (const qTok of parsed.tokens) {
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
            bestSim = Math.max(bestSim, 2.2); // 1-letter typo e.g. SURAKRTA -> SURAKARTA, SRAGRN -> SRAGEN
            continue;
          } else if (dist === 2 && qTok.length >= 6 && sTok.length >= 6) {
            bestSim = Math.max(bestSim, 1.6); // 2-letter typo for longer names
            continue;
          }
        }

        // Prefix and substring matching (only for tokens with 3+ characters to avoid false matches on single letters)
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

    // If query has specific name/location tokens (e.g. SURAKRTA, SRAGEN, BATIK)
    // but this school matched none of them, discard it so unrelated schools don't clutter the top
    if (specificTokens.length > 0 && matchedSpecificTokens === 0) {
      continue;
    }

    let finalScore = tokenScore;

    // Bonus for matching specific school number
    if (parsed.targetNumber && sNumber === parsed.targetNumber) {
      finalScore += 3.0;
    }

    // Bonus if name directly contains query string or normalized query
    if (sName.includes(parsed.normalized) || sName.includes(query.toUpperCase())) {
      finalScore += 3.0;
    }

    // Bonus if inferred status matches
    if (parsed.targetStatus && s.status === parsed.targetStatus) {
      finalScore += 0.5;
    }

    // Minimum match threshold
    if (finalScore >= 2.0) {
      scored.push({ school: s, score: finalScore });
    }
  }

  // Fallback: If no matches found with strict threshold, relax threshold so user is never stranded
  if (scored.length === 0 && filteredCandidates.length > 0) {
    for (const s of filteredCandidates) {
      const sFull = `${s.nama_sekolah} ${s.npsn} ${s.kabupaten_kota} ${s.kecamatan} ${s.provinsi}`.toUpperCase();
      let matchCount = 0;
      for (const qTok of parsed.tokens) {
        if (sFull.includes(qTok)) matchCount++;
      }
      if (matchCount > 0) {
        scored.push({ school: s, score: matchCount });
      }
    }
  }

  // Sorting
  if (sortBy === "name_asc") {
    scored.sort((a, b) => a.school.nama_sekolah.localeCompare(b.school.nama_sekolah));
  } else if (sortBy === "name_desc") {
    scored.sort((a, b) => b.school.nama_sekolah.localeCompare(a.school.nama_sekolah));
  } else {
    // Relevance
    scored.sort((a, b) => b.score - a.score || a.school.nama_sekolah.localeCompare(b.school.nama_sekolah));
  }

  const total = scored.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const paged = scored.slice(offset, offset + limit).map((item) => item.school);
  const responseTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

  return {
    success: true,
    total,
    page,
    limit,
    totalPages,
    responseTimeMs,
    data: paged,
  };
}

// Seeder function with rich database across all provinces in Indonesia
export function seedInitialSchools(db: DatabaseSync) {
  db.exec("DELETE FROM schools;");

  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO schools (
      id, npsn, nama_sekolah, bentuk, status, alamat, desa_kelurahan,
      kecamatan, kabupaten_kota, provinsi, kode_pos, telepon, email,
      website, slug, pendaftaran_status, pendaftaran_periode, pendaftaran_jalur,
      pendaftaran_syarat, pendaftaran_link, pendaftaran_sumber
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?
    )
  `);

  // Track inserted NPSNs/names to ensure clean unique dataset
  const seenKeys = new Set<string>();
  let count = 0;

  db.exec("BEGIN");

  for (const s of SEKOLAH_KEMENDIKDASMEN) {
    const nama = s.nama.trim().toUpperCase();
    const npsn = s.npsn || `7000${Math.floor(1000 + Math.random() * 9000)}`;
    const kab = s.kabupatenKota || s.kabupaten_kota || 'Kabupaten';
    const prov = s.provinsi || 'Jawa Tengah';
    const bentuk = (s.bentuk === 'SMA' || s.bentuk === 'SMK' || s.bentuk === 'MA') ? s.bentuk : 'SMA';

    const cleanKab = kab.trim().toUpperCase().replace(/^(KAB\.|KOTA)\s*/, '');
    const dedupNameKab = `${nama}_${cleanKab}_${prov.trim().toUpperCase()}`;
    if (seenKeys.has(npsn) || seenKeys.has(dedupNameKab)) continue;
    seenKeys.add(npsn);
    seenKeys.add(dedupNameKab);
    const status = (s.status?.toUpperCase() === 'NEGERI' || s.status === 'Negeri') ? 'Negeri' : 'Swasta';
    const kec = s.kecamatan || 'Kecamatan';
    const alamat = s.alamat || `Jl. Pendidikan, ${kab}`;
    const slug = nama.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    insertStmt.run(
      `sch_${npsn}`,
      npsn,
      nama,
      bentuk,
      status,
      alamat,
      kec, // desa_kelurahan
      kec,
      kab,
      prov,
      "60000", // kode_pos
      "(021) 800000", // telepon
      `info@${slug}.sch.id`, // email
      `https://${slug}.sch.id`, // website
      slug,
      "Terbuka", // pendaftaran_status
      "2026/2027", // pendaftaran_periode
      "Zonasi / Prestasi / Afirmasi", // pendaftaran_jalur
      "Ijazah SMP / SKL, Akta Kelahiran, KK", // pendaftaran_syarat
      `https://ppdb.${slug}.sch.id`, // pendaftaran_link
      "Dapodik Kemendikdasmen RI" // pendaftaran_sumber
    );
    count++;
  }

  // Seed the full SMA/SMK directory for Pulau Jawa (Dapodik export)
  const jawaCount = seedJawaSchools(insertStmt, seenKeys);

  db.exec("COMMIT");

  console.log(
    `Seeded ${count} base schools + ${jawaCount} Pulau Jawa schools into SQLite database successfully.`
  );
}

interface JawaRawSchool {
  npsn: string;
  nama: string;
  bentuk: "SMA" | "SMK" | "MA";
  status: "Negeri" | "Swasta";
  kabupatenKota: string;
  provinsi: string;
  kecamatan: string;
  alamat: string;
}

let cachedJawaSchools: JawaRawSchool[] | null = null;

function loadJawaSchools(): JawaRawSchool[] {
  if (cachedJawaSchools) return cachedJawaSchools;
  try {
    const jsonPath = path.join(process.cwd(), "server", "data", "sekolahJawa.json");
    if (!fs.existsSync(jsonPath)) {
      console.warn("Pulau Jawa school dataset not found at", jsonPath);
      cachedJawaSchools = [];
      return cachedJawaSchools;
    }
    const raw = fs.readFileSync(jsonPath, "utf8");
    cachedJawaSchools = JSON.parse(raw) as JawaRawSchool[];
  } catch (e) {
    console.warn("Failed to load Pulau Jawa school dataset:", e);
    cachedJawaSchools = [];
  }
  return cachedJawaSchools;
}

/**
 * Inserts the SMA/SMK directory for Pulau Jawa, reusing the caller's
 * prepared statement and dedup set so it stays consistent with the base seed.
 */
function seedJawaSchools(insertStmt: any, seenKeys: Set<string>): number {
  const schools = loadJawaSchools();
  let count = 0;

  for (const s of schools) {
    const nama = (s.nama || "").trim().toUpperCase();
    if (!nama) continue;
    const npsn = s.npsn || `8000${Math.floor(1000 + Math.random() * 9000)}`;
    const kab = s.kabupatenKota || "Kabupaten";
    const prov = s.provinsi || "Jawa";
    const bentuk = s.bentuk === "SMK" || s.bentuk === "MA" ? s.bentuk : "SMA";
    const status = s.status === "Negeri" ? "Negeri" : "Swasta";

    const cleanKab = kab.trim().toUpperCase().replace(/^(KAB\.|KOTA)\s*/, "");
    const dedupNameKab = `${nama}_${cleanKab}_${prov.trim().toUpperCase()}`;
    if (seenKeys.has(npsn) || seenKeys.has(dedupNameKab)) continue;
    seenKeys.add(npsn);
    seenKeys.add(dedupNameKab);

    const kec = s.kecamatan || "Kecamatan";
    const alamat = s.alamat || `Jl. Pendidikan, ${kab}`;
    const slug = nama.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    insertStmt.run(
      `sch_${npsn}`,
      npsn,
      nama,
      bentuk,
      status,
      alamat,
      kec, // desa_kelurahan
      kec,
      kab,
      prov,
      "00000", // kode_pos
      null, // telepon
      `info@${slug}.sch.id`,
      `https://${slug}.sch.id`,
      slug,
      "Terbuka",
      "2026/2027",
      "Zonasi / Prestasi / Afirmasi",
      "Ijazah SMP / SKL, Akta Kelahiran, KK",
      `https://ppdb.${slug}.sch.id`,
      "Dapodik Kemendikdasmen RI"
    );
    count++;
  }

  return count;
}

export interface DapodikRawSchool {
  satuanPendidikanId: string;
  npsn: string;
  nama: string;
  totalPd?: number;
  totalRombel?: number;
  bentukPendidikan: string;
  bentukPendidikanGroup?: string;
  jenisPendidikan?: string;
  statusSatuanPendidikan: string;
  pembina?: string;
  kodeWilayah?: string;
  namaDesa?: string;
  namaKecamatan: string;
  namaKabupaten: string;
  namaProvinsi: string;
}

/**
 * Imports raw Dapodik API JSON records into the local SQLite database.
 * Automatically normalizes fields and filters/maps to SMA, SMK, and MA.
 */
export function importDapodikSchools(items: DapodikRawSchool[]) {
  if (!Array.isArray(items) || items.length === 0) {
    return { success: false, imported: 0, skipped: 0, message: "Data kosong" };
  }

  const db = getSchoolDb();
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO schools (
      id, npsn, nama_sekolah, bentuk, status, alamat, desa_kelurahan,
      kecamatan, kabupaten_kota, provinsi, kode_pos, telepon, email,
      website, slug, pendaftaran_status, pendaftaran_periode, pendaftaran_jalur,
      pendaftaran_syarat, pendaftaran_link, pendaftaran_sumber
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?
    )
  `);

  let imported = 0;
  let skipped = 0;

  for (const item of items) {
    if (!item.nama || !item.npsn) {
      skipped++;
      continue;
    }

    const rawBentuk = (item.bentukPendidikan || '').toUpperCase().trim();
    const rawNama = item.nama.toUpperCase().trim();
    
    // Determine bentuk: prioritize explicitly matching SMA, SMK, MA, or infer from name
    let bentuk: 'SMA' | 'SMK' | 'MA' | null = null;
    if (rawBentuk === 'SMA' || rawBentuk === 'SMAS' || rawBentuk === 'SMAN') bentuk = 'SMA';
    else if (rawBentuk === 'SMK' || rawBentuk === 'SMKS' || rawBentuk === 'SMKN') bentuk = 'SMK';
    else if (rawBentuk === 'MA' || rawBentuk === 'MAN' || rawBentuk === 'MAS') bentuk = 'MA';
    else if (/\bSMK\b|SMKN|SMKS/.test(rawNama)) bentuk = 'SMK';
    else if (/\bSMA\b|SMAN|SMAS/.test(rawNama)) bentuk = 'SMA';
    else if (/\bMA\b|\bMAN\b|\bMAS\b|MADRASAH ALIYAH/.test(rawNama)) bentuk = 'MA';

    // If it's pure PAUD, TK, SD, SMP, PKBM and cannot be mapped to SMA/SMK/MA, skip or track
    if (!bentuk) {
      skipped++;
      continue;
    }

    const status = (item.statusSatuanPendidikan || '').toUpperCase() === 'NEGERI' ? 'Negeri' : 'Swasta';
    const cleanKec = (item.namaKecamatan || '').replace(/^KEC\.\s*/i, '').trim();
    const cleanKab = (item.namaKabupaten || '').trim();
    const cleanProv = (item.namaProvinsi || '').replace(/^PROV\.\s*/i, '').trim();
    const cleanDesa = item.namaDesa && item.namaDesa !== '-' ? item.namaDesa.trim() : '';
    const alamat = cleanDesa ? `Desa ${cleanDesa}, Kec. ${cleanKec}, ${cleanKab}` : `Kec. ${cleanKec}, ${cleanKab}`;
    const slug = rawNama.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = item.satuanPendidikanId || `sch_${item.npsn}`;

    insertStmt.run(
      id,
      item.npsn,
      rawNama,
      bentuk,
      status,
      alamat,
      cleanDesa || cleanKec,
      cleanKec,
      cleanKab,
      cleanProv,
      "50000",
      null,
      `info@${slug}.sch.id`,
      `https://${slug}.sch.id`,
      slug,
      "Terbuka",
      "2026/2027",
      "Zonasi / Prestasi / Afirmasi",
      "Ijazah SMP / SKL, Akta Kelahiran, KK",
      `https://dapo.kemdikbud.go.id/sekolah/${item.npsn}`,
      item.pembina || "Dapodik Kemendikdasmen RI"
    );
    imported++;
  }

  // Invalidate in-memory caches
  invalidateSchoolCache();

  return {
    success: true,
    imported,
    skipped,
    total: items.length,
    message: `Berhasil mengimpor ${imported} data sekolah SMA/SMK/MA (${skipped} data tingkat lain dilewati).`
  };
}
