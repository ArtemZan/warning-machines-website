const logos = [
  'resonator.svg',
  'axign.png',
  'kaercher.svg',
  'scania-wide.png',
  'r-logo.png',
  'shelly.svg',
  'bms.jpg',
  'cinemacity.svg',
];

export function LogoStrip() {
  return (
    <section className="section section--muted section--logos">
      <div className="logo-strip">
        {logos.map((src, idx) => (
          <div key={`${src}-${idx}`} className="logo-strip__item">
            <img src={`/images/logos/${src}`} alt="Client logo" />
          </div>
        ))}
      </div>
    </section>
  );
}

