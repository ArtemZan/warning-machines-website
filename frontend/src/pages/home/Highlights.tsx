type HighlightsProps = {
  items: string[];
};

export function Highlights({ items }: HighlightsProps) {
  return (
    <section className="section section--muted" id="process">
      <div className="section__header">
        <p className="eyebrow">Why Warning Machines</p>
        <h2>From initial concept to scalable production</h2>
        <p className="section__lede">
          An in-house team spanning electronics, mechanics, firmware, and software keeps projects aligned and moving.
        </p>
      </div>
      <div className="pill-list">
        {items.map((item) => (
          <span key={item} className="pill">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

