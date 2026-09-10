import React, { useState, useRef, useEffect } from 'react';
import { TigaSerangkaiLogo } from './TigaSerangkaiLogo';
import tsBgImage from '../assets/images/tiga_serangkai_bg_1786596285216.jpg';
import { StudentProfile } from '../types';
import { SidebarMarqueeText } from './SidebarMarqueeText';
import { ThemeToggle } from './theme/ThemeToggle';
import {
  Home,
  Clock,
  BookOpen,
  GraduationCap,
  Volume2,
  Gamepad2,
  Trophy,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  LogOut,
  User,
  ShieldCheck,
  KeyRound,
  Sparkles,
  Flame,
  Zap,
  Dice5,
  HardDrive
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
  setActiveTab?: (tab: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  profile?: StudentProfile;
  onOpenProfileModal?: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  setActiveTab,
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
  profile,
  onOpenProfileModal,
  onLogout,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // When manually collapsed, hover or scroll makes it expand gracefully
  const isEffectivelyExpanded = !isCollapsed || isHovered || isScrolling;
  const isEffectivelyCollapsed = !isEffectivelyExpanded;

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (isCollapsed) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isCollapsed) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 250);
    }
  };

  const handleScrollOrWheel = () => {
    if (isCollapsed) {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1400);
    }
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleTabSelect = (tabId: string) => {
    if (typeof onTabChange === 'function') {
      onTabChange(tabId);
    } else if (typeof setActiveTab === 'function') {
      setActiveTab(tabId);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const navSections = [
    {
      id: 'sec-beranda',
      title: 'BERANDA',
      items: [
        {
          id: 'home',
          label: 'Beranda & Profil TS',
          icon: <Home className="w-4 h-4" />,
        },
      ],
    },
    {
      id: 'sec-kurikulum',
      title: 'KURIKULUM UTAMA',
      items: [
        {
          id: 'tenses',
          label: '16 Tenses Reference',
          icon: <Clock className="w-4 h-4" />,
        },
        {
          id: 'utbk',
          label: 'Latihan UTBK / SNBT',
          icon: <GraduationCap className="w-4 h-4" />,
        },
      ],
    },
    {
      id: 'sec-keterampilan',
      title: 'KETERAMPILAN BAHASA',
      items: [
        {
          id: 'vocab',
          label: 'Medieval Flashcard & Kosakata',
          icon: <BookOpen className="w-4 h-4" />,
        },
        {
          id: 'listening',
          label: 'Listening Lab (Aksen UK)',
          icon: <Volume2 className="w-4 h-4" />,
        },
      ],
    },
    {
      id: 'sec-games',
      title: 'ZONA FUN',
      isFunZone: true,
      items: [
        {
          id: 'icebreaking',
          label: 'Zona Fun Games',
          icon: <Gamepad2 className="w-4 h-4" />,
          isArcade: true,
        },
      ],
    },
    {
      id: 'sec-progres',
      title: 'PROGRES DAN HASIL',
      items: [
        {
          id: 'progress',
          label: 'Laporan Progres Belajar',
          icon: <Trophy className="w-4 h-4" />,
        },
        {
          id: 'workspace',
          label: 'Google Drive & Sheets Studio',
          icon: <HardDrive className="w-4 h-4" />,
        },
      ],
    },
  ];

  // Dynamic progress metrics
  const completedCount = profile?.completedLessons?.length || 0;
  const totalTargetUnits = 16;
  const progressPercent = Math.min(100, Math.round((completedCount / totalTargetUnits) * 100));

  const sidebarContent = (
    <div 
      className="flex flex-col h-full overflow-hidden select-none"
      onWheel={handleScrollOrWheel}
      onTouchMove={handleScrollOrWheel}
    >
      {/* Brand Header & Logo - Pinned Top */}
      <div
        className={`p-3.5 border-b border-slate-800 flex items-center justify-between relative overflow-hidden bg-slate-900 transition-all shrink-0 ${
          isEffectivelyCollapsed ? 'px-2 flex-col gap-2' : 'px-4'
        }`}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.82)), url(${tsBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <button
          onClick={() => handleTabSelect('home')}
          className="flex items-center gap-2.5 text-left hover:brightness-110 transition-all cursor-pointer min-w-0 flex-1"
          title="Ke Beranda - Think Smart English"
        >
          <div className="w-9 h-9 sm:w-9.5 sm:h-9.5 shrink-0 flex items-center justify-center relative z-10 drop-shadow-md bg-slate-800/70 p-1 rounded-xl border border-slate-700/70">
            <TigaSerangkaiLogo variant="icon" />
          </div>
          {!isEffectivelyCollapsed && (
            <div className="relative z-10 min-w-0 flex-1 select-none animate-in fade-in duration-200 flex flex-col justify-center">
              {/* Line 1: Main Title */}
              <span className="text-[13px] sm:text-[13.5px] font-black tracking-tight text-white uppercase font-sans leading-none drop-shadow-xs truncate">
                Think Smart
              </span>
              {/* Line 2: Edition Subtitle */}
              <span className="text-[10.5px] font-semibold text-amber-300 font-serif italic tracking-wide leading-tight mt-0.5 truncate">
                English edition
              </span>
              {/* Line 3: Publisher Attribution */}
              <span className="text-[8.5px] font-bold text-slate-300 tracking-wider uppercase leading-tight mt-0.5 truncate flex items-center gap-1">
                <span className="font-serif italic lowercase text-slate-400 font-normal text-[8px]">by</span>
                <span className="text-teal-300 font-extrabold tracking-wide">Tiga Serangkai</span>
              </span>
            </div>
          )}
        </button>

        {/* Desktop Collapse Slide Toggle Button */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Kunci Tetap Terbuka' : 'Kecilkan / Auto-Sembunyi'}
            className="hidden md:flex p-1.5 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer relative z-10 shrink-0 border border-slate-700/50"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-amber-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-slate-300" />
            )}
          </button>
        )}

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections & Progress Bar - Independent Smooth Scroll */}
      <div 
        onScroll={handleScrollOrWheel}
        className={`flex-1 overflow-y-auto py-3 px-2 space-y-4 custom-scrollbar ${isScrolling ? 'is-scrolling' : ''}`}
      >
        {navSections.map((section) => (
          <div key={section.id} className="space-y-1">
            {!isEffectivelyCollapsed && (
              <div className="px-2.5 mb-1.5 flex items-center justify-between animate-in fade-in duration-200">
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider ${
                    section.isFunZone
                      ? 'text-amber-400 flex items-center gap-1.5 drop-shadow-xs'
                      : 'text-indigo-400/90'
                  }`}
                >
                  {section.isFunZone && <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />}
                  <span>{section.title}</span>
                </span>
                {section.isFunZone && (
                  <span className="text-[8.5px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-widest">
                    Arcade
                  </span>
                )}
              </div>
            )}
            {section.items.map((item) => {
              const isActive = activeTab === item.id;
              const isFunItem = (item as any).isArcade;

              if (isFunItem) {
                // Distinctive styling for Zona Fun Games
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabSelect(item.id)}
                    title={isEffectivelyCollapsed ? `${item.label} (Zona Permainan & Refleksi)` : undefined}
                    className={`w-full flex items-center rounded-xl text-xs font-bold transition-all duration-200 text-left relative group cursor-pointer ${
                      isEffectivelyCollapsed ? 'justify-center p-2.5 my-1' : 'px-3 py-2.5'
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/25 via-rose-500/20 to-purple-600/25 text-amber-200 border border-amber-400/60 shadow-md shadow-amber-500/10'
                        : 'bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-600/10 text-amber-200/90 hover:text-white border border-amber-500/30 hover:border-amber-400/70 hover:from-amber-500/20 hover:to-purple-600/20 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 font-black shadow-xs scale-105'
                            : 'bg-amber-500/20 text-amber-300 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950'
                        }`}
                      >
                        <Gamepad2 className="w-3.5 h-3.5" />
                      </span>

                      {!isEffectivelyCollapsed && (
                        <div className="min-w-0 flex-1 animate-in fade-in duration-200">
                          <SidebarMarqueeText
                            text={item.label}
                            animate={isActive}
                            className="font-extrabold text-amber-100 group-hover:text-white"
                          />
                        </div>
                      )}
                    </div>

                    {/* Tooltip on Collapsed Hover with special glow */}
                    {isEffectivelyCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-amber-200 text-[11px] font-bold rounded-xl shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 border border-amber-500/50 flex items-center gap-2">
                        <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.label}</span>
                      </div>
                    )}
                  </button>
                );
              }

              // Standard Navigation Items
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabSelect(item.id)}
                  title={isEffectivelyCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 text-left relative group cursor-pointer ${
                    isEffectivelyCollapsed ? 'justify-center px-0' : 'px-3'
                  } ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-200 font-bold border-l-3 border-indigo-400 shadow-xs'
                      : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span
                      className={`w-5 h-5 flex items-center justify-center shrink-0 ${
                        isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {item.icon}
                    </span>

                    {!isEffectivelyCollapsed && (
                      <div className="min-w-0 flex-1 animate-in fade-in duration-200">
                        <SidebarMarqueeText
                          text={item.label}
                          animate={isActive}
                          className={isActive ? 'font-bold text-indigo-200' : 'text-slate-300 group-hover:text-slate-100'}
                        />
                      </div>
                    )}
                  </div>

                  {/* Tooltip on Collapsed Hover */}
                  {isEffectivelyCollapsed && (
                    <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 border border-slate-700 flex items-center gap-1.5">
                      <span>{item.label}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* Theme & Ambiance Controls */}
        {!isEffectivelyCollapsed && (
          <div className="mt-3 animate-in fade-in duration-200">
            <ThemeToggle variant="drawer" />
          </div>
        )}

        {/* Status Progres Unit Box */}
        {!isEffectivelyCollapsed && (
          <div className="mt-4 px-3 py-3 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-2 animate-in fade-in duration-200">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-slate-400">
              <span>Status Progres Belajar</span>
              <span className="text-emerald-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-700/80 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, progressPercent)}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>{completedCount} dari {totalTargetUnits} Unit Selesai</span>
              <button
                type="button"
                onClick={() => handleTabSelect('progress')}
                className="text-indigo-400 hover:text-indigo-300 font-bold hover:underline cursor-pointer"
              >
                Detail &rarr;
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Profile & Account Footer - Pinned Bottom */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/80 shrink-0 space-y-2">
        {profile && (
          isEffectivelyCollapsed ? (
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={onOpenProfileModal}
                className="relative group p-1 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                title={`${profile.name} (Kelas ${profile.classGrade} SMA)`}
              >
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-8 h-8 rounded-xl object-cover border border-indigo-400/50 shadow-xs"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {profile.avatarLetter || profile.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </button>

              {onLogout && (
                <button
                  type="button"
                  id="sidebar-collapsed-logout-btn"
                  onClick={() => {
                    onCloseMobile?.();
                    onLogout();
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                  title="Keluar / Ganti Akses Buku"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="p-2 bg-slate-800/90 rounded-2xl border border-slate-700/70 flex items-center justify-between gap-2 shadow-xs animate-in fade-in duration-200">
              <button
                type="button"
                onClick={onOpenProfileModal}
                className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer group"
                title="Buka Pengaturan Profil Siswa"
              >
                <div className="relative shrink-0">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-9 h-9 rounded-xl object-cover border border-indigo-400/40 shadow-xs group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center font-extrabold text-xs shadow-xs group-hover:scale-105 transition-transform">
                      {profile.avatarLetter || profile.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <SidebarMarqueeText
                    text={profile.name}
                    animate={false}
                    className="font-bold text-xs text-white group-hover:text-indigo-300 transition-colors"
                  />
                  <SidebarMarqueeText
                    text={`Kelas ${profile.classGrade} · ${profile.educationLevel || 'SMA'} ${profile.major || (profile.educationLevel === 'SMK' ? 'TKJ' : 'MIPA')}`}
                    animate={false}
                    className="text-[10px] text-slate-400 font-medium"
                  />
                </div>
              </button>

              {/* Quick Actions */}
              <div className="flex items-center gap-1 shrink-0">
                {onOpenProfileModal && (
                  <button
                    type="button"
                    onClick={onOpenProfileModal}
                    className="p-1.5 text-slate-400 hover:text-indigo-300 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    title="Edit Profil Siswa"
                  >
                    <User className="w-3.5 h-3.5" />
                  </button>
                )}

                {onLogout && (
                  <button
                    type="button"
                    id="sidebar-expanded-logout-btn"
                    onClick={() => {
                      onCloseMobile?.();
                      onLogout();
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 rounded-lg transition-colors cursor-pointer"
                    title="Keluar / Ganti Akses Buku"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )
        )}

        {/* Footer Info */}
        {!isEffectivelyCollapsed && (
          <div className="text-center text-[9px] text-slate-400 space-y-0.5 pt-1 animate-in fade-in duration-200">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60 font-semibold text-[8.5px]">
              <span>Kurikulum SMA · SMK · MA</span>
            </div>
            <p className="text-[9px] text-slate-500">© 2026 PT Tiga Serangkai Pustaka Mandiri</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sticky Quickbar with Smart Hover & Scroll Expansion */}
      <aside
        aria-label="Quickbar Navigasi Utama"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`hidden md:flex bg-[#1E293B] text-white flex-col shrink-0 border-r border-slate-800 h-screen sticky top-0 z-40 transition-all duration-300 ease-in-out ${
          isEffectivelyExpanded ? 'w-64 shadow-2xl shadow-slate-950/60' : 'w-16 shadow-none'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Mobile Off-Canvas Slide Drawer */}
      <aside
        aria-label="Mobile Quickbar Drawer"
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1E293B] text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:hidden h-full ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

