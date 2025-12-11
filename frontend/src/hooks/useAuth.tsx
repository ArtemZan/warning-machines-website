import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type AuthUser = {
  name: string;
  email?: string;
  picture?: string;
  sub?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loginWithGoogleCredential: (credential: string) => void;
  loginWithCredentials: (email: string, name?: string) => void;
  logout: () => void;
};

const STORAGE_KEY = 'auth:user';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function decodeJwt(credential: string): AuthUser | null {
  try {
    const [, payload] = credential.split('.');
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const data = JSON.parse(json);
    return {
      name: data.name || data.given_name || data.email?.split('@')[0],
      email: data.email,
      picture: data.picture,
      sub: data.sub,
    };
  } catch (_err) {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch (_err) {
      return null;
    }
  });

  const persist = useCallback((next: AuthUser | null) => {
    setUser(next);
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const loginWithGoogleCredential = useCallback(
    (credential: string) => {
      const decoded = decodeJwt(credential);
      if (decoded) {
        persist(decoded);
      }
    },
    [persist]
  );

  const loginWithCredentials = useCallback(
    (email: string, name?: string) => {
      const fallbackName = name?.trim() || email.split('@')[0];
      persist({ email, name: fallbackName });
    },
    [persist]
  );

  const logout = useCallback(() => persist(null), [persist]);

  const value = useMemo(
    () => ({ user, loginWithGoogleCredential, loginWithCredentials, logout }),
    [user, loginWithGoogleCredential, loginWithCredentials, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

