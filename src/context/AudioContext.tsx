import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  StoredAudioItem,
  getAllStoredAudios,
  saveAudioToStorage,
  deleteStoredAudio
} from '../utils/audioStorage';

export interface SongMetadata {
  id: string;
  title: string;
  artist: string;
  album: string;
  durationFormatted: string;
  sourceUrl: string;
  isCustom?: boolean;
  size?: number;
}

interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  songInfo: SongMetadata;
  activeTrackType: 'default' | 'custom';
  customTracks: StoredAudioItem[];
  playbackRate: number;
  loopMode: 'loop' | 'once';
  isAutoplayBlocked: boolean;
  togglePlay: () => void;
  playAudio: () => void;
  pauseAudio: () => void;
  setVolume: (val: number) => void;
  setIsMuted: (muted: boolean) => void;
  seekTo: (time: number) => void;
  seekByPercent: (percent: number) => void;
  setPlaybackRate: (rate: number) => void;
  setLoopMode: (mode: 'loop' | 'once') => void;
  triggerUnlockAutoplay: () => void;
  uploadCustomAudio: (file: File) => Promise<StoredAudioItem>;
  switchToDefaultSong: () => void;
  switchToCustomSong: (trackId: string) => Promise<void>;
  deleteCustomSong: (trackId: string) => Promise<void>;
}

// Fixed Default Track Configuration (Golden Brown)
export const PERMANENT_SONG: SongMetadata = {
  id: 'default_golden_brown',
  title: 'Golden Brown',
  artist: 'The Stranglers',
  album: 'Think Smart English Official Study BGM (La Folie)',
  durationFormatted: '3:28',
  sourceUrl: '/audio/golden_brown.mp3',
  isCustom: false,
};

// Mirror fallbacks for the default song in case local asset or network issue occurs
const AUDIO_SOURCE_MIRRORS = [
  '/audio/golden_brown.mp3',
  'https://archive.org/download/the-stranglers-la-folie/02%20-%20The%20Stranglers%20-%20Golden%20Brown.mp3',
  'https://cdn.pixabay.com/download/audio/2022/11/06/audio_c0c32588c8.mp3'
];

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5); // Calm background default volume
  const [isMuted, setIsMutedState] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(208); // 3:28 approx
  const [playbackRate, setPlaybackRateState] = useState(1.0);
  const [loopMode, setLoopModeState] = useState<'loop' | 'once'>('loop');
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [currentMirrorIndex, setCurrentMirrorIndex] = useState(0);

  // Active track state
  const [activeTrackType, setActiveTrackType] = useState<'default' | 'custom'>('default');
  const [currentSongInfo, setCurrentSongInfo] = useState<SongMetadata>(PERMANENT_SONG);
  const [customTracks, setCustomTracks] = useState<StoredAudioItem[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const activeObjectUrlRef = useRef<string | null>(null);

  // Load stored custom audio list from IndexedDB on startup
  useEffect(() => {
    let isMounted = true;
    getAllStoredAudios()
      .then((items) => {
        if (isMounted) {
          setCustomTracks(items);
        }
      })
      .catch((err) => {
        console.warn('Failed to load custom tracks from IndexedDB:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Safe Play wrapper that handles browser autoplay restrictions gracefully
  const playAudioSafe = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (!audio.src || audio.error) {
        if (activeTrackType === 'default') {
          audio.src = AUDIO_SOURCE_MIRRORS[currentMirrorIndex] || AUDIO_SOURCE_MIRRORS[0];
        }
        audio.load();
      }

      audio.volume = isMuted ? 0 : volume;
      audio.playbackRate = playbackRate;
      audio.loop = loopMode === 'loop';

      playPromiseRef.current = audio.play();
      await playPromiseRef.current;
      setIsPlaying(true);
      setIsAutoplayBlocked(false);
    } catch (err: any) {
      if (err?.name === 'NotAllowedError' || err?.name === 'AbortError') {
        setIsAutoplayBlocked(true);
        setIsPlaying(false);
      } else {
        console.warn('Audio playback handled:', err?.message || err);
      }
    } finally {
      playPromiseRef.current = null;
    }
  };

  const pauseAudioSafe = () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        audio.pause();
      } catch (err) {
        console.warn('Pause error:', err);
      }
      setIsPlaying(false);
    }
  };

  // Switch to audio source cleanly
  const loadAndPlayTrack = useCallback(async (url: string, metadata: SongMetadata) => {
    const audio = audioRef.current;
    if (!audio) return;

    pauseAudioSafe();
    audio.src = url;
    audio.playbackRate = playbackRate;
    audio.loop = loopMode === 'loop';
    audio.load();

    setCurrentSongInfo(metadata);
    setCurrentTime(0);

    try {
      audio.volume = isMuted ? 0 : volume;
      playPromiseRef.current = audio.play();
      await playPromiseRef.current;
      setIsPlaying(true);
      setIsAutoplayBlocked(false);
    } catch (err: any) {
      if (err?.name === 'NotAllowedError' || err?.name === 'AbortError') {
        setIsAutoplayBlocked(true);
        setIsPlaying(false);
      } else {
        console.warn('Switch track play error:', err?.message || err);
      }
    } finally {
      playPromiseRef.current = null;
    }
  }, [playbackRate, loopMode, isMuted, volume]);

  // Initialize and attach autoplay listeners (Starts with Golden Brown by default)
  useEffect(() => {
    const audio = new Audio();
    audio.src = AUDIO_SOURCE_MIRRORS[0];
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = volume;
    audio.playbackRate = playbackRate;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      if (loopMode === 'once') {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    const handleError = () => {
      if (activeTrackType === 'default') {
        // Try next CDN mirror if an error occurs on default track
        setCurrentMirrorIndex((prev) => {
          const next = prev + 1;
          if (next < AUDIO_SOURCE_MIRRORS.length && audioRef.current) {
            audioRef.current.src = AUDIO_SOURCE_MIRRORS[next];
            audioRef.current.load();
            playAudioSafe();
            return next;
          }
          return prev;
        });
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Initial attempt to autoplay default Golden Brown
    playAudioSafe();

    // User gesture unlock listener
    const handleFirstUserInteraction = () => {
      if (audioRef.current && (!audioRef.current.played.length || audioRef.current.paused)) {
        playAudioSafe();
      }
      cleanupInteractionListeners();
    };

    const cleanupInteractionListeners = () => {
      window.removeEventListener('pointerdown', handleFirstUserInteraction);
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('scroll', handleFirstUserInteraction);
    };

    window.addEventListener('pointerdown', handleFirstUserInteraction, { once: true });
    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });
    window.addEventListener('scroll', handleFirstUserInteraction, { once: true });

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      cleanupInteractionListeners();

      if (activeObjectUrlRef.current) {
        URL.revokeObjectURL(activeObjectUrlRef.current);
        activeObjectUrlRef.current = null;
      }

      try {
        audio.pause();
        audio.src = '';
      } catch (e) {
        // ignore
      }
    };
  }, []);

  // Upload Custom Audio File
  const uploadCustomAudio = async (file: File): Promise<StoredAudioItem> => {
    // 1. Save to IndexedDB
    const saved = await saveAudioToStorage(file);
    setCustomTracks((prev) => [saved, ...prev.filter((item) => item.id !== saved.id)]);

    // 2. Create object URL for instant playback
    if (activeObjectUrlRef.current) {
      URL.revokeObjectURL(activeObjectUrlRef.current);
    }
    const objectUrl = URL.createObjectURL(saved.blob);
    activeObjectUrlRef.current = objectUrl;

    const customMeta: SongMetadata = {
      id: saved.id,
      title: saved.name,
      artist: 'Audio Kustom Anda',
      album: 'Koleksi Musik Belajar Pribadi',
      durationFormatted: 'Custom',
      sourceUrl: objectUrl,
      isCustom: true,
      size: saved.size,
    };

    setActiveTrackType('custom');
    await loadAndPlayTrack(objectUrl, customMeta);

    return saved;
  };

  // Switch back to default original track (Golden Brown)
  const switchToDefaultSong = () => {
    if (activeObjectUrlRef.current) {
      URL.revokeObjectURL(activeObjectUrlRef.current);
      activeObjectUrlRef.current = null;
    }
    setActiveTrackType('default');
    setCurrentMirrorIndex(0);
    loadAndPlayTrack(AUDIO_SOURCE_MIRRORS[0], PERMANENT_SONG);
  };

  // Switch to specific custom track by ID
  const switchToCustomSong = async (trackId: string) => {
    const target = customTracks.find((t) => t.id === trackId);
    if (!target) return;

    if (activeObjectUrlRef.current) {
      URL.revokeObjectURL(activeObjectUrlRef.current);
    }
    const objectUrl = URL.createObjectURL(target.blob);
    activeObjectUrlRef.current = objectUrl;

    const customMeta: SongMetadata = {
      id: target.id,
      title: target.name,
      artist: 'Audio Kustom Anda',
      album: 'Koleksi Musik Belajar Pribadi',
      durationFormatted: 'Custom',
      sourceUrl: objectUrl,
      isCustom: true,
      size: target.size,
    };

    setActiveTrackType('custom');
    await loadAndPlayTrack(objectUrl, customMeta);
  };

  // Delete custom track
  const deleteCustomSong = async (trackId: string) => {
    await deleteStoredAudio(trackId);
    setCustomTracks((prev) => prev.filter((t) => t.id !== trackId));

    // If deleting the active custom song, switch back to default song
    if (activeTrackType === 'custom' && currentSongInfo.id === trackId) {
      switchToDefaultSong();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudioSafe();
    } else {
      playAudioSafe();
    }
  };

  const playAudio = () => {
    playAudioSafe();
  };

  const pauseAudio = () => {
    pauseAudioSafe();
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : clamped;
    }
    if (clamped > 0 && isMuted) {
      setIsMutedState(false);
    }
  };

  const setIsMuted = (muted: boolean) => {
    setIsMutedState(muted);
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  };

  const seekTo = (time: number) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const clamped = Math.max(0, Math.min(audio.duration, time));
      audio.currentTime = clamped;
      setCurrentTime(clamped);
    }
  };

  const seekByPercent = (percent: number) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const targetTime = (percent / 100) * audio.duration;
      seekTo(targetTime);
    }
  };

  const setPlaybackRate = (rate: number) => {
    const clamped = Math.max(0.5, Math.min(2.0, rate));
    setPlaybackRateState(clamped);
    if (audioRef.current) {
      audioRef.current.playbackRate = clamped;
    }
  };

  const setLoopMode = (mode: 'loop' | 'once') => {
    setLoopModeState(mode);
    if (audioRef.current) {
      audioRef.current.loop = mode === 'loop';
    }
  };

  const triggerUnlockAutoplay = () => {
    playAudioSafe();
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        volume,
        isMuted,
        currentTime,
        duration,
        progress,
        songInfo: currentSongInfo,
        activeTrackType,
        customTracks,
        playbackRate,
        loopMode,
        isAutoplayBlocked,
        togglePlay,
        playAudio,
        pauseAudio,
        setVolume,
        setIsMuted,
        seekTo,
        seekByPercent,
        setPlaybackRate,
        setLoopMode,
        triggerUnlockAutoplay,
        uploadCustomAudio,
        switchToDefaultSong,
        switchToCustomSong,
        deleteCustomSong,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
