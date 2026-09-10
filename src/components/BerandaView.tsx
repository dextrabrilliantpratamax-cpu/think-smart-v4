import React from 'react';
import { StudentProfile } from '../types';
import { AudioPlayer } from './AudioPlayer';
import { StreakFlameAnimation } from './streak/StreakFlameAnimation';
import { getStreakTier } from './streak/streakTiers';
import tsBgImage from '../assets/images/tiga_serangkai_bg_1786596285216.jpg';
import tsLobbyImage from '../assets/images/tiga_serangkai_lobby_1786596728234.jpg';
import {
  Building2,
  BookOpen,
  GraduationCap,
  Volume2,
  Trophy,
  ArrowRight,
  Clock,
  ExternalLink,
  Target,
  Flame,
  MapPin,
  Phone,
  Globe,
  Bookmark,
  ShieldCheck,
  Gamepad2,
  PenTool,
  Calendar,
  ChevronRight,
  FileText,
  CheckCircle2,
  Sparkles,
  Compass,
  Lightbulb,
  Award
} from 'lucide-react';

interface BerandaViewProps {
  profile: StudentProfile;
  onNavigate: (tab: 'home' | 'tenses' | 'vocab' | 'utbk' | 'ai' | 'icebreaking' | 'listening' | 'progress') => void;
  onUpdateStreak?: (newDays: number) => void;
  onOpenStreakGallery?: () => void;
}

export const BerandaView: React.FC<BerandaViewProps> = ({ profile, onNavigate, onUpdateStreak, onOpenStreakGallery }) => {
  const currentTier = getStreakTier(profile.streakDays);
  return (
    <div className="space-y-10 pb-16">
      {/* SECTION 1: HERO & VISI MISI PEMBELAJARAN DIGITAL */}
      <div
        className="rounded-3xl p-7 sm:p-10 text-white shadow-md border border-slate-800 relative overflow-hidden bg-[#132A4A]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.95) 35%, rgba(15, 23, 42, 0.85)), url(${tsBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow-xs">
            <Bookmark className="w-4 h-4 text-slate-950" />
            <span>Portal Digital Pendamping Buku Paket Resmi · PT Tiga Serangkai</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            Materi Digital Pendamping Buku Teks Bahasa Inggris SMA / SMK / MA
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            Selamat datang di platform pembelajaran digital <b>Think Smart English</b>. Web ini hadir sebagai <b>fasilitas eksklusif pendamping buku paket cetak</b> terbitan PT Tiga Serangkai Pustaka Mandiri yang diperoleh saat Anda membeli buku fisik resmi.
          </p>

          {/* Core Purpose & Visi Misi Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold shrink-0 mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-amber-300">Tujuan Utama Web</div>
                <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                  Mempermudah pemahaman materi buku cetak melalui penjelasan digital interaktif, audio listening, & simulasi soal.
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold shrink-0 mt-0.5">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-indigo-200">Visi & Misi Belajar</div>
                <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                  Menciptakan pengalaman belajar mandiri yang fleksibel, terukur, serta siap menghadapi ujian sekolah & UTBK/SNBT.
                </div>
              </div>
            </div>
          </div>

            {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('vocab')}
              className="px-4.5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-slate-950" />
              <span>Flashcard Medieval English (25 Frasa)</span>
            </button>

            <button
              onClick={() => onNavigate('tenses')}
              className="px-4.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs border border-slate-700"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Mulai Belajar 16 Tenses</span>
            </button>

            <button
              onClick={() => onNavigate('utbk')}
              className="px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Simulasi UTBK / SNBT 2026</span>
            </button>

            <button
              onClick={() => onNavigate('icebreaking')}
              className="px-4.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Gamepad2 className="w-4 h-4 text-amber-400" />
              <span>Zona Fun Games</span>
            </button>
          </div>
        </div>
      </div>

      {/* AUDIO COMPANION BAR (PATEN / PERMANENT BGM) */}
      <AudioPlayer variant="beranda-card" />

      {/* Rincian Visi, Misi & Manfaat Digital Companion */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="text-[11px] font-extrabold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Maksud & Tujuan Pendamping Digital</span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 mt-0.5">
              Mengapa Platform Digital Ini Disediakan?
            </h2>
          </div>
          <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold w-fit">
            Bundled dengan Buku Paket Cetak TS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Pelengkap Buku Cetak</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Materi di buku cetak fisik dilengkapi dengan elemen audio listening, interaktivitas tata bahasa, dan pengecekan tugas otomatis yang tidak dapat diakomodasi di media kertas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Pembahasan Soal Otomatis</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Siswa dapat mengerjakan 77+ latihan soal UTBK/SNBT dan kuis harian dengan penilaian langsung beserta penjelasan kunci jawaban secara rinci.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Akses Kapan Saja</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Diakses melalui smartphone atau laptop kapan pun dibutuhkan, baik saat belajar mandiri di rumah maupun saat pendampingan kelas oleh guru.
            </p>
          </div>
        </div>

        {/* Misi Pembelajaran List */}
        <div className="bg-indigo-50/60 rounded-xl p-5 border border-indigo-100 space-y-3">
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-indigo-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-700" />
            <span>Misi Pengembangan Materi Digital Think Smart English</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-indigo-100/80">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
              <div><b>Aksesibilitas Tinggi:</b> Menyediakan materi pendamping digital tanpa biaya tambahan bagi pengguna buku paket Tiga Serangkai.</div>
            </div>
            <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-indigo-100/80">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
              <div><b>Standar UTBK 2026:</b> Menyajikan latihan literasi Bahasa Inggris sesuai standar kurikulum terbaru dan kisi-kisi SNBT.</div>
            </div>
            <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-indigo-100/80">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
              <div><b>Keterampilan Utuh:</b> Mengintegrasikan keahlian *Grammar*, *Reading*, *Writing*, dan *Listening* dalam satu sistem.</div>
            </div>
            <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-indigo-100/80">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
              <div><b>Monitoring Belajar:</b> Membantu siswa memantau progress latihan, kuasai kosakata, serta konsistensi *streak* harian.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Progress Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl overflow-hidden bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold shrink-0 border border-indigo-100/80">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full aspect-square object-cover"
              />
            ) : (
              <GraduationCap className="w-5.5 h-5.5 text-indigo-700" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Siswa Terdaftar</div>
            <div className="text-sm font-extrabold text-slate-900 truncate">{profile.name}</div>
            <div className="text-[11px] text-indigo-700 font-medium truncate">
              Kelas {profile.classGrade} · {profile.educationLevel || 'SMA'} {profile.major || (profile.educationLevel === 'SMK' ? 'TKJ' : 'MIPA')}
            </div>
          </div>
        </div>

        <div 
          onClick={onOpenStreakGallery}
          className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-2xs flex items-center gap-3.5 cursor-pointer hover:border-amber-300 transition-all group"
          title="Klik untuk membuka Galeri Evolusi Api Streak"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
            <StreakFlameAnimation
              streakDays={profile.streakDays}
              size="sm"
              showLabel={false}
              interactive={false}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Streak Belajar</span>
              <span className="text-[10px] text-amber-600 font-bold group-hover:underline">Galeri &rarr;</span>
            </div>
            <div className="text-sm font-extrabold text-slate-900 truncate">{profile.streakDays} Hari ({currentTier.name})</div>
            <div className="text-[11px] text-amber-700 font-medium truncate">{currentTier.subtitle}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
            <BookOpen className="w-5.5 h-5.5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kosakata Dikuasai</div>
            <div className="text-sm font-extrabold text-slate-900">{profile.vocabularyMastered} Kata Akademia</div>
            <div className="text-[11px] text-emerald-700 font-medium">Mode Flashcard Interaktif</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
            <Trophy className="w-5.5 h-5.5 text-slate-700" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Modul Selesai</div>
            <div className="text-sm font-extrabold text-slate-900">{profile.completedLessons.length} Modul Terverifikasi</div>
            <button
              onClick={() => onNavigate('progress')}
              className="text-[11px] text-indigo-700 hover:underline font-semibold mt-0.5 flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Detail Progress</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: MODUL PEMBELAJARAN PENDAMPING DIGITAL */}
      <div className="space-y-4 pt-2">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Modul Belajar & Fitur Aplikasi Digital</h2>
            <p className="text-xs text-slate-500">Pilih modul materi pendamping buku cetak yang ingin diakses</p>
          </div>
          <span className="text-xs font-bold text-indigo-700">6 Modul Utama</span>
        </div>

        {/* Featured Core Modules Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Tenses Reference */}
          <div
            onClick={() => onNavigate('tenses')}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5 text-amber-700" />
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">Grammar</span>
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-700 transition-colors">16 Tenses Reference</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Panduan lengkap tenses dalam garis waktu Past, Present, Future, dan Past Future beserta rumus dan contoh kalimat.
                </p>
              </div>
            </div>
            <div className="flex items-center text-xs font-bold text-indigo-700 gap-1 pt-2 border-t border-slate-100">
              <span>Buka Materi Tenses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Practice UTBK */}
          <div
            onClick={() => onNavigate('utbk')}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                  <PenTool className="w-5 h-5 text-indigo-700" />
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">SNBT 2026</span>
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-700 transition-colors">Practice UTBK / SNBT</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  11 paket latihan (77 soal) dari level Beginner hingga Advanced, plus 3 simulasi UTBK dengan pembahasan instan.
                </p>
              </div>
            </div>
            <div className="flex items-center text-xs font-bold text-indigo-700 gap-1 pt-2 border-t border-slate-100">
              <span>Mulai Latihan UTBK</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Vocabulary Bank */}
          <div
            onClick={() => onNavigate('vocab')}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5 text-emerald-700" />
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md">Flashcards</span>
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-700 transition-colors">Bank Kosakata Akademik</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  42 istilah akademik berfrekuensi tinggi dalam bacaan UTBK dan teks sekolah, dilengkapi kartu balik interaktif.
                </p>
              </div>
            </div>
            <div className="flex items-center text-xs font-bold text-indigo-700 gap-1 pt-2 border-t border-slate-100">
              <span>Buka Flashcards</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Secondary Skill Modules Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
          {/* Card 4: Zona Fun Games */}
          <div
            onClick={() => onNavigate('icebreaking')}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Gamepad2 className="w-5 h-5 text-amber-700" />
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md">Interaktif</span>
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-700 transition-colors">Zona Fun Games</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Sambung kata kilat (Life Sentence), Frankensentence (susun kalimat), serta Syntax Architect.
                </p>
              </div>
            </div>
            <div className="flex items-center text-xs font-bold text-indigo-700 gap-1 pt-2 border-t border-slate-100">
              <span>Masuk Zona Fun</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Listening Lab */}
          <div
            onClick={() => onNavigate('listening')}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  <Volume2 className="w-5 h-5 text-teal-700" />
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-teal-50 text-teal-700 rounded-md">Aksen UK</span>
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-700 transition-colors">Listening Lab (British English)</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Sesi mendengarkan percakapan dan narasi aksen British dengan kontrol kecepatan audio dan transkrip.
                </p>
              </div>
            </div>
            <div className="flex items-center text-xs font-bold text-indigo-700 gap-1 pt-2 border-t border-slate-100">
              <span>Mulai Listening</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Quiz Daily */}
          <div
            onClick={() => onNavigate('progress')}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                  <Calendar className="w-5 h-5 text-rose-700" />
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-rose-50 text-rose-700 rounded-md">Evaluasi</span>
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-700 transition-colors">Quiz Harian & Evaluasi</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  35 soal kuis singkat yang terbagi dalam 9 sesi evaluasi harian untuk mengukur pemahaman rutin.
                </p>
              </div>
            </div>
            <div className="flex items-center text-xs font-bold text-indigo-700 gap-1 pt-2 border-t border-slate-100">
              <span>Lihat Kuis Harian</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: PROFIL PERUSAHAAN PT TIGA SERANGKAI PUSTAKA MANDIRI */}
      <div className="pt-6 space-y-6">
        <div className="border-b-2 border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-100 text-indigo-900 rounded-md font-extrabold text-[11px] uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Profil Perusahaan Penerbit</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              PT Tiga Serangkai Pustaka Mandiri
            </h2>
            <p className="text-xs text-slate-500">Penerbitan, Percetakan, & Distribusi Buku Pendidikan Nasional sejak 1958</p>
          </div>

          <a
            href="https://tigaserangkai.co.id/tentang-kami/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            <span>Kunjungi Website Resmi TS</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Publisher Profile Content (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
              {/* Official Headquarters Photo */}
              <div className="rounded-xl overflow-hidden border border-slate-200 relative group">
                <img
                  src={tsLobbyImage}
                  alt="Kantor Pusat PT Tiga Serangkai Solo"
                  className="w-full h-56 sm:h-64 object-cover"
                />
                <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-sm text-white">Gedung Utama Surakarta (Solo)</div>
                    <div className="text-xs text-slate-300">Jl. Dr. Supomo No. 23, Sriwedari, Laweyan, Surakarta, Jawa Tengah 57141</div>
                  </div>
                  <span className="px-3 py-1 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-md shrink-0 w-fit">
                    EST. 1958
                  </span>
                </div>
              </div>

              {/* Company History & Mission */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-2">
                  Sejarah & Komitmen PT Tiga Serangkai
                </h3>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                  <p>
                    PT Tiga Serangkai Pustaka Mandiri didirikan pada <b>28 September 1958</b> oleh sepasang suami istri pendidik, <b>Bapak H. Abdullah Marzuki</b> dan <b>Ibu Hj. Siti Aminah</b>, yang saat itu bertugas sebagai guru Sekolah Dasar di Wuryantoro, Wonogiri, Jawa Tengah.
                  </p>
                  <p>
                    Berawal dari itikad mulia menyusun lembar soal latihan sederhana untuk membantu murid-murid mereka belajar, stensilan sederhana tersebut berkembang pesat dan diminati oleh berbagai sekolah. Pada tanggal <b>1 Januari 1992</b>, Tiga Serangkai resmi berbadan hukum Perseroan Terbatas (PT) dan kini menjelma menjadi salah satu grup penerbitan serta percetakan buku pendidikan terbesar dan paling terpercaya di Indonesia.
                  </p>
                  <p>
                    Dengan sertifikasi manajemen mutu internasional <b>ISO 9001</b>, PT Tiga Serangkai Pustaka Mandiri terus berinovasi dalam menerbitkan buku pelajaran Kurikulum Nasional dari jenjang PAUD, SD, SMP, SMA/MA, SMK, hingga Perguruan Tinggi, serta menghadirkan materi pendamping berbasis ekosistem digital seperti <b>Think Smart English</b>.
                  </p>
                </div>
              </div>

              {/* Fact Sheet Grid */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-600" />
                  <span>Fakta Kunci & Legitimasi Penerbit</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <li className="flex items-center gap-2.5 bg-white p-2.5 rounded-lg border border-slate-200/80">
                    <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
                    <span><b>Tanggal Berdiri:</b> 28 September 1958</span>
                  </li>
                  <li className="flex items-center gap-2.5 bg-white p-2.5 rounded-lg border border-slate-200/80">
                    <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
                    <span><b>Status Hukum PT:</b> 1 Januari 1992</span>
                  </li>
                  <li className="flex items-center gap-2.5 bg-white p-2.5 rounded-lg border border-slate-200/80">
                    <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
                    <span><b>Kantor Pusat:</b> Surakarta (Solo), Jawa Tengah</span>
                  </li>
                  <li className="flex items-center gap-2.5 bg-white p-2.5 rounded-lg border border-slate-200/80">
                    <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></span>
                    <span><b>Standar Mutu:</b> Sertifikasi ISO 9001</span>
                  </li>
                </ul>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xl font-extrabold text-slate-900">1958</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Pendirian</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xl font-extrabold text-amber-700">65+ Thn</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Pengalaman</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xl font-extrabold text-indigo-700">1.000+</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Sekolah Mitra</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xl font-extrabold text-emerald-700">ISO 9001</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Sertifikasi</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Details (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#132A4A] text-white rounded-2xl p-6 shadow-2xs border border-slate-800 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
                  <Building2 className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">Layanan & Kontak Penerbit</h3>
                  <p className="text-[11px] text-amber-300">PT Tiga Serangkai Pustaka Mandiri</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <b className="text-white block">Kantor Pusat:</b>
                    <span>Jl. Dr. Supomo No. 23, Sriwedari, Laweyan, Surakarta 57141, Jawa Tengah</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <b className="text-white block">Call Center & Layanan Sekolah:</b>
                    <span>(0271) 714344</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <b className="text-white block">Website Resmi:</b>
                    <a
                      href="https://tigaserangkai.co.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>tigaserangkai.co.id</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Hak Cipta & Lisensi Resmi:</span>
                </div>
                <p className="text-slate-400">Seluruh materi, latihan tenses, dan bank soal diterbitkan secara resmi oleh PT Tiga Serangkai Pustaka Mandiri.</p>
              </div>
            </div>

            {/* Book Series Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Bookmark className="w-4 h-4 text-indigo-900" />
                <h3 className="font-extrabold text-sm text-slate-900">Seri Buku Teks SMA / MA Pendamping</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Seri <b>English for Critical Thinking</b> disesuaikan dengan capaian pembelajaran Kurikulum Merdeka.
              </p>

              <div className="space-y-2">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-slate-800">Critical Thinking 1</div>
                    <div className="text-[10px] text-slate-500">Kelas X SMA / MA</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-800 rounded-md">Kelas 10</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-slate-800">Critical Thinking 2</div>
                    <div className="text-[10px] text-slate-500">Kelas XI SMA / MA</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-800 rounded-md">Kelas 11</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-slate-800">Critical Thinking 3</div>
                    <div className="text-[10px] text-slate-500">Kelas XII SMA / MA (UTBK Focus)</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-800 rounded-md">Kelas 12</span>
                </div>
              </div>

              <a
                href="https://tigaserangkai.co.id/tentang-kami/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Pelajari Profil & Sejarah Resmi TS</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
