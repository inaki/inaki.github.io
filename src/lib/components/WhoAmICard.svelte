<script lang="ts">
	import { OWNER, TITLE, WHOAMI_MOTTO, WHOAMI_STORY } from '$lib/content';
</script>

<div class="output-card whoami-card">
	<div class="flex items-start gap-3">
		<div class="w-10 h-10 rounded-full bg-[var(--mg)] flex-shrink-0 flex items-center justify-center text-black font-bold text-sm ring-2 ring-[var(--mg)]/30">
			IA
		</div>
		<div class="flex-1 min-w-0">
			<div class="font-semibold text-lg leading-none">{OWNER}</div>
			<div class="text-[var(--cyan)] text-sm mt-0.5">{TITLE}</div>

			<div class="whoami-motto">{WHOAMI_MOTTO}</div>

			<div class="whoami-story">
				{#each WHOAMI_STORY as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>

			<div class="mt-3 text-xs">
				<a href="https://github.com/inaki" target="_blank" class="text-[var(--cyan)] hover:underline">github.com/inaki</a>
				<span class="text-[var(--dim)] mx-1">·</span>
				<a href="https://www.linkedin.com/in/inaki-aranzadi/" target="_blank" class="text-[var(--cyan)] hover:underline">LinkedIn</a>
			</div>
		</div>
	</div>
</div>

<style>
	.whoami-motto {
		margin-top: 10px;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		line-height: 1.4;
		background: linear-gradient(90deg, var(--cyan), var(--mg));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		-webkit-text-fill-color: transparent;
	}

	.whoami-story {
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 13px;
		line-height: 1.55;
		color: var(--dim);
	}

	.whoami-story p {
		margin: 0;
	}
</style>