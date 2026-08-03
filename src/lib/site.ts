export const SITE_URL = 'https://inaki.to';
export const SITE_NAME = 'inaki.to';

/** Join SITE_URL + path without double slashes. */
export function absoluteUrl(path = '/'): string {
	const base = SITE_URL.replace(/\/$/, '');
	if (!path || path === '/') return base;
	const p = path.startsWith('/') ? path : `/${path}`;
	return `${base}${p}`;
}
