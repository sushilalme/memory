import { useEffect, useMemo, useState } from 'react';
import CTASection from './components/CTASection';
import ComparisonTable from './components/ComparisonTable';
import InputScreen from './components/InputScreen';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';
import { appCopy, questions } from './config/quizConfig';
import { scoreAnswers, getPracticalExposureLevel } from './utils/scoringEngine';
import { formatLeadPayload } from './utils/leadPayloadFormatter';
import { submitLeadPayload } from './utils/webhook';
import { clearSavedState, getSavedState, saveState } from './utils/storage';
import { trackEvent } from './utils/analytics';

const STAGES = {
  LANDING: 'landing',
  QUIZ: 'quiz',
  NAME: 'name',
  PHONE: 'phone',
  PROCESSING: 'processing',
  RESULT: 'result',
  CURIOSITY: 'curiosity',
  INSIGHTS: 'insights',
  COMPARISON: 'comparison',
  FINAL: 'final',
};

const stageProgress = {
  [STAGES.LANDING]: 0,
  [STAGES.QUIZ]: 20,
  [STAGES.NAME]: 50,
  [STAGES.PHONE]: 60,
  [STAGES.PROCESSING]: 70,
  [STAGES.RESULT]: 78,
  [STAGES.CURIOSITY]: 84,
  [STAGES.INSIGHTS]: 90,
  [STAGES.COMPARISON]: 95,
  [STAGES.FINAL]: 100,
};

const debugMode = new URLSearchParams(window.location.search).get('debug') === '1';

const initialState = {
  stage: STAGES.LANDING,
  questionIndex: 0,
  answers: {},
  fullName: '',
  phoneNumber: '',
  consent: false,
  insightIndex: 0,
  scoring: null,
};

export default function App() {
  const [state, setState] = useState(() => getSavedState() ?? initialState);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [processingLineIndex, setProcessingLineIndex] = useState(0);

  const currentQuestion = questions[state.questionIndex];

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    if (state.stage !== STAGES.PROCESSING) {
      return undefined;
    }

    const rotateInterval = setInterval(() => {
      setProcessingLineIndex((prev) => (prev + 1) % appCopy.processing.lines.length);
    }, 700);

    const resultTimeout = setTimeout(() => {
      setState((prev) => ({ ...prev, stage: STAGES.RESULT }));
      trackEvent('result_viewed', { bucket: state.scoring?.bucket?.id });
    }, 2800);

    return () => {
      clearInterval(rotateInterval);
      clearTimeout(resultTimeout);
    };
  }, [state.stage, state.scoring]);

  const scoreData = useMemo(() => state.scoring ?? scoreAnswers(state.answers), [state.scoring, state.answers]);

  function updateAnswer(selectedIndex) {
    const questionId = currentQuestion.id;
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: selectedIndex },
    }));
    trackEvent('question_answered', { questionId, selectedIndex });
  }

  function startQuiz() {
    setState((prev) => ({ ...prev, stage: STAGES.QUIZ }));
    trackEvent('quiz_start');
  }

  function goToNextQuestion() {
    if (state.questionIndex < questions.length - 1) {
      setState((prev) => ({ ...prev, questionIndex: prev.questionIndex + 1 }));
      return;
    }
    setState((prev) => ({ ...prev, stage: STAGES.NAME }));
  }

  function goToPreviousQuestion() {
    if (state.questionIndex === 0) {
      setState((prev) => ({ ...prev, stage: STAGES.LANDING }));
      return;
    }
    setState((prev) => ({ ...prev, questionIndex: prev.questionIndex - 1 }));
  }

  function submitName() {
    const trimmed = state.fullName.trim();
    if (trimmed.length < 2) {
      setNameError('Please enter at least 2 characters.');
      return;
    }
    setNameError('');
    setState((prev) => ({ ...prev, fullName: trimmed, stage: STAGES.PHONE }));
    trackEvent('lead_name_submitted');
  }

  async function submitPhone() {
    const cleaned = state.phoneNumber.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleaned)) {
      setPhoneError('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    setPhoneError('');

    const scoring = scoreAnswers(state.answers);
    const nextState = {
      ...state,
      phoneNumber: cleaned,
      scoring,
      stage: STAGES.PROCESSING,
    };

    setState(nextState);
    trackEvent('lead_phone_submitted');

    const payload = formatLeadPayload({
      fullName: state.fullName,
      phoneNumber: cleaned,
      answers: state.answers,
      scoring,
      consent: state.consent,
    });

    try {
      await submitLeadPayload(payload);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Lead submission failed', error);
    }
  }

  function goToInsights() {
    setState((prev) => ({ ...prev, stage: STAGES.CURIOSITY }));
    trackEvent('cta_clicked', { source: 'result_screen' });
  }

  function restartFlow() {
    clearSavedState();
    setState(initialState);
  }

  const comparisonRows = [
    {
      label: 'Degree Model',
      current: questions[3].options[state.answers.q4_degreePreference ?? 0],
      highGrowth: 'Dynamically updated + project-driven',
    },
    {
      label: 'Learning Mode',
      current: questions[4].options[state.answers.q5_learningStyle ?? 0],
      highGrowth: 'Build from year 1',
    },
    {
      label: 'Faculty',
      current: questions[5].options[state.answers.q6_facultyPreference ?? 0],
      highGrowth: 'Industry experts and builders',
    },
    {
      label: 'Practical Exposure',
      current: getPracticalExposureLevel(scoreData.breakdown),
      highGrowth: 'Real projects + internships + strong portfolio',
    },
    {
      label: 'Career Ceiling by 25',
      current: scoreData.bucket.salaryRange,
      highGrowth: '₹20 LPA+',
    },
  ];

  const totalProgressSteps = 100;
  const progress = stageProgress[state.stage] + (state.stage === STAGES.QUIZ ? ((state.questionIndex + 1) / questions.length) * 30 : 0);

  return (
    <main className="app-shell">
      <div className="container">
        <ProgressBar current={progress} total={totalProgressSteps} />

        {state.stage === STAGES.LANDING && (
          <section className="card step-fade landing">
            <h1>{appCopy.landing.headline}</h1>
            <p className="muted">{appCopy.landing.subheadline}</p>
            <button className="btn btn-primary" type="button" onClick={startQuiz}>
              {appCopy.landing.cta}
            </button>
            <p className="footnote">{appCopy.landing.helper}</p>
          </section>
        )}

        {state.stage === STAGES.QUIZ && (
          <QuestionCard
            question={currentQuestion}
            selectedIndex={state.answers[currentQuestion.id]}
            onSelect={updateAnswer}
            onNext={goToNextQuestion}
            onBack={goToPreviousQuestion}
            step={state.questionIndex + 1}
            total={questions.length}
          />
        )}

        {state.stage === STAGES.NAME && (
          <InputScreen
            headline={appCopy.nameScreen.headline}
            subtext={appCopy.nameScreen.subtext}
            label={appCopy.nameScreen.label}
            value={state.fullName}
            onChange={(fullName) => setState((prev) => ({ ...prev, fullName }))}
            error={nameError}
            cta={appCopy.nameScreen.cta}
            onSubmit={submitName}
          />
        )}

        {state.stage === STAGES.PHONE && (
          <InputScreen
            headline={appCopy.phoneScreen.headline}
            subtext={appCopy.phoneScreen.subtext}
            label={appCopy.phoneScreen.label}
            value={state.phoneNumber}
            onChange={(phoneNumber) => setState((prev) => ({ ...prev, phoneNumber }))}
            error={phoneError}
            cta={appCopy.phoneScreen.cta}
            onSubmit={submitPhone}
            secondarySlot={(
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={state.consent}
                  onChange={(event) => setState((prev) => ({ ...prev, consent: event.target.checked }))}
                />
                <span>{appCopy.phoneScreen.consent}</span>
              </label>
            )}
          />
        )}

        {state.stage === STAGES.PROCESSING && (
          <section className="card step-fade processing">
            <h2>{appCopy.processing.headline}</h2>
            <div className="spinner" aria-hidden />
            <p className="muted">{appCopy.processing.lines[processingLineIndex]}</p>
          </section>
        )}

        {state.stage === STAGES.RESULT && (
          <ResultCard bucket={scoreData.bucket} onNext={goToInsights} debugData={debugMode ? scoreData : null} />
        )}

        {state.stage === STAGES.CURIOSITY && (
          <CTASection
            headline={appCopy.curiosity.headline}
            subtext={appCopy.curiosity.subtext}
            primary={appCopy.curiosity.primary}
            secondary={appCopy.curiosity.secondary}
            onPrimary={() => setState((prev) => ({ ...prev, stage: STAGES.INSIGHTS }))}
            onSecondary={() => setState((prev) => ({ ...prev, stage: STAGES.COMPARISON }))}
          />
        )}

        {state.stage === STAGES.INSIGHTS && (
          <CTASection
            headline={appCopy.insights[state.insightIndex].title}
            subtext={appCopy.insights[state.insightIndex].body}
            primary={state.insightIndex === appCopy.insights.length - 1 ? 'Continue' : 'Next Insight'}
            secondary="Skip"
            onPrimary={() => {
              if (state.insightIndex < appCopy.insights.length - 1) {
                setState((prev) => ({ ...prev, insightIndex: prev.insightIndex + 1 }));
                return;
              }
              setState((prev) => ({ ...prev, stage: STAGES.COMPARISON }));
            }}
            onSecondary={() => setState((prev) => ({ ...prev, stage: STAGES.COMPARISON }))}
          />
        )}

        {state.stage === STAGES.COMPARISON && (
          <>
            <ComparisonTable rows={comparisonRows} />
            <div className="stack-actions">
              <button className="btn btn-primary" type="button" onClick={() => setState((prev) => ({ ...prev, stage: STAGES.FINAL }))}>
                Continue
              </button>
            </div>
          </>
        )}

        {state.stage === STAGES.FINAL && (
          <CTASection
            headline={appCopy.finalCta.headline}
            subtext={appCopy.finalCta.subtext}
            primary={appCopy.finalCta.primary}
            secondary={appCopy.finalCta.secondary}
            note={appCopy.finalCta.note}
            onPrimary={() => trackEvent('cta_clicked', { cta: 'talk_to_mentor' })}
            onSecondary={() => trackEvent('cta_clicked', { cta: 'career_roadmap' })}
          />
        )}

        {(state.stage === STAGES.FINAL || state.stage === STAGES.RESULT) && (
          <button type="button" className="btn btn-tertiary restart" onClick={restartFlow}>
            Restart Assessment
          </button>
        )}
      </div>
    </main>
  );
}
