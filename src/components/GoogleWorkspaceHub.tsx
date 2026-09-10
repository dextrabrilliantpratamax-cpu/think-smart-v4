import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { StudentProfile } from '../types';
import {
  listDriveFiles,
  createDriveFile,
  deleteDriveFile,
  createSpreadsheet,
  appendSheetRows,
  getSheetRows,
  exportStudentDataToSheets,
  DriveFileItem,
} from '../services/googleWorkspaceService';
import {
  FileSpreadsheet,
  HardDrive,
  FileText,
  Upload,
  Trash2,
  ExternalLink,
  RefreshCw,
  Search,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  FilePlus,
  ArrowRight,
  Database,
  Sparkles,
  ShieldCheck,
  Table,
  Layers,
  BookOpen,
  Award,
} from 'lucide-react';

interface GoogleWorkspaceHubProps {
  profile: StudentProfile;
}

export const GoogleWorkspaceHub: React.FC<GoogleWorkspaceHubProps> = ({ profile }) => {
  const { currentUser, accessToken, signInWithGoogle } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState<'sheets' | 'drive'>('sheets');

  // Drive state
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>([]);
  const [driveSearch, setDriveSearch] = useState<string>('');
  const [isLoadingDrive, setIsLoadingDrive] = useState<boolean>(false);
  const [driveError, setDriveError] = useState<string | null>(null);

  // Drive New File modal state
  const [newFileName, setNewFileName] = useState<string>('');
  const [newFileContent, setNewFileContent] = useState<string>('');
  const [newFileMime, setNewFileMime] = useState<string>('text/plain');
  const [isCreatingFile, setIsCreatingFile] = useState<boolean>(false);
  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState<boolean>(false);

  // Sheets state
  const [spreadsheetId, setSpreadsheetId] = useState<string>('');
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string>('');
  const [isExportingSheet, setIsExportingSheet] = useState<boolean>(false);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);
  const [sheetError, setSheetError] = useState<string | null>(null);

  // Custom Sheet Row Input
  const [customWord, setCustomWord] = useState<string>('');
  const [customMeaning, setCustomMeaning] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>('Grammar & Vocab');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [isAddingRow, setIsAddingRow] = useState<boolean>(false);

  // Sheet Reader / Viewer
  const [readSpreadsheetId, setReadSpreadsheetId] = useState<string>('');
  const [readRows, setReadRows] = useState<any[][]>([]);
  const [isReadingSheet, setIsReadingSheet] = useState<boolean>(false);

  // Confirmation Dialog States
  const [confirmAction, setConfirmAction] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionType: 'export_sheet' | 'add_row' | 'upload_file' | 'delete_file';
    targetId?: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
    actionType: 'export_sheet',
  });

  const isConnected = Boolean(currentUser && accessToken);

  // Fetch drive files when connected and tab changes to drive
  useEffect(() => {
    if (isConnected && activeSubTab === 'drive') {
      fetchDriveFiles();
    }
  }, [isConnected, activeSubTab]);

  const fetchDriveFiles = async () => {
    if (!accessToken) return;
    setIsLoadingDrive(true);
    setDriveError(null);
    try {
      const files = await listDriveFiles(accessToken, driveSearch);
      setDriveFiles(files);
    } catch (err: any) {
      setDriveError(err.message || 'Gagal memuat daftar berkas dari Google Drive.');
    } finally {
      setIsLoadingDrive(false);
    }
  };

  // Open confirmation for Export to Sheets
  const triggerExportSheetsModal = () => {
    setConfirmAction({
      isOpen: true,
      title: 'Export Progres ke Google Sheets?',
      description: `Sistem akan membuat atau memperbarui spreadsheet Google bernama "Think Smart English - Raport & Progres ${profile.name}" di akun Google Drive Anda.`,
      actionType: 'export_sheet',
    });
  };

  const handleConfirmExportSheet = async () => {
    if (!accessToken) return;
    setIsExportingSheet(true);
    setSheetError(null);
    setExportSuccessMessage(null);
    try {
      const result = await exportStudentDataToSheets(accessToken, profile, spreadsheetId || undefined);
      setSpreadsheetId(result.spreadsheetId);
      setSpreadsheetUrl(result.spreadsheetUrl);
      setExportSuccessMessage(`Berhasil mengeksport ${result.rowCount} entri progres belajar ke Google Sheets!`);
    } catch (err: any) {
      setSheetError(err.message || 'Gagal melakukan ekspor ke Google Sheets.');
    } finally {
      setIsExportingSheet(false);
      setConfirmAction((prev) => ({ ...prev, isOpen: false }));
    }
  };

  // Open confirmation for adding custom row to Sheet
  const triggerAddRowModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWord.trim() || !customMeaning.trim()) {
      setSheetError('Kata / Istilah dan Arti harus diisi.');
      return;
    }
    if (!spreadsheetId) {
      setSheetError('Silakan buat atau ekspor Google Spreadsheet terlebih dahulu.');
      return;
    }

    setConfirmAction({
      isOpen: true,
      title: 'Tambahkan Baris Baru ke Spreadsheet?',
      description: `Sistem akan menambahkan kata "${customWord}" (${customMeaning}) ke Google Spreadsheet aktif Anda.`,
      actionType: 'add_row',
    });
  };

  const handleConfirmAddRow = async () => {
    if (!accessToken || !spreadsheetId) return;
    setIsAddingRow(true);
    setSheetError(null);
    try {
      const todayStr = new Date().toLocaleDateString('id-ID');
      const row = [todayStr, customCategory, customWord, customMeaning, customNotes || 'Entri Manual Siswa'];
      await appendSheetRows(accessToken, spreadsheetId, 'A1', [row]);

      setCustomWord('');
      setCustomMeaning('');
      setCustomNotes('');
      setExportSuccessMessage(`Baris "${customWord}" berhasil ditambahkan ke Google Spreadsheet!`);
    } catch (err: any) {
      setSheetError(err.message || 'Gagal menambahkan baris ke Google Sheets.');
    } finally {
      setIsAddingRow(false);
      setConfirmAction((prev) => ({ ...prev, isOpen: false }));
    }
  };

  // Open confirmation for Uploading File to Drive
  const triggerUploadFileModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) {
      setDriveError('Nama file tidak boleh kosong.');
      return;
    }

    setConfirmAction({
      isOpen: true,
      title: 'Simpan File Baru ke Google Drive?',
      description: `Sistem akan membuat berkas bernama "${newFileName}" di Google Drive Anda.`,
      actionType: 'upload_file',
    });
  };

  const handleConfirmUploadFile = async () => {
    if (!accessToken) return;
    setIsCreatingFile(true);
    setDriveError(null);
    try {
      await createDriveFile(accessToken, newFileName, newFileContent, newFileMime);
      setNewFileName('');
      setNewFileContent('');
      setIsNewFileModalOpen(false);
      await fetchDriveFiles();
    } catch (err: any) {
      setDriveError(err.message || 'Gagal menyimpan file ke Google Drive.');
    } finally {
      setIsCreatingFile(false);
      setConfirmAction((prev) => ({ ...prev, isOpen: false }));
    }
  };

  // Open confirmation for Deleting File from Drive
  const triggerDeleteFileModal = (fileId: string, fileName: string) => {
    setConfirmAction({
      isOpen: true,
      title: 'Hapus Berkas dari Google Drive?',
      description: `Apakah Anda yakin ingin menghapus "${fileName}" secara permanen dari Google Drive Anda? Tindakan ini tidak dapat dibatalkan.`,
      actionType: 'delete_file',
      targetId: fileId,
    });
  };

  const handleConfirmDeleteFile = async () => {
    if (!accessToken || !confirmAction.targetId) return;
    setIsLoadingDrive(true);
    setDriveError(null);
    try {
      await deleteDriveFile(accessToken, confirmAction.targetId);
      await fetchDriveFiles();
    } catch (err: any) {
      setDriveError(err.message || 'Gagal menghapus file dari Google Drive.');
    } finally {
      setIsLoadingDrive(false);
      setConfirmAction((prev) => ({ ...prev, isOpen: false }));
    }
  };

  // Handle Sheet Read
  const handleReadSheet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    if (!readSpreadsheetId.trim()) {
      setSheetError('Masukkan ID Spreadsheet yang ingin dibaca.');
      return;
    }

    // Extract ID if full URL pasted
    let targetId = readSpreadsheetId.trim();
    if (targetId.includes('/spreadsheets/d/')) {
      const match = targetId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        targetId = match[1];
      }
    }

    setIsReadingSheet(true);
    setSheetError(null);
    try {
      const rows = await getSheetRows(accessToken, targetId, 'A1:E20');
      setReadRows(rows);
    } catch (err: any) {
      setSheetError(err.message || 'Gagal membaca data dari Google Spreadsheet tersebut.');
    } finally {
      setIsReadingSheet(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 font-sans">
      {/* Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Integration Hub · Google Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Google Drive & Sheets Studio
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Hubungkan akun Google Anda untuk melakukan backup raport belajar, membuat lembar kosakata otomatis di Google Sheets, dan menyimpan ringkasan materi langsung di Google Drive.
            </p>
          </div>

          {/* Quick Status / Login Button */}
          <div className="shrink-0 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 backdrop-blur-md space-y-3 w-full md:w-auto min-w-[240px]">
            {isConnected ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Terhubung dengan Google</span>
                </div>
                <div className="text-xs text-slate-300 font-medium truncate max-w-[200px]">
                  {currentUser?.email || currentUser?.displayName || 'Google Account'}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Izin Drive & Sheets Aktif</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-center md:text-left">
                <div className="text-xs text-amber-300 font-semibold flex items-center gap-1.5 justify-center md:justify-start">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Belum Terhubung</span>
                </div>
                <button
                  onClick={() => signInWithGoogle()}
                  className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md cursor-pointer border border-slate-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Masuk dengan Google</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Feature Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('sheets')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === 'sheets'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Google Sheets Studio</span>
        </button>
        <button
          onClick={() => setActiveSubTab('drive')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === 'drive'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <HardDrive className="w-4 h-4" />
          <span>Google Drive Cloud Storage</span>
        </button>
      </div>

      {!isConnected && (
        <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <h3 className="font-bold text-sm">Otentikasi Akun Google Diperlukan</h3>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                Silakan lakukan login Google untuk mengaktifkan fitur pencatatan otomatis ke Google Sheets dan penyimpanan berkas ke Google Drive.
              </p>
            </div>
          </div>
          <button
            onClick={() => signInWithGoogle()}
            className="shrink-0 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Hubungkan Sekarang
          </button>
        </div>
      )}

      {/* =========================================================================
          TAB 1: GOOGLE SHEETS STUDIO
          ========================================================================= */}
      {activeSubTab === 'sheets' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Notification Messages */}
          {exportSuccessMessage && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{exportSuccessMessage}</span>
              </div>
              <button
                onClick={() => setExportSuccessMessage(null)}
                className="text-emerald-600 hover:text-emerald-800 font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {sheetError && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{sheetError}</span>
              </div>
              <button onClick={() => setSheetError(null)} className="text-rose-600 hover:text-rose-800 font-bold">
                ✕
              </button>
            </div>
          )}

          {/* Quick Export Action Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-slate-900 dark:text-white">
                      Sinkronisasi Raport Belajar
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Export nilai kuis, streak, dan statistik ke Google Spreadsheet
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Nama Siswa:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{profile.name}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Streak & Waktu:</span>
                  <span className="font-bold text-amber-500">{profile.streakDays} Hari ({profile.totalStudyMinutes} Mins)</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Vocabulary Mastered:</span>
                  <span className="font-bold text-emerald-500">{profile.vocabularyMastered} Kata</span>
                </div>
              </div>

              <button
                disabled={!isConnected || isExportingSheet}
                onClick={triggerExportSheetsModal}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
              >
                {isExportingSheet ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Mengeksport ke Google Sheets...</span>
                  </>
                ) : (
                  <>
                    <Table className="w-4 h-4" />
                    <span>Export / Buat Raport Google Sheets</span>
                  </>
                )}
              </button>

              {spreadsheetUrl && (
                <a
                  href={spreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka Google Spreadsheet Aktif</span>
                </a>
              )}
            </div>

            {/* Append Custom Row Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-slate-900 dark:text-white">
                    Tambah Entri Kosakata Manual
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Catat kata/frasa baru langsung ke dalam Google Spreadsheet Anda
                  </p>
                </div>
              </div>

              <form onSubmit={triggerAddRowModal} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Kata / Frasa Inggris
                    </label>
                    <input
                      type="text"
                      value={customWord}
                      onChange={(e) => setCustomWord(e.target.value)}
                      placeholder="e.g. Pristine"
                      className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Arti (Bahasa Indonesia)
                    </label>
                    <input
                      type="text"
                      value={customMeaning}
                      onChange={(e) => setCustomMeaning(e.target.value)}
                      placeholder="e.g. Murni / Sangat bersih"
                      className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Catatan Penggunaan / Contoh Kalimat
                  </label>
                  <input
                    type="text"
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="e.g. The beach remains in a pristine state."
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isConnected || isAddingRow || !spreadsheetId}
                  className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {isAddingRow ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Menyimpan ke Sheet...</span>
                    </>
                  ) : (
                    <>
                      <FilePlus className="w-4 h-4" />
                      <span>Tambah ke Google Sheet</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Read / Preview Google Sheet Data */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-slate-900 dark:text-white">
                    Pratinjau Data dari Google Spreadsheet
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Masukkan Spreadsheet ID atau URL Google Sheet untuk membaca isi data
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleReadSheet} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={readSpreadsheetId}
                onChange={(e) => setReadSpreadsheetId(e.target.value)}
                placeholder="Masukkan Google Spreadsheet ID atau URL lengkap"
                className="flex-1 px-4 py-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button
                type="submit"
                disabled={!isConnected || isReadingSheet}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer shrink-0 flex items-center justify-center gap-2"
              >
                {isReadingSheet ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Baca Sheet</span>
                  </>
                )}
              </button>
            </form>

            {readRows.length > 0 && (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      {readRows[0].map((headerCell: any, idx: number) => (
                        <th key={idx} className="p-3 border-b border-slate-200 dark:border-slate-700">
                          {headerCell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {readRows.slice(1).map((row: any[], rIdx: number) => (
                      <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        {row.map((cell: any, cIdx: number) => (
                          <td key={cIdx} className="p-3 text-slate-800 dark:text-slate-200">
                            {String(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: GOOGLE DRIVE CLOUD STORAGE
          ========================================================================= */}
      {activeSubTab === 'drive' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {driveError && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{driveError}</span>
              </div>
              <button onClick={() => setDriveError(null)} className="text-rose-600 hover:text-rose-800 font-bold">
                ✕
              </button>
            </div>
          )}

          {/* Drive Header Bar */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                  <HardDrive className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-slate-900 dark:text-white">
                    Penyimpanan Google Drive
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Jelajahi, upload catatan baru, atau kelola berkas belajar di Drive
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={fetchDriveFiles}
                  disabled={!isConnected || isLoadingDrive}
                  className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                  title="Segarkan Berkas Drive"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingDrive ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={() => setIsNewFileModalOpen(true)}
                  disabled={!isConnected}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>Buat File di Drive</span>
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={driveSearch}
                onChange={(e) => setDriveSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchDriveFiles()}
                placeholder="Cari berkas di Google Drive Anda..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* File List */}
            {isLoadingDrive ? (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mx-auto" />
                <p className="text-xs text-slate-500">Memuat berkas dari Google Drive...</p>
              </div>
            ) : driveFiles.length === 0 ? (
              <div className="py-12 text-center space-y-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <HardDrive className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Tidak Ada Berkas Ditemukan
                </p>
                <p className="text-[11px] text-slate-500">
                  {isConnected
                    ? 'Gunakan tombol "Buat File di Drive" untuk menyimpan catatan pertama Anda.'
                    : 'Masuk dengan akun Google untuk melihat berkas Drive Anda.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {driveFiles.map((file) => {
                  const isSheet = file.mimeType.includes('spreadsheet');
                  const isDoc = file.mimeType.includes('document');

                  return (
                    <div
                      key={file.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-500/50 transition-all flex flex-col justify-between gap-3 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-2 rounded-lg shrink-0 ${
                            isSheet
                              ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400'
                              : isDoc
                              ? 'bg-blue-100 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400'
                              : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400'
                          }`}>
                            {isSheet ? (
                              <FileSpreadsheet className="w-5 h-5" />
                            ) : (
                              <FileText className="w-5 h-5" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                              {file.name}
                            </h3>
                            <p className="text-[10px] text-slate-400">
                              {file.createdTime
                                ? new Date(file.createdTime).toLocaleDateString('id-ID')
                                : 'Google Drive'}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => triggerDeleteFileModal(file.id, file.name)}
                          className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                          title="Hapus berkas"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {file.webViewLink && (
                        <a
                          href={file.webViewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Buka di Drive</span>
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: BUAT FILE BARU DI DRIVE
          ========================================================================= */}
      {isNewFileModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-500" />
                <span>Buat Catatan / Berkas di Google Drive</span>
              </h2>
              <button
                onClick={() => setIsNewFileModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={triggerUploadFileModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Berkas
                </label>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="e.g. Catatan_Grammar_16_Tenses.txt"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tipe Berkas
                </label>
                <select
                  value={newFileMime}
                  onChange={(e) => setNewFileMime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="text/plain">Text Polos (.txt)</option>
                  <option value="text/markdown">Markdown (.md)</option>
                  <option value="application/json">JSON Data (.json)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Isi Catatan / Konten
                </label>
                <textarea
                  rows={5}
                  value={newFileContent}
                  onChange={(e) => setNewFileContent(e.target.value)}
                  placeholder="Tulis ringkasan materi pembelajaran Bahasa Inggris Anda di sini..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewFileModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isCreatingFile}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md cursor-pointer disabled:opacity-50"
                >
                  Lanjutkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MANDATORY CONFIRMATION MODAL FOR DESTRUCTIVE / MUTATING WORKSPACE ACTIONS
          ========================================================================= */}
      {confirmAction.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${
                confirmAction.actionType === 'delete_file'
                  ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400'
                  : 'bg-amber-100 text-amber-600 dark:bg-amber-950/80 dark:text-amber-400'
              }`}>
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {confirmAction.title}
                </h3>
                <p className="text-xs text-slate-500">Konfirmasi Operasi Google Workspace</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {confirmAction.description}
            </p>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setConfirmAction((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirmAction.actionType === 'export_sheet') handleConfirmExportSheet();
                  if (confirmAction.actionType === 'add_row') handleConfirmAddRow();
                  if (confirmAction.actionType === 'upload_file') handleConfirmUploadFile();
                  if (confirmAction.actionType === 'delete_file') handleConfirmDeleteFile();
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer transition-all ${
                  confirmAction.actionType === 'delete_file'
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
