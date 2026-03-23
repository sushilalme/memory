export default function ProgressBar({ current, total }) {
  const progress = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="progress-wrap" aria-label="Progress">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-label">{progress}% complete</p>
    </div>
  );
}
