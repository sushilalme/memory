export const appCopy = {
  landing: {
    headline: 'What Could You Earn by 25?',
    subheadline:
      'Take this quick assessment to discover your likely salary path based on your learning preferences, career choices, and engineering ambitions.',
    cta: 'Start Assessment',
    helper: 'Takes about 2 minutes',
  },
  nameScreen: {
    headline: 'Before we show your result',
    subtext: 'Enter your name to unlock your salary prediction.',
    label: 'Full Name',
    cta: 'Continue',
  },
  phoneScreen: {
    headline: 'One last step',
    subtext: 'Enter your phone number to view your result and career path analysis.',
    label: 'Phone Number',
    cta: 'View My Result',
    consent: 'I agree to be contacted for counselling and program updates.',
  },
  processing: {
    headline: 'Analyzing your path',
    lines: [
      'Mapping your learning preferences',
      'Evaluating career alignment',
      'Comparing your profile with future-ready engineering pathways',
      'Estimating likely salary trajectory',
    ],
  },
  curiosity: {
    headline: 'Want to know how engineers reach 20+ LPA?',
    subtext:
      'The difference usually is not just talent. It is how they learn, who they learn from, and how early they start building.',
    primary: 'Show Me',
    secondary: 'Skip',
  },
  insights: [
    {
      title: 'Top engineers do not only study. They build.',
      body: 'Students who work on real products early tend to develop stronger portfolios, better confidence, and clearer career direction.',
    },
    {
      title: 'The right degree structure changes the outcome.',
      body: 'A conventional degree may provide a base. A dynamically updated, project-driven degree can create much stronger career momentum.',
    },
    {
      title: 'Faculty shapes exposure.',
      body: 'Learning only from conventional teaching can limit industry readiness. Guidance from experts and builders often changes how students think and execute.',
    },
  ],
  finalCta: {
    headline: 'See Your Best-Fit Roadmap',
    subtext:
      'Based on your answers, we can show you the kind of engineering path that fits your goals best.',
    primary: 'Talk to a Mentor',
    secondary: 'Get My Career Roadmap',
    note: 'Ideal for Grade 12 students exploring future-ready engineering options.',
  },
};

export const questions = [
  {
    id: 'q1_currentStatus',
    prompt: 'What are you currently doing?',
    options: ['Class 12 PCM', 'Class 12 Other Stream', 'Taking a Drop Year', 'Still Exploring'],
  },
  {
    id: 'q2_goalAfterCollege',
    prompt: 'What do you want after college?',
    options: ['A high-paying job', 'To build a startup', 'Research or higher studies', 'I am not sure yet'],
  },
  {
    id: 'q3_excitement',
    prompt: 'What excites you most?',
    options: ['Coding and AI', 'Business and money', 'Building products', 'Solving real-world problems'],
  },
  {
    id: 'q4_degreePreference',
    prompt: 'What kind of engineering degree would you prefer?',
    options: [
      'Conventional degree focused on theory and exams',
      'Conventional degree with internships',
      'New-age degree with modern tech curriculum',
      'New-age dynamically updated degree with real projects from the start',
    ],
  },
  {
    id: 'q5_learningStyle',
    prompt: 'How do you learn best?',
    options: [
      'Lectures and notes',
      'Theory with some practical exposure',
      'Mostly hands-on learning',
      'By building real things from the beginning',
    ],
  },
  {
    id: 'q6_facultyPreference',
    prompt: 'Who would you prefer to learn from?',
    options: [
      'Conventional teachers',
      'Mostly teachers with a few guest lectures',
      'Industry experts',
      'Founders and industry builders',
    ],
  },
  {
    id: 'q7_collegePriority',
    prompt: 'What matters most to you in college?',
    options: [
      'A safe and recognized degree',
      'Degree plus employability',
      'Future-ready skills',
      'Real work, projects, and strong outcomes',
    ],
  },
  {
    id: 'q8_effort',
    prompt: 'How much effort are you willing to put in?',
    options: ['Enough to clear exams', 'A decent amount', 'I am ready to work hard', 'I will do whatever it takes'],
  },
  {
    id: 'q9_identity',
    prompt: 'Which sounds closest to you?',
    options: [
      'I want a stable job',
      'I want strong career growth',
      'I want to be among top earners',
      'I want to create something big',
    ],
  },
  {
    id: 'q10_actionNow',
    prompt: 'Are you already doing something toward your future career?',
    options: [
      'Not really',
      'Only school study',
      'Learning from online resources',
      'Building projects or practical work',
    ],
  },
];
