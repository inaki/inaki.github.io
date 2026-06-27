<script lang="ts">
	import { EXPERIENCE } from '$lib/content';
</script>

<div class="output-card experience-card">
	<div class="kicker mb-2">EXPERIENCE</div>
	<div class="experience-list space-y-3 text-sm">
		{#each EXPERIENCE as exp, i}
			<div class="experience-entry border-l-2 border-[var(--mg)] pl-3 {i === 0 ? 'text-[var(--text)]' : 'text-[var(--dim)]'}">
				<div class="flex justify-between items-baseline gap-3">
					<div class="font-medium min-w-0">{exp.role} · {exp.company}</div>
					<div class="text-xs text-[var(--dim)] tabular-nums shrink-0">{exp.dates}</div>
				</div>
				{#if exp.note}
					<div class="mt-1 text-xs leading-relaxed text-[var(--dim)]">
						{exp.note}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.experience-list {
		max-height: min(68vh, 640px);
		overflow-y: auto;
		padding-right: 4px;
	}

	.experience-entry:first-child {
		border-color: var(--cyan);
	}
</style>
