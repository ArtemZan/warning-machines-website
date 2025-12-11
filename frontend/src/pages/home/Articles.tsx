import type { Article } from '../../types';

type ArticlesProps = {
  articles: Article[];
};

export function Articles({ articles }: ArticlesProps) {
  return (
    <section className="section" id="articles">
      <div className="section__header">
        <p className="eyebrow">Blog</p>
        <h2>Insights from the shop floor</h2>
        <p className="section__lede">
          Explore how we build, validate, and ship machines across industries.
        </p>
      </div>
      <div className="grid grid--articles">
        {articles.map((article) => (
          <article key={article.id} className="card card--article">
            <div className="card__image" aria-hidden="true">
              <span>{article.imageAlt}</span>
            </div>
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            <a className="link" href="#contact">
              Read more
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

