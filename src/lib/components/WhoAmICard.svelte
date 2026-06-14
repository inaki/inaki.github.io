<script lang="ts">
	import { OWNER, TITLE, BIO } from '$lib/content';
</script>

<div class="output-card">
	<div class="flex items-start gap-3">
		<div class="w-10 h-10 rounded-full bg-[var(--mg)] flex-shrink-0 flex items-center justify-center text-black font-bold text-sm ring-2 ring-[var(--mg)]/30">
			IA
		</div>
		<div class="flex-1">
			<div class="font-semibold text-lg leading-none">{OWNER}</div>
			<div class="text-[var(--cyan)] text-sm mt-0.5">{TITLE}</div>
			<div class="mt-2 text-sm text-[var(--dim)] leading-relaxed">
				I build the surfaces between people and complex systems.<br />
				React/TypeScript/Full-stack. Obsessed with craft that feels inevitable.
			</div>
			<div class="mt-3 text-xs">
				<a href="https://github.com/inaki" target="_blank" class="text-[var(--cyan)] hover:underline">github.com/inaki</a>
				<span class="text-[var(--dim)] mx-1">·</span>
				<a href="https://www.linkedin.com/in/inaki-aranzadi/" target="_blank" class="text-[var(--cyan)] hover:underline">LinkedIn</a>
			</div>
		</div>
	</div>
</div>
