import type { FormEvent } from 'react';
import { useState } from 'react';
import { submitContact } from '../../lib/api';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setError(undefined);

    if (!agreement) {
      setStatus('error');
      setError('You must agree to the NDA and site policies.');
      return;
    }

    try {
      const result = await submitContact({ name, email, message, agreement });
      if (result.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setAgreement(false);
      } else {
        setStatus('error');
        setError(result.error);
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <section className="section section--muted" id="contact">
      <div className="section__header">
        <p className="eyebrow">Quote Form</p>
        <h2>Let’s bring your machine idea to life</h2>
        <p className="section__lede">
          Tell us about your project and we’ll respond quickly with next steps.
        </p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__grid">
          <label className="field">
            <span>Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
        </div>
        <label className="field">
          <span>Message</span>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" required />
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
            required
          />
          <span>I agree to the NDA and site policies</span>
        </label>
        <div className="form__actions">
          <button className="button button--primary" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Send'}
          </button>
          {status === 'success' ? <p className="form__status form__status--ok">Message sent successfully.</p> : null}
          {status === 'error' ? <p className="form__status form__status--error">{error || 'Submission failed.'}</p> : null}
        </div>
      </form>
    </section>
  );
}

