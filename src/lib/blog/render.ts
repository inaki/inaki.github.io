import { marked } from 'marked';

/**
 * First-party Markdown only. marked@18 allows raw HTML through by default —
 * we trust repo collaborators; do not feed untrusted content here.
 */
marked.setOptions({
	gfm: true,
	breaks: false
});

export function renderMarkdown(body: string): string {
	return marked.parse(body, { async: false }) as string;
}
