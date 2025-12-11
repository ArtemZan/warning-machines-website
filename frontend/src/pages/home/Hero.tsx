import type { Hero as HeroType } from '../../types';

type HeroProps = {
  hero: HeroType;
};

export function Hero({ hero }: HeroProps) {
  return (
    <section className="hero hero--full" id="top">
      <div className="hero__bg" />
      <div className="hero__content">
        <div className="hero__headline">
          <h1>
            From concept to <span>reality</span>
          </h1>
          <p className="hero__sub">{hero.subheadline}</p>
        </div>
      </div>
    </section>
  );
}

