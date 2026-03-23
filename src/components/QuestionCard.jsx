import OptionCard from './OptionCard';

export default function QuestionCard({ question, selectedIndex, onSelect, onNext, onBack, step, total }) {
  return (
    <section className="card step-fade" aria-live="polite">
      <p className="eyebrow">Question {step} of {total}</p>
      <h2>{question.prompt}</h2>
      <div className="option-grid">
        {question.options.map((option, index) => (
          <OptionCard key={option} text={option} selected={selectedIndex === index} onClick={() => onSelect(index)} />
        ))}
      </div>
      <div className="actions-row">
        <button className="btn btn-secondary" type="button" onClick={onBack}>
          Back
        </button>
        <button className="btn btn-primary" type="button" onClick={onNext} disabled={selectedIndex === undefined}>
          Next
        </button>
      </div>
    </section>
  );
}
