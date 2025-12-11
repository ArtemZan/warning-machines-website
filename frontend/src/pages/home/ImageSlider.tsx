import type { Slide } from '../../types';

type ImageSliderProps = {
  slides: Slide[];
};

export function ImageSlider({ slides }: ImageSliderProps) {
  return (
    <section className="section section--slider">
      <div className="section__header">
        <p className="eyebrow">Production of quality prototypes</p>
        <h2>Fast tooling, faster feedback</h2>
      </div>
      <div className="slider">
        {slides.map((slide) => (
          <article key={slide.id} className="slide" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="slide__overlay" />
            <div className="slide__content">
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
              <a className="button button--ghost" href="#contact">Request demo</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

