<script lang="ts">
	import type { BlogPostMeta } from '$lib/blog/types';

	let {
		posts,
		compact = false
	}: {
		posts: BlogPostMeta[];
		compact?: boolean;
	} = $props();

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

{#if posts.length === 0}
	<p class="empty">No posts yet — check back soon.</p>
{:else}
	<ul class="post-list" class:compact>
		{#each posts as post}
			<li>
				<a class="post-row" href="/blog/{post.slug}">
					<div class="row-top">
						<span class="post-title">{post.title}</span>
						<time class="post-date" datetime={post.date}>{formatDate(post.date)}</time>
					</div>
					{#if !compact}
						<p class="post-desc">{post.description}</p>
						<div class="meta">
							<span class="mins">{post.readingMinutes} min</span>
							{#if post.tags.length}
								<span class="dot" aria-hidden="true">·</span>
								<span class="tags">
									{#each post.tags as tag}
										<span class="tag">{tag}</span>
									{/each}
								</span>
							{/if}
						</div>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.empty {
		color: var(--dim);
		font-size: 14px;
		margin: 0;
	}

	.post-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.post-row {
		display: block;
		text-decoration: none;
		color: inherit;
		background: var(--panel);
		border: 1px solid var(--border);
		border-radius: var(--r-card);
		padding: 14px 16px;
		transition:
			border-color 80ms ease,
			box-shadow 80ms ease,
			transform 80ms ease;
	}
	.post-row:hover {
		border-color: var(--mg);
		box-shadow: 0 0 0 4px rgba(255, 43, 214, 0.08);
		transform: translateY(-1px);
	}
	.post-row:focus-visible {
		outline: 2px solid var(--mg);
		outline-offset: 2px;
	}

	.row-top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 12px;
	}

	.post-title {
		font-family: var(--font-mono);
		font-weight: 600;
		font-size: 15px;
		color: var(--cyan);
	}
	.post-row:hover .post-title {
		color: var(--mg);
	}

	.post-date {
		flex-shrink: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--dim);
		font-variant-numeric: tabular-nums;
	}

	.post-desc {
		margin: 6px 0 0;
		font-family: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;
		font-size: 14px;
		line-height: 1.45;
		color: var(--dim);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
		margin-top: 10px;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--dim);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.tag {
		display: inline-flex;
		padding: 2px 10px;
		border-radius: var(--r-pill);
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.02);
		color: var(--text);
		font-size: 10px;
	}

	.compact .post-row {
		padding: 10px 12px;
	}
	.compact .post-title {
		font-size: 13px;
	}
</style>
