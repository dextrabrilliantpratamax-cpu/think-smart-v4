import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { playFeedbackSound } from '../utils/feedbackSound';

export type ThemeMode = 'light' | 'dark';
export type ReadingAmbiancePreset = 'night_amber' | 'cool_mint' | null;
export type ThemeAmbiance = ReadingAmbiancePreset;
export type ParticleIntensity =
  | 'zephyr'
  | 'downpour'
  | 'ember'
  | 'blaze'
  | 'subtle'
  | 'vibrant'
  // legacy backward-compat
  | 'rain';

export interface ThemeTransitionState {
  targetTheme: ThemeMode;
  x: number;
  y: number;
  id: number;
}

export interface AnimationStyleOption {
  id: ParticleIntensity;
  label: string;
  subtitle: string;
  description: string;
  iconName: 'wind' | 'cloudRain' | 'sparkles' | 'flame' | 'star';
}

interface ThemeContextType {
  theme: ThemeMode;
  ambiance: ReadingAmbiancePreset;
  toggleTheme: (origin?: { x: number; y: number }) => void;
  setTheme: (theme: ThemeMode, origin?: { x: number; y: number }) => void;
  setAmbiance: (ambiance: ReadingAmbiancePreset, origin?: { x: number; y: number }) => void;
  isAnimating: boolean;
  activeTransition: ThemeTransitionState | null;
  ambientParticlesEnabled: boolean;
  setAmbientParticlesEnabled: (enabled: boolean) => void;
  particleIntensity: ParticleIntensity;
  setParticleIntensity: (intensity: ParticleIntensity) => void;
  getAvailableStylesForAmbiance: (ambiancePreset?: ReadingAmbiancePreset) => AnimationStyleOption[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ts_theme') : null;
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [ambiance, setAmbianceState] = useState<ReadingAmbiancePreset>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('readingAmbiancePreset');
    if (saved === 'night_amber' || saved === 'cool_mint') {
      return saved;
    }
    // Backward compatibility: clean up legacy or removed keys
    if (saved === 'dusty_rose') {
      localStorage.removeItem('readingAmbiancePreset');
    }
    if (localStorage.getItem('ts_theme_ambiance')) {
      localStorage.removeItem('ts_theme_ambiance');
    }
    return null;
  });

  const [ambientParticlesEnabled, setAmbientParticlesEnabledState] = useState<boolean>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ts_ambient_particles') : null;
    return saved !== null ? JSON.parse(saved) : true;
  });

  const getStoredStyleForAmbiance = (targetAmbiance: ReadingAmbiancePreset): ParticleIntensity => {
    if (typeof window === 'undefined') {
      if (targetAmbiance === 'cool_mint') return 'zephyr';
      if (targetAmbiance === 'night_amber') return 'ember';
      return 'vibrant';
    }

    if (targetAmbiance === 'cool_mint') {
      const saved = localStorage.getItem('ts_style_cool_mint') as ParticleIntensity;
      if (saved === 'zephyr' || saved === 'downpour') return saved;
      // migrate legacy 'rain' -> 'downpour', 'subtle'|'vibrant' -> 'zephyr'
      const legacy = localStorage.getItem('ts_particle_intensity');
      if (legacy === 'rain') return 'downpour';
      return 'zephyr';
    }

    if (targetAmbiance === 'night_amber') {
      const saved = localStorage.getItem('ts_style_night_amber') as ParticleIntensity;
      if (saved === 'ember' || saved === 'blaze') return saved;
      const legacy = localStorage.getItem('ts_particle_intensity');
      if (legacy === 'vibrant' || legacy === 'rain') return 'blaze';
      return 'ember';
    }

    // Standard mode (null)
    const saved = localStorage.getItem('ts_style_standard') as ParticleIntensity;
    if (saved === 'subtle' || saved === 'vibrant') return saved;
    const legacy = localStorage.getItem('ts_particle_intensity') as ParticleIntensity;
    if (legacy === 'subtle' || legacy === 'vibrant') return legacy;
    return 'vibrant';
  };

  const [particleIntensity, setParticleIntensityState] = useState<ParticleIntensity>(() => {
    return getStoredStyleForAmbiance(ambiance);
  });

  const getAvailableStylesForAmbiance = useCallback(
    (ambiancePreset: ReadingAmbiancePreset = ambiance): AnimationStyleOption[] => {
      if (ambiancePreset === 'cool_mint') {
        return [
          {
            id: 'zephyr',
            label: 'Zephyr',
            subtitle: 'Semilir Sejuk',
            description: 'Angin sejuk berhembus, daun mint & kristal es melayang samar',
            iconName: 'wind',
          },
          {
            id: 'downpour',
            label: 'Downpour',
            subtitle: 'Hujan Hutan',
            description: 'Rintik hujan pinus segar berderai dengan dedaunan berjatuhan',
            iconName: 'cloudRain',
          },
        ];
      }

      if (ambiancePreset === 'night_amber') {
        return [
          {
            id: 'ember',
            label: 'Ember',
            subtitle: 'Bara Tenang',
            description: 'Pendar hangat bara perapian yang melayang lembut menenangkan mata',
            iconName: 'sparkles',
          },
          {
            id: 'blaze',
            label: 'Blaze',
            subtitle: 'Nyala Kobar',
            description: 'Percikan lidah api aktif dan pendar panas yang berkobar energik',
            iconName: 'flame',
          },
        ];
      }

      // Default Standard Mode
      return [
        {
          id: 'subtle',
          label: 'Subtle',
          subtitle: 'Tenang',
          description: 'Kerlip bintang hening di malam hari / partikel surya lembut di siang hari',
          iconName: 'star',
        },
        {
          id: 'vibrant',
          label: 'Vibrant',
          subtitle: 'Semarak',
          description: 'Koleksi rasi bintang kosmik & meteor jatuh / kilau cahaya cerah',
          iconName: 'sparkles',
        },
      ];
    },
    [ambiance]
  );

  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [activeTransition, setActiveTransition] = useState<ThemeTransitionState | null>(null);

  // Sync classes with <html> tag
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('ts_theme', theme);
  }, [theme]);

  // Sync reading ambiance classes & data attribute
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    [
      'ambiance-standard',
      'ambiance-sepia',
      'ambiance-midnight',
      'ambiance-cyberpunk',
      'ambiance-night_amber',
      'ambiance-cool_mint',
      'ambiance-dusty_rose',
    ].forEach((cls) => {
      root.classList.remove(cls);
    });

    if (ambiance) {
      root.classList.add(`ambiance-${ambiance}`);
      root.setAttribute('data-ambiance', ambiance);
      localStorage.setItem('readingAmbiancePreset', ambiance);
    } else {
      root.removeAttribute('data-ambiance');
      localStorage.removeItem('readingAmbiancePreset');
    }
  }, [ambiance]);

  const setAmbientParticlesEnabled = (enabled: boolean) => {
    setAmbientParticlesEnabledState(enabled);
    localStorage.setItem('ts_ambient_particles', JSON.stringify(enabled));
  };

  const setParticleIntensity = (intensity: ParticleIntensity) => {
    setParticleIntensityState(intensity);
    localStorage.setItem('ts_particle_intensity', intensity);

    if (ambiance === 'cool_mint') {
      localStorage.setItem('ts_style_cool_mint', intensity);
    } else if (ambiance === 'night_amber') {
      localStorage.setItem('ts_style_night_amber', intensity);
    } else {
      localStorage.setItem('ts_style_standard', intensity);
    }
  };

  const setAmbiance = useCallback(
    (newAmbiance: ReadingAmbiancePreset, origin?: { x: number; y: number }) => {
      setAmbianceState(newAmbiance);

      // Automatically switch to the style saved/customized for this ambiance
      const appropriateStyle = getStoredStyleForAmbiance(newAmbiance);
      setParticleIntensityState(appropriateStyle);
      localStorage.setItem('ts_particle_intensity', appropriateStyle);

      // When selecting one of the presets (cool_mint, night_amber) while in light mode,
      // automatically transition to dark (night) mode
      if (newAmbiance !== null && theme === 'light') {
        const x = origin?.x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
        const y = origin?.y ?? (typeof window !== 'undefined' ? 50 : 0);

        setIsAnimating(true);
        setActiveTransition({
          targetTheme: 'dark',
          x,
          y,
          id: Date.now(),
        });

        playFeedbackSound('moonrise');
        setThemeState('dark');

        setTimeout(() => {
          setIsAnimating(false);
        }, 700);

        setTimeout(() => {
          setActiveTransition(null);
        }, 950);
      }
    },
    [theme]
  );

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const nextTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
      const x = origin?.x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
      const y = origin?.y ?? (typeof window !== 'undefined' ? 50 : 0);

      setIsAnimating(true);
      setActiveTransition({
        targetTheme: nextTheme,
        x,
        y,
        id: Date.now(),
      });

      if (nextTheme === 'light') {
        playFeedbackSound('sunrise');
        // When user switches to light mode, ambiance automatically becomes standard mode
        setAmbianceState(null);
      } else {
        playFeedbackSound('moonrise');
      }

      setThemeState(nextTheme);

      setTimeout(() => {
        setIsAnimating(false);
      }, 700);

      setTimeout(() => {
        setActiveTransition(null);
      }, 950);
    },
    [theme]
  );

  const setTheme = useCallback(
    (newTheme: ThemeMode, origin?: { x: number; y: number }) => {
      if (newTheme === theme) return;
      const x = origin?.x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
      const y = origin?.y ?? (typeof window !== 'undefined' ? 50 : 0);

      setIsAnimating(true);
      setActiveTransition({
        targetTheme: newTheme,
        x,
        y,
        id: Date.now(),
      });

      if (newTheme === 'light') {
        playFeedbackSound('sunrise');
        // When user switches to light mode, ambiance automatically becomes standard mode
        setAmbianceState(null);
      } else {
        playFeedbackSound('moonrise');
      }

      setThemeState(newTheme);

      setTimeout(() => {
        setIsAnimating(false);
      }, 700);

      setTimeout(() => {
        setActiveTransition(null);
      }, 950);
    },
    [theme]
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        ambiance,
        toggleTheme,
        setTheme,
        setAmbiance,
        isAnimating,
        activeTransition,
        ambientParticlesEnabled,
        setAmbientParticlesEnabled,
        particleIntensity,
        setParticleIntensity,
        getAvailableStylesForAmbiance,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
