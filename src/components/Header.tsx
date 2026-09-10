import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Command, Cloud, CloudCheck, RefreshCw, AlertCircle } from 'lucide-react';
import { StudentProfile } from '../types';
import { AudioPlayer } from './AudioPlayer';
import { StreakFlameAnimation } from './streak/StreakFlameAnimation';
import { ThemeToggle } from './theme/ThemeToggle';
import { UserAccountMenu } from './UserAccountMenu';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  profile: StudentProfile;
  onOpenProfileModal: () => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenSearchModal?: () => void;
  onNavigateHome?: () => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  onToggleMobileSidebar?: () => void;
  onUpdateStreak?: (newDays: number) => void;
  onOpenStreakModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenProfileModal,
  onLogout,
  searchQuery,
  onSearchChange,
  onOpenSearchModal,
  onToggleMobileSidebar,
  onUpdateStreak,
  onOpenStreakModal,
}) => {
  const { currentUser, syncStatus, syncProfile, signInWithGoogle } = useAuth();
  const [isSyncingManual, setIsSyncingManual] = useState(false);

  // Global hotkey listener for Cmd+K / Ctrl+K / '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearchModal?.();
      } else if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        onOpenSearchModal?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearchModal]);

  const handleUpdateStreak = (newDays: number) => {
    if (onUpdateStreak) {
      onUpdateStreak(newDays);
    }
  };

  const handleManualSyncClick = async () => {
    if (!currentUser) {
      onOpenProfileModal();
      return;
    }
    setIsSyncingManual(true);
    await syncProfile(profile);
    setTimeout(() => setIsSyncingManual(false), 500);
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Left Section: Navigation Controls & Expanded Search Input */}
        <div className="flex-1 min-w-0 max-w-xl flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Menu Slide Drawer Toggle (Only on small screens) */}
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              title="Buka Navigasi (Slide)"
              className="md:hidden p-1.5 sm:p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl transition-colors shrink-0 flex items-center justify-center cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </button>
          )}

          {/* Universal Spotlight Search Bar Trigger */}
          <div 
            onClick={() => onOpenSearchModal?.()}
            className="relative flex-1 min-w-[64px] sm:min-w-[240px] cursor-pointer group"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-2 sm:left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors pointer-events-none" />
            
            <div className="w-full pl-6 sm:pl-10 pr-1.5 sm:pr-20 py-1.5 sm:py-2 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 rounded-xl text-xs text-slate-800 dark:text-slate-100 transition-all shadow-2xs flex items-center justify-between select-none">
              <span className={searchQuery ? 'font-semibold text-slate-900 dark:text-white truncate' : 'text-slate-400 dark:text-slate-500 truncate'}>
                <span className="inline sm:hidden">{searchQuery || 'Cari...'}</span>
                <span className="hidden sm:inline">{searchQuery || 'Cari tenses, kata kuno, UTBK, audio...'}</span>
              </span>

              <div className="flex items-center gap-1 shrink-0 ml-1 sm:ml-2">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSearchChange('');
                    }}
                    className="p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Hapus pencarian"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-mono font-bold">
                    <Command className="w-2.5 h-2.5" />
                    <span>K</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Media Audio Bar, Dark Mode Toggle, Streak, & Profile */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Header Compact Audio Player */}
          <AudioPlayer variant="header-compact" />

          {/* Theme Mode Toggle Capsule & Ambiance Customizer */}
          <ThemeToggle variant="pill" />

          {/* Cloud Sync Status Indicator - Fixed Width Container to prevent Layout Shift */}
          {currentUser ? (
            <button
              type="button"
              onClick={handleManualSyncClick}
              title={`Akun Google terhubung: ${currentUser.email}. Klik untuk sinkronkan sekarang.`}
              className="hidden xl:inline-flex items-center justify-center gap-1.5 w-[148px] h-9 shrink-0 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/60 px-2.5 rounded-xl text-[11px] font-bold text-emerald-800 dark:text-emerald-300 shadow-2xs transition-all cursor-pointer select-none"
            >
              {syncStatus === 'syncing' || isSyncingManual ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-spin shrink-0" />
                  <span className="truncate">Menyinkronkan...</span>
                </>
              ) : syncStatus === 'error' ? (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="truncate">Sinkronkan Ulang</span>
                </>
              ) : (
                <>
                  <Cloud className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">Tersimpan di Cloud</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenProfileModal}
              title="Hubungkan akun Google agar progres tersimpan online"
              className="hidden xl:inline-flex items-center justify-center gap-1.5 w-[148px] h-9 shrink-0 bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/40 border border-slate-200 hover:border-indigo-300 dark:border-slate-700 dark:hover:border-indigo-700 px-2.5 rounded-xl text-[11px] font-bold text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300 shadow-2xs transition-all cursor-pointer select-none"
            >
              <Cloud className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 shrink-0" />
              <span className="truncate">Simpan Online</span>
            </button>
          )}

          {/* Creative Animated Streak Flame Indicator */}
          <StreakFlameAnimation
            streakDays={profile.streakDays}
            onClick={onOpenStreakModal}
            size="md"
          />

          {/* Visual Divider */}
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-0.5 hidden sm:block" />

          {/* Seamless Non-Overlapping User Profile & Account Menu */}
          <UserAccountMenu
            profile={profile}
            onOpenProfileModal={onOpenProfileModal}
            onLogout={onLogout}
            onOpenStreakModal={onOpenStreakModal}
          />
        </div>
      </div>
    </header>
  );
};




