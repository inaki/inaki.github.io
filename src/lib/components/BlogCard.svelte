<script lang="ts">
	import type { BlogPostMeta } from '$lib/blog/types';

	let {
		posts = [],
		total = 0,
		/** -1 = no keyboard selection; 0..posts.length-1 = post; posts.length = “open full blog” */
		selectedIndex = -1
	}: {
		posts?: BlogPostMeta[];
		total?: number;
		selectedIndex?: number;
	} = $props();

	const fullBlogIndex = $derived(posts.length);

	function formatDate(iso: string) {
		const [y, m, d] = iso.split('-').map(Number);
		const dt = new Date(Date.UTC(y, m - 1, d));
		return dt.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			timeZone: 'UTC'
		});
	}
</script>

<div class="output-card blog-card" class:picking={selectedIndex >= 0}>
	<div class="kicker">BLOG</div>
	<p class="intro">Notes on design systems, AI UX, and craft.</p>

	{#if posts.length === 0}
		<p class="empty">No posts yet — check back soon.</p>
	{:else}
		<ul class="rows" role="listbox" aria-label="Recent posts">
			{#each posts as post, i}
				<li role="option" aria-selected={selectedIndex === i}>
					<a
						class="row"
						class:selected={selectedIndex === i}
						href="/blog/{post.slug}"
						tabindex="-1"
					>
						<span class="bullet" aria-hidden="true">▸</span>
						<span class="body">
							<span class="title-line">
								<span class="title">{post.title}</span>
								<time class="date" datetime={post.date}>{formatDate(post.date)}</time>
							</span>
							<span class="desc">{post.description}</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
		{#if total > posts.length}
			<p class="more-count">{total - posts.length} more on the full blog</p>
		{/if}
	{/if}

	<div class="footer">
		<a
			class="pill open"
			class:selected={selectedIndex === fullBlogIndex}
			href="/blog"
			tabindex="-1"
		>
			open full blog → /blog
		</a>
	</div>

	{#if selectedIndex >= 0}
		<p class="hint">↑↓ select • enter open • tab back to prompt</p>
	{/if}
</div>

<style>
	.intro {
		margin: 0 0 10px;
		font-size: 13px;
		color: var(--dim);
		line-height: 1.45;
	}

	.empty {
		margin: 0;
		font-size: 13px;
		color: var(--dim);
	}

	.rows {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.row {
		display: flex;
		gap: 8px;
		text-decoration: none;
		color: inherit;
		padding: 6px 8px;
		border-radius: 8px;
		border: 1px solid transparent;
		transition:
			border-color 80ms ease,
			background 80ms ease;
	}
	.row:hover {
		border-color: var(--border);
		background: rgba(176, 107, 255, 0.06);
	}
	.row.selected {
		border-color: var(--mg);
		background: rgba(255, 43, 214, 0.08);
		box-shadow: 0 0 0 3px rgba(255, 43, 214, 0.1);
	}

	.bullet {
		color: var(--mg);
		font-size: 12px;
		line-height: 1.4;
		flex-shrink: 0;
	}

	.body {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.title-line {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		align-items: baseline;
	}

	.title {
		font-size: 13px;
		font-weight: 600;
		color: var(--cyan);
	}
	.row:hover .title,
	.row.selected .title {
		color: var(--mg);
	}

	.date {
		flex-shrink: 0;
		font-size: 11px;
		color: var(--dim);
		font-variant-numeric: tabular-nums;
	}

	.desc {
		font-size: 11px;
		color: var(--dim);
		line-height: 1.35;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.more-count {
		margin: 8px 0 0;
		font-size: 11px;
		color: var(--dim);
	}

	.footer {
		margin-top: 12px;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	a.open {
		text-decoration: none;
	}
	a.open.selected {
		border-color: var(--mg);
		box-shadow: 0 0 0 4px rgba(255, 43, 214, 0.08);
		color: var(--mg);
	}

	.hint {
		margin: 10px 0 0;
		font-size: 10px;
		color: var(--dim);
	}
</style>
