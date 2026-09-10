import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle, AlertCircle, Lightbulb, PenTool, Save, Check } from 'lucide-react';
import { GrammarCheckResult, WritingFeedbackResult } from '../types';

interface AiToolsViewProps {
  userClassGrade: 'X' | 'XI' | 'XII';
}

const STORAGE_KEY = 'ts_ai_tools_state';

export const AiToolsView: React.FC<AiToolsViewProps> = ({ userClassGrade }) => {
  // Restore saved state from localStorage if available
  const savedData = (() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  })();

  const [activeSubTab, setActiveTab] = useState<'grammar' | 'essay'>(
    savedData?.activeSubTab || 'grammar'
  );

  // Grammar States
  const [grammarInput, setGrammarInput] = useState<string>(savedData?.grammarInput || '');
  const [grammarLoading, setGrammarLoading] = useState(false);
  const [grammarResult, setGrammarResult] = useState<GrammarCheckResult | null>(
    savedData?.grammarResult || null
  );

  // Essay States
  const [essayTopic, setEssayTopic] = useState<string>(savedData?.essayTopic || '');
  const [essayText, setEssayText] = useState<string>(savedData?.essayText || '');
  const [essayLoading, setEssayLoading] = useState(false);
  const [essayResult, setEssayResult] = useState<WritingFeedbackResult | null>(
    savedData?.essayResult || null
  );

  const [lastSavedTime, setLastSavedTime] = useState<string | null>(
    savedData?.lastSavedTime || null
  );

  // Autosave whenever inputs, results or active tab changes
  useEffect(() => {
    const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const payload = {
      activeSubTab,
      grammarInput,
      grammarResult,
      essayTopic,
      essayText,
      essayResult,
      lastSavedTime: now
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setLastSavedTime(now);
    } catch (e) {
      console.error('Failed to autosave AI Tools state:', e);
    }
  }, [activeSubTab, grammarInput, grammarResult, essayTopic, essayText, essayResult]);

  // Handle Grammar Check
  const handleCheckGrammar = async () => {
    if (!grammarInput.trim()) return;
    setGrammarLoading(true);
    try {
      const res = await fetch('/api/ai/grammar-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: grammarInput, level: userClassGrade })
      });
      const data = await res.json();
      if (data.fallback) {
        setGrammarResult(data.fallback);
      } else {
        setGrammarResult(data);
      }
    } catch (e) {
      console.error(e);
      setGrammarResult({
        correctedText: grammarInput,
        isCorrect: false,
        grammarExplanation: 'Terjadi kesalahan sistem AI. Pastikan koneksi berjalan baik.',
        academicVocabularyTips: ['Periksa susunan tenses dan kata kerja utama.']
      });
    } finally {
      setGrammarLoading(false);
    }
  };

  // Handle Essay Evaluation
  const handleEvaluateEssay = async () => {
    if (!essayText.trim()) return;
    setEssayLoading(true);
    try {
      const res = await fetch('/api/ai/writing-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: essayTopic || 'High School Essay', essay: essayText, level: userClassGrade })
      });
      const data = await res.json();
      setEssayResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setEssayLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" /> AI Academic Assistant
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
              <Save className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Autosave Aktif {lastSavedTime ? `(${lastSavedTime})` : ''}</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Pemeriksa Tata Bahasa & Reviewer Esai AI
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Gunakan kekuatan Gemini AI untuk memeriksa tata bahasa, memperhalus kosa kata akademik, dan mendapatkan penilaian esai berstandar sekolah dan ujian masuk perguruan tinggi.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('grammar')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 ${
            activeSubTab === 'grammar'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          1. Grammar & Vocabulary Checker
        </button>
        <button
          onClick={() => setActiveTab('essay')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 ${
            activeSubTab === 'essay'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          2. Penilaian Esai & Reviewer Akademik
        </button>
      </div>

      {/* SubTab 1: Grammar & Vocabulary Checker */}
      {activeSubTab === 'grammar' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Masukkan Teks / Kalimat Anda:</h3>
            <textarea
              rows={6}
              value={grammarInput}
              onChange={(e) => setGrammarInput(e.target.value)}
              placeholder="Contoh: She do not knows that the university offer scholarship every year..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            />
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-400 font-medium">
                {grammarInput.length} karakter
              </span>
              <button
                onClick={handleCheckGrammar}
                disabled={grammarLoading || !grammarInput.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all disabled:opacity-50 flex items-center gap-2 shadow-xs cursor-pointer"
              >
                {grammarLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menganalisis...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Periksa Tata Bahasa</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Grammar Result Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">Hasil Analisis Akademik AI</h3>
            {!grammarResult ? (
              <div className="py-12 text-center text-slate-400 text-xs font-medium space-y-2">
                <Sparkles className="w-8 h-8 mx-auto text-slate-300 animate-pulse" />
                <p>Ketik kalimat Anda di sebelah kiri dan klik tombol periksa.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-xl border ${
                    grammarResult.isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="text-xs font-extrabold uppercase tracking-wider mb-1 flex items-center gap-2">
                    {grammarResult.isCorrect ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Kalimat Sudah Tepat</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Revisi Direkomendasikan</span>
                      </>
                    )}
                  </div>
                  <div className="font-semibold text-xs mt-2 p-2.5 bg-white rounded-lg border border-black/5">
                    "{grammarResult.correctedText}"
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>Penjelasan Tata Bahasa (Grammar Rule)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {grammarResult.grammarExplanation}
                  </p>
                </div>

                {grammarResult.academicVocabularyTips && grammarResult.academicVocabularyTips.length > 0 && (
                  <div className="p-4 bg-indigo-50/50 border border-indigo-200/60 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-indigo-700">Tips Kosakata Akademik (Formal Style)</div>
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                      {grammarResult.academicVocabularyTips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SubTab 2: Essay Evaluation */}
      {activeSubTab === 'essay' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul / Topik Esai (Opsional)</label>
              <input
                type="text"
                value={essayTopic}
                onChange={(e) => setEssayTopic(e.target.value)}
                placeholder="Contoh: The Impact of Renewable Energy in Indonesia"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teks Esai / Paragraf Anda:</label>
              <textarea
                rows={10}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Tuliskan draf esai Bahasa Inggris Anda di sini..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
            <button
              onClick={handleEvaluateEssay}
              disabled={essayLoading || !essayText.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-xs transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              {essayLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menilai Esai dengan AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Evaluasi Esai Secara Akademik</span>
                </>
              )}
            </button>
          </div>

          {/* Essay Evaluation Results */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">Laporan Nilai & Masukan AI</h3>
            {!essayResult ? (
              <div className="py-16 text-center text-slate-400 text-xs font-medium space-y-2">
                <PenTool className="w-8 h-8 mx-auto text-slate-300" />
                <p>Masukkan esai Anda dan dapatkan analisis komprehensif.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-xl border border-slate-800">
                  <div>
                    <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Skor Keseluruhan</span>
                    <span className="text-2xl font-black">{essayResult.score} / 100</span>
                  </div>
                  <div className="flex gap-3 text-center text-xs">
                    <div className="bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700">
                      <div className="text-slate-400 font-medium text-[10px]">Grammar</div>
                      <div className="font-bold text-white">{essayResult.grammarScore}</div>
                    </div>
                    <div className="bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700">
                      <div className="text-slate-400 font-medium text-[10px]">Vocabulary</div>
                      <div className="font-bold text-white">{essayResult.vocabularyScore}</div>
                    </div>
                    <div className="bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700">
                      <div className="text-slate-400 font-medium text-[10px]">Coherence</div>
                      <div className="font-bold text-white">{essayResult.coherenceScore}</div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed font-medium">
                  {essayResult.summaryFeedback}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="text-[11px] font-bold text-emerald-900 mb-1">Kelebihan Esai:</div>
                    <ul className="list-disc list-inside text-[11px] text-emerald-800 space-y-1">
                      {essayResult.strengths?.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="text-[11px] font-bold text-amber-900 mb-1">Area Perbaikan:</div>
                    <ul className="list-disc list-inside text-[11px] text-amber-800 space-y-1">
                      {essayResult.improvements?.map((imp, i) => (
                        <li key={i}>{imp}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {essayResult.academicRewrite && (
                  <div className="p-3.5 bg-indigo-50/50 border border-indigo-200 rounded-xl space-y-1.5">
                    <div className="text-xs font-bold text-indigo-700">Versi Revisi Akademik AI:</div>
                    <p className="text-xs text-slate-700 italic leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                      "{essayResult.academicRewrite}"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
