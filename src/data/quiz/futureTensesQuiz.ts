import { QuizQuestion } from '../../types';

// ==========================================
// TENSE 9: SIMPLE FUTURE TENSE (10 SOAL)
// ==========================================
export const SIMPLE_FUTURE_QUIZ: QuizQuestion[] = [
  {
    id: 'sf-1',
    question: 'The board ______ the final decision regarding the merger next Friday.',
    options: ['announces', 'will announce', 'is announcing', 'has announced'],
    correctAnswerIndex: 1,
    correctAnswerText: 'will announce',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Simple Future Tense',
    explanation: '"Next Friday" adalah penanda waktu masa depan yang definit -> Simple Future dengan modal "will announce".'
  },
  {
    id: 'sf-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'I think it will rains later this evening.',
      'I think it will rain later this evening.',
      'I think it will raining later this evening.',
      'I think it is will rain later this evening.'
    ],
    correctAnswerIndex: 1,
    correctAnswerText: 'I think it will rain later this evening.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Simple Future Tense',
    explanation: 'Setelah modal auxiliary "will", kata kerja selalu berupa bare infinitive / Verb 1 bentuk dasar tanpa imbuhan apapun ("will rain").'
  },
  {
    id: 'sf-3',
    question: 'If the funding comes through, the organization (expand) ______ its operations to three new countries.',
    options: ['will expand', 'expands', 'expanded', 'would expand'],
    correctAnswerIndex: 0,
    correctAnswerText: 'will expand',
    acceptableAnswers: ['will expand'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Simple Future Tense',
    explanation: 'Klausa hasil pada Conditional Sentence Type 1 (If + Simple Present, S + will + V1) menggunakan "will expand".'
  },
  {
    id: 'sf-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"The committee will deciding on the budget allocation by the end of the week."',
    options: [
      'Ganti "will deciding" menjadi "will decide"',
      'Ganti "budget allocation" menjadi "budgets allocations"',
      'Ganti "by the end" menjadi "in the end"',
      'Ganti "of the week" menjadi "for the week"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'will deciding → will decide',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Simple Future Tense',
    explanation: 'Modal "will" harus diikuti oleh Verb 1 ("will decide"), bukan Verb-ing tanpa auxiliary "be".'
  },
  {
    id: 'sf-5',
    question: 'Ubah ke bentuk pasif (Passive Voice):\n"The government will implement new environmental regulations next year."',
    options: [
      'New environmental regulations will be implemented by the government next year.',
      'New environmental regulations will implemented by the government next year.',
      'New environmental regulations will have implemented by the government next year.',
      'New environmental regulations are implemented by the government next year.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'New environmental regulations will be implemented by the government next year.',
    questionType: 'passive',
    questionTypeLabel: 'Transformasi Kalimat (Aktif ke Pasif)',
    categoryTag: 'Simple Future Tense',
    explanation: 'Pola pasif Simple Future: Subject + will + be + Verb 3 ("will be implemented").'
  },
  {
    id: 'sf-6',
    question: 'Ubah menjadi kalimat tanya (Interrogative):\n"The new policy will affect thousands of small businesses."',
    options: [
      'Will the new policy affect thousands of small businesses?',
      'Will the new policy affects thousands of small businesses?',
      'Does the new policy will affect thousands of small businesses?',
      'Will affect the new policy thousands of small businesses?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Will the new policy affect thousands of small businesses?',
    questionType: 'interrogative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Tanya)',
    categoryTag: 'Simple Future Tense',
    explanation: 'Kalimat tanya Simple Future: Will + Subject + Verb 1 ("Will the new policy affect...?").'
  },
  {
    id: 'sf-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nentirely / renewable / energy / on / run / will / the / city / 2040 / by',
    options: [
      'By 2040, the city will run entirely on renewable energy.',
      'The city will run on 2040 entirely renewable energy by.',
      'Renewable energy will run the city entirely on by 2040.',
      'By 2040 will run entirely the city on renewable energy.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'By 2040, the city will run entirely on renewable energy.',
    scrambleWords: ['By', '2040,', 'the', 'city', 'will', 'run', 'entirely', 'on', 'renewable', 'energy.'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Simple Future Tense',
    explanation: 'Struktur: Keterangan waktu (By 2040) + Subject (the city) + will + V1 (run) + Adverb (entirely) + Prepositional object (on renewable energy).'
  },
  {
    id: 'sf-8',
    question: 'According to the forecast, the storm ______ the coastal region within 48 hours.',
    options: ['hits', 'will hit', 'is hitting', 'has hit'],
    correctAnswerIndex: 1,
    correctAnswerText: 'will hit',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Simple Future Tense',
    explanation: 'Prakiraan/prediksi formal berbasis data untuk masa depan yang akan datang menggunakan modal "will" ("will hit").'
  },
  {
    id: 'sf-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Para ilmuwan memprediksi bahwa permukaan air laut akan naik secara signifikan pada akhir abad ini."',
    options: [
      'Scientists predict that sea levels will rise significantly by the end of this century.',
      'Scientists predict that sea levels will be rising significantly by the end of this century.',
      'Scientists predict that sea levels rise significantly by the end of this century.',
      'Scientists predict that sea levels would rise significantly by the end of this century.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Scientists predict that sea levels will rise significantly by the end of this century.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Simple Future Tense',
    explanation: 'Prediksi masa depan objektif: Subject + will + V1 ("will rise significantly").'
  },
  {
    id: 'sf-10',
    question: 'Unless drastic measures are taken now, the species ______ (become) extinct within the next decade.',
    options: ['will become', 'becomes', 'became', 'would become'],
    correctAnswerIndex: 0,
    correctAnswerText: 'will become',
    acceptableAnswers: ['will become'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Simple Future Tense',
    explanation: 'Klausa syarat negatif "unless" (Simple Present) berpasangan dengan konsekuensi masa depan pada klausa utama -> "will become".'
  }
];

// ==========================================
// TENSE 10: FUTURE CONTINUOUS TENSE (10 SOAL)
// ==========================================
export const FUTURE_CONTINUOUS_QUIZ: QuizQuestion[] = [
  {
    id: 'fc-1',
    question: 'This time next week, the delegates ______ the international summit in Geneva.',
    options: ['attend', 'will be attending', 'will have attended', 'are attending'],
    correctAnswerIndex: 1,
    correctAnswerText: 'will be attending',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Future Continuous Tense',
    explanation: '"This time next week" menunjukkan bahwa aksi akan sedang berlangsung pada waktu spesifik tersebut di masa depan -> "will be attending".'
  },
  {
    id: 'fc-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'By 9 p.m., I will studying for the exam.',
      'By 9 p.m., I will be study for the exam.',
      'At 9 p.m., I will be studying for the exam.',
      'At 9 p.m., I be studying for the exam.'
    ],
    correctAnswerIndex: 2,
    correctAnswerText: 'At 9 p.m., I will be studying for the exam.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Future Continuous Tense',
    explanation: 'Untuk titik waktu tepat (At 9 p.m.), gunakan pola Future Continuous: will + be + Verb-ing ("will be studying").'
  },
  {
    id: 'fc-3',
    question: 'While you are relaxing on the beach next month, I (still/work) ______ at the office.',
    options: ['will still be working', 'will still work', 'am still working', 'will have worked'],
    correctAnswerIndex: 0,
    correctAnswerText: 'will still be working',
    acceptableAnswers: ['will still be working'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Future Continuous Tense',
    explanation: 'Klausa perbandingan paralel masa depan ("while you are relaxing...") berpasangan dengan aksi berkelanjutan -> will still be working.'
  },
  {
    id: 'fc-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"This time tomorrow, we will flying over the Pacific Ocean."',
    options: [
      'Ganti "will flying" menjadi "will be flying"',
      'Ganti "This time tomorrow" menjadi "At this time tomorrow only"',
      'Ganti "flying over" menjadi "flying across on"',
      'Ganti "we" menjadi "us"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'will flying → will be flying',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Future Continuous Tense',
    explanation: 'Future Continuous wajib menyertakan auxiliary "be" setelah "will": will + be + Verb-ing.'
  },
  {
    id: 'fc-5',
    question: 'Ubah menjadi kalimat negatif (Negative Form):\n"The auditors will be reviewing the financial statements throughout next week."',
    options: [
      'The auditors will not be reviewing the financial statements throughout next week.',
      'The auditors will be not reviewing the financial statements throughout next week.',
      'The auditors do not will be reviewing the financial statements throughout next week.',
      'The auditors will not reviewing the financial statements throughout next week.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The auditors will not (won\'t) be reviewing the financial statements throughout next week.',
    questionType: 'negative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Negatif)',
    categoryTag: 'Future Continuous Tense',
    explanation: 'Bentuk negatif Future Continuous: Subject + will + not + be + Verb-ing ("will not be reviewing").'
  },
  {
    id: 'fc-6',
    question: 'Ubah menjadi kalimat tanya (Interrogative):\n"The president will be addressing the nation at 8 p.m. tonight."',
    options: [
      'Will the president be addressing the nation at 8 p.m. tonight?',
      'Will be the president addressing the nation at 8 p.m. tonight?',
      'Will the president address the nation at 8 p.m. tonight?',
      'Is the president will be addressing the nation at 8 p.m. tonight?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Will the president be addressing the nation at 8 p.m. tonight?',
    questionType: 'interrogative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Tanya)',
    categoryTag: 'Future Continuous Tense',
    explanation: 'Kalimat tanya Future Continuous: Will + Subject + be + Verb-ing ("Will the president be addressing...?").'
  },
  {
    id: 'fc-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nmidnight / working / still / by / be / will / team / the',
    options: [
      'The team will still be working by midnight.',
      'By midnight the team working still will be.',
      'The team will be still working by midnight.',
      'The team still will be working by midnight.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The team will still be working by midnight.',
    scrambleWords: ['The', 'team', 'will', 'still', 'be', 'working', 'by', 'midnight'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Future Continuous Tense',
    explanation: 'Struktur: Subject (The team) + will + (still) + be + Verb-ing (working) + time phrase (by midnight).'
  },
  {
    id: 'fc-8',
    question: 'Don\'t call me between 2 and 4 p.m. tomorrow — I ______ my thesis to the committee then.',
    options: ['present', 'will present', 'will be presenting', 'have presented'],
    correctAnswerIndex: 2,
    correctAnswerText: 'will be presenting',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Future Continuous Tense',
    explanation: 'Rentang waktu spesifik di masa depan ("between 2 and 4 p.m. tomorrow") di mana kegiatan sedang berjalan -> "will be presenting".'
  },
  {
    id: 'fc-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Pada saat kamu tiba di bandara besok, aku akan sedang menunggu di gerbang kedatangan."',
    options: [
      'By the time you arrive at the airport tomorrow, I will be waiting at the arrival gate.',
      'By the time you arrive at the airport tomorrow, I will wait at the arrival gate.',
      'When you will arrive at the airport tomorrow, I am waiting at the arrival gate.',
      'By the time you arrived at the airport tomorrow, I will have waited at the arrival gate.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'By the time you arrive at the airport tomorrow, I will be waiting at the arrival gate.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Future Continuous Tense',
    explanation: 'Tindakan yang sedang berlangsung pada saat titik peristiwa masa depan tercapai -> Future Continuous ("will be waiting").'
  },
  {
    id: 'fc-10',
    question: 'As the sun sets tonight, thousands of protesters ______ (still/gather) outside the parliament building.',
    options: ['will still be gathering', 'will still gather', 'are still gathering', 'gathered'],
    correctAnswerIndex: 0,
    correctAnswerText: 'will still be gathering',
    acceptableAnswers: ['will still be gathering'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Future Continuous Tense',
    explanation: 'Proses yang sedang berlangsung saat momen masa depan ("As the sun sets tonight...") -> "will still be gathering".'
  }
];

// ==========================================
// TENSE 11: FUTURE PERFECT TENSE (10 SOAL)
// ==========================================
export const FUTURE_PERFECT_QUIZ: QuizQuestion[] = [
  {
    id: 'fp-1',
    question: 'By the time the shareholders meet next month, the CFO ______ from her position.',
    options: ['already resigns', 'will have already resigned', 'has already resigned', 'already resigned'],
    correctAnswerIndex: 1,
    correctAnswerText: 'will have already resigned',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Future Perfect Tense',
    explanation: '"By the time" + klausa masa depan menunjukkan bahwa aksi pengunduran diri sudah selesai tuntas sebelum rapat terlaksana -> "will have already resigned".'
  },
  {
    id: 'fp-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'By 2030, researchers will have developed a cure for several genetic diseases.',
      'By 2030, researchers will has developed a cure for several genetic diseases.',
      'By 2030, researchers will have develop a cure for several genetic diseases.',
      'By 2030, researchers have will developed a cure for several genetic diseases.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'By 2030, researchers will have developed a cure for several genetic diseases.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Future Perfect Tense',
    explanation: 'Rumus baku Future Perfect: Subject + will + have (selalu "have" tanpa memandang subjek) + Verb 3 ("developed").'
  },
  {
    id: 'fp-3',
    question: 'By the end of this fiscal year, the company (spend) ______ over ten million dollars on research and development.',
    options: ['will have spent', 'will spend', 'has spent', 'will be spending'],
    correctAnswerIndex: 0,
    correctAnswerText: 'will have spent',
    acceptableAnswers: ['will have spent'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Future Perfect Tense',
    explanation: '"By the end of this fiscal year" adalah batas tenggat waktu masa depan untuk pencapaian yang tuntas -> will have spent.'
  },
  {
    id: 'fp-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"By next Monday, the construction team will finish the bridge."',
    options: [
      'Ganti "will finish" menjadi "will have finished"',
      'Ganti "By next Monday" menjadi "On next Monday"',
      'Ganti "the construction team" menjadi "the construct team"',
      'Ganti "the bridge" menjadi "a bridges"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'will finish → will have finished',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Future Perfect Tense',
    explanation: 'Preposisi "By + batas waktu masa depan" (By next Monday) mengindikasikan target yang rampung sebelum waktu tersebut, sehingga harus memakai Future Perfect ("will have finished").'
  },
  {
    id: 'fp-5',
    question: 'Ubah ke bentuk pasif (Passive Voice):\n"By 2025, engineers will have completed the tunnel project."',
    options: [
      'By 2025, the tunnel project will have been completed by engineers.',
      'By 2025, the tunnel project will have completed by engineers.',
      'By 2025, the tunnel project will be completed by engineers.',
      'By 2025, the tunnel project will been completed by engineers.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'By 2025, the tunnel project will have been completed by engineers.',
    questionType: 'passive',
    questionTypeLabel: 'Transformasi Kalimat (Aktif ke Pasif)',
    categoryTag: 'Future Perfect Tense',
    explanation: 'Pola pasif Future Perfect: S + will + have + been + Verb 3 ("will have been completed").'
  },
  {
    id: 'fp-6',
    question: 'Ubah menjadi kalimat tanya (Interrogative):\n"By the time you graduate, the university will have built a new science building."',
    options: [
      'Will the university have built a new science building by the time you graduate?',
      'Will have the university built a new science building by the time you graduate?',
      'Have the university will built a new science building by the time you graduate?',
      'Will the university built a new science building by the time you graduate?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Will the university have built a new science building by the time you graduate?',
    questionType: 'interrogative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Tanya)',
    categoryTag: 'Future Perfect Tense',
    explanation: 'Kalimat tanya Future Perfect: Will + Subject + have + Verb 3 ("Will the university have built...?").'
  },
  {
    id: 'fp-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nwill / decade / population / doubled / by / the / next / have / the / city\'s',
    options: [
      'The city\'s population will have doubled by the next decade.',
      'By the next decade will have doubled the city\'s population.',
      'The city\'s population will doubled have by the next decade.',
      'The next decade will have doubled the city\'s population by.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The city\'s population will have doubled by the next decade.',
    scrambleWords: ['The', 'city\'s', 'population', 'will', 'have', 'doubled', 'by', 'the', 'next', 'decade'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Future Perfect Tense',
    explanation: 'Struktur: Subject (The city\'s population) + will + have + V3 (doubled) + deadline phrase (by the next decade).'
  },
  {
    id: 'fp-8',
    question: 'Don\'t worry about the paperwork — by the time you arrive, my assistant ______ everything.',
    options: ['already prepares', 'will already prepare', 'will have already prepared', 'has already prepared'],
    correctAnswerIndex: 2,
    correctAnswerText: 'will have already prepared',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Future Perfect Tense',
    explanation: 'Kesiapan dokumen ditargetkan sudah selesai sebelum kedatangan tamu ("by the time you arrive") -> "will have already prepared".'
  },
  {
    id: 'fp-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Pada saat proyek ini selesai, kami akan sudah menginvestasikan lebih dari lima miliar rupiah."',
    options: [
      'By the time this project is completed, we will have invested more than five billion rupiah.',
      'By the time this project will complete, we will invest more than five billion rupiah.',
      'When this project is completing, we will have been investing more than five billion rupiah.',
      'By the time this project is completed, we have invested more than five billion rupiah.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'By the time this project is completed, we will have invested more than five billion rupiah.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Future Perfect Tense',
    explanation: '"Akan sudah menginvestasikan" sebelum proyek selesai -> Future Perfect ("will have invested").'
  },
  {
    id: 'fp-10',
    question: 'Assuming the current growth rate continues, the startup ______ (triple) its revenue by the end of next year.',
    options: ['will have tripled', 'will triple', 'triples', 'would have tripled'],
    correctAnswerIndex: 0,
    correctAnswerText: 'will have tripled',
    acceptableAnswers: ['will have tripled'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Future Perfect Tense',
    explanation: 'Proyeksi capaian kuantitatif sebelum batas waktu akhir tahun depan ("by the end of next year") -> "will have tripled".'
  }
];

// ==========================================
// TENSE 12: FUTURE PERFECT CONTINUOUS (10 SOAL)
// ==========================================
export const FUTURE_PERFECT_CONTINUOUS_QUIZ: QuizQuestion[] = [
  {
    id: 'fpc-1',
    question: 'By December, she ______ at this company for exactly ten years.',
    options: ['will work', 'will have worked', 'will have been working', 'has been working'],
    correctAnswerIndex: 2,
    correctAnswerText: 'will have been working',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Future Perfect Continuous Tense',
    explanation: 'Kombinasi batas waktu masa depan ("By December") + akumulasi durasi berkesinambungan ("for exactly ten years") -> Future Perfect Continuous ("will have been working").'
  },
  {
    id: 'fpc-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'By the time he retires, he will have been teaching for four decades.',
      'By the time he retires, he will been teaching for four decades.',
      'By the time he retires, he will has been teaching for four decades.',
      'By the time he retires, he will have teaching for four decades.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'By the time he retires, he will have been teaching for four decades.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Future Perfect Continuous Tense',
    explanation: 'Rumus lengkap: Subject + will + have + been + Verb-ing ("will have been teaching").'
  },
  {
    id: 'fpc-3',
    question: 'When the marathon ends, the volunteers (stand) ______ at the finish line for over twelve hours straight.',
    options: ['will have been standing', 'will stand', 'have been standing', 'will be standing'],
    correctAnswerIndex: 0,
    correctAnswerText: 'will have been standing',
    acceptableAnswers: ['will have been standing'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Future Perfect Continuous Tense',
    explanation: 'Durasi berdiri tanpa henti selama 12 jam yang terhitung saat maraton berakhir di masa depan -> will have been standing.'
  },
  {
    id: 'fpc-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"By next spring, the researchers will have collect data for five continuous years."',
    options: [
      'Ganti "will have collect" menjadi "will have been collecting"',
      'Ganti "next spring" menjadi "the next of spring"',
      'Ganti "continuous years" menjadi "continually years"',
      'Ganti "for" menjadi "since"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'will have collect → will have been collecting',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Future Perfect Continuous Tense',
    explanation: 'Untuk menekankan durasi/proses berkelanjutan ("for five continuous years"), gunakan pola will + have + been + Verb-ing, bukan "will have + V1".'
  },
  {
    id: 'fpc-5',
    question: 'Ubah menjadi kalimat negatif (Negative Form):\n"By the end of this month, the factory will have been operating without incident for a full year."',
    options: [
      'By the end of this month, the factory will not have been operating without incident for a full year.',
      'By the end of this month, the factory will have not been operating without incident for a full year.',
      'By the end of this month, the factory will have been not operating without incident for a full year.',
      'By the end of this month, the factory does not will have been operating without incident for a full year.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'By the end of this month, the factory will not (won\'t) have been operating without incident for a full year.',
    questionType: 'negative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Negatif)',
    categoryTag: 'Future Perfect Continuous Tense',
    explanation: 'Negatif Future Perfect Continuous: Subject + will + not + have + been + Verb-ing ("will not have been operating").'
  },
  {
    id: 'fpc-6',
    question: 'Ubah menjadi kalimat tanya (Interrogative):\n"By 2030, this reactor will have been running continuously for fifty years."',
    options: [
      'Will this reactor have been running continuously for fifty years by 2030?',
      'Will have been this reactor running continuously for fifty years by 2030?',
      'Will this reactor running have been continuously for fifty years by 2030?',
      'Has this reactor will have been running continuously for fifty years by 2030?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Will this reactor have been running continuously for fifty years by 2030?',
    questionType: 'interrogative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Tanya)',
    categoryTag: 'Future Perfect Continuous Tense',
    explanation: 'Kalimat tanya: Will + Subject + have + been + Verb-ing ("Will this reactor have been running...?").'
  },
  {
    id: 'fpc-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nhours / been / negotiating / will / by / midnight / for / have / eight / they',
    options: [
      'By midnight, they will have been negotiating for eight hours.',
      'They will negotiating have been for eight hours by midnight.',
      'By midnight for eight hours they will negotiating been have.',
      'They will have negotiating been for eight hours by midnight.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'By midnight, they will have been negotiating for eight hours.',
    scrambleWords: ['By', 'midnight,', 'they', 'will', 'have', 'been', 'negotiating', 'for', 'eight', 'hours.'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Future Perfect Continuous Tense',
    explanation: 'Struktur: (Batas waktu) + Subject + will + have + been + Verb-ing + durasi.'
  },
  {
    id: 'fpc-8',
    question: 'When the renovation is finally finished, the residents ______ in temporary housing for almost a year.',
    options: ['live', 'will have lived', 'will have been living', 'have been living'],
    correctAnswerIndex: 2,
    correctAnswerText: 'will have been living',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Future Perfect Continuous Tense',
    explanation: 'Menekankan proses tinggal sementara yang terus berlangsung hingga rampungnya renovasi ("for almost a year") -> "will have been living".'
  },
  {
    id: 'fpc-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Saat kontrak ini berakhir, perusahaan itu akan sudah beroperasi di kawasan ini selama dua puluh tahun."',
    options: [
      'When this contract ends, the company will have been operating in this region for twenty years.',
      'When this contract will end, the company will operate in this region for twenty years.',
      'By this contract ended, the company will have operated in this region for twenty years.',
      'When this contract ends, the company has operated in this region for twenty years.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'When this contract ends, the company will have been operating in this region for twenty years.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Future Perfect Continuous Tense',
    explanation: 'Durasi akumulasi operasi bisnis saat kontrak berakhir di masa depan -> "will have been operating ... for twenty years".'
  },
  {
    id: 'fpc-10',
    question: 'Assuming no delays occur, by the time the satellite reaches orbit, engineers ______ (monitor) its systems continuously for over seventy-two hours.',
    options: ['will have been monitoring', 'will monitor', 'are monitoring', 'monitored'],
    correctAnswerIndex: 0,
    correctAnswerText: 'will have been monitoring',
    acceptableAnswers: ['will have been monitoring'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Future Perfect Continuous Tense',
    explanation: 'Proses pemantauan berkesinambungan tanpa henti yang terakumulasi hingga tercapainya orbit satelit -> "will have been monitoring".'
  }
];
