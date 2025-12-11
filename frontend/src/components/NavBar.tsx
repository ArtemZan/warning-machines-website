import { Link } from 'react-router-dom';

type NavBarProps = {
  onCTAClick?: () => void;
};

export function NavBar({ onCTAClick }: NavBarProps) {
  return (
    <header className="nav">
      <div className="nav__brand">
        <Link to="/" className="nav__logo">warning-machines.com</Link>
      </div>
      <nav className="nav__links" aria-label="Primary">
        <a href="/#services">Services</a>
        <a href="/#process">Process</a>
        <Link to="/blog">Blog</Link>
        <a href="/#contact" onClick={onCTAClick}>Quote Form</a>
      </nav>
      <div className="nav__actions">
        <a className="button button--ghost" href="/#login">Sign Up / Log In</a>
        <button className="button button--primary" onClick={onCTAClick}>
          Get a quote
        </button>
      </div>
    </header>
  );
}

