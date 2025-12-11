"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
const hero = {
    headline: 'From concept to reality',
    subheadline: 'Let’s bring your machine idea to life today',
    ctaPrimary: 'Send',
    ctaSecondary: 'Request demo',
};
const capabilities = [
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
const articles = [
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
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpSecure = process.env.SMTP_SECURE === 'true';
const mailFrom = process.env.MAIL_FROM || 'no-reply@warning-machines.com';
const mailTo = process.env.MAIL_TO || 'warning.machines@gmail.com';
const transporter = smtpHost && smtpPort && smtpUser && smtpPass
    ? nodemailer_1.default.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
    })
    : null;
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.get('/api/content', (_req, res) => {
    res.json({
        hero,
        capabilities,
        highlights,
        articles,
    });
});
app.post('/api/contact', async (req, res) => {
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
    }
    catch (err) {
        console.error('Contact email failed', err);
        const error = err instanceof Error ? err.message : 'Email send failed';
        return res.status(502).json({ success: false, error });
    }
});
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map