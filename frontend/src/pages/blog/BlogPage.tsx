import './blog.css';
import type { Article } from '../../types';
import { Link } from 'react-router-dom';

type BlogPageProps = {
  articles: Article[];
};

export function BlogPage({ articles }: BlogPageProps) {
  return (
    <main className="section blog">
      <div className="section__header">
        <p className="eyebrow">Blog</p>
        <h1>Insights from the shop floor</h1>
        <p className="section__lede">Explore how we build, validate, and ship machines across industries.</p>
      </div>
      <div className="blog__grid">
        {articles.map((article) => (
          <article key={article.id} className="card card--article blog__card">
            {article.heroImage ? (
              <img src={article.heroImage} alt={article.imageAlt} className="card__image" />
            ) : null}
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            <div className="blog__actions">
              <Link className="link" to={`/blog/${article.id}`}>Read more</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

