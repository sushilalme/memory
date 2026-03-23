export default function CTASection({ headline, subtext, primary, secondary, note, onPrimary, onSecondary, withSecondary = true }) {
  return (
    <section className="card step-fade">
      <h2>{headline}</h2>
      <p className="muted">{subtext}</p>
      <button className="btn btn-primary" type="button" onClick={onPrimary}>
        {primary}
      </button>
      {withSecondary ? (
        <button className="btn btn-secondary" type="button" onClick={onSecondary}>
          {secondary}
        </button>
      ) : null}
      {note ? <p className="footnote">{note}</p> : null}
    </section>
  );
}
