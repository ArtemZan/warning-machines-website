import './App.css';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { useContent } from './hooks/useContent';
import { HomePage } from './pages/home/Home';
import { BlogPage } from './pages/blog/BlogPage';
import { ArticlePage } from './pages/blog/ArticlePage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { Routes, Route } from 'react-router-dom';

function scrollToContact() {
  const contact = document.getElementById('contact');
  if (contact) {
    contact.scrollIntoView({ behavior: 'smooth' });
  }
}

function App() {
  const { content, loading, error } = useContent();

  return (
    <div className="page">
      <NavBar onCTAClick={scrollToContact} />
      <Routes>
        <Route path="/" element={<HomePage content={content} />} />
        <Route path="/blog" element={<BlogPage articles={content.articles} />} />
        <Route path="/blog/:id" element={<ArticlePage articles={content.articles} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <Footer />
      <div className="status">
        {loading ? <span>Loading live content…</span> : null}
        {error ? <span className="status__warning">Using fallback content: {error}</span> : null}
      </div>
    </div>
  );
}

export default App;
