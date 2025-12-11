import './blog.css';
import { useParams, Link } from 'react-router-dom';
import type { Article } from '../../types';

type ArticlePageProps = {
  articles: Article[];
};

export function ArticlePage({ articles }: ArticlePageProps) {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <main className="section blog">
        <div className="section__header">
          <h1>Article not found</h1>
          <p className="section__lede">The article you’re looking for doesn’t exist.</p>
          <Link className="link" to="/blog">Back to blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section blog">
      <div className="section__header">
        <p className="eyebrow">Blog</p>
        <h1>{article.title}</h1>
        <p className="section__lede">{article.summary}</p>
      </div>
      {article.heroImage ? (
        <div className="article__hero">
          <img src={article.heroImage} alt={article.imageAlt} />
        </div>
      ) : null}
      <article className="article__body">
        {article.body ? <p>{article.body}</p> : <p>More details coming soon.</p>}
      </article>
      <div className="blog__actions">
        <Link className="link" to="/blog">Back to blog</Link>
      </div>
    </main>
  );
}

