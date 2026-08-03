import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import { getPost, getPublishedSlugs, listPosts } from '$lib/blog/posts';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return getPublishedSlugs().map((slug) => ({ slug }));
};

export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) {
		throw error(404, 'Post not found');
	}

	const published = listPosts();
	const idx = published.findIndex((p) => p.slug === post.slug);
	// list is newest-first: "newer" is lower index, "older" is higher
	const newer = idx > 0 ? published[idx - 1] : undefined;
	const older = idx >= 0 && idx < published.length - 1 ? published[idx + 1] : undefined;

	return { post, newer, older };
};
