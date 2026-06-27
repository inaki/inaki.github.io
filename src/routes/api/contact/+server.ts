import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const MAX_MESSAGE = 5000;
const MAX_NAME = 120;
const MAX_EMAIL = 254;

function isEmail(value: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const POST: RequestHandler = async ({ request }) => {
	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		throw error(400, 'Invalid request body');
	}

	const name = String(body.name ?? '').trim();
	const email = String(body.email ?? '').trim();
	const message = String(body.message ?? '').trim();
	// Honeypot: a real user never sees/fills this. Bots usually do.
	const honeypot = String(body.company ?? '').trim();

	// Pretend success for bots so they don't probe further.
	if (honeypot) return json({ ok: true });

	if (!isEmail(email) || email.length > MAX_EMAIL) throw error(400, 'A valid email is required.');
	if (!message) throw error(400, 'Message cannot be empty.');
	if (message.length > MAX_MESSAGE) throw error(400, 'Message is too long.');
	if (name.length > MAX_NAME) throw error(400, 'Name is too long.');

	const apiKey = env.RESEND_API_KEY;
	if (!apiKey) {
		console.error('[contact] RESEND_API_KEY is not set');
		throw error(503, 'Contact form is not configured yet.');
	}

	const to = env.CONTACT_TO_EMAIL || 'hello@inakito.com';
	// Until a custom domain is verified in Resend, "onboarding@resend.dev"
	// works but only delivers to your own Resend account email.
	const from = env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from,
			to: [to],
			reply_to: email,
			subject: `Portfolio message${name ? ` from ${name}` : ''}`,
			text: `From: ${name || '(no name)'} <${email}>\n\n${message}`
		})
	});

	if (!res.ok) {
		const detail = await res.text().catch(() => '');
		console.error('[contact] Resend error', res.status, detail);
		throw error(502, 'Could not send your message. Please try again later.');
	}

	return json({ ok: true });
};
