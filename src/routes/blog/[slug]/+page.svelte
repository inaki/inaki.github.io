<script lang="ts">
	import BlogShell from '$lib/components/blog/BlogShell.svelte';
	import BlogProse from '$lib/components/blog/BlogProse.svelte';
	import SeoMeta from '$lib/components/SeoMeta.svelte';
	import { blogPostingJsonLd, OWNER } from '$lib/seo';
	import { absoluteUrl } from '$lib/site';

	let { data } = $props();

	const post = $derived(data.post);
	const canonical = $derived(absoluteUrl(`/blog/${post.slug}`));
	const pageTitle = $derived(`${post.title} — ${OWNER}`);
	const jsonLd = $derived(
		blogPostingJsonLd({
			title: post.title,
			description: post.description,
			url: canonical,
			datePublished: post.date,
			dateModified: post.updated,
			image: post.ogImage
		})
	);

	function formatDate(iso: string) {
		const [y, m, d] = iso.split('-').map(Number);
		const dt = new Date(Date.UTC(y, m - 1, d));
		return dt.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'UTC'
		});
	}
</script>

<SeoMeta
	title={pageTitle}
	description={post.description}
	url={canonical}
	type="article"
	image={post.ogImage}
	imageAlt={post.title}
	{jsonLd}
	articlePublished={post.date}
	articleModified={post.updated}
	keywords={false}
/>

<BlogShell title={post.slug}>
	<article>
		<header class="post-head">
			<p class="kicker">POST</p>
			<h1>{post.title}</h1>
			<div class="meta">
				<time datetime={post.date}>{formatDate(post.date)}</time>
				<span class="dot" aria-hidden="true">·</span>
				<span>{post.readingMinutes} min read</span>
				{#if post.updated}
					<span class="dot" aria-hidden="true">·</span>
					<span>Updated {formatDate(post.updated)}</span>
				{/if}
			</div>
			{#if post.tags.length}
				<div class="tags">
					{#each post.tags as tag}
						<span class="pill tag">{tag}</span>
					{/each}
				</div>
			{/if}
		</header>

		<BlogProse html={post.html} />

		<nav class="post-nav" aria-label="Post navigation">
			<a href="/blog">← all posts</a>
			<div class="adjacent">
				{#if data.older}
					<a href="/blog/{data.older.slug}" class="adj">← older</a>
				{/if}
				{#if data.newer}
					<a href="/blog/{data.newer.slug}" class="adj">newer →</a>
				{/if}
			</div>
		</nav>
	</article>
</BlogShell>

<style>
	.post-head {
		margin-bottom: 28px;
		padding-bottom: 20px;
		border-bottom: 1px solid var(--border);
	}

	.kicker {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--mg);
		margin: 0 0 8px;
	}

	h1 {
		font-family: var(--font-mono);
		font-size: clamp(1.5rem, 4vw, 1.9rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.2;
		margin: 0 0 12px;
		color: var(--text);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--dim);
	}

	.dot {
		opacity: 0.6;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 14px;
	}

	.tag {
		cursor: default;
		font-size: 11px;
	}

	.post-nav {
		margin-top: 40px;
		padding-top: 20px;
		border-top: 1px solid var(--border);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 12px;
		font-family: var(--font-mono);
		font-size: 13px;
	}

	.post-nav a {
		color: var(--cyan);
		text-decoration: none;
	}
	.post-nav a:hover {
		color: var(--mg);
		text-decoration: underline;
	}

	.adjacent {
		display: flex;
		gap: 16px;
	}
</style>
