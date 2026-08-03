/**
 * Full posts with rendered HTML.
 * Import only from route loaders / RSS (prerender), never from TerminalShell/BlogCard.
 */
import type { BlogPost } from './types';
import { getInternalPost, getPublishedSlugs, listPosts } from './meta';
import { renderMarkdown } from './render';

export { listPosts, getPublishedSlugs, getPostMeta } from './meta';
export type { BlogPost, BlogPostMeta } from './types';

export function getPost(slug: string): BlogPost | undefined {
	const internal = getInternalPost(slug);
	if (!internal || internal.draft) return undefined;

	return {
		slug: internal.slug,
		title: internal.title,
		description: internal.description,
		date: internal.date,
		updated: internal.updated,
		tags: internal.tags,
		draft: internal.draft,
		ogImage: internal.ogImage,
		readingMinutes: internal.readingMinutes,
		body: internal.body,
		html: renderMarkdown(internal.body)
	};
}

/** All published posts with HTML (RSS). */
export function listFullPosts(): BlogPost[] {
	return getPublishedSlugs()
		.map((slug) => getPost(slug))
		.filter((p): p is BlogPost => Boolean(p));
}
