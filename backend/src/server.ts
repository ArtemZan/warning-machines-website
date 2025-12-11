import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import nodemailer from 'nodemailer';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

type Service = {
  id: string;
  title: string;
  description: string;
  cta?: string;
};

type Article = {
  id: string;
  title: string;
  summary: string;
  imageAlt: string;
  heroImage?: string;
  body?: string;
};

const hero = {
  headline: 'From concept to reality',
  subheadline: 'Let’s bring your machine idea to life today',
  ctaPrimary: 'Send',
  ctaSecondary: 'Request demo',
};

const capabilities: Service[] = [
  { id: 'pcb', title: 'PCB & Firmware', description: 'Custom PCB design, firmware and validation.' },
  { id: 'cnc', title: 'CNC Machining', description: 'Precision parts, prototypes, and low-volume production.' },
  { id: 'printing', title: '3D Printing', description: 'Rapid prototypes using FDM, SLA, and SLS.' },
  { id: 'moulding', title: 'Injection Moulding', description: 'Fast tooling and short-run plastic parts.' },
  { id: 'hardware', title: 'Hardware Design', description: 'End-to-end device design and integration.' },
  { id: 'software', title: 'Software Design', description: 'Embedded, web, and cloud integration support.' },
];

const highlights = [
  'Integrated hardware development services',
  'Rapid prototyping to scalable production',
  'Low-volume manufacturing and validation',
];

const articles: Article[] = [
{
  id: 'firmware',
  title: 'The Hidden Engine Behind Every Smart Product',
  summary: 'How robust firmware and electronics underpin product reliability.',
  imageAlt: 'Close-up of a green PCB with firmware tools.',
  heroImage: '/images/articles/firmware.jpg',
  body: `Smart products rely on resilient electronics and firmware. Robust architectures, EMI-aware layouts, and testable firmware ensure reliability under real-world stress. We emphasize early validation, fault-tolerant design, and observability so products behave predictably in the field.`,
},
{
  id: 'health-mvp',
  title: 'From Care to Cure: Craft Your Health MVP Story!',
  summary: 'Building medical prototypes with speed and compliance in mind.',
  imageAlt: 'Medical device prototype with 3D-printed casing and PCB.',
  heroImage: '/images/articles/care-to-cure.png',
  body: `Healthcare MVPs demand rapid iteration without sacrificing safety. We combine additive manufacturing, CNC, and embedded prototyping to iterate enclosures and electronics fast, while planning for verification, documentation, and regulatory pathways from day one.`,
},
{
  id: 'idea-to-investment',
  title: 'From Idea to Investment: Build Your Product MVP!',
  summary: 'Taking concepts to investor-ready prototypes efficiently.',
  imageAlt: 'Product MVP comparison shots.',
  heroImage: '/images/articles/idea-to-investment.png',
  body: `Investor-ready MVPs balance polish with proof. We focus on functional prototypes that demonstrate core value, manufacturability, and a clear path to scale: validated architecture, tight BOM control, and a build story investors can trust.`,
},
{
  id: 'cnc-vs-3d',
  title: 'CNC Machines vs 3D Printers: Which Is Better for Prototyping?',
  summary: 'Choosing the right process for speed, finish, and cost.',
  imageAlt: 'Workshop with CNC and 3D printing equipment.',
  heroImage: '/images/articles/cnc-vs-3d.png',
  body: `CNC delivers precision, material strength, and finish; 3D printing wins on speed and geometry freedom. We help teams pick the right process per part—often a hybrid—considering tolerances, surface requirements, cost-per-part, and lead time.`,
}
]

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpSecure = process.env.SMTP_SECURE === 'true';
const mailFrom = process.env.MAIL_FROM;
const mailTo = process.env.MAIL_TO;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI;

console.log(process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.SMTP_USER, process.env.SMTP_PASS, process.env.SMTP_SECURE, process.env.MAIL_FROM, process.env.MAIL_TO);

const transporter = smtpHost && smtpPort && smtpUser && smtpPass
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })
  : null;

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/content', (_req: Request, res: Response) => {
  res.json({
    hero,
    capabilities,
    highlights,
    articles,
  });
});

app.get('/api/auth/google', (_req: Request, res: Response) => {
  if (!googleClientId || !googleRedirectUri) {
    return res.status(500).json({ error: 'Google OAuth is not configured on the server.' });
  }

  const params = new URLSearchParams({
    client_id: googleClientId,
    redirect_uri: googleRedirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
});

app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, message, agreement } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
  }

  if (!transporter) {
    return res.status(500).json({ success: false, error: 'Email transport is not configured on the server.' });
  }

  const payload = {
    name,
    email,
    message,
    agreement: Boolean(agreement),
    receivedAt: new Date().toISOString(),
  };

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: email,
      subject: 'New message from warning-machines.com',
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Agreement: ${payload.agreement}`,
        '',
        message,
        '',
        `Received at: ${payload.receivedAt}`,
      ].join('\n'),
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Agreement:</strong> ${payload.agreement}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><small>Received at: ${payload.receivedAt}</small></p>
      `,
    });

    console.info('Contact submission emailed', payload);
    return res.json({ success: true, data: payload });
  } catch (err) {
    console.error('Contact email failed', err);
    const error = err instanceof Error ? err.message : 'Email send failed';
    return res.status(502).json({ success: false, error });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API running on http://localhost:${port}`);
});

