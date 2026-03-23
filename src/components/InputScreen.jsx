export default function InputScreen({ headline, subtext, label, value, onChange, error, cta, onSubmit, secondarySlot }) {
  return (
    <section className="card step-fade">
      <h2>{headline}</h2>
      <p className="muted">{subtext}</p>
      <label className="input-label">
        {label}
        <input value={value} onChange={(event) => onChange(event.target.value)} className={error ? 'input error' : 'input'} />
      </label>
      {error ? <p className="error-text">{error}</p> : null}
      {secondarySlot}
      <button type="button" className="btn btn-primary" onClick={onSubmit}>
        {cta}
      </button>
    </section>
  );
}
