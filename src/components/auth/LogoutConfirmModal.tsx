import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, X, Cloud, HardDrive, ShieldAlert, ArrowRight, UserCheck } from 'lucide-react';
import { StudentProfile } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  profile: StudentProfile;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  profile,
}) => {
  const { currentUser } = useAuth();

  // Prevent background scrolling when modal is open and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          id="logout-confirm-modal-overlay"
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-950/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-confirm-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100 relative select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              id="btn-close-logout-modal"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors cursor-pointer z-10"
              aria-label="Tutup jendela konfirmasi keluar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header with Warning Tone */}
            <div className="p-6 sm:p-7 pb-4 bg-gradient-to-b from-rose-50/70 dark:from-rose-950/30 to-transparent border-b border-rose-100/60 dark:border-rose-950/40">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/25 ring-4 ring-rose-100 dark:ring-rose-950/50">
                  <LogOut className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="pr-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 mb-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>Konfirmasi Akhiri Sesi</span>
                  </span>
                  <h2
                    id="logout-confirm-title"
                    className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-tight"
                  >
                    Keluar / Ganti Akses Buku?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Sesi belajar aktif siswa akan diakhiri dan dialihkan kembali ke layar aktivasi kode.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7 space-y-4">
              {/* Profile Card Preview */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-500/30 shrink-0 shadow-xs"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-xs">
                      {profile.avatarLetter || profile.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                        {profile.name}
                      </h4>
                      <UserCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      Kelas {profile.classGrade} · {profile.educationLevel || 'SMA'} {profile.major || (profile.educationLevel === 'SMK' ? 'TKJ' : 'MIPA')}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                    Kode Buku
                  </span>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-lg border border-indigo-200/60 dark:border-indigo-800/60">
                    {profile.accessCode || 'TS2026'}
                  </span>
                </div>
              </div>

              {/* Data Persistence Safety Notice */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                  {currentUser ? (
                    <>
                      <Cloud className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Data Tersimpan Aman di Cloud Google:</span>
                    </>
                  ) : (
                    <>
                      <HardDrive className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>Data Belajar Tersimpan di Perangkat Ini:</span>
                    </>
                  )}
                </div>
                <p className="text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {currentUser ? (
                    <span>
                      Seluruh skor latihan UTBK, streak belajar ({profile.streakDays} hari), dan catatan telah tersinkronisasi pada akun <b>{currentUser.email}</b>. Anda dapat login kembali sewaktu-waktu di perangkat manapun tanpa kehilangan data.
                    </span>
                  ) : (
                    <span>
                      Rekaman materi tuntas dan capaian kuis tersimpan di browser ini. Anda dapat masuk kembali dengan memasukkan kode akses buku resmi <b>{profile.accessCode || 'TS2026'}</b>.
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="p-4 sm:p-6 bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-200/80 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3">
              <button
                type="button"
                id="btn-cancel-logout"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-3 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                Batal (Tetap Masuk)
              </button>
              <button
                type="button"
                id="btn-confirm-logout"
                onClick={async () => {
                  await onConfirm();
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-rose-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <LogOut className="w-4 h-4" />
                <span>Ya, Keluar & Ganti Akses</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-80" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
