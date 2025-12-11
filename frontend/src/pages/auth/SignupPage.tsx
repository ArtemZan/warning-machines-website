import './auth.css';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleSignInButton } from '../../components/GoogleSignInButton';
import { useAuth } from '../../hooks/useAuth';

export function SignupPage() {
  const navigate = useNavigate();
  const { user, loginWithGoogleCredential, loginWithCredentials, logout } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email) return;
    loginWithCredentials(email, name);
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
        <p className="eyebrow">Sign up</p>
        <h1>Create your account</h1>
        <p className="section__lede">Get started with prototypes, quotes, and project updates.</p>
      </div>
      <div className="card auth__card">
        <div className="auth__google">
          <GoogleSignInButton onCredential={handleGoogleCredential} text="signup_with" />
        </div>
        <div className="auth__divider">or</div>
        <form className="auth__form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Name</span>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="button button--primary" type="submit">Create account</button>
        </form>
        <p className="auth__hint">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
}

