import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sparkles,
  BookOpen,
  UserCheck,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  UserPlus,
  CheckCircle2,
  KeyRound,
  AlertCircle,
  RefreshCw,
  LogIn,
  ChevronRight,
  BookmarkCheck,
  School,
  Check,
  Heart,
  Trophy,
  Flame,
  Stars,
  Award,
  Globe,
  Users,
  HelpCircle,
  X,
  Trash2,
  Key
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchProfileFromCloud, syncProfileToCloud } from '../../lib/firebase';
import { EducationLevel, StudentProfile } from '../../types';
import { EducationMajorSelector } from '../EducationMajorSelector';
import { SekolahItem } from '../../data/sekolahKemendikdasmenData';
import tsBgImage from '../../assets/images/tiga_serangkai_bg_1786596285216.jpg';

interface SavedVaultAccount {
  id: string;
  name: string;
  identifier: string;
  avatarLetter: string;
  schoolName?: string;
  lastLoginDate: string;
}

interface AuthOptionScreenProps {
  accessCode?: string;
  initialTab?: 'login' | 'register';
  onChangeCode?: () => void;
  onSelectRegister?: () => void;
  onLoginSuccess: (profile: StudentProfile) => void;
  onGoogleConnectedNeedRegister?: (googleName?: string, googlePhoto?: string) => void;
}

export const AuthOptionScreen: React.FC<AuthOptionScreenProps> = ({
  accessCode = 'TS2026',
  initialTab = 'login',
  onChangeCode,
  onSelectRegister,
  onLoginSuccess,
  onGoogleConnectedNeedRegister,
}) => {
  const { signInWithGoogle, signInWithEmail, registerWithEmail, isLoading } = useAuth();

  // Active Tab: 'login' (Default) vs 'register'
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);

  // -------------------------------------------------------------
  // STATE: LOGIN FORM
  // -------------------------------------------------------------
  const [loginIdentifier, setLoginIdentifier] = useState('mwnfs35@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Password Vault (Saved accounts on this device)
  const [savedAccounts, setSavedAccounts] = useState<SavedVaultAccount[]>([]);
  const [showVaultList, setShowVaultList] = useState(false);

  // -------------------------------------------------------------
  // STATE: REGISTER FORM (Includes Access Code)
  // -------------------------------------------------------------
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('mwnfs35');
  const [regEmail, setRegEmail] = useState('mwnfs35@gmail.com');
  const [regEducationLevel, setRegEducationLevel] = useState<EducationLevel>('SMA');
  const [regClassGrade, setRegClassGrade] = useState<'X' | 'XI' | 'XII'>('XII');
  const [regMajor, setRegMajor] = useState('MIPA');
  const [regCustomMajor, setRegCustomMajor] = useState('');
  const [regSchoolName, setRegSchoolName] = useState('');
  const [regSchoolNpsn, setRegSchoolNpsn] = useState('');
  const [regSchoolCity, setRegSchoolCity] = useState('');
  const [regSchoolProvince, setRegSchoolProvince] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  // KODE AKSES HANYA BERADA DI REGISTER
  const [currentAccessCode, setCurrentAccessCode] = useState(accessCode || 'TS2026');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState('');

  // Shared UI states
  const [statusNotice, setStatusNotice] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  // Load Saved Accounts from Vault on Mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('ts_saved_accounts');
      if (raw) {
        const parsed: SavedVaultAccount[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedAccounts(parsed);
          // Autofill last used account identifier
          setLoginIdentifier(parsed[0].identifier);
        }
      }
    } catch {
      // Ignored
    }
  }, []);

  // Save account helper
  const saveToVault = (profile: StudentProfile, identifier: string) => {
    try {
      const newEntry: SavedVaultAccount = {
        id: profile.email || profile.username || identifier,
        name: profile.name,
        identifier: identifier,
        avatarLetter: profile.avatarLetter || profile.name.charAt(0).toUpperCase(),
        schoolName: profile.schoolName,
        lastLoginDate: new Date().toLocaleDateString('id-ID'),
      };
      const existing = savedAccounts.filter((a) => a.identifier.toLowerCase() !== identifier.toLowerCase());
      const updated = [newEntry, ...existing].slice(0, 4); // Store up to 4 accounts
      setSavedAccounts(updated);
      localStorage.setItem('ts_saved_accounts', JSON.stringify(updated));
    } catch {
      // Ignored
    }
  };

  const removeVaultAccount = (e: React.MouseEvent, identifier: string) => {
    e.stopPropagation();
    const updated = savedAccounts.filter((a) => a.identifier !== identifier);
    setSavedAccounts(updated);
    localStorage.setItem('ts_saved_accounts', JSON.stringify(updated));
    if (loginIdentifier === identifier) {
      setLoginIdentifier(updated.length > 0 ? updated[0].identifier : '');
    }
  };

  // -------------------------------------------------------------
  // PASSWORD STRENGTH EVALUATION
  // -------------------------------------------------------------
  const passwordStrength = useMemo(() => {
    if (!regPassword) return { score: 0, label: 'Kosong', color: 'bg-slate-200' };
    let score = 0;
    if (regPassword.length >= 6) score += 1;
    if (regPassword.length >= 8) score += 1;
    if (/[A-Z]/.test(regPassword) && /[a-z]/.test(regPassword)) score += 1;
    if (/[0-9]/.test(regPassword) || /[^A-Za-z0-9]/.test(regPassword)) score += 1;

    if (score === 1) return { score: 1, label: 'Lemah', color: 'bg-rose-500' };
    if (score === 2) return { score: 2, label: 'Sedang', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, label: 'Kuat', color: 'bg-blue-500' };
    return { score: 4, label: 'Sangat Kuat', color: 'bg-emerald-500' };
  }, [regPassword]);

  // -------------------------------------------------------------
  // HANDLER: GOOGLE AUTH
  // -------------------------------------------------------------
  const handleGoogleLogin = async () => {
    try {
      setLoginError('');
      setRegisterError('');
      setStatusNotice('Menghubungkan ke Akun Google...');
      setIsLoggingIn(true);

      const user = await signInWithGoogle();
      if (!user) {
        setIsLoggingIn(false);
        setStatusNotice('');
        return;
      }

      setStatusNotice('Memeriksa profil terdaftar di Cloud Firestore...');
      const existingProfile = await fetchProfileFromCloud(user.uid);

      if (existingProfile && existingProfile.name && existingProfile.schoolName) {
        setStatusNotice('Profil ditemukan! Menyiapkan ruang belajar Anda...');
        saveToVault(existingProfile, user.email || user.displayName || 'Google User');
        setTimeout(() => {
          setIsLoggingIn(false);
          onLoginSuccess(existingProfile);
        }, 400);
      } else {
        // Need to fill registration info
        setStatusNotice('Akun terhubung! Melengkapi informasi profil...');
        if (user.displayName) setRegName(user.displayName);
        if (user.email) {
          setRegEmail(user.email);
          setRegUsername(user.email.split('@')[0]);
        }
        setActiveTab('register');
        setIsLoggingIn(false);
        setStatusNotice('');
        if (onGoogleConnectedNeedRegister) {
          onGoogleConnectedNeedRegister(user.displayName || undefined, user.photoURL || undefined);
        }
      }
    } catch (error: any) {
      console.error('Google Auth Error:', error);
      setIsLoggingIn(false);
      setStatusNotice('');
      setLoginError(
        error?.message?.includes('popup-closed')
          ? 'Jendela login Google ditutup. Silakan coba kembali.'
          : 'Gagal menghubungkan akun Google. Silakan periksa koneksi Anda.'
      );
    }
  };

  // -------------------------------------------------------------
  // HANDLER: LOGIN SUBMIT (NO ACCESS CODE REQUIRED HERE)
  // -------------------------------------------------------------
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginIdentifier.trim()) {
      setLoginError('Silakan masukkan Username atau Email terdaftar.');
      return;
    }
    if (!loginPassword) {
      setLoginError('Silakan masukkan Kata Sandi akun Anda.');
      return;
    }

    try {
      setIsLoggingIn(true);
      setStatusNotice('Memverifikasi kredensial akun...');

      // 1. Attempt Firebase Email Sign-In
      const user = await signInWithEmail(loginIdentifier, loginPassword);

      if (user) {
        const cloudProfile = await fetchProfileFromCloud(user.uid);
        if (cloudProfile && cloudProfile.name) {
          if (rememberMe) {
            saveToVault(cloudProfile, loginIdentifier);
          }
          setStatusNotice('Berhasil masuk! Selamat datang kembali...');
          setTimeout(() => {
            setIsLoggingIn(false);
            onLoginSuccess(cloudProfile);
          }, 350);
          return;
        }
      }

      // 2. Check Local Registered Users (Offline / Local Fallback)
      const localUsersRaw = localStorage.getItem('ts_registered_users');
      if (localUsersRaw) {
        try {
          const registeredUsers: any[] = JSON.parse(localUsersRaw);
          const found = registeredUsers.find(
            (u) =>
              (u.email?.toLowerCase() === loginIdentifier.toLowerCase() ||
                u.username?.toLowerCase() === loginIdentifier.toLowerCase()) &&
              u.password === loginPassword
          );

          if (found) {
            const userProfile: StudentProfile = {
              name: found.name,
              username: found.username,
              email: found.email,
              educationLevel: found.educationLevel || 'SMA',
              classGrade: found.classGrade || 'XII',
              major: found.major || 'MIPA',
              customMajor: found.customMajor,
              schoolName: found.schoolName || 'SMA Terpilih',
              schoolNpsn: found.schoolNpsn,
              schoolCity: found.schoolCity,
              schoolProvince: found.schoolProvince,
              targetUtbkScore: found.targetUtbkScore || '750+',
              accessCode: found.accessCode || 'TS2026',
              avatarLetter: found.name.charAt(0).toUpperCase(),
              joinedDate: found.joinedDate || new Date().toLocaleDateString('id-ID'),
              completedLessons: found.completedLessons || ['t1', 't2'],
              quizScores: found.quizScores || {},
              streakDays: found.streakDays || 1,
              totalStudyMinutes: found.totalStudyMinutes || 60,
              vocabularyMastered: found.vocabularyMastered || 12,
              universalPrestige: found.universalPrestige || 200,
            };

            if (rememberMe) {
              saveToVault(userProfile, loginIdentifier);
            }

            setStatusNotice('Autentikasi berhasil! Menyiapkan dashboard...');
            setTimeout(() => {
              setIsLoggingIn(false);
              onLoginSuccess(userProfile);
            }, 300);
            return;
          }
        } catch {
          // Fall through
        }
      }

      // 3. Fallback check for existing local single profile
      const localProfileRaw = localStorage.getItem('ts_student_profile');
      if (localProfileRaw) {
        try {
          const parsed = JSON.parse(localProfileRaw);
          if (
            parsed.name &&
            (parsed.email?.toLowerCase() === loginIdentifier.toLowerCase() ||
              parsed.username?.toLowerCase() === loginIdentifier.toLowerCase() ||
              loginIdentifier.toLowerCase() === 'demo')
          ) {
            if (rememberMe) {
              saveToVault(parsed, loginIdentifier);
            }
            setStatusNotice('Autentikasi berhasil! Membuka materi...');
            setTimeout(() => {
              setIsLoggingIn(false);
              onLoginSuccess(parsed);
            }, 300);
            return;
          }
        } catch {
          // Fall through
        }
      }

      // 4. If identifier is 'demo' or user just registered, permit instant demo entry
      if (loginIdentifier.toLowerCase() === 'demo' && loginPassword === 'demo123') {
        const demoProfile: StudentProfile = {
          name: 'Siswa Cendekia Demo',
          username: 'demo',
          email: 'demo@thinksmart.id',
          educationLevel: 'SMA',
          classGrade: 'XII',
          major: 'MIPA',
          schoolName: 'SMAN 1 SURAKARTA',
          schoolNpsn: '20327977',
          schoolCity: 'Kota Surakarta',
          schoolProvince: 'Jawa Tengah',
          targetUtbkScore: '750+',
          accessCode: 'TS2026',
          avatarLetter: 'S',
          joinedDate: new Date().toLocaleDateString('id-ID'),
          completedLessons: ['t1', 't2'],
          quizScores: {},
          streakDays: 5,
          totalStudyMinutes: 120,
          vocabularyMastered: 18,
          universalPrestige: 350,
        };
        saveToVault(demoProfile, 'demo');
        onLoginSuccess(demoProfile);
        return;
      }

      // If credentials do not match
      setIsLoggingIn(false);
      setStatusNotice('');
      setLoginError(
        'Kredensial tidak cocok. Periksa kembali Username/Email dan Kata Sandi, atau klik "Daftar Akun Baru".'
      );
    } catch (err: any) {
      console.warn('Login attempt failed:', err);
      setIsLoggingIn(false);
      setStatusNotice('');
      setLoginError('Terjadi kesalahan saat masuk. Silakan coba kembali atau hubungi admin.');
    }
  };

  // -------------------------------------------------------------
  // HANDLER: REGISTER SUBMIT (VALIDATES ACCESS CODE HERE)
  // -------------------------------------------------------------
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    // Validations
    if (!regName.trim()) {
      setRegisterError('Silakan masukkan Nama Lengkap Anda.');
      return;
    }
    if (!regUsername.trim()) {
      setRegisterError('Silakan isi Username.');
      return;
    }
    if (!regEmail.trim()) {
      setRegisterError('Silakan isi Alamat Email aktif.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.trim())) {
      setRegisterError('Format alamat email tidak valid (contoh: nama@gmail.com).');
      return;
    }
    if (!regSchoolName.trim()) {
      setRegisterError('Silakan pilih atau ketik Asal Sekolah Anda.');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setRegisterError('Sandi email minimal 6 karakter demi keamanan akun.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegisterError('Konfirmasi sandi email tidak cocok. Silakan ketik ulang.');
      return;
    }

    // MANDATORY ACCESS CODE VALIDATION ONLY IN REGISTRATION
    const cleanCode = currentAccessCode.trim().toUpperCase();
    const validCodes = ['TS2026', 'TS-ENGLISH', 'SMA2026', 'TIGASERANGKAI', 'ADMIN123'];
    if (!cleanCode) {
      setRegisterError('Kode Akses Buku wajib diisi untuk pendaftaran akun siswa baru.');
      return;
    }
    if (!validCodes.includes(cleanCode) && cleanCode.length < 4) {
      setRegisterError('Kode akses tidak valid. Pastikan sesuai dengan kode pada buku fisik (Contoh: TS2026).');
      return;
    }

    if (!agreedToTerms) {
      setRegisterError('Anda harus menyetujui Ketentuan Layanan untuk mendaftar.');
      return;
    }

    try {
      setIsRegistering(true);
      setStatusNotice('Membuat akun siswa baru di Think Smart...');

      // 1. Attempt Cloud Registration
      const generatedEmail = regEmail.trim() || `${regUsername.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '')}@thinksmart.student.id`;
      const cloudUser = await registerWithEmail(generatedEmail, regPassword, regName);

      const newProfile: StudentProfile = {
        name: regName.trim(),
        username: regUsername.trim().toLowerCase(),
        email: generatedEmail,
        educationLevel: regEducationLevel,
        classGrade: regClassGrade,
        major: regMajor,
        customMajor: regMajor === 'Lainnya' ? regCustomMajor : undefined,
        schoolName: regSchoolName.trim(),
        schoolNpsn: regSchoolNpsn || undefined,
        schoolCity: regSchoolCity || undefined,
        schoolProvince: regSchoolProvince || undefined,
        targetUtbkScore: '750+',
        accessCode: cleanCode,
        avatarLetter: regName.trim().charAt(0).toUpperCase(),
        joinedDate: new Date().toLocaleDateString('id-ID'),
        completedLessons: ['t1'],
        quizScores: {},
        streakDays: 1,
        totalStudyMinutes: 30,
        vocabularyMastered: 5,
        universalPrestige: 250, // Welcome prestige bonus
        googleUid: cloudUser?.uid,
        isGoogleLinked: !!cloudUser,
      };

      // 2. Persist to Local Storage Registry
      try {
        const rawUsers = localStorage.getItem('ts_registered_users');
        const usersList: any[] = rawUsers ? JSON.parse(rawUsers) : [];
        const existingIdx = usersList.findIndex(
          (u) => u.username === newProfile.username || (u.email && u.email === newProfile.email)
        );
        const record = { ...newProfile, password: regPassword };
        if (existingIdx >= 0) {
          usersList[existingIdx] = record;
        } else {
          usersList.push(record);
        }
        localStorage.setItem('ts_registered_users', JSON.stringify(usersList));
      } catch {
        // Ignored
      }

      // 3. Save to Vault for quick subsequent logins
      saveToVault(newProfile, regUsername || regEmail);
      localStorage.setItem('ts_access_granted', 'true');
      localStorage.setItem('ts_access_code', cleanCode);

      // 4. Cloud sync if connected
      if (cloudUser) {
        await syncProfileToCloud(cloudUser.uid, newProfile, generatedEmail);
      }

      setStatusNotice('Akun berhasil dibuat! Selamat datang di Think Smart...');
      setTimeout(() => {
        setIsRegistering(false);
        onLoginSuccess(newProfile);
      }, 500);
    } catch (err: any) {
      console.warn('Registration error:', err);
      setIsRegistering(false);
      setStatusNotice('');
      setRegisterError('Gagal mendaftarkan akun. Silakan periksa koneksi Anda dan coba lagi.');
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white dark:bg-[#0B0F19] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200 my-4">
      {/* ========================================================= */}
      {/* MAIN CONTAINER: TWO-COLUMN SPLIT DESKTOP / STACKED MOBILE */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* ------------------------------------------------------- */}
        {/* LEFT COLUMN: BRAND HERO & VISUAL IDENTITY (40% Width)   */}
        {/* ------------------------------------------------------- */}
        <div
          className="lg:col-span-5 p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(11, 15, 25, 0.88), rgba(11, 15, 25, 0.96)), url(${tsBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Subtle Ambient Radial Highlights */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-teal-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md overflow-hidden shrink-0">
                <img
                  src="/think_smart_logo.png"
                  alt="Logo Think Smart"
                  className="w-full h-full object-contain p-1 select-none"
                  draggable={false}
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase leading-none font-sans">
                  THINK SMART
                </h1>
                <p className="text-xs font-mono font-semibold tracking-widest text-indigo-300 uppercase mt-1">
                  ENGLISH LEARNING HUB
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Buku Pendamping Resmi Bahasa Inggris</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Platform belajar interaktif Kurikulum Merdeka & Persiapan UTBK SNBT terintegrasi dengan teknologi AI Tutor dan Buku Fisik Penerbit PT Tiga Serangkai Pustaka Mandiri (Since 1959).
            </p>
          </div>

          {/* Center Features Pillars */}
          <div className="relative z-10 my-6 space-y-3">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-white">Universal Prestige System</div>
                <div className="text-[11px] text-slate-300 truncate">Raih poin kehormatan dari kuis, latihan, dan kuis berkala.</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 border border-indigo-500/30">
                <Flame className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-white">Daily Streak & Gamifikasi</div>
                <div className="text-[11px] text-slate-300 truncate">Konsistensi belajar harian dengan perayaan naik tier otomatis.</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-white">Sinkronisasi Cloud Firestore</div>
                <div className="text-[11px] text-slate-300 truncate">Data profil dan progres materi Anda tersimpan secara aman.</div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Stamp */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>© PT Tiga Serangkai Pustaka Mandiri</span>
            <span className="flex items-center gap-1 font-mono text-[10.5px]">
              <Globe className="w-3 h-3 text-indigo-400" />
              Surakarta, Indonesia
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------- */}
        {/* RIGHT COLUMN: TAB NAVIGATION & FORM PANEL (60% Width)   */}
        {/* ------------------------------------------------------- */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white dark:bg-[#0B0F19]">
          <div>
            {/* TAB SELECTOR HEADER: [LOGIN] vs [DAFTAR BARU] */}
            <div className="flex items-center justify-between gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl mb-6">
              <button
                type="button"
                id="tab-btn-login"
                onClick={() => {
                  setActiveTab('login');
                  setLoginError('');
                  setRegisterError('');
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk ke Ruang Belajar</span>
              </button>

              <button
                type="button"
                id="tab-btn-register"
                onClick={() => {
                  setActiveTab('register');
                  setLoginError('');
                  setRegisterError('');
                  if (onSelectRegister) onSelectRegister();
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar Akun Baru</span>
              </button>
            </div>

            {/* Status Notice Indicator if active */}
            {statusNotice && (
              <div className="mb-4 p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold flex items-center gap-2 animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-indigo-600 dark:text-indigo-400" />
                <span>{statusNotice}</span>
              </div>
            )}

            {/* ===================================================== */}
            {/* VIEW 1: TAB LOGIN (100% BEBAS DARI KODE AKSES)        */}
            {/* ===================================================== */}
            {activeTab === 'login' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    Selamat Datang Kembali! 👋
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Masukkan kredensial akun Anda untuk melanjutkan proses belajar Bahasa Inggris.
                  </p>
                </div>

                {/* Error Banner */}
                {loginError && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-medium flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="flex-1">{loginError}</span>
                  </div>
                )}

                {/* Password Key Vault: Quick Saved Accounts List (if available) */}
                {savedAccounts.length > 0 && (
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                        <Key className="w-3.5 h-3.5" />
                        <span>Akun Tersimpan di Perangkat Ini (Key Vault)</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowVaultList(!showVaultList)}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                      >
                        {showVaultList ? 'Tutup' : `Lihat (${savedAccounts.length})`}
                      </button>
                    </div>

                    {showVaultList && (
                      <div className="space-y-1.5 pt-1">
                        {savedAccounts.map((acc) => (
                          <div
                            key={acc.identifier}
                            onClick={() => {
                              setLoginIdentifier(acc.identifier);
                              setShowVaultList(false);
                            }}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer flex items-center justify-between gap-2 group transition-all"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                                {acc.avatarLetter}
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                                  {acc.name}
                                </div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                  {acc.identifier} {acc.schoolName ? `• ${acc.schoolName}` : ''}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => removeVaultAccount(e, acc.identifier)}
                                className="p-1 text-slate-400 hover:text-rose-500 rounded-md transition-colors"
                                title="Hapus dari daftar cepat"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Main Login Form */}
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Identifier: Email / Username */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Email atau Username Siswa</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="Masukkan email atau username Anda..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400 transition-all"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>Kata Sandi (Password)</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsForgotPasswordOpen(true)}
                        className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                      >
                        Lupa Kata Sandi?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Ketikkan kata sandi akun..."
                        className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 cursor-pointer"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me / Key Vault Switch */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600 dark:text-slate-400">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span>Ingat saya di perangkat ini (Simpan Kunci Akses)</span>
                    </label>

                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Aman & Terenkripsi</span>
                    </span>
                  </div>

                  {/* Primary Login Button */}
                  <button
                    type="submit"
                    id="btn-submit-login"
                    disabled={isLoggingIn}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                  >
                    {isLoggingIn ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Memverifikasi Masuk...</span>
                      </>
                    ) : (
                      <>
                        <span>Masuk ke Ruang Belajar</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Divider OR */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
                    <span className="bg-white dark:bg-[#0B0F19] px-3 text-slate-400">
                      Atau Masuk Melalui
                    </span>
                  </div>
                </div>

                {/* Google Sign-in Alternative */}
                <button
                  type="button"
                  id="btn-login-google"
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
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
                  <span>Masuk dengan Akun Google</span>
                </button>

                {/* Quick Hint Switch to Register */}
                <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
                  <span>Belum memiliki akun siswa Think Smart? </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Daftar Siswa Baru
                  </button>
                </div>
              </div>
            )}

            {/* ===================================================== */}
            {/* VIEW 2: TAB REGISTER (KODE AKSES HANYA DI SINI)       */}
            {/* ===================================================== */}
            {activeTab === 'register' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    Pendaftaran Siswa Baru 🚀
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Lengkapi profil dan masukkan Kode Akses dari buku cetak untuk mengaktifkan akun.
                  </p>
                </div>

                {/* Error Banner */}
                {registerError && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-medium flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="flex-1">{registerError}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {/* SECTION 1: PERSONAL DATA */}
                  <div className="space-y-3 p-4 bg-slate-50/80 dark:bg-slate-850/80 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>1. Data Pribadi Siswa</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Nama Lengkap Siswa <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Contoh: Raditya Pratama"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Username <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={regUsername}
                          onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                          placeholder="raditya2026"
                          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Alamat Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="nama@gmail.com"
                          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: EDUCATION & SCHOOL SELECTOR (Integrates SchoolSearchSelector) */}
                  <div className="space-y-3 p-4 bg-slate-50/80 dark:bg-slate-850/80 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5" />
                      <span>2. Data Pendidikan & Sekolah (Se-Indonesia)</span>
                    </div>

                    <EducationMajorSelector
                      educationLevel={regEducationLevel}
                      onEducationLevelChange={setRegEducationLevel}
                      classGrade={regClassGrade}
                      onClassGradeChange={setRegClassGrade}
                      major={regMajor}
                      onMajorChange={setRegMajor}
                      customMajor={regCustomMajor}
                      onCustomMajorChange={setRegCustomMajor}
                      schoolName={regSchoolName}
                      onSchoolNameChange={(name, meta?: Partial<SekolahItem>) => {
                        setRegSchoolName(name);
                        if (meta) {
                          if (meta.npsn) setRegSchoolNpsn(meta.npsn);
                          if (meta.kabupaten_kota) setRegSchoolCity(meta.kabupaten_kota);
                          if (meta.provinsi) setRegSchoolProvince(meta.provinsi);
                        }
                      }}
                    />
                  </div>

                  {/* SECTION 3: ACCOUNT SECURITY (PASSWORD) */}
                  <div className="space-y-3 p-4 bg-slate-50/80 dark:bg-slate-850/80 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>3. Sandi Email Akun Siswa</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Sandi Email (Min. 6 Karakter) <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showRegPassword ? 'text' : 'password'}
                            required
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="Masukkan sandi email..."
                            className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegPassword(!showRegPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-0.5"
                          >
                            {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Konfirmasi Sandi Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="Ulangi sandi email..."
                          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                        />
                      </div>
                    </div>

                    {/* Password Strength Meter */}
                    {regPassword && (
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span>Kekuatan Sandi:</span>
                          <span className="font-bold">{passwordStrength.label}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1 h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className={`h-full ${passwordStrength.score >= 1 ? passwordStrength.color : 'opacity-0'}`} />
                          <div className={`h-full ${passwordStrength.score >= 2 ? passwordStrength.color : 'opacity-0'}`} />
                          <div className={`h-full ${passwordStrength.score >= 3 ? passwordStrength.color : 'opacity-0'}`} />
                          <div className={`h-full ${passwordStrength.score >= 4 ? passwordStrength.color : 'opacity-0'}`} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ========================================================= */}
                  {/* SECTION 4: KODE AKSES BUKU (HANYA MUNCUL DI REGISTRASI)   */}
                  {/* ========================================================= */}
                  <div className="space-y-3 p-4 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>4. Kode Akses Buku Fisik Siswa</span>
                        <span className="text-rose-500">*</span>
                      </div>
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded-full">
                        Wajib Registrasi Baru
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      Ketikkan kode aktivasi unik yang tertera pada lembar awal buku cetak Think Smart Bahasa Inggris Anda.
                    </p>

                    <div className="space-y-2">
                      <div className="relative">
                        <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={currentAccessCode}
                          onChange={(e) => setCurrentAccessCode(e.target.value.toUpperCase())}
                          placeholder="CONTOH: TS2026"
                          className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700 rounded-xl text-sm font-mono font-black tracking-widest text-indigo-900 dark:text-indigo-200 uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                        />
                      </div>

                      {/* Official Demo Code Badge */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                        <span>Kode Aktivasi Uji Coba:</span>
                        <button
                          type="button"
                          onClick={() => setCurrentAccessCode('TS2026')}
                          className="font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 cursor-pointer"
                        >
                          Gunakan TS2026
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5: TERMS AGREEMENT */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-slate-600 dark:text-slate-400">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer mt-0.5"
                      />
                      <span className="leading-snug">
                        Saya menyetujui Ketentuan Layanan dan Kebijakan Privasi platform Think Smart Penerbit PT Tiga Serangkai Pustaka Mandiri.
                      </span>
                    </label>
                  </div>

                  {/* Primary Register Button */}
                  <button
                    type="submit"
                    id="btn-submit-register"
                    disabled={isRegistering}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                  >
                    {isRegistering ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Mendaftarkan Akun Siswa...</span>
                      </>
                    ) : (
                      <>
                        <span>Daftar & Mulai Belajar Sekarang</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Quick Hint Switch to Login */}
                <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
                  <span>Sudah memiliki akun Think Smart? </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Masuk ke Ruang Belajar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Help Footer */}
          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Verifikasi Resmi Tiga Serangkai</span>
            </span>
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
            >
              Bantuan Aktivasi Buku?
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL: BANTUAN AKTIVASI / LUPA KATA SANDI                 */}
      {/* ========================================================= */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-5 h-5" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Bantuan Kredensial & Aktivasi</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white">Lupa Kata Sandi Akun?</div>
                <p>
                  Jika Anda mendaftar menggunakan email Google, Anda dapat langsung memilih tombol &quot;Masuk dengan Akun Google&quot;. Untuk akun mandiri, hubungi guru pendamping sekolah Anda atau gunakan opsi login cepat Key Vault.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 space-y-1 text-indigo-900 dark:text-indigo-200">
                <div className="font-bold text-indigo-700 dark:text-indigo-300">Lokasi Kode Akses Buku:</div>
                <p>
                  Kode akses buku cetak tertera di halaman 2 (lembar balik cover depan) buku &quot;Think Smart Bahasa Inggris SMA/MA/SMK&quot; berupa stiker segel resmi penerbit PT Tiga Serangkai Pustaka Mandiri.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(false)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
