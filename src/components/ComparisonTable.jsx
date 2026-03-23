export default function ComparisonTable({ rows }) {
  return (
    <section className="card step-fade">
      <h2>Your Current Path vs High-Growth Engineering Path</h2>
      <div className="comparison-table">
        {rows.map((row) => (
          <div className="comparison-row" key={row.label}>
            <p className="comparison-label">{row.label}</p>
            <div>
              <p className="muted">Your path</p>
              <p>{row.current}</p>
            </div>
            <div>
              <p className="muted">High-growth path</p>
              <p>{row.highGrowth}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
