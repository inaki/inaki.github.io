/**
 * Meta-only blog registry for client-safe imports (terminal BlogCard).
 * Parses frontmatter and discards bodies after computing reading time.
 * Does NOT import marked — full HTML lives in posts.ts for route loaders.
 */
import type { BlogPostMeta } from './types';
import {
	parseMarkdownFile,
	readingMinutesFromBody,
	slugFromFilename,
	stemFromPath
} from './parse';

const modules = import.meta.glob('/content/blog/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

type Internal = BlogPostMeta & { body: string; sourcePath: string };

const registry: Internal[] = buildRegistry();

function buildRegistry(): Internal[] {
	const bySlug = new Map<string, Internal>();

	for (const [path, raw] of Object.entries(modules)) {
		const stem = stemFromPath(path);
		// Authoring docs live next to posts; skip non-post files.
		if (stem.toLowerCase() === 'readme' || stem.startsWith('_')) continue;
		const { data, body } = parseMarkdownFile(raw, path);
		const slug = data.slug ?? slugFromFilename(stem);

		if (bySlug.has(slug)) {
			throw new Error(
				`[blog] duplicate slug "${slug}" (${bySlug.get(slug)!.sourcePath} and ${path})`
			);
		}

		bySlug.set(slug, {
			slug,
			title: data.title,
			description: data.description,
			date: data.date,
			updated: data.updated,
			tags: data.tags,
			draft: data.draft,
			ogImage: data.ogImage,
			readingMinutes: readingMinutesFromBody(body),
			body,
			sourcePath: path
		});
	}

	return [...bySlug.values()].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

function toMeta(p: Internal): BlogPostMeta {
	return {
		slug: p.slug,
		title: p.title,
		description: p.description,
		date: p.date,
		updated: p.updated,
		tags: p.tags,
		draft: p.draft,
		ogImage: p.ogImage,
		readingMinutes: p.readingMinutes
	};
}

/** Published posts, newest first. */
export function listPosts(opts?: { includeDrafts?: boolean }): BlogPostMeta[] {
	const includeDrafts = opts?.includeDrafts === true;
	return registry.filter((p) => includeDrafts || !p.draft).map(toMeta);
}

/** Single source of truth for prerender entries, sitemap, RSS, terminal card. */
export function getPublishedSlugs(): string[] {
	return listPosts().map((p) => p.slug);
}

export function getPostMeta(slug: string): BlogPostMeta | undefined {
	const hit = registry.find((p) => p.slug === slug);
	return hit ? toMeta(hit) : undefined;
}

/** Internal: body for render layer (posts.ts only). */
export function getRawBody(slug: string): string | undefined {
	return registry.find((p) => p.slug === slug)?.body;
}

export function getInternalPost(slug: string): Internal | undefined {
	return registry.find((p) => p.slug === slug);
}
