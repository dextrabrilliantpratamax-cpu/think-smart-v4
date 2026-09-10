import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Camera,
  Upload,
  UserCheck,
  User,
  Mail,
  Image as ImageIcon,
  AlertCircle,
  Trash2,
  GraduationCap,
  KeyRound,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { EducationLevel, StudentProfile } from '../../types';
import { EducationMajorSelector } from '../EducationMajorSelector';
import { useAuth } from '../../context/AuthContext';
import { SekolahItem } from '../../data/sekolahKemendikdasmenData';
import tsBgImage from '../../assets/images/tiga_serangkai_bg_1786596285216.jpg';

interface StudentRegistrationFormProps {
  accessCode?: string;
  onBackToOptions: () => void;
  onCompleteRegistration: (profile: StudentProfile) => void;
  initialName?: string;
  initialAvatar?: string;
}

export const StudentRegistrationForm: React.FC<StudentRegistrationFormProps> = ({
  accessCode = 'TS2026',
  onBackToOptions,
  onCompleteRegistration,
  initialName = '',
  initialAvatar,
}) => {
  const { currentUser, signInWithGoogle, registerWithEmail } = useAuth();
  const [studentUsername, setStudentUsername] = useState<string>(
    initialName ? initialName.toLowerCase().replace(/[^a-z0-9._-]/g, '') : (currentUser?.email?.split('@')[0] ?? '')
  );
  const [studentEmail, setStudentEmail] = useState<string>(currentUser?.email ?? '');
  const [studentPassword, setStudentPassword] = useState<string>('');
  const [studentConfirmPassword, setStudentConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>(initialName || (currentUser?.displayName ?? ''));
  const [studentEducationLevel, setStudentEducationLevel] = useState<EducationLevel>('SMA');
  const [studentClass, setStudentClass] = useState<'X' | 'XI' | 'XII'>('XII');
  const [studentMajor, setStudentMajor] = useState<string>('MIPA');
  const [studentCustomMajor, setStudentCustomMajor] = useState<string>('');
  const [studentSchoolName, setStudentSchoolName] = useState<string>('');
  const [studentSchoolNpsn, setStudentSchoolNpsn] = useState<string>('');
  const [studentSchoolCity, setStudentSchoolCity] = useState<string>('');
  const [studentSchoolProvince, setStudentSchoolProvince] = useState<string>('');
  const [currentAccessCode, setCurrentAccessCode] = useState<string>(accessCode || 'TS2026');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    initialAvatar || currentUser?.photoURL || undefined
  );
  const [uploadError, setUploadError] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGoogleConnect = async () => {
    const user = await signInWithGoogle();
    if (user) {
      if (user.displayName && (!studentName || studentName === 'Siswa Cendekia')) {
        setStudentName(user.displayName);
      }
      if (user.email && !studentEmail) {
        setStudentEmail(user.email);
        if (!studentUsername) {
          setStudentUsername(user.email.split('@')[0]);
        }
      }
      if (user.photoURL && !avatarUrl) {
        setAvatarUrl(user.photoURL);
      }
    }
  };

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Harap pilih file format gambar (JPG, PNG, atau WEBP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Ukuran gambar maksimal 5MB.');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        const dimension = Math.min(size, 400); // 400x400 max 1:1
        canvas.width = dimension;
        canvas.height = dimension;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const startX = (img.width - size) / 2;
          const startY = (img.height - size) / 2;
          ctx.drawImage(img, startX, startY, size, size, 0, 0, dimension, dimension);
          setAvatarUrl(canvas.toDataURL('image/jpeg', 0.88));
        } else {
          setAvatarUrl(result);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!studentName.trim()) {
      setValidationError('Silakan isi nama lengkap siswa.');
      return;
    }
    if (!studentUsername.trim()) {
      setValidationError('Silakan isi username untuk akun Anda.');
      return;
    }
    if (!studentEmail.trim()) {
      setValidationError('Silakan isi alamat email aktif Anda.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail.trim())) {
      setValidationError('Format alamat email tidak valid (contoh: nama@gmail.com).');
      return;
    }
    if (!studentPassword || studentPassword.length < 6) {
      setValidationError('Sandi email minimal 6 karakter demi keamanan akun.');
      return;
    }
    if (studentPassword !== studentConfirmPassword) {
      setValidationError('Konfirmasi sandi email tidak cocok. Silakan ketik ulang.');
      return;
    }
    if (!studentSchoolName.trim()) {
      setValidationError('Silakan isi atau pilih nama asal sekolah Anda.');
      return;
    }

    const cleanCode = currentAccessCode.trim().toUpperCase();
    const validCodes = ['TS2026', 'TS-ENGLISH', 'SMA2026', 'TIGASERANGKAI', 'ADMIN123'];
    if (!cleanCode) {
      setValidationError('Silakan masukkan kode akses buku fisik Anda.');
      return;
    }
    if (!validCodes.includes(cleanCode) && cleanCode.length < 4) {
      setValidationError('Kode akses tidak valid. Pastikan sesuai dengan buku cetak (Contoh: TS2026).');
      return;
    }

    try {
      setIsSubmitting(true);
      const emailVal = studentEmail.trim().toLowerCase();
      let regUid = currentUser?.uid;

      if (!currentUser && registerWithEmail) {
        try {
          const fbUser = await registerWithEmail(emailVal, studentPassword, studentName.trim());
          if (fbUser) regUid = fbUser.uid;
        } catch (authErr) {
          console.warn('Firebase registration notice:', authErr);
        }
      }

      const newProfile: StudentProfile = {
        name: studentName.trim(),
        username: studentUsername.trim().toLowerCase(),
        email: emailVal,
        educationLevel: studentEducationLevel,
        classGrade: studentClass,
        major: studentMajor,
        customMajor: studentCustomMajor.trim() || undefined,
        schoolName: studentSchoolName.trim(),
        schoolNpsn: studentSchoolNpsn || undefined,
        schoolCity: studentSchoolCity || undefined,
        schoolProvince: studentSchoolProvince || undefined,
        targetUtbkScore: '750+',
        accessCode: cleanCode,
        avatarLetter: studentName.trim().charAt(0).toUpperCase(),
        avatarUrl: avatarUrl || undefined,
        joinedDate: new Date().toLocaleDateString('id-ID'),
        completedLessons: ['t1', 't2'],
        quizScores: {},
        streakDays: 5,
        totalStudyMinutes: 120,
        vocabularyMastered: 18,
        universalPrestige: 250,
        googleUid: regUid || currentUser?.uid || undefined,
        isGoogleLinked: !!currentUser,
        lastSyncedAt: new Date().toISOString(),
      };

      try {
        const rawUsers = localStorage.getItem('ts_registered_users');
        const usersList: any[] = rawUsers ? JSON.parse(rawUsers) : [];
        const existingIdx = usersList.findIndex(
          (u) => u.username === newProfile.username || (u.email && u.email.toLowerCase() === emailVal)
        );
        const record = { ...newProfile, password: studentPassword };
        if (existingIdx >= 0) {
          usersList[existingIdx] = record;
        } else {
          usersList.push(record);
        }
        localStorage.setItem('ts_registered_users', JSON.stringify(usersList));
      } catch {
        // Ignored
      }

      localStorage.setItem('ts_student_profile', JSON.stringify(newProfile));
      localStorage.setItem('ts_profile_completed', 'true');
      localStorage.setItem('ts_access_granted', 'true');
      localStorage.setItem('ts_access_code', cleanCode);

      onCompleteRegistration(newProfile);
    } catch (err: any) {
      setValidationError(err?.message || 'Terjadi kesalahan saat memproses pendaftaran.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
      {/* Header Banner */}
      <div
        className="p-6 text-white border-b border-slate-800 relative overflow-hidden bg-slate-900"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.82)), url(${tsBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="space-y-1">
            <button
              type="button"
              onClick={onBackToOptions}
              className="inline-flex items-center gap-1 text-xs text-indigo-200 hover:text-white font-semibold mb-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Pilihan Akses</span>
            </button>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white drop-shadow-xs leading-none">
              Daftar Akun Baru
            </h1>
            <p className="text-xs text-indigo-200 font-mono">
              Kode Akses: <b className="text-emerald-300">{accessCode}</b>
            </p>
          </div>

          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0 shadow-xs">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[calc(90vh-100px)] overflow-y-auto custom-scrollbar">
        {/* Google Account Linking Card (Cloud Sync & Auto-fill) */}
        <div className="p-4 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-indigo-50/40 dark:from-indigo-950/40 dark:via-slate-800/80 dark:to-slate-900 border border-indigo-100 dark:border-indigo-800/60 rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-2xs">
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
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {currentUser ? 'Akun Google Terhubung' : 'Sinkronisasi Cloud Google (Opsional)'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {currentUser ? currentUser.email : 'Simpan progres belajar otomatis ke cloud Firestore'}
                </div>
              </div>
            </div>

            {currentUser ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                <span>Terhubung</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleGoogleConnect}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 transition-all shadow-2xs cursor-pointer hover:border-indigo-300"
              >
                Hubungkan
              </button>
            )}
          </div>
        </div>

        {/* Foto Profil Selector */}
        <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>FOTO PROFIL</span>
            </span>
            {currentUser?.photoURL && avatarUrl !== currentUser.photoURL && (
              <button
                type="button"
                onClick={() => setAvatarUrl(currentUser.photoURL!)}
                className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
              >
                Gunakan Foto Google
              </button>
            )}
          </label>

          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-bold text-xl shadow-xs border-2 border-indigo-500/30">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Foto Profil Siswa"
                    className="w-full h-full aspect-square object-cover"
                  />
                ) : (
                  <span>{studentName ? studentName.charAt(0).toUpperCase() : 'S'}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-xs cursor-pointer"
                title="Unggah Foto Profil"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>

            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Unggah Foto 1x1</span>
                </button>
                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl(undefined)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg cursor-pointer transition-colors"
                    title="Hapus foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                JPG, PNG, atau WEBP (otomatis dipotong rasio 1:1)
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageFile(file);
              }}
              className="hidden"
            />
          </div>

          {uploadError && (
            <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{uploadError}</span>
            </p>
          )}
        </div>

        {/* Input Nama Lengkap Siswa */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Nama Lengkap Siswa <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <UserCheck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Masukkan nama lengkap siswa..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400"
            />
          </div>
        </div>

        {/* Section 1: Kredensial Akun (Username & Alamat Email Wajib) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Username <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                required
                value={studentUsername}
                onChange={(e) => setStudentUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                placeholder="raditya2026"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Alamat Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type="email"
                required
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="nama@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400"
              />
            </div>
          </div>
        </div>

        {/* Sandi Email Siswa & Konfirmasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Sandi Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Konfirmasi Sandi Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={studentConfirmPassword}
                onChange={(e) => setStudentConfirmPassword(e.target.value)}
                placeholder="Ulangi sandi email..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Selector Jenjang (SMA, SMK, MA) & Jurusan (MIPA, IPS, Bahasa / Kejuruan) */}
        <EducationMajorSelector
          educationLevel={studentEducationLevel}
          onEducationLevelChange={setStudentEducationLevel}
          classGrade={studentClass}
          onClassGradeChange={setStudentClass}
          major={studentMajor}
          onMajorChange={setStudentMajor}
          customMajor={studentCustomMajor}
          onCustomMajorChange={setStudentCustomMajor}
          schoolName={studentSchoolName}
          onSchoolNameChange={(name, meta?: Partial<SekolahItem>) => {
            setStudentSchoolName(name);
            if (meta) {
              if (meta.npsn) setStudentSchoolNpsn(meta.npsn);
              if (meta.kabupaten_kota) setStudentSchoolCity(meta.kabupaten_kota);
              if (meta.provinsi) setStudentSchoolProvince(meta.provinsi);
            }
          }}
          selectedProvince={studentSchoolProvince}
          onProvinceChange={setStudentSchoolProvince}
        />

        {/* Kode Akses Buku Fisik Siswa */}
        <div className="space-y-2 p-4 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-indigo-950 dark:text-indigo-200 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Kode Akses Buku Siswa</span>
              <span className="text-rose-500">*</span>
            </label>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded-full">
              Wajib Registrasi Baru
            </span>
          </div>

          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Ketikkan kode aktivasi unik yang tertera pada lembar awal buku cetak Think Smart Bahasa Inggris Anda.
          </p>

          <div className="relative">
            <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none" />
            <input
              type="text"
              required
              value={currentAccessCode}
              onChange={(e) => setCurrentAccessCode(e.target.value.toUpperCase())}
              placeholder="CONTOH: TS2026"
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700 rounded-xl text-xs font-mono font-black tracking-widest text-indigo-950 dark:text-indigo-200 uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>
        </div>

        {validationError && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-xl flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300 font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Submit & Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onBackToOptions}
            className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Pilihan Akses</span>
          </button>

          <button
            type="submit"
            id="btn-submit-registration"
            disabled={isSubmitting}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 px-5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {isSubmitting ? (
              <span>Mendaftarkan akun...</span>
            ) : (
              <>
                <span>Daftar Akun Baru & Mulai Belajar</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
