export type Hero = {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary?: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  cta?: string;
};

export type Article = {
  id: string;
  title: string;
  summary: string;
  imageAlt: string;
  heroImage?: string;
  body?: string;
};

export type SiteContent = {
  hero: Hero;
  capabilities: Service[];
  highlights: string[];
  articles: Article[];
  slides?: Slide[];
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  agreement: boolean;
};

export type ContactResponse =
  | { success: true; data: ContactPayload & { receivedAt: string } }
  | { success: false; error: string };

export type Slide = {
  id: string;
  title: string;
  description: string;
  image: string;
};

