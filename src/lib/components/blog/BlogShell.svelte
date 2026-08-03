<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { initTheme, toggleTheme, type Theme } from '$lib/theme';

	let {
		title = 'blog',
		children
	}: {
		title?: string;
		children: import('svelte').Snippet;
	} = $props();

	let theme: Theme = $state('dark');

	onMount(() => {
		theme = initTheme();
	});

	function onToggle() {
		theme = toggleTheme();
	}
</script>

<div class="blog-page">
	<header class="blog-bar">
		<nav class="blog-nav" aria-label="Blog">
			<a href="/" class="blog-home">inaki.to</a>
			<span class="sep" aria-hidden="true">·</span>
			<a href="/blog" class="blog-link">/blog</a>
			{#if title && title !== 'blog'}
				<span class="sep" aria-hidden="true">/</span>
				<span class="blog-crumb">{title}</span>
			{/if}
		</nav>
		<button
			type="button"
			class="theme-btn"
			onclick={onToggle}
			title="toggle light / dark"
			aria-label="toggle theme"
		>
			{#if theme === 'light'}
				<Moon size={14} />
			{:else}
				<Sun size={14} />
			{/if}
		</button>
	</header>

	<main class="blog-main">
		{@render children()}
	</main>

	<footer class="blog-footer">
		<a href="/">← terminal</a>
		<span class="sep" aria-hidden="true">·</span>
		<a href="/blog">all posts</a>
		<span class="sep" aria-hidden="true">·</span>
		<a href="/blog/rss.xml">rss</a>
	</footer>
</div>

<style>
	.blog-page {
		position: relative;
		z-index: 1;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: var(--font-mono);
		color: var(--text);
	}

	.blog-bar {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		min-height: 48px;
		padding: 10px 18px;
		background: color-mix(in srgb, var(--win) 92%, transparent);
		border-bottom: 1px solid var(--border);
		backdrop-filter: blur(10px);
	}

	.blog-nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		min-width: 0;
	}

	.blog-home {
		color: var(--cyan);
		text-decoration: none;
		font-weight: 600;
	}
	.blog-home:hover {
		text-decoration: underline;
	}

	.blog-link {
		color: var(--mg);
		text-decoration: none;
		font-weight: 600;
	}
	.blog-link:hover {
		text-decoration: underline;
	}

	.blog-crumb {
		color: var(--dim);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: min(40vw, 220px);
	}

	.sep {
		color: var(--dim);
		opacity: 0.7;
	}

	.theme-btn {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 4px 10px;
		border-radius: 6px;
		border: 1px solid var(--border);
		color: var(--dim);
		background: transparent;
		cursor: pointer;
		transition: all 80ms ease;
	}
	.theme-btn:hover {
		color: var(--text);
		border-color: var(--mg);
		box-shadow: 0 0 0 3px rgba(255, 43, 214, 0.1);
	}

	.blog-main {
		flex: 1;
		width: 100%;
		max-width: 42rem;
		margin: 0 auto;
		padding: 28px 16px 48px;
	}

	.blog-footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 20px 16px 32px;
		font-size: 12px;
		color: var(--dim);
		border-top: 1px solid var(--border);
	}
	.blog-footer a {
		color: var(--cyan);
		text-decoration: none;
	}
	.blog-footer a:hover {
		text-decoration: underline;
		color: var(--mg);
	}
</style>
