/**
 * POST /api/contact — Vercel serverless function behind the website contact form.
 *
 * Sends each enquiry by email through Resend (https://resend.com) using its
 * HTTP API, so no extra npm dependency is needed.
 *
 * Environment variables (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY  required  API key from the Resend dashboard
 *   CONTACT_TO      required  Inbox(es) that receive enquiries, comma-separated
 *   CONTACT_FROM    optional  Verified sender, e.g. "KEI-AL Website <web@kei.al>".
 *                             Defaults to Resend's test sender, which only
 *                             delivers to the Resend account owner's address.
 */
import type { IncomingMessage, ServerResponse } from 'node:http';

type Req = IncomingMessage & { body?: unknown };
type Res = ServerResponse;

const SERVICE_LABELS: Record<string, string> = {
  accounting: 'Konsulencë Kontabël',
  audit: 'Auditim Ligjor & i Brendshëm',
  payroll: 'Shërbime për Pagat & HR',
  tax: 'Tatime & Këshillim Fiskal',
  other: 'Këshillim Biznesi & Ekspertizë Gjyqësore',
};

const LIMITS = { fullName: 120, companyName: 160, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort per-instance rate limit: 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function send(res: Res, status: number, body: Record<string, unknown>) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

async function readBody(req: Req): Promise<Record<string, unknown>> {
  if (req.body && typeof req.body === 'object') return req.body as Record<string, unknown>;
  if (typeof req.body === 'string') return JSON.parse(req.body);
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { ok: false, error: 'method_not_allowed' });
  }

  let body: Record<string, unknown>;
  try {
    body = await readBody(req);
  } catch {
    return send(res, 400, { ok: false, error: 'invalid_json' });
  }

  // Honeypot: real visitors never see or fill this field. Pretend success to bots.
  if (str(body.website)) return send(res, 200, { ok: true });

  const fullName = str(body.fullName);
  const companyName = str(body.companyName);
  const email = str(body.email);
  const service = str(body.service);
  const message = str(body.message);

  if (
    !fullName || !email || !message ||
    !EMAIL_RE.test(email) ||
    fullName.length > LIMITS.fullName ||
    companyName.length > LIMITS.companyName ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return send(res, 422, { ok: false, error: 'validation' });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded ?? '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return send(res, 429, { ok: false, error: 'rate_limited' });

  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.CONTACT_TO ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const from = process.env.CONTACT_FROM || 'KEI-AL Website <onboarding@resend.dev>';
  if (!apiKey || to.length === 0) {
    console.error('[contact] RESEND_API_KEY or CONTACT_TO is not set');
    return send(res, 500, { ok: false, error: 'not_configured' });
  }

  const serviceLabel = SERVICE_LABELS[service] ?? 'Pa specifikuar';
  const rows: [string, string][] = [
    ['Emri', fullName],
    ['Kompania', companyName || '—'],
    ['Email', email],
    ['Shërbimi', serviceLabel],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#14213D">
      <h2 style="font-size:18px;margin:0 0 12px">Mesazh i ri nga kei.al</h2>
      <table style="border-collapse:collapse">
        ${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5B6673">${k}</td><td style="padding:4px 0"><b>${escapeHtml(v)}</b></td></tr>`).join('')}
      </table>
      <p style="margin:16px 0 4px;color:#5B6673">Mesazhi:</p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
      <p style="margin-top:20px;font-size:12px;color:#8A94A0">Përgjigjuni këtij emaili për t'i shkruar direkt klientit.</p>
    </div>`;

  const text = [
    'Mesazh i ri nga kei.al',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Mesazhi:',
    message,
  ].join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Kërkesë e re: ${fullName.slice(0, 60)} — ${serviceLabel}`,
        html,
        text,
      }),
    });
    if (!r.ok) {
      console.error('[contact] Resend error', r.status, await r.text().catch(() => ''));
      return send(res, 502, { ok: false, error: 'send_failed' });
    }
  } catch (err) {
    console.error('[contact] Network error', err);
    return send(res, 502, { ok: false, error: 'send_failed' });
  }

  return send(res, 200, { ok: true });
}
