import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Gamepad2,
  Smile,
  Zap,
  Volume2,
  RotateCcw,
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flame,
  Shuffle,
  PartyPopper,
  Clock,
  Play,
  Pause,
  ArrowRight,
  Lightbulb,
  Plus,
  Trash2,
  Award,
  BookOpen,
  Send,
  VolumeX,
  RefreshCw,
  ThumbsUp,
  MessageCircle,
  Compass,
  Hourglass,
  Layers,
  Check,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Share2,
  Copy,
  Crown,
  Timer,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playFeedbackSound } from '../utils/feedbackSound';
import { SentenceBuilderGame } from './SentenceBuilderGame';
import { LetterallyStuckGame } from './crossword/LetterallyStuckGame';

// =========================================================================
// DATA BANK: EXPANDED ACADEMIC & VOCABULARY DICTIONARY FOR WORD CHAIN
// =========================================================================
interface WordChainVocabItem {
  word: string;
  meaning: string;
  type: string;
}

const WORD_CHAIN_DICTIONARY: Record<string, WordChainVocabItem[]> = {
  a: [
    { word: 'academic', meaning: 'Akademik / Ilmiah', type: 'Adj' },
    { word: 'adventure', meaning: 'Petualangan', type: 'Noun' },
    { word: 'analysis', meaning: 'Analisis mendalam', type: 'Noun' },
    { word: 'ancient', meaning: 'Kuno / Bersejarah', type: 'Adj' },
    { word: 'architect', meaning: 'Arsitek / Perancang', type: 'Noun' },
    { word: 'attitude', meaning: 'Sikap / Perilaku', type: 'Noun' },
    { word: 'ability', meaning: 'Kemampuan / Kecakapan', type: 'Noun' },
    { word: 'accomplish', meaning: 'Menuntaskan / Meraih', type: 'Verb' },
    { word: 'authentic', meaning: 'Asli / Autentik', type: 'Adj' },
    { word: 'ambition', meaning: 'Cita-cita / Ambisi', type: 'Noun' }
  ],
  b: [
    { word: 'brilliant', meaning: 'Sangat cemerlang', type: 'Adj' },
    { word: 'balance', meaning: 'Keseimbangan', type: 'Noun' },
    { word: 'boundary', meaning: 'Batas / Batasan', type: 'Noun' },
    { word: 'benefit', meaning: 'Manfaat / Keuntungan', type: 'Noun' },
    { word: 'behavior', meaning: 'Perilaku / Tingkah laku', type: 'Noun' },
    { word: 'beautiful', meaning: 'Indah / Menawan', type: 'Adj' },
    { word: 'bravery', meaning: 'Keberanian', type: 'Noun' },
    { word: 'breathe', meaning: 'Bernapas', type: 'Verb' },
    { word: 'barrier', meaning: 'Rintangan / Hambatan', type: 'Noun' }
  ],
  c: [
    { word: 'comprehend', meaning: 'Memahami / Mengerti', type: 'Verb' },
    { word: 'courage', meaning: 'Keberanian', type: 'Noun' },
    { word: 'consequence', meaning: 'Konsekuensi / Akibat', type: 'Noun' },
    { word: 'creativity', meaning: 'Kreativitas', type: 'Noun' },
    { word: 'curiosity', meaning: 'Rasa ingin tahu', type: 'Noun' },
    { word: 'condition', meaning: 'Kondisi / Syarat', type: 'Noun' },
    { word: 'character', meaning: 'Karakter / Watak', type: 'Noun' },
    { word: 'challenge', meaning: 'Tantangan', type: 'Noun' },
    { word: 'confidence', meaning: 'Kepercayaan diri', type: 'Noun' }
  ],
  d: [
    { word: 'determination', meaning: 'Tekad yang bulat', type: 'Noun' },
    { word: 'discovery', meaning: 'Penemuan baru', type: 'Noun' },
    { word: 'diversity', meaning: 'Keberagaman', type: 'Noun' },
    { word: 'dimension', meaning: 'Dimensi / Ukuran', type: 'Noun' },
    { word: 'dynamic', meaning: 'Dinamis / Bertenaga', type: 'Adj' },
    { word: 'dialogue', meaning: 'Percakapan / Dialog', type: 'Noun' },
    { word: 'discipline', meaning: 'Kedisiplinan', type: 'Noun' },
    { word: 'delightful', meaning: 'Menyenangkan', type: 'Adj' }
  ],
  e: [
    { word: 'education', meaning: 'Pendidikan', type: 'Noun' },
    { word: 'evolution', meaning: 'Evolusi / Perkembangan', type: 'Noun' },
    { word: 'efficiency', meaning: 'Efisiensi / Ketepatan', type: 'Noun' },
    { word: 'environment', meaning: 'Lingkungan hidup', type: 'Noun' },
    { word: 'enthusiasm', meaning: 'Antusiasme / Semangat', type: 'Noun' },
    { word: 'evaluate', meaning: 'Mengevaluasi / Menilai', type: 'Verb' },
    { word: 'experience', meaning: 'Pengalaman', type: 'Noun' },
    { word: 'extraordinary', meaning: 'Luar biasa', type: 'Adj' },
    { word: 'empathy', meaning: 'Empati / Kepedulian', type: 'Noun' }
  ],
  f: [
    { word: 'foundation', meaning: 'Pondasi / Landasan', type: 'Noun' },
    { word: 'flexibility', meaning: 'Fleksibilitas / Kelenturan', type: 'Noun' },
    { word: 'frequency', meaning: 'Frekuensi / Kekerapan', type: 'Noun' },
    { word: 'formulation', meaning: 'Perumusan', type: 'Noun' },
    { word: 'fascinate', meaning: 'Mempesona / Memikat', type: 'Verb' },
    { word: 'frontier', meaning: 'Batas terdepan', type: 'Noun' },
    { word: 'flourish', meaning: 'Berkembang pesat', type: 'Verb' },
    { word: 'future', meaning: 'Masa depan', type: 'Noun' }
  ],
  g: [
    { word: 'generation', meaning: 'Generasi / Angkatan', type: 'Noun' },
    { word: 'gratitude', meaning: 'Rasa syukur / Terima kasih', type: 'Noun' },
    { word: 'governance', meaning: 'Tata kelola', type: 'Noun' },
    { word: 'guidance', meaning: 'Bimbingan / Petunjuk', type: 'Noun' },
    { word: 'generosity', meaning: 'Kedermawanan', type: 'Noun' },
    { word: 'gradient', meaning: 'Gradien / Kemiringan', type: 'Noun' },
    { word: 'glamour', meaning: 'Pesona / Kemewahan', type: 'Noun' },
    { word: 'glorious', meaning: 'Mulia / Gemilang', type: 'Adj' }
  ],
  h: [
    { word: 'hypothesis', meaning: 'Hipotesis / Dugaan ilmiah', type: 'Noun' },
    { word: 'harmony', meaning: 'Keharmonisan / Keselarasan', type: 'Noun' },
    { word: 'heritage', meaning: 'Warisan budaya', type: 'Noun' },
    { word: 'humanity', meaning: 'Kemanusiaan', type: 'Noun' },
    { word: 'honesty', meaning: 'Kejujuran', type: 'Noun' },
    { word: 'horizon', meaning: 'Cakrawala / Ufuk', type: 'Noun' },
    { word: 'highlight', meaning: 'Sorotan utama', type: 'Noun' },
    { word: 'hospitality', meaning: 'Keramahan', type: 'Noun' }
  ],
  i: [
    { word: 'imagination', meaning: 'Imajinasi / Daya khayal', type: 'Noun' },
    { word: 'innovation', meaning: 'Inovasi / Kebaruan', type: 'Noun' },
    { word: 'integrity', meaning: 'Integritas / Kejujuran', type: 'Noun' },
    { word: 'intelligence', meaning: 'Kecerdasan / Intelektual', type: 'Noun' },
    { word: 'insight', meaning: 'Wawasan mendalam', type: 'Noun' },
    { word: 'inspire', meaning: 'Menginspirasi', type: 'Verb' },
    { word: 'identity', meaning: 'Identitas / Jati diri', type: 'Noun' },
    { word: 'influence', meaning: 'Pengaruh', type: 'Noun' }
  ],
  j: [
    { word: 'judgment', meaning: 'Penilaian / Pertimbangan', type: 'Noun' },
    { word: 'journey', meaning: 'Perjalanan hidup', type: 'Noun' },
    { word: 'justice', meaning: 'Keadilan', type: 'Noun' },
    { word: 'journal', meaning: 'Jurnal / Catatan harian', type: 'Noun' },
    { word: 'jubilant', meaning: 'Bersuka cita / Bergembira', type: 'Adj' },
    { word: 'juxtapose', meaning: 'Menjajarkan / Membandingkan', type: 'Verb' },
    { word: 'junction', meaning: 'Persimpangan', type: 'Noun' }
  ],
  k: [
    { word: 'knowledge', meaning: 'Pengetahuan / Ilmu', type: 'Noun' },
    { word: 'kindness', meaning: 'Kebaikan hati', type: 'Noun' },
    { word: 'kinetic', meaning: 'Kinetik / Gerak', type: 'Adj' },
    { word: 'keynote', meaning: 'Pokok pikiran / Pidato kunci', type: 'Noun' },
    { word: 'keenness', meaning: 'Ketajaman pikiran / Minat besar', type: 'Noun' },
    { word: 'kingdom', meaning: 'Kerajaan / Ranah', type: 'Noun' }
  ],
  l: [
    { word: 'literature', meaning: 'Kesusastraan', type: 'Noun' },
    { word: 'leadership', meaning: 'Kepemimpinan', type: 'Noun' },
    { word: 'landscape', meaning: 'Bentang alam / Lanskap', type: 'Noun' },
    { word: 'linguistic', meaning: 'Linguistik / Kebahasaan', type: 'Adj' },
    { word: 'liberty', meaning: 'Kemerdekaan / Kebebasan', type: 'Noun' },
    { word: 'legacy', meaning: 'Warisan / Peninggalan', type: 'Noun' },
    { word: 'logical', meaning: 'Logis / Masuk akal', type: 'Adj' }
  ],
  m: [
    { word: 'masterpiece', meaning: 'Karya agung / Mahakarya', type: 'Noun' },
    { word: 'motivation', meaning: 'Motivasi / Dorongan', type: 'Noun' },
    { word: 'mechanism', meaning: 'Mekanisme / Cara kerja', type: 'Noun' },
    { word: 'magnificent', meaning: 'Megah / Menakjubkan', type: 'Adj' },
    { word: 'mindfulness', meaning: 'Kesadaran penuh', type: 'Noun' },
    { word: 'memory', meaning: 'Ingatan / Memori', type: 'Noun' },
    { word: 'monument', meaning: 'Monumen bersejarah', type: 'Noun' }
  ],
  n: [
    { word: 'navigation', meaning: 'Navigasi / Penunjuk arah', type: 'Noun' },
    { word: 'narrative', meaning: 'Naratif / Kisah', type: 'Noun' },
    { word: 'necessity', meaning: 'Kebutuhan pokok', type: 'Noun' },
    { word: 'negotiation', meaning: 'Perundingan / Negosiasi', type: 'Noun' },
    { word: 'nobility', meaning: 'Kemuliaan budi', type: 'Noun' },
    { word: 'nurture', meaning: 'Memelihara / Membina', type: 'Verb' },
    { word: 'network', meaning: 'Jaringan / Relasi', type: 'Noun' }
  ],
  o: [
    { word: 'observation', meaning: 'Pengamatan / Observasi', type: 'Noun' },
    { word: 'opportunity', meaning: 'Peluang / Kesempatan emas', type: 'Noun' },
    { word: 'optimism', meaning: 'Optimisme / Keyakinan baik', type: 'Noun' },
    { word: 'orientation', meaning: 'Orientasi / Pengenalan', type: 'Noun' },
    { word: 'originality', meaning: 'Keaslian / Orisinalitas', type: 'Noun' },
    { word: 'outcome', meaning: 'Hasil akhir', type: 'Noun' },
    { word: 'overview', meaning: 'Gambaran umum', type: 'Noun' }
  ],
  p: [
    { word: 'perspective', meaning: 'Sudut pandang / Perspektif', type: 'Noun' },
    { word: 'philosophy', meaning: 'Filsafat / Pandangan hidup', type: 'Noun' },
    { word: 'phenomenon', meaning: 'Fenomena / Gejala', type: 'Noun' },
    { word: 'potential', meaning: 'Potensi / Kemampuan terpendam', type: 'Noun' },
    { word: 'precision', meaning: 'Ketelitian / Presisi', type: 'Noun' },
    { word: 'principle', meaning: 'Prinsip dasar', type: 'Noun' },
    { word: 'pioneer', meaning: 'Pelopor / Perintis', type: 'Noun' }
  ],
  q: [
    { word: 'qualification', meaning: 'Kualifikasi / Keahlian', type: 'Noun' },
    { word: 'quantum', meaning: 'Kuantum / Lompatan besar', type: 'Noun' },
    { word: 'questionnaire', meaning: 'Kuesioner / Angket', type: 'Noun' },
    { word: 'quintessential', meaning: 'Contoh paling sempurna', type: 'Adj' },
    { word: 'quietly', meaning: 'Dengan tenang', type: 'Adv' },
    { word: 'quench', meaning: 'Memuaskan / Memadamkan', type: 'Verb' }
  ],
  r: [
    { word: 'reflection', meaning: 'Refleksi / Perenungan', type: 'Noun' },
    { word: 'resilience', meaning: 'Ketahanan / Ketangguhan', type: 'Noun' },
    { word: 'revolutionary', meaning: 'Revolusioner / Pembaruan', type: 'Adj' },
    { word: 'resourceful', meaning: 'Banyak akal / Kreatif', type: 'Adj' },
    { word: 'radiant', meaning: 'Bercahaya / Berseri', type: 'Adj' },
    { word: 'reinforce', meaning: 'Memperkuat / Menegaskan', type: 'Verb' }
  ],
  s: [
    { word: 'sustainability', meaning: 'Keberlanjutan', type: 'Noun' },
    { word: 'significance', meaning: 'Signifikansi / Arti penting', type: 'Noun' },
    { word: 'structure', meaning: 'Struktur / Susunan', type: 'Noun' },
    { word: 'sophisticated', meaning: 'Canggih / Piawai', type: 'Adj' },
    { word: 'stimulate', meaning: 'Merangsang / Memicu', type: 'Verb' },
    { word: 'strategy', meaning: 'Strategi / Siasat', type: 'Noun' },
    { word: 'strengthen', meaning: 'Memperkokoh', type: 'Verb' }
  ],
  t: [
    { word: 'transformation', meaning: 'Transformasi / Perubahan wujud', type: 'Noun' },
    { word: 'technology', meaning: 'Teknologi', type: 'Noun' },
    { word: 'tolerance', meaning: 'Toleransi / Tenggang rasa', type: 'Noun' },
    { word: 'theoretical', meaning: 'Teoretis / Berdasar teori', type: 'Adj' },
    { word: 'triumph', meaning: 'Kemenangan besar', type: 'Noun' },
    { word: 'tenacity', meaning: 'Kegigihan / Keuletan', type: 'Noun' }
  ],
  u: [
    { word: 'understanding', meaning: 'Pemahaman / Pengertian', type: 'Noun' },
    { word: 'universal', meaning: 'Universal / Berlaku umum', type: 'Adj' },
    { word: 'unification', meaning: 'Penyatuan / Unifikasi', type: 'Noun' },
    { word: 'unprecedented', meaning: 'Belum pernah terjadi sebelumnya', type: 'Adj' },
    { word: 'ultimate', meaning: 'Pamungkas / Tertinggi', type: 'Adj' },
    { word: 'utility', meaning: 'Kegunaan / Manfaat', type: 'Noun' }
  ],
  v: [
    { word: 'vocabulary', meaning: 'Kosakata / Perbendaharaan kata', type: 'Noun' },
    { word: 'versatility', meaning: 'Keserbagunaan / Fleksibilitas', type: 'Noun' },
    { word: 'vibrant', meaning: 'Semarak / Penuh energi', type: 'Adj' },
    { word: 'validation', meaning: 'Validasi / Pengesahan', type: 'Noun' },
    { word: 'virtue', meaning: 'Kebajikan / Kebaikan budi', type: 'Noun' },
    { word: 'visionary', meaning: 'Visioner / Berwawasan ke depan', type: 'Noun' },
    { word: 'victory', meaning: 'Kemenangan', type: 'Noun' }
  ],
  w: [
    { word: 'wonder', meaning: 'Keajaiban / Rasa kagum', type: 'Noun' },
    { word: 'wisdom', meaning: 'Kebijaksanaan / Kearifan', type: 'Noun' },
    { word: 'willingness', meaning: 'Kesediaan / Kemauan', type: 'Noun' },
    { word: 'worthwhile', meaning: 'Bermanfaat / Berharga', type: 'Adj' },
    { word: 'wholesome', meaning: 'Sehat / Baik untuk jiwa', type: 'Adj' },
    { word: 'workplace', meaning: 'Tempat kerja', type: 'Noun' },
    { word: 'widespread', meaning: 'Meluas / Tersebar', type: 'Adj' }
  ],
  x: [
    { word: 'xenon', meaning: 'Xenon (Gas mulia)', type: 'Noun' },
    { word: 'xylophone', meaning: 'Xilofon (Alat musik)', type: 'Noun' },
    { word: 'xerox', meaning: 'Fotokopi', type: 'Noun' }
  ],
  y: [
    { word: 'youthful', meaning: 'Berjiwa muda / Segar', type: 'Adj' },
    { word: 'yielding', meaning: 'Menghasilkan / Menuruti', type: 'Adj' },
    { word: 'yearning', meaning: 'Kerinduan / Keinginan kuat', type: 'Noun' },
    { word: 'yesterday', meaning: 'Kemarin / Masa lalu', type: 'Noun' }
  ],
  z: [
    { word: 'zealous', meaning: 'Sangat bersemangat / Antusias', type: 'Adj' },
    { word: 'zenith', meaning: 'Puncak kejayaan', type: 'Noun' },
    { word: 'zephyr', meaning: 'Angin sepoi-sepoi yang lembut', type: 'Noun' },
    { word: 'zoology', meaning: 'Ilmu hewan / Zoologi', type: 'Noun' },
    { word: 'zodiac', meaning: 'Zodiak / Rasi bintang', type: 'Noun' }
  ]
};

// =========================================================================
// MAIN COMPONENT
// =========================================================================
export const IceBreakingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wordchain' | 'sentencebuilder' | 'crossword'>('crossword');

  // --- GAME 1: FAST WORD CHAIN RUSH STATES ---
  const [chainTopic, setChainTopic] = useState<'All' | 'Academic' | 'Verbs' | 'Adjectives'>('All');
  const [chainDuration, setChainDuration] = useState<number>(15); // 10s Blitz, 15s Standard, 25s Relaxed
  const [chainHistory, setChainHistory] = useState<Array<{ word: string; player: 'You' | 'AI'; time: string; meaning?: string; type?: string }>>([
    { word: 'English', player: 'AI', time: '00:00', meaning: 'Bahasa Inggris', type: 'Noun' },
  ]);
  const [chainInput, setChainInput] = useState('');
  const [chainScore, setChainScore] = useState(0);
  const [chainCombo, setChainCombo] = useState(0);
  const [maxChainCombo, setMaxChainCombo] = useState(0);
  const [chainTimeLeft, setChainTimeLeft] = useState(15);
  const [isChainActive, setIsChainActive] = useState(false);
  const [isChainGameOver, setIsChainGameOver] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [chainHighScore, setChainHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ts_word_chain_highscore');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [chainFeedback, setChainFeedback] = useState<string | null>(null);
  const [bonusTimeNotification, setBonusTimeNotification] = useState<string | null>(null);
  const [showWordHint, setShowWordHint] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedStats, setCopiedStats] = useState(false);
  const chainInputRef = useRef<HTMLInputElement | null>(null);

  // --- GAME 1: WORD CHAIN TIMER WITH URGENT 5-SECOND WARNING & GAME OVER TRIGGER ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isChainActive && chainTimeLeft > 0) {
      interval = setInterval(() => {
        setChainTimeLeft((prev) => {
          if (prev <= 1) {
            // TIME'S UP TRIGGER!
            setIsChainActive(false);
            setIsChainGameOver(true);

            // Check High Score
            setChainScore((currentScore) => {
              if (currentScore > chainHighScore && currentScore > 0) {
                setIsNewHighScore(true);
                setChainHighScore(currentScore);
                try {
                  localStorage.setItem('ts_word_chain_highscore', currentScore.toString());
                } catch {
                  // localStorage fallback
                }
                if (soundEnabled) playFeedbackSound('new_high_score');
                triggerConfetti();
                setTimeout(() => triggerConfetti(), 400);
              } else {
                setIsNewHighScore(false);
                if (soundEnabled) playFeedbackSound('game_over');
              }
              return currentScore;
            });

            return 0;
          }

          // 5-Second Warning Sound Cue
          if (prev <= 6 && prev >= 2 && soundEnabled) {
            playFeedbackSound('timer_tick_urgent');
          }

          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isChainActive, chainTimeLeft, chainHighScore, soundEnabled]);

  // Focus input when game starts or becomes active
  useEffect(() => {
    if (isChainActive && chainInputRef.current) {
      chainInputRef.current.focus();
    }
  }, [isChainActive]);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if confetti not supported
    }
  };

  // Find definition helper from dictionary
  const findWordDefinition = (wordToLookup: string) => {
    const firstLetter = wordToLookup.charAt(0).toLowerCase();
    const list = WORD_CHAIN_DICTIONARY[firstLetter] || [];
    const found = list.find((item) => item.word.toLowerCase() === wordToLookup.toLowerCase());
    return found ? { meaning: found.meaning, type: found.type } : { meaning: 'Kata Bahasa Inggris', type: 'Vocab' };
  };

  // --- HANDLER: WORD CHAIN SUBMIT ---
  const handleChainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const word = chainInput.trim().toLowerCase();
    if (!word || !isChainActive) return;

    const lastWordObj = chainHistory[chainHistory.length - 1];
    const lastLetter = lastWordObj.word.slice(-1).toLowerCase();
    const firstLetter = word.charAt(0).toLowerCase();

    // Check letter rule
    if (firstLetter !== lastLetter) {
      if (soundEnabled) playFeedbackSound('wrong');
      setChainFeedback(`❌ Kata harus berawalan huruf "${lastLetter.toUpperCase()}"!`);
      return;
    }

    // Check minimum length (at least 3 letters)
    if (word.length < 3) {
      if (soundEnabled) playFeedbackSound('wrong');
      setChainFeedback('❌ Kata bahasa Inggris minimal harus terdiri dari 3 huruf!');
      return;
    }

    // Check duplicate
    if (chainHistory.some((item) => item.word.toLowerCase() === word)) {
      if (soundEnabled) playFeedbackSound('wrong');
      setChainFeedback(`❌ Kata "${word}" sudah pernah digunakan pada rantai ini!`);
      return;
    }

    // Valid word!
    if (soundEnabled) playFeedbackSound('correct');
    const isLongWord = word.length >= 7;
    const earnedPoints = 20 + chainCombo * 5 + (isLongWord ? 20 : 0);
    const newCombo = chainCombo + 1;

    setChainScore((prev) => prev + earnedPoints);
    setChainCombo(newCombo);
    if (newCombo > maxChainCombo) {
      setMaxChainCombo(newCombo);
    }

    // Reset timer to full duration plus bonus time if long word
    const bonusTime = isLongWord ? 2 : 0;
    setChainTimeLeft(chainDuration + bonusTime);

    if (isLongWord) {
      setBonusTimeNotification('+2 Detik Bonus Waktu! ⏱️');
      setTimeout(() => setBonusTimeNotification(null), 2500);
    }

    setChainFeedback(`🎉 Luar biasa! +${earnedPoints} Poin (${isLongWord ? '⭐ Bonus Kata Panjang! ' : ''}Combo x${newCombo})`);
    setShowWordHint(false);

    if (newCombo % 5 === 0) {
      triggerConfetti();
      if (soundEnabled) playFeedbackSound('tada');
    }

    const wordInfo = findWordDefinition(word);
    const updatedHistory = [
      ...chainHistory,
      {
        word,
        player: 'You' as const,
        time: new Date().toLocaleTimeString('id-ID', { minute: '2-digit', second: '2-digit' }),
        meaning: wordInfo.meaning,
        type: wordInfo.type
      },
    ];
    setChainHistory(updatedHistory);
    setChainInput('');

    // AI automatic response
    setTimeout(() => {
      if (!isChainActive && chainTimeLeft <= 0) return;

      const nextLetter = word.slice(-1).toLowerCase();
      const dictionaryBank = WORD_CHAIN_DICTIONARY[nextLetter] || [];
      const available = dictionaryBank.filter(
        (w) => !updatedHistory.some((item) => item.word.toLowerCase() === w.word.toLowerCase())
      );

      let chosenItem: WordChainVocabItem;
      if (available.length > 0) {
        chosenItem = available[Math.floor(Math.random() * available.length)];
      } else {
        chosenItem = {
          word: `${nextLetter}eal`,
          meaning: 'Nyata / Sebenarnya',
          type: 'Adj'
        };
      }

      setChainHistory((prev) => [
        ...prev,
        {
          word: chosenItem.word,
          player: 'AI',
          time: new Date().toLocaleTimeString('id-ID', { minute: '2-digit', second: '2-digit' }),
          meaning: chosenItem.meaning,
          type: chosenItem.type
        },
      ]);
    }, 750);
  };

  const handleStartChainGame = (duration = chainDuration) => {
    setIsChainActive(true);
    setIsChainGameOver(false);
    setIsNewHighScore(false);
    setChainDuration(duration);
    setChainTimeLeft(duration);
    setChainScore(0);
    setChainCombo(0);
    setMaxChainCombo(0);
    setShowWordHint(false);
    setCopiedStats(false);
    setBonusTimeNotification(null);

    // Pick random starter word from dictionary
    const startLetters = ['a', 'b', 'c', 'e', 'f', 'g', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'w'];
    const randomStartLetter = startLetters[Math.floor(Math.random() * startLetters.length)];
    const list = WORD_CHAIN_DICTIONARY[randomStartLetter] || WORD_CHAIN_DICTIONARY['e'];
    const startItem = list[Math.floor(Math.random() * list.length)];

    setChainHistory([
      {
        word: startItem.word,
        player: 'AI',
        time: '00:00',
        meaning: startItem.meaning,
        type: startItem.type
      }
    ]);
    const requiredFirstLetter = startItem.word.slice(-1).toUpperCase();
    setChainFeedback(`🚀 Tantangan Dimulai! Ketik kata bahasa Inggris berawalan huruf "${requiredFirstLetter}" (huruf terakhir dari "${startItem.word}")`);
    if (soundEnabled) playFeedbackSound('sparkle');
  };

  const handleCopyChainStats = () => {
    const totalWords = chainHistory.length;
    const playerWords = chainHistory.filter((item) => item.player === 'You').length;
    const longestWord = chainHistory
      .filter((item) => item.player === 'You')
      .reduce((longest, current) => (current.word.length > longest.length ? current.word : longest), '');

    const textToCopy = `🎮 *Rekap Life Sentence - Tiga Serangkai Edu*
━━━━━━━━━━━━━━━━━━━━
🏆 Skor Akhir: ${chainScore} Poin
🔥 Combo Maksimal: ${maxChainCombo}x
📝 Total Kata Terangkai: ${playerWords} kata kamu / ${totalWords} total rantai
🌟 Kata Terpanjang: ${longestWord ? `"${longestWord}" (${longestWord.length} huruf)` : '-'}
⏱️ Mode Waktu: ${chainDuration} detik/turn
━━━━━━━━━━━━━━━━━━━━
Ayo asah kosakata bahasa Inggrismu sekarang!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedStats(true);
      if (soundEnabled) playFeedbackSound('click');
      setTimeout(() => setCopiedStats(false), 3000);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Hero Banner with Dynamic Gradient */}
      <div className="bg-gradient-to-r from-amber-600 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-amber-500/30">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 text-xs font-bold backdrop-blur-xs">
              <Gamepad2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Zona Fun & 3 Arena Edukatif Bahasa Inggris</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 text-[11px] font-bold">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Kurikulum Tenses, Kosakata & Teka-Teki Silang CEFR</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Arena Zona Fun Games Bahasa Inggris
          </h1>

          <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed">
            Tiga arena permainan edukatif terfokus untuk pemanasan interaktif: melatih kecepatan kosakata (Life Sentence), merakit susunan kalimat (Frankensentence), serta menaklukkan 6 level teka-teki silang berstandar CEFR (Letterally Stuck).
          </p>
        </div>
      </div>

      {/* 3 Focused Main Game Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => {
            setActiveTab('wordchain');
            if (soundEnabled) playFeedbackSound('click');
          }}
          className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === 'wordchain'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-md border border-amber-200 dark:border-amber-700 scale-[1.01]'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <span className="text-lg">⚡</span>
          <div className="text-left">
            <div className="font-extrabold leading-tight">1. Life Sentence</div>
            <div className="text-[10px] opacity-70 font-normal">Sambung Kata Kilat & Refleks</div>
          </div>
        </button>

        <button
          onClick={() => {
            setActiveTab('sentencebuilder');
            if (soundEnabled) playFeedbackSound('click');
          }}
          className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === 'sentencebuilder'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md border border-emerald-200 dark:border-emerald-700 scale-[1.01]'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <span className="text-lg">🧱</span>
          <div className="text-left">
            <div className="font-extrabold leading-tight">2. Frankensentence</div>
            <div className="text-[10px] opacity-70 font-normal">Struktur, Grammar & Distractor Trap</div>
          </div>
        </button>

        <button
          onClick={() => {
            setActiveTab('crossword');
            if (soundEnabled) playFeedbackSound('click');
          }}
          className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
            activeTab === 'crossword'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md border border-indigo-200 dark:border-indigo-700 scale-[1.01]'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <span className="text-lg">🔤</span>
          <div className="text-left">
            <div className="font-extrabold leading-tight">3. Letterally Stuck</div>
            <div className="text-[10px] opacity-70 font-normal">TTS CEFR (A1 - C2) 6 Level</div>
          </div>
        </button>
      </div>

      {/* =========================================================================
          GAME 1: LIFE SENTENCE (SAMBUNG KATA KILAT)
          ========================================================================= */}
      {activeTab === 'wordchain' && (
        <div className="space-y-6">
          <div
            className={`relative bg-white dark:bg-slate-900 rounded-3xl border transition-all duration-300 p-6 sm:p-8 shadow-sm space-y-6 overflow-hidden ${
              isChainActive && chainTimeLeft <= 5 && chainTimeLeft > 0
                ? 'border-rose-500/80 shadow-[inset_0_0_50px_rgba(239,68,68,0.3)] ring-4 ring-rose-500/30'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            {/* 5-SECOND AMBIENT URGENCY WARNING OVERLAY */}
            {isChainActive && chainTimeLeft <= 5 && chainTimeLeft > 0 && (
              <div className="absolute inset-0 pointer-events-none rounded-3xl border-4 border-rose-500/80 shadow-[inset_0_0_60px_rgba(239,68,68,0.35)] animate-pulse z-20" />
            )}

            {/* Top Game Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl font-black shadow-inner transition-colors ${
                    isChainActive && chainTimeLeft <= 5 && chainTimeLeft > 0
                      ? 'bg-rose-500 text-white animate-bounce'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {isChainActive && chainTimeLeft <= 5 && chainTimeLeft > 0 ? '⚠️' : '⚡'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                      Sambung Kata Kilat (Life Sentence)
                    </h2>
                    {chainHighScore > 0 && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-[10px] font-black text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                        <Crown className="w-3 h-3 text-amber-500" />
                        Rekor: {chainHighScore} Poin
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ketik kata bahasa Inggris berawalan huruf terakhir lawan sebelum waktu habis!
                  </p>
                </div>
              </div>

              {/* Status Pills & Controls */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Audio Toggle */}
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    soundEnabled
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                      : 'bg-rose-50 dark:bg-rose-950 text-rose-500 border-rose-200 dark:border-rose-800'
                  }`}
                  title={soundEnabled ? 'Matikan Suara FX' : 'Aktifkan Suara FX'}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Score Pill */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-300">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Skor: {chainScore}</span>
                </div>

                {/* Combo Pill */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  <Flame className="w-4 h-4 text-indigo-500" />
                  <span>Combo: {chainCombo}x 🔥</span>
                </div>

                {/* Dynamic Timer Pill with Warning Pulse */}
                <div
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all duration-200 ${
                    !isChainActive
                      ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                      : chainTimeLeft <= 5
                      ? 'bg-rose-600 text-white border-rose-500 ring-4 ring-rose-500/40 animate-pulse scale-105 shadow-md shadow-rose-500/30'
                      : 'bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                  }`}
                >
                  <Timer className={`w-4 h-4 ${isChainActive && chainTimeLeft <= 5 ? 'animate-spin' : ''}`} />
                  <span>
                    {isChainActive
                      ? `Sisa: ${chainTimeLeft}s ${chainTimeLeft <= 5 ? '🔥 CEPAT!' : ''}`
                      : `${chainDuration}s / Turn`}
                  </span>
                </div>
              </div>
            </div>

            {/* FLOATING 5-SECOND URGENCY BANNER */}
            {isChainActive && chainTimeLeft <= 5 && chainTimeLeft > 0 && (
              <div className="p-3 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white rounded-2xl flex items-center justify-between shadow-lg animate-pulse">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 animate-bounce" />
                  <span className="font-black text-xs sm:text-sm">
                    ⚠️ WAKTU KRITIS TERSISA {chainTimeLeft} DETIK! Ketik kata berawalan "
                    {chainHistory[chainHistory.length - 1].word.slice(-1).toUpperCase()}" sekarang!
                  </span>
                </div>
                <span className="text-xs font-extrabold bg-white/20 px-2 py-0.5 rounded-md hidden sm:inline-block">
                  Refleks Cepat!
                </span>
              </div>
            )}

            {/* BONUS TIME NOTIFICATION POP */}
            {bonusTimeNotification && (
              <div className="p-2.5 bg-emerald-500 text-white rounded-xl text-center text-xs font-black shadow-md animate-bounce">
                ✨ {bonusTimeNotification}
              </div>
            )}

            {/* =========================================================================
                GAME OVER / NEW HIGH SCORE RECAP SCREEN
                ========================================================================= */}
            {isChainGameOver && !isChainActive ? (
              <div className="p-6 sm:p-10 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white border-2 border-indigo-500/40 shadow-2xl space-y-6">
                {/* Result Header */}
                <div className="text-center space-y-2">
                  {isNewHighScore ? (
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black shadow-lg animate-bounce">
                      <Crown className="w-4 h-4 fill-current" />
                      <span>🎉 REKOR SKOR BARU TERPECAHKAN!</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-extrabold">
                      <Clock className="w-4 h-4" />
                      <span>⏰ WAKTU TELAH HABIS (TIME'S UP!)</span>
                    </div>
                  )}

                  <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                    {isNewHighScore ? 'Luar Biasa! Performa Kosakatamu Fenomenal!' : 'Putaran Sambung Kata Selesai!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-200 max-w-xl mx-auto leading-relaxed">
                    {isNewHighScore
                      ? `Selamat! Kamu berhasil mencetak rekor skor tertinggi baru sebesar ${chainScore} Poin di arena Life Sentence.`
                      : `Kecepatan refleks dan perbendaharaan kosakatamu sudah sangat tajam. Terus berlatih untuk menembus skor tertinggi!`
                    }
                  </p>
                </div>

                {/* Score & Performance Matrix Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center space-y-1">
                    <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Skor Akhir</div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-400">{chainScore}</div>
                    <div className="text-[10px] text-slate-400">Poin Terkumpul</div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center space-y-1">
                    <div className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Rekor Terbaik</div>
                    <div className="text-2xl sm:text-3xl font-black text-indigo-300">{chainHighScore}</div>
                    <div className="text-[10px] text-slate-400">All-Time Highscore</div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center space-y-1">
                    <div className="text-[10px] text-rose-300 font-bold uppercase tracking-wider">Combo Maksimal</div>
                    <div className="text-2xl sm:text-3xl font-black text-rose-400">{maxChainCombo}x</div>
                    <div className="text-[10px] text-slate-400">Rantai Beruntun</div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center space-y-1">
                    <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Kata Kamu</div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                      {chainHistory.filter((item) => item.player === 'You').length}
                    </div>
                    <div className="text-[10px] text-slate-400">Total {chainHistory.length} Rantai</div>
                  </div>
                </div>

                {/* Complete History & Vocabulary Review Stream */}
                <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-indigo-200 font-bold border-b border-white/10 pb-2">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>Rangkuman Kosakata & Rantai Kata yang Dimainkan:</span>
                    </div>
                    <span className="text-[11px] opacity-75">{chainHistory.length} Kata Tersambung</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto custom-scrollbar p-1">
                    {chainHistory.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs ${
                          item.player === 'You'
                            ? 'bg-amber-400/10 border-amber-400/30 text-amber-100'
                            : 'bg-indigo-400/10 border-indigo-400/30 text-indigo-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span
                            className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                              item.player === 'You' ? 'bg-amber-400 text-slate-950' : 'bg-indigo-400 text-slate-950'
                            }`}
                          >
                            {item.player === 'You' ? 'KAMU' : 'AI'}
                          </span>
                          <div className="truncate">
                            <span className="font-black text-white">{item.word}</span>
                            {item.meaning && (
                              <span className="block text-[10px] opacity-70 truncate">{item.meaning}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleStartChainGame(chainDuration)}
                    className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-xl cursor-pointer flex items-center gap-2 active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Main Lagi Sekarang (Retry)</span>
                  </button>

                  <button
                    onClick={handleCopyChainStats}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all border border-white/20 cursor-pointer flex items-center gap-2 active:scale-95"
                  >
                    {copiedStats ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                    <span>{copiedStats ? 'Tersalin ke Clipboard!' : 'Bagikan Hasil Rekap'}</span>
                  </button>
                </div>
              </div>
            ) : !isChainActive ? (
              /* =========================================================================
                 GAME LOBBY / PRE-START STAGE
                 ========================================================================= */
              <div className="p-8 sm:p-14 text-center bg-gradient-to-b from-slate-50 to-amber-50/30 dark:from-slate-800/40 dark:to-slate-800/20 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-6">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center shadow-lg text-2xl font-black">
                  ⚡
                </div>
                <div className="space-y-2 max-w-lg mx-auto">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Tantang Otakmu dalam Duel Rantai Kata Cepat!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Setiap kata harus berawalan huruf terakhir dari kata lawan. Kata minimal 3 huruf. Semakin cepat dan panjang kata yang kamu rakit, semakin berlimpah bonus poin serta waktu tambahan!
                  </p>
                </div>

                {/* Difficulty & Turn Duration Selector */}
                <div className="max-w-md mx-auto space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Pilih Batas Waktu Tantangan Per Turn:
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: '⚡ Blitz', duration: 10, desc: 'Ekstrem 10s' },
                      { label: '⏱️ Standar', duration: 15, desc: 'Rekomendasi 15s' },
                      { label: '🧘 Santai', duration: 25, desc: 'Leluasa 25s' }
                    ].map((opt) => (
                      <button
                        key={opt.duration}
                        type="button"
                        onClick={() => {
                          setChainDuration(opt.duration);
                          if (soundEnabled) playFeedbackSound('click');
                        }}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          chainDuration === opt.duration
                            ? 'bg-amber-500 text-slate-950 border-amber-600 font-black shadow-md'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="text-xs">{opt.label}</div>
                        <div className="text-[10px] opacity-75">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleStartChainGame(chainDuration)}
                    className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-lg cursor-pointer flex items-center gap-2 active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Mulai Tantangan Life Sentence ({chainDuration}s)</span>
                  </button>
                </div>
              </div>
            ) : (
              /* =========================================================================
                 ACTIVE GAME ARENA
                 ========================================================================= */
              <div className="space-y-5">
                {/* Last Word Display Highlight */}
                {chainHistory.length > 0 && (
                  <div
                    className={`p-6 rounded-3xl text-white text-center space-y-3 shadow-lg relative overflow-hidden transition-all duration-300 ${
                      chainTimeLeft <= 5
                        ? 'bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border-2 border-rose-500 ring-4 ring-rose-500/30'
                        : 'bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 border border-indigo-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-indigo-300 font-bold px-2">
                      <span className="uppercase tracking-widest text-[10px] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Kata Terakhir ({chainHistory[chainHistory.length - 1].player})
                      </span>
                    </div>

                    <div className="text-3xl sm:text-5xl font-black tracking-wider py-1">
                      {chainHistory[chainHistory.length - 1].word.slice(0, -1)}
                      <span
                        className={`underline decoration-4 inline-block transform hover:scale-110 transition-transform ${
                          chainTimeLeft <= 5
                            ? 'text-rose-400 decoration-rose-400 animate-pulse'
                            : 'text-amber-400 decoration-amber-400'
                        }`}
                      >
                        {chainHistory[chainHistory.length - 1].word.slice(-1).toUpperCase()}
                      </span>
                    </div>

                    {chainHistory[chainHistory.length - 1].meaning && (
                      <p className="text-[11px] text-slate-300 font-medium italic">
                        Arti: "{chainHistory[chainHistory.length - 1].meaning}"
                      </p>
                    )}

                    <div className="pt-1">
                      <p
                        className={`text-xs font-bold py-1.5 px-4 rounded-full inline-block border ${
                          chainTimeLeft <= 5
                            ? 'bg-rose-500/20 text-rose-200 border-rose-400/40 animate-bounce'
                            : 'bg-amber-400/10 text-amber-300 border-amber-400/20'
                        }`}
                      >
                        👉 Ketik kata berikutnya berawalan huruf: "
                        {chainHistory[chainHistory.length - 1].word.slice(-1).toUpperCase()}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Input Form with Urgent Alert Ring */}
                <form onSubmit={handleChainSubmit} className="flex gap-2">
                  <input
                    ref={chainInputRef}
                    type="text"
                    value={chainInput}
                    onChange={(e) => setChainInput(e.target.value)}
                    placeholder={`Ketik kata berawalan huruf "${
                      chainHistory.length > 0
                        ? chainHistory[chainHistory.length - 1].word.slice(-1).toUpperCase()
                        : 'E'
                    }"...`}
                    className={`flex-1 px-5 py-3.5 bg-white dark:bg-slate-900 border-2 rounded-2xl font-black text-base text-slate-900 dark:text-white focus:outline-none transition-all shadow-inner ${
                      chainTimeLeft <= 5
                        ? 'border-rose-500 ring-4 ring-rose-500/30'
                        : 'border-amber-400 focus:ring-4 focus:ring-amber-500/20'
                    }`}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className={`px-6 sm:px-8 py-3.5 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-2 active:scale-95 ${
                      chainTimeLeft <= 5
                        ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                        : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Kata</span>
                  </button>
                </form>

                {/* Hint & Vocabulary Assistance Box */}
                <div className="flex items-center justify-between text-xs px-1">
                  <button
                    type="button"
                    onClick={() => setShowWordHint(!showWordHint)}
                    className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>{showWordHint ? 'Sembunyikan Bantuan Kata' : 'Butuh Inspirasi Kata? (Hint)'}</span>
                  </button>

                  <span className="text-[11px] text-slate-400">
                    Tips: Kata ≥ 7 huruf memberi bonus +20 poin dan +2 detik waktu!
                  </span>
                </div>

                {showWordHint && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl text-xs space-y-2">
                    <div className="font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>
                        Inspirasi Kata Berawalan Huruf "
                        {chainHistory[chainHistory.length - 1].word.slice(-1).toUpperCase()}":
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(
                        WORD_CHAIN_DICTIONARY[
                          chainHistory[chainHistory.length - 1].word.slice(-1).toLowerCase()
                        ] || []
                      )
                        .slice(0, 4)
                        .map((hintItem, hIdx) => (
                          <button
                            key={hIdx}
                            type="button"
                            onClick={() => {
                              setChainInput(hintItem.word);
                              if (soundEnabled) playFeedbackSound('click');
                            }}
                            className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 rounded-lg font-bold text-slate-800 dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-amber-950/80 transition-colors"
                          >
                            <span className="text-amber-600 dark:text-amber-400 font-extrabold">
                              {hintItem.word}
                            </span>{' '}
                            <span className="text-[10px] opacity-70">({hintItem.meaning})</span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {chainFeedback && (
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs font-bold text-indigo-900 dark:text-indigo-200 text-center animate-in fade-in">
                    {chainFeedback}
                  </div>
                )}

                {/* History Stream */}
                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="uppercase tracking-wider text-[10px]">Alur Rantai Kata Terkumpul:</span>
                    <span>Total {chainHistory.length} Kata Tersambung</span>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto custom-scrollbar p-1">
                    {chainHistory.map((item, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs border ${
                          item.player === 'You'
                            ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                            : 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800'
                        }`}
                      >
                        <span className="text-[10px] opacity-70">[{item.player}]:</span>
                        <span>{item.word}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          GAME 2: SENTENCE BUILDER (SUSUN KALIMAT & DISTRACTOR TRAP ARENA)
          ========================================================================= */}
      {activeTab === 'sentencebuilder' && <SentenceBuilderGame />}

      {/* =========================================================================
          GAME 3: LETTERALLY STUCK (TEKA-TEKI SILANG CEFR 6 LEVEL)
          ========================================================================= */}
      {activeTab === 'crossword' && <LetterallyStuckGame />}
    </div>
  );
};
