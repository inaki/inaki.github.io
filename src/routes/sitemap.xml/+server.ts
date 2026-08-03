import { getPublishedSlugs } from '$lib/blog/meta';
import { absoluteUrl } from '$lib/site';

export const prerender = true;

export function GET() {
	const now = new Date().toISOString().slice(0, 10);

	const urls: { loc: string; priority: string; changefreq?: string; lastmod?: string }[] = [
		{ loc: absoluteUrl('/'), priority: '1.0', changefreq: 'weekly', lastmod: now },
		{ loc: absoluteUrl('/resume'), priority: '0.95', changefreq: 'monthly', lastmod: now },
		{ loc: absoluteUrl('/blog'), priority: '0.9', changefreq: 'weekly', lastmod: now },
		...getPublishedSlugs().map((slug) => ({
			loc: absoluteUrl(`/blog/${slug}`),
			priority: '0.8',
			changefreq: 'monthly' as const,
			lastmod: now
		}))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `  <url>
    <loc>${u.loc}</loc>
    <priority>${u.priority}</priority>${u.changefreq ? `\n    <changefreq>${u.changefreq}</changefreq>` : ''}${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
