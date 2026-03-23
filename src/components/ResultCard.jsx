export default function ResultCard({ bucket, onNext, debugData }) {
  return (
    <section className="card step-fade">
      <p className="eyebrow">Your Predicted Salary Range by 25</p>
      <h2>{bucket.salaryRange}</h2>
      <p><strong>Profile:</strong> {bucket.profileTitle}</p>
      <p className="muted">{bucket.explanation}</p>

      <div className="accent-block">
        <p className="eyebrow">Potential with a future-ready project-driven path</p>
        <h3>{bucket.potentialRange}</h3>
        <p className="muted">{bucket.potentialMessage}</p>
      </div>

      {debugData ? (
        <details className="debug-panel">
          <summary>Debug score breakdown</summary>
          <pre>{JSON.stringify(debugData, null, 2)}</pre>
        </details>
      ) : null}

      <button className="btn btn-primary" type="button" onClick={onNext}>
        See How Top Engineers Reach 20+ LPA
      </button>
    </section>
  );
}
