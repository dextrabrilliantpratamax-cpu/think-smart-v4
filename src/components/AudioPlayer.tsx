import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Music2,
  Sparkles,
  ChevronDown,
  Disc3,
  Radio,
  Lock,
  RotateCcw,
  RotateCw,
  Sliders,
  X,
  Headphones,
  Check,
  UploadCloud,
  FileMusic,
  Trash2,
  Repeat,
  Gauge,
  FileAudio,
  Plus
} from 'lucide-react';
import { useAudio, PERMANENT_SONG } from '../context/AudioContext';
import { formatFileSize } from '../utils/audioStorage';

interface AudioPlayerProps {
  variant?: 'floating-bar' | 'header-compact' | 'beranda-card';
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ variant = 'header-compact' }) => {
  const {
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    progress,
    songInfo,
    activeTrackType,
    customTracks,
    playbackRate,
    loopMode,
    isAutoplayBlocked,
    togglePlay,
    setVolume,
    setIsMuted,
    seekTo,
    setPlaybackRate,
    setLoopMode,
    triggerUnlockAutoplay,
    uploadCustomAudio,
    switchToDefaultSong,
    switchToCustomSong,
    deleteCustomSong
  } = useAudio();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'player' | 'custom-library'>('player');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const popoverRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const berandaFileInputRef = useRef<HTMLInputElement>(null);

  // Close popover when clicked outside or escape key is pressed
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPopoverOpen(false);
      }
    };

    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPopoverOpen]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    seekTo(val);
  };

  const handleSkipSeconds = (seconds: number) => {
    seekTo(currentTime + seconds);
  };

  const handleProcessFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/i)) {
      setUploadError('Harap pilih file berformat audio (.mp3, .wav, .m4a, .ogg, dll).');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      await uploadCustomAudio(file);
      setActiveTab('player');
    } catch (err: any) {
      console.error('Upload audio error:', err);
      setUploadError('Gagal memproses file audio. Silakan coba file lain.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  // 1. HEADER INTERACTIVE COMPACT AUDIO CONTROLLER
  if (variant === 'header-compact') {
    return (
      <div ref={popoverRef} className="relative select-none">
        {/* Hidden File Input for quick upload */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac"
          className="hidden"
        />

        {/* Main Header Capsule Trigger */}
        <div
          className={`liquid-glass-chrome flex items-center gap-1 sm:gap-2 px-1.5 py-1 sm:px-2.5 sm:py-1.5 h-8.5 sm:h-9.5 rounded-2xl border transition-all backdrop-blur-md shadow-2xs shrink-0 ${
            isPopoverOpen
              ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/50 text-amber-900 dark:text-amber-300 ring-2 ring-amber-500/20'
              : isPlaying
              ? activeTrackType === 'custom'
                ? 'bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-500/40 text-indigo-900 dark:text-indigo-200 hover:border-indigo-500/70'
                : 'bg-slate-100/90 dark:bg-slate-900/90 border-amber-500/30 dark:border-amber-500/30 text-slate-800 dark:text-white hover:border-amber-500/60'
              : 'bg-slate-100/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-white hover:border-slate-300 dark:hover:border-slate-600'
          }`}
        >
          {/* Quick Play/Pause Direct Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs ${
              isPlaying
                ? activeTrackType === 'custom'
                  ? 'bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold hover:scale-105'
                  : 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold hover:scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
            title={isPlaying ? 'Jeda Lagu' : 'Putar Lagu'}
          >
            {isPlaying ? (
              <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            ) : (
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Expandable Hub Trigger Area */}
          <button
            type="button"
            onClick={() => setIsPopoverOpen((prev) => !prev)}
            className="flex items-center gap-1 sm:gap-2 text-left cursor-pointer group focus:outline-none"
            title="Klik untuk membuka Kontrol Musik, Custom MP3, Durasi, dan Volume"
          >
            <div className="hidden sm:flex flex-col min-w-[95px] max-w-[130px]">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {songInfo.title}
                </span>
                {isPlaying && (
                  <span className="flex items-end gap-0.5 h-2.5 shrink-0">
                    <span className={`w-0.5 ${activeTrackType === 'custom' ? 'bg-indigo-500' : 'bg-amber-500'} rounded-full animate-[bounce_0.6s_infinite_100ms] h-full`} />
                    <span className="w-0.5 bg-rose-500 rounded-full animate-[bounce_0.6s_infinite_300ms] h-2/3" />
                    <span className="w-0.5 bg-indigo-600 rounded-full animate-[bounce_0.6s_infinite_200ms] h-4/5" />
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                {activeTrackType === 'custom' ? (
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Custom MP3</span>
                ) : (
                  <span>{songInfo.artist}</span>
                )}
              </span>
            </div>

            {/* Micro Volume/Status Icon */}
            <div
              className={`p-0.5 sm:p-1 rounded-lg transition-colors ${
                isPopoverOpen
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-500/20'
                  : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white'
              }`}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500" />
              ) : volume < 0.4 ? (
                <Volume1 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              ) : (
                <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              )}
            </div>

            {/* Expand Indicator Chevron */}
            <ChevronDown
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 dark:text-slate-500 transition-transform duration-200 hidden sm:block ${
                isPopoverOpen ? 'rotate-180 text-amber-500' : 'group-hover:text-slate-600 dark:group-hover:text-slate-300'
              }`}
            />
          </button>
        </div>

        {/* 2. SUPERCHARGED INTERACTIVE MUSIC HUB POPOVER */}
        <AnimatePresence>
          {isPopoverOpen && (
            <>
              {/* Mobile Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPopoverOpen(false)}
                className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 sm:hidden"
              />

              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="liquid-glass-chrome fixed sm:absolute top-[4.25rem] sm:top-full left-3 right-3 sm:left-auto sm:right-0 sm:mt-2 sm:w-96 max-w-md sm:max-w-none mx-auto sm:mx-0 p-4 sm:p-5 max-h-[calc(100vh-5.5rem)] overflow-y-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-50 text-slate-800 dark:text-slate-100"
              >
              {/* Header inside popover */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                      Pusat Musik Belajar
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      BGM Resmi & Custom MP3 Player
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsPopoverOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Mode Navigation Tabs */}
              <div className="mt-3 grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('player')}
                  className={`py-1.5 px-3 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'player'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Disc3 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pemutar Musik</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('custom-library')}
                  className={`py-1.5 px-3 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'custom-library'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <FileMusic className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Koleksi Lagu ({customTracks.length})</span>
                </button>
              </div>

              {/* TAB 1: PLAYER VIEW */}
              {activeTab === 'player' && (
                <>
                  {/* Track Artwork & Vinyl Player Showcase */}
                  <div className="mt-3.5 p-3 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-900/60 flex items-center gap-3.5 shadow-inner relative overflow-hidden">
                    <div className="relative shrink-0">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${
                        activeTrackType === 'custom'
                          ? 'from-indigo-500 via-sky-500 to-purple-600'
                          : 'from-amber-500 via-rose-500 to-indigo-600'
                      } flex items-center justify-center shadow-md`}>
                        <Disc3 className={`w-6 h-6 text-white ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
                      </div>
                      {isPlaying && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        {activeTrackType === 'custom' ? (
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-indigo-300" />
                            <span>Lagu Kustom User</span>
                          </span>
                        ) : (
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                            BGM Resmi Pembelajaran
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-extrabold text-white truncate mt-0.5">
                        {songInfo.title}
                      </h3>
                      <p className="text-xs text-indigo-300 font-medium truncate">
                        {songInfo.artist}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Duration & Scrub Bar */}
                  <div className="mt-3 space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                      <span className="text-indigo-600 dark:text-indigo-400">{formatTime(currentTime)}</span>
                      <span className="text-slate-400">Durasi: {formatTime(duration || 208)}</span>
                    </div>

                    <div className="relative flex items-center group py-1">
                      <input
                        type="range"
                        min="0"
                        max={duration || 208}
                        value={currentTime}
                        onChange={handleSeekChange}
                        className="w-full accent-amber-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer transition-all"
                      />
                    </div>

                    {/* Quick Seek Navigation Buttons */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => handleSkipSeconds(-10)}
                        className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                        title="Mundur 10 detik"
                      >
                        <RotateCcw className="w-3 h-3 text-slate-500" />
                        <span>-10s</span>
                      </button>

                      <button
                        type="button"
                        onClick={togglePlay}
                        className={`px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 ${
                          isPlaying
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
                        }`}
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>Jeda Audio</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            <span>Putar Musik</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSkipSeconds(10)}
                        className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                        title="Maju 10 detik"
                      >
                        <span>+10s</span>
                        <RotateCw className="w-3 h-3 text-slate-500" />
                      </button>
                    </div>
                  </div>

                  {/* Tempo / Playback Speed & Loop Options */}
                  <div className="mt-2.5 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Tempo:</span>
                      <div className="flex items-center gap-1">
                        {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                          <button
                            key={speed}
                            type="button"
                            onClick={() => setPlaybackRate(speed)}
                            className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                              playbackRate === speed
                                ? 'bg-indigo-600 text-white shadow-2xs'
                                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLoopMode(loopMode === 'loop' ? 'once' : 'loop')}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                        loopMode === 'loop'
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                          : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                      }`}
                      title={loopMode === 'loop' ? 'Ulang lagu otomatis (Aktif)' : 'Putar 1x selesai'}
                    >
                      <Repeat className="w-3 h-3" />
                      <span>{loopMode === 'loop' ? 'Loop' : '1x Saja'}</span>
                    </button>
                  </div>

                  {/* Volume Controller & Presets */}
                  <div className="mt-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[11px]">Tingkat Volume Audio</span>
                      </div>
                      <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400">
                        {Math.round((isMuted ? 0 : volume) * 100)}%
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                          isMuted || volume === 0
                            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-600'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                        title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-rose-500" />
                        ) : volume < 0.4 ? (
                          <Volume1 className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-amber-500" />
                        )}
                      </button>

                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          setVolume(parseFloat(e.target.value));
                          setIsMuted(false);
                        }}
                        className="w-full accent-amber-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Switch to BGM / Upload Quick Action Bar */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    {activeTrackType === 'custom' ? (
                      <button
                        type="button"
                        onClick={switchToDefaultSong}
                        className="flex-1 py-1.5 px-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Disc3 className="w-3.5 h-3.5" />
                        <span>Kembali ke BGM Resmi</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 py-1.5 px-2 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Upload Lagu MP3 Baru</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setActiveTab('custom-library')}
                      className="py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <FileMusic className="w-3 h-3" />
                      <span>Koleksi ({customTracks.length})</span>
                    </button>
                  </div>
                </>
              )}

              {/* TAB 2: CUSTOM AUDIO UPLOAD & LIBRARY */}
              {activeTab === 'custom-library' && (
                <div className="mt-3 space-y-3">
                  {/* Upload Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-4 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-indigo-500 bg-indigo-500/10 scale-[0.99]'
                        : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div className="w-9 h-9 mx-auto rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                      <UploadCloud className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {isUploading ? 'Sedang Memproses Audio...' : 'Klik atau Tarik File MP3 ke Sini'}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Mendukung MP3, WAV, M4A, OGG, AAC (Tersimpan otomatis di browser)
                    </p>
                  </div>

                  {uploadError && (
                    <div className="p-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 rounded-xl text-[10px] font-medium">
                      {uploadError}
                    </div>
                  )}

                  {/* Song List: Default vs Custom Tracks */}
                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-0.5">
                    {/* 1. Official BGM Option */}
                    <div
                      onClick={switchToDefaultSong}
                      className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        activeTrackType === 'default'
                          ? 'bg-amber-500/15 border-amber-500/50 text-amber-950 dark:text-amber-200 ring-1 ring-amber-500/30'
                          : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                          <Disc3 className={`w-4 h-4 ${activeTrackType === 'default' && isPlaying ? 'animate-spin' : ''}`} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate flex items-center gap-1.5">
                            <span>{PERMANENT_SONG.title}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold uppercase">
                              Resmi
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {PERMANENT_SONG.artist} · BGM Bawaan
                          </div>
                        </div>
                      </div>

                      {activeTrackType === 'default' && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 shrink-0">
                          <Check className="w-3.5 h-3.5" />
                          <span>Aktif</span>
                        </div>
                      )}
                    </div>

                    {/* 2. Custom Uploaded Tracks */}
                    {customTracks.length === 0 ? (
                      <div className="p-3 text-center text-[11px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                        Belum ada lagu kustom yang diupload. Upload lagu favoritmu untuk menemani belajar!
                      </div>
                    ) : (
                      customTracks.map((track) => {
                        const isCurrent = activeTrackType === 'custom' && songInfo.id === track.id;
                        return (
                          <div
                            key={track.id}
                            className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                              isCurrent
                                ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500/50 text-indigo-950 dark:text-indigo-200 ring-1 ring-indigo-500/30'
                                : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-slate-300'
                            }`}
                          >
                            <div
                              onClick={() => switchToCustomSong(track.id)}
                              className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
                            >
                              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                <FileAudio className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-bold truncate">
                                  {track.name}
                                </div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                  {formatFileSize(track.size)} · Tersimpan di Browser
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {isCurrent ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 bg-indigo-500/10 rounded-md">
                                  <Check className="w-3 h-3" />
                                  <span>Diputar</span>
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => switchToCustomSong(track.id)}
                                  className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition-colors cursor-pointer"
                                  title="Putar lagu ini"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteCustomSong(track.id);
                                }}
                                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                                title="Hapus lagu ini"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Back to Player Button */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('player')}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs transition-colors cursor-pointer text-center"
                  >
                    Kembali ke Kontrol Player
                  </button>
                </div>
              )}

              {/* Autoplay blocked fallback alert */}
              {isAutoplayBlocked && !isPlaying && (
                <div className="mt-3 p-2.5 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 rounded-2xl flex items-center justify-between gap-2 text-xs text-amber-900 dark:text-amber-200">
                  <div className="flex items-center gap-1.5 text-[11px] leading-tight">
                    <Radio className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
                    <span>Browser membatasi autoplay otomatis.</span>
                  </div>
                  <button
                    type="button"
                    onClick={triggerUnlockAutoplay}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-[10px] shrink-0 cursor-pointer shadow-xs"
                  >
                    Buka Kunci Audio
                  </button>
                </div>
              )}

              {/* Educational Note */}
              <p className="mt-3 text-[10px] text-slate-400 dark:text-slate-500 text-center leading-tight">
                Lagu latar resmi (Golden Brown) terputar saat web dibuka. Anda dapat mengupload MP3 sendiri sesuka hati.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    );
  }

  // 3. BERANDA INLINE CARD BANNER (FOR DASHBOARD)
  if (variant === 'beranda-card') {
    return (
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl border border-indigo-900/60 p-5 sm:p-6 shadow-md relative overflow-hidden">
        {/* Hidden input for direct upload from Beranda */}
        <input
          type="file"
          ref={berandaFileInputRef}
          onChange={handleFileInputChange}
          accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac"
          className="hidden"
        />

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative shrink-0">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${
                activeTrackType === 'custom'
                  ? 'from-indigo-500 via-sky-500 to-purple-600'
                  : 'from-amber-500 via-rose-500 to-indigo-600'
              } flex items-center justify-center shadow-md`}>
                <Disc3 className={`w-6 h-6 text-white ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
              </div>
              {isPlaying && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
              )}
            </div>

            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                {activeTrackType === 'custom' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-extrabold tracking-wide uppercase">
                    <Sparkles className="w-2.5 h-2.5 text-indigo-300" />
                    <span>Lagu Kustom Anda ({songInfo.title})</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-extrabold tracking-wide uppercase">
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                    <span>Musik Laman Utama (Resmi)</span>
                  </span>
                )}

                <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                  <Lock className="w-2.5 h-2.5 text-slate-500" />
                  <span>Auto-Loop Terintegrasi di Header</span>
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-white truncate flex items-center gap-2">
                <span>{songInfo.title}</span>
                <span className="text-slate-400 text-xs font-normal">—</span>
                <span className="text-indigo-300 text-xs sm:text-sm font-semibold">{songInfo.artist}</span>
              </h3>

              <p className="text-[11px] text-slate-400 truncate">
                {activeTrackType === 'custom'
                  ? 'Sedang memutar file MP3 kustom Anda. Anda dapat beralih kembali ke BGM resmi kapan saja.'
                  : 'Lagu latar resmi otomatis terputar untuk menemani belajar. Anda juga bisa mengupload MP3 kustom sendiri!'}
              </p>
            </div>
          </div>

          {/* Controls & Equalizer */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap">
            {/* Direct Upload MP3 button */}
            <button
              type="button"
              onClick={() => berandaFileInputRef.current?.click()}
              className="px-3 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Upload lagu MP3 kustom Anda"
            >
              <UploadCloud className="w-3.5 h-3.5 text-indigo-400" />
              <span>{activeTrackType === 'custom' ? 'Ganti MP3' : 'Upload MP3'}</span>
            </button>

            {activeTrackType === 'custom' && (
              <button
                type="button"
                onClick={switchToDefaultSong}
                className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Kembalikan ke BGM Asli (Golden Brown)"
              >
                <Disc3 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Reset BGM Resmi</span>
              </button>
            )}

            <div className="flex items-center gap-2 sm:gap-3 bg-slate-950/60 p-1.5 sm:p-2 rounded-2xl border border-slate-800">
              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={togglePlay}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    <span>Putar</span>
                  </>
                )}
              </button>

              {/* Volume & Mute */}
              <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title={isMuted ? 'Nyalakan Suara' : 'Bisukan'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : volume < 0.4 ? (
                    <Volume1 className="w-4 h-4 text-slate-300" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-amber-400" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-14 sm:w-18 accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-3">
          <span className="text-[10px] text-slate-400 font-mono w-9 shrink-0">
            {formatTime(currentTime)}
          </span>
          <div className="relative flex-1 group">
            <input
              type="range"
              min="0"
              max={duration || 208}
              value={currentTime}
              onChange={handleSeekChange}
              className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer transition-all"
            />
          </div>
          <span className="text-[10px] text-slate-400 font-mono w-9 text-right shrink-0">
            {formatTime(duration || 208)}
          </span>
        </div>

        {/* If Autoplay was blocked by browser */}
        {isAutoplayBlocked && !isPlaying && (
          <div className="mt-2.5 p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between gap-2 text-xs text-amber-200 animate-fade-in">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
              <span>Browser membatasi autoplay. Klik untuk mulai mendengarkan:</span>
            </div>
            <button
              type="button"
              onClick={triggerUnlockAutoplay}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shrink-0"
            >
              Aktifkan Audio
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
};
