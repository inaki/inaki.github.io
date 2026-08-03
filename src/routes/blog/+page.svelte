<script lang="ts">
	import BlogShell from '$lib/components/blog/BlogShell.svelte';
	import PostList from '$lib/components/blog/PostList.svelte';
	import SeoMeta from '$lib/components/SeoMeta.svelte';
	import { BLOG_DESCRIPTION, BLOG_TITLE } from '$lib/seo';
	import { absoluteUrl } from '$lib/site';
	import { TAGLINE } from '$lib/content';

	let { data } = $props();

	const canonical = absoluteUrl('/blog');
</script>

<SeoMeta
	title={BLOG_TITLE}
	description={BLOG_DESCRIPTION}
	url={canonical}
	type="website"
/>

<BlogShell title="blog">
	<header class="index-head">
		<p class="kicker">WRITING</p>
		<h1>Notes from the terminal</h1>
		<p class="lede">{TAGLINE} {BLOG_DESCRIPTION}</p>
	</header>

	<PostList posts={data.posts} />
</BlogShell>

<style>
	.index-head {
		margin-bottom: 28px;
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
		font-size: 1.65rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		margin: 0 0 10px;
		color: var(--text);
	}

	.lede {
		margin: 0;
		font-family: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;
		font-size: 15px;
		line-height: 1.55;
		color: var(--dim);
		max-width: 36rem;
	}
</style>
