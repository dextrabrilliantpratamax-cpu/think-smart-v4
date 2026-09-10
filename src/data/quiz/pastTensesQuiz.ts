import { QuizQuestion } from '../../types';

// ==========================================
// TENSE 5: SIMPLE PAST TENSE (10 SOAL)
// ==========================================
export const SIMPLE_PAST_QUIZ: QuizQuestion[] = [
  {
    id: 'past-1',
    question: 'The board ______ the acquisition proposal during last week\'s emergency meeting.',
    options: ['rejects', 'rejected', 'has rejected', 'was rejecting'],
    correctAnswerIndex: 1,
    correctAnswerText: 'rejected',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Simple Past Tense',
    explanation: '"Last week" adalah penanda waktu lampau yang definit dan selesai -> Simple Past (Verb 2: "rejected").'
  },
  {
    id: 'past-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'She didn\'t went to the conference because of a scheduling conflict.',
      'She didn\'t go to the conference because of a scheduling conflict.',
      'She not went to the conference because of a scheduling conflict.',
      'She hasn\'t went to the conference because of a scheduling conflict.'
    ],
    correctAnswerIndex: 1,
    correctAnswerText: 'She didn\'t go to the conference because of a scheduling conflict.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Simple Past Tense',
    explanation: 'Bentuk negatif Simple Past: Subject + did not (didn\'t) + Verb 1 bentuk dasar ("didn\'t go"), bukan "didn\'t went".'
  },
  {
    id: 'past-3',
    question: 'The archaeologists (discover) ______ an ancient artifact buried beneath the temple ruins in 2019.',
    options: ['discovered', 'discover', 'have discovered', 'had discovered'],
    correctAnswerIndex: 0,
    correctAnswerText: 'discovered',
    acceptableAnswers: ['discovered'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Simple Past Tense',
    explanation: '"In 2019" adalah titik waktu lampau spesifik yang sudah berlalu -> Verb 2 ("discovered").'
  },
  {
    id: 'past-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"When the CEO announces the layoffs, the employees were shocked."',
    options: [
      'Ganti "announces" menjadi "announced"',
      'Ganti "were shocked" menjadi "are shocked"',
      'Ganti "layoffs" menjadi "laying off"',
      'Ganti "When" menjadi "While"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'announces → announced ("When the CEO announced the layoffs...")',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Simple Past Tense',
    explanation: 'Klausa "when" yang menceritakan urutan kejadian lampau harus konsisten memakai Simple Past pada kedua klausa ("announced" & "were shocked").'
  },
  {
    id: 'past-5',
    question: 'Ubah ke bentuk pasif (Passive Voice):\n"The government imposed strict sanctions on the corporation last month."',
    options: [
      'Strict sanctions were imposed on the corporation by the government last month.',
      'Strict sanctions was imposed on the corporation by the government last month.',
      'Strict sanctions have been imposed on the corporation by the government last month.',
      'Strict sanctions are imposed on the corporation by the government last month.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Strict sanctions were imposed on the corporation by the government last month.',
    questionType: 'passive',
    questionTypeLabel: 'Transformasi Kalimat (Aktif ke Pasif)',
    categoryTag: 'Simple Past Tense',
    explanation: 'Pola pasif Simple Past: Subject (jamak: Strict sanctions) + were + Verb 3 ("were imposed").'
  },
  {
    id: 'past-6',
    question: 'Ubah menjadi kalimat tanya (Interrogative):\n"The startup secured funding from three venture capital firms."',
    options: [
      'Did the startup secure funding from three venture capital firms?',
      'Did the startup secured funding from three venture capital firms?',
      'Does the startup secure funding from three venture capital firms?',
      'Had the startup secured funding from three venture capital firms?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Did the startup secure funding from three venture capital firms?',
    questionType: 'interrogative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Tanya)',
    categoryTag: 'Simple Past Tense',
    explanation: 'Kalimat tanya Simple Past: Did + Subject + Verb 1 ("Did the startup secure...?").'
  },
  {
    id: 'past-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nbefore / the / signed / lawyers / midnight / contract / the',
    options: [
      'The lawyers signed the contract before midnight.',
      'The lawyers the contract signed before midnight.',
      'Before midnight the contract signed the lawyers.',
      'Signed the lawyers the contract before midnight.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The lawyers signed the contract before midnight.',
    scrambleWords: ['The', 'lawyers', 'signed', 'the', 'contract', 'before', 'midnight'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Simple Past Tense',
    explanation: 'Struktur: Subject (The lawyers) + V2 (signed) + Object (the contract) + Prepositional time phrase (before midnight).'
  },
  {
    id: 'past-8',
    question: 'Twenty years ago, this neighborhood ______ a quiet fishing village, not the crowded city it is today.',
    options: ['is', 'was', 'has been', 'had been'],
    correctAnswerIndex: 1,
    correctAnswerText: 'was',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Simple Past Tense',
    explanation: '"Twenty years ago" adalah penanda waktu lampau definitif -> nominal Simple Past untuk subjek tunggal "this neighborhood" menggunakan "was".'
  },
  {
    id: 'past-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Ilmuwan itu menemukan spesies baru saat melakukan ekspedisi ke hutan Amazon tahun lalu."',
    options: [
      'The scientist discovered a new species while conducting an expedition to the Amazon rainforest last year.',
      'The scientist has discovered a new species while conducting an expedition to the Amazon rainforest last year.',
      'The scientist discovers a new species while conducting an expedition to the Amazon rainforest last year.',
      'The scientist was discovering a new species while conducting an expedition to the Amazon rainforest last year.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The scientist discovered a new species while conducting an expedition to the Amazon rainforest last year.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Simple Past Tense',
    explanation: '"Tahun lalu" (last year) = penanda waktu lampau spesifik -> Simple Past ("discovered").'
  },
  {
    id: 'past-10',
    question: 'Although the negotiations ______ (fail) initially, both parties eventually reached an agreement.',
    options: ['failed', 'had failed', 'have failed', 'fail'],
    correctAnswerIndex: 0,
    correctAnswerText: 'failed',
    acceptableAnswers: ['failed'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Simple Past Tense',
    explanation: 'Klausa "although" menghubungkan dua peristiwa lampau yang berurutan dan telah selesai ("failed" dan "reached").'
  }
];

// ==========================================
// TENSE 6: PAST CONTINUOUS TENSE (10 SOAL)
// ==========================================
export const PAST_CONTINUOUS_QUIZ: QuizQuestion[] = [
  {
    id: 'pc2-1',
    question: 'The employees ______ their contracts when the news of the merger broke.',
    options: ['still negotiated', 'were still negotiating', 'have still negotiated', 'still negotiate'],
    correctAnswerIndex: 1,
    correctAnswerText: 'were still negotiating',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Past Continuous Tense',
    explanation: 'Tindakan yang sedang berlangsung di masa lalu yang disela/diinterupsi oleh kejadian lain ("when the news broke") -> Past Continuous ("were still negotiating").'
  },
  {
    id: 'pc2-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'While she was presenting, the projector suddenly shut down.',
      'While she presented, the projector was suddenly shutting down.',
      'While she was presenting, the projector was suddenly shutting down.',
      'While she presenting, the projector suddenly shut down.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'While she was presenting, the projector suddenly shut down.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Past Continuous Tense',
    explanation: 'Pola standar: Aksi panjang yang sedang berlangsung (Past Continuous: was presenting) diinterupsi aksi mendadak pendek (Simple Past: shut down).'
  },
  {
    id: 'pc2-3',
    question: 'This time last year, the company (struggle) ______ to stay afloat financially.',
    options: ['was struggling', 'struggled', 'had struggled', 'is struggling'],
    correctAnswerIndex: 0,
    correctAnswerText: 'was struggling',
    acceptableAnswers: ['was struggling'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Past Continuous Tense',
    explanation: '"This time last year" menunjukkan kegiatan yang sedang berlangsung pada titik waktu spesifik di masa lalu -> was struggling.'
  },
  {
    id: 'pc2-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"The technicians was repairing the server when the backup system failed."',
    options: [
      'Ganti "was repairing" menjadi "were repairing"',
      'Ganti "failed" menjadi "was failing"',
      'Ganti "the server" menjadi "a server"',
      'Ganti "when" menjadi "during"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'was → were ("The technicians were repairing the server...")',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Past Continuous Tense',
    explanation: 'Subjek jamak "The technicians" mewajibkan to be jamak "were", bukan "was".'
  },
  {
    id: 'pc2-5',
    question: 'Ubah ke bentuk pasif (Passive Voice):\n"The inspectors were examining the construction site when the accident occurred."',
    options: [
      'The construction site was being examined by the inspectors when the accident occurred.',
      'The construction site was examined by the inspectors when the accident occurred.',
      'The construction site had been examined by the inspectors when the accident occurred.',
      'The construction site is being examined by the inspectors when the accident occurred.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The construction site was being examined by the inspectors when the accident occurred.',
    questionType: 'passive',
    questionTypeLabel: 'Transformasi Kalimat (Aktif ke Pasif)',
    categoryTag: 'Past Continuous Tense',
    explanation: 'Pola pasif Past Continuous: S + was/were + being + Verb 3 ("was being examined").'
  },
  {
    id: 'pc2-6',
    question: 'Ubah menjadi kalimat negatif (Negative Form):\n"The board members were paying close attention during the presentation."',
    options: [
      'The board members were not paying close attention during the presentation.',
      'The board members did not pay close attention during the presentation.',
      'The board members have not paid close attention during the presentation.',
      'The board members had not been paying close attention during the presentation.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The board members were not (weren\'t) paying close attention during the presentation.',
    questionType: 'negative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Negatif)',
    categoryTag: 'Past Continuous Tense',
    explanation: 'Bentuk negatif Past Continuous: S + was/were + not + Verb-ing ("were not paying").'
  },
  {
    id: 'pc2-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nraining / heavily / left / when / it / office / was / she / the',
    options: [
      'It was raining heavily when she left the office.',
      'When it was raining heavily she left the office.',
      'She was raining heavily when it left the office.',
      'It left the office when she was raining heavily.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'It was raining heavily when she left the office.',
    scrambleWords: ['It', 'was', 'raining', 'heavily', 'when', 'she', 'left', 'the', 'office'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Past Continuous Tense',
    explanation: 'Struktur: S1 + was + V-ing (It was raining heavily) + when + S2 + V2 (she left the office).'
  },
  {
    id: 'pc2-8',
    question: 'At exactly 10 p.m. last night, the security cameras ______ unusual activity near the warehouse.',
    options: ['recorded', 'were recording', 'have recorded', 'record'],
    correctAnswerIndex: 1,
    correctAnswerText: 'were recording',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Past Continuous Tense',
    explanation: '"At exactly 10 p.m. last night" menunjukkan momen titik jam yang presisi di masa lalu saat aktivitas sedang berlangsung -> "were recording".'
  },
  {
    id: 'pc2-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Ketika gempa terjadi, para pekerja sedang membangun lantai kesepuluh gedung itu."',
    options: [
      'When the earthquake occurred, the workers were building the tenth floor of the building.',
      'When the earthquake occurred, the workers built the tenth floor of the building.',
      'When the earthquake was occurring, the workers built the tenth floor of the building.',
      'When the earthquake has occurred, the workers had built the tenth floor of the building.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'When the earthquake happened/occurred, the workers were building the tenth floor of the building.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Past Continuous Tense',
    explanation: 'Aksi panjang yang sedang berlangsung (were building) disela kejadian mendadak (earthquake occurred) -> Past Continuous + Simple Past.'
  },
  {
    id: 'pc2-10',
    question: 'While the auditors ______ (review) the accounts, they stumbled upon evidence of fraud.',
    options: ['were reviewing', 'reviewed', 'had reviewed', 'are reviewing'],
    correctAnswerIndex: 0,
    correctAnswerText: 'were reviewing',
    acceptableAnswers: ['were reviewing'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Past Continuous Tense',
    explanation: '"While" mengawali proses investigasi yang memakan waktu ("were reviewing") sebelum mereka tiba-tiba menemukan bukti kecurangan ("stumbled upon").'
  }
];

// ==========================================
// TENSE 7: PAST PERFECT TENSE (10 SOAL)
// ==========================================
export const PAST_PERFECT_QUIZ: QuizQuestion[] = [
  {
    id: 'perf-1',
    question: 'By the time the ambulance arrived, the paramedics ______ the patient\'s condition.',
    options: ['already stabilized', 'had already stabilized', 'have already stabilized', 'were already stabilizing'],
    correctAnswerIndex: 1,
    correctAnswerText: 'had already stabilized',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Past Perfect Tense',
    explanation: '"By the time" menghubungkan dua peristiwa masa lalu; tindakan yang terjadi lebih awal (menstabilkan pasien) wajib menggunakan Past Perfect ("had already stabilized").'
  },
  {
    id: 'perf-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'She realized that she had forgot her passport at the hotel.',
      'She realized that she had forgotten her passport at the hotel.',
      'She had realized that she forgot her passport at the hotel.',
      'She realized that she has forgotten her passport at the hotel.'
    ],
    correctAnswerIndex: 1,
    correctAnswerText: 'She realized that she had forgotten her passport at the hotel.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Past Perfect Tense',
    explanation: 'Participle ketiga dari "forget" adalah "forgotten". Peristiwa tertinggalnya paspor (Past Perfect: had forgotten) mendahului saat dia menyadarinya (Simple Past: realized).'
  },
  {
    id: 'perf-3',
    question: 'The plane (already/take off) ______ by the time we reached the gate.',
    options: ['had already taken off', 'already took off', 'has already taken off', 'was already taking off'],
    correctAnswerIndex: 0,
    correctAnswerText: 'had already taken off',
    acceptableAnswers: ['had already taken off'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Past Perfect Tense',
    explanation: 'Pesawat lepas landas (aksi pertama lebih dulu selesai) sebelum mereka sampai ke gerbang (aksi kedua) -> had already taken off.'
  },
  {
    id: 'perf-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"After she finished the report, she had submitted it to her supervisor."',
    options: [
      'Ubah urutan tense: "After she had finished the report, she submitted it..."',
      'Ganti "submitted" menjadi "submits"',
      'Ganti "After" menjadi "Before"',
      'Ganti "her supervisor" menjadi "the supervisor of her"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: '"After she finished...she had submitted" → "After she had finished the report, she submitted it to her supervisor."',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Past Perfect Tense',
    explanation: 'Tindakan yang selesai lebih dulu adalah menyelesaikan laporan (had finished), baru kemudian diserahkan (submitted).'
  },
  {
    id: 'perf-5',
    question: 'Ubah ke bentuk pasif (Passive Voice):\n"The hackers had already breached the system before the IT team noticed."',
    options: [
      'The system had already been breached by the hackers before the IT team noticed.',
      'The system was already breached by the hackers before the IT team noticed.',
      'The system has already been breached by the hackers before the IT team noticed.',
      'The system had already breached by the hackers before the IT team noticed.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The system had already been breached by the hackers before the IT team noticed.',
    questionType: 'passive',
    questionTypeLabel: 'Transformasi Kalimat (Aktif ke Pasif)',
    categoryTag: 'Past Perfect Tense',
    explanation: 'Pola pasif Past Perfect: Subject + had + (already) + been + Verb 3 ("had already been breached").'
  },
  {
    id: 'perf-6',
    question: 'Ubah menjadi kalimat tanya (Interrogative):\n"The witnesses had left the scene before the police arrived."',
    options: [
      'Had the witnesses left the scene before the police arrived?',
      'Did the witnesses have left the scene before the police arrived?',
      'Have the witnesses left the scene before the police arrived?',
      'Had the witnesses leave the scene before the police arrived?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Had the witnesses left the scene before the police arrived?',
    questionType: 'interrogative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Tanya)',
    categoryTag: 'Past Perfect Tense',
    explanation: 'Kalimat tanya Past Perfect: Had + Subject + Verb 3 ("Had the witnesses left...?").'
  },
  {
    id: 'perf-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nleft / everyone / had / by / meeting / started / the / time / the',
    options: [
      'Everyone had left by the time the meeting started.',
      'By the time everyone had left the meeting started.',
      'The meeting started by the time everyone had left.',
      'Everyone started the meeting by the time had left.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Everyone had left by the time the meeting started.',
    scrambleWords: ['Everyone', 'had', 'left', 'by', 'the', 'time', 'the', 'meeting', 'started'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Past Perfect Tense',
    explanation: 'Tindakan yang lebih dulu tuntas (had left) memakai Past Perfect, sebelum tindakan lampau kedua terjadi (started).'
  },
  {
    id: 'perf-8',
    question: 'The village was unrecognizable — a devastating flood ______ most of the houses the year before.',
    options: ['destroyed', 'had destroyed', 'has destroyed', 'was destroying'],
    correctAnswerIndex: 1,
    correctAnswerText: 'had destroyed',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Past Perfect Tense',
    explanation: 'Kondisi desa saat dilihat lampau (was unrecognizable) akibat bencana banjir yang sudah terjadi setahun sebelumnya ("the year before") -> "had destroyed".'
  },
  {
    id: 'perf-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Dia sudah menyelesaikan gelar doktoralnya sebelum dia berusia 25 tahun."',
    options: [
      'He had already completed his doctoral degree before he turned 25.',
      'He already completed his doctoral degree before he turned 25.',
      'He has already completed his doctoral degree before he was 25.',
      'He was completing his doctoral degree before he turned 25.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'He had already completed his doctoral degree before he turned 25 (before he was 25).',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Past Perfect Tense',
    explanation: 'Tindakan tuntas sebelum titik usia lampau (turned 25) -> Past Perfect ("had already completed").'
  },
  {
    id: 'perf-10',
    question: 'The investigators concluded that the fire ______ (start) deliberately, long before anyone reported smelling smoke.',
    options: ['had started', 'started', 'has started', 'was starting'],
    correctAnswerIndex: 0,
    correctAnswerText: 'had started',
    acceptableAnswers: ['had started'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Past Perfect Tense',
    explanation: 'Kebakaran bermula jauh sebelum adanya saksi yang mencium bau asap -> Past Perfect ("had started").'
  }
];

// ==========================================
// TENSE 8: PAST PERFECT CONTINUOUS (10 SOAL)
// ==========================================
export const PAST_PERFECT_CONTINUOUS_QUIZ: QuizQuestion[] = [
  {
    id: 'ppc2-1',
    question: 'The workers ______ for nearly a month before the management finally agreed to negotiate.',
    options: ['protested', 'had been protesting', 'have been protesting', 'were protesting'],
    correctAnswerIndex: 1,
    correctAnswerText: 'had been protesting',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Past Perfect Continuous Tense',
    explanation: 'Menekankan akumulasi durasi ("for nearly a month") sebelum titik peristiwa lampau lain terjadi (agreed) -> Past Perfect Continuous ("had been protesting").'
  },
  {
    id: 'ppc2-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'She had been studying medicine for six years when she decided to switch careers.',
      'She had studying medicine for six years when she decided to switch careers.',
      'She has been studying medicine for six years when she decided to switch careers.',
      'She had been study medicine for six years when she decided to switch careers.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'She had been studying medicine for six years when she decided to switch careers.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Past Perfect Continuous Tense',
    explanation: 'Struktur baku Past Perfect Continuous: Subject + had + been + Verb-ing ("had been studying").'
  },
  {
    id: 'ppc2-3',
    question: 'Her hands were shaking because she (type) ______ nonstop for hours before the deadline hit.',
    options: ['had been typing', 'was typing', 'has been typing', 'typed'],
    correctAnswerIndex: 0,
    correctAnswerText: 'had been typing',
    acceptableAnswers: ['had been typing'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Past Perfect Continuous Tense',
    explanation: 'Efek fisik lampau (tangan gemetar) diakibatkan oleh aktivitas mengetik berjam-jam tanpa henti sebelum tenggat waktu -> had been typing.'
  },
  {
    id: 'ppc2-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"The engine was overheating because it had been running since three hours."',
    options: [
      'Ganti "since" menjadi "for"',
      'Ganti "had been running" menjadi "was running"',
      'Ganti "was overheating" menjadi "had overheated"',
      'Ganti "three hours" menjadi "three hour"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'since → for ("...because it had been running for three hours.")',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Past Perfect Continuous Tense',
    explanation: '"For" digunakan untuk menyatakan kuantitas rentang durasi ("for three hours"), sedangkan "since" hanya untuk titik awal waktu.'
  },
  {
    id: 'ppc2-5',
    question: 'Ubah menjadi kalimat negatif (Negative Form):\n"The factory had been discharging waste into the river for years before regulators intervened."',
    options: [
      'The factory had not been discharging waste into the river for years before regulators intervened.',
      'The factory did not discharge waste into the river for years before regulators intervened.',
      'The factory was not discharging waste into the river for years before regulators intervened.',
      'The factory has not been discharging waste into the river for years before regulators intervened.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The factory had not (hadn\'t) been discharging waste into the river for years before regulators intervened.',
    questionType: 'negative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Negatif)',
    categoryTag: 'Past Perfect Continuous Tense',
    explanation: 'Bentuk negatif Past Perfect Continuous: Subject + had + not + been + Verb-ing ("had not been discharging").'
  },
  {
    id: 'ppc2-6',
    question: 'Ubah menjadi kalimat tanya (Interrogative):\n"The negotiators had been arguing for hours before they reached a compromise."',
    options: [
      'Had the negotiators been arguing for hours before they reached a compromise?',
      'Were the negotiators arguing for hours before they reached a compromise?',
      'Have the negotiators been arguing for hours before they reached a compromise?',
      'Did the negotiators argue for hours before they reached a compromise?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Had the negotiators been arguing for hours before they reached a compromise?',
    questionType: 'interrogative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Tanya)',
    categoryTag: 'Past Perfect Continuous Tense',
    explanation: 'Bentuk tanya: Had + Subject + been + Verb-ing ("Had the negotiators been arguing...?").'
  },
  {
    id: 'ppc2-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nmonths / been / for / had / declining / sales / several',
    options: [
      'Sales had been declining for several months.',
      'Sales had declining been for several months.',
      'For several months been sales had declining.',
      'Declining had been sales for several months.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Sales had been declining for several months.',
    scrambleWords: ['Sales', 'had', 'been', 'declining', 'for', 'several', 'months'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Past Perfect Continuous Tense',
    explanation: 'Struktur: Subject (Sales) + had + been + Verb-ing (declining) + duration phrase (for several months).'
  },
  {
    id: 'ppc2-8',
    question: 'The soil was completely dry — it ______ for months before the drought was officially declared.',
    options: ['didn\'t rain', 'hasn\'t rained', 'hadn\'t been raining', 'wasn\'t raining'],
    correctAnswerIndex: 2,
    correctAnswerText: 'hadn\'t been raining',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Past Perfect Continuous Tense',
    explanation: 'Kondisi tanah sangat kering karena selama berbulan-bulan hujan tidak turun sebelum kekeringan resmi diumumkan -> Past Perfect Continuous negatif ("hadn\'t been raining").'
  },
  {
    id: 'ppc2-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Mereka sudah berdebat selama berjam-jam sebelum akhirnya mencapai kesepakatan."',
    options: [
      'They had been arguing for hours before they finally reached an agreement.',
      'They were arguing for hours before they finally reached an agreement.',
      'They have been arguing for hours before they finally reached an agreement.',
      'They argued for hours before they finally had reached an agreement.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'They had been arguing for hours before they finally reached an agreement.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Past Perfect Continuous Tense',
    explanation: 'Durasi proses debat sebelum peristiwa lampau lain dicapai -> Past Perfect Continuous ("had been arguing for hours").'
  },
  {
    id: 'ppc2-10',
    question: 'The company collapsed because its executives ______ (mismanage) funds for years without anyone noticing.',
    options: ['had been mismanaging', 'were mismanaging', 'have been mismanaging', 'mismanaged'],
    correctAnswerIndex: 0,
    correctAnswerText: 'had been mismanaging',
    acceptableAnswers: ['had been mismanaging'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Past Perfect Continuous Tense',
    explanation: 'Proses penyelewengan dana berlangsung bertahun-tahun sebelum akhirnya perusahaan kolaps -> Past Perfect Continuous ("had been mismanaging").'
  }
];
