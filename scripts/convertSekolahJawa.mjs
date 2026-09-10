import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlPath = path.join(__dirname, "sekolah_jawa.sql");
const outDir = path.join(__dirname, "..", "server", "data");
const outPath = path.join(outDir, "sekolahJawa.json");

const raw = fs.readFileSync(sqlPath, "utf8");

/**
 * Parse a single "(...)" tuple into its string fields, respecting the
 * SQL escaped single-quote convention ('' -> ').
 */
function parseTuple(line) {
  const fields = [];
  let i = 0;
  const n = line.length;
  // skip until first "("
  const start = line.indexOf("(");
  if (start === -1) return null;
  i = start + 1;
  while (i < n) {
    // skip whitespace and commas between fields
    while (i < n && (line[i] === " " || line[i] === "," || line[i] === "\t")) i++;
    if (i >= n || line[i] === ")") break;
    if (line[i] !== "'") return null; // unexpected, all fields are quoted strings
    i++; // consume opening quote
    let val = "";
    while (i < n) {
      if (line[i] === "'") {
        if (line[i + 1] === "'") {
          val += "'";
          i += 2;
          continue;
        }
        i++; // consume closing quote
        break;
      }
      val += line[i];
      i++;
    }
    fields.push(val);
  }
  return fields;
}

// Normalize province names to match the app's DAFTAR_PROVINSI values
const PROVINCE_ALIASES = {
  "D.K.I. JAKARTA": "DKI Jakarta",
  "DKI JAKARTA": "DKI Jakarta",
  "D.I. YOGYAKARTA": "D.I. Yogyakarta",
  "DAERAH ISTIMEWA YOGYAKARTA": "D.I. Yogyakarta",
  "JAWA BARAT": "Jawa Barat",
  "JAWA TENGAH": "Jawa Tengah",
  "JAWA TIMUR": "Jawa Timur",
  BANTEN: "Banten",
};
const cleanProv = (s) => {
  const stripped = (s || "").replace(/^Prov\.\s*/i, "").replace(/^Prov\s+/i, "").trim();
  return PROVINCE_ALIASES[stripped.toUpperCase()] || stripped;
};
const cleanKec = (s) => (s || "").replace(/^Kec\.\s*/i, "").trim();

const results = [];
const lines = raw.split("\n");
for (const lineRaw of lines) {
  const line = lineRaw.trim();
  if (!line.startsWith("(")) continue;
  const f = parseTuple(line);
  // Expected columns: kode_prop, propinsi, kode_kab_kota, kabupaten_kota,
  // kode_kec, kecamatan, npsn, sekolah, bentuk, status, alamat_jalan
  if (!f || f.length < 11) continue;

  const [, propinsi, , kabupaten_kota, , kecamatan, npsn, sekolah, bentuk, status, alamat] = f;

  const bentukUpper = (bentuk || "").toUpperCase().trim();
  const mappedBentuk = bentukUpper === "SMK" ? "SMK" : bentukUpper === "MA" ? "MA" : "SMA";

  results.push({
    npsn: (npsn || "").trim(),
    nama: (sekolah || "").trim().toUpperCase(),
    bentuk: mappedBentuk,
    status: (status || "").toUpperCase().startsWith("N") ? "Negeri" : "Swasta",
    kabupatenKota: (kabupaten_kota || "").trim(),
    provinsi: cleanProv(propinsi),
    kecamatan: cleanKec(kecamatan),
    alamat: (alamat || "").trim(),
  });
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(results));

// Quick summary
const byProv = {};
for (const r of results) byProv[r.provinsi] = (byProv[r.provinsi] || 0) + 1;
console.log(`Parsed ${results.length} schools into ${outPath}`);
console.log("By province:", byProv);
