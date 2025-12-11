import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

type NavBarProps = {
  onCTAClick?: () => void;
};

export function NavBar({ onCTAClick }: NavBarProps) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const displayName = user?.name || 'Account';

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
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        ) : null}
      </nav>
      <div className="nav__actions">
        {user ? (
          <div className="nav__user" ref={menuRef}>
            <button className="nav__user-btn" onClick={() => setMenuOpen((open) => !open)} aria-haspopup="true" aria-expanded={menuOpen}>
              <span className="nav__user-avatar" aria-hidden="true">{displayName?.[0]?.toUpperCase() || 'U'}</span>
              <span className="nav__user-name">{displayName}</span>
            </button>
            {menuOpen ? (
              <div className="nav__dropdown" role="menu">
                <button className="nav__dropdown-item" role="menuitem" onClick={logout}>Log out</button>
              </div>
            ) : null}
          </div>
        ) : null}
        <button className="button button--primary" onClick={onCTAClick}>Get a quote</button>
      </div>
    </header>
  );
}

