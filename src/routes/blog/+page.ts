import { listPosts } from '$lib/blog/meta';

export const prerender = true;

export function load() {
	return {
		posts: listPosts()
	};
}
