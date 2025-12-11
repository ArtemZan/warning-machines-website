import './auth.css';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleSignInButton } from '../../components/GoogleSignInButton';
import { useAuth } from '../../hooks/useAuth';

export function LoginPage() {
  const navigate = useNavigate();
  const { user, loginWithGoogleCredential, loginWithCredentials, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email) return;
    loginWithCredentials(email);
    setPassword('');
    navigate('/');
  };

  const handleGoogleCredential = (credential: string) => {
    loginWithGoogleCredential(credential);
    navigate('/');
  };

  if (user) {
    return (
      <main className="section auth">
        <div className="section__header">
          <p className="eyebrow">Already signed in</p>
          <h1>Hi, {user.name}</h1>
          <p className="section__lede">You are currently logged in. Go back to the site or sign out.</p>
        </div>
        <div className="card auth__card">
          <div className="auth__form" style={{ display: 'flex', gap: '0.75rem' }}>
            <Link className="button button--ghost" to="/">Return home</Link>
            <button className="button button--primary" type="button" onClick={logout}>Log out</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section auth">
      <div className="section__header">
        <p className="eyebrow">Login</p>
        <h1>Welcome back</h1>
        <p className="section__lede">Access your account to manage projects and requests.</p>
      </div>
      <div className="card auth__card">
        <div className="auth__google">
          <GoogleSignInButton onCredential={handleGoogleCredential} text="signin_with" />
        </div>
        <div className="auth__divider">or</div>
        <form className="auth__form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="button button--primary" type="submit">Log in</button>
        </form>
        <p className="auth__hint">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </main>
  );
}

