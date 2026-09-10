import { UtbkQuestion } from '../types';

export const UTBK_2026_QUESTIONS: UtbkQuestion[] = [
  // Passage 1: Gotham City Rooftop Gardens (Q1 - Q3)
  {
    id: 'utbk-1',
    title: 'Passage 1: School Rooftop Gardens in Gotham City',
    skillType: 'Main Idea',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `In the past five years, several public schools in Gotham City have converted unused rooftop spaces into small vegetable gardens. Students take turns watering the plants, monitoring soil quality, and harvesting vegetables such as spinach and chili peppers. Teachers argue that the project does more than simply beautify the school; it also teaches responsibility and basic biology concepts in a hands-on way. According to a survey conducted by the school committee, more than seventy percent of participating students reported feeling more connected to their environment after joining the program. However, critics point out that maintaining a rooftop garden requires consistent funding for tools, seeds, and irrigation systems, something not every school can guarantee in the long run. Despite this concern, several education officials have proposed expanding the program to more schools next year.`,
    question: '1. What is the main idea of the passage?',
    options: [
      'The financial struggles of schools in Gotham City',
      'The benefits and challenges of school rooftop gardens',
      'Techniques for planting vegetables in urban areas',
      'A survey about students\' environmental awareness',
      'A plan to expand environmental education programs'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Teks membahas dua sisi sekaligus (manfaat pembelajaran & tantangan pendanaan), bukan cuma satu aspek seperti opsi lainnya.'
  },
  {
    id: 'utbk-2',
    title: 'Passage 1: School Rooftop Gardens in Gotham City',
    skillType: 'Inference',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `In the past five years, several public schools in Gotham City have converted unused rooftop spaces into small vegetable gardens. Students take turns watering the plants, monitoring soil quality, and harvesting vegetables such as spinach and chili peppers. Teachers argue that the project does more than simply beautify the school; it also teaches responsibility and basic biology concepts in a hands-on way. According to a survey conducted by the school committee, more than seventy percent of participating students reported feeling more connected to their environment after joining the program. However, critics point out that maintaining a rooftop garden requires consistent funding for tools, seeds, and irrigation systems, something not every school can guarantee in the long run. Despite this concern, several education officials have proposed expanding the program to more schools next year.`,
    question: '2. Based on the passage, how did the majority of participating students feel after joining the program?',
    options: [
      'Indifferent',
      'Disappointed',
      'More connected to their environment',
      'Confused',
      'Unmotivated'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Sesuai kalimat "more than seventy percent of participating students reported feeling more connected to their environment."'
  },
  {
    id: 'utbk-3',
    title: 'Passage 1: School Rooftop Gardens in Gotham City',
    skillType: 'Vocabulary in Context',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `In the past five years, several public schools in Gotham City have converted unused rooftop spaces into small vegetable gardens. Students take turns watering the plants, monitoring soil quality, and harvesting vegetables such as spinach and chili peppers. Teachers argue that the project does more than simply beautify the school; it also teaches responsibility and basic biology concepts in a hands-on way. According to a survey conducted by the school committee, more than seventy percent of participating students reported feeling more connected to their environment after joining the program. However, critics point out that maintaining a rooftop garden requires consistent funding for tools, seeds, and irrigation systems, something not every school can guarantee in the long run. Despite this concern, several education officials have proposed expanding the program to more schools next year.`,
    question: '3. The word "consistent" in the passage is closest in meaning to:',
    options: [
      'occasional',
      'steady',
      'expensive',
      'limited',
      'flexible'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. "Consistent funding" = pendanaan yang stabil/berkelanjutan, paling dekat maknanya dengan "steady."'
  },

  // Passage 2: Diane\'s Debate Competition (Q4 - Q5)
  {
    id: 'utbk-4',
    title: 'Passage 2: Diane\'s Debate Competition',
    skillType: 'Inference',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Diane had always been the quietest student in her class, rarely raising her hand even when she knew the answer. During a school debate competition, her teacher unexpectedly assigned her to argue the side she personally disagreed with. At first, she considered dropping out. Instead, she spent the week researching counterarguments and practicing in front of a mirror. On the day of the competition, her voice trembled during the opening statement, but by the final round, she was calmly rebutting her opponents\' points. Her team did not win first place, but for Diane, simply finishing without giving up felt like the bigger victory.`,
    question: '4. What can be inferred about Diane from the passage?',
    options: [
      'She is naturally confident in public speaking',
      'She avoids challenges whenever possible',
      'She is capable of growth despite initial discomfort',
      'She dislikes debate competitions',
      'She regrets joining the team'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Meski awalnya gugup dan ingin mundur, ia tetap berlatih dan tampil lebih percaya diri di akhir — pola klasik inferensi karakter.'
  },
  {
    id: 'utbk-5',
    title: 'Passage 2: Diane\'s Debate Competition',
    skillType: 'Author Tone & Purpose',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Diane had always been the quietest student in her class, rarely raising her hand even when she knew the answer. During a school debate competition, her teacher unexpectedly assigned her to argue the side she personally disagreed with. At first, she considered dropping out. Instead, she spent the week researching counterarguments and practicing in front of a mirror. On the day of the competition, her voice trembled during the opening statement, but by the final round, she was calmly rebutting her opponents\' points. Her team did not win first place, but for Diane, simply finishing without giving up felt like the bigger victory.`,
    question: '5. What is the author\'s primary purpose in writing this passage?',
    options: [
      'To criticize school debate competitions',
      'To explain debate tournament rules',
      'To highlight a student\'s personal growth through a challenge',
      'To compare Diane\'s skill with her sister\'s',
      'To argue quiet students shouldn\'t join competitions'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Fokus narasi ada di proses perubahan sikap dan perkembangan pribadi Diane, bukan aturan lomba atau kritik.'
  },

  // Passage 3: Circuit Cup Virtual Racing - Nova Reyes & Dex Okafor (Q6 - Q8)
  {
    id: 'utbk-6',
    title: 'Passage 3: Virtual Racing Circuit Cup',
    skillType: 'Main Idea',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `In the city of Emberfall, seventeen-year-old Nova Reyes had a reputation for hacking into arcade machines just to beat the high score before anyone else could. When the annual Circuit Cup announced a new virtual racing category, Nova saw a chance to finally prove herself. Her rival, Dex Okafor, had won the tournament for three years straight and openly doubted she could compete at his level. Determined to change his mind, Nova spent weeks studying track patterns, often falling asleep at her keyboard. On the day of the final race, a sudden system glitch forced all racers to restart with reversed controls. While other competitors panicked, Nova adapted almost instantly, drawing on hours of unconventional practice. She crossed the finish line half a second ahead of Dex, ending his three-year winning streak.`,
    question: '6. What is the main idea of the passage?',
    options: [
      'A description of arcade games in Emberfall',
      'Dex Okafor\'s long winning streak',
      'How Nova Reyes overcame a challenge to win a competition',
      'The official rules of the Circuit Cup',
      'A system malfunction that disrupted a race'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Gagasan utama menceritakan perjuangan Nova Reyes mengatasi tantangan dan berhasil menjuarai kompetisi balap virtual.'
  },
  {
    id: 'utbk-7',
    title: 'Passage 3: Virtual Racing Circuit Cup',
    skillType: 'Inference',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `In the city of Emberfall, seventeen-year-old Nova Reyes had a reputation for hacking into arcade machines just to beat the high score before anyone else could. When the annual Circuit Cup announced a new virtual racing category, Nova saw a chance to finally prove herself. Her rival, Dex Okafor, had won the tournament for three years straight and openly doubted she could compete at his level. Determined to change his mind, Nova spent weeks studying track patterns, often falling asleep at her keyboard. On the day of the final race, a sudden system glitch forced all racers to restart with reversed controls. While other competitors panicked, Nova adapted almost instantly, drawing on hours of unconventional practice. She crossed the finish line half a second ahead of Dex, ending his three-year winning streak.`,
    question: '7. According to the passage, what caused the sudden change during the final race?',
    options: [
      'Nova sabotaged the system',
      'Dex requested a rule change',
      'A system glitch reversed the controls',
      'The race was postponed',
      'New competitors joined unexpectedly'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Sesuai kalimat "a sudden system glitch forced all racers to restart with reversed controls."'
  },
  {
    id: 'utbk-8',
    title: 'Passage 3: Virtual Racing Circuit Cup',
    skillType: 'Inference',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `In the city of Emberfall, seventeen-year-old Nova Reyes had a reputation for hacking into arcade machines just to beat the high score before anyone else could. When the annual Circuit Cup announced a new virtual racing category, Nova saw a chance to finally prove herself. Her rival, Dex Okafor, had won the tournament for three years straight and openly doubted she could compete at his level. Determined to change his mind, Nova spent weeks studying track patterns, often falling asleep at her keyboard. On the day of the final race, a sudden system glitch forced all racers to restart with reversed controls. While other competitors panicked, Nova adapted almost instantly, drawing on hours of unconventional practice. She crossed the finish line half a second ahead of Dex, ending his three-year winning streak.`,
    question: '8. What can be inferred about Nova\'s character from the passage?',
    options: [
      'She gives up easily under pressure',
      'She relies only on natural talent, not practice',
      'She is adaptable and persistent',
      'She dislikes competition',
      'She had never played games before'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Ditunjukkan lewat latihan intensif (persistent) dan caranya beradaptasi cepat saat glitch kendali terbalik terjadi (adaptable).'
  },

  // Passage 4: Esports Industry (Q9 - Q10)
  {
    id: 'utbk-9',
    title: 'Passage 4: The Rise of Esports Industry',
    skillType: 'Vocabulary in Context',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `Over the past decade, competitive video gaming, commonly known as esports, has transformed from a niche hobby into a billion-dollar global industry. Major tournaments now fill stadiums and attract millions of online viewers, with top players earning salaries comparable to traditional athletes. Proponents argue that esports demands the same discipline and strategic thinking as conventional sports. Skeptics, however, remain unconvinced, insisting that sitting in front of a screen cannot be equated with physical athleticism. This debate has even influenced educational policy, as some schools now offer esports scholarships while others refuse to recognize gaming as an extracurricular activity.`,
    question: '9. The word "niche" in the passage is closest in meaning to:',
    options: [
      'Widespread',
      'Specialized',
      'Expensive',
      'Temporary',
      'Dangerous'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. "Niche hobby" = hobi yang tadinya sempit/khusus bagi segmen tertentu, paling dekat maknanya dengan "specialized."'
  },
  {
    id: 'utbk-10',
    title: 'Passage 4: The Rise of Esports Industry',
    skillType: 'Author Tone & Purpose',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Over the past decade, competitive video gaming, commonly known as esports, has transformed from a niche hobby into a billion-dollar global industry. Major tournaments now fill stadiums and attract millions of online viewers, with top players earning salaries comparable to traditional athletes. Proponents argue that esports demands the same discipline and strategic thinking as conventional sports. Skeptics, however, remain unconvinced, insisting that sitting in front of a screen cannot be equated with physical athleticism. This debate has even influenced educational policy, as some schools now offer esports scholarships while others refuse to recognize gaming as an extracurricular activity.`,
    question: '10. What is the author\'s primary purpose in writing this passage?',
    options: [
      'To convince readers esports should replace traditional sports',
      'To present both sides of the debate about esports\' legitimacy',
      'To criticize schools offering esports scholarships',
      'To explain the history of game consoles',
      'To argue esports is purely a hobby'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Teks menampilkan argumen pendukung ("proponents argue...") dan penolak ("skeptics, however...") secara seimbang.'
  },

  // Passage 5: Smartphone Panic & Goldfish Attention Span Myth (Q11 - Q13)
  {
    id: 'utbk-11',
    title: 'Passage 5: Human Attention Span & Smartphone Myths',
    skillType: 'Text Structure',
    difficulty: 'Sulit',
    pointWeight: 25,
    passage: `A commonly repeated claim suggests that human attention spans have dramatically shortened due to the rise of smartphones and social media, with some articles even asserting that people now focus for less time than a goldfish. However, cognitive scientists studying this claim have found little rigorous evidence to support it. Much of the panic stems from a widely circulated statistic that was never traced back to a credible study, yet it continues to be cited as established fact. Researchers argue that what has actually changed is not the length of attention itself, but the way people allocate it across competing digital demands. A 2023 review of laboratory studies found no consistent decline in sustained attention over the past two decades, though it did note increased task-switching behavior among younger participants. Critics of the alarmist narrative caution that conflating frequent task-switching with a biological decline in attention risks producing misguided educational policies.`,
    question: '11. What is the function of the sentence describing the "2023 review of laboratory studies" in the passage?',
    options: [
      'It introduces a new topic unrelated to the discussion',
      'It provides evidence that challenges the popular claim mentioned earlier',
      'It summarizes the entire passage\'s conclusion',
      'It contradicts the researchers\' overall argument',
      'It shifts the discussion to educational policy'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Kalimat itu menjadi bukti riset empiris yang menyanggah klaim populer di awal, bukan topik baru atau kontradiksi.'
  },
  {
    id: 'utbk-12',
    title: 'Passage 5: Human Attention Span & Smartphone Myths',
    skillType: 'Vocabulary in Context',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `A commonly repeated claim suggests that human attention spans have dramatically shortened due to the rise of smartphones and social media, with some articles even asserting that people now focus for less time than a goldfish. However, cognitive scientists studying this claim have found little rigorous evidence to support it. Much of the panic stems from a widely circulated statistic that was never traced back to a credible study, yet it continues to be cited as established fact. Researchers argue that what has actually changed is not the length of attention itself, but the way people allocate it across competing digital demands. A 2023 review of laboratory studies found no consistent decline in sustained attention over the past two decades, though it did note increased task-switching behavior among younger participants. Critics of the alarmist narrative caution that conflating frequent task-switching with a biological decline in attention risks producing misguided educational policies.`,
    question: '12. The word "conflating" is closest in meaning to:',
    options: [
      'separating',
      'confusing/merging',
      'exaggerating',
      'dismissing',
      'measuring'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. "Conflating X with Y" = mencampuradukkan atau menggabungkan dua hal berbeda seolah-olah sama (confusing/merging).'
  },
  {
    id: 'utbk-13',
    title: 'Passage 5: Human Attention Span & Smartphone Myths',
    skillType: 'Inference',
    difficulty: 'Sulit',
    pointWeight: 25,
    passage: `A commonly repeated claim suggests that human attention spans have dramatically shortened due to the rise of smartphones and social media, with some articles even asserting that people now focus for less time than a goldfish. However, cognitive scientists studying this claim have found little rigorous evidence to support it. Much of the panic stems from a widely circulated statistic that was never traced back to a credible study, yet it continues to be cited as established fact. Researchers argue that what has actually changed is not the length of attention itself, but the way people allocate it across competing digital demands. A 2023 review of laboratory studies found no consistent decline in sustained attention over the past two decades, though it did note increased task-switching behavior among younger participants. Critics of the alarmist narrative caution that conflating frequent task-switching with a biological decline in attention risks producing misguided educational policies.`,
    question: '13. Which of the following best represents the researchers\' position?',
    options: [
      'Attention spans have shortened due to smartphone use',
      'The goldfish comparison is scientifically accurate',
      'Increased task-switching is the same as reduced attention capacity',
      'Popular claims about shrinking attention spans lack strong evidence',
      'Banning devices in schools is the most effective solution'
    ],
    correctAnswerIndex: 3,
    explanation: 'Jawaban D. Opsi C sengaja dijebak karena teks eksplisit membantahnya ("conflating... risks producing misguided..."). Peneliti menyatakan klaim penurunan rentang perhatian kurang bukti kuat.'
  },

  // Passage 6: Ezra\'s Treehouse vs Mira\'s Platform (Q14 - Q15)
  {
    id: 'utbk-14',
    title: 'Passage 6: Ezra\'s Treehouse & Mira\'s Platform',
    skillType: 'Inference',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Ezra had spent three months building a treehouse he called "unbreakable," proudly reinforcing every plank with extra nails. When his younger cousin Mira visited and asked to climb up, he waved her off, insisting the ladder needed "one more round of testing." Mira shrugged and instead spent the afternoon building a much smaller, wobblier platform from spare wood behind the shed. By sunset, she was already sitting comfortably on her lopsided creation, eating a snack and watching the sky change color. Ezra, meanwhile, was still adjusting a hinge on a ladder that, by his own admission, had never actually failed a single test.`,
    question: '14. What does the passage most strongly suggest about Ezra?',
    options: [
      'He is more skilled at building than Mira',
      'His pursuit of perfection may be preventing him from enjoying his work',
      'He built the treehouse specifically to impress Mira',
      'He is afraid of heights',
      'He regrets starting the project'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Ironi teks: rumah pohon "unbreakable" milik Ezra tidak kunjung dinikmati karena obsesi pengujian berlebih, sedangkan kreasi sederhana Mira langsung dinikmati.'
  },
  {
    id: 'utbk-15',
    title: 'Passage 6: Ezra\'s Treehouse & Mira\'s Platform',
    skillType: 'Author Tone & Purpose',
    difficulty: 'Sulit',
    pointWeight: 25,
    passage: `Ezra had spent three months building a treehouse he called "unbreakable," proudly reinforcing every plank with extra nails. When his younger cousin Mira visited and asked to climb up, he waved her off, insisting the ladder needed "one more round of testing." Mira shrugged and instead spent the afternoon building a much smaller, wobblier platform from spare wood behind the shed. By sunset, she was already sitting comfortably on her lopsided creation, eating a snack and watching the sky change color. Ezra, meanwhile, was still adjusting a hinge on a ladder that, by his own admission, had never actually failed a single test.`,
    question: '15. What is the tone of the passage toward Ezra\'s approach?',
    options: [
      'Admiring',
      'Neutral and purely factual',
      'Gently ironic',
      'Harshly critical',
      'Sympathetic without any critique'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Penulis tidak mengkritik secara kasar atau terang-terangan, tetapi kontras antara Ezra dan Mira menciptakan efek ironi halus (gently ironic).'
  },

  // Passage 7: Urban Green Spaces & Stress Levels (Q16 - Q18)
  {
    id: 'utbk-16',
    title: 'Passage 7: Urban Parks & Stress Reduction Studies',
    skillType: 'Inference',
    difficulty: 'Sulit',
    pointWeight: 25,
    passage: `For several years, urban planners have cited a series of observational studies suggesting that neighborhoods with more green spaces report lower average levels of self-reported stress among residents. Advocates for expanding public parks frequently invoke these findings to justify budget allocations, framing green space as a direct intervention for public well-being. However, several epidemiologists have cautioned against this interpretation, noting that the studies in question were largely correlational rather than experimental. Neighborhoods with abundant parks often differ from those without in other respects, including average household income, housing density, and access to healthcare — any of which could independently influence stress levels. A recent attempt to account for these confounding variables reduced the strength of the observed relationship considerably, though it did not eliminate it entirely. The researchers involved stopped short of recommending policy changes based solely on the remaining association, arguing instead that controlled, longitudinal studies would be necessary before green space could be confidently established as a causal factor.`,
    question: '16. What assumption do advocates for expanding public parks appear to make when citing the observational studies?',
    options: [
      'Observational studies are inherently more reliable than experimental ones',
      'The relationship between green space and stress is necessarily causal',
      'Neighborhoods with parks have higher household incomes',
      'Epidemiologists agree with their policy recommendations',
      'Stress levels cannot be measured accurately'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Mereka menggunakan data korelasional seolah membuktikan hubungan sebab-akibat langsung, padahal teks menegaskan statusnya hanya "correlational rather than experimental."'
  },
  {
    id: 'utbk-17',
    title: 'Passage 7: Urban Parks & Stress Reduction Studies',
    skillType: 'Text Structure',
    difficulty: 'Sulit',
    pointWeight: 25,
    passage: `For several years, urban planners have cited a series of observational studies suggesting that neighborhoods with more green spaces report lower average levels of self-reported stress among residents. Advocates for expanding public parks frequently invoke these findings to justify budget allocations, framing green space as a direct intervention for public well-being. However, several epidemiologists have cautioned against this interpretation, noting that the studies in question were largely correlational rather than experimental. Neighborhoods with abundant parks often differ from those without in other respects, including average household income, housing density, and access to healthcare — any of which could independently influence stress levels. A recent attempt to account for these confounding variables reduced the strength of the observed relationship considerably, though it did not eliminate it entirely. The researchers involved stopped short of recommending policy changes based solely on the remaining association, arguing instead that controlled, longitudinal studies would be necessary before green space could be confidently established as a causal factor.`,
    question: '17. Which of the following, if true, would most strengthen the epidemiologists\' skepticism?',
    options: [
      'A longitudinal study found the effect persisted even after controlling for income, density, and healthcare access',
      'A new survey found residents rarely actually visit the parks near their homes',
      'Housing prices in park-adjacent neighborhoods have increased',
      'Some cities have reduced their public park budgets',
      'Public parks are more common in temperate climates'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Jika warganya jarang mengunjungi taman di dekatnya, maka mekanisme "keberadaan taman langsung meredakan stres" semakin diragukan.'
  },
  {
    id: 'utbk-18',
    title: 'Passage 7: Urban Parks & Stress Reduction Studies',
    skillType: 'Vocabulary in Context',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `For several years, urban planners have cited a series of observational studies suggesting that neighborhoods with more green spaces report lower average levels of self-reported stress among residents. Advocates for expanding public parks frequently invoke these findings to justify budget allocations, framing green space as a direct intervention for public well-being. However, several epidemiologists have cautioned against this interpretation, noting that the studies in question were largely correlational rather than experimental. Neighborhoods with abundant parks often differ from those without in other respects, including average household income, housing density, and access to healthcare — any of which could independently influence stress levels. A recent attempt to account for these confounding variables reduced the strength of the observed relationship considerably, though it did not eliminate it entirely. The researchers involved stopped short of recommending policy changes based solely on the remaining association, arguing instead that controlled, longitudinal studies would be necessary before green space could be confidently established as a causal factor.`,
    question: '18. The word "invoke" in the passage is closest in meaning to:',
    options: [
      'dismiss',
      'cite/appeal to',
      'ignore',
      'contradict',
      'measure'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. "Invoke findings" berarti mengutip atau merujuk pada temuan tersebut sebagai pendukung argumen (cite/appeal to).'
  },

  // Passage 8: Yusuf Amri\'s Irrigation Timer (Q19 - Q20)
  {
    id: 'utbk-19',
    title: 'Passage 8: Yusuf Amri\'s Irrigation Timer Project',
    skillType: 'Reference',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `At sixteen, Yusuf Amri built a simple irrigation timer for his family\'s small vegetable plot, hoping to reduce the hours his grandmother spent manually watering the crops each morning. The device worked well during the dry season, releasing precise amounts of water at scheduled intervals. However, when the rainy season arrived unexpectedly early, the timer continued operating on its original schedule, oversaturating the soil and damaging several rows of chili plants before anyone noticed. Yusuf\'s grandmother was initially frustrated, but rather than abandoning the invention, she suggested adding a simple moisture sensor to override the schedule when the soil was already wet. Yusuf spent the following weekend redesigning the system, and the improved version has since run without further incident for two growing seasons.`,
    question: '19. Which of the following statements is NOT supported by the passage?',
    options: [
      'The original timer caused damage to some of the crops',
      'Yusuf\'s grandmother suggested a technical improvement',
      'The redesigned system has functioned reliably for two growing seasons',
      'Yusuf abandoned the irrigation project after the initial failure',
      'The timer\'s original design did not account for unexpected rain'
    ],
    correctAnswerIndex: 3,
    explanation: 'Jawaban D. Teks justru menjelaskan bahwa Yusuf mendesain ulang alatnya, bukan menghentikan/meninggalkan proyek tersebut.'
  },
  {
    id: 'utbk-20',
    title: 'Passage 8: Yusuf Amri\'s Irrigation Timer Project',
    skillType: 'Main Idea',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `At sixteen, Yusuf Amri built a simple irrigation timer for his family\'s small vegetable plot, hoping to reduce the hours his grandmother spent manually watering the crops each morning. The device worked well during the dry season, releasing precise amounts of water at scheduled intervals. However, when the rainy season arrived unexpectedly early, the timer continued operating on its original schedule, oversaturating the soil and damaging several rows of chili plants before anyone noticed. Yusuf\'s grandmother was initially frustrated, but rather than abandoning the invention, she suggested adding a simple moisture sensor to override the schedule when the soil was already wet. Yusuf spent the following weekend redesigning the system, and the improved version has since run without further incident for two growing seasons.`,
    question: '20. The passage as a whole best illustrates which idea?',
    options: [
      'Technology is inherently unreliable in agricultural settings',
      'Failure can lead to meaningful improvement rather than abandonment',
      'Older generations are generally resistant to new technology',
      'Manual labor is always more effective than automation',
      'Weather patterns are impossible to predict accurately'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Kisah ini menggambarkan bagaimana kegagalan awal dapat menjadi batu loncatan menuju penyempurnaan yang bermakna.'
  },

  // Passage 9: Four-Day Academic Week (Q21 - Q23)
  {
    id: 'utbk-21',
    title: 'Passage 9: Four-Day Academic Week Trials',
    skillType: 'Inference',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `In recent years, a growing number of schools around the world have piloted a four-day academic week, compressing the same instructional hours into fewer, longer days. Supporters argue that the extra day off reduces teacher burnout and gives students more time for extracurricular activities, family responsibilities, or part-time work. Some early adopters report improved attendance and higher morale among both staff and students. Critics, however, worry that longer school days may reduce students\' ability to concentrate during afternoon classes, and that working parents could struggle to arrange childcare for the additional day off. A handful of districts that piloted the schedule have already reverted to five-day weeks after receiving complaints from parents, while others plan to continue the trial for at least another academic year before drawing firm conclusions.`,
    question: '21. According to the passage, why have some districts reverted to a five-day school week?',
    options: [
      'Students performed worse academically',
      'Teachers requested the change',
      'Parents complained, particularly regarding childcare',
      'The schedule violated education regulations',
      'Attendance rates declined'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Sesuai kalimat "reverted... after receiving complaints from parents" dan konteks kesulitan pengasuhan anak (childcare).'
  },
  {
    id: 'utbk-22',
    title: 'Passage 9: Four-Day Academic Week Trials',
    skillType: 'Vocabulary in Context',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `In recent years, a growing number of schools around the world have piloted a four-day academic week, compressing the same instructional hours into fewer, longer days. Supporters argue that the extra day off reduces teacher burnout and gives students more time for extracurricular activities, family responsibilities, or part-time work. Some early adopters report improved attendance and higher morale among both staff and students. Critics, however, worry that longer school days may reduce students\' ability to concentrate during afternoon classes, and that working parents could struggle to arrange childcare for the additional day off. A handful of districts that piloted the schedule have already reverted to five-day weeks after receiving complaints from parents, while others plan to continue the trial for at least another academic year before drawing firm conclusions.`,
    question: '22. The word "compressing" in the passage is closest in meaning to:',
    options: [
      'expanding',
      'condensing',
      'eliminating',
      'scheduling',
      'dividing'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. "Compressing" berarti memadatkan atau merangkum jam belajar ke waktu yang lebih ringkas (condensing).'
  },
  {
    id: 'utbk-23',
    title: 'Passage 9: Four-Day Academic Week Trials',
    skillType: 'Text Structure',
    difficulty: 'Sulit',
    pointWeight: 25,
    passage: `In recent years, a growing number of schools around the world have piloted a four-day academic week, compressing the same instructional hours into fewer, longer days. Supporters argue that the extra day off reduces teacher burnout and gives students more time for extracurricular activities, family responsibilities, or part-time work. Some early adopters report improved attendance and higher morale among both staff and students. Critics, however, worry that longer school days may reduce students\' ability to concentrate during afternoon classes, and that working parents could struggle to arrange childcare for the additional day off. A handful of districts that piloted the schedule have already reverted to five-day weeks after receiving complaints from parents, while others plan to continue the trial for at least another academic year before drawing firm conclusions.`,
    question: '23. What is the function of the last sentence in the passage?',
    options: [
      'It summarizes the debate with one final conclusion',
      'It shows all districts are abandoning the four-day week',
      'It illustrates that outcomes and decisions vary across districts',
      'It introduces a new argument against the schedule',
      'It contradicts concerns mentioned earlier'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Kalimat tersebut menunjukkan bahwa keputusan dan hasil berbeda-beda antar distrik ("a handful" vs "others plan to continue").'
  },

  // Passage 10: Aditya\'s Robotics Club (Q24 - Q25)
  {
    id: 'utbk-24',
    title: 'Passage 10: Aditya\'s Robotics Troubleshooting Skill',
    skillType: 'Inference',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Aditya joined his school\'s robotics club mostly because his best friend signed up, not because he had any real interest in engineering. During the first few weeks, he struggled to understand even basic wiring diagrams while his teammates moved ahead confidently. Rather than asking for help immediately, he spent his evenings taking apart old electronics at home, labeling each wire and comparing them to online tutorials at his own pace. It took him nearly two months to catch up, far longer than most members needed. By the regional competition, however, Aditya was the one troubleshooting the robot\'s sensor malfunction under time pressure, calmly tracing the wiring back to its source while his teammates looked on. His coach later remarked that Aditya\'s slow start had likely taught him to diagnose problems more thoroughly than anyone else on the team.`,
    question: '24. What can be inferred about the reason Aditya became skilled at troubleshooting?',
    options: [
      'He had prior robotics experience before joining',
      'His slower, self-directed learning gave him deeper understanding',
      'His teammates trained him directly during the competition',
      'He memorized diagrams without practical application',
      'He relied entirely on his coach\'s instructions'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Ditegaskan oleh komentar pelatih di akhir teks: proses belajar mandiri yang sabar memberinya pemahaman mendalam.'
  },
  {
    id: 'utbk-25',
    title: 'Passage 10: Aditya\'s Robotics Troubleshooting Skill',
    skillType: 'Author Tone & Purpose',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Aditya joined his school\'s robotics club mostly because his best friend signed up, not because he had any real interest in engineering. During the first few weeks, he struggled to understand even basic wiring diagrams while his teammates moved ahead confidently. Rather than asking for help immediately, he spent his evenings taking apart old electronics at home, labeling each wire and comparing them to online tutorials at his own pace. It took him nearly two months to catch up, far longer than most members needed. By the regional competition, however, Aditya was the one troubleshooting the robot\'s sensor malfunction under time pressure, calmly tracing the wiring back to its source while his teammates looked on. His coach later remarked that Aditya\'s slow start had likely taught him to diagnose problems more thoroughly than anyone else on the team.`,
    question: '25. What is the author\'s tone toward Aditya\'s slow initial progress?',
    options: [
      'Dismissive, treating it as a weakness',
      'Reframing it as ultimately valuable',
      'Neutral, with no implied judgment',
      'Critical of his learning method',
      'Regretful that he didn\'t catch up faster'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Narasi sengaja membingkai ulang persepsi "lambat di awal" menjadi kekuatan berharga di akhir cerita.'
  },

  // Passage 11: Tree Planting & Urban Heat Island (Q26 - Q28)
  {
    id: 'utbk-26',
    title: 'Passage 11: Tree Planting & Urban Heat Islands',
    skillType: 'Inference',
    difficulty: 'Sulit',
    pointWeight: 25,
    passage: `As global temperatures rise, many cities have adopted large-scale tree-planting initiatives, partly in response to studies linking urban tree canopy coverage to reduced surface temperatures during heat waves. Proponents cite research showing that neighborhoods with denser canopy cover can be several degrees cooler than those dominated by concrete and asphalt, framing tree planting as a straightforward mitigation strategy for the so-called urban heat island effect. Yet several urban climatologists caution that canopy coverage alone does not fully explain these temperature differences. Neighborhoods with more trees often also have lower building density, wider streets, and less impervious surface area — factors that independently reduce heat retention regardless of vegetation. A 2024 modeling study attempted to isolate the effect of tree cover from these structural variables and found that, while still beneficial, its cooling contribution was considerably smaller than earlier estimates suggested. The study\'s authors did not dispute the value of urban greening, but argued that policies treating tree planting as a substitute for reducing impervious surfaces may overstate its cooling potential.`,
    question: '26. What assumption do proponents of tree-planting initiatives appear to make?',
    options: [
      'Tree canopy coverage is the primary or sole cause of the temperature difference',
      'Impervious surfaces have no effect on urban temperature',
      'Climatologists unanimously support their approach',
      'Building density has decreased in most cities',
      'The 2024 study confirms their original estimates'
    ],
    correctAnswerIndex: 0,
    explanation: 'Jawaban A. Para pendukung mengasumsikan tutupan kanopi pohon adalah penyebab utama/tunggal dari selisih suhu perkotaan.'
  },
  {
    id: 'utbk-27',
    title: 'Passage 11: Tree Planting & Urban Heat Islands',
    skillType: 'Reference',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `As global temperatures rise, many cities have adopted large-scale tree-planting initiatives, partly in response to studies linking urban tree canopy coverage to reduced surface temperatures during heat waves. Proponents cite research showing that neighborhoods with denser canopy cover can be several degrees cooler than those dominated by concrete and asphalt, framing tree planting as a straightforward mitigation strategy for the so-called urban heat island effect. Yet several urban climatologists caution that canopy coverage alone does not fully explain these temperature differences. Neighborhoods with more trees often also have lower building density, wider streets, and less impervious surface area — factors that independently reduce heat retention regardless of vegetation. A 2024 modeling study attempted to isolate the effect of tree cover from these structural variables and found that, while still beneficial, its cooling contribution was considerably smaller than earlier estimates suggested. The study\'s authors did not dispute the value of urban greening, but argued that policies treating tree planting as a substitute for reducing impervious surfaces may overstate its cooling potential.`,
    question: '27. Which of the following is NOT stated or implied in the passage?',
    options: [
      'Neighborhoods with more trees tend to have wider streets',
      'The 2024 study found tree cover has zero cooling effect',
      'Building density can independently influence urban heat retention',
      'Earlier estimates of tree cover\'s cooling effect may have been overstated',
      'Urban climatologists have raised concerns about attributing cooling solely to trees'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Teks menyatakan "while still beneficial" (efeknya tetap ada dan bermanfaat, hanya saja lebih kecil dari perkiraan), bukan nol sama sekali.'
  },
  {
    id: 'utbk-28',
    title: 'Passage 11: Tree Planting & Urban Heat Islands',
    skillType: 'Text Structure',
    difficulty: 'Sulit',
    pointWeight: 25,
    passage: `As global temperatures rise, many cities have adopted large-scale tree-planting initiatives, partly in response to studies linking urban tree canopy coverage to reduced surface temperatures during heat waves. Proponents cite research showing that neighborhoods with denser canopy cover can be several degrees cooler than those dominated by concrete and asphalt, framing tree planting as a straightforward mitigation strategy for the so-called urban heat island effect. Yet several urban climatologists caution that canopy coverage alone does not fully explain these temperature differences. Neighborhoods with more trees often also have lower building density, wider streets, and less impervious surface area — factors that independently reduce heat retention regardless of vegetation. A 2024 modeling study attempted to isolate the effect of tree cover from these structural variables and found that, while still beneficial, its cooling contribution was considerably smaller than earlier estimates suggested. The study\'s authors did not dispute the value of urban greening, but argued that policies treating tree planting as a substitute for reducing impervious surfaces may overstate its cooling potential.`,
    question: '28. Which finding, if true, would most weaken the climatologists\' caution?',
    options: [
      'A controlled study still found canopy cover to be the dominant cooling factor even after accounting for building density and impervious surface',
      'Cities with less funding struggled to implement tree-planting programs',
      'Residents in leafier neighborhoods reported higher satisfaction',
      'Tree planting takes years to produce measurable canopy coverage',
      'Some tree species resist urban pollution better than others'
    ],
    correctAnswerIndex: 0,
    explanation: 'Jawaban A. Jika studi terkontrol menemukan bahwa tutupan kanopi tetap merupakan faktor dominan pendingin suhu bahkan setelah memperhitungkan variabel lain, hal ini melemahkan keraguan klimatolog.'
  },

  // Passage 12: AI Writing Tools Debate (Q29 - Q30)
  {
    id: 'utbk-29',
    title: 'Passage 12: Debate on AI Writing Tools in Education',
    skillType: 'Inference',
    difficulty: 'Sulit',
    pointWeight: 25,
    passage: `During a class discussion on artificial intelligence, Farah argued that schools should ban AI writing tools entirely, insisting that students would never develop genuine writing skills otherwise. Her classmate, Bimo, countered that banning the tools outright would simply push their use underground, making it harder for teachers to guide students toward responsible use. He proposed instead that students be taught to use AI as a drafting aid, followed by mandatory revision exercises done entirely by hand. Their teacher, listening quietly, eventually noted that similar objections had been raised decades earlier about calculators in mathematics classrooms, and that the debate had ultimately shifted from prohibition toward teaching students when reliance on a tool was appropriate and when it was not.`,
    question: '29. What does the teacher\'s comment most strongly imply about her view on the debate?',
    options: [
      'She fully agrees with Farah\'s position',
      'She believes history suggests regulation is more realistic than an outright ban',
      'She thinks the debate is irrelevant to education',
      'She sides with Bimo without reservation',
      'She believes calculators and AI tools are entirely unrelated issues'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Komentar guru mengindikasikan bahwa belajar dari sejarah kalkulator, regulasi dan panduan pemakaian lebih realistis ketimbang pelarangan total.'
  },
  {
    id: 'utbk-30',
    title: 'Passage 12: Debate on AI Writing Tools in Education',
    skillType: 'Author Tone & Purpose',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `During a class discussion on artificial intelligence, Farah argued that schools should ban AI writing tools entirely, insisting that students would never develop genuine writing skills otherwise. Her classmate, Bimo, countered that banning the tools outright would simply push their use underground, making it harder for teachers to guide students toward responsible use. He proposed instead that students be taught to use AI as a drafting aid, followed by mandatory revision exercises done entirely by hand. Their teacher, listening quietly, eventually noted that similar objections had been raised decades earlier about calculators in mathematics classrooms, and that the debate had ultimately shifted from prohibition toward teaching students when reliance on a tool was appropriate and when it was not.`,
    question: '30. What is the primary purpose of the passage?',
    options: [
      'To argue that AI tools should be banned in schools',
      'To present contrasting viewpoints and suggest a historical parallel for resolving the debate',
      'To explain how calculators changed mathematics education',
      'To criticize Farah\'s argument as outdated',
      'To provide instructions for using AI responsibly'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Bertujuan menampilkan sudut pandang yang berlawanan dan menyajikan analogi paralel sejarah kalkulator untuk menyelesaikan perdebatan.'
  },

  // Passage 13: Artificial Intelligence in Diagnostic Radiology (Q31 - Q35)
  {
    id: 'utbk-31',
    title: 'Passage 13: AI in Medical Diagnostic Radiology',
    skillType: 'Main Idea',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Artificial Intelligence (AI) integration in healthcare has shifted from theoretical promise to practical application, particularly in diagnostic radiology. Machine learning algorithms trained on millions of medical images can now detect subtle abnormalities in X-rays, MRIs, and CT scans with accuracy rates that match or sometimes exceed experienced radiologists. Proponents argue that AI serving as a second pair of eyes reduces human error caused by fatigue, speeds up triage in emergency rooms, and expands diagnostic capabilities in underserved rural clinics lacking specialist doctors.

However, this rapid integration raises significant ethical and technical concerns. AI models are essentially "black boxes"—their decision-making processes are complex to the point that clinicians cannot always determine why an algorithm flagged a specific region as malignant. Furthermore, if the training data contains demographic biases, the AI may yield higher false-negative rates for underrepresented populations. Medical legal experts also point out the ambiguous liability: if an AI misdiagnoses a critical condition, responsibility remains unclear between the software developer, the hospital, or the attending physician.`,
    question: '31. What is the main topic of the passage?',
    options: [
      'The history of machine learning algorithms in modern medicine.',
      'The dual nature of AI implementation in medical diagnostic radiology.',
      'The legal procedures for medical malpractice involving technology.',
      'The superiority of artificial intelligence over human radiologists.',
      'The lack of healthcare infrastructure in rural communities.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Paragraf 1 membahas manfaat praktis AI, sedangkan paragraf 2 menguraikan masalah etis & teknis (sifat ganda / dua sisi penerapan AI).'
  },
  {
    id: 'utbk-32',
    title: 'Passage 13: AI in Medical Diagnostic Radiology',
    skillType: 'Inference',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `Artificial Intelligence (AI) integration in healthcare has shifted from theoretical promise to practical application, particularly in diagnostic radiology. Machine learning algorithms trained on millions of medical images can now detect subtle abnormalities in X-rays, MRIs, and CT scans with accuracy rates that match or sometimes exceed experienced radiologists. Proponents argue that AI serving as a second pair of eyes reduces human error caused by fatigue, speeds up triage in emergency rooms, and expands diagnostic capabilities in underserved rural clinics lacking specialist doctors.

However, this rapid integration raises significant ethical and technical concerns. AI models are essentially "black boxes"—their decision-making processes are complex to the point that clinicians cannot always determine why an algorithm flagged a specific region as malignant. Furthermore, if the training data contains demographic biases, the AI may yield higher false-negative rates for underrepresented populations. Medical legal experts also point out the ambiguous liability: if an AI misdiagnoses a critical condition, responsibility remains unclear between the software developer, the hospital, or the attending physician.`,
    question: '32. According to paragraph 1, how does AI benefit emergency room operations?',
    options: [
      'By replacing human doctors during night shifts.',
      'By offering legal protection to attending physicians.',
      'By accelerating the triage process for patients.',
      'By eliminating the need for expensive MRI machinery.',
      'By training inexperienced medical students directly.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Paragraf 1 secara eksplisit menyebutkan manfaat "speeds up triage in emergency rooms".'
  },
  {
    id: 'utbk-33',
    title: 'Passage 13: AI in Medical Diagnostic Radiology',
    skillType: 'Vocabulary in Context',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `Artificial Intelligence (AI) integration in healthcare has shifted from theoretical promise to practical application, particularly in diagnostic radiology. Machine learning algorithms trained on millions of medical images can now detect subtle abnormalities in X-rays, MRIs, and CT scans with accuracy rates that match or sometimes exceed experienced radiologists. Proponents argue that AI serving as a second pair of eyes reduces human error caused by fatigue, speeds up triage in emergency rooms, and expands diagnostic capabilities in underserved rural clinics lacking specialist doctors.

However, this rapid integration raises significant ethical and technical concerns. AI models are essentially "black boxes"—their decision-making processes are complex to the point that clinicians cannot always determine why an algorithm flagged a specific region as malignant. Furthermore, if the training data contains demographic biases, the AI may yield higher false-negative rates for underrepresented populations. Medical legal experts also point out the ambiguous liability: if an AI misdiagnoses a critical condition, responsibility remains unclear between the software developer, the hospital, or the attending physician.`,
    question: '33. The phrase "black boxes" in paragraph 2 implies that AI systems...',
    options: [
      'Are stored in highly secure hardware containers.',
      'Have opaque decision-making processes that lack transparency.',
      'Function only when diagnostic images are inverted to black and white.',
      'Are illegal to use in standard public hospitals.',
      'Have outdated source code that cannot be updated.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. "Black box" dalam istilah teknologi dan AI mengindikasikan proses komputasi yang tidak transparan atau tidak mudah ditelusuri logikanya oleh klinisi.'
  },
  {
    id: 'utbk-34',
    title: 'Passage 13: AI in Medical Diagnostic Radiology',
    skillType: 'Inference',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Artificial Intelligence (AI) integration in healthcare has shifted from theoretical promise to practical application, particularly in diagnostic radiology. Machine learning algorithms trained on millions of medical images can now detect subtle abnormalities in X-rays, MRIs, and CT scans with accuracy rates that match or sometimes exceed experienced radiologists. Proponents argue that AI serving as a second pair of eyes reduces human error caused by fatigue, speeds up triage in emergency rooms, and expands diagnostic capabilities in underserved rural clinics lacking specialist doctors.

However, this rapid integration raises significant ethical and technical concerns. AI models are essentially "black boxes"—their decision-making processes are complex to the point that clinicians cannot always determine why an algorithm flagged a specific region as malignant. Furthermore, if the training data contains demographic biases, the AI may yield higher false-negative rates for underrepresented populations. Medical legal experts also point out the ambiguous liability: if an AI misdiagnoses a critical condition, responsibility remains unclear between the software developer, the hospital, or the attending physician.`,
    question: '34. What can be inferred about AI models trained on biased demographic data?',
    options: [
      'They will automatically delete inaccurate medical scans.',
      'They will work efficiently only in rural healthcare facilities.',
      'They might provide unreliable diagnostic results for specific demographic groups.',
      'They will lower the overall cost of diagnostic procedures significantly.',
      'They will require software updates every few days.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Data pelatihan yang bias dapat menyebabkan hasil diagnosis yang tidak akurat (false-negative) bagi kelompok populasi tertentu.'
  },
  {
    id: 'utbk-35',
    title: 'Passage 13: AI in Medical Diagnostic Radiology',
    skillType: 'Author Tone & Purpose',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Artificial Intelligence (AI) integration in healthcare has shifted from theoretical promise to practical application, particularly in diagnostic radiology. Machine learning algorithms trained on millions of medical images can now detect subtle abnormalities in X-rays, MRIs, and CT scans with accuracy rates that match or sometimes exceed experienced radiologists. Proponents argue that AI serving as a second pair of eyes reduces human error caused by fatigue, speeds up triage in emergency rooms, and expands diagnostic capabilities in underserved rural clinics lacking specialist doctors.

However, this rapid integration raises significant ethical and technical concerns. AI models are essentially "black boxes"—their decision-making processes are complex to the point that clinicians cannot always determine why an algorithm flagged a specific region as malignant. Furthermore, if the training data contains demographic biases, the AI may yield higher false-negative rates for underrepresented populations. Medical legal experts also point out the ambiguous liability: if an AI misdiagnoses a critical condition, responsibility remains unclear between the software developer, the hospital, or the attending physician.`,
    question: '35. What is the author\'s stance regarding AI in diagnostic radiology?',
    options: [
      'Strongly dismissive of AI\'s capability in modern medicine.',
      'Fully enthusiastic without considering any technological drawbacks.',
      'Neutral and objective, balancing both advantages and concerns.',
      'Outraged by the legal liabilities imposed on software developers.',
      'Indifferent to the future developments of healthcare algorithms.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Penulis bersikap netral dan objektif dengan memaparkan keunggulan sekaligus tantangan etis dan hukumnya.'
  },

  // Passage 14: Ultra-processed foods (UPFs) & Public Health (Q36 - Q40)
  {
    id: 'utbk-36',
    title: 'Passage 14: Health Impacts of Ultra-Processed Foods',
    skillType: 'Text Structure',
    difficulty: 'Sulit',
    pointWeight: 25,
    passage: `Ultra-processed foods (UPFs) ranging from packaged snacks and carbonated drinks to instant meals have become dominant components of modern diets worldwide. These products typically undergo extensive industrial processing and contain additives such as emulsifiers, artificial flavors, and preservatives. [1] Recent epidemiological studies tracking thousands of participants over decades have established a strong correlation between high UPF consumption and an increased risk of cardiovascular diseases, type 2 diabetes, and clinical depression. [2]

The underlying mechanics extend beyond simple calorie counts. Researchers suggest that the high hyper-palatability of UPFs disrupts natural satiety signals in the human brain, causing individuals to overeat. [3] Furthermore, chemical additives and lack of dietary fiber damage the gut microbiome, triggering systemic inflammation throughout the body. [4] To combat this growing public health crisis, several nations have implemented targeted taxes on sugary beverages and mandated front-of-package warning labels. However, food industry lobbyists continuously push back, arguing that UPFs offer affordable and convenient nutrition for low-income households.`,
    question: '36. Which position in the passage is the most logical place for the following sentence?\n"This disruption often leads to chronic metabolic disorders over extended periods."',
    options: [
      '[1]',
      '[2]',
      '[3]',
      '[4]',
      'Right after the last sentence of the second paragraph.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Kalimat tersebut menjelaskan konsekuensi langsung dari gangguan sinyal kenyang otak (satiety signals disruption) pada posisi [3].'
  },
  {
    id: 'utbk-37',
    title: 'Passage 14: Health Impacts of Ultra-Processed Foods',
    skillType: 'Main Idea',
    difficulty: 'Sulit',
    pointWeight: 25,
    passage: `Ultra-processed foods (UPFs) ranging from packaged snacks and carbonated drinks to instant meals have become dominant components of modern diets worldwide. These products typically undergo extensive industrial processing and contain additives such as emulsifiers, artificial flavors, and preservatives. [1] Recent epidemiological studies tracking thousands of participants over decades have established a strong correlation between high UPF consumption and an increased risk of cardiovascular diseases, type 2 diabetes, and clinical depression. [2]

The underlying mechanics extend beyond simple calorie counts. Researchers suggest that the high hyper-palatability of UPFs disrupts natural satiety signals in the human brain, causing individuals to overeat. [3] Furthermore, chemical additives and lack of dietary fiber damage the gut microbiome, triggering systemic inflammation throughout the body. [4] To combat this growing public health crisis, several nations have implemented targeted taxes on sugary beverages and mandated front-of-package warning labels. However, food industry lobbyists continuously push back, arguing that UPFs offer affordable and convenient nutrition for low-income households.`,
    question: '37. Which of the following best summarizes paragraph 2?',
    options: [
      'UPFs cause health issues through brain signal disruption and gut damage, prompting policy responses met with industry resistance.',
      'Food industry lobbyists are solely responsible for the rise in global cardiovascular diseases and diabetes.',
      'Low-income households prefer UPFs because government taxes make fresh food unnecessarily expensive.',
      'Diets rich in dietary fiber can completely neutralize the negative effects of carbonated soft drinks.',
      'Front-of-package labels have successfully eliminated UPF consumption in developing countries.'
    ],
    correctAnswerIndex: 0,
    explanation: 'Jawaban A. Paragraf 2 merangkum mekanisme biologis kerusakan tubuh oleh UPF, langkah kebijakan negara, serta perlawanan dari pelobi industri pangan.'
  },
  {
    id: 'utbk-38',
    title: 'Passage 14: Health Impacts of Ultra-Processed Foods',
    skillType: 'Vocabulary in Context',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `Ultra-processed foods (UPFs) ranging from packaged snacks and carbonated drinks to instant meals have become dominant components of modern diets worldwide. These products typically undergo extensive industrial processing and contain additives such as emulsifiers, artificial flavors, and preservatives. [1] Recent epidemiological studies tracking thousands of participants over decades have established a strong correlation between high UPF consumption and an increased risk of cardiovascular diseases, type 2 diabetes, and clinical depression. [2]

The underlying mechanics extend beyond simple calorie counts. Researchers suggest that the high hyper-palatability of UPFs disrupts natural satiety signals in the human brain, causing individuals to overeat. [3] Furthermore, chemical additives and lack of dietary fiber damage the gut microbiome, triggering systemic inflammation throughout the body. [4] To combat this growing public health crisis, several nations have implemented targeted taxes on sugary beverages and mandated front-of-package warning labels. However, food industry lobbyists continuously push back, arguing that UPFs offer affordable and convenient nutrition for low-income households.`,
    question: '38. The word "palatability" in paragraph 2 is closest in meaning to...',
    options: [
      'Expiration date',
      'Nutritional density',
      'Taste pleasantness',
      'Manufacturing cost',
      'Chemical toxicity'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. "Palatability" merujuk pada kelezatan rasa atau daya tarik rasa makanan di lidah (taste pleasantness).'
  },
  {
    id: 'utbk-39',
    title: 'Passage 14: Health Impacts of Ultra-Processed Foods',
    skillType: 'Inference',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `Ultra-processed foods (UPFs) ranging from packaged snacks and carbonated drinks to instant meals have become dominant components of modern diets worldwide. These products typically undergo extensive industrial processing and contain additives such as emulsifiers, artificial flavors, and preservatives. [1] Recent epidemiological studies tracking thousands of participants over decades have established a strong correlation between high UPF consumption and an increased risk of cardiovascular diseases, type 2 diabetes, and clinical depression. [2]

The underlying mechanics extend beyond simple calorie counts. Researchers suggest that the high hyper-palatability of UPFs disrupts natural satiety signals in the human brain, causing individuals to overeat. [3] Furthermore, chemical additives and lack of dietary fiber damage the gut microbiome, triggering systemic inflammation throughout the body. [4] To combat this growing public health crisis, several nations have implemented targeted taxes on sugary beverages and mandated front-of-package warning labels. However, food industry lobbyists continuously push back, arguing that UPFs offer affordable and convenient nutrition for low-income households.`,
    question: '39. Based on the passage, why do food industry lobbyists oppose regulations on UPFs?',
    options: [
      'They claim warning labels reduce the shelf life of packaged snacks.',
      'They argue UPFs provide cheap and accessible food options for poorer families.',
      'They believe public health agencies lack scientific proof regarding gut microbiomes.',
      'They want governments to subsidize artificial flavor production instead.',
      'They insist that UPFs contain more dietary fiber than raw agricultural goods.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Pelobi industri beralasan UPF menyediakan alternatif makanan murah dan mudah diakses bagi keluarga berpenghasilan rendah.'
  },
  {
    id: 'utbk-40',
    title: 'Passage 14: Health Impacts of Ultra-Processed Foods',
    skillType: 'Author Tone & Purpose',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Ultra-processed foods (UPFs) ranging from packaged snacks and carbonated drinks to instant meals have become dominant components of modern diets worldwide. These products typically undergo extensive industrial processing and contain additives such as emulsifiers, artificial flavors, and preservatives. [1] Recent epidemiological studies tracking thousands of participants over decades have established a strong correlation between high UPF consumption and an increased risk of cardiovascular diseases, type 2 diabetes, and clinical depression. [2]

The underlying mechanics extend beyond simple calorie counts. Researchers suggest that the high hyper-palatability of UPFs disrupts natural satiety signals in the human brain, causing individuals to overeat. [3] Furthermore, chemical additives and lack of dietary fiber damage the gut microbiome, triggering systemic inflammation throughout the body. [4] To combat this growing public health crisis, several nations have implemented targeted taxes on sugary beverages and mandated front-of-package warning labels. However, food industry lobbyists continuously push back, arguing that UPFs offer affordable and convenient nutrition for low-income households.`,
    question: '40. What is the primary purpose of the author writing this passage?',
    options: [
      'To advertise healthier packaged food alternatives created by industrial companies.',
      'To criticize low-income households for making poor nutritional choices.',
      'To inform readers about the health risks of UPFs and the ongoing debate over their regulation.',
      'To demand an immediate global prohibition on all food processing factories.',
      'To compare the dietary habits of ancient humans with modern society.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Tujuan utama adalah menginformasikan risiko kesehatan dari makanan ultra-proses serta dinamika perdebatan regulasinya.'
  },

  // Passage 15 (Text A & Text B): Remote Work Dynamics (Q41 - Q45)
  {
    id: 'utbk-41',
    title: 'Passage 15 (Text A & B): Remote Work Flexibility vs Virtual Burnout',
    skillType: 'Text Structure',
    difficulty: 'Sulit',
    pointWeight: 25,
    passage: `Text A
Remote work has transformed the traditional employment landscape by granting workers unprecedented flexibility. Employees no longer spend hours commuting, allowing them to achieve a healthier work-life balance and dedicate more time to personal well-being and family. Studies show that remote workers frequently report higher job satisfaction and lower stress levels. Furthermore, companies benefit from reduced overhead costs related to physical office space and gain access to a global talent pool unbound by geographic limitations.

Text B
While remote work offers convenience, it introduces severe challenges to organizational cohesion and mental health. The lack of face-to-face interaction weakens workplace relationships, making spontaneous collaboration and creative brainstorming much harder to foster. Over time, the blur between professional responsibilities and personal life leads to "virtual burnout," where employees feel compelled to remain constantly connected. Additionally, junior staff members suffer from a lack of informal mentorship that naturally occurs in an in-person office environment.`,
    question: '41. What is the relationship between Text A and Text B?',
    options: [
      'Text B presents empirical evidence supporting the claims made in Text A.',
      'Text B highlights the drawbacks of a work model that Text A views positively.',
      'Text A proposes a technological solution to the organizational problem discussed in Text B.',
      'Text A compares historical work models, while Text B predicts future employment trends.',
      'Both texts argue that remote work should be legally banned across all commercial sectors.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Text A menyoroti dampak positif fleksibilitas kerja jarak jauh, sedangkan Text B menyoroti sisi negatif dan tantangannya.'
  },
  {
    id: 'utbk-42',
    title: 'Passage 15 (Text A & B): Remote Work Flexibility vs Virtual Burnout',
    skillType: 'Inference',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Text A
Remote work has transformed the traditional employment landscape by granting workers unprecedented flexibility. Employees no longer spend hours commuting, allowing them to achieve a healthier work-life balance and dedicate more time to personal well-being and family. Studies show that remote workers frequently report higher job satisfaction and lower stress levels. Furthermore, companies benefit from reduced overhead costs related to physical office space and gain access to a global talent pool unbound by geographic limitations.

Text B
While remote work offers convenience, it introduces severe challenges to organizational cohesion and mental health. The lack of face-to-face interaction weakens workplace relationships, making spontaneous collaboration and creative brainstorming much harder to foster. Over time, the blur between professional responsibilities and personal life leads to "virtual burnout," where employees feel compelled to remain constantly connected. Additionally, junior staff members suffer from a lack of informal mentorship that naturally occurs in an in-person office environment.`,
    question: '42. Unlike Text A, Text B emphasizes that remote work...',
    options: [
      'Reduces corporate overhead expenditure.',
      'Expands hiring options across international borders.',
      'Impairs spontaneous collaborative efforts among workers.',
      'Allows employees to manage personal family schedules effectively.',
      'Decreases overall commuting time in urban areas.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Text B secara gamblang menegaskan hambatan pada kolaborasi spontan dan proses brainstorming tim.'
  },
  {
    id: 'utbk-43',
    title: 'Passage 15 (Text A & B): Remote Work Flexibility vs Virtual Burnout',
    skillType: 'Vocabulary in Context',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `Text A
Remote work has transformed the traditional employment landscape by granting workers unprecedented flexibility. Employees no longer spend hours commuting, allowing them to achieve a healthier work-life balance and dedicate more time to personal well-being and family. Studies show that remote workers frequently report higher job satisfaction and lower stress levels. Furthermore, companies benefit from reduced overhead costs related to physical office space and gain access to a global talent pool unbound by geographic limitations.

Text B
While remote work offers convenience, it introduces severe challenges to organizational cohesion and mental health. The lack of face-to-face interaction weakens workplace relationships, making spontaneous collaboration and creative brainstorming much harder to foster. Over time, the blur between professional responsibilities and personal life leads to "virtual burnout," where employees feel compelled to remain constantly connected. Additionally, junior staff members suffer from a lack of informal mentorship that naturally occurs in an in-person office environment.`,
    question: '43. The phrase "virtual burnout" in Text B most likely refers to...',
    options: [
      'Hardware failure caused by continuous computer usage.',
      'Exhaustion resulting from the inability to disconnect from work duties.',
      'Increased internet costs paid by home-based workers.',
      'Lack of interest in learning new digital software applications.',
      'Physical injury sustained during long hours of office commuting.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. "Virtual burnout" merujuk pada kelelahan mental akibat tuntutan terus-menerus terhubung dan kaburnya batas antara jam kerja dan kehidupan pribadi.'
  },
  {
    id: 'utbk-44',
    title: 'Passage 15 (Text A & B): Remote Work Flexibility vs Virtual Burnout',
    skillType: 'Inference',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Text A
Remote work has transformed the traditional employment landscape by granting workers unprecedented flexibility. Employees no longer spend hours commuting, allowing them to achieve a healthier work-life balance and dedicate more time to personal well-being and family. Studies show that remote workers frequently report higher job satisfaction and lower stress levels. Furthermore, companies benefit from reduced overhead costs related to physical office space and gain access to a global talent pool unbound by geographic limitations.

Text B
While remote work offers convenience, it introduces severe challenges to organizational cohesion and mental health. The lack of face-to-face interaction weakens workplace relationships, making spontaneous collaboration and creative brainstorming much harder to foster. Over time, the blur between professional responsibilities and personal life leads to "virtual burnout," where employees feel compelled to remain constantly connected. Additionally, junior staff members suffer from a lack of informal mentorship that naturally occurs in an in-person office environment.`,
    question: '44. An employee who thrives on unstructured socializing and immediate feedback from senior mentors would likely...',
    options: [
      'Agree completely with the perspective in Text A.',
      'Prefer the work dynamic described in Text B\'s critique of remote work.',
      'Reject both remote and in-person office environments entirely.',
      'Advocate for higher commuting subsidies from their company.',
      'Work more efficiently in complete isolation at home.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Karyawan yang membutuhkan bimbingan langsung dan interaksi tatap muka akan sejalan dengan poin kritik yang diangkat dalam Text B.'
  },
  {
    id: 'utbk-45',
    title: 'Passage 15 (Text A & B): Remote Work Flexibility vs Virtual Burnout',
    skillType: 'Text Structure',
    difficulty: 'Sulit',
    pointWeight: 25,
    passage: `Text A
Remote work has transformed the traditional employment landscape by granting workers unprecedented flexibility. Employees no longer spend hours commuting, allowing them to achieve a healthier work-life balance and dedicate more time to personal well-being and family. Studies show that remote workers frequently report higher job satisfaction and lower stress levels. Furthermore, companies benefit from reduced overhead costs related to physical office space and gain access to a global talent pool unbound by geographic limitations.

Text B
While remote work offers convenience, it introduces severe challenges to organizational cohesion and mental health. The lack of face-to-face interaction weakens workplace relationships, making spontaneous collaboration and creative brainstorming much harder to foster. Over time, the blur between professional responsibilities and personal life leads to "virtual burnout," where employees feel compelled to remain constantly connected. Additionally, junior staff members suffer from a lack of informal mentorship that naturally occurs in an in-person office environment.`,
    question: '45. Which policy would synthesize the concerns raised in BOTH texts?',
    options: [
      'Forcing all employees to return to the office 5 days a week permanently.',
      'Transitioning the entire corporate structure to 100% remote work indefinitely.',
      'Implementing a hybrid work model with designated office days for mentorship and collaboration.',
      'Banning digital communication tools after 12:00 PM every weekday.',
      'Firing junior staff members who request remote working options.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Model kerja hybrid memberikan perpaduan ideal antara kenyamanan/fleksibilitas remote (Text A) dengan kebutuhan bimbingan dan kolaborasi tatap muka (Text B).'
  },

  // Passage 16: Renewable Energy Transition Rates - Region X & Region Y (Q46 - Q50)
  {
    id: 'utbk-46',
    title: 'Passage 16: Renewable Energy Transition in Region X & Region Y',
    skillType: 'Inference',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `Renewable energy transition rates vary significantly across regions due to economic factors and policy commitments. In 2020, Region X derived 25% of its total electricity from renewable sources, while Region Y stood at 40%. By 2025, Region X accelerated its investments in solar infrastructure, raising its renewable share to 45%. Conversely, Region Y experienced grid stability issues and regulatory delays, resulting in a modest increase to only 48% over the same five-year period.

Experts note that financial subsidies in Region X played a pivotal role in encouraging private sector investments. Meanwhile, Region Y relied heavily on state-funded projects, which suffered from budget reallocations. Projections suggest that if Region X maintains its annual growth trajectory, it will surpass Region Y in total clean energy output within the next two years, proving that policy incentives can dramatically shift national energy profiles.`,
    question: '46. Based on the passage, what was the percentage point increase in renewable energy share for Region X between 2020 and 2025?',
    options: [
      '5%',
      '15%',
      '20%',
      '25%',
      '45%'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Pada tahun 2020 Region X = 25%. Pada tahun 2025 naik menjadi 45%. Peningkatannya adalah 45% - 25% = 20% (percentage points).'
  },
  {
    id: 'utbk-47',
    title: 'Passage 16: Renewable Energy Transition in Region X & Region Y',
    skillType: 'Inference',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `Renewable energy transition rates vary significantly across regions due to economic factors and policy commitments. In 2020, Region X derived 25% of its total electricity from renewable sources, while Region Y stood at 40%. By 2025, Region X accelerated its investments in solar infrastructure, raising its renewable share to 45%. Conversely, Region Y experienced grid stability issues and regulatory delays, resulting in a modest increase to only 48% over the same five-year period.

Experts note that financial subsidies in Region X played a pivotal role in encouraging private sector investments. Meanwhile, Region Y relied heavily on state-funded projects, which suffered from budget reallocations. Projections suggest that if Region X maintains its annual growth trajectory, it will surpass Region Y in total clean energy output within the next two years, proving that policy incentives can dramatically shift national energy profiles.`,
    question: '47. What caused the slowdown in Region Y’s renewable energy growth according to the text?',
    options: [
      'Rapid inflation in the market price of solar panels.',
      'Public protests against wind turbine installations.',
      'Grid stability challenges and administrative delays.',
      'Complete withdrawal of all private sector investors.',
      'A massive decrease in overall national electricity demand.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Jawaban C. Teks secara langsung menyatakan: "Region Y experienced grid stability issues and regulatory delays..."'
  },
  {
    id: 'utbk-48',
    title: 'Passage 16: Renewable Energy Transition in Region X & Region Y',
    skillType: 'Text Structure',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Renewable energy transition rates vary significantly across regions due to economic factors and policy commitments. In 2020, Region X derived 25% of its total electricity from renewable sources, while Region Y stood at 40%. By 2025, Region X accelerated its investments in solar infrastructure, raising its renewable share to 45%. Conversely, Region Y experienced grid stability issues and regulatory delays, resulting in a modest increase to only 48% over the same five-year period.

Experts note that financial subsidies in Region X played a pivotal role in encouraging private sector investments. Meanwhile, Region Y relied heavily on state-funded projects, which suffered from budget reallocations. Projections suggest that if Region X maintains its annual growth trajectory, it will surpass Region Y in total clean energy output within the next two years, proving that policy incentives can dramatically shift national energy profiles.`,
    question: '48. What is the main difference in investment strategy between Region X and Region Y?',
    options: [
      'Region X used financial subsidies to spur private investment, while Region Y depended on state funding.',
      'Region X imported nuclear power, whereas Region Y constructed coal plants.',
      'Region X relied on foreign aid, while Region Y issued municipal bonds.',
      'Region X banned private investments, whereas Region Y encouraged corporate monopolies.',
      'Region X funded research universities, while Region Y focused on consumer rebates.'
    ],
    correctAnswerIndex: 0,
    explanation: 'Jawaban A. Region X memberikan subsidi finansial guna merangsang investasi sektor swasta, sementara Region Y bergantung pada proyek yang didanai negara.'
  },
  {
    id: 'utbk-49',
    title: 'Passage 16: Renewable Energy Transition in Region X & Region Y',
    skillType: 'Vocabulary in Context',
    difficulty: 'Mudah',
    pointWeight: 15,
    passage: `Renewable energy transition rates vary significantly across regions due to economic factors and policy commitments. In 2020, Region X derived 25% of its total electricity from renewable sources, while Region Y stood at 40%. By 2025, Region X accelerated its investments in solar infrastructure, raising its renewable share to 45%. Conversely, Region Y experienced grid stability issues and regulatory delays, resulting in a modest increase to only 48% over the same five-year period.

Experts note that financial subsidies in Region X played a pivotal role in encouraging private sector investments. Meanwhile, Region Y relied heavily on state-funded projects, which suffered from budget reallocations. Projections suggest that if Region X maintains its annual growth trajectory, it will surpass Region Y in total clean energy output within the next two years, proving that policy incentives can dramatically shift national energy profiles.`,
    question: '49. The word "pivotal" in paragraph 2 could be best replaced by...',
    options: [
      'Insignificant',
      'Crucial',
      'Temporary',
      'Harmful',
      'Optional'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Kata "pivotal" berarti krusial, fundamental, atau sangat penting (crucial).'
  },
  {
    id: 'utbk-50',
    title: 'Passage 16: Renewable Energy Transition in Region X & Region Y',
    skillType: 'Inference',
    difficulty: 'Sedang',
    pointWeight: 20,
    passage: `Renewable energy transition rates vary significantly across regions due to economic factors and policy commitments. In 2020, Region X derived 25% of its total electricity from renewable sources, while Region Y stood at 40%. By 2025, Region X accelerated its investments in solar infrastructure, raising its renewable share to 45%. Conversely, Region Y experienced grid stability issues and regulatory delays, resulting in a modest increase to only 48% over the same five-year period.

Experts note that financial subsidies in Region X played a pivotal role in encouraging private sector investments. Meanwhile, Region Y relied heavily on state-funded projects, which suffered from budget reallocations. Projections suggest that if Region X maintains its annual growth trajectory, it will surpass Region Y in total clean energy output within the next two years, proving that policy incentives can dramatically shift national energy profiles.`,
    question: '50. What is predicted to happen if Region X maintains its current growth rate?',
    options: [
      'It will experience widespread electrical blackouts due to grid overload.',
      'Its renewable energy output will overtake Region Y’s within two years.',
      'It will stop accepting private sector investments entirely.',
      'Region Y will completely shut down its clean energy infrastructure.',
      'Government subsidies in Region X will be legally terminated.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Jawaban B. Teks secara eksplisit memprediksi bahwa Region X akan melampaui output energi bersih Region Y dalam waktu dua tahun ("surpass Region Y in total clean energy output within the next two years").'
  }
];
