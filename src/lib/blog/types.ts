/** Public list/card fields — safe to import from the terminal SPA. */
export type BlogPostMeta = {
	slug: string;
	title: string;
	description: string;
	date: string; // YYYY-MM-DD
	updated?: string;
	tags: string[];
	draft: boolean;
	ogImage?: string;
	readingMinutes: number;
};

/** Full post for route loaders / RSS (server / prerender only). */
export type BlogPost = BlogPostMeta & {
	html: string;
	/** Markdown body without frontmatter (RSS description fallback uses meta.description). */
	body: string;
};

export type ParsedFrontmatter = {
	title: string;
	description: string;
	date: string;
	updated?: string;
	slug?: string;
	tags: string[];
	draft: boolean;
	ogImage?: string;
};
