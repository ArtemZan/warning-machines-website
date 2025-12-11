import './App.css';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { useContent } from './hooks/useContent';
import { HomePage } from './pages/home/Home';

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
      <HomePage content={content} />
      <Footer />
      <div className="status">
        {loading ? <span>Loading live content…</span> : null}
        {error ? <span className="status__warning">Using fallback content: {error}</span> : null}
      </div>
    </div>
  );
}

export default App;
