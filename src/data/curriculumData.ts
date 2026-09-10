import { LessonItem, ListeningItem, MedievalVocabItem } from '../types';
import { UTBK_2026_QUESTIONS } from './utbkQuestions';

export { UTBK_2026_QUESTIONS };

export const ALL_12_TENSES: LessonItem[] = [
  {
    id: 'tense-1',
    category: 'tenses',
    title: 'Simple Present Tense',
    chapterNumber: 1,
    gradeLevel: 'X',
    description: 'Expressing general truths, habits, and permanent scientific facts.',
    durationMinutes: 20,
    formula: '(+) S + V1 (-s/-es) | (-) S + do/does + not + V1 | (?) Do/Does + S + V1?',
    explanation: 'Simple Present Tense digunakan untuk menyatakan fakta umum (general truths), kebiasaan rutin (habitual actions), serta kebenaran ilmiah yang bersifat konstan. Dalam penulisan akademik, tenses ini digunakan pada bagian tinjauan pustaka, tesis, dan kutipan teori.',
    academicNotes: 'Dalam esai dan jurnal ilmiah, gunakan Simple Present Tense saat merujuk pada teori umum atau temuan peneliti yang diakui sebagai fakta universal (misal: "Research demonstrates that...").',
    examples: [
      { english: 'Photosynthesis converts light energy into chemical energy.', indonesian: 'Fotosintesis mengubah energi cahaya menjadi energi kimia.', usageNote: 'Scientific fact (fakta ilmiah)' },
      { english: 'The university offers comprehensive scholarship programs for high-achieving students.', indonesian: 'Universitas tersebut menawarkan program beasiswa komprehensif untuk siswa berprestasi.', usageNote: 'General state (pernyataan umum)' },
      { english: 'Economists analyze market trends to predict financial stability.', indonesian: 'Para ekonom menganalisis tren pasar untuk memprediksi stabilitas keuangan.', usageNote: 'Habitual professional action' }
    ],
    quizQuestions: [
      {
        id: 'q-sp-1',
        question: 'Water _____ at 100 degrees Celsius under standard atmospheric pressure.',
        options: ['boil', 'boils', 'is boiling', 'has boiled'],
        correctAnswerIndex: 1,
        explanation: 'Fakta ilmiah universal menggunakan Simple Present Tense dengan subjek tunggal "Water" -> "boils".'
      },
      {
        id: 'q-sp-2',
        question: 'Academic researchers frequently _____ their hypotheses through empirical experiments.',
        options: ['validated', 'validating', 'validate', 'has validated'],
        correctAnswerIndex: 2,
        explanation: 'Subjek jamak "Academic researchers" + kata keterangan frekuensi "frequently" membutuhkan V1 bentuk jamak "validate".'
      }
    ]
  },
  {
    id: 'tense-2',
    category: 'tenses',
    title: 'Present Continuous Tense',
    chapterNumber: 2,
    gradeLevel: 'X',
    description: 'Describing actions happening right now or current ongoing trends.',
    durationMinutes: 20,
    formula: '(+) S + am/is/are + V-ing | (-) S + am/is/are + not + V-ing | (?) Am/Is/Are + S + V-ing?',
    explanation: 'Present Continuous Tense menggambarkan kegiatan yang sedang berlangsung pada saat ini atau tren perkembangan kontemporer yang sedang mengalami perubahan.',
    academicNotes: 'Hindari penggunaan kata kerja statif (stative verbs) seperti *know, believe, understand, belong* dalam bentuk continuous.',
    examples: [
      { english: 'Global temperatures are rising due to increased carbon emissions.', indonesian: 'Suhu global sedang meningkat akibat peningkatan emisi karbon.', usageNote: 'Ongoing trend (tren masa kini)' },
      { english: 'The committee is currently evaluating new environmental policies.', indonesian: 'Komite saat ini sedang mengevaluasi kebijakan lingkungan yang baru.', usageNote: 'Action happening around now' }
    ],
    quizQuestions: [
      {
        id: 'q-pc-1',
        question: 'Look! The research team _____ samples in the central laboratory.',
        options: ['analyzes', 'is analyzing', 'analyzed', 'has analyzed'],
        correctAnswerIndex: 1,
        explanation: 'Kata petunjuk "Look!" mengindikasikan aksi yang sedang berlangsung saat ini (Present Continuous).'
      }
    ]
  },
  {
    id: 'tense-3',
    category: 'tenses',
    title: 'Present Perfect Tense',
    chapterNumber: 3,
    gradeLevel: 'X',
    description: 'Connecting past achievements or events with present relevance.',
    durationMinutes: 25,
    formula: '(+) S + have/has + V3 | (-) S + have/has + not + V3 | (?) Have/Has + S + V3?',
    explanation: 'Present Perfect Tense menghubungkan peristiwa yang terjadi di masa lalu dengan akibat atau relevansi pada masa sekarang tanpa menyebutkan waktu spesifik.',
    academicNotes: 'Digunakan dalam jurnal akademik saat meninjau literatur terdahulu (e.g., "Several studies have shown that...").',
    examples: [
      { english: 'Scientists have discovered a novel compound in marine organisms.', indonesian: 'Para ilmuwan telah menemukan senyawa baru pada organisme laut.', usageNote: 'Past event with present result' },
      { english: 'The government has implemented stricter regulations on industrial waste.', indonesian: 'Pemerintah telah menerapkan peraturan yang lebih ketat tentang limbah industri.', usageNote: 'Completed action with ongoing effect' }
    ],
    quizQuestions: [
      {
        id: 'q-pp-1',
        question: 'Recent medical studies _____ significant progress in cancer immunotherapy.',
        options: ['have made', 'made', 'are making', 'will make'],
        correctAnswerIndex: 0,
        explanation: 'Subjek jamak "Recent medical studies" merujuk pada temuan yang telah dicapai dan relevan hingga kini (have made).'
      }
    ]
  },
  {
    id: 'tense-4',
    category: 'tenses',
    title: 'Present Perfect Continuous Tense',
    chapterNumber: 4,
    gradeLevel: 'X',
    description: 'Expressing actions that started in the past and continue into the present.',
    durationMinutes: 20,
    formula: '(+) S + have/has + been + V-ing | (-) S + have/has + not + been + V-ing | (?) Have/Has + S + been + V-ing?',
    explanation: 'Present Perfect Continuous Tense menyoroti durasi atau proses keberlanjutan suatu aksi yang dimulai di masa lalu dan masih berlangsung hingga saat ini.',
    academicNotes: 'Sering dipadukan dengan kata depan durasi *for* (durasi waktu) dan *since* (titik awal waktu).',
    examples: [
      { english: 'The scholars have been researching renewable energy solutions for over a decade.', indonesian: 'Para Cendekiawan telah meneliti solusi energi terbarukan selama lebih dari satu dekade.', usageNote: 'Action duration with "for"' },
      { english: 'She has been studying international law since 2022.', indonesian: 'Dia telah mempelajari hukum internasional sejak tahun 2022.', usageNote: 'Starting point with "since"' }
    ],
    quizQuestions: [
      {
        id: 'q-ppc-1',
        question: 'The engineers _____ on the hydroelectric project since last January.',
        options: ['work', 'have worked', 'have been working', 'worked'],
        correctAnswerIndex: 2,
        explanation: 'Penggunaan "since last January" dengan fokus keberlanjutan proses menggunakan Present Perfect Continuous.'
      }
    ]
  },
  {
    id: 'tense-5',
    category: 'tenses',
    title: 'Simple Past Tense',
    chapterNumber: 5,
    gradeLevel: 'XI',
    description: 'Describing completed historical events or past specific research methodology.',
    durationMinutes: 20,
    formula: '(+) S + V2 | (-) S + did + not + V1 | (?) Did + S + V1?',
    explanation: 'Simple Past Tense menyatakan peristiwa yang dimulai dan diselesaikan sepenuhnya pada waktu tertentu di masa lalu.',
    academicNotes: 'Tense ini adalah standar utama saat menuliskan bab Metode Penelitian (Methodology) dan Hasil Penelitian (Results) dalam laporan ilmiah.',
    examples: [
      { english: 'Alexander Fleming discovered penicillin in 1928.', indonesian: 'Alexander Fleming menemukan penisilin pada tahun 1928.', usageNote: 'Historical fact with specific time' },
      { english: 'The researchers gathered data through structured online surveys.', indonesian: 'Para peneliti mengumpulkan data melalui survei daring terstruktur.', usageNote: 'Research methodology' }
    ],
    quizQuestions: [
      {
        id: 'q-past-1',
        question: 'The conference on artificial intelligence _____ place in Geneva two months ago.',
        options: ['takes', 'took', 'has taken', 'had taken'],
        correctAnswerIndex: 1,
        explanation: 'Keterangan waktu spesifik "two months ago" mewajibkan kata kerja bentuk kedua (V2): "took".'
      }
    ]
  },
  {
    id: 'tense-6',
    category: 'tenses',
    title: 'Past Continuous Tense',
    chapterNumber: 6,
    gradeLevel: 'XI',
    description: 'Showing ongoing actions at a specific moment in the past.',
    durationMinutes: 20,
    formula: '(+) S + was/were + V-ing | (-) S + was/were + not + V-ing | (?) Was/Were + S + V-ing?',
    explanation: 'Past Continuous Tense digunakan untuk menggambarkan aksi yang sedang terjadi di masa lalu ketika peristiwa lain menyela atau terjadi bersamaan.',
    academicNotes: 'Sering dipadukan dengan klausa *when* (+ Simple Past) atau *while* (+ Past Continuous).',
    examples: [
      { english: 'The team was conducting the experiment when the power failure occurred.', indonesian: 'Tim sedang melakukan eksperimen ketika pemadaman listrik terjadi.', usageNote: 'Interrupted past action' },
      { english: 'While the analyst was reviewing the financial report, new data arrived.', indonesian: 'Saat analis sedang meninjau laporan keuangan, data baru tiba.', usageNote: 'Concurrent past background action' }
    ],
    quizQuestions: [
      {
        id: 'q-pascont-1',
        question: 'While the professor _____ the lecture, a fire alarm rang.',
        options: ['delivers', 'was delivering', 'has delivered', 'is delivering'],
        correctAnswerIndex: 1,
        explanation: 'Konjungsi "While" diikuti oleh klausa Past Continuous (was delivering) sebelum disela aksi Simple Past (rang).'
      }
    ]
  },
  {
    id: 'tense-7',
    category: 'tenses',
    title: 'Past Perfect Tense',
    chapterNumber: 7,
    gradeLevel: 'XI',
    description: 'Indicating an action completed prior to another past event.',
    durationMinutes: 25,
    formula: '(+) S + had + V3 | (-) S + had + not + V3 | (?) Had + S + V3?',
    explanation: 'Past Perfect Tense menyatakan bahwa suatu aksi telah selesai dilakukan sebelum aksi lain terjadi di masa lalu.',
    academicNotes: 'Membantu menyusun urutan kronologis yang jelas dalam teks naratif sejarah dan uraian latar belakang masalah.',
    examples: [
      { english: 'By the time the rescue team arrived, the local authorities had evacuated the area.', indonesian: 'Pada saat tim penyelamat tiba, pihak berwenang setempat telah mengevakuasi area tersebut.', usageNote: 'Earlier past action' },
      { english: 'She had completed her master thesis before she applied for the PhD position.', indonesian: 'Dia telah menyelesaikan tesis magisternya sebelum mendaftar posisi doktor.', usageNote: 'Pre-existing past accomplishment' }
    ],
    quizQuestions: [
      {
        id: 'q-pastperf-1',
        question: 'The manuscript _____ thoroughly reviewed before it was published in the journal.',
        options: ['had been', 'has been', 'was', 'is'],
        correctAnswerIndex: 0,
        explanation: 'Pengulasan naskah terjadi terlebih dahulu sebelum publikasi di masa lalu, sehingga bentuk pasif Past Perfect digunakan: "had been reviewed".'
      }
    ]
  },
  {
    id: 'tense-8',
    category: 'tenses',
    title: 'Past Perfect Continuous Tense',
    chapterNumber: 8,
    gradeLevel: 'XI',
    description: 'Highlighting the duration of an ongoing action before a past milestone.',
    durationMinutes: 20,
    formula: '(+) S + had + been + V-ing | (-) S + had + not + been + V-ing | (?) Had + S + been + V-ing?',
    explanation: 'Past Perfect Continuous Tense menekankan durasi proses suatu aktivitas yang berlangsung secara konsisten sebelum sebuah titik waktu tertentu di masa lalu.',
    academicNotes: 'Tense ini menunjukkan ketekunan proses penelitian yang akhirnya terganggu atau memuncak pada suatu hasil.',
    examples: [
      { english: 'The astronomers had been observing the comet for months before it disintegrated.', indonesian: 'Para astronom telah mengamati komet tersebut selama berbulan-bulan sebelum komet itu hancur.', usageNote: 'Duration prior to a past point' }
    ],
    quizQuestions: [
      {
        id: 'q-ppc2-1',
        question: 'They _____ for three hours before the bus finally arrived.',
        options: ['were waiting', 'had been waiting', 'have been waiting', 'wait'],
        correctAnswerIndex: 1,
        explanation: 'Durasi menunggu 3 jam sebelum kedatangan bus di masa lalu diungkapkan dengan Past Perfect Continuous.'
      }
    ]
  },
  {
    id: 'tense-9',
    category: 'tenses',
    title: 'Simple Future Tense',
    chapterNumber: 9,
    gradeLevel: 'XII',
    description: 'Expressing future predictions, formal plans, and academic hypotheses.',
    durationMinutes: 20,
    formula: '(+) S + will + V1 / S + am/is/are + going to + V1 | (-) S + will not + V1',
    explanation: 'Simple Future Tense digunakan untuk menyatakan perkiraan, keputusan mendadak, atau rencana masa depan.',
    academicNotes: 'Gunakan *will* untuk hipotesis dan estimasi formal. Gunakan *be going to* untuk rencana yang didasari bukti objektif yang ada saat ini.',
    examples: [
      { english: 'Advancements in biotechnology will transform future healthcare systems.', indonesian: 'Kemajuan bioteknologi akan mentransformasi sistem pelayanan kesehatan masa depan.', usageNote: 'Formal prediction' },
      { english: 'The university is going to construct a new digital library next year.', indonesian: 'Universitas akan membangun perpustakaan digital baru tahun depan.', usageNote: 'Planned decision' }
    ],
    quizQuestions: [
      {
        id: 'q-sf-1',
        question: 'According to economic projections, inflation rates _____ stabilize by the end of Q4.',
        options: ['will', 'would', 'did', 'have'],
        correctAnswerIndex: 0,
        explanation: 'Proyeksi resmi masa depan menggunakan auxilary modal "will" + V1.'
      }
    ]
  },
  {
    id: 'tense-10',
    category: 'tenses',
    title: 'Future Continuous Tense',
    chapterNumber: 10,
    gradeLevel: 'XII',
    description: 'Describing actions that will be in progress at a specific time in the future.',
    durationMinutes: 20,
    formula: '(+) S + will + be + V-ing | (-) S + will + not + be + V-ing | (?) Will + S + be + V-ing?',
    explanation: 'Future Continuous Tense menyatakan aksi yang diprediksikan sedang berlangsung pada suatu titik waktu tertentu di masa mendatang.',
    academicNotes: 'Sering digunakan dalam jadwal simposium, rencana eksperimen, dan proyeksi agenda ilmiah.',
    examples: [
      { english: 'At this time tomorrow, the delegates will be discussing the climate pact.', indonesian: 'Pada waktu yang sama besok, para utusan akan sedang mendiskusikan pakta iklim.', usageNote: 'Future ongoing action' }
    ],
    quizQuestions: [
      {
        id: 'q-fc-1',
        question: 'Next week at 10 AM, the candidates _____ their oral defenses.',
        options: ['will present', 'will be presenting', 'have presented', 'presented'],
        correctAnswerIndex: 1,
        explanation: 'Spesifikasi waktu masa depan "Next week at 10 AM" menentukan pemakaian Future Continuous (will be presenting).'
      }
    ]
  },
  {
    id: 'tense-11',
    category: 'tenses',
    title: 'Future Perfect Tense',
    chapterNumber: 11,
    gradeLevel: 'XII',
    description: 'Expressing an action that will be completed prior to a future deadline.',
    durationMinutes: 25,
    formula: '(+) S + will + have + V3 | (-) S + will + not + have + V3 | (?) Will + S + have + V3?',
    explanation: 'Future Perfect Tense menyatakan bahwa suatu target atau aksi diproyeksikan telah rampung sebelum waktu batas (deadline) di masa depan.',
    academicNotes: 'Sangat vital dalam perumusan target proposal proyek (e.g., "By December 2026, the milestone will have been achieved").',
    examples: [
      { english: 'By the year 2030, the city will have reduced its carbon footprint by 40%.', indonesian: 'Menjelang tahun 2030, kota tersebut akan telah mengurangi jejak karbonnya sebesar 40%.', usageNote: 'Deadline with "By the year 2030"' }
    ],
    quizQuestions: [
      {
        id: 'q-fp-1',
        question: 'By the time you graduate, the university _____ its new campus expansion.',
        options: ['finishes', 'will finish', 'will have finished', 'has finished'],
        correctAnswerIndex: 2,
        explanation: 'Penggunaan klausa batas waktu "By the time you graduate" membutuhkan Future Perfect: "will have finished".'
      }
    ]
  },
  {
    id: 'tense-12',
    category: 'tenses',
    title: 'Future Perfect Continuous Tense',
    chapterNumber: 12,
    gradeLevel: 'XII',
    description: 'Showing the duration of an ongoing activity up to a future point.',
    durationMinutes: 20,
    formula: '(+) S + will + have + been + V-ing | (-) S + will + not + have + been + V-ing',
    explanation: 'Future Perfect Continuous Tense menekankan lamanya suatu aksi yang akan terus berlangsung hingga mencapai momen tertentu di masa depan.',
    academicNotes: 'Digunakan saat mengukur milestone rekam jejak pengabdian atau eksperimen berskala panjang.',
    examples: [
      { english: 'By next November, Dr. Aris will have been teaching linguistics for 25 years.', indonesian: 'Menjelang November depan, Dr. Aris akan telah mengajar linguistik selama 25 tahun.', usageNote: 'Future cumulative duration' }
    ],
    quizQuestions: [
      {
        id: 'q-fpc-1',
        question: 'In December, she _____ at this research institute for ten full years.',
        options: ['will work', 'will be working', 'will have been working', 'has worked'],
        correctAnswerIndex: 2,
        explanation: 'Kombinasi titik waktu "In December" dan akumulasi durasi "for ten full years" menggunakan Future Perfect Continuous.'
      }
    ]
  }
];

export const MEDIEVAL_VOCABULARY_FLASHCARDS: MedievalVocabItem[] = [
  {
    id: 'med-1',
    phrase: 'How art thou this day?',
    meaning: 'Apa kabarmu hari ini?',
    pronounce: '/haʊ ɑːrt ðaʊ ðɪs deɪ/',
    phonetic: 'How art dau dis dei?',
    category: 'Salam & Sapaan',
    categoryEn: 'Greetings & Salutations',
    modernEnglish: 'How are you today?',
    historicalNote: 'Sapaan sopan khas Era Pertengahan. Kata "art" adalah konjugasi "are" untuk subjek orang kedua tunggal "thou" (kamu/engkau).',
    breakdown: [
      { term: 'art', explanation: 'Bentuk kuno (Archaic) dari "are" khusus untuk subjek "thou".' },
      { term: 'thou', explanation: 'Kata ganti orang kedua tunggal informal/akrab (you subject).' },
      { term: 'this day', explanation: 'Hari ini (today).' }
    ]
  },
  {
    id: 'med-2',
    phrase: 'Whither goest thou?',
    meaning: 'Mau kemana kamu?',
    pronounce: '/ˈwɪð.ər ˈɡoʊ.ɪst ðaʊ/',
    phonetic: 'Wi-der go-ist dau?',
    category: 'Aktivitas & Pertanyaan',
    categoryEn: 'Daily Life & Queries',
    modernEnglish: 'Where are you going?',
    historicalNote: '"Whither" secara spesifik berarti "ke arah mana / ke mana" (to where), sedangkan akhiran "-est" adalah infleksi kata kerja untuk "thou".',
    breakdown: [
      { term: 'whither', explanation: 'Ke mana / to what place.' },
      { term: 'goest', explanation: 'Bentuk kata kerja "go" untuk subjek "thou".' },
      { term: 'thou', explanation: 'Kamu / engkau (subjek).' }
    ]
  },
  {
    id: 'med-3',
    phrase: 'I loveth thee',
    meaning: 'Aku mencintaimu',
    pronounce: '/aɪ ˈlʌv.ɪθ ðiː/',
    phonetic: 'Ai lav-ith dii',
    category: 'Ungkapan Kasih & Sopan Santun',
    categoryEn: 'Affection & Courtesies',
    modernEnglish: 'I love you',
    historicalNote: 'Ungkapan perasaan mendalam bernuansa puisi abad pertengahan. Kata "thee" adalah kata ganti orang kedua sebagai objek ("you" object).',
    breakdown: [
      { term: 'loveth', explanation: 'Bentuk arkais dari "love" dengan akhiran puitis "-eth".' },
      { term: 'thee', explanation: 'Kamu / dirimu (sebagai objek kalimat).' }
    ]
  },
  {
    id: 'med-4',
    phrase: 'Verily, I hunger greatly',
    meaning: 'Aku lapar banget',
    pronounce: '/ˈvɛr.ɪ.li aɪ ˈhʌŋ.ɡər ˈɡreɪt.li/',
    phonetic: 'Ve-ri-li, ai hang-ger greit-li',
    category: 'Kebutuhan & Ungkapan Harian',
    categoryEn: 'Daily Life & Expressions',
    modernEnglish: 'Truly, I am very hungry',
    historicalNote: '"Verily" berasal dari bahasa Prancis Kuno "verai" (benar/sungguh), sering digunakan sebagai penegas kejujuran di era Abad Pertengahan.',
    breakdown: [
      { term: 'verily', explanation: 'Sungguh / sesungguhnya (truly, in truth).' },
      { term: 'hunger', explanation: 'Mengalami rasa lapar (digunakan sebagai kata kerja).' },
      { term: 'greatly', explanation: 'Sangat / teramat sangat (very much).' }
    ]
  },
  {
    id: 'med-5',
    phrase: 'Good morrow, mine friend',
    meaning: 'Selamat pagi temanku',
    pronounce: '/ɡʊd ˈmɒr.oʊ maɪn frend/',
    phonetic: 'Gud mo-ro, main frend',
    category: 'Salam & Sapaan',
    categoryEn: 'Greetings & Salutations',
    modernEnglish: 'Good morning, my friend',
    historicalNote: '"Morrow" adalah istilah kuno untuk pagi hari atau hari esok. Kata "mine" digunakan sebelum kata benda yang diawali huruf konsonan atau vokal dalam puisi kuno.',
    breakdown: [
      { term: 'good morrow', explanation: 'Selamat pagi (standar salam pagi Abad Pertengahan).' },
      { term: 'mine', explanation: 'Bentuk kepunyaan puitis dari "my" (milikku).' },
      { term: 'friend', explanation: 'Teman / sahabat.' }
    ]
  },
  {
    id: 'med-6',
    phrase: 'Prithee, wilt thou aid me?',
    meaning: 'Boleh tolong aku?',
    pronounce: '/ˈprɪð.iː wɪlt ðaʊ eɪd miː/',
    phonetic: 'Pri-dii, wilt dau eid mii?',
    category: 'Permohonan & Sopan Santun',
    categoryEn: 'Requests & Courtesies',
    modernEnglish: 'Please, will you help me?',
    historicalNote: '"Prithee" adalah singkatan dari frasa "I pray thee" (aku mohon kepadamu), menjadi padanan kata "please" dalam bahasa Inggris klasik.',
    breakdown: [
      { term: 'prithee', explanation: 'Mohon / tolonglah (please / I pray thee).' },
      { term: 'wilt', explanation: 'Bentuk modal "will" untuk subjek "thou".' },
      { term: 'aid', explanation: 'Membantu / menolong (help).' }
    ]
  },
  {
    id: 'med-7',
    phrase: 'Gramercy full much',
    meaning: 'Terimakasih banyak',
    pronounce: '/ɡrəˈmɜː.si fʊl mʌtʃ/',
    phonetic: 'Gra-mer-si ful mac',
    category: 'Ungkapan Rasa Syukur',
    categoryEn: 'Gratitude & Courtesies',
    modernEnglish: 'Thank you very much',
    historicalNote: '"Gramercy" diserap dari bahasa Anglo-Prancis "grand merci" (banyak terima kasih), lazim diucapkan para ksatria dan bangsawan abad ke-14.',
    breakdown: [
      { term: 'gramercy', explanation: 'Terima kasih besar (grand mercy / thanks).' },
      { term: 'full much', explanation: 'Sangat banyak / teramat sangat.' }
    ]
  },
  {
    id: 'med-8',
    phrase: 'Until the morrow, fare thee well',
    meaning: 'Sampai ketemu besok ya',
    pronounce: '/ənˈtɪl ðə ˈmɒr.oʊ feər ðiː wɛl/',
    phonetic: 'An-til de mo-ro, fer dii wel',
    category: 'Perpisahan & Pamit',
    categoryEn: 'Partings & Farewells',
    modernEnglish: 'Until tomorrow, farewell and take care',
    historicalNote: '"Fare thee well" secara harfiah berarti "semoga perjalanan/keadaanmu berlangsung dengan baik" (fare well).',
    breakdown: [
      { term: 'until the morrow', explanation: 'Hingga esok hari tiba.' },
      { term: 'fare', explanation: 'Berjalan / menempuh keadaan (to travel or get along).' },
      { term: 'fare thee well', explanation: 'Selamat jalan / jaga dirimu baik-baik.' }
    ]
  },
  {
    id: 'med-9',
    phrase: 'Fare thee well till we meet again',
    meaning: 'Sampai jumpa lagi',
    pronounce: '/feər ðiː wɛl tɪl wiː miːt əˈɡɛn/',
    phonetic: 'Fer dii wel til wi miit e-gen',
    category: 'Perpisahan & Pamit',
    categoryEn: 'Partings & Farewells',
    modernEnglish: 'Goodbye until we meet again',
    historicalNote: 'Frasa pamitan penuh kehangatan antar sahabat atau ksatria yang akan menempuh perjalanan jauh.',
    breakdown: [
      { term: 'fare thee well', explanation: 'Selamat tinggal / semoga sehat sentosa.' },
      { term: 'till', explanation: 'Bentuk singkatan dari "until" (hingga/sampai).' },
      { term: 'we meet again', explanation: 'Kita berjumpa kembali.' }
    ]
  },
  {
    id: 'med-10',
    phrase: 'Thou art most fair this day',
    meaning: 'Kamu cantik banget hari ini',
    pronounce: '/ðaʊ ɑːrt moʊst feər ðɪs deɪ/',
    phonetic: 'Dau art mos fer dis dei',
    category: 'Pujian & Sopan Santun',
    categoryEn: 'Compliments & Courtesies',
    modernEnglish: 'You look so beautiful / fair today',
    historicalNote: '"Fair" dalam bahasa Inggris pertengahan bermakna elok, rupawan, suci, atau menawan hati.',
    breakdown: [
      { term: 'thou art', explanation: 'Kamu adalah (you are).' },
      { term: 'most fair', explanation: 'Sangat cantik / amat rupawan.' },
      { term: 'this day', explanation: 'Hari ini.' }
    ]
  },
  {
    id: 'med-11',
    phrase: "Zounds! 'Tis most wondrous!",
    meaning: 'Itu keren banget!',
    pronounce: '/zaʊndz tɪz moʊst ˈwʌn.drəs/',
    phonetic: 'Zaundz! Tiz mos wan-dras!',
    category: 'Kekaguman & Seruan',
    categoryEn: 'Exclamations & Wonder',
    modernEnglish: 'Wow! It is truly extraordinary!',
    historicalNote: '"Zounds" adalah eufemisme seruan kekaguman atau keterkejutan dramatis. "\'Tis" adalah kontraksi dari "It is".',
    breakdown: [
      { term: 'zounds', explanation: 'Wah! Astaga! (seruan keterkejutan / kekaguman).' },
      { term: "'tis", explanation: 'Bentuk singkatan kuno dari "it is".' },
      { term: 'most wondrous', explanation: 'Sangat menakjubkan / luar biasa mengagumkan.' }
    ]
  },
  {
    id: 'med-12',
    phrase: 'I have missed thee sorely',
    meaning: 'Aku kangen kamu',
    pronounce: '/aɪ hæv mɪst ðiː ˈsɔːr.li/',
    phonetic: 'Ai hev mist dii sor-li',
    category: 'Rasa Rindu & Kasih',
    categoryEn: 'Affection & Longing',
    modernEnglish: 'I have missed you dearly / deeply',
    historicalNote: '"Sorely" berarti sangat mendalam hingga terasa sakit/pedih karena menahan rindu yang lama.',
    breakdown: [
      { term: 'have missed', explanation: 'Telah merindukan (Present Perfect).' },
      { term: 'thee', explanation: 'Dirimu (objek).' },
      { term: 'sorely', explanation: 'Secara mendalam / teramat sangat (dearly, grievously).' }
    ]
  },
  {
    id: 'med-13',
    phrase: 'I am weary, anon to bed I go',
    meaning: 'Aku ngantuk, mau tidur dulu',
    pronounce: '/aɪ æm ˈwɪə.ri əˈnɒn tuː bɛd aɪ ɡoʊ/',
    phonetic: 'Ai em wi-ri, e-non tu bed ai go',
    category: 'Aktivitas Harian',
    categoryEn: 'Daily Life & Routine',
    modernEnglish: 'I am tired / sleepy, soon I will go to bed',
    historicalNote: '"Weary" menandakan rasa letih atau mengantuk berat setelah seharian beraktivitas, sementara "anon" berarti segera/sebentar lagi.',
    breakdown: [
      { term: 'weary', explanation: 'Letih / lelah / mengantuk.' },
      { term: 'anon', explanation: 'Segera / tidak lama lagi (soon / shortly).' },
      { term: 'to bed I go', explanation: 'Aku beranjak ke peraduan tidur.' }
    ]
  },
  {
    id: 'med-14',
    phrase: 'May thy day be filled with mirth',
    meaning: 'Semoga harimu menyenangkan',
    pronounce: '/meɪ ðaɪ deɪ biː fɪld wɪð mɜːθ/',
    phonetic: 'Mei dai dei bi fild wid mert',
    category: 'Doa & Harapan',
    categoryEn: 'Blessings & Wishes',
    modernEnglish: 'May your day be filled with joy and laughter',
    historicalNote: '"Mirth" mengacu pada kegembiraan riang, tawa ceria, dan suasana pesta perayaan.',
    breakdown: [
      { term: 'may thy day', explanation: 'Semoga harimu ("thy" = kepunyaan "your").' },
      { term: 'be filled', explanation: 'Dipenuhi oleh.' },
      { term: 'mirth', explanation: 'Keceriaan, tawa riang, dan kebahagiaan.' }
    ]
  },
  {
    id: 'med-15',
    phrase: "Good e'en to thee",
    meaning: 'Selamat malam',
    pronounce: '/ɡʊd iːn tuː ðiː/',
    phonetic: 'Gud iin tu dii',
    category: 'Salam & Sapaan',
    categoryEn: 'Greetings & Salutations',
    modernEnglish: 'Good evening to you',
    historicalNote: '"E\'en" adalah singkatan puitis abad pertengahan dari kata "evening" (waktu petang / malam hari).',
    breakdown: [
      { term: 'good', explanation: 'Baik / selamat.' },
      { term: "e'en", explanation: 'Bentuk singkatan dari "evening" (malam).' },
      { term: 'to thee', explanation: 'Untukmu / kepadamu.' }
    ]
  },
  {
    id: 'med-16',
    phrase: 'I beseech thee, forgive me',
    meaning: 'Maafin aku ya',
    pronounce: '/aɪ bɪˈsiːtʃ ðiː fərˈɡɪv miː/',
    phonetic: 'Ai bi-siic dii, fer-giv mii',
    category: 'Permohonan Maaf',
    categoryEn: 'Apologies & Courtesies',
    modernEnglish: 'I beg of you, please forgive me',
    historicalNote: '"Beseech" adalah kata kerja bermakna memohon dengan segenap kerendahan hati dan ketulusan jiwa.',
    breakdown: [
      { term: 'beseech', explanation: 'Memohon sungguh-sungguh / mengiba (implore / beg).' },
      { term: 'thee', explanation: 'Kepadamu (objek).' },
      { term: 'forgive me', explanation: 'Ampuni / maafkan aku.' }
    ]
  },
  {
    id: 'med-17',
    phrase: 'Aye, I concur most heartily',
    meaning: 'Aku setuju',
    pronounce: '/aɪ aɪ kənˈkɜːr moʊst ˈhɑːr.tɪ.li/',
    phonetic: 'Ai, ai kon-ker mos har-ti-li',
    category: 'Persetujuan & Respon',
    categoryEn: 'Agreements & Reactions',
    modernEnglish: 'Yes, I agree with all my heart',
    historicalNote: '"Aye" bermakna "ya / setuju", sedangkan "concur" berarti sepaham atau sependapat.',
    breakdown: [
      { term: 'aye', explanation: 'Ya / benar (affirmative answer).' },
      { term: 'concur', explanation: 'Setuju / sependapat (agree).' },
      { term: 'most heartily', explanation: 'Dengan sepenuh hati / secara tulus.' }
    ]
  },
  {
    id: 'med-18',
    phrase: 'Prithee, tarry a moment',
    meaning: 'Tunggu sebentar ya',
    pronounce: '/ˈprɪð.iː ˈtær.i ə ˈmoʊ.mənt/',
    phonetic: 'Pri-dii, te-ri e mo-men',
    category: 'Permohonan & Instruksi',
    categoryEn: 'Requests & Instructions',
    modernEnglish: 'Please, wait for a moment',
    historicalNote: '"Tarry" berarti tinggal, berdiam, atau menunda keberangkatan untuk sementara waktu.',
    breakdown: [
      { term: 'prithee', explanation: 'Tolonglah / mohon (please).' },
      { term: 'tarry', explanation: 'Menunggu sejenak / tinggal diam (wait / delay).' },
      { term: 'a moment', explanation: 'Sebentar / sesaat.' }
    ]
  },
  {
    id: 'med-19',
    phrase: 'I fare well, gramercy for asking',
    meaning: 'Aku baik-baik aja kok',
    pronounce: '/aɪ feər wɛl ɡrəˈmɜː.si fɔːr ˈæsk.ɪŋ/',
    phonetic: 'Ai fer wel, gra-mer-si for es-king',
    category: 'Tanggapan & Sopan Santun',
    categoryEn: 'Responses & Courtesies',
    modernEnglish: 'I am doing well, thank you for asking',
    historicalNote: 'Jawaban sopan bangsawan ketika ditanya mengenai kabar atau kondisi kesehatannya.',
    breakdown: [
      { term: 'I fare well', explanation: 'Keadaanku baik / aku sehat (I am fine).' },
      { term: 'gramercy', explanation: 'Terima kasih (thanks).' },
      { term: 'for asking', explanation: 'Karena telah bertanya / peduli.' }
    ]
  },
  {
    id: 'med-20',
    phrase: 'I am much occupied anon',
    meaning: 'Aku lagi sibuk',
    pronounce: '/aɪ æm mʌtʃ ˈɒk.jə.paɪd əˈnɒn/',
    phonetic: 'Ai em mac ok-yu-paid e-non',
    category: 'Kondisi & Kesibukan',
    categoryEn: 'Daily Life & Status',
    modernEnglish: 'I am very busy right now',
    historicalNote: '"Occupied" menyatakan seseorang sedang terikat tugas atau pekerjaan penting.',
    breakdown: [
      { term: 'much occupied', explanation: 'Sangat sibuk / tersibukkan (very busy).' },
      { term: 'anon', explanation: 'Saat ini / segera (presently / right now).' }
    ]
  },
  {
    id: 'med-21',
    phrase: 'Come, let us away',
    meaning: 'Ayo kita pergi',
    pronounce: '/kʌm lɛt ʌs əˈweɪ/',
    phonetic: 'Kam, let as e-wei',
    category: 'Ajakan & Perjalanan',
    categoryEn: 'Invitations & Movement',
    modernEnglish: "Come on, let's leave / let us depart",
    historicalNote: 'Ajakan untuk segera beranjak atau memulai perjalanan bersama rekan seperjalanan.',
    breakdown: [
      { term: 'come', explanation: 'Mari / ayo.' },
      { term: 'let us', explanation: 'Biarkan kita / mari kita.' },
      { term: 'away', explanation: 'Berangkat / beranjak pergi (depart).' }
    ]
  },
  {
    id: 'med-22',
    phrase: 'Until the morrow, then',
    meaning: 'Sampai ketemu besok',
    pronounce: '/ənˈtɪl ðə ˈmɒr.oʊ ðɛn/',
    phonetic: 'An-til de mo-ro, den',
    category: 'Perpisahan & Pamit',
    categoryEn: 'Partings & Farewells',
    modernEnglish: 'Until tomorrow, then',
    historicalNote: 'Penutup percakapan yang ringkas dan ramah sebelum malam menjelang.',
    breakdown: [
      { term: 'until', explanation: 'Hingga / sampai.' },
      { term: 'the morrow', explanation: 'Esok hari.' },
      { term: 'then', explanation: 'Kalau begitu / demikianlah.' }
    ]
  },
  {
    id: 'med-23',
    phrase: 'I know not, in truth',
    meaning: 'Aku gatau',
    pronounce: '/aɪ noʊ nɒt ɪn truːθ/',
    phonetic: 'Ai no not, in trut',
    category: 'Ungkapan Kejujuran',
    categoryEn: 'Expressions & Honest Replies',
    modernEnglish: "I do not know, in all honesty",
    historicalNote: 'Struktur negasi Bahasa Inggris Pertengahan dan Modern Awal sering meletakkan "not" langsung setelah kata kerja tanpa kata bantu "do" ("I know not" vs "I do not know").',
    breakdown: [
      { term: 'I know not', explanation: 'Aku tidak tahu (kuno: tanpa do/does).' },
      { term: 'in truth', explanation: 'Sejujurnya / sungguh-sungguh.' }
    ]
  },
  {
    id: 'med-24',
    phrase: 'Fret not, good friend',
    meaning: 'Jangan khawatir',
    pronounce: '/frɛt nɒt ɡʊd frend/',
    phonetic: 'Fret not, gud frend',
    category: 'Penenang & Nasihat',
    categoryEn: 'Comfort & Reassurance',
    modernEnglish: "Do not worry, my good friend",
    historicalNote: '"Fret" bermakna gundah gulana, cemas, atau merisaukan sesuatu.',
    breakdown: [
      { term: 'fret not', explanation: 'Jangan cemas / jangan risau (do not worry).' },
      { term: 'good friend', explanation: 'Sahabat yang baik.' }
    ]
  },
  {
    id: 'med-25',
    phrase: 'Many happy returns upon thy day of birth',
    meaning: 'Selamat ulang tahun',
    pronounce: '/ˈmɛn.i ˈhæp.i rɪˈtɜːnz əˈpɒn ðaɪ deɪ ɒv bɜːθ/',
    phonetic: 'Me-ni he-pi ri-ternz e-pon dai dei ov bert',
    category: 'Perayaan & Ucapan Selamat',
    categoryEn: 'Celebrations & Blessings',
    modernEnglish: 'Happy birthday to you',
    historicalNote: 'Ucapan agung untuk mendoakan agar hari kelahiran yang bahagia berulang berkali-kali sepanjang usia panjang.',
    breakdown: [
      { term: 'many happy returns', explanation: 'Banyak keberkahan yang berulang.' },
      { term: 'upon thy day of birth', explanation: 'Pada hari kelahiranmu ("thy" = milikmu).' }
    ]
  }
];

export const VOCABULARY_FLASHCARDS = MEDIEVAL_VOCABULARY_FLASHCARDS;

export const LISTENING_LAB_ITEMS: ListeningItem[] = [
  // KELAS 10 SMA
  {
    id: 'l-10-1',
    title: 'Dialogue: Self-Introduction & School Debate Club',
    gradeLevel: 'X',
    topic: 'Interpersonal Dialogue (Kelas 10)',
    speaker: 'Sarah & David',
    accent: 'General American / Academic English',
    audioText: 'Hello! My name is Sarah. Are you going to join the English Debate Club this semester? Hi Sarah, I am David. Yes, I want to improve my public speaking and critical thinking skills.',
    transcript: [
      { speaker: 'Sarah', text: 'Hello! My name is Sarah. Are you planning to join the English Debate Club this semester?', time: '0:00', gender: 'female' },
      { speaker: 'David', text: 'Hi Sarah, I am David. Yes, absolutely! I want to improve my public speaking confidence and critical thinking skills.', time: '0:12', gender: 'male' },
      { speaker: 'Sarah', text: 'That sounds great. Registration closes this Friday at 3 PM in the student council office.', time: '0:25', gender: 'female' },
      { speaker: 'David', text: 'Thanks for the info, Sarah. I will submit my registration form right after lunch!', time: '0:35', gender: 'male' }
    ],
    questions: [
      {
        id: 'q-l10-1',
        question: 'What is David\'s main reason for joining the English Debate Club?',
        options: [
          'To win sports trophies for the school.',
          'To improve his public speaking confidence and critical thinking skills.',
          'To become the president of the student council.',
          'To skip afternoon classes on Friday.'
        ],
        correctAnswerIndex: 1,
        explanation: 'David menyatakan secara langsung: "I want to improve my public speaking confidence and critical thinking skills."'
      },
      {
        id: 'q-l10-1-2',
        question: 'When is the final deadline for the debate club registration?',
        options: [
          'Friday at 3 PM at the student council office.',
          'Monday morning before first period.',
          'Next month during the school festival.',
          'Wednesday afternoon in the library.'
        ],
        correctAnswerIndex: 0,
        explanation: 'Sarah memberitahukan bahwa pendaftaran ditutup "this Friday at 3 PM in the student council office."'
      }
    ]
  },
  {
    id: 'l-10-2',
    title: 'Monologue: School Announcement - Independence Day Competition',
    gradeLevel: 'X',
    topic: 'Official Announcement (Kelas 10)',
    speaker: 'Vice Principal Mr. Handoko',
    accent: 'Indonesian Formal English Accent',
    audioText: 'Attention all students of Grade 10, 11, and 12. In celebration of Independence Day, our school will host the annual Storytelling and Poetry Competition next Thursday.',
    transcript: [
      { speaker: 'Mr. Handoko', text: 'Attention all students of Grade 10, 11, and 12. In celebration of Independence Day, our school will host the annual English Storytelling and Poetry Competition next Thursday.', time: '0:00', gender: 'male' },
      { speaker: 'Mr. Handoko', text: 'The competition will start sharply at 8:00 AM in the Main School Auditorium. All class representatives must register with Mr. Pratama by Tuesday afternoon.', time: '0:20', gender: 'male' },
      { speaker: 'Mr. Handoko', text: 'Certificates, trophies, and educational vouchers will be awarded to the top three winners in each category. Thank you for your attention.', time: '0:40', gender: 'male' }
    ],
    questions: [
      {
        id: 'q-l10-2-1',
        question: 'Where will the English Storytelling Competition take place?',
        options: [
          'In the school basketball court.',
          'In the Main School Auditorium.',
          'In the computer laboratory.',
          'In the school canteen.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Diaturkan dalam pengumuman: "The competition will start sharply at 8:00 AM in the Main School Auditorium."'
      }
    ]
  },
  {
    id: 'l-10-3',
    title: 'Monologue: Recount Text - Educational Field Trip to Borobudur',
    gradeLevel: 'X',
    topic: 'Recount Text (Kelas 10)',
    speaker: 'Maya Salsabila',
    accent: 'Clear Standard English',
    audioText: 'Last month, our tenth-grade class went on an educational field trip to Borobudur Temple in Magelang. We left school at 5 AM by bus.',
    transcript: [
      { speaker: 'Maya', text: 'Last month, our tenth-grade class went on an educational field trip to Borobudur Temple in Magelang. We departed from school at 5 AM by bus.', time: '0:00', gender: 'female' },
      { speaker: 'Maya', text: 'When we arrived at 9 AM, our tour guide explained the historical relief carvings depicting ancient Javanese culture. The view from the top stupa was breathtaking.', time: '0:22', gender: 'female' },
      { speaker: 'Maya', text: 'Overall, it was an unforgettable learning experience because we combined historical knowledge with fun group activities.', time: '0:42', gender: 'female' }
    ],
    questions: [
      {
        id: 'q-l10-3-1',
        question: 'What made the field trip to Borobudur an unforgettable experience for Maya?',
        options: [
          'They bought expensive souvenirs at the market.',
          'It combined historical knowledge with fun group activities.',
          'The bus broke down on the way to Magelang.',
          'They missed the tour guide\'s historical explanation.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Maya merangkum: "It was an unforgettable learning experience because we combined historical knowledge with fun group activities."'
      }
    ]
  },

  // KELAS 11 SMA
  {
    id: 'l-11-1',
    title: 'Dialogue: Expressing Opinion on Digital Screen Time',
    gradeLevel: 'XI',
    topic: 'Opinion & Thought (Kelas 11)',
    speaker: 'Alex & Anita',
    accent: 'Academic English / RP',
    audioText: 'Alex, what is your opinion on limiting smartphone usage during evening study hours? In my view, it significantly improves concentration and retention.',
    transcript: [
      { speaker: 'Alex', text: 'Anita, what is your opinion on limiting smartphone screen time during evening study hours?', time: '0:00', gender: 'male' },
      { speaker: 'Anita', text: 'In my view, putting away phones after 8 PM significantly improves deep focus and memory retention when reviewing exam material.', time: '0:14', gender: 'female' },
      { speaker: 'Alex', text: 'I agree to some extent, but many students rely on educational apps and digital dictionaries on their phones.', time: '0:28', gender: 'male' },
      { speaker: 'Anita', text: 'That is true, Alex. Therefore, using website blockers rather than complete bans might be a more practical solution.', time: '0:42', gender: 'female' }
    ],
    questions: [
      {
        id: 'q-l11-1-1',
        question: 'What practical solution does Anita suggest instead of a complete phone ban?',
        options: [
          'Buying extra textbooks for every subject.',
          'Using website blockers during study time.',
          'Studying exclusively in the school library at night.',
          'Deleting all social media accounts permanently.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Anita menyarankan: "using website blockers rather than complete bans might be a more practical solution."'
      }
    ]
  },
  {
    id: 'l-11-2',
    title: 'Monologue: Formal Invitation - Annual Science & Technology Expo',
    gradeLevel: 'XI',
    topic: 'Formal Invitation (Kelas 11)',
    speaker: 'Principal Dr. Rahardjo',
    accent: 'Formal Academic English',
    audioText: 'On behalf of SMA Tiga Serangkai, it is my distinct honor to invite all parents, educators, and students to our 15th Annual Science and Technology Expo.',
    transcript: [
      { speaker: 'Dr. Rahardjo', text: 'On behalf of SMA Tiga Serangkai, it is my distinct honor to invite all parents, educators, and students to our 15th Annual Science and Technology Expo.', time: '0:00', gender: 'male' },
      { speaker: 'Dr. Rahardjo', text: 'The event will showcase innovative student projects in robotics, environmental biotechnology, and artificial intelligence.', time: '0:20', gender: 'male' },
      { speaker: 'Dr. Rahardjo', text: 'Please RSVP through our school portal by October 10th to confirm your attendance card. We look forward to welcoming you.', time: '0:40', gender: 'male' }
    ],
    questions: [
      {
        id: 'q-l11-2-1',
        question: 'How should invitees confirm their attendance for the expo?',
        options: [
          'By making a phone call to the security guard.',
          'By filling out the RSVP form on the school portal by October 10th.',
          'By sending a handwritten letter to the principal.',
          'By registering in person on the day of the event.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Dr. Rahardjo menyatakan: "Please RSVP through our school portal by October 10th to confirm your attendance card."'
      }
    ]
  },
  {
    id: 'l-11-3',
    title: 'Monologue: Analytical Exposition - Benefits of Exercise for Students',
    gradeLevel: 'XI',
    topic: 'Analytical Exposition (Kelas 11)',
    speaker: 'Coach Brenda Watson',
    accent: 'British Pronunciation',
    audioText: 'Regular physical exercise is crucial for high school students. Firstly, aerobic activity enhances blood flow to the brain, which improves memory retention.',
    transcript: [
      { speaker: 'Coach Watson', text: 'Regular physical exercise is crucial for high school students for several key reasons.', time: '0:00', gender: 'female' },
      { speaker: 'Coach Watson', text: 'Firstly, aerobic movement enhances oxygen delivery to the brain, directly boosting cognitive functions and exam performance.', time: '0:18', gender: 'female' },
      { speaker: 'Coach Watson', text: 'Secondly, exercise reduces cortisol levels, mitigating academic stress and improving sleep quality among teenagers.', time: '0:36', gender: 'female' }
    ],
    questions: [
      {
        id: 'q-l11-3-1',
        question: 'According to Coach Watson, how does aerobic exercise boost cognitive functions?',
        options: [
          'By increasing oxygen delivery to the brain.',
          'By eliminating the need for daily sleep.',
          'By replacing nutritional meals.',
          'By reducing muscle mass.'
        ],
        correctAnswerIndex: 0,
        explanation: 'Coach Watson menjelaskan: "aerobic movement enhances oxygen delivery to the brain, directly boosting cognitive functions."'
      }
    ]
  },

  // KELAS 12 SMA
  {
    id: 'l-12-1',
    title: 'Dialogue: Job Interview & Application Letter Review',
    gradeLevel: 'XII',
    topic: 'Application Letter & Interview (Kelas 12)',
    speaker: 'HR Manager Mrs. Carter & Candidate Ryan',
    accent: 'Professional Business English',
    audioText: 'Good morning, Ryan. I reviewed your application letter for the junior IT internship. Can you elaborate on your experience with Python programming?',
    transcript: [
      { speaker: 'Mrs. Carter', text: 'Good morning, Ryan. I reviewed your cover letter for the junior IT internship. Could you elaborate on your experience with Python programming?', time: '0:00', gender: 'female' },
      { speaker: 'Ryan', text: 'Good morning, Mrs. Carter. During my 12th-grade computer science project, I developed an automated grade calculation script using Python and pandas.', time: '0:18', gender: 'male' },
      { speaker: 'Mrs. Carter', text: 'Impressive initiative, Ryan. How do you manage tight project deadlines when working in a team environment?', time: '0:35', gender: 'female' },
      { speaker: 'Ryan', text: 'I prioritize tasks using agile Trello boards and maintain open daily communication with my teammates.', time: '0:50', gender: 'male' }
    ],
    questions: [
      {
        id: 'q-l12-1-1',
        question: 'What software tool did Ryan build during his 12th-grade computer science project?',
        options: [
          'A video game graphics engine.',
          'An automated grade calculation script using Python.',
          'A mobile e-commerce shopping app.',
          'A hardware microcontroller for cars.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Ryan menjelaskan: "I developed an automated grade calculation script using Python and pandas."'
      }
    ]
  },
  {
    id: 'l-12-2',
    title: 'Monologue: News Item Text - Breakthrough in Renewable Energy',
    gradeLevel: 'XII',
    topic: 'News Item Text (Kelas 12)',
    speaker: 'News Anchor Edward Cole',
    accent: 'BBC British Accent',
    audioText: 'Scientists at Cambridge University have achieved a major milestone in solar energy technology, achieving over 30% solar cell efficiency.',
    transcript: [
      { speaker: 'Edward Cole', text: 'Good evening. Scientists at Cambridge University have achieved a historic milestone in solar technology today.', time: '0:00', gender: 'male' },
      { speaker: 'Edward Cole', text: 'By combining traditional silicon with a novel perovskite crystal layer, the team exceeded 30% energy conversion efficiency in laboratory tests.', time: '0:20', gender: 'male' },
      { speaker: 'Edward Cole', text: 'Industry experts predict this innovation could reduce commercial solar installation costs by nearly 40% within five years.', time: '0:42', gender: 'male' }
    ],
    questions: [
      {
        id: 'q-l12-2-1',
        question: 'What novel material was combined with silicon to achieve higher solar efficiency?',
        options: [
          'Synthetic plastic polymer.',
          'Perovskite crystal layer.',
          'Recycled aluminum mesh.',
          'Purified copper wiring.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Berita menyatakan: "By combining traditional silicon with a novel perovskite crystal layer, the team exceeded 30% energy conversion efficiency."'
      }
    ]
  },
  {
    id: 'l-12-3',
    title: 'Monologue: Explanation Text - Mechanism of Solar Eclipses',
    gradeLevel: 'XII',
    topic: 'Explanation Text (Kelas 12)',
    speaker: 'Dr. Helen Vance',
    accent: 'Academic Scientific English',
    audioText: 'A solar eclipse occurs when the Moon passes directly between the Earth and the Sun, blocking solar light from reaching certain geographic regions on Earth.',
    transcript: [
      { speaker: 'Dr. Helen Vance', text: 'A solar eclipse occurs when the Moon passes precisely between the Earth and the Sun, casting a shadow upon the Earth\'s surface.', time: '0:00', gender: 'female' },
      { speaker: 'Dr. Helen Vance', text: 'For a total solar eclipse to happen, the Moon must be in its new moon phase and aligned perfectly in a straight line with the Earth and Sun.', time: '0:22', gender: 'female' },
      { speaker: 'Dr. Helen Vance', text: 'Observers positioned within the dark central shadow, known as the umbra, experience complete temporary darkness during daytime.', time: '0:45', gender: 'female' }
    ],
    questions: [
      {
        id: 'q-l12-3-1',
        question: 'What is the central, darkest part of the Moon\'s shadow called during a solar eclipse?',
        options: [
          'The Corona.',
          'The Umbra.',
          'The Photosphere.',
          'The Penumbra.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Dr. Vance menjelaskan: "Observers positioned within the dark central shadow, known as the umbra..."'
      }
    ]
  },
  {
    id: 'l-12-4',
    title: 'Dialogue: UTBK Academic Discussion - Artificial Intelligence in Education',
    gradeLevel: 'XII',
    topic: 'UTBK HOTS Discussion (Kelas 12)',
    speaker: 'Prof. Linda & Dr. Marcus',
    accent: 'Higher Education Academic Debate',
    audioText: 'Dr. Marcus, while AI writing tools offer personalized feedback, I am concerned they might reduce students\' inclination to practice deep analytical writing.',
    transcript: [
      { speaker: 'Prof. Linda', text: 'Dr. Marcus, while AI writing assistants offer immediate feedback, I am deeply concerned that students may become overly reliant on them.', time: '0:00', gender: 'female' },
      { speaker: 'Dr. Marcus', text: 'I understand your concern, Professor Linda. However, when integrated as scaffolding tools, AI can assist students in drafting outlines and correcting grammar.', time: '0:22', gender: 'male' },
      { speaker: 'Prof. Linda', text: 'That requires disciplined pedagogy. Without proper guidance, students risk losing the essential cognitive struggle required for original academic synthesis.', time: '0:45', gender: 'female' }
    ],
    questions: [
      {
        id: 'q-l12-4-1',
        question: 'What main risk does Professor Linda highlight regarding students\' reliance on AI writing tools?',
        options: [
          'Students will stop using computer keyboards.',
          'Students risk losing the essential cognitive struggle needed for original academic writing.',
          'School internet bandwidth will be completely consumed.',
          'Teachers will no longer give grades.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Prof. Linda menegaskan bahwa tanpa bimbingan, "students risk losing the essential cognitive struggle required for original academic synthesis."'
      }
    ]
  }
];
