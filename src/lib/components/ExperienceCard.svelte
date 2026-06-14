<script lang="ts">
	import { EXPERIENCE } from '$lib/content';
</script>

<div class="output-card">
	<div class="kicker mb-2">EXPERIENCE</div>
	<div class="space-y-2 text-sm">
		{#each EXPERIENCE as exp, i}
			<div class="border-l-2 border-[var(--mg)] pl-3 {i === 0 ? 'text-[var(--text)]' : 'text-[var(--dim)]'}">
				<div class="flex justify-between items-baseline">
					<div class="font-medium">{exp.role} · {exp.company}</div>
					<div class="text-xs text-[var(--dim)] tabular-nums">{exp.dates}</div>
				</div>
				{#if exp.note}
					<div class="mt-0.5 text-xs leading-snug text-[var(--dim)]">
						{exp.note}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
