import React, { useState, useEffect, useRef } from 'react';
import { ListeningItem } from '../types';
import { LISTENING_LAB_ITEMS } from '../data/curriculumData';
import { Volume2, Play, Pause, Save, RotateCcw, CheckCircle2, XCircle, Headphones, Sparkles, Filter, Award, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { recordActivityPrestige } from '../utils/prestigeManager';
import { playFeedbackSound } from '../utils/feedbackSound';

const STORAGE_KEY = 'ts_listening_lab_state';

export interface ListeningViewProps {
  onQuizFinished?: (score: number) => void;
  onAddScore?: (category: string, score: number) => void;
}

export const ListeningView: React.FC<ListeningViewProps> = ({
  onQuizFinished,
  onAddScore,
}) => {
  const [gradeFilter, setGradeFilter] = useState<'All' | 'X' | 'XI' | 'XII'>('All');

  // Filter items
  const filteredItems = LISTENING_LAB_ITEMS.filter(item => {
    if (gradeFilter === 'All') return true;
    return item.gradeLevel === gradeFilter;
  });

  const [activeItem, setActiveItem] = useState<ListeningItem>(filteredItems[0] || LISTENING_LAB_ITEMS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const [earnedPrestigeToast, setEarnedPrestigeToast] = useState<number | null>(null);

  // User answers per question ID: { [questionId: string]: number }
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).answers || {} : {};
    } catch {
      return {};
    }
  });

  // Submitted questions per question ID
  const [submitted, setSubmitted] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).submitted || {} : {};
    } catch {
      return {};
    }
  });

  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // When active item or grade filter changes, ensure valid selection
  useEffect(() => {
    if (filteredItems.length > 0 && !filteredItems.find(i => i.id === activeItem.id)) {
      setActiveItem(filteredItems[0]);
    }
  }, [gradeFilter]);

  // Stop speech synthesis on unmount or item change
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeItem.id]);

  // Save state
  useEffect(() => {
    const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers: userAnswers, submitted }));
      setLastSaved(now);
    } catch (e) {
      console.error('Save error:', e);
    }
  }, [userAnswers, submitted]);

  // Get voice and pitch based on gender ('female' or 'male')
  const getGenderVoiceAndPitch = (gender?: 'male' | 'female') => {
    const voices = window.speechSynthesis.getVoices();
    const enVoices = voices.filter(v => v.lang.startsWith('en'));

    let selectedVoice: SpeechSynthesisVoice | null = null;
    let pitch = 1.0;

    if (gender === 'female') {
      pitch = 1.25; // Higher female pitch
      selectedVoice = enVoices.find(v => 
        /zira|samantha|victoria|karen|female|jenny|aria|google us english|google uk english female/i.test(v.name)
      ) || enVoices.find(v => v.name.includes('Female')) || enVoices[0] || null;
    } else if (gender === 'male') {
      pitch = 0.85; // Lower male pitch
      selectedVoice = enVoices.find(v => 
        /david|alex|george|daniel|male|guy|christopher|google uk english male/i.test(v.name)
      ) || enVoices.find(v => v.name.includes('Male')) || enVoices[1] || enVoices[0] || null;
    } else {
      selectedVoice = enVoices[0] || null;
    }

    return { voice: selectedVoice, pitch };
  };

  // Play a single line audio with gender voice
  const speakSingleLine = (line: { speaker: string; text: string; gender?: 'male' | 'female' }, lineIdx: number) => {
    if (!('speechSynthesis' in window)) {
      alert('Browser Anda tidak mendukung Web Speech API audio playback.');
      return;
    }

    window.speechSynthesis.cancel();
    setActiveLineIndex(lineIdx);

    const utterance = new SpeechSynthesisUtterance(`${line.text}`);
    utterance.lang = 'en-US';
    utterance.rate = playbackRate;

    const { voice, pitch } = getGenderVoiceAndPitch(line.gender);
    if (voice) utterance.voice = voice;
    utterance.pitch = pitch;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      setActiveLineIndex(null);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setActiveLineIndex(null);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Synchronized playback of full dialogue line-by-line with gender voice switching
  const toggleFullPlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setActiveLineIndex(null);
      return;
    }

    if (!('speechSynthesis' in window)) {
      alert('Browser Anda tidak mendukung Web Speech API audio playback.');
      return;
    }

    window.speechSynthesis.cancel();

    const transcript = activeItem.transcript;
    if (transcript.length === 0) return;

    setIsPlaying(true);

    transcript.forEach((t, i) => {
      const utterance = new SpeechSynthesisUtterance(t.text);
      utterance.lang = 'en-US';
      utterance.rate = playbackRate;

      const { voice, pitch } = getGenderVoiceAndPitch(t.gender);
      if (voice) utterance.voice = voice;
      utterance.pitch = pitch;

      utterance.onstart = () => {
        setIsPlaying(true);
        setActiveLineIndex(i);
      };

      utterance.onend = () => {
        if (i === transcript.length - 1) {
          setIsPlaying(false);
          setActiveLineIndex(null);
        }
      };

      utterance.onerror = () => {
        if (i === transcript.length - 1) {
          setIsPlaying(false);
          setActiveLineIndex(null);
        }
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  const handleSelectOption = (qId: string, optionIdx: number) => {
    if (submitted[qId]) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuestion = (qId: string) => {
    if (userAnswers[qId] === undefined) return;
    setSubmitted(prev => ({ ...prev, [qId]: true }));

    const question = activeItem.questions.find(q => q.id === qId);
    if (question && userAnswers[qId] === question.correctAnswerIndex) {
      const earned = 50;
      setEarnedPrestigeToast(earned);
      recordActivityPrestige('listening', earned);
      if (onQuizFinished) onQuizFinished(earned);
      if (onAddScore) onAddScore('listening', earned);
      playFeedbackSound('correct');

      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#F59E0B', '#6366F1', '#10B981'],
        });
      } catch {
        // safe fallback
      }

      setTimeout(() => setEarnedPrestigeToast(null), 3000);
    } else {
      playFeedbackSound('wrong');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
              <Headphones className="w-3.5 h-3.5" /> Audio Listening Lab SMA Kelas 10, 11, 12
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>+50 Prestige / Soal Benar • Auto-Sync Universal</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
              <Save className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Autosave Aktif {lastSaved ? `(${lastSaved})` : ''}</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Listening Practice & Audio MP3 Player</h1>
          <p className="text-slate-300 text-xs mt-1">
            Dengarkan percakapan (Dialogues) dan pidato (Monologues) beraksen standar internasional dengan audio suara jernih & soal pemahaman SMA.
          </p>

          {earnedPrestigeToast && (
            <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/30 border border-amber-400/60 text-amber-200 text-xs font-bold animate-bounce shadow-md">
              <Award className="w-4 h-4 text-amber-300" />
              <span>+{earnedPrestigeToast} Prestige ditambahkan & disinkronkan ke Universal Hub!</span>
            </div>
          )}
        </div>

        {/* Grade Filter Pill Buttons */}
        <div className="flex items-center bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 gap-1 self-stretch md:self-auto">
          <div className="text-[11px] font-bold text-slate-400 px-2 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Grade:
          </div>
          {(['All', 'X', 'XI', 'XII'] as const).map(g => (
            <button
              key={g}
              onClick={() => {
                setGradeFilter(g);
                if (isPlaying) window.speechSynthesis.cancel();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                gradeFilter === g
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {g === 'All' ? 'Semua' : `Kelas ${g}`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Sidebar Item Selector & Audio Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of Audio Topics */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Daftar Soal Listening ({filteredItems.length})
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
              {gradeFilter === 'All' ? 'Kelas 10–12' : `Kelas ${gradeFilter}`}
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredItems.map(item => {
              const isSelected = item.id === activeItem.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item);
                    if (isPlaying) window.speechSynthesis.cancel();
                    setIsPlaying(false);
                    setActiveLineIndex(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-900 text-white">
                      Kelas {item.gradeLevel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{item.accent}</span>
                  </div>
                  <div className={`text-xs font-bold line-clamp-2 ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>{item.topic}</span>
                    <span className="text-indigo-600 font-bold">{item.questions.length} Soal</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Audio Player & Quiz */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          {/* Header */}
          <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-indigo-600 px-2.5 py-0.5 rounded-md">
                  Kelas {activeItem.gradeLevel} SMA
                </span>
                <span className="text-[11px] font-bold text-slate-500">{activeItem.topic}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">{activeItem.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Speaker / Pembicara: <span className="font-semibold text-slate-700">{activeItem.speaker}</span></p>
            </div>
          </div>

          {/* Interactive Audio Player Bar */}
          <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-4 shadow-sm border border-slate-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleFullPlay}
                  className="w-13 h-13 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center font-bold shadow-md transition-all cursor-pointer group"
                  title={isPlaying ? 'Hentikan Audio' : 'Putar Seluruh Audio'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current text-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-current text-white ml-1" />
                  )}
                </button>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{isPlaying ? '🔊 Memutar Audio Suara...' : '▶ Klik Putar Audio High-Quality'}</span>
                    {isPlaying && (
                      <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 font-mono animate-pulse">
                        LIVE SOUND
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Accent: {activeItem.accent} · High Fidelity Speech Synthesis
                  </div>
                </div>
              </div>

              {/* Speed Selector */}
              <div className="flex items-center gap-1.5 bg-slate-800/90 p-1.5 rounded-xl border border-slate-700/80">
                <span className="text-[10px] font-bold text-slate-400 px-1">Kecepatan:</span>
                {[0.8, 1.0, 1.2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => {
                      setPlaybackRate(speed);
                      if (isPlaying) {
                        window.speechSynthesis.cancel();
                        setIsPlaying(false);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      playbackRate === speed
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Animated Equalizer / Waveform */}
            <div className="flex items-center gap-1 h-6 bg-slate-950/60 p-2 rounded-xl border border-slate-800 overflow-hidden">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-indigo-400' : 'bg-slate-700'
                  }`}
                  style={{
                    height: isPlaying
                      ? `${Math.max(15, Math.floor(Math.sin((i + Date.now() / 200) * 0.8) * 40 + 50))}%`
                      : '20%'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Transcript Section with Line-by-Line Playback */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-indigo-600" /> Transkrip Percakapan / Monolog
              </h3>
              <span className="text-[10px] text-slate-400 font-medium">Klik tombol ▶ di samping baris untuk memutar suara spesifik</span>
            </div>

            <div className="space-y-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              {activeItem.transcript.map((t, idx) => {
                const isLineActive = activeLineIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                      isLineActive
                        ? 'bg-indigo-100/90 border-indigo-400 text-indigo-950 font-medium shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="text-xs leading-relaxed flex-1">
                      <span className="font-extrabold text-indigo-900 mr-1.5 inline-flex items-center gap-1">
                        <span>{t.speaker}</span>
                        <span className="text-[11px]" title={`Suara ${t.gender === 'female' ? 'Perempuan' : 'Laki-laki'}`}>
                          {t.gender === 'female' ? '👩' : '👨'}
                        </span>
                        :
                      </span>
                      <span>"{t.text}"</span>
                    </div>
                    <button
                      onClick={() => speakSingleLine(t, idx)}
                      className="px-2 py-1 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 rounded text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0"
                      title={`Putar suara ${t.gender === 'female' ? 'perempuan' : 'laki-laki'} (${t.speaker})`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Play</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quiz Section */}
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Soal Pemahaman Listening (SMA Kelas {activeItem.gradeLevel})
              </h3>
              <span className="text-[11px] font-semibold text-slate-500">
                {activeItem.questions.length} Pertanyaan
              </span>
            </div>

            {activeItem.questions.map((q, qIdx) => {
              const selectedOpt = userAnswers[q.id];
              const isSub = submitted[q.id];
              const isCorrect = selectedOpt === q.correctAnswerIndex;

              return (
                <div key={q.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="font-bold text-xs text-slate-900 flex items-start gap-2">
                    <span className="px-2 py-0.5 bg-slate-900 text-white rounded text-[10px] font-bold">
                      No. {qIdx + 1}
                    </span>
                    <span>{q.question}</span>
                  </div>

                  <div className="space-y-2 pl-1">
                    {q.options.map((opt, oIdx) => {
                      const isOptionSelected = selectedOpt === oIdx;
                      const isOptionCorrect = oIdx === q.correctAnswerIndex;

                      let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300';

                      if (isSub) {
                        if (isOptionCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                        } else if (isOptionSelected) {
                          btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                        } else {
                          btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold shadow-xs';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isSub}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          className={`w-full p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <div>
                            <span className="font-bold mr-2 text-indigo-900">{String.fromCharCode(65 + oIdx)}.</span>
                            <span>{opt}</span>
                          </div>
                          {isSub && isOptionCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                          {isSub && isOptionSelected && !isOptionCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Actions & Explanations */}
                  {!isSub ? (
                    <button
                      onClick={() => handleSubmitQuestion(q.id)}
                      disabled={selectedOpt === undefined}
                      className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-40 cursor-pointer shadow-xs"
                    >
                      Kirim Jawaban Nomor {qIdx + 1}
                    </button>
                  ) : (
                    <div className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1 ${
                      isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Jawaban Benar! (+50 Prestige)</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span>Jawaban Belum Tepat</span>
                          </>
                        )}
                      </div>
                      <div>{q.explanation}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
