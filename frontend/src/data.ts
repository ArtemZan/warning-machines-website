import type { Article, Hero, Service, SiteContent, Slide } from './types';

export const hero: Hero = {
  headline: 'From concept to reality',
  subheadline: 'Let’s bring your machine idea to life today',
  ctaPrimary: 'Send',
  ctaSecondary: 'Request demo',
};

export const capabilities: Service[] = [
  { id: 'injection-moulding', title: 'Injection Moulding Service', description: 'Fast tooling and short-run plastic parts.' },
  { id: 'printing', title: '3D Printing Service', description: 'Rapid prototypes using FDM, SLA, and SLS.' },
  { id: 'cnc', title: 'CNC Machining Service', description: 'Precision parts and production-ready components.' },
  { id: 'hardware', title: 'Hardware design', description: 'End-to-end device design and integration.' },
  { id: 'pcb-firmware', title: 'PCB and Firmware', description: 'Custom PCBs with embedded software and validation.' },
  { id: 'pre-cert', title: 'Pre Certification Testing', description: 'Prepare for compliance with early lab testing.' },
  { id: 'software', title: 'Software Design', description: 'Embedded, web, and cloud integrations.' },
];

export const highlights: string[] = [
  'Integrated hardware development services',
  'Rapid prototyping to scalable production',
  'Low-volume manufacturing and validation',
];

export const articles: Article[] = [
  {
    id: 'hidden-engine',
    title: 'The Hidden Engine Behind Every Smart Product',
    summary: 'How robust firmware and electronics underpin product reliability.',
    imageAlt: 'Close-up of a green PCB with firmware tools.',
  },
  {
    id: 'health-mvp',
    title: 'From Care to Cure: Craft Your Health MVP Story!',
    summary: 'Building medical prototypes with speed and compliance in mind.',
    imageAlt: 'Medical device prototype with 3D-printed casing and PCB.',
  },
  {
    id: 'idea-to-investment',
    title: 'From Idea to Investment: Build Your Product MVP!',
    summary: 'Taking concepts to investor-ready prototypes efficiently.',
    imageAlt: 'Product MVP comparison shots.',
  },
  {
    id: 'cnc-vs-3d',
    title: 'CNC Machines vs 3D Printers: Which Is Better for Prototyping?',
    summary: 'Choosing the right process for speed, finish, and cost.',
    imageAlt: 'Workshop with CNC and 3D printing equipment.',
  },
];

export const slides: Slide[] = [
  {
    id: 'fast-tooling-1',
    title: 'Fast Tooling = Faster Feedback',
    description: 'Low-volume molds, printed jigs, and fixtures accelerate validation with minimal delay.',
    image: '/images/slide1.png',
  },
  {
    id: 'fast-tooling-2',
    title: 'Low-volume molds, printed jigs, fixtures',
    description: 'Iterate quickly with hybrid CNC and printed tooling tailored to your prototype runs.',
    image: '/images/slide2.png',
  },
];

export const fallbackContent: SiteContent = {
  hero,
  capabilities,
  highlights,
  articles,
  slides,
};

