import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Crown, Scroll, Sparkles, CheckCircle2 } from 'lucide-react';

interface MedievalGrammarGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedievalGrammarGuide: React.FC<MedievalGrammarGuideProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-gradient-to-br from-[#FFFDF8] via-[#FAF4E8] to-[#F3E7D4] border border-[#DEC49C] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-amber-900/15 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-600/20 border border-amber-600/30 flex items-center justify-center text-amber-900 shadow-inner">
                <Crown className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <h3 className="text-lg font-black text-amber-950 font-serif">
                  Buku Panduan Tata Bahasa Abad Pertengahan
                </h3>
                <p className="text-xs text-amber-900/80 font-medium">
                  Aturan penggunaan kata ganti & konjugasi kata kerja Medieval & Early Modern English.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-amber-900 hover:bg-amber-200/50 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section 1: Pronouns Table */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <Scroll className="w-4 h-4 text-amber-700" />
              <span>1. Sistem Kata Ganti Orang Kedua (Thou, Thee, Thy, Thine)</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-amber-900/15 bg-white/90">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-amber-100/70 border-b border-amber-900/15 text-amber-950 font-bold">
                    <th className="p-3">Bentuk Arkais</th>
                    <th className="p-3">Fungsi Tata Bahasa</th>
                    <th className="p-3">Padanan Modern</th>
                    <th className="p-3">Contoh Penggunaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/10 text-slate-800 font-medium">
                  <tr>
                    <td className="p-3 font-bold font-serif text-amber-950 text-sm">Thou</td>
                    <td className="p-3">Subjek (Orang ke-2 Tunggal)</td>
                    <td className="p-3">You (Subject)</td>
                    <td className="p-3 italic">How art <b>thou</b> this day?</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold font-serif text-amber-950 text-sm">Thee</td>
                    <td className="p-3">Objek (Orang ke-2 Tunggal)</td>
                    <td className="p-3">You (Object)</td>
                    <td className="p-3 italic">I loveth <b>thee</b></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold font-serif text-amber-950 text-sm">Thy</td>
                    <td className="p-3">Kepemilikan (Possessive Adj)</td>
                    <td className="p-3">Your</td>
                    <td className="p-3 italic">May <b>thy</b> day be filled...</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold font-serif text-amber-950 text-sm">Thine</td>
                    <td className="p-3">Sebelum vokal / Kata Ganti Milik</td>
                    <td className="p-3">Yours / Your (+ vowel)</td>
                    <td className="p-3 italic">To <b>thine</b> own self be true</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Verb Endings */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>2. Akhiran Kata Kerja Klasik (-est dan -eth)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-white/90 rounded-2xl border border-amber-900/15 space-y-1.5">
                <div className="font-bold text-amber-950 text-sm font-serif">Akhiran "-est" / "-st"</div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Digunakan untuk kata kerja dengan subjek <b>thou</b> (kamu).
                </p>
                <div className="p-2 bg-amber-50 rounded-xl text-[11px] font-mono text-amber-900 border border-amber-200">
                  thou go<b>est</b> (kamu pergi)<br />
                  thou wil<b>t</b> (kamu akan)<br />
                  thou ar<b>t</b> (kamu adalah)
                </div>
              </div>

              <div className="p-4 bg-white/90 rounded-2xl border border-amber-900/15 space-y-1.5">
                <div className="font-bold text-amber-950 text-sm font-serif">Akhiran "-eth" / "-th"</div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Digunakan dalam puisi atau orang ketiga (he/she/it) setara akhiran "-s".
                </p>
                <div className="p-2 bg-amber-50 rounded-xl text-[11px] font-mono text-amber-900 border border-amber-200">
                  I lov<b>eth</b> thee (Aku mencintaimu)<br />
                  he say<b>eth</b> (ia berkata)<br />
                  it com<b>eth</b> (itu datang)
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Essential Interjections */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>3. Kosakata & Ungkapan Khas (Archaic Vocabulary Glossary)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-white/90 rounded-xl border border-amber-900/15">
                <b className="text-amber-950 font-serif font-bold text-sm">Prithee</b>
                <p className="text-slate-600 mt-0.5 leading-snug">
                  Singkatan dari "I pray thee". Artinya <i>"Tolong / Mohon / Please"</i>.
                </p>
              </div>

              <div className="p-3 bg-white/90 rounded-xl border border-amber-900/15">
                <b className="text-amber-950 font-serif font-bold text-sm">Gramercy</b>
                <p className="text-slate-600 mt-0.5 leading-snug">
                  Berasal dari "Grand Merci". Artinya <i>"Terima kasih banyak"</i>.
                </p>
              </div>

              <div className="p-3 bg-white/90 rounded-xl border border-amber-900/15">
                <b className="text-amber-950 font-serif font-bold text-sm">Verily</b>
                <p className="text-slate-600 mt-0.5 leading-snug">
                  Artinya <i>"Sungguh / Sesungguhnya / Truly"</i>.
                </p>
              </div>

              <div className="p-3 bg-white/90 rounded-xl border border-amber-900/15">
                <b className="text-amber-950 font-serif font-bold text-sm">Anon</b>
                <p className="text-slate-600 mt-0.5 leading-snug">
                  Artinya <i>"Segera / Sebentar lagi / Soon"</i>.
                </p>
              </div>

              <div className="p-3 bg-white/90 rounded-xl border border-amber-900/15">
                <b className="text-amber-950 font-serif font-bold text-sm">Good Morrow</b>
                <p className="text-slate-600 mt-0.5 leading-snug">
                  Artinya <i>"Selamat Pagi / Good morning"</i>.
                </p>
              </div>

              <div className="p-3 bg-white/90 rounded-xl border border-amber-900/15">
                <b className="text-amber-950 font-serif font-bold text-sm">Fare Thee Well</b>
                <p className="text-slate-600 mt-0.5 leading-snug">
                  Artinya <i>"Selamat tinggal / Jaga dirimu baik-baik"</i>.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Tutup Panduan & Lanjut Belajar
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
