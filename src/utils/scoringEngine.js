import { getBucketForScore } from '../config/resultBuckets';

const DIMENSIONS = [
  'ambition',
  'learningStyle',
  'degreePreference',
  'facultyPreference',
  'actionOrientation',
  'effortLevel',
];

const weights = {
  q1_currentStatus: [
    { actionOrientation: 2, ambition: 2 },
    { actionOrientation: 1, ambition: 1 },
    { actionOrientation: 2, effortLevel: 2, ambition: 2 },
    { actionOrientation: 0, ambition: 0 },
  ],
  q2_goalAfterCollege: [
    { ambition: 7 },
    { ambition: 8, actionOrientation: 4 },
    { ambition: 5, learningStyle: 2 },
    { ambition: 2 },
  ],
  q3_excitement: [
    { actionOrientation: 5, learningStyle: 3 },
    { ambition: 5 },
    { actionOrientation: 6, learningStyle: 5 },
    { actionOrientation: 4, learningStyle: 4 },
  ],
  q4_degreePreference: [
    { degreePreference: 2, learningStyle: 1 },
    { degreePreference: 5, actionOrientation: 2 },
    { degreePreference: 8, learningStyle: 5 },
    { degreePreference: 10, learningStyle: 8, actionOrientation: 4 },
  ],
  q5_learningStyle: [
    { learningStyle: 2 },
    { learningStyle: 4 },
    { learningStyle: 7, actionOrientation: 3 },
    { learningStyle: 10, actionOrientation: 6 },
  ],
  q6_facultyPreference: [
    { facultyPreference: 2 },
    { facultyPreference: 4 },
    { facultyPreference: 8, actionOrientation: 2 },
    { facultyPreference: 10, ambition: 3, actionOrientation: 4 },
  ],
  q7_collegePriority: [
    { ambition: 2, degreePreference: 2 },
    { ambition: 5, degreePreference: 5 },
    { ambition: 8, degreePreference: 8, learningStyle: 4 },
    { ambition: 10, actionOrientation: 6, effortLevel: 4 },
  ],
  q8_effort: [
    { effortLevel: 2 },
    { effortLevel: 5 },
    { effortLevel: 8, ambition: 2 },
    { effortLevel: 10, ambition: 4, actionOrientation: 3 },
  ],
  q9_identity: [
    { ambition: 3 },
    { ambition: 6 },
    { ambition: 9, effortLevel: 3 },
    { ambition: 10, actionOrientation: 5 },
  ],
  q10_actionNow: [
    { actionOrientation: 1 },
    { actionOrientation: 3 },
    { actionOrientation: 6, learningStyle: 2 },
    { actionOrientation: 10, learningStyle: 5, effortLevel: 2 },
  ],
};

function clampScore(value) {
  return Math.max(0, Math.min(100, value));
}

export function scoreAnswers(answers) {
  const breakdown = DIMENSIONS.reduce((acc, dimension) => ({ ...acc, [dimension]: 0 }), {});

  Object.entries(answers).forEach(([questionId, selectedIndex]) => {
    const mapping = weights[questionId]?.[selectedIndex];
    if (!mapping) {
      return;
    }
    Object.entries(mapping).forEach(([dimension, value]) => {
      breakdown[dimension] += value;
    });
  });

  const maxDimensionScore = {
    ambition: 50,
    learningStyle: 33,
    degreePreference: 25,
    facultyPreference: 10,
    actionOrientation: 40,
    effortLevel: 20,
  };

  const normalizedBreakdown = Object.fromEntries(
    Object.entries(breakdown).map(([dimension, score]) => [dimension, clampScore(Math.round((score / maxDimensionScore[dimension]) * 100))])
  );

  const totalScore = clampScore(
    Math.round(
      normalizedBreakdown.ambition * 0.22 +
        normalizedBreakdown.learningStyle * 0.18 +
        normalizedBreakdown.degreePreference * 0.2 +
        normalizedBreakdown.facultyPreference * 0.12 +
        normalizedBreakdown.actionOrientation * 0.16 +
        normalizedBreakdown.effortLevel * 0.12
    )
  );

  const bucket = getBucketForScore(totalScore);

  return {
    totalScore,
    breakdown: normalizedBreakdown,
    bucket,
  };
}

export function getPracticalExposureLevel(scoreBreakdown) {
  const action = scoreBreakdown.actionOrientation;
  if (action < 35) {
    return 'Low';
  }
  if (action < 70) {
    return 'Medium';
  }
  return 'High';
}
