import { QuizQuestion } from '../../types';

// ==========================================
// TENSE 1: SIMPLE PRESENT TENSE (10 SOAL)
// ==========================================
export const SIMPLE_PRESENT_QUIZ: QuizQuestion[] = [
  {
    id: 'sp-1',
    question: 'The chemical reaction ______ rapidly whenever the temperature rises above 60°C, according to the lab manual.',
    options: ['occur', 'occurs', 'is occurring', 'occurred'],
    correctAnswerIndex: 1,
    correctAnswerText: 'occurs',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Simple Present Tense',
    explanation: 'Kebenaran ilmiah/fakta umum memakai Simple Present. Subjek tunggal "the chemical reaction" menuntut verb + -s menjadi "occurs".'
  },
  {
    id: 'sp-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'She rarely eat breakfast before her morning run.',
      'She rarely eats breakfast before her morning run.',
      'She rarely is eating breakfast before her morning run.',
      'She rarely ate breakfast before her morning run.'
    ],
    correctAnswerIndex: 1,
    correctAnswerText: 'She rarely eats breakfast before her morning run.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Simple Present Tense',
    explanation: '"Rarely" adalah signal frekuensi untuk Simple Present; subjek tunggal "she" membutuhkan verb + -s ("eats").'
  },
  {
    id: 'sp-3',
    question: 'My grandfather, who is a retired diplomat, (speak) ______ four languages fluently.',
    options: ['speaks', 'speak', 'is speaking', 'spoken'],
    correctAnswerIndex: 0,
    correctAnswerText: 'speaks',
    acceptableAnswers: ['speaks'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Simple Present Tense',
    explanation: 'Fakta permanen tentang kemampuan seseorang memakai Simple Present; subjek orang ketiga tunggal (my grandfather) -> speaks.'
  },
  {
    id: 'sp-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"The committee usually meet on the first Monday of every month to review policy changes."',
    options: [
      'Ganti "usually meet" menjadi "usually meets"',
      'Ganti "first Monday" menjadi "first Mondays"',
      'Ganti "to review" menjadi "for reviewing"',
      'Ganti "policy changes" menjadi "policies change"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'meet → meets ("The committee usually meets on the first Monday of every month...")',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Simple Present Tense',
    explanation: '"Committee" adalah collective noun yang bertindak sebagai satu kesatuan formal, sehingga memakai verb tunggal (+s): meets.'
  },
  {
    id: 'sp-5',
    question: 'Ubah ke bentuk pasif (Passive Voice):\n"The quality control team inspects every batch before shipment."',
    options: [
      'Every batch is inspected by the quality control team before shipment.',
      'Every batch was inspected by the quality control team before shipment.',
      'Every batch has been inspected by the quality control team before shipment.',
      'Every batch is inspecting by the quality control team before shipment.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Every batch is inspected by the quality control team before shipment.',
    questionType: 'passive',
    questionTypeLabel: 'Transformasi Kalimat (Aktif ke Pasif)',
    categoryTag: 'Simple Present Tense',
    explanation: 'Pola pasif Simple Present: Subject + is/am/are + Verb 3 ("is inspected").'
  },
  {
    id: 'sp-6',
    question: 'Ubah menjadi kalimat tanya (Interrogative):\n"The new policy affects all department heads equally."',
    options: [
      'Does the new policy affect all department heads equally?',
      'Does the new policy affects all department heads equally?',
      'Do the new policy affect all department heads equally?',
      'Did the new policy affect all department heads equally?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Does the new policy affect all department heads equally?',
    questionType: 'interrogative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Tanya)',
    categoryTag: 'Simple Present Tense',
    explanation: 'Kalimat tanya Simple Present verbal: Does/Do + S + V1 (bentuk dasar tanpa -s). Jadi gunakan "Does ... affect", bukan "affects".'
  },
  {
    id: 'sp-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nrarely / financial / analysts / market / predict / crashes / accurately',
    options: [
      'Financial analysts rarely predict market crashes accurately.',
      'Financial analysts predict rarely market crashes accurately.',
      'Rarely financial analysts predict accurately market crashes.',
      'Financial analysts rarely accurately predict market crashes.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Financial analysts rarely predict market crashes accurately.',
    scrambleWords: ['Financial', 'analysts', 'rarely', 'predict', 'market', 'crashes', 'accurately'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Simple Present Tense',
    explanation: 'Struktur: Subject (Financial analysts) + Adverb of frequency (rarely) + V1 (predict) + Object (market crashes) + Adverb of manner (accurately).'
  },
  {
    id: 'sp-8',
    question: 'Every fiscal year, the auditing department ______ (review) all expenditure reports before the March board meeting.',
    options: ['reviewed', 'reviews', 'is reviewing', 'has reviewed'],
    correctAnswerIndex: 1,
    correctAnswerText: 'reviews',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Simple Present Tense',
    explanation: '"Every fiscal year" menandakan kebiasaan/rutinitas terjadwal secara periodik -> Simple Present dengan subjek tunggal "the auditing department" (reviews).'
  },
  {
    id: 'sp-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Perusahaan itu jarang mengungkapkan strategi pemasarannya kepada publik."',
    options: [
      'The company rarely discloses its marketing strategy to the public.',
      'The company is rarely disclosing its marketing strategy to the public.',
      'The company rarely disclosed its marketing strategy to the public.',
      'The company discloses rarely its marketing strategy to the public.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The company rarely discloses its marketing strategy to the public.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Simple Present Tense',
    explanation: '"Jarang" (rarely) + fakta kebiasaan perusahaan (subjek tunggal "The company") -> verb + -s ("discloses") dalam Simple Present.'
  },
  {
    id: 'sp-10',
    question: 'Unless the supplier ______ (confirm) the delivery date by Friday, we will cancel the contract.',
    options: ['confirms', 'will confirm', 'confirmed', 'confirm'],
    correctAnswerIndex: 0,
    correctAnswerText: 'confirms',
    acceptableAnswers: ['confirms'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Simple Present Tense',
    explanation: 'Dalam klausa syarat (unless/if clause) yang merujuk pada masa depan (First Conditional), anak kalimat tetap wajib memakai Simple Present (confirms).'
  }
];

// ==========================================
// TENSE 2: PRESENT CONTINUOUS TENSE (10 SOAL)
// ==========================================
export const PRESENT_CONTINUOUS_QUIZ: QuizQuestion[] = [
  {
    id: 'pc-1',
    question: 'The negotiation team ______ the terms of the merger in the boardroom right now.',
    options: ['currently finalizes', 'is currently finalizing', 'has currently finalized', 'currently finalized'],
    correctAnswerIndex: 1,
    correctAnswerText: 'is currently finalizing',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Present Continuous Tense',
    explanation: '"Right now" menandakan tindakan sedang berlangsung saat ini -> is/are + V-ing ("is currently finalizing").'
  },
  {
    id: 'pc-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'The stock prices is rising sharply this week due to the merger announcement.',
      'The stock prices are rising sharply this week due to the merger announcement.',
      'The stock prices rise sharply this week due to the merger announcement.',
      'The stock prices rising sharply this week due to the merger announcement.'
    ],
    correctAnswerIndex: 1,
    correctAnswerText: 'The stock prices are rising sharply this week due to the merger announcement.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Present Continuous Tense',
    explanation: '"Stock prices" berbentuk jamak -> to be "are" + V-ing ("are rising"); "this week" menandakan tren sementara yang sedang berlangsung.'
  },
  {
    id: 'pc-3',
    question: 'Why (you/avoid) ______ eye contact during the interview? You seem nervous.',
    options: ['are you avoiding', 'do you avoid', 'you are avoiding', 'have you avoided'],
    correctAnswerIndex: 0,
    correctAnswerText: 'are you avoiding',
    acceptableAnswers: ['are you avoiding'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Present Continuous Tense',
    explanation: 'Kalimat tanya Present Continuous: Wh + am/is/are + S + V-ing ("Why are you avoiding..."), untuk tindakan yang sedang terjadi saat wawancara.'
  },
  {
    id: 'pc-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"She always is complaining about her workload, even though she volunteered for the project."',
    options: [
      'Ganti "always is complaining" menjadi "is always complaining"',
      'Ganti "complaining" menjadi "complain"',
      'Ganti "volunteered" menjadi "volunteering"',
      'Ganti "even though" menjadi "despite"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'always is → is always ("She is always complaining...")',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Present Continuous Tense',
    explanation: 'Adverb frekuensi seperti "always" (menunjukkan kebiasaan yang menjengkelkan dalam continuous) diletakkan setelah "to be", bukan sebelumnya.'
  },
  {
    id: 'pc-5',
    question: 'Ubah ke bentuk pasif (Passive Voice):\n"The engineers are currently testing the new prototype under extreme conditions."',
    options: [
      'The new prototype is currently being tested by the engineers under extreme conditions.',
      'The new prototype is currently tested by the engineers under extreme conditions.',
      'The new prototype has been tested by the engineers under extreme conditions.',
      'The new prototype was currently being tested by the engineers under extreme conditions.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The new prototype is currently being tested by the engineers under extreme conditions.',
    questionType: 'passive',
    questionTypeLabel: 'Transformasi Kalimat (Aktif ke Pasif)',
    categoryTag: 'Present Continuous Tense',
    explanation: 'Pola pasif Present Continuous: S + is/are + being + Verb 3 ("is currently being tested").'
  },
  {
    id: 'pc-6',
    question: 'Ubah menjadi kalimat negatif (Negative Form):\n"The technicians are currently upgrading the server system."',
    options: [
      'The technicians are not currently upgrading the server system.',
      'The technicians do not currently upgrade the server system.',
      'The technicians have not currently upgraded the server system.',
      'The technicians were not currently upgrading the server system.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The technicians are not (aren\'t) currently upgrading the server system.',
    questionType: 'negative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Negatif)',
    categoryTag: 'Present Continuous Tense',
    explanation: 'Bentuk negatif Present Continuous: S + am/is/are + not + V-ing ("are not currently upgrading").'
  },
  {
    id: 'pc-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\ngetting / increasingly / competitive / the / market / global / is',
    options: [
      'The global market is getting increasingly competitive.',
      'The global market getting is increasingly competitive.',
      'The market global is getting increasingly competitive.',
      'Increasingly competitive is the global market getting.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The global market is getting increasingly competitive.',
    scrambleWords: ['The', 'global', 'market', 'is', 'getting', 'increasingly', 'competitive'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Present Continuous Tense',
    explanation: 'Struktur Present Continuous untuk tren yang berkembang: Subject (The global market) + is + V-ing (getting) + Adverb (increasingly) + Adjective (competitive).'
  },
  {
    id: 'pc-8',
    question: 'Look! The building ______ — everyone needs to evacuate immediately!',
    options: ['collapses', 'is collapsing', 'has collapsed', 'collapsed'],
    correctAnswerIndex: 1,
    correctAnswerText: 'is collapsing',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Present Continuous Tense',
    explanation: '"Look!" adalah signal seruan klasik yang mengindikasikan tindakan sedang berlangsung saat ini juga di depan mata -> "is collapsing".'
  },
  {
    id: 'pc-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Pemerintah sedang mempertimbangkan kebijakan pajak baru untuk sektor teknologi."',
    options: [
      'The government is currently considering a new tax policy for the technology sector.',
      'The government currently considers a new tax policy for the technology sector.',
      'The government has considered a new tax policy for the technology sector.',
      'The government was currently considering a new tax policy for the technology sector.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The government is currently considering a new tax policy for the technology sector.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Present Continuous Tense',
    explanation: '"Sedang mempertimbangkan" = tindakan yang berlangsung saat ini -> to be is + considering ("is currently considering").'
  },
  {
    id: 'pc-10',
    question: 'While the lawyers ______ (draft) the contract, the clients are waiting anxiously in the lobby.',
    options: ['are drafting', 'draft', 'have drafted', 'were drafting'],
    correctAnswerIndex: 0,
    correctAnswerText: 'are drafting',
    acceptableAnswers: ['are drafting'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Present Continuous Tense',
    explanation: '"While" menghubungkan dua aksi paralel yang sedang berlangsung secara bersamaan di masa kini (are drafting & are waiting).'
  }
];

// ==========================================
// TENSE 3: PRESENT PERFECT TENSE (10 SOAL)
// ==========================================
export const PRESENT_PERFECT_QUIZ: QuizQuestion[] = [
  {
    id: 'pp-1',
    question: 'The research team ______ three papers on this topic since January.',
    options: ['already published', 'has already published', 'is already publishing', 'already publishes'],
    correctAnswerIndex: 1,
    correctAnswerText: 'has already published',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Present Perfect Tense',
    explanation: '"Since January" + "already" menunjukkan hasil tindakan dari masa lalu yang relevan hingga sekarang -> Present Perfect ("has already published").'
  },
  {
    id: 'pp-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'Have you ever visit a country where you didn\'t speak the language?',
      'Have you ever visited a country where you didn\'t speak the language?',
      'Did you ever visited a country where you didn\'t speak the language?',
      'You have ever visited a country where you didn\'t speak the language?'
    ],
    correctAnswerIndex: 1,
    correctAnswerText: 'Have you ever visited a country where you didn\'t speak the language?',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Present Perfect Tense',
    explanation: 'Kalimat tanya pengalaman hidup (Present Perfect): Have/Has + S + ever + V3 ("Have you ever visited...?").'
  },
  {
    id: 'pp-3',
    question: 'The price of crude oil (rise/not) ______ significantly for two years.',
    options: ['has not risen', 'have not risen', 'did not rise', 'is not rising'],
    correctAnswerIndex: 0,
    correctAnswerText: 'has not risen (hasn\'t risen)',
    acceptableAnswers: ['has not risen', "hasn't risen", 'has not risen.'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Present Perfect Tense',
    explanation: '"For two years" menunjukkan durasi hingga sekarang; subjek tunggal "The price of crude oil" + negasi -> has not risen.'
  },
  {
    id: 'pp-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"I have seen that movie yesterday, so let\'s watch something else tonight."',
    options: [
      'Ganti "have seen" menjadi "saw"',
      'Ganti "yesterday" menjadi "since yesterday"',
      'Ganti "let\'s watch" menjadi "let\'s have watched"',
      'Ganti "something else" menjadi "other thing"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: '"I have seen...yesterday" → "I saw that movie yesterday"',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Present Perfect Tense',
    explanation: 'Present Perfect tidak boleh digunakan bersama keterangan waktu lampau spesifik seperti "yesterday". Kalimat harus menggunakan Simple Past ("I saw").'
  },
  {
    id: 'pp-5',
    question: 'Ubah ke bentuk pasif (Passive Voice):\n"The auditors have identified several discrepancies in the financial records."',
    options: [
      'Several discrepancies have been identified by the auditors in the financial records.',
      'Several discrepancies has been identified by the auditors in the financial records.',
      'Several discrepancies were identified by the auditors in the financial records.',
      'Several discrepancies are identified by the auditors in the financial records.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Several discrepancies have been identified by the auditors in the financial records.',
    questionType: 'passive',
    questionTypeLabel: 'Transformasi Kalimat (Aktif ke Pasif)',
    categoryTag: 'Present Perfect Tense',
    explanation: 'Pola pasif Present Perfect: Subject (jamak: Several discrepancies) + have + been + Verb 3 ("have been identified").'
  },
  {
    id: 'pp-6',
    question: 'Ubah menjadi kalimat negatif (Negative Form):\n"The company has met all regulatory requirements this year."',
    options: [
      'The company has not met all regulatory requirements this year.',
      'The company did not meet all regulatory requirements this year.',
      'The company is not meeting all regulatory requirements this year.',
      'The company does not meet all regulatory requirements this year.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The company has not (hasn\'t) met all regulatory requirements this year.',
    questionType: 'negative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Negatif)',
    categoryTag: 'Present Perfect Tense',
    explanation: 'Bentuk negatif Present Perfect: S + have/has + not + Verb 3 ("has not met").'
  },
  {
    id: 'pp-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nsince / prices / risen / consistently / have / January / housing',
    options: [
      'Housing prices have risen consistently since January.',
      'Housing prices risen have consistently since January.',
      'Since January housing prices risen have consistently.',
      'Housing prices have consistently since January risen.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Housing prices have risen consistently since January.',
    scrambleWords: ['Housing', 'prices', 'have', 'risen', 'consistently', 'since', 'January'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Present Perfect Tense',
    explanation: '"Since + titik waktu lampau" (since January) adalah penanda Present Perfect. Struktur: S (Housing prices) + have + V3 (risen) + Adverb (consistently) + time signal.'
  },
  {
    id: 'pp-8',
    question: 'This is the first time I ______ an international conference of this scale.',
    options: ['attend', 'attended', 'have attended', 'am attending'],
    correctAnswerIndex: 2,
    correctAnswerText: 'have attended',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Present Perfect Tense',
    explanation: 'Pola baku "This is the first/second time + S + have/has + V3" adalah ungkapan idiomatik khas Present Perfect ("have attended").'
  },
  {
    id: 'pp-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Mereka belum menyelesaikan laporan tahunan itu meskipun tenggat waktunya sudah lewat."',
    options: [
      'They have not finished the annual report yet, even though the deadline has passed.',
      'They did not finish the annual report yet, even though the deadline passed.',
      'They do not finish the annual report yet, even though the deadline has passed.',
      'They had not finished the annual report yet, even though the deadline was passed.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'They have not (haven\'t) finished the annual report yet, even though the deadline has passed.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Present Perfect Tense',
    explanation: '"Belum" (yet) menunjukkan tindakan yang diharapkan namun belum selesai hingga kini -> Present Perfect negatif ("have not finished ... yet").'
  },
  {
    id: 'pp-10',
    question: 'Scientists ______ (not/find) a definitive cure for the disease despite decades of research.',
    options: ['have not found', 'did not find', 'had not found', 'are not finding'],
    correctAnswerIndex: 0,
    correctAnswerText: 'have not found (haven\'t found)',
    acceptableAnswers: ['have not found', "haven't found"],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Present Perfect Tense',
    explanation: '"Despite decades of research" menekankan usaha dari masa lalu yang berlanjut hingga detik ini tanpa hasil pasti -> Present Perfect negatif ("have not found").'
  }
];

// ==========================================
// TENSE 4: PRESENT PERFECT CONTINUOUS (10 SOAL)
// ==========================================
export const PRESENT_PERFECT_CONTINUOUS_QUIZ: QuizQuestion[] = [
  {
    id: 'ppc-1',
    question: 'The negotiators ______ the merger terms for over six hours without a break.',
    options: ['discuss', 'have been discussing', 'discussed', 'are discussing'],
    correctAnswerIndex: 1,
    correctAnswerText: 'have been discussing',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Present Perfect Continuous Tense',
    explanation: '"For over six hours" + tindakan berkelanjutan yang masih berlangsung hingga saat ini -> Present Perfect Continuous ("have been discussing").'
  },
  {
    id: 'ppc-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'How long has she been working on this thesis?',
      'How long she has been working on this thesis?',
      'How long does she working on this thesis?',
      'How long has she working on this thesis?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'How long has she been working on this thesis?',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Present Perfect Continuous Tense',
    explanation: 'Susunan kalimat tanya: Question Word (How long) + have/has + Subject + been + Verb-ing?'
  },
  {
    id: 'ppc-3',
    question: 'My eyes are red because I (stare) ______ at the computer screen since dawn.',
    options: ['have been staring', 'am staring', 'was staring', 'had stared'],
    correctAnswerIndex: 0,
    correctAnswerText: 'have been staring',
    acceptableAnswers: ['have been staring'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Present Perfect Continuous Tense',
    explanation: '"Since dawn" + efek fisik yang tampak sekarang (mata merah) -> Present Perfect Continuous ("have been staring").'
  },
  {
    id: 'ppc-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"It has been raining since three days, and the streets are flooded."',
    options: [
      'Ganti "since" menjadi "for"',
      'Ganti "has been raining" menjadi "is raining"',
      'Ganti "are flooded" menjadi "were flooded"',
      'Ganti "three days" menjadi "third days"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'since → for ("It has been raining for three days...")',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Present Perfect Continuous Tense',
    explanation: '"Since" digunakan untuk titik awal waktu (since Monday), sedangkan durasi/rentang waktu (three days) wajib menggunakan "for".'
  },
  {
    id: 'ppc-5',
    question: 'Ubah menjadi kalimat negatif (Negative Form):\n"The factory has been operating at full capacity all month."',
    options: [
      'The factory has not been operating at full capacity all month.',
      'The factory is not operating at full capacity all month.',
      'The factory did not operate at full capacity all month.',
      'The factory had not been operating at full capacity all month.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The factory has not (hasn\'t) been operating at full capacity all month.',
    questionType: 'negative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Negatif)',
    categoryTag: 'Present Perfect Continuous Tense',
    explanation: 'Bentuk negatif: S + have/has + not + been + Verb-ing ("has not been operating").'
  },
  {
    id: 'ppc-6',
    question: 'Ubah menjadi kalimat tanya (Interrogative):\n"The activists have been protesting outside the parliament building since dawn."',
    options: [
      'Have the activists been protesting outside the parliament building since dawn?',
      'Have the activists protesting outside the parliament building since dawn?',
      'Are the activists been protesting outside the parliament building since dawn?',
      'Did the activists have been protesting outside the parliament building since dawn?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Have the activists been protesting outside the parliament building since dawn?',
    questionType: 'interrogative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Tanya)',
    categoryTag: 'Present Perfect Continuous Tense',
    explanation: 'Struktur kalimat tanya: Have/Has + Subject + been + Verb-ing ("Have the activists been protesting...?").'
  },
  {
    id: 'ppc-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nbeen / has / weeks / feeling / for / exhausted / two / she',
    options: [
      'She has been feeling exhausted for two weeks.',
      'She has been exhausted feeling for two weeks.',
      'She has feeling been exhausted for two weeks.',
      'For two weeks she has feeling been exhausted.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'She has been feeling exhausted for two weeks.',
    scrambleWords: ['She', 'has', 'been', 'feeling', 'exhausted', 'for', 'two', 'weeks'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Present Perfect Continuous Tense',
    explanation: 'Pola: Subject (She) + has + been + V-ing (feeling) + Adjective (exhausted) + duration (for two weeks).'
  },
  {
    id: 'ppc-8',
    question: 'You look exhausted — ______ all night on this proposal?',
    options: ['do you work', 'have you been working', 'are you working', 'did you work'],
    correctAnswerIndex: 1,
    correctAnswerText: 'have you been working',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Present Perfect Continuous Tense',
    explanation: 'Konteks tampilan lelah saat ini akibat aktivitas berkelanjutan sepanjang malam -> Present Perfect Continuous ("have you been working").'
  },
  {
    id: 'ppc-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Perusahaan itu sudah kehilangan pelanggan selama beberapa bulan terakhir karena keluhan yang tidak ditangani."',
    options: [
      'The company has been losing customers for the past few months because of unaddressed complaints.',
      'The company lost customers for the past few months because of unaddressed complaints.',
      'The company is losing customers for the past few months because of unaddressed complaints.',
      'The company had been losing customers for the past few months because of unaddressed complaints.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The company has been losing customers for the past few months because of unaddressed complaints.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Present Perfect Continuous Tense',
    explanation: '"Selama beberapa bulan terakhir" (for the past few months) = durasi berkelanjutan yang berdampak pada kondisi sekarang -> "has been losing".'
  },
  {
    id: 'ppc-10',
    question: 'Even though the researchers ______ (investigate) the phenomenon for a decade, they still haven\'t reached a consensus.',
    options: ['have been investigating', 'are investigating', 'investigated', 'had investigated'],
    correctAnswerIndex: 0,
    correctAnswerText: 'have been investigating',
    acceptableAnswers: ['have been investigating'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Present Perfect Continuous Tense',
    explanation: '"Even though" + durasi panjang ("for a decade") menegaskan proses berkelanjutan yang hingga kini belum tuntas -> "have been investigating".'
  }
];
