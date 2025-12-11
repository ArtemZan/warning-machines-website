import type { ContactPayload, ContactResponse, SiteContent } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export async function fetchContent(): Promise<SiteContent> {
  const res = await fetch(`${API_BASE}/content`);
  if (!res.ok) {
    throw new Error(`Content request failed with status ${res.status}`);
  }
  return res.json() as Promise<SiteContent>;
}

export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    return { success: false, error: text || 'Failed to submit form' };
  }

  return res.json() as Promise<ContactResponse>;
}

