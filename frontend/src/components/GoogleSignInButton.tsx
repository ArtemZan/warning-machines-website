import { useEffect, useRef } from 'react';

type GoogleSignInButtonProps = {
  onCredential: (credential: string) => void;
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  size?: 'large' | 'medium' | 'small';
};

declare global {
  interface Window {
    google?: any;
  }
}

const CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  '528035409256-tf8s0ojuh3891j5i4to54n6ihv5ttv00.apps.googleusercontent.com';

let scriptLoading: Promise<void> | null = null;

function loadGoogleScript(): Promise<void> {
  if (scriptLoading) return scriptLoading;
  scriptLoading = new Promise((resolve, reject) => {
    if (document.querySelector('script[data-google-identity]')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Identity script'));
    document.head.appendChild(script);
  });
  return scriptLoading;
}

export function GoogleSignInButton({
  onCredential,
  text = 'continue_with',
  theme = 'outline',
  shape = 'rectangular',
  size = 'large',
}: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadGoogleScript()
      .then(() => {
        if (cancelled || !window.google || !buttonRef.current) return;
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (response: { credential: string }) => {
            if (response?.credential) onCredential(response.credential);
          },
        });
        window.google.accounts.id.renderButton(buttonRef.current, {
          type: text,
          theme,
          shape,
          size,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      cancelled = true;
    };
  }, [onCredential, text, theme, shape, size]);

  return <div ref={buttonRef} />;
}

