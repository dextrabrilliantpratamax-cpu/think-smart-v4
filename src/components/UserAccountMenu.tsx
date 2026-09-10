import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  LogOut,
  ChevronDown,
  Camera,
  Flame,
  BookOpen,
  Trophy,
  ShieldCheck,
  Sparkles,
  KeyRound,
  AlertTriangle,
  X,
  ExternalLink,
  GraduationCap,
  Cloud,
  RefreshCw,
  CheckCircle2,
  Lock,
  Crown
} from 'lucide-react';
import { StudentProfile } from '../types';
import { getStreakTier } from './streak/streakTiers';
import { getEducationLevelInfo, getMajorInfo } from '../data/educationData';
import { calculateUniversalPrestige } from '../utils/prestigeManager';
import { useAuth } from '../context/AuthContext';

interface UserAccountMenuProps {
  profile: StudentProfile;
  onOpenProfileModal: () => void;
  onLogout: () => void;
  onOpenStreakModal?: () => void;
}

export const UserAccountMenu: React.FC<UserAccountMenuProps> = ({
  profile,
  onOpenProfileModal,
  onLogout,
  onOpenStreakModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const streakTier = getStreakTier(profile.streakDays);
  const { totalPrestige } = calculateUniversalPrestige(profile);
  const { currentUser, signInWithGoogle, syncProfile, syncStatus, lastSyncedAt } = useAuth();

  // Close dropdown on click outside or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleTriggerLogoutConfirm = () => {
    setIsOpen(false);
    onLogout();
  };

  const handleGoogleConnect = async () => {
    const user = await signInWithGoogle();
    if (user) {
      await syncProfile(profile);
      setSyncSuccessMsg(true);
      setTimeout(() => setSyncSuccessMsg(false), 2500);
    }
  };

  const handleManualCloudSync = async () => {
    if (!currentUser) {
      handleGoogleConnect();
      return;
    }
    setIsSyncing(true);
    await syncProfile(profile);
    setIsSyncing(false);
    setSyncSuccessMsg(true);
    setTimeout(() => setSyncSuccessMsg(false), 2500);
  };

  return (
    <div ref={menuRef} className="relative select-none">
      {/* Profile Capsule Button (Clean, Non-Overlapping Segmented Trigger) */}
      <button
        type="button"
        id="user-account-menu-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 h-8.5 sm:h-9.5 rounded-2xl transition-all text-left cursor-pointer border max-w-full sm:max-w-[200px] lg:max-w-[240px] shrink-0 ${
          isOpen
            ? 'bg-indigo-50/90 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700 shadow-xs ring-2 ring-indigo-500/20'
            : 'bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
        }`}
        title="Buka menu akun siswa & opsi keluar"
      >
        {/* Avatar with Online Badge */}
        <div className="relative shrink-0">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-6.5 h-6.5 sm:w-8 sm:h-8 aspect-square object-cover rounded-xl border border-indigo-200 dark:border-indigo-800 shadow-2xs transition-transform"
            />
          ) : (
            <div className="w-6.5 h-6.5 sm:w-8 sm:h-8 aspect-square rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-2xs">
              {profile.avatarLetter || profile.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${
              currentUser ? 'bg-emerald-500' : 'bg-amber-400'
            }`}
            title={currentUser ? 'Akun Google Terhubung (Cloud Sync Aktif)' : 'Mode Lokal (Belum Terhubung Google)'}
          />
        </div>

        {/* User Info with Safe Truncation */}
        <div className="min-w-0 flex-1 leading-tight hidden sm:block">
          <div className="font-extrabold text-slate-900 dark:text-slate-100 text-xs truncate flex items-center gap-1">
            <span className="truncate">{profile.name}</span>
            {currentUser && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Akun Cloud Aktif" />
            )}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate flex items-center gap-1">
            <span>
              Kelas {profile.classGrade} · {profile.educationLevel || 'SMA'} {profile.major || (profile.educationLevel === 'SMK' ? 'TKJ' : 'MIPA')}
            </span>
          </div>
        </div>

        {/* Dropdown Chevron Indicator */}
        <div className="text-slate-400 dark:text-slate-500 pr-0.5 sm:pr-1 shrink-0">
          <ChevronDown
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
            }`}
          />
        </div>
      </button>

      {/* Modern Popover Account Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 sm:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="fixed sm:absolute top-[4.25rem] sm:top-full left-3 right-3 sm:left-auto sm:right-0 sm:mt-2 sm:w-92 max-w-sm sm:max-w-none mx-auto sm:mx-0 p-4 max-h-[calc(100vh-5.5rem)] overflow-y-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-50 text-slate-800 dark:text-slate-100"
            >
            {/* Header: User Profile Details & 1x1 Avatar */}
            <div className="flex items-center gap-3.5 pb-3.5 border-b border-slate-100 dark:border-slate-800">
              <div className="relative shrink-0 group">
                <div className="w-13 h-13 aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-indigo-500/30">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full aspect-square object-cover"
                    />
                  ) : (
                    <span>{profile.avatarLetter || profile.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenProfileModal();
                  }}
                  className="absolute -bottom-1 -right-1 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-xs cursor-pointer"
                  title="Ubah Foto 1x1"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Terverifikasi</span>
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                    profile.educationLevel === 'SMK'
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                      : profile.educationLevel === 'MA'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                  }`}>
                    {profile.educationLevel || 'SMA'} · {profile.major || (profile.educationLevel === 'SMK' ? 'TKJ' : 'MIPA')}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    Kelas {profile.classGrade}
                  </span>
                </div>

                <h3 className="text-sm font-black text-slate-900 dark:text-white truncate" title={profile.name}>
                  {profile.name}
                </h3>
                {profile.schoolName && (
                  <p className="text-[10.5px] text-slate-600 dark:text-slate-300 truncate font-medium">
                    🏫 {profile.schoolName}
                  </p>
                )}
                <p className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1 font-mono">
                  <KeyRound className="w-3 h-3 text-amber-500" />
                  <span>Kode: {profile.accessCode || 'TS2026'}</span>
                </p>
              </div>
            </div>

            {/* Google Account & Cloud Sync Banner */}
            <div className="my-2.5 p-3 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-slate-800/90 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center shadow-2xs shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
                    <span className="text-[11px] font-extrabold text-slate-900 dark:text-white block leading-none">
                      {currentUser ? 'Akun Google Terhubung' : 'Integrasi Akun Google'}
                    </span>
                    <span className="text-[9.5px] text-slate-500 dark:text-slate-400 font-medium">
                      {currentUser ? currentUser.email : 'Simpan progres otomatis ke cloud'}
                    </span>
                  </div>
                </div>

                {currentUser ? (
                  <button
                    type="button"
                    onClick={handleManualCloudSync}
                    disabled={isSyncing}
                    className="p-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer border border-emerald-500/30"
                    title="Sinkronkan data sekarang"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Proses...' : 'Sinkron'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleGoogleConnect}
                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10.5px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>Masuk</span>
                  </button>
                )}
              </div>

              {syncSuccessMsg && (
                <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-950/60 px-2 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Progres & profil berhasil disinkronkan ke Cloud!</span>
                </div>
              )}
            </div>

            {/* Universal Prestige Grand Card (Display-Only) */}
            <div
              className="my-2 p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 dark:from-amber-950/40 dark:via-slate-900/60 dark:to-amber-950/40 border border-amber-500/40 shadow-2xs select-none"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0 font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Universal Prestige
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black font-mono text-amber-600 dark:text-amber-400 block">
                    {totalPrestige.toLocaleString('id-ID')} PTS
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats Summary Grid */}
            <div className="grid grid-cols-3 gap-2 py-3 border-b border-slate-100 dark:border-slate-800 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenStreakModal?.();
                }}
                className="p-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 hover:border-amber-500/50 transition-colors text-left sm:text-center cursor-pointer"
              >
                <div className="flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400 font-extrabold text-xs">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{profile.streakDays} Hari</span>
                </div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
                  {streakTier.name}
                </div>
              </button>

              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 text-left sm:text-center">
                <div className="flex items-center justify-center gap-1 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{profile.vocabularyMastered}</span>
                </div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
                  Kosakata
                </div>
              </div>

              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-left sm:text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{profile.completedLessons.length}</span>
                </div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400 font-bold truncate mt-0.5">
                  Modul Tuntas
                </div>
              </div>
            </div>

            {/* Menu Options List */}
            <div className="pt-2.5 space-y-1">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenProfileModal();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-xs font-bold cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span>Edit Profil & Foto (1x1)</span>
                </div>
                <span className="text-[10px] text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Atur &rarr;
                </span>
              </button>

              {onOpenStreakModal && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenStreakModal();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-xs font-bold cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <Flame className="w-3.5 h-3.5" />
                    </div>
                    <span>Galeri Api Streak Belajar</span>
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Lihat &rarr;
                  </span>
                </button>
              )}

              {/* Logout / Switch Access Button inside Dropdown */}
              <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  id="user-menu-logout-btn"
                  onClick={handleTriggerLogoutConfirm}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-rose-50/70 hover:bg-rose-100/80 dark:bg-rose-950/30 dark:hover:bg-rose-950/60 text-rose-700 dark:text-rose-400 transition-colors text-xs font-bold cursor-pointer border border-rose-200/60 dark:border-rose-800/60"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300 flex items-center justify-center">
                      <LogOut className="w-3.5 h-3.5" />
                    </div>
                    <span>Keluar / Ganti Akses Buku</span>
                  </div>
                  <span className="text-[10px] bg-rose-200/80 dark:bg-rose-900/80 px-2 py-0.5 rounded-md font-extrabold text-rose-800 dark:text-rose-200">
                    Ganti
                  </span>
                </button>
              </div>
            </div>

            {/* Publisher Badge & Copyright */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>Think Smart English SMA</span>
              <span className="font-semibold text-slate-500 dark:text-slate-400">PT Tiga Serangkai</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </div>
  );
};
