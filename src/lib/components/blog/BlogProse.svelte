<script lang="ts">
	let { html }: { html: string } = $props();
</script>

<div class="blog-prose">
	{@html html}
</div>

<style>
	.blog-prose {
		font-family: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;
		font-size: 16.5px;
		line-height: 1.7;
		color: var(--text);
	}

	.blog-prose :global(> *:first-child) {
		margin-top: 0;
	}

	.blog-prose :global(h1),
	.blog-prose :global(h2),
	.blog-prose :global(h3) {
		font-family: var(--font-mono);
		font-weight: 700;
		line-height: 1.25;
		color: var(--text);
		margin: 1.6em 0 0.55em;
	}

	.blog-prose :global(h1) {
		font-size: 1.75rem;
		letter-spacing: -0.02em;
	}

	.blog-prose :global(h2) {
		font-size: 1.15rem;
		color: var(--mg);
	}

	.blog-prose :global(h3) {
		font-size: 1rem;
		color: var(--cyan);
	}

	.blog-prose :global(p) {
		margin: 0 0 1em;
	}

	.blog-prose :global(a) {
		color: var(--cyan);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.blog-prose :global(a:hover) {
		color: var(--mg);
	}
	.blog-prose :global(a:focus-visible) {
		outline: 2px solid var(--mg);
		outline-offset: 2px;
		border-radius: 2px;
	}

	.blog-prose :global(ul),
	.blog-prose :global(ol) {
		margin: 0 0 1em;
		padding-left: 1.35em;
	}
	.blog-prose :global(li) {
		margin: 0.25em 0;
	}
	.blog-prose :global(li::marker) {
		color: var(--purple);
	}

	.blog-prose :global(blockquote) {
		margin: 1.1em 0;
		padding: 0.35em 0 0.35em 1em;
		border-left: 3px solid var(--mg);
		color: var(--dim);
		font-style: italic;
	}

	.blog-prose :global(hr) {
		border: none;
		border-top: 1px solid var(--border);
		margin: 2em 0;
	}

	.blog-prose :global(code) {
		font-family: var(--font-mono);
		font-size: 0.88em;
		background: var(--panel);
		border: 1px solid var(--border);
		border-radius: var(--r-field);
		padding: 0.1em 0.4em;
	}

	.blog-prose :global(pre) {
		font-family: var(--font-mono);
		font-size: 13px;
		line-height: 1.5;
		background: var(--panel);
		border: 1px solid var(--border);
		border-left: 3px solid var(--purple);
		border-radius: var(--r-card);
		padding: 14px 16px;
		overflow-x: auto;
		margin: 1.2em 0;
		color-scheme: dark;
		scrollbar-width: thin;
		scrollbar-color: var(--dim) var(--win);
	}

	.blog-prose :global(pre code) {
		background: none;
		border: none;
		padding: 0;
		font-size: inherit;
	}

	.blog-prose :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: var(--r-card);
		border: 1px solid var(--border);
		margin: 1.2em 0;
	}

	.blog-prose :global(table) {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.95em;
		margin: 1.2em 0;
	}
	.blog-prose :global(th),
	.blog-prose :global(td) {
		border: 1px solid var(--border);
		padding: 8px 10px;
		text-align: left;
	}
	.blog-prose :global(th) {
		color: var(--mg);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.blog-prose :global(strong) {
		font-weight: 600;
		color: var(--text);
	}
</style>
