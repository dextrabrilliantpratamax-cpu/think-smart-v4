import { QuizQuestion } from '../../types';

// ==========================================
// TENSE 13: PAST FUTURE TENSE (10 SOAL)
// ==========================================
export const PAST_FUTURE_QUIZ: QuizQuestion[] = [
  {
    id: 'pf-1',
    question: 'The spokesperson assured the press that the minister ______ a statement later that afternoon.',
    options: ['releases', 'will release', 'would release', 'has released'],
    correctAnswerIndex: 2,
    correctAnswerText: 'would release',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Past Future Tense',
    explanation: 'Dalam indirect speech / kalimat berita lampau (past reporting: "assured"), modal "will" bergeser menjadi "would" ("would release").'
  },
  {
    id: 'pf-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'If she studied harder, she would passes the certification exam.',
      'If she studied harder, she would pass the certification exam.',
      'If she studies harder, she would pass the certification exam.',
      'If she studied harder, she will pass the certification exam.'
    ],
    correctAnswerIndex: 1,
    correctAnswerText: 'If she studied harder, she would pass the certification exam.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Past Future Tense',
    explanation: 'Pola baku Conditional Sentence Type 2: If + Simple Past (studied), S + would + Verb 1 bentuk dasar ("would pass").'
  },
  {
    id: 'pf-3',
    question: 'The manager promised that all overtime claims (process) ______ before the end of the week.',
    options: ['would be processed', 'will be processed', 'would process', 'are processed'],
    correctAnswerIndex: 0,
    correctAnswerText: 'would be processed',
    acceptableAnswers: ['would be processed'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Past Future Tense',
    explanation: 'Janji di masa lalu ("promised") berbentuk pasif: would + be + V3 ("would be processed").'
  },
  {
    id: 'pf-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"He believed that the company will recover from the crisis quickly."',
    options: [
      'Ganti "will" menjadi "would"',
      'Ganti "believed" menjadi "was believing"',
      'Ganti "recover" menjadi "recovering"',
      'Ganti "quickly" menjadi "quick"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'will → would ("He believed that the company would recover...")',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Past Future Tense',
    explanation: 'Ketika induk kalimat berada dalam bentuk lampau ("believed"), klausa terikat yang menyatakan proyeksi masa depan harus menggunakan "would", bukan "will" (Backshift of tenses).'
  },
  {
    id: 'pf-5',
    question: 'Ubah ke bentuk pasif (Passive Voice):\n"The contractor promised that he would finish the renovation by Friday."',
    options: [
      'The contractor promised that the renovation would be finished by him by Friday.',
      'The contractor promised that the renovation will be finished by him by Friday.',
      'The contractor promised that the renovation would finished by him by Friday.',
      'The contractor promised that the renovation would have finished by him by Friday.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The contractor promised that the renovation would be finished by him by Friday.',
    questionType: 'passive',
    questionTypeLabel: 'Transformasi Kalimat (Aktif ke Pasif)',
    categoryTag: 'Past Future Tense',
    explanation: 'Pola pasif Past Future: would + be + Verb 3 ("would be finished").'
  },
  {
    id: 'pf-6',
    question: 'Ubah menjadi kalimat tanya (Interrogative):\n"If you had the authority, you would change the company\'s policy immediately."',
    options: [
      'Would you change the company\'s policy immediately if you had the authority?',
      'Did you would change the company\'s policy immediately if you had the authority?',
      'Will you change the company\'s policy immediately if you had the authority?',
      'Would you changed the company\'s policy immediately if you had the authority?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Would you change the company\'s policy immediately if you had the authority?',
    questionType: 'interrogative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Tanya)',
    categoryTag: 'Past Future Tense',
    explanation: 'Kalimat tanya Past Future / Conditional Type 2: Would + Subject + Verb 1 ("Would you change...?").'
  },
  {
    id: 'pf-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\naccept / offer / the / thought / job / he / she / would',
    options: [
      'He thought she would accept the job offer.',
      'She thought he would accept the job offer.',
      'He would think she accept the job offer.',
      'The job offer he thought she would accept.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'He thought she would accept the job offer.',
    scrambleWords: ['He', 'thought', 'she', 'would', 'accept', 'the', 'job', 'offer'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Past Future Tense',
    explanation: 'Struktur: Induk kalimat Simple Past (He thought) + klausa anak Past Future (she would accept the job offer).'
  },
  {
    id: 'pf-8',
    question: 'We were confident that our proposal ______ the committee, but the vote went the other way.',
    options: ['convinces', 'will convince', 'would convince', 'has convinced'],
    correctAnswerIndex: 2,
    correctAnswerText: 'would convince',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Past Future Tense',
    explanation: 'Keyakinan di masa lampau ("We were confident") mengenai apa yang akan terjadi di kemudian waktu -> Past Future ("would convince").'
  },
  {
    id: 'pf-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Dia berjanji bahwa dia akan mengembalikan uang itu dalam waktu dua minggu."',
    options: [
      'He promised that he would return the money within two weeks.',
      'He promised that he will return the money within two weeks.',
      'He promises that he would return the money within two weeks.',
      'He promised that he would have returned the money within two weeks.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'He promised that he would return the money within two weeks.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Past Future Tense',
    explanation: 'Janji masa lampau ("promised") mengenai tindakan yang akan dilakukan -> Past Future ("would return").'
  },
  {
    id: 'pf-10',
    question: 'Even if the board ______ (offer) him the CEO position, he would decline it due to personal reasons.',
    options: ['offered', 'offers', 'had offered', 'would offer'],
    correctAnswerIndex: 0,
    correctAnswerText: 'offered',
    acceptableAnswers: ['offered'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Past Future Tense',
    explanation: 'Dalam kalimat pengandaian Type 2 dengan klausa utama "would decline", anak kalimat "even if" memerlukan Simple Past ("offered").'
  }
];

// ==========================================
// TENSE 14: PAST FUTURE CONTINUOUS (10 SOAL)
// ==========================================
export const PAST_FUTURE_CONTINUOUS_QUIZ: QuizQuestion[] = [
  {
    id: 'pfc-1',
    question: 'He promised that by 8 p.m. that evening, he ______ the guest list for the gala.',
    options: ['will be finalizing', 'would be finalizing', 'had finalized', 'was finalizing'],
    correctAnswerIndex: 1,
    correctAnswerText: 'would be finalizing',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Past Future Continuous Tense',
    explanation: 'Proyeksi lampau ("promised") tentang aksi yang akan sedang berlangsung pada waktu tertentu malam itu -> Past Future Continuous ("would be finalizing").'
  },
  {
    id: 'pfc-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'She said she would be preparing dinner when we arrived.',
      'She said she will be preparing dinner when we arrived.',
      'She said she would preparing dinner when we arrived.',
      'She said she would be prepared dinner when we arrived.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'She said she would be preparing dinner when we arrived.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Past Future Continuous Tense',
    explanation: 'Rumus baku Past Future Continuous: Subject + would + be + Verb-ing ("would be preparing").'
  },
  {
    id: 'pfc-3',
    question: 'They told us that at this time yesterday, they (negotiate) ______ the merger terms in Tokyo.',
    options: ['would be negotiating', 'will be negotiating', 'were negotiating', 'would negotiate'],
    correctAnswerIndex: 0,
    correctAnswerText: 'would be negotiating',
    acceptableAnswers: ['would be negotiating'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Past Future Continuous Tense',
    explanation: 'Rencana lanjutan dalam perspektif lampau ("They told us...") yang diproyeksikan sedang berlangsung -> would be negotiating.'
  },
  {
    id: 'pfc-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"She told me that she would being flying over Europe at midnight."',
    options: [
      'Ganti "would being flying" menjadi "would be flying"',
      'Ganti "told me" menjadi "tells to me"',
      'Ganti "over Europe" menjadi "above the Europe"',
      'Ganti "at midnight" menjadi "in midnight"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'would being flying → would be flying',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Past Future Continuous Tense',
    explanation: 'Setelah modal "would", auxiliary adalah "be" (bare infinitive), bukan "being". Pola yang benar: would + be + Verb-ing.'
  },
  {
    id: 'pfc-5',
    question: 'Ubah menjadi kalimat negatif (Negative Form):\n"The director assured the staff that the crew would be filming during the weekend."',
    options: [
      'The director assured the staff that the crew would not be filming during the weekend.',
      'The director assured the staff that the crew will not be filming during the weekend.',
      'The director assured the staff that the crew would be not filming during the weekend.',
      'The director assured the staff that the crew did not would be filming during the weekend.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The director assured the staff that the crew would not (wouldn\'t) be filming during the weekend.',
    questionType: 'negative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Negatif)',
    categoryTag: 'Past Future Continuous Tense',
    explanation: 'Bentuk negatif Past Future Continuous: would + not + be + Verb-ing ("would not be filming").'
  },
  {
    id: 'pfc-6',
    question: 'Ubah menjadi kalimat tanya (Interrogative):\n"You knew that they would be waiting for your response at noon."',
    options: [
      'Did you know that they would be waiting for your response at noon?',
      'Would they be waiting for your response at noon, did you knew?',
      'Were you knowing that they would be waiting for your response at noon?',
      'Had you known that they will be waiting for your response at noon?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Did you know that they would be waiting for your response at noon?',
    questionType: 'interrogative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Tanya)',
    categoryTag: 'Past Future Continuous Tense',
    explanation: 'Pertanyaan interogatif pada induk kalimat: "Did you know that they would be waiting...?"'
  },
  {
    id: 'pfc-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nwould / said / working / late / he / be / that / night / that',
    options: [
      'He said that he would be working late that night.',
      'That night he said that he would working be late.',
      'He would be working late said he that that night.',
      'He said that night that he working would be late.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'He said that he would be working late that night.',
    scrambleWords: ['He', 'said', 'that', 'he', 'would', 'be', 'working', 'late', 'that', 'night'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Past Future Continuous Tense',
    explanation: 'Struktur indirect speech: S + said + that + S + would + be + V-ing + adverb.'
  },
  {
    id: 'pfc-8',
    question: 'I had planned that while my team was reviewing the data, I ______ the final presentation slides.',
    options: ['prepared', 'would be preparing', 'had prepared', 'will be preparing'],
    correctAnswerIndex: 1,
    correctAnswerText: 'would be preparing',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Past Future Continuous Tense',
    explanation: 'Rencana aktivitas paralel yang diproyeksikan sedang berjalan dalam skenario lampau -> "would be preparing".'
  },
  {
    id: 'pfc-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Dia mengatakan kepada kami bahwa dia akan sedang menghadiri konferensi ketika kami meneleponnya besok harinya."',
    options: [
      'He told us that he would be attending a conference when we called him the following day.',
      'He told us that he will be attending a conference when we will call him tomorrow.',
      'He told us that he was attending a conference when we called him tomorrow.',
      'He tells us that he would attend a conference when we called him the following day.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'He told us that he would be attending a conference when we called him the following day.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Past Future Continuous Tense',
    explanation: 'Indirect speech dari Future Continuous: "will be attending" bergeser menjadi "would be attending".'
  },
  {
    id: 'pfc-10',
    question: 'The weather station had warned that as the storm approached the coast, winds ______ (blow) at hurricane force throughout the evening.',
    options: ['would be blowing', 'will be blowing', 'were blowing', 'had been blowing'],
    correctAnswerIndex: 0,
    correctAnswerText: 'would be blowing',
    acceptableAnswers: ['would be blowing'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Past Future Continuous Tense',
    explanation: 'Peringatan masa lampau tentang kondisi angin yang akan sedang bertiup kencang sepanjang malam -> "would be blowing".'
  }
];

// ==========================================
// TENSE 15: PAST FUTURE PERFECT TENSE (10 SOAL)
// ==========================================
export const PAST_FUTURE_PERFECT_QUIZ: QuizQuestion[] = [
  {
    id: 'pfp-1',
    question: 'If the government had intervened earlier, the economic crisis ______ averted.',
    options: ['would be', 'would have been', 'will have been', 'had been'],
    correctAnswerIndex: 1,
    correctAnswerText: 'would have been',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Past Future Perfect Tense',
    explanation: 'Conditional Sentence Type 3 (pengandaian masa lalu yang tidak terjadi): If + Past Perfect, S + would + have + been + V3 ("would have been averted").'
  },
  {
    id: 'pfp-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'She would has finished the project if she had received the data on time.',
      'She would have finished the project if she had received the data on time.',
      'She would have finish the project if she had received the data on time.',
      'She will have finished the project if she had received the data on time.'
    ],
    correctAnswerIndex: 1,
    correctAnswerText: 'She would have finished the project if she had received the data on time.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Past Future Perfect Tense',
    explanation: 'Setelah modal "would", bentuk yang benar selalu auxiliary "have" (bukan "has") + Verb 3 ("finished").'
  },
  {
    id: 'pfp-3',
    question: 'Without your timely advice, I (make) ______ a catastrophic investment error.',
    options: ['would have made', 'will have made', 'would make', 'had made'],
    correctAnswerIndex: 0,
    correctAnswerText: 'would have made',
    acceptableAnswers: ['would have made'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Past Future Perfect Tense',
    explanation: '"Without your timely advice" mengimplikasikan kondisi pengandaian lampau tak terealisasi (implied conditional) -> would have made.'
  },
  {
    id: 'pfp-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"If he had not missed the train, he would arrived at the interview on time."',
    options: [
      'Ganti "would arrived" menjadi "would have arrived"',
      'Ganti "had not missed" menjadi "did not miss"',
      'Ganti "at the interview" menjadi "in the interview"',
      'Ganti "on time" menjadi "in time"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'would arrived → would have arrived',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Past Future Perfect Tense',
    explanation: 'Pola klausa utama Conditional Type 3 wajib menggunakan "would + have + Verb 3", bukan "would + Verb 3" tanpa "have".'
  },
  {
    id: 'pfp-5',
    question: 'Ubah ke bentuk pasif (Passive Voice):\n"The committee would have approved the budget if the revisions had been submitted on time."',
    options: [
      'The budget would have been approved by the committee if the revisions had been submitted on time.',
      'The budget would had been approved by the committee if the revisions had been submitted on time.',
      'The budget will have been approved by the committee if the revisions had been submitted on time.',
      'The budget would be approved by the committee if the revisions had been submitted on time.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The budget would have been approved by the committee if the revisions had been submitted on time.',
    questionType: 'passive',
    questionTypeLabel: 'Transformasi Kalimat (Aktif ke Pasif)',
    categoryTag: 'Past Future Perfect Tense',
    explanation: 'Pola pasif Past Future Perfect: Subject + would + have + been + Verb 3 ("would have been approved").'
  },
  {
    id: 'pfp-6',
    question: 'Ubah menjadi kalimat tanya (Interrogative):\n"If you had known about the risks, you would have cancelled the expedition."',
    options: [
      'Would you have cancelled the expedition if you had known about the risks?',
      'Did you would have cancelled the expedition if you had known about the risks?',
      'Had you cancelled the expedition if you would know about the risks?',
      'Would you cancelled the expedition if you had known about the risks?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Would you have cancelled the expedition if you had known about the risks?',
    questionType: 'interrogative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Tanya)',
    categoryTag: 'Past Future Perfect Tense',
    explanation: 'Bentuk tanya Conditional Type 3: Would + Subject + have + Verb 3 ("Would you have cancelled...?").'
  },
  {
    id: 'pfp-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nhave / would / the / failed / without / team / guidance / his',
    options: [
      'The team would have failed without his guidance.',
      'Without his guidance the team have would failed.',
      'The team failed would have without his guidance.',
      'His guidance would have failed without the team.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'The team would have failed without his guidance.',
    scrambleWords: ['The', 'team', 'would', 'have', 'failed', 'without', 'his', 'guidance'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Past Future Perfect Tense',
    explanation: 'Struktur: Subject (The team) + would + have + V3 (failed) + prepositional conditional phrase (without his guidance).'
  },
  {
    id: 'pfp-8',
    question: 'Had they followed the safety protocols, the tragic accident ______ never ______ in the first place.',
    options: ['had / happened', 'would / have happened', 'will / have happened', 'was / happening'],
    correctAnswerIndex: 1,
    correctAnswerText: 'would / have happened',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Past Future Perfect Tense',
    explanation: 'Inversi Conditional Type 3 ("Had they followed...") berpasangan dengan konsekuensi lampau "would have happened".'
  },
  {
    id: 'pfp-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Jika dia tahu tentang jadwal rapat itu, dia pasti sudah hadir kemarin."',
    options: [
      'If he had known about the meeting schedule, he would have attended yesterday.',
      'If he knew about the meeting schedule, he would attend yesterday.',
      'If he has known about the meeting schedule, he will have attended yesterday.',
      'If he had known about the meeting schedule, he had attended yesterday.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'If he had known about the meeting schedule, he would have attended yesterday.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Past Future Perfect Tense',
    explanation: 'Pengandaian fakta masa lalu yang berlawanan dengan kenyataan (Conditional Type 3) -> "would have attended".'
  },
  {
    id: 'pfp-10',
    question: 'The company\'s founders believed that by 2020, they ______ (reach) a valuation of one billion dollars, but market headwinds prevented it.',
    options: ['would have reached', 'will have reached', 'had reached', 'would reach'],
    correctAnswerIndex: 0,
    correctAnswerText: 'would have reached',
    acceptableAnswers: ['would have reached'],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Past Future Perfect Tense',
    explanation: 'Target pencapaian masa lalu yang diharapkan tuntas sebelum 2020 dalam perspektif masa lampau -> "would have reached".'
  }
];

// ==========================================
// TENSE 16: PAST FUTURE PERFECT CONTINUOUS (10 SOAL)
// ==========================================
export const PAST_FUTURE_PERFECT_CONTINUOUS_QUIZ: QuizQuestion[] = [
  {
    id: 'pfpc-1',
    question: 'By the time she left the firm in 2022, she assumed she ______ for that department for a decade.',
    options: ['will have been working', 'would have been working', 'had been working', 'was working'],
    correctAnswerIndex: 1,
    correctAnswerText: 'would have been working',
    questionType: 'mcq',
    questionTypeLabel: 'Pilihan Ganda (Melengkapi Kalimat)',
    categoryTag: 'Past Future Perfect Continuous Tense',
    explanation: 'Perspektif masa lampau ("assumed") mengenai durasi berkesinambungan yang seharusnya tercapai -> Past Future Perfect Continuous ("would have been working").'
  },
  {
    id: 'pfpc-2',
    question: 'Pilih kalimat yang gramatikal secara tata bahasa Inggris:',
    options: [
      'If the project hadn\'t been canceled, we would have been collaborating for three years by next month.',
      'If the project hadn\'t been canceled, we would has been collaborating for three years by next month.',
      'If the project hadn\'t been canceled, we would have being collaborating for three years by next month.',
      'If the project hadn\'t been canceled, we will have been collaborating for three years by next month.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'If the project hadn\'t been canceled, we would have been collaborating for three years by next month.',
    questionType: 'best-sentence',
    questionTypeLabel: 'Pilihan Ganda (Kalimat Paling Tepat)',
    categoryTag: 'Past Future Perfect Continuous Tense',
    explanation: 'Rumus lengkap: Subject + would + have + been + Verb-ing ("would have been collaborating").'
  },
  {
    id: 'pfpc-3',
    question: 'Had the factory not burned down, it (produce) ______ goods continuously for fifty years by that summer.',
    options: ['would have been producing', 'will have been producing', 'had been producing', 'would be producing'],
    correctAnswerIndex: 0,
    correctAnswerText: 'would have been producing',
    acceptableAnswers: ['would have been producing'],
    questionType: 'fill-in',
    questionTypeLabel: 'Isian Singkat',
    categoryTag: 'Past Future Perfect Continuous Tense',
    explanation: 'Kondisi pengandaian lampau tak terjadi ("Had the factory not burned down") dengan durasi akumulasi 50 tahun -> would have been producing.'
  },
  {
    id: 'pfpc-4',
    question: 'Temukan dan perbaiki kesalahan dalam kalimat berikut:\n"If the funding continued, they would have been conduct experiments for six months by now."',
    options: [
      'Ganti "conduct" menjadi "conducting"',
      'Ganti "continued" menjadi "is continuing"',
      'Ganti "by now" menjadi "until now"',
      'Ganti "experiments" menjadi "experimentation"'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'conduct → conducting ("...would have been conducting...")',
    questionType: 'error-correction',
    questionTypeLabel: 'Koreksi Kesalahan',
    categoryTag: 'Past Future Perfect Continuous Tense',
    explanation: 'Setelah "would have been", kata kerja wajib berupa Present Participle / Verb-ing ("conducting"), bukan Verb 1 dasar.'
  },
  {
    id: 'pfpc-5',
    question: 'Ubah menjadi kalimat negatif (Negative Form):\n"If they had remained in power, the regime would have been ruling the nation for forty years."',
    options: [
      'If they had remained in power, the regime would not have been ruling the nation for forty years.',
      'If they had remained in power, the regime would have not been ruling the nation for forty years.',
      'If they had remained in power, the regime would have been not ruling the nation for forty years.',
      'If they had remained in power, the regime did not would have been ruling the nation for forty years.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: '...the regime would not (wouldn\'t) have been ruling the nation for forty years.',
    questionType: 'negative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Negatif)',
    categoryTag: 'Past Future Perfect Continuous Tense',
    explanation: 'Bentuk negatif: Subject + would + not + have + been + Verb-ing ("would not have been ruling").'
  },
  {
    id: 'pfpc-6',
    question: 'Ubah menjadi kalimat tanya (Interrogative):\n"If the airline hadn\'t gone bankrupt, it would have been operating for twenty years by that anniversary."',
    options: [
      'Would the airline have been operating for twenty years by that anniversary if it hadn\'t gone bankrupt?',
      'Had the airline would have been operating for twenty years by that anniversary if it hadn\'t gone bankrupt?',
      'Did the airline have been operating for twenty years by that anniversary if it hadn\'t gone bankrupt?',
      'Would have been the airline operating for twenty years by that anniversary if it hadn\'t gone bankrupt?'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'Would the airline have been operating for twenty years by that anniversary if it hadn\'t gone bankrupt?',
    questionType: 'interrogative',
    questionTypeLabel: 'Transformasi Kalimat (Kalimat Tanya)',
    categoryTag: 'Past Future Perfect Continuous Tense',
    explanation: 'Kalimat tanya: Would + Subject + have + been + Verb-ing ("Would the airline have been operating...?").'
  },
  {
    id: 'pfpc-7',
    question: 'Susun kata-kata acak berikut menjadi kalimat yang padu dan benar:\nhave / years / been / living / would / there / for / they / ten',
    options: [
      'They would have been living there for ten years.',
      'They would living have been there for ten years.',
      'There they would have living been for ten years.',
      'For ten years they have would been living there.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'They would have been living there for ten years.',
    scrambleWords: ['They', 'would', 'have', 'been', 'living', 'there', 'for', 'ten', 'years'],
    questionType: 'word-scramble',
    questionTypeLabel: 'Menyusun Kata Acak',
    categoryTag: 'Past Future Perfect Continuous Tense',
    explanation: 'Struktur: Subject (They) + would + have + been + V-ing (living) + adverb (there) + duration (for ten years).'
  },
  {
    id: 'pfpc-8',
    question: 'Had the treaty remained in effect, the two nations ______ in peace for over half a century by next year.',
    options: ['lived', 'had been living', 'would have been living', 'will have lived'],
    correctAnswerIndex: 2,
    correctAnswerText: 'would have been living',
    questionType: 'context',
    questionTypeLabel: 'Soal Konteks',
    categoryTag: 'Past Future Perfect Continuous Tense',
    explanation: 'Pengandaian fakta masa lalu yang seandainya berlanjut hingga waktu sekarang/mendatang ("for over half a century") -> "would have been living".'
  },
  {
    id: 'pfpc-9',
    question: 'Terjemahkan ke bahasa Inggris:\n"Seandainya penerbangan itu tidak dibatalkan, kami seharusnya sudah akan sedang terbang selama enam jam sekarang."',
    options: [
      'If the flight hadn\'t been canceled, we would have been flying for six hours by now.',
      'If the flight wasn\'t canceled, we will have been flying for six hours by now.',
      'If the flight hadn\'t been canceled, we would have flown for six hours by now.',
      'If the flight hadn\'t canceled, we were flying for six hours by now.'
    ],
    correctAnswerIndex: 0,
    correctAnswerText: 'If the flight hadn\'t been canceled, we would have been flying for six hours by now.',
    questionType: 'translation',
    questionTypeLabel: 'Terjemahan Indonesia–Inggris',
    categoryTag: 'Past Future Perfect Continuous Tense',
    explanation: 'Pengandaian durasi berkelanjutan yang seharusnya sedang berlangsung saat ini seandainya peristiwa lampau tidak menggagalkannya -> "would have been flying".'
  },
  {
    id: 'pfpc-10',
    question: 'By that November, if the research grant ______ (not/expire), the team would have been collecting climate data for a whole decade.',
    options: ['had not expired', 'did not expire', 'has not expired', 'would not expire'],
    correctAnswerIndex: 0,
    correctAnswerText: 'had not expired',
    acceptableAnswers: ['had not expired', "hadn't expired"],
    questionType: 'complex-clause',
    questionTypeLabel: 'Soal Kompleks (Klausa Gabungan)',
    categoryTag: 'Past Future Perfect Continuous Tense',
    explanation: 'Klausa syarat pengandaian lampau ("if ...") berpasangan dengan klausa konsekuensi Past Future Perfect Continuous ("would have been collecting") -> Past Perfect ("had not expired").'
  }
];
