import { StudentProfile } from '../types';

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  createdTime?: string;
  modifiedTime?: string;
  webViewLink?: string;
  iconLink?: string;
  size?: string;
}

export interface SpreadsheetRow {
  date: string;
  type: string;
  detail: string;
  scoreOrCount: string;
  notes: string;
}

/**
 * List files from Google Drive
 */
export async function listDriveFiles(
  accessToken: string,
  searchQuery: string = ''
): Promise<DriveFileItem[]> {
  try {
    let q = "trashed = false";
    if (searchQuery.trim()) {
      const sanitized = searchQuery.replace(/'/g, "\\'");
      q += ` and name contains '${sanitized}'`;
    }

    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.searchParams.append('pageSize', '25');
    url.searchParams.append('fields', 'files(id, name, mimeType, createdTime, modifiedTime, webViewLink, iconLink, size)');
    url.searchParams.append('orderBy', 'modifiedTime desc');
    url.searchParams.append('q', q);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${res.status}: Gagal mengambil berkas Drive.`);
    }

    const data = await res.json();
    return data.files || [];
  } catch (error: any) {
    console.error('listDriveFiles error:', error);
    throw error;
  }
}

/**
 * Create a simple text / markdown / JSON file in Google Drive
 */
export async function createDriveFile(
  accessToken: string,
  name: string,
  content: string,
  mimeType: string = 'text/plain'
): Promise<DriveFileItem> {
  try {
    const metadata = {
      name,
      mimeType,
    };

    const boundary = 'foo_bar_baz_think_smart';
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    const multipartRequestBody =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      `Content-Type: ${mimeType}\r\n\r\n` +
      content +
      closeDelimiter;

    const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,createdTime', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${res.status}: Gagal membuat file di Drive.`);
    }

    return await res.json();
  } catch (error: any) {
    console.error('createDriveFile error:', error);
    throw error;
  }
}

/**
 * Delete a file from Google Drive
 */
export async function deleteDriveFile(
  accessToken: string,
  fileId: string
): Promise<boolean> {
  try {
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok && res.status !== 204) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${res.status}: Gagal menghapus file dari Drive.`);
    }

    return true;
  } catch (error: any) {
    console.error('deleteDriveFile error:', error);
    throw error;
  }
}

/**
 * Create a new Google Spreadsheet with structured headers
 */
export async function createSpreadsheet(
  accessToken: string,
  title: string,
  headers: string[] = ['Tanggal', 'Kategori Belajar', 'Detail / Judul', 'Skor / Jumlah', 'Catatan Progres']
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  try {
    const requestBody = {
      properties: {
        title,
      },
      sheets: [
        {
          properties: {
            title: 'Laporan Progres Belajar',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: headers.map((h) => ({
                    userEnteredValue: { stringValue: h },
                    userEnteredFormat: {
                      textFormat: { bold: true, foregroundColorStyle: { rgbColor: { red: 1, green: 1, blue: 1 } } },
                      backgroundColorStyle: { rgbColor: { red: 0.25, green: 0.35, blue: 0.75 } },
                      horizontalAlignment: 'CENTER',
                    },
                  })),
                },
              ],
            },
          ],
        },
      ],
    };

    const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${res.status}: Gagal membuat Google Spreadsheet.`);
    }

    const data = await res.json();
    return {
      spreadsheetId: data.spreadsheetId,
      spreadsheetUrl: data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`,
    };
  } catch (error: any) {
    console.error('createSpreadsheet error:', error);
    throw error;
  }
}

/**
 * Append rows to a Google Spreadsheet
 */
export async function appendSheetRows(
  accessToken: string,
  spreadsheetId: string,
  range: string = 'A1',
  values: any[][] = []
): Promise<boolean> {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${res.status}: Gagal menambahkan data ke Spreadsheet.`);
    }

    return true;
  } catch (error: any) {
    console.error('appendSheetRows error:', error);
    throw error;
  }
}

/**
 * Read rows from a Google Spreadsheet
 */
export async function getSheetRows(
  accessToken: string,
  spreadsheetId: string,
  range: string = 'A1:E50'
): Promise<any[][]> {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${res.status}: Gagal membaca data dari Spreadsheet.`);
    }

    const data = await res.json();
    return data.values || [];
  } catch (error: any) {
    console.error('getSheetRows error:', error);
    throw error;
  }
}

/**
 * Export full student profile & study stats to a new or existing Google Spreadsheet
 */
export async function exportStudentDataToSheets(
  accessToken: string,
  profile: StudentProfile,
  existingSpreadsheetId?: string
): Promise<{ spreadsheetId: string; spreadsheetUrl: string; rowCount: number }> {
  let spreadsheetId = existingSpreadsheetId;
  let spreadsheetUrl = '';

  if (!spreadsheetId) {
    const created = await createSpreadsheet(
      accessToken,
      `Think Smart English - Raport & Progres ${profile.name}`,
      ['Tanggal Sync', 'Kategori', 'Subjek / Materi', 'Nilai / Status', 'Catatan Detail']
    );
    spreadsheetId = created.spreadsheetId;
    spreadsheetUrl = created.spreadsheetUrl;
  } else {
    spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  }

  const todayStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const rowsToAppend: any[][] = [
    // Header summary row
    [todayStr, 'Ringkasan Profil', profile.name, `Kelas ${profile.classGrade} ${profile.major || ''}`, `Sekolah: ${profile.schoolName || 'TS Student'}`],
    [todayStr, 'Statistik Belajar', 'Streak Harian', `${profile.streakDays} Hari`, `Total menit: ${profile.totalStudyMinutes} mins`],
    [todayStr, 'Statistik Belajar', 'Kosakata Dikuasai', `${profile.vocabularyMastered} Kata`, `Universal Prestige: ${profile.universalPrestige || 0}`],
    [todayStr, 'Statistik Belajar', 'Tenses Selesai', `${profile.completedLessons?.length || 0} / 16 Unit`, `Target UTBK: ${profile.targetUtbkScore || '750+'}`],
  ];

  // Append Quiz Scores if any
  if (profile.quizScores && Object.keys(profile.quizScores).length > 0) {
    for (const [quizKey, score] of Object.entries(profile.quizScores)) {
      rowsToAppend.push([
        todayStr,
        'Kuis Tenses & UTBK',
        quizKey.toUpperCase(),
        `Skor: ${score}%`,
        score >= 80 ? 'Sangat Baik (Mastered)' : score >= 60 ? 'Cukup Baik' : 'Perlu Perbaikan',
      ]);
    }
  }

  await appendSheetRows(accessToken, spreadsheetId, 'A1', rowsToAppend);

  return {
    spreadsheetId,
    spreadsheetUrl,
    rowCount: rowsToAppend.length,
  };
}
