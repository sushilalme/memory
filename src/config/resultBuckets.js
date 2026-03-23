export const resultBuckets = [
  {
    id: 'A',
    minScore: 0,
    maxScore: 44,
    label: 'Foundational Conventional Path',
    salaryRange: '₹4 – ₹7 LPA',
    profileTitle: 'Traditional Track with Limited Exposure',
    explanation:
      'Your current choices align with a conventional academic route. This can support stability, but growth may remain slower without practical experience and stronger market-facing skills.',
    potentialRange: '₹10 – ₹18 LPA',
    potentialMessage:
      'With a future-ready, project-driven approach and stronger mentors, your earning potential can increase significantly.',
  },
  {
    id: 'B',
    minScore: 45,
    maxScore: 64,
    label: 'Stable Growth Path',
    salaryRange: '₹6 – ₹10 LPA',
    profileTitle: 'Conventional Path with Growth Intent',
    explanation:
      'You show a balanced mindset between degree value and employability. Early internships and stronger practical depth can meaningfully improve outcomes.',
    potentialRange: '₹12 – ₹22 LPA',
    potentialMessage:
      'Shifting to a project-first and industry-led learning path can create faster career momentum.',
  },
  {
    id: 'C',
    minScore: 65,
    maxScore: 82,
    label: 'Future-Ready Path',
    salaryRange: '₹10 – ₹18 LPA',
    profileTitle: 'Skills-Oriented Modern Track',
    explanation:
      'Your answers indicate strong alignment with modern engineering outcomes. You are likely to benefit from practical execution, portfolio strength, and exposure to industry workflows.',
    potentialRange: '₹18 – ₹30 LPA+',
    potentialMessage:
      'With consistent project execution and guidance from builders, top-earning tracks become realistic.',
  },
  {
    id: 'D',
    minScore: 83,
    maxScore: 100,
    label: 'High-Leverage Engineering Path',
    salaryRange: '₹18 – ₹30 LPA+',
    profileTitle: 'Project-Driven High Growth Profile',
    explanation:
      'Your responses reflect high ambition, strong action orientation, and preference for practical and industry-led learning. This profile is well positioned for top-tier opportunities.',
    potentialRange: '₹24 – ₹40 LPA+',
    potentialMessage:
      'Staying consistent with high-intensity execution can compound outcomes beyond traditional trajectories.',
  },
];

export function getBucketForScore(totalScore) {
  return resultBuckets.find((bucket) => totalScore >= bucket.minScore && totalScore <= bucket.maxScore) ?? resultBuckets[0];
}
