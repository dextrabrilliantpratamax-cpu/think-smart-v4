import { useState, useCallback, useEffect } from 'react';

export interface AudioPlayState {
  isPlaying: boolean;
  currentPhraseId: string | null;
  speed: number;
}

export function useMedievalAudio() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.9); // Slightly slower for clear archaic pronunciation
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback(
    (text: string, id: string, speedOverride?: number) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        console.warn('Speech synthesis is not supported on this browser.');
        return;
      }

      window.speechSynthesis.cancel();

      // Clean phrase for TTS (remove punctuation that might confuse voice like slash brackets)
      const cleanText = text.replace(/[/]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Prefer British or high-quality English voice for authentic medieval feel
      const enVoices = voices.filter(v => v.lang.startsWith('en'));
      const gbVoice = enVoices.find(v => v.lang.includes('GB') || v.lang.includes('en-GB') || v.name.includes('UK') || v.name.includes('British'));
      const usVoice = enVoices.find(v => v.lang.includes('en-US') || v.name.includes('English'));

      if (gbVoice) {
        utterance.voice = gbVoice;
      } else if (usVoice) {
        utterance.voice = usVoice;
      } else if (enVoices.length > 0) {
        utterance.voice = enVoices[0];
      }

      utterance.rate = speedOverride ?? playbackSpeed;
      utterance.pitch = 0.95; // Noble/resonant pitch

      utterance.onstart = () => {
        setIsPlaying(true);
        setCurrentId(id);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentId(null);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setCurrentId(null);
      };

      window.speechSynthesis.speak(utterance);
    },
    [voices, playbackSpeed]
  );

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentId(null);
    }
  }, []);

  return {
    isPlaying,
    currentId,
    playbackSpeed,
    setPlaybackSpeed,
    speak,
    stop,
  };
}
