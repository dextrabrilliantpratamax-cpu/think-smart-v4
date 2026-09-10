import { LessonItem } from '../types';
import {
  SIMPLE_PRESENT_QUIZ,
  PRESENT_CONTINUOUS_QUIZ,
  PRESENT_PERFECT_QUIZ,
  PRESENT_PERFECT_CONTINUOUS_QUIZ,
  SIMPLE_PAST_QUIZ,
  PAST_CONTINUOUS_QUIZ,
  PAST_PERFECT_QUIZ,
  PAST_PERFECT_CONTINUOUS_QUIZ,
  SIMPLE_FUTURE_QUIZ,
  FUTURE_CONTINUOUS_QUIZ,
  FUTURE_PERFECT_QUIZ,
  FUTURE_PERFECT_CONTINUOUS_QUIZ,
  PAST_FUTURE_QUIZ,
  PAST_FUTURE_CONTINUOUS_QUIZ,
  PAST_FUTURE_PERFECT_QUIZ,
  PAST_FUTURE_PERFECT_CONTINUOUS_QUIZ
} from './quiz';

export const ALL_16_TENSES: LessonItem[] = [
  {
    id: 'tense-1',
    category: 'tenses',
    title: 'Simple Present Tense',
    chapterNumber: 1,
    gradeLevel: 'All',
    description: 'Menyatakan kebiasaan rutin, fakta umum, atau kebenaran ilmiah yang pasti.',
    durationMinutes: 20,
    formula: 'Positive (+): Subject + Verb 1 (-s/-es)\nNegative (-): Subject + do/does + not + Verb 1\nInterrogative/Unknown (?): Do/Does + Subject + Verb 1?',
    explanation: 'Simple Present Tense adalah bentuk waktu dasar untuk menyatakan **kebiasaan rutin (habitual actions)**, **fakta umum/ilmiah (general truths)**, atau situasi nyata yang selalu berlaku.',
    usageWhen: [
      '**Kebiasaan Rutin (Habitual Actions):** Aktivitas harian yang berulang secara teratur, contoh: "I wake up at 6 AM every day."',
      '**Fakta Umum & Ilmiah (General Truths):** Kebenaran alam semesta yang mutlak, contoh: "The sun rises in the east."',
      '**Jadwal Resmi (Fixed Schedules):** Jadwal transportasi atau agenda resmi, contoh: "The train leaves at 08:00."',
      '**Kondisi Mental & Perasaan (Stative Verbs):** Pikiran atau persepsi yang sedang dirasakan, contoh: "I know the answer."'
    ],
    subjectRules: [
      '**Subjek I / You / We / They / Jamak:** Menggunakan **Verb 1** bentuk dasar tanpa akhiran (contoh: *read, study, eat*). Kata bantu negatif/tanya menggunakan **do / don’t**.',
      '**Subjek He / She / It / Tunggal:** Kata kerja ditambah akhiran **-s / -es** (contoh: *reads, studies, watches*). Kata bantu negatif/tanya menggunakan **does / doesn’t** (kata kerja kembali ke Verb 1 dasar).'
    ],
    timeSignals: ['Every day', 'Every week', 'Always', 'Usually', 'Often', 'Sometimes', 'Seldom', 'Never', 'Once a month', 'On Sundays'],
    academicNotes: 'Dalam penulisan ilmiah, tense ini wajib dipakai pada bagian Tinjauan Pustaka (Literature Review), Tesis, dan pemaparan teori umum.',
    examples: [
      { english: 'She reads scientific journals every morning.', indonesian: 'Dia membaca jurnal ilmiah setiap pagi.', usageNote: 'Kebiasaan rutin' },
      { english: 'Water boils at 100 degrees Celsius.', indonesian: 'Air mendidih pada suhu 100 derajat Celsius.', usageNote: 'Fakta ilmiah' },
      { english: 'Does he study biology in the library?', indonesian: 'Apakah dia belajar biologi di perpustakaan?', usageNote: 'Kalimat tanya' }
    ],
    quizQuestions: SIMPLE_PRESENT_QUIZ
  },
  {
    id: 'tense-2',
    category: 'tenses',
    title: 'Present Continuous Tense',
    chapterNumber: 2,
    gradeLevel: 'All',
    description: 'Menyatakan kegiatan yang sedang berlangsung tepat saat ini atau tren masa kini.',
    durationMinutes: 20,
    formula: 'Positive (+): Subject + am/is/are + Verb-ing\nNegative (-): Subject + am/is/are + not + Verb-ing\nInterrogative/Unknown (?): Am/Is/Are + Subject + Verb-ing?',
    explanation: 'Present Continuous Tense digunakan untuk mendeskripsikan aksi yang **sedang berlangsung detik ini**, situasi sementara, atau perkembangan tren saat ini.',
    usageWhen: [
      '**Aksi Sedang Berlangsung (In Progress Right Now):** Terjadi tepat saat berbicara, contoh: "The students are listening to the teacher."',
      '**Situasi Sementara (Temporary Actions):** Kegiatan sementara bulan/minggu ini, contoh: "She is living in Jakarta this month."',
      '**Rencana Pasti Masa Depan (Fixed Arrangements):** Agenda yang sudah terkonfirmasi, contoh: "We are meeting the principal tomorrow."',
      '**Tren & Perubahan (Current Trends):** Perkembangan zaman, contoh: "Global temperatures are rising."'
    ],
    subjectRules: [
      '**Subjek "I":** Menggunakan to be **am** + **Verb-ing** (contoh: *I am reading*).',
      '**Subjek "He / She / It / Tunggal":** Menggunakan to be **is** + **Verb-ing** (contoh: *She is writing*).',
      '**Subjek "You / We / They / Jamak":** Menggunakan to be **are** + **Verb-ing** (contoh: *They are discussing*).'
    ],
    timeSignals: ['Now', 'Right now', 'At the moment', 'Currently', 'At present', 'Look!', 'Listen!', 'These days', 'This week'],
    academicNotes: 'Hindari penggunaan tense ini pada Stative Verbs (kata kerja perasaan/persepsi seperti: believe, know, understand, prefer, hate).',
    examples: [
      { english: 'The research team is analyzing the lab specimens now.', indonesian: 'Tim peneliti sedang menganalisis spesimen laboratorium sekarang.', usageNote: 'Sedang berlangsung' },
      { english: 'She isn’t working on the project at the moment.', indonesian: 'Dia tidak sedang mengerjakan proyek itu saat ini.', usageNote: 'Kalimat negatif' },
      { english: 'Are you preparing the conference presentation?', indonesian: 'Apakah kamu sedang menyiapkan presentasi konferensi?', usageNote: 'Kalimat tanya' }
    ],
    quizQuestions: PRESENT_CONTINUOUS_QUIZ
  },
  {
    id: 'tense-3',
    category: 'tenses',
    title: 'Present Perfect Tense',
    chapterNumber: 3,
    gradeLevel: 'All',
    description: 'Menyatakan kejadian yang sudah selesai tapi dampak atau hasilnya masih relevan saat ini.',
    durationMinutes: 25,
    formula: 'Positive (+): Subject + have/has + Verb 3\nNegative (-): Subject + have/has + not + Verb 3\nInterrogative/Unknown (?): Have/Has + Subject + Verb 3?',
    explanation: 'Present Perfect Tense menghubungkan **masa lalu dengan masa kini**. Fokus utamanya bukan pada kapan waktu kejadiannya, melainkan pada **hasil, dampak, atau pengalaman** yang telah dicapai.',
    usageWhen: [
      '**Pengalaman Hidup (Life Experiences):** Pernah atau belum pernah melakukan sesuatu, contoh: "I have visited Japan twice."',
      '**Baru Saja Selesai (Recent Actions):** Aktivitas yang baru saja rampung, contoh: "She has just finished her thesis."',
      '**Hasil Terasa Sekarang (Past Action with Present Result):** Efeknya nyata saat ini, contoh: "I have lost my key (sekarang tidak bisa masuk)."'
    ],
    subjectRules: [
      '**Subjek "I / You / We / They / Jamak":** Menggunakan auxiliary **have** + **Verb 3** (Past Participle).',
      '**Subjek "He / She / It / Tunggal":** Menggunakan auxiliary **has** + **Verb 3** (Past Participle).'
    ],
    timeSignals: ['Already (sudah)', 'Just (baru saja)', 'Yet (belum - untuk kalimat negatif/tanya)', 'Ever (pernah)', 'Never (tidak pernah)', 'Since (sejak)', 'For (selama)', 'So far'],
    academicNotes: 'Sangat sering digunakan dalam pengantar karya tulis ilmiah saat merujuk pada penelitian terdahulu yang hasilnya masih diakui.',
    examples: [
      { english: 'Researchers have discovered a breakthrough vaccine.', indonesian: 'Para peneliti telah menemukan vaksin terobosan baru.', usageNote: 'Hasil relevan saat ini' },
      { english: 'She has not submitted her final report yet.', indonesian: 'Dia belum mengumpulkan laporan akhirnya.', usageNote: 'Kalimat negatif dengan yet' },
      { english: 'Have you ever conducted a chemistry experiment?', indonesian: 'Apakah kamu pernah melakukan eksperimen kimia?', usageNote: 'Pertanyaan pengalaman' }
    ],
    quizQuestions: PRESENT_PERFECT_QUIZ
  },
  {
    id: 'tense-4',
    category: 'tenses',
    title: 'Present Perfect Continuous Tense',
    chapterNumber: 4,
    gradeLevel: 'All',
    description: 'Menyatakan kegiatan yang sudah dimulai di masa lalu dan masih terus berlangsung sampai sekarang.',
    durationMinutes: 20,
    formula: 'Positive (+): Subject + have/has + been + Verb-ing\nNegative (-): Subject + have/has + not + been + Verb-ing\nInterrogative/Unknown (?): Have/Has + Subject + been + Verb-ing?',
    explanation: 'Present Perfect Continuous Tense menonjolkan **durasi atau lamanya proses** suatu aktivitas yang dimulai di masa lampau dan saat ini masih aktif dikerjakan.',
    usageWhen: [
      '**Durasi Kegiatan yang Belum Selesai (Duration until Now):** Menekankan rentang waktu kerja, contoh: "He has been coding for 5 hours."',
      '**Aktivitas Baru Berhenti dengan Bukti Nyata:** Bukti fisiknya masih tampak, contoh: "The ground is wet because it has been raining."'
    ],
    subjectRules: [
      '**Subjek "I / You / We / They":** Menggunakan **have + been + Verb-ing**.',
      '**Subjek "He / She / It":** Menggunakan **has + been + Verb-ing**.'
    ],
    timeSignals: ['For two hours (selama 2 jam)', 'Since morning (sejak pagi)', 'All day (sepanjang hari)', 'Lately (akhir-akhir ini)', 'Recently'],
    academicNotes: 'Gunakan tense ini saat ingin menunjukkan proses penelitian atau observasi berkesinambungan yang masih berjalan.',
    examples: [
      { english: 'The scholars have been researching renewable energy for a decade.', indonesian: 'Para cendekiawan telah meneliti energi terbarukan selama satu dekade.', usageNote: 'Menekankan durasi panjang' },
      { english: 'She has been studying since 7 AM.', indonesian: 'Dia telah belajar sejak pukul 7 pagi.', usageNote: 'Titik awal waktu (since)' }
    ],
    quizQuestions: PRESENT_PERFECT_CONTINUOUS_QUIZ
  },
  {
    id: 'tense-5',
    category: 'tenses',
    title: 'Simple Past Tense',
    chapterNumber: 5,
    gradeLevel: 'All',
    description: 'Menyatakan kejadian atau aktivitas yang terjadi dan selesai seluruhnya di masa lampau.',
    durationMinutes: 20,
    formula: 'Positive (+): Subject + Verb 2\nNegative (-): Subject + did + not + Verb 1\nInterrogative/Unknown (?): Did + Subject + Verb 1?',
    explanation: 'Simple Past Tense digunakan untuk menceritakan peristiwa, sejarah, atau aksi yang **sudah tuntas terjadi di masa lalu** pada waktu yang spesifik.',
    usageWhen: [
      '**Aksi Selesai di Waktu Lampau (Finished Events):** Peristiwa tuntas di masa lalu, contoh: "Alexander Fleming discovered penicillin in 1928."',
      '**Kebiasaan Masa Lalu (Past Habits):** Sudah tidak dilakukan lagi sekarang, contoh: "I lived in Solo when I was a child."',
      '**Rangkaian Aksi Berurutan (Sequential Actions):** Cerita kronologis masa lalu, contoh: "He entered the room, sat down, and opened his notebook."'
    ],
    subjectRules: [
      '**Kalimat Positif (+):** Semua subjek (*I, You, He, She, It, We, They*) menggunakan kata kerja bentuk kedua (**Verb 2**), baik reguler (-ed) maupun ireguler.',
      '**Kalimat Negatif (-) & Tanya (?):** Semua subjek menggunakan kata bantu **did / didn’t** dan kata kerja WAJIB kembali ke **Verb 1** dasar.'
    ],
    timeSignals: ['Yesterday', 'Last night', 'Last week', 'Last year', 'Two days ago', 'In 1945', 'Just now', 'Once upon a time'],
    academicNotes: 'Tense standar saat menuliskan bab Metodologi Penelitian (Methodology) dan Hasil Penelitian (Results).',
    examples: [
      { english: 'The committee published the annual report yesterday.', indonesian: 'Komite menerbitkan laporan tahunan kemarin.', usageNote: 'Waktu spesifik (yesterday)' },
      { english: 'He did not attend the conference last Friday.', indonesian: 'Dia tidak menghadiri konferensi hari Jumat lalu.', usageNote: 'Negatif (did not + Verb 1)' },
      { english: 'Did you finish the experiment on time?', indonesian: 'Apakah kamu menyelesaikan eksperimennya tepat waktu?', usageNote: 'Tanya (Did + Subject + Verb 1)' }
    ],
    quizQuestions: SIMPLE_PAST_QUIZ
  },
  {
    id: 'tense-6',
    category: 'tenses',
    title: 'Past Continuous Tense',
    chapterNumber: 6,
    gradeLevel: 'All',
    description: 'Menyatakan kegiatan yang sedang berlangsung pada titik waktu tertentu di masa lalu.',
    durationMinutes: 20,
    formula: 'Positive (+): Subject + was/were + Verb-ing\nNegative (-): Subject + was/were + not + Verb-ing\nInterrogative/Unknown (?): Was/Were + Subject + Verb-ing?',
    explanation: 'Past Continuous Tense mendeskripsikan latar belakang cerita atau aksi yang **sedang berlangsung di masa lalu** ketika disela oleh peristiwa lain yang lebih singkat.',
    usageWhen: [
      '**Aksi Disela Kejadian Lain (Interrupted Action):** Sedang berlangsung saat peristiwa lain terjadi, contoh: "I was reading when the phone rang."',
      '**Dua Aksi Berlangsung Bersamaan (Parallel Actions):** Berjalan serentak di masa lalu, contoh: "While mother was cooking, father was reading a book."',
      '**Waktu Spesifik Lampau (Specific Past Time):** Tepat pada jam tertentu, contoh: "At 8 PM yesterday, I was studying."'
    ],
    subjectRules: [
      '**Subjek "I / He / She / It / Tunggal":** Menggunakan to be **was** + **Verb-ing**.',
      '**Subjek "You / We / They / Jamak":** Menggunakan to be **were** + **Verb-ing**.'
    ],
    timeSignals: ['When (+ Simple Past)', 'While (+ Past Continuous)', 'At that moment', 'At 7 PM last night', 'All yesterday evening'],
    academicNotes: 'Gunakan konjungsi "while" untuk kegiatan yang berdurasi dan "when" untuk kejadian mendadak yang menyela.',
    examples: [
      { english: 'The scientist was calibrating the microscope when the power went out.', indonesian: 'Ilmuwan itu sedang mengalibrasi mikroskop ketika listrik padam.', usageNote: 'Aksi disela (when)' },
      { english: 'Were you writing the summary at 9 PM yesterday?', indonesian: 'Apakah kamu sedang menulis ringkasan pada pukul 9 malam kemarin?', usageNote: 'Waktu spesifik lampau' }
    ],
    quizQuestions: PAST_CONTINUOUS_QUIZ
  },
  {
    id: 'tense-7',
    category: 'tenses',
    title: 'Past Perfect Tense',
    chapterNumber: 7,
    gradeLevel: 'All',
    description: 'Menyatakan kejadian yang sudah selesai lebih dulu sebelum kejadian lain terjadi di masa lalu.',
    durationMinutes: 25,
    formula: 'Positive (+): Subject + had + Verb 3\nNegative (-): Subject + had + not + Verb 3\nInterrogative/Unknown (?): Had + Subject + Verb 3?',
    explanation: 'Past Perfect Tense adalah **kejadian yang terjadi lebih awal** di antara dua peristiwa masa lampau. Aksi pertama memakai Past Perfect, aksi berikutnya memakai Simple Past.',
    usageWhen: [
      '**Urutan Kronologis Dua Peristiwa Lampau:** Memperjelas mana yang selesai lebih dulu, contoh: "The train had left before I reached the station."',
      '**Pengandaian Masa Lalu (Conditional Type 3):** Situasi yang tidak terwujud, contoh: "If you had studied, you would have passed."'
    ],
    subjectRules: [
      '**Semua Subjek (I, You, He, She, It, We, They):** Sama-sama menggunakan auxiliary **had** + **Verb 3** (Past Participle).'
    ],
    timeSignals: ['Before (sebelum)', 'After (setelah)', 'By the time (pada saat)', 'Already', 'Until then'],
    academicNotes: 'Penting untuk memperjelas urutan eksperimen pendahuluan dalam literatur ilmiah.',
    examples: [
      { english: 'The manuscript had been reviewed before it was published.', indonesian: 'Naskah tersebut telah ditinjau sebelum diterbitkan.', usageNote: 'Aksi pertama (had been reviewed)' },
      { english: 'She had completed her master’s thesis before she applied for the scholarship.', indonesian: 'Dia telah menyelesaikan tesis masternya sebelum mendaftar beasiswa.', usageNote: 'Kronologi jelas' }
    ],
    quizQuestions: PAST_PERFECT_QUIZ
  },
  {
    id: 'tense-8',
    category: 'tenses',
    title: 'Past Perfect Continuous Tense',
    chapterNumber: 8,
    gradeLevel: 'All',
    description: 'Menyatakan kegiatan yang berlangsung dalam durasi tertentu di masa lalu sebelum kejadian lain terjadi.',
    durationMinutes: 20,
    formula: 'Positive (+): Subject + had + been + Verb-ing\nNegative (-): Subject + had + not + been + Verb-ing\nInterrogative/Unknown (?): Had + Subject + been + Verb-ing?',
    explanation: 'Past Perfect Continuous Tense menyoroti **durasi berjalannya suatu tindakan di masa lampau** hingga titik waktu lampau lainnya terjadi.',
    usageWhen: [
      '**Menekankan Lamanya Proses di Masa Lalu:** Durasi sebelum disela kejadian lain, contoh: "They had been debating for two hours before reaching an agreement."',
      '**Penyebab Kondisi Fisik Masa Lalu:** Alasan keadaan lampau, contoh: "He was tired because he had been jogging."'
    ],
    subjectRules: [
      '**Semua Subjek (I, You, He, She, It, We, They):** Menggunakan pola **had + been + Verb-ing**.'
    ],
    timeSignals: ['For 3 hours before...', 'Since morning when...', 'All day before...'],
    academicNotes: 'Digunakan saat mendokumentasikan proses pengujian panjang yang mendahului anomali dalam eksperimen.',
    examples: [
      { english: 'The team had been testing the engine for six months before the prototype succeeded.', indonesian: 'Tim telah menguji mesin tersebut selama enam bulan sebelum prototipenya berhasil.', usageNote: 'Menekankan durasi proses' }
    ],
    quizQuestions: PAST_PERFECT_CONTINUOUS_QUIZ
  },
  {
    id: 'tense-9',
    category: 'tenses',
    title: 'Simple Future Tense',
    chapterNumber: 9,
    gradeLevel: 'All',
    description: 'Menyatakan rencana, prediksi, keputusan spontan, atau janji di masa depan.',
    durationMinutes: 20,
    formula: 'Positive (+): Subject + will + Verb 1\nNegative (-): Subject + will + not + Verb 1\nInterrogative/Unknown (?): Will + Subject + Verb 1?',
    explanation: 'Simple Future Tense digunakan untuk menyatakan peristiwa yang **akan terjadi di masa mendatang**, membuat perkiraan ilmiah, atau janji resmi.',
    usageWhen: [
      '**Prediksi Masa Depan (Predictions):** Perkiraan umum berdasarkan opini, contoh: "Robots will assist doctors in future surgeries."',
      '**Keputusan Spontan (Spontaneous Decisions):** Diputuskan seketika saat berbicara, contoh: "I will help you carry those books."',
      '**Janji & Tawaran Resmi (Promises & Offers):** Komitmen formal, contoh: "The school will provide free laptops."',
      '**Rencana Matang (Be Going To):** Didukung bukti nyata/persiapan, contoh: "We are going to start the trial next month."'
    ],
    subjectRules: [
      '**Pola Modal "will":** Semua subjek menggunakan **will** + **Verb 1** bentuk dasar.',
      '**Pola "be going to":** Subjek + **am/is/are going to** + **Verb 1** bentuk dasar.'
    ],
    timeSignals: ['Tomorrow', 'Next week', 'Next month', 'Next year', 'Soon', 'Later', 'In the future', 'In 2030'],
    academicNotes: 'Gunakan modal "will" untuk hipotesis ilmiah, sedangkan "be going to" jika didukung bukti fisik saat ini.',
    examples: [
      { english: 'Renewable energy will replace fossil fuels in the near future.', indonesian: 'Energi terbarukan akan menggantikan bahan bakar fosil dalam waktu dekat.', usageNote: 'Prediksi masa depan' },
      { english: 'Will the committee announce the winners tomorrow?', indonesian: 'Apakah komite akan mengumumkan pemenangnya besok?', usageNote: 'Kalimat tanya' }
    ],
    quizQuestions: SIMPLE_FUTURE_QUIZ
  },
  {
    id: 'tense-10',
    category: 'tenses',
    title: 'Future Continuous Tense',
    chapterNumber: 10,
    gradeLevel: 'All',
    description: 'Menyatakan kegiatan yang akan sedang berlangsung pada waktu spesifik di masa depan.',
    durationMinutes: 20,
    formula: 'Positive (+): Subject + will + be + Verb-ing\nNegative (-): Subject + will + not + be + Verb-ing\nInterrogative/Unknown (?): Will + Subject + be + Verb-ing?',
    explanation: 'Future Continuous Tense membayangkan diri kita di masa depan dan **sedang berada di tengah-tengah melakukan aktivitas** pada jam atau momen tertentu.',
    usageWhen: [
      '**Aksi Sedang Berlangsung di Waktu Spesifik Depan:** Berlangsung pada jam tertentu, contoh: "Tomorrow at 9 AM, we will be taking the exam."',
      '**Kegiatan Rutin Terjadwal di Masa Depan:** Bagian dari rutinitas yang sudah pasti.'
    ],
    subjectRules: [
      '**Semua Subjek:** Menggunakan pola **will + be + Verb-ing** (Present Participle).'
    ],
    timeSignals: ['At this time tomorrow', 'At 10 AM next Monday', 'In two days from now'],
    academicNotes: 'Sering dijumpai dalam jadwal simposium akademik dan agenda konferensi internasional.',
    examples: [
      { english: 'At this time tomorrow, the delegates will be discussing the climate agreement.', indonesian: 'Pada waktu yang sama besok, para delegasi akan sedang mendiskusikan perjanjian iklim.', usageNote: 'Waktu spesifik masa depan' }
    ],
    quizQuestions: FUTURE_CONTINUOUS_QUIZ
  },
  {
    id: 'tense-11',
    category: 'tenses',
    title: 'Future Perfect Tense',
    chapterNumber: 11,
    gradeLevel: 'All',
    description: 'Menyatakan kegiatan yang akan sudah selesai tuntas sebelum tenggat waktu di masa depan.',
    durationMinutes: 25,
    formula: 'Positive (+): Subject + will + have + Verb 3\nNegative (-): Subject + will + not + have + Verb 3\nInterrogative/Unknown (?): Will + Subject + have + Verb 3?',
    explanation: 'Future Perfect Tense menyatakan bahwa suatu target atau proyek **akan sudah rampung sebelum batas waktu (deadline)** tertentu di masa depan tiba.',
    usageWhen: [
      '**Target Selesai Sebelum Tenggat Waktu (Milestones & Deadlines):** Rampung sebelum batas waktu, contoh: "By next Friday, I will have finished my essay."',
      '**Capaian Sebelum Aksi Masa Depan Lain:** Selesai mendahului aksi lain, contoh: "By the time you arrive, we will have prepared dinner."'
    ],
    subjectRules: [
      '**Semua Subjek (I, You, He, She, It, We, They):** Menggunakan pola **will + have + Verb 3** (Past Participle).'
    ],
    timeSignals: ['By tomorrow (menjelang besok)', 'By next month', 'By the end of this year', 'By 2030', 'By the time (+ Simple Present)'],
    academicNotes: 'Kata kunci mutlak untuk tense ini adalah preposisi "by" (menjelang / sebelum batas waktu).',
    examples: [
      { english: 'By the year 2030, the city will have reduced carbon emissions by 50%.', indonesian: 'Menjelang tahun 2030, kota tersebut akan telah mengurangi emisi karbon sebesar 50%.', usageNote: 'Target waktu dengan "By"' }
    ],
    quizQuestions: FUTURE_PERFECT_QUIZ
  },
  {
    id: 'tense-12',
    category: 'tenses',
    title: 'Future Perfect Continuous Tense',
    chapterNumber: 12,
    gradeLevel: 'All',
    description: 'Menyatakan kegiatan yang akan sudah berlangsung selama durasi tertentu saat titik waktu masa depan tiba.',
    durationMinutes: 20,
    formula: 'Positive (+): Subject + will + have + been + Verb-ing\nNegative (-): Subject + will + not + have + been + Verb-ing\nInterrogative/Unknown (?): Will + Subject + have + been + Verb-ing?',
    explanation: 'Future Perfect Continuous Tense mengukur **akumulasi durasi** suatu aktivitas saat suatu titik waktu di masa depan tercapai.',
    usageWhen: [
      '**Menghitung Akumulasi Durasi Masa Depan:** Menghitung lama masa kerja/pengabdian, contoh: "In December, I will have been teaching here for 10 years."'
    ],
    subjectRules: [
      '**Semua Subjek:** Menggunakan pola **will + have + been + Verb-ing**.'
    ],
    timeSignals: ['For 10 years by next year', 'By next month, for 5 years'],
    academicNotes: 'Banyak ditemukan dalam laporan tahunan dan perayaan masa bakti institusi.',
    examples: [
      { english: 'By next November, Dr. Aris will have been researching genetics for 25 years.', indonesian: 'Menjelang November depan, Dr. Aris akan telah meneliti genetika selama 25 tahun.', usageNote: 'Akumulasi durasi masa depan' }
    ],
    quizQuestions: FUTURE_PERFECT_CONTINUOUS_QUIZ
  },
  {
    id: 'tense-13',
    category: 'tenses',
    title: 'Simple Past Future Tense',
    chapterNumber: 13,
    gradeLevel: 'All',
    description: 'Menyatakan rencana atau kejadian masa depan yang dipikirkan atau dijanjikan dari sudut pandang masa lalu.',
    durationMinutes: 25,
    formula: 'Positive (+): Subject + would + Verb 1\nNegative (-): Subject + would + not + Verb 1\nInterrogative/Unknown (?): Would + Subject + Verb 1?',
    explanation: 'Simple Past Future Tense digunakan untuk menceritakan kembali **janji atau rencana masa lalu** (Reported Speech), atau dalam pengandaian saat ini (Conditional Type 2).',
    usageWhen: [
      '**Kalimat Tidak Langsung Janji Masa Lalu (Reported Speech):** Mengutip rencana lampau, contoh: "He said that he would come."',
      '**Pengandaian Situasi Saat Ini (Conditional Type 2):** Situasi yang tidak nyata sekarang, contoh: "If I had a million dollars, I would build a hospital."'
    ],
    subjectRules: [
      '**Semua Subjek:** Menggunakan modal lampau **would** + **Verb 1** dasar.'
    ],
    timeSignals: ['He promised that...', 'She said that...', 'If (+ Simple Past)..., Subject + would + Verb 1'],
    academicNotes: 'Sangat lazim dalam analisis hipotesis dan kalimat tidak langsung formal.',
    examples: [
      { english: 'He promised that he would submit the assignment on Monday.', indonesian: 'Dia berjanji bahwa dia akan mengumpulkan tugas itu hari Senin.', usageNote: 'Janji masa lalu' },
      { english: 'If we applied the new algorithm, we would improve the computing efficiency.', indonesian: 'Jika kita menerapkan algoritma baru, kita akan meningkatkan efisiensi komputasi.', usageNote: 'Conditional Type 2' }
    ],
    quizQuestions: PAST_FUTURE_QUIZ
  },
  {
    id: 'tense-14',
    category: 'tenses',
    title: 'Past Future Continuous Tense',
    chapterNumber: 14,
    gradeLevel: 'All',
    description: 'Menyatakan bayangan tentang kegiatan yang seharusnya sedang berlangsung di masa lalu namun gagal.',
    durationMinutes: 20,
    formula: 'Positive (+): Subject + would + be + Verb-ing\nNegative (-): Subject + would + not + be + Verb-ing\nInterrogative/Unknown (?): Would + Subject + be + Verb-ing?',
    explanation: 'Past Future Continuous Tense digunakan untuk membayangkan suatu aksi yang **seharusnya sedang berlangsung pada waktu lampau**, namun pada kenyataannya tidak terlaksana.',
    usageWhen: [
      '**Ekspektasi Jadwal yang Meleset:** Mengira suatu aksi sedang berjalan di masa lalu, contoh: "I thought you would be studying at 8 PM yesterday."'
    ],
    subjectRules: [
      '**Semua Subjek:** Menggunakan pola **would + be + Verb-ing**.'
    ],
    timeSignals: ['I thought that...', 'At that time yesterday, we would be...'],
    academicNotes: 'Biasa digunakan untuk menganalisis ekspektasi jadwal yang meleset akibat kendala teknis.',
    examples: [
      { english: 'I assumed they would be presenting their slides by now.', indonesian: 'Saya berasumsi mereka seharusnya sedang mempresentasikan salindia mereka saat ini.', usageNote: 'Ekspektasi masa lalu' }
    ],
    quizQuestions: PAST_FUTURE_CONTINUOUS_QUIZ
  },
  {
    id: 'tense-15',
    category: 'tenses',
    title: 'Past Future Perfect Tense',
    chapterNumber: 15,
    gradeLevel: 'All',
    description: 'Menyatakan penyesalan atau peristiwa yang seharusnya sudah selesai di masa lalu namun tidak terwujud.',
    durationMinutes: 25,
    formula: 'Positive (+): Subject + would + have + Verb 3\nNegative (-): Subject + would + not + have + Verb 3\nInterrogative/Unknown (?): Would + Subject + have + Verb 3?',
    explanation: 'Past Future Perfect Tense digunakan dalam **Conditional Sentence Type 3** untuk menyatakan **penyesalan atau mengandaikan hal yang mustahil diubah** di masa lalu.',
    usageWhen: [
      '**Pengandaian Masa Lalu yang Batal (Regret / Unreal Past):** Fakta masa lalu berbeda, contoh: "If she had studied harder, she would have passed the exam."'
    ],
    subjectRules: [
      '**Semua Subjek:** Menggunakan pola **would + have + Verb 3** (Past Participle).'
    ],
    timeSignals: ['If + Past Perfect (had + Verb 3)..., Subject + would have + Verb 3'],
    academicNotes: 'Sangat vital untuk materi soal tata bahasa UTBK / SNBT terkait Conditional Sentence Type 3.',
    examples: [
      { english: 'If the laboratory had received funding, the scientists would have completed the cure.', indonesian: 'Jika laboratorium menerima pendanaan, para ilmuwan akan telah menyelesaikan obat tersebut.', usageNote: 'Pengandaian Type 3' }
    ],
    quizQuestions: PAST_FUTURE_PERFECT_QUIZ
  },
  {
    id: 'tense-16',
    category: 'tenses',
    title: 'Past Future Perfect Continuous Tense',
    chapterNumber: 16,
    gradeLevel: 'All',
    description: 'Menyatakan bayangan durasi tindakan yang seharusnya telah dan masih sedang berlangsung di masa lalu.',
    durationMinutes: 25,
    formula: 'Positive (+): Subject + would + have + been + Verb-ing\nNegative (-): Subject + would + not + have + been + Verb-ing\nInterrogative/Unknown (?): Would + Subject + have + been + Verb-ing?',
    explanation: 'Past Future Perfect Continuous Tense membayangkan **durasi panjang suatu tindakan yang seharusnya sedang dan telah berlangsung di masa lalu** seandainya suatu syarat terpenuhi.',
    usageWhen: [
      '**Pengandaian Durasi Lampau yang Batal:** Mengukur durasi pengandaian, contoh: "Had the project not been canceled, we would have been working on it for a year by last month."'
    ],
    subjectRules: [
      '**Semua Subjek:** Menggunakan pola **would + have + been + Verb-ing**.'
    ],
    timeSignals: ['For 2 years by last month (dalam kondisi pengandaian)'],
    academicNotes: 'Tense tingkat mahir untuk memahami nuansa retorika dalam esai sastra dan karya ilmiah.',
    examples: [
      { english: 'Had he remained the director, he would have been leading the institute for a decade by 2024.', indonesian: 'Seandainya dia tetap menjadi direktur, dia akan telah memimpin institut itu selama satu dekade menjelang 2024.', usageNote: 'Asumsi durasi lampau' }
    ],
    quizQuestions: PAST_FUTURE_PERFECT_CONTINUOUS_QUIZ
  }
];

