<script lang="ts">
	import { OWNER, ROLE, GITHUB_MORE_URL, type GitHubProject } from '$lib/content';

	let { projects = [] }: { projects?: GitHubProject[] } = $props();

	// Simple language color helper (terminal friendly)
	function langColor(lang?: string) {
		if (!lang) return '#9a8cba';
		const l = lang.toLowerCase();
		if (l.includes('svelte')) return '#ff3e00';
		if (l.includes('typescript') || l.includes('ts')) return '#3178c6';
		if (l.includes('go')) return '#00add8';
		if (l.includes('javascript') || l.includes('js')) return '#f1e05a';
		return '#9a8cba';
	}
</script>

<div class="output-card github-profile">
	<div class="flex items-start gap-3 mb-3">
		<div class="w-9 h-9 rounded-full bg-[var(--mg)] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
			IA
		</div>
		<div class="flex-1 min-w-0">
			<div class="flex items-center gap-2">
				<div class="font-semibold text-base">inaki</div>
				<a 
					href="https://github.com/inaki" 
					target="_blank" 
					class="text-[10px] text-[var(--cyan)] hover:underline"
				>
					→ github.com/inaki
				</a>
			</div>
			<div class="text-[var(--dim)] text-xs mt-0.5">
				{OWNER} • {ROLE} • Building tools that feel inevitable
			</div>
			<div class="flex gap-3 mt-1.5 text-[10px] text-[var(--dim)]">
				<div><span class="text-[var(--text)] font-medium">12</span> repos</div>
				<div><span class="text-[var(--text)] font-medium">1.4k</span> stars</div>
			</div>
		</div>
	</div>

	<div class="text-[10px] font-bold tracking-wider text-[var(--mg)] mb-1.5">FEATURED PROJECTS</div>

	<div class="space-y-1.5">
		{#each projects as p}
			<div class="group rounded border border-[var(--border)] bg-[var(--win)]/40 px-2.5 py-1.5 hover:border-[var(--mg)]/40 transition-colors">
				<div class="flex items-start justify-between gap-2">
					<a 
						href={p.url} 
						target="_blank"
						class="font-medium text-[var(--cyan)] group-hover:underline text-sm leading-tight"
					>
						{p.name}
					</a>
					{#if p.stars}
						<div class="flex-shrink-0 text-[10px] text-[var(--dim)] tabular-nums">
							★ {p.stars}
						</div>
					{/if}
				</div>
				<div class="text-[11px] text-[var(--dim)] mt-0.5 leading-snug">
					{p.desc}
				</div>
				<div class="flex items-center gap-2 mt-1 text-[10px]">
					{#if p.lang}
						<div class="flex items-center gap-1 text-[var(--dim)]">
							<span 
								class="inline-block w-1.5 h-1.5 rounded-full" 
								style:background={langColor(p.lang)}
							></span>
							<span>{p.lang}</span>
						</div>
					{/if}
					{#if p.updated}
						<span class="text-[var(--dim)]/70">· {p.updated}</span>
					{/if}
					<a 
						href={p.url} 
						target="_blank" 
						class="ml-auto text-[10px] text-[var(--dim)] hover:text-[var(--mg)] opacity-70 group-hover:opacity-100"
					>
						view →
					</a>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-3 text-center">
		<a
			href={GITHUB_MORE_URL}
			target="_blank"
			rel="noreferrer"
			class="text-[10px] text-[var(--cyan)] hover:underline"
		>
			See more on GitHub →
		</a>
	</div>
</div>
