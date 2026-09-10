import React, { useState, useEffect, useRef } from 'react';
import { UtbkQuestion } from '../types';
import { UTBK_2026_QUESTIONS } from '../data/utbkQuestions';
import { 
  GraduationCap, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  Target, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Filter, 
  ListOrdered,
  RotateCcw,
  Search,
  Award,
  Send,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Clock,
  Flag,
  AlertTriangle,
  Flame,
  Check,
  Eye,
  Settings2,
  FastForward,
  Layers,
  FileQuestion,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { playFeedbackSound } from '../utils/feedbackSound';
import { UtbkMobileHeader } from './utbk/UtbkMobileHeader';
import { UtbkMobileBottomDock } from './utbk/UtbkMobileBottomDock';
import { UtbkQuestionDrawer } from './utbk/UtbkQuestionDrawer';
import { UtbkResultDashboard } from './utbk/UtbkResultDashboard';

interface UtbkViewProps {
  onAddScore: (category: string, score: number) => void;
}

const STORAGE_KEY = 'ts_utbk_state_v5_cbt';

// Official UTBK 2026 Kisi-Kisi Syllabus Blueprint
const UTBK_KISI_KISI = [
  {
    skill: 'Main Idea & Primary Purpose',
    label: 'Gagasan Utama & Tujuan Penulis',
    percentage: '20-25%',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Menentukan topik utama, gagasan pokok paragraf, judul yang paling tepat, atau tujuan utama penulis membuat teks.',
    commonQuestions: [
      'What is the main topic of the passage?',
      'The primary purpose of the text is to...',
      'Which of the following best summarizes paragraph 2?'
    ],
    strategyTip: 'Fokus pada kalimat pertama & terakhir setiap paragraf (topic sentence). Abaikan contoh atau detail pendukung saat mencari main idea.'
  },
  {
    skill: 'Inference & Implied Detail',
    label: 'Kesimpulan & Informasi Tersirat',
    percentage: '25-30%',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Menarik kesimpulan logis dari fakta yang disajikan dalam teks tanpa berasumsi di luar bukti bacaan.',
    commonQuestions: [
      'It can be inferred from paragraph 3 that...',
      'Which statement would the author most likely agree with?',
      'What does the passage imply about...?'
    ],
    strategyTip: 'Cari kata kunci di soal, temukan kalimat relevan di teks, lalu pilih opsi jawaban yang merupakan rekonstruksi logis dari bukti tersebut.'
  },
  {
    skill: 'Vocabulary in Context',
    label: 'Makna Kata Sesuai Konteks',
    percentage: '15-20%',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Menentukan arti kata, istilah teknis, atau padanan kata (synonym) berdasarkan konteks kalimat sekitarnya.',
    commonQuestions: [
      'The word "profound" in line 12 is closest in meaning to...',
      'Which word could best replace "deteriorate" in paragraph 2?'
    ],
    strategyTip: 'Jangan langsung memilih arti kamus umum. Baca 1 kalimat sebelum dan sesudah kata tersebut untuk memahami konteks akademisnya.'
  },
  {
    skill: 'Author Tone & Purpose',
    label: 'Nada Bicara & Sikap Penulis',
    percentage: '10-15%',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Mengidentifikasi emosi atau pandangan penulis (critical, optimistic, skeptical, neutral, persuasive, dsb).',
    commonQuestions: [
      'The author\'s tone regarding the new policy is best described as...',
      'The attitude of the author towards renewable energy is...'
    ],
    strategyTip: 'Perhatikan kata sifat (adjectives) dan kata kerja (verbs) yang bermakna positif/negatif/netral dalam kalimat penulis.'
  },
  {
    skill: 'Text Structure & Organization',
    label: 'Struktur Paragraf & Hubungan Gagasan',
    percentage: '10-15%',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Menganalisis pola hubungan antar-paragraf (cause-effect, problem-solution, contrast, cause-consequence).',
    commonQuestions: [
      'How is the information in the passage organized?',
      'What is the relationship between paragraph 1 and paragraph 2?'
    ],
    strategyTip: 'Cari kata hubung transisi (however, furthermore, as a result, in contrast) untuk mengidentifikasi alur logika tulisan.'
  },
  {
    skill: 'Reference & Paraphrasing',
    label: 'Rujukan Kata & Paraphrase Kalimat',
    percentage: '10-15%',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description: 'Menentukan kata benda yang dirujuk oleh kata ganti (it, they, this) dan memilih bentuk kalimat ulang bermakna sama.',
    commonQuestions: [
      'The word "they" in line 8 refers to...',
      'Which sentence best restates the underlined sentence?'
    ],
    strategyTip: 'Ganti kata ganti dengan opsi jawaban di kalimat aslinya untuk menguji apakah struktur gramatikal & maknanya tetap tepat.'
  }
];

export const UtbkView: React.FC<UtbkViewProps> = ({ onAddScore }) => {
  const savedData = (() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  })();

  const [activeTab, setActiveTab] = useState<'latihan' | 'pembahasan' | 'kisi-kisi'>('latihan');
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(
    savedData?.selectedQuestionIndex ?? 0
  );

  // Storing answers for all 50 questions: qId -> optionIndex (0-4)
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>(
    savedData?.userAnswers ?? {}
  );

  // Storing flagged / ragu-ragu questions: qId -> boolean
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>(
    savedData?.flaggedQuestions ?? {}
  );
  
  // Quiz submission state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(
    savedData?.isSubmitted ?? false
  );

  // Timer configuration
  const [isTimerEnabled, setIsTimerEnabled] = useState<boolean>(
    savedData?.isTimerEnabled ?? true
  );
  const [timerDurationMinutes, setTimerDurationMinutes] = useState<number>(
    savedData?.timerDurationMinutes ?? 60
  );
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(
    savedData?.timeLeftSeconds ?? 60 * 60
  );
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(
    savedData?.isTimerRunning ?? true
  );
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(
    savedData?.timeSpentSeconds ?? 0
  );

  // UI display preferences
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('sm');
  const [mobileViewMode, setMobileViewMode] = useState<'split' | 'passage' | 'question'>('split');
  const [isPassageAccordionOpen, setIsPassageAccordionOpen] = useState<boolean>(false);
  const [isQuestionDrawerOpen, setIsQuestionDrawerOpen] = useState<boolean>(false);
  const [isSubmitConfirmModalOpen, setIsSubmitConfirmModalOpen] = useState<boolean>(false);
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState<boolean>(false);
  const [isTimerConfigOpen, setIsTimerConfigOpen] = useState<boolean>(false);
  const [navFilter, setNavFilter] = useState<'all' | 'answered' | 'flagged' | 'unanswered'>('all');

  // Remedial / filtered questions subset
  const [customQuestionIndices, setCustomQuestionIndices] = useState<number[] | null>(null);

  const [aiExplanations, setAiExplanations] = useState<Record<string, any>>(
    savedData?.aiExplanations ?? {}
  );
  const [loadingAiMap, setLoadingAiMap] = useState<Record<string, boolean>>({});
  const [lastSaved, setLastSaved] = useState<string | null>(
    savedData?.lastSaved || null
  );

  // Search & Filter state for Pembahasan tab
  const [pembahasanSearch, setPembahasanSearch] = useState('');
  const [pembahasanFilterStatus, setPembahasanFilterStatus] = useState<'all' | 'correct' | 'incorrect' | 'unanswered' | 'flagged'>('all');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer Tick Engine
  useEffect(() => {
    if (isSubmitted || !isTimerEnabled || !isTimerRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeExpire();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpentSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSubmitted, isTimerEnabled, isTimerRunning]);

  const handleTimeExpire = () => {
    setIsSubmitted(true);
    setIsTimeUpModalOpen(true);
    calculateAndAwardScore(userAnswers);
  };

  // Autosave to localStorage
  useEffect(() => {
    const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const payload = {
      selectedQuestionIndex,
      userAnswers,
      flaggedQuestions,
      isSubmitted,
      isTimerEnabled,
      timerDurationMinutes,
      timeLeftSeconds,
      isTimerRunning,
      timeSpentSeconds,
      aiExplanations,
      lastSaved: now
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setLastSaved(now);
    } catch (e) {
      console.error('Autosave error:', e);
    }
  }, [
    selectedQuestionIndex,
    userAnswers,
    flaggedQuestions,
    isSubmitted,
    isTimerEnabled,
    timerDurationMinutes,
    timeLeftSeconds,
    isTimerRunning,
    timeSpentSeconds,
    aiExplanations
  ]);

  const activeQuestionsList = customQuestionIndices 
    ? customQuestionIndices.map(i => UTBK_2026_QUESTIONS[i])
    : UTBK_2026_QUESTIONS;

  const currentQ = activeQuestionsList[selectedQuestionIndex] || activeQuestionsList[0] || UTBK_2026_QUESTIONS[0];
  const currentQId = currentQ.id;
  const currentRealIndex = UTBK_2026_QUESTIONS.findIndex(q => q.id === currentQId);
  const currentSelectedOption = userAnswers[currentQId] !== undefined ? userAnswers[currentQId] : null;
  const isCurrentFlagged = !!flaggedQuestions[currentQId];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setUserAnswers(prev => ({ ...prev, [currentQId]: idx }));
  };

  const handleToggleFlag = () => {
    if (isSubmitted) return;
    playFeedbackSound('click');
    setFlaggedQuestions(prev => ({ ...prev, [currentQId]: !prev[currentQId] }));
  };

  const handleNext = () => {
    if (selectedQuestionIndex + 1 < activeQuestionsList.length) {
      setSelectedQuestionIndex(selectedQuestionIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (selectedQuestionIndex > 0) {
      setSelectedQuestionIndex(selectedQuestionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    setSelectedQuestionIndex(idx);
    setIsQuestionDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateAndAwardScore = (currentAns: Record<string, number>) => {
    let earnedPoints = 0;
    UTBK_2026_QUESTIONS.forEach(q => {
      if (currentAns[q.id] === q.correctAnswerIndex) {
        earnedPoints += (q.pointWeight || 20);
      }
    });
    onAddScore('utbk', earnedPoints);
  };

  const handleFinalSubmit = () => {
    setIsSubmitConfirmModalOpen(false);
    setIsSubmitted(true);
    calculateAndAwardScore(userAnswers);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetPractice = (customSubset?: number[]) => {
    if (window.confirm('Apakah Anda yakin ingin menyetel ulang ujian? Seluruh jawaban dan waktu akan diulang.')) {
      setUserAnswers({});
      setFlaggedQuestions({});
      setIsSubmitted(false);
      setSelectedQuestionIndex(0);
      setTimeLeftSeconds(timerDurationMinutes * 60);
      setTimeSpentSeconds(0);
      setIsTimerRunning(true);
      setCustomQuestionIndices(customSubset || null);
      localStorage.removeItem(STORAGE_KEY);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleApplyTimerSettings = (mins: number, enabled: boolean) => {
    const safeMins = Math.min(Math.max(5, mins), 90);
    setTimerDurationMinutes(safeMins);
    setIsTimerEnabled(enabled);
    setTimeLeftSeconds(safeMins * 60);
    setTimeSpentSeconds(0);
    setIsTimerConfigOpen(false);
  };

  const fetchAiExplanationForQuestion = async (questionObj: UtbkQuestion) => {
    const qId = questionObj.id;
    if (aiExplanations[qId] || loadingAiMap[qId]) return;

    setLoadingAiMap(prev => ({ ...prev, [qId]: true }));
    try {
      const selectedOptionText = userAnswers[qId] !== undefined ? questionObj.options[userAnswers[qId]] : 'Tidak Dijawab';
      const res = await fetch('/api/ai/utbk-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionObj.question,
          options: questionObj.options,
          selectedAnswer: selectedOptionText,
          correctAnswer: questionObj.options[questionObj.correctAnswerIndex],
          difficulty: questionObj.difficulty,
          pointWeight: questionObj.pointWeight
        })
      });
      const data = await res.json();
      setAiExplanations(prev => ({ ...prev, [qId]: data }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAiMap(prev => ({ ...prev, [qId]: false }));
    }
  };

  // Stats calculation
  const totalAnswered = Object.keys(userAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const correctQuestions: number[] = [];
  const incorrectQuestions: number[] = [];
  const unansweredQuestions: number[] = [];

  let totalEarnedScore = 0;
  const maxPossibleScore = UTBK_2026_QUESTIONS.reduce((acc, q) => acc + (q.pointWeight || 20), 0);

  // Breakdown by Difficulty
  const difficultyStats = {
    Mudah: { total: 0, correct: 0, maxPoints: 0, earnedPoints: 0 },
    Sedang: { total: 0, correct: 0, maxPoints: 0, earnedPoints: 0 },
    Sulit: { total: 0, correct: 0, maxPoints: 0, earnedPoints: 0 }
  };

  // Breakdown by Skill
  const skillStats: Record<string, { total: 0; correct: 0 }> = {};

  UTBK_2026_QUESTIONS.forEach((q, idx) => {
    const qNumber = idx + 1;
    const diff = q.difficulty || 'Sedang';
    const weight = q.pointWeight || 20;

    difficultyStats[diff].total++;
    difficultyStats[diff].maxPoints += weight;

    if (!skillStats[q.skillType]) {
      skillStats[q.skillType] = { total: 0, correct: 0 };
    }
    skillStats[q.skillType].total++;

    if (userAnswers[q.id] === undefined) {
      unansweredQuestions.push(qNumber);
    } else if (userAnswers[q.id] === q.correctAnswerIndex) {
      correctQuestions.push(qNumber);
      totalEarnedScore += weight;
      difficultyStats[diff].correct++;
      difficultyStats[diff].earnedPoints += weight;
      skillStats[q.skillType].correct++;
    } else {
      incorrectQuestions.push(qNumber);
    }
  });

  const correctCount = correctQuestions.length;
  const accuracyPercentage = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  const finalUtbkScore = Math.min(1000, Math.round(totalEarnedScore));

  // Time format helper
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Siren alert status
  const isSirenAlert = !isSubmitted && isTimerEnabled && timeLeftSeconds > 0 && timeLeftSeconds <= 60;
  const isFiveMinuteWarning = !isSubmitted && isTimerEnabled && timeLeftSeconds > 60 && timeLeftSeconds <= 300;

  return (
    <div className={`space-y-5 relative transition-all duration-300 ${isSirenAlert ? 'siren-ambient-warning' : ''} ${!isSubmitted && activeTab === 'latihan' ? 'pb-24 lg:pb-0' : ''}`}>
      {/* Subtle Siren Ambient Red Vignette Overlay for Viewport when <= 1 minute */}
      {isSirenAlert && (
        <div className="fixed inset-0 pointer-events-none z-50 siren-vignette-overlay border-4 border-red-500/50" />
      )}

      {/* Siren / Time Warning Banner */}
      {isSirenAlert && (
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-3.5 sm:px-4 py-2.5 rounded-2xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-bounce">
          <div className="flex items-center gap-2 text-xs font-black tracking-wide">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0" />
            <span>PERINGATAN KRITIS: Sisa waktu &lt; 1 menit ({formatTime(timeLeftSeconds)})!</span>
          </div>
          <button
            onClick={() => setIsSubmitConfirmModalOpen(true)}
            className="w-full sm:w-auto px-3 py-1.5 bg-white text-red-700 rounded-xl text-xs font-extrabold hover:bg-red-50 transition-all cursor-pointer shrink-0 shadow-xs text-center"
          >
            Kumpulkan Sekarang
          </button>
        </div>
      )}

      {isFiveMinuteWarning && (
        <div className="bg-amber-500/15 border border-amber-400/40 text-amber-900 px-3.5 sm:px-4 py-2 rounded-2xl flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Sisa 5 menit ({formatTime(timeLeftSeconds)}). Pastikan sudah terjawab.</span>
          </div>
          <span className="text-[11px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-extrabold shrink-0">
            {totalAnswered}/50 Terjawab
          </span>
        </div>
      )}

      {/* Header Banner & CBT Control Station */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-md flex flex-col space-y-4 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] sm:text-xs font-bold">
                <GraduationCap className="w-3.5 h-3.5" /> UTBK / SNBT 2026 - Subtes Literasi Bahasa Inggris
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] sm:text-[11px] font-bold">
                <Save className="w-3 h-3 text-emerald-400" />
                <span>Autosave CBT {lastSaved ? `(${lastSaved})` : 'Aktif'}</span>
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-brand font-black tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-teal-200">
              Simulasi CBT UTBK SNBT (50 Soal HOTS)
            </h1>
            <p className="text-slate-300 text-xs mt-1 max-w-2xl leading-relaxed hidden sm:block">
              Ujian berbasis komputer dengan sistem timer dinamis, bobot poin numerik, navigasi lompat soal, dan pembahasan mendalam di akhir ujian.
            </p>
          </div>

          {/* Action Buttons & Timer Station */}
          <div className="flex items-center flex-wrap gap-2 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
            {/* Timer Station Box */}
            <div className={`flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl border text-xs font-extrabold transition-all ${
              isSirenAlert
                ? 'bg-red-600/30 border-red-500 text-red-200 animate-pulse'
                : isFiveMinuteWarning
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-200'
                : isTimerEnabled
                ? 'bg-slate-800/80 border-slate-700 text-teal-300'
                : 'bg-slate-800/40 border-slate-700/50 text-slate-400'
            }`}>
              <Clock className={`w-4 h-4 ${isSirenAlert ? 'text-red-400 animate-spin' : isFiveMinuteWarning ? 'text-amber-400' : 'text-teal-400'}`} />
              <div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  {isTimerEnabled ? (isSubmitted ? 'Selesai' : 'Sisa Waktu') : 'Mode Santai'}
                </div>
                <div className="text-xs sm:text-sm font-black tracking-widest font-mono">
                  {isTimerEnabled ? formatTime(timeLeftSeconds) : '∞ UNTIMED'}
                </div>
              </div>

              {!isSubmitted && (
                <button
                  onClick={() => setIsTimerConfigOpen(true)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50 cursor-pointer ml-1"
                  title="Pengaturan Timer"
                >
                  <Settings2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => handleResetPractice()}
              className="text-xs text-rose-300 hover:text-white font-semibold flex items-center gap-1 px-3 py-2 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all cursor-pointer"
              title="Setel ulang seluruh jawaban"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Under Title (Horizontally scrollable on mobile) */}
        <div className="flex bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 gap-1.5 overflow-x-auto no-scrollbar items-center justify-start sm:justify-between">
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={() => setActiveTab('latihan')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 ${
                activeTab === 'latihan'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-300 shrink-0" />
              <span>1. Lembar Ujian CBT (50 Soal)</span>
            </button>

            <button
              onClick={() => setActiveTab('pembahasan')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 ${
                activeTab === 'pembahasan'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
              <span>2. Kunci & Pembahasan (1–50)</span>
            </button>

            <button
              onClick={() => setActiveTab('kisi-kisi')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 ${
                activeTab === 'kisi-kisi'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
              <span>3. Kisi-Kisi Resmi 2026</span>
            </button>
          </div>

          {/* Quick status counters on desktop */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-300 font-medium px-2 shrink-0">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <Check className="w-3.5 h-3.5" /> {totalAnswered}/50 Terjawab
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Flag className="w-3.5 h-3.5" /> {flaggedCount} Ragu-ragu
            </span>
          </div>
        </div>
      </div>

      {/* TIMER CONFIG MODAL */}
      {isTimerConfigOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 sm:p-6 max-w-md w-full space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-black text-base">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span>Pengaturan Timer Ujian</span>
              </div>
              <button
                onClick={() => setIsTimerConfigOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Toggle switch */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <div className="text-xs font-bold text-slate-900">Aktifkan Timer Ujian</div>
                  <div className="text-[11px] text-slate-500">Hitung mundur otomatis saat simulasi</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTimerEnabled(!isTimerEnabled)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    isTimerEnabled ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isTimerEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Duration presets */}
              {isTimerEnabled && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Durasi Ujian: <b>{timerDurationMinutes} Menit</b></span>
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    {[15, 30, 45, 60, 75, 90].map(mins => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setTimerDurationMinutes(mins)}
                        className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          timerDurationMinutes === mins
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {mins} Menit {mins === 60 ? '⭐' : ''}
                      </button>
                    ))}
                  </div>

                  <input
                    type="range"
                    min="5"
                    max="90"
                    step="5"
                    value={timerDurationMinutes}
                    onChange={(e) => setTimerDurationMinutes(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    💡 <i>Standar UTBK:</i> Subtes Literasi Bahasa Inggris resmi adalah <b>60 menit</b> untuk 50 soal.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsTimerConfigOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleApplyTimerSettings(timerDurationMinutes, isTimerEnabled)}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-sm cursor-pointer"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION SUBMIT MODAL */}
      {isSubmitConfirmModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 sm:p-6 max-w-lg w-full space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Konfirmasi Pengumpulan Ujian</h3>
                <p className="text-xs text-slate-500">Periksa ringkasan lembar jawaban Anda sebelum menyelesaikan.</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                <div className="text-[11px] font-bold text-emerald-800">Terjawab</div>
                <div className="text-lg sm:text-xl font-extrabold text-emerald-950 font-mono">{totalAnswered}/50</div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                <div className="text-[11px] font-bold text-amber-800">Ragu-Ragu</div>
                <div className="text-lg sm:text-xl font-extrabold text-amber-950 font-mono">{flaggedCount}</div>
              </div>

              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-center">
                <div className="text-[11px] font-bold text-rose-800">Kosong</div>
                <div className="text-lg sm:text-xl font-extrabold text-rose-950 font-mono">{50 - totalAnswered}</div>
              </div>
            </div>

            {50 - totalAnswered > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Masih ada <b>{50 - totalAnswered} butir soal</b> yang belum terjawab. Di UTBK tidak ada minus poin.
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsSubmitConfirmModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold cursor-pointer text-center"
              >
                Kembali Periksa
              </button>
              <button
                onClick={handleFinalSubmit}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Kumpulkan Ujian Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TIME UP MODAL */}
      {isTimeUpModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-rose-300 shadow-2xl p-6 max-w-md w-full space-y-4 text-center animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">WAKTU UJIAN TELAH HABIS!</h3>
              <p className="text-xs text-slate-600">
                Waktu pengerjaan telah mencapai 00:00. Seluruh jawaban Anda otomatis dikumpulkan dan dinilai.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 flex justify-around">
              <div>Terjawab: <b className="text-emerald-600">{totalAnswered}/50</b></div>
              <div>Skor: <b className="text-indigo-600">{finalUtbkScore} Pts</b></div>
            </div>

            <button
              onClick={() => {
                setIsTimeUpModalOpen(false);
                setActiveTab('latihan');
              }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-md cursor-pointer"
            >
              Lihat Hasil & Rangkuman Nilai
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: LEMBAR UJIAN CBT & HASIL EVALUASI */}
      {activeTab === 'latihan' && (
        <div className="space-y-5">
          {/* If Quiz is Submitted, Show Comprehensive Result Data Dashboard */}
          {isSubmitted ? (
            <UtbkResultDashboard
              finalScore={finalUtbkScore}
              maxScore={maxPossibleScore}
              timeSpentSeconds={timeSpentSeconds}
              accuracyPercentage={accuracyPercentage}
              totalAnswered={totalAnswered}
              correctCount={correctCount}
              flaggedCount={flaggedCount}
              incorrectQuestions={incorrectQuestions}
              correctQuestions={correctQuestions}
              unansweredQuestions={unansweredQuestions}
              difficultyStats={difficultyStats}
              onJumpToPembahasan={(qIdx) => {
                setSelectedQuestionIndex(qIdx);
                setActiveTab('pembahasan');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onResetPractice={handleResetPractice}
              onOpenPembahasanTab={() => {
                setActiveTab('pembahasan');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              formatTime={formatTime}
            />
          ) : (
            /* Active Test Taking View (CBT Exam Mode - Responsive Mobile & Desktop) */
            <div className="space-y-4">
              {/* Mobile Sticky Control Header (Visible ONLY on mobile/tablet < lg) */}
              <UtbkMobileHeader
                currentQuestion={currentQ}
                currentRealIndex={currentRealIndex}
                totalQuestions={activeQuestionsList.length}
                totalAnswered={totalAnswered}
                flaggedCount={flaggedCount}
                isFlagged={isCurrentFlagged}
                onToggleFlag={handleToggleFlag}
                onOpenDrawer={() => setIsQuestionDrawerOpen(true)}
                onOpenTimerSettings={() => setIsTimerConfigOpen(true)}
                isTimerEnabled={isTimerEnabled}
                timeLeftSeconds={timeLeftSeconds}
                isSirenAlert={isSirenAlert}
                isFiveMinuteWarning={isFiveMinuteWarning}
                formatTime={formatTime}
                mobileViewMode={mobileViewMode}
                onChangeMobileViewMode={setMobileViewMode}
                fontSize={fontSize}
                onChangeFontSize={setFontSize}
              />

              {/* Main CBT Layout: Desktop Grid (12 cols) / Mobile Single View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Desktop Left Sidebar: Question Number Grid (1-50) */}
                <div className="hidden lg:block lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-xs p-5 space-y-5 sticky top-4">
                  {/* Header info in sidebar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-600" />
                      <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                        Navigasi CBT (50 Soal)
                      </h3>
                    </div>

                    {/* Filter in Navigation */}
                    <select
                      value={navFilter}
                      onChange={(e) => setNavFilter(e.target.value as any)}
                      className="text-[11px] p-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="all">Semua ({activeQuestionsList.length})</option>
                      <option value="unanswered">Belum ({activeQuestionsList.length - totalAnswered})</option>
                      <option value="flagged">Ragu-ragu ({flaggedCount})</option>
                      <option value="answered">Terjawab ({totalAnswered})</option>
                    </select>
                  </div>

                  {/* Question Grid (1-50) */}
                  <div className="grid grid-cols-5 gap-2 max-h-[340px] overflow-y-auto p-1">
                    {activeQuestionsList.map((q, idx) => {
                      const qId = q.id;
                      const realIdx = UTBK_2026_QUESTIONS.findIndex(item => item.id === qId) + 1;
                      const active = idx === selectedQuestionIndex;
                      const isAnswered = userAnswers[qId] !== undefined;
                      const isFlagged = !!flaggedQuestions[qId];

                      // Filtering
                      if (navFilter === 'answered' && !isAnswered) return null;
                      if (navFilter === 'unanswered' && isAnswered) return null;
                      if (navFilter === 'flagged' && !isFlagged) return null;

                      let btnCls = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';

                      if (active) {
                        btnCls = 'bg-indigo-600 text-white font-black border-indigo-700 ring-2 ring-indigo-300 shadow-xs scale-105';
                      } else if (isFlagged) {
                        btnCls = 'bg-amber-400 text-amber-950 font-bold border-amber-500 shadow-xs';
                      } else if (isAnswered) {
                        btnCls = 'bg-emerald-500 text-white font-bold border-emerald-600';
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => handleJumpToQuestion(idx)}
                          className={`h-10 rounded-xl border text-xs flex flex-col items-center justify-center relative transition-all cursor-pointer ${btnCls}`}
                          title={`Soal No. ${realIdx} (${q.difficulty || 'Sedang'} • ${q.pointWeight || 20} Poin)`}
                        >
                          <span>{realIdx}</span>
                          {isFlagged && !active && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-600 rounded-full border border-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* CBT Grid Legend */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 font-semibold pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-md bg-indigo-600 inline-block shrink-0" />
                      <span>Sedang Dikerjakan</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-md bg-emerald-500 inline-block shrink-0" />
                      <span>Sudah Terisi ({totalAnswered})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-md bg-amber-400 inline-block shrink-0" />
                      <span>Ragu-Ragu ({flaggedCount})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-md bg-slate-200 inline-block shrink-0" />
                      <span>Belum Terisi ({50 - totalAnswered})</span>
                    </div>
                  </div>

                  {/* Finish & Submit Button in Sidebar */}
                  <div className="pt-2">
                    <button
                      onClick={() => setIsSubmitConfirmModalOpen(true)}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kumpulkan & Selesaikan Ujian</span>
                    </button>
                  </div>
                </div>

                {/* Right Side / Mobile Main: CBT Passage & Question Workspace */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-4 sm:p-6 space-y-5">
                    {/* Top Bar on Desktop: Question Sequence & Badges & Tools */}
                    <div className="hidden lg:flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black text-white bg-slate-900 px-3.5 py-1.5 rounded-xl shadow-xs">
                          Nomor Soal {currentRealIndex + 1} / {UTBK_2026_QUESTIONS.length}
                        </span>
                        
                        {/* Difficulty & Numeric Points Indicator */}
                        <span className={`text-xs font-bold px-3 py-1 rounded-xl border flex items-center gap-1.5 ${
                          currentQ.difficulty === 'Sulit'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : currentQ.difficulty === 'Mudah'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          <span>Tingkat {currentQ.difficulty || 'Sedang'}</span>
                          <span className="font-extrabold text-[11px] px-1.5 py-0.2 bg-white/80 rounded-md shadow-xs">
                            +{currentQ.pointWeight || 20} Poin
                          </span>
                        </span>

                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">
                          {currentQ.skillType}
                        </span>
                      </div>

                      {/* Right Tools: Font Zoom & Flag Question */}
                      <div className="flex items-center gap-2">
                        {/* Font Size Adjuster */}
                        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                          <button
                            onClick={() => setFontSize('sm')}
                            className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${fontSize === 'sm' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500'}`}
                            title="Font Kecil"
                          >
                            A-
                          </button>
                          <button
                            onClick={() => setFontSize('base')}
                            className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${fontSize === 'base' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500'}`}
                            title="Font Standar"
                          >
                            A
                          </button>
                          <button
                            onClick={() => setFontSize('lg')}
                            className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${fontSize === 'lg' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500'}`}
                            title="Font Besar"
                          >
                            A+
                          </button>
                        </div>

                        {/* Flag / Ragu-ragu Toggle */}
                        <button
                          onClick={handleToggleFlag}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isCurrentFlagged
                              ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-amber-50 hover:text-amber-700'
                          }`}
                          title="Tandai nomor ini jika masih ragu-ragu"
                        >
                          <Flag className={`w-3.5 h-3.5 ${isCurrentFlagged ? 'fill-current' : ''}`} />
                          <span>{isCurrentFlagged ? 'Ragu-Ragu' : 'Tandai Ragu'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Passage Container (Conditioned on Mobile View Mode or Desktop) */}
                    {(mobileViewMode === 'split' || mobileViewMode === 'passage' || window.innerWidth >= 1024) && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-indigo-700">
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-indigo-600" /> {currentQ.title || 'Teks Bacaan (Passage)'}
                          </span>
                          <span className="text-slate-400 font-normal lowercase hidden sm:inline">baca dengan seksama</span>
                        </div>

                        <div className={`p-4 sm:p-5 bg-slate-50/90 border border-slate-200 rounded-2xl text-slate-800 leading-relaxed font-serif select-text max-h-[280px] sm:max-h-[320px] overflow-y-auto whitespace-pre-line ${
                          fontSize === 'sm' ? 'text-xs' : fontSize === 'base' ? 'text-sm' : 'text-base'
                        }`}>
                          {currentQ.passage}
                        </div>

                        {/* On mobile "passage" only mode, show quick jump to question */}
                        {mobileViewMode === 'passage' && (
                          <div className="lg:hidden pt-2 flex justify-end">
                            <button
                              onClick={() => setMobileViewMode('question')}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                            >
                              <span>Lanjut ke Lembar Soal</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Collapsible Peek Passage Accordion (Shown when in Mobile "Question" Mode) */}
                    {mobileViewMode === 'question' && (
                      <div className="lg:hidden border border-indigo-200 bg-indigo-50/50 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setIsPassageAccordionOpen(!isPassageAccordionOpen)}
                          className="w-full p-3 flex items-center justify-between text-xs font-bold text-indigo-900 active:bg-indigo-100/70 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-indigo-600" />
                            <span>Lihat Teks Bacaan Singkat</span>
                          </div>
                          {isPassageAccordionOpen ? (
                            <ChevronUp className="w-4 h-4 text-indigo-600" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-indigo-600" />
                          )}
                        </button>

                        {isPassageAccordionOpen && (
                          <div className={`p-3.5 border-t border-indigo-100 bg-white text-slate-800 leading-relaxed font-serif max-h-48 overflow-y-auto ${
                            fontSize === 'sm' ? 'text-xs' : fontSize === 'base' ? 'text-sm' : 'text-base'
                          }`}>
                            {currentQ.passage}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Question Prompt & Options (Conditioned on Mobile View Mode or Desktop) */}
                    {(mobileViewMode === 'split' || mobileViewMode === 'question' || window.innerWidth >= 1024) && (
                      <div className="space-y-4 pt-1">
                        {/* Question Prompt */}
                        <div className={`font-black text-slate-900 leading-snug ${
                          fontSize === 'sm' ? 'text-sm sm:text-base' : fontSize === 'base' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                        }`}>
                          {currentQ.question}
                        </div>

                        {/* Options List */}
                        <div className="space-y-2.5">
                          {currentQ.options.map((opt, oIdx) => {
                            const isSelected = currentSelectedOption === oIdx;
                            let optStyle = 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/20';

                            if (isSelected) {
                              optStyle = 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-2 ring-indigo-500/20 shadow-xs';
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleSelectOption(oIdx)}
                                className={`w-full min-h-[50px] p-3.5 sm:p-4 rounded-2xl border text-left transition-all active:scale-99 cursor-pointer flex items-start gap-3 ${optStyle} ${
                                  fontSize === 'sm' ? 'text-xs sm:text-sm' : fontSize === 'base' ? 'text-sm sm:text-base' : 'text-base'
                                }`}
                              >
                                <span className={`font-black shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs transition-colors ${
                                  isSelected ? 'bg-indigo-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700'
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span className="leading-relaxed pt-0.5 flex-1">{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Bottom Navigation Toolbar on Desktop */}
                    <div className="hidden lg:flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePrev}
                          disabled={selectedQuestionIndex === 0}
                          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 justify-center"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Sebelumnya</span>
                        </button>

                        <button
                          onClick={handleNext}
                          disabled={selectedQuestionIndex === activeQuestionsList.length - 1}
                          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 justify-center"
                          title="Lompati soal ini dan lanjut ke nomor berikutnya"
                        >
                          <FastForward className="w-3.5 h-3.5 text-slate-500" />
                          <span>Lompati Soal</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2 justify-end">
                        {selectedQuestionIndex < activeQuestionsList.length - 1 ? (
                          <button
                            onClick={handleNext}
                            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 justify-center shadow-xs"
                          >
                            <span>Simpan & Lanjut</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsSubmitConfirmModalOpen(true)}
                            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2 justify-center animate-pulse"
                          >
                            <Send className="w-4 h-4" />
                            <span>Kumpulkan Ujian</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Fixed Bottom Navigation Dock (Visible ONLY on mobile/tablet < lg) */}
              <UtbkMobileBottomDock
                currentIndex={selectedQuestionIndex}
                totalQuestions={activeQuestionsList.length}
                totalAnswered={totalAnswered}
                isFlagged={isCurrentFlagged}
                isLastQuestion={selectedQuestionIndex === activeQuestionsList.length - 1}
                onPrev={handlePrev}
                onNext={handleNext}
                onToggleFlag={handleToggleFlag}
                onOpenDrawer={() => setIsQuestionDrawerOpen(true)}
                onSubmitExam={() => setIsSubmitConfirmModalOpen(true)}
              />

              {/* Mobile Question Sheet Drawer */}
              <UtbkQuestionDrawer
                isOpen={isQuestionDrawerOpen}
                onClose={() => setIsQuestionDrawerOpen(false)}
                questions={activeQuestionsList}
                selectedIndex={selectedQuestionIndex}
                userAnswers={userAnswers}
                flaggedQuestions={flaggedQuestions}
                onSelectQuestion={handleJumpToQuestion}
                onSubmitExam={() => setIsSubmitConfirmModalOpen(true)}
              />
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DAFTAR PEMBAHASAN SOAL DETAIL (NOMOR 1 SAMPAI 50) */}
      {activeTab === 'pembahasan' && (
        <div className="space-y-5">
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span>Kunci Jawaban & Pembahasan Detail (1 – 50)</span>
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Penjelasan rasional mendalam, alasan kunci jawaban, serta analisis tutor AI untuk seluruh 50 soal UTBK 2026.
                </p>
              </div>

              {/* Filters for Pembahasan */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={pembahasanSearch}
                    onChange={(e) => setPembahasanSearch(e.target.value)}
                    placeholder="Cari kata kunci / nomor..."
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <select
                  value={pembahasanFilterStatus}
                  onChange={(e) => setPembahasanFilterStatus(e.target.value as any)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="all">Semua Soal (50)</option>
                  <option value="correct">Jawaban Benar ({correctCount})</option>
                  <option value="incorrect">Jawaban Salah ({incorrectQuestions.length})</option>
                  <option value="flagged">Soal Ragu-ragu ({flaggedCount})</option>
                  <option value="unanswered">Belum Dijawab ({50 - totalAnswered})</option>
                </select>
              </div>
            </div>
          </div>

          {/* List of Questions with full explanations */}
          <div className="space-y-4">
            {UTBK_2026_QUESTIONS.filter((q, idx) => {
              const qId = q.id;
              const answered = userAnswers[qId] !== undefined;
              const chosen = userAnswers[qId];
              const isCorrect = chosen === q.correctAnswerIndex;
              const isFlagged = !!flaggedQuestions[qId];

              if (pembahasanFilterStatus === 'correct' && (!answered || !isCorrect)) return false;
              if (pembahasanFilterStatus === 'incorrect' && (!answered || isCorrect)) return false;
              if (pembahasanFilterStatus === 'unanswered' && answered) return false;
              if (pembahasanFilterStatus === 'flagged' && !isFlagged) return false;

              if (pembahasanSearch) {
                const term = pembahasanSearch.toLowerCase();
                return q.question.toLowerCase().includes(term) || q.title.toLowerCase().includes(term) || (idx + 1).toString() === term;
              }

              return true;
            }).map((q) => {
              const questionNumber = UTBK_2026_QUESTIONS.findIndex(item => item.id === q.id) + 1;
              const qId = q.id;
              const chosenOpt = userAnswers[qId];
              const answered = chosenOpt !== undefined;
              const isCorrect = chosenOpt === q.correctAnswerIndex;
              const isFlagged = !!flaggedQuestions[qId];
              const currentAiExp = aiExplanations[qId];

              return (
                <div key={q.id} className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="px-2.5 sm:px-3 py-1 bg-slate-900 text-white font-extrabold text-xs rounded-xl">
                        Soal No. {questionNumber}
                      </span>
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100">
                        {q.skillType}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border ${
                        q.difficulty === 'Sulit' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        q.difficulty === 'Mudah' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        +{q.pointWeight || 20} Pts
                      </span>
                      {isFlagged && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md border border-amber-300 flex items-center gap-1">
                          <Flag className="w-3 h-3 fill-current" /> Ragu
                        </span>
                      )}
                    </div>

                    <div>
                      {answered ? (
                        isCorrect ? (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Benar (+{q.pointWeight || 20} Pts)
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-rose-100 text-rose-800 font-bold text-xs rounded-full flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Salah (0 Pts)
                          </span>
                        )
                      ) : (
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 font-medium text-xs rounded-full">
                          Belum Dikerjakan
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Passage excerpt */}
                  <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-2xl text-xs text-slate-700 font-serif leading-relaxed">
                    <b>Teks Bacaan ({q.title}):</b> {q.passage}
                  </div>

                  {/* Question */}
                  <div className="font-bold text-sm sm:text-base text-slate-900">
                    {q.question}
                  </div>

                  {/* Options List with Highlight */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const isKey = oIdx === q.correctAnswerIndex;
                      const isChosen = chosenOpt === oIdx;

                      let cls = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (isKey) cls = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-xs';
                      else if (isChosen && !isKey) cls = 'bg-rose-50 border-rose-300 text-rose-950 font-bold';

                      return (
                        <div key={oIdx} className={`p-3 rounded-xl border text-xs leading-relaxed ${cls}`}>
                          <b>{String.fromCharCode(65 + oIdx)}.</b> {opt}
                          {isKey && <span className="ml-1.5 text-[10px] text-emerald-700 font-bold uppercase">(Kunci Jawaban Tepat)</span>}
                          {isChosen && !isKey && <span className="ml-1.5 text-[10px] text-rose-700 font-bold uppercase">(Pilihan Anda)</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Official Pembahasan Detail Box */}
                  <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl space-y-1.5">
                    <div className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Pembahasan Detail & Rasionalisasi:</span>
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed font-sans">
                      {q.explanation}
                    </p>
                  </div>

                  {/* AI Strategy Generation */}
                  {currentAiExp ? (
                    <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-2xl space-y-2">
                      <div className="text-xs font-bold text-purple-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                        <span>Analisis Tutor AI Gemini:</span>
                      </div>
                      <p className="text-xs text-purple-950 leading-relaxed">
                        {currentAiExp.explanation}
                      </p>
                      {currentAiExp.utbkStrategyTip && (
                        <div className="p-2.5 bg-white rounded-xl border border-purple-200 text-xs text-purple-900 font-medium">
                          <b>Pro Tip UTBK:</b> {currentAiExp.utbkStrategyTip}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => fetchAiExplanationForQuestion(q)}
                      disabled={loadingAiMap[q.id]}
                      className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1.5 px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100 transition-all cursor-pointer"
                    >
                      {loadingAiMap[q.id] ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                          <span>Gemini AI sedang menyusun analisis...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Minta Analisis Strategi Tambahan dari Tutor AI</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: KISI-KISI RESMI SYLLABUS MAP TAB */}
      {activeTab === 'kisi-kisi' && (
        <div className="space-y-5">
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
              <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>Panduan Kisi-Kisi Resmi Subtes Literasi Bahasa Inggris UTBK / SNBT 2026</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Peta kisi-kisi ini disusun berdasarkan cetak biru (blueprint) ujian nasional SNPMB. Kuasai strategi khusus untuk tiap tipe kompetensi di bawah ini agar meraih skor di atas 750+.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {UTBK_KISI_KISI.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.percentage} Porsi Soal
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">Kisi {idx + 1}</span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{item.skill}</h3>
                    <h4 className="text-xs text-indigo-600 font-medium">{item.label}</h4>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Bentuk Soal Umum:</span>
                    <ul className="text-[11px] text-slate-700 space-y-1 pl-4 list-disc">
                      {item.commonQuestions.map((qText, qIdx) => (
                        <li key={qIdx}>{qText}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs text-indigo-950 font-medium mt-2">
                  <span className="font-bold text-indigo-700">Strategi Cepat:</span> {item.strategyTip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
