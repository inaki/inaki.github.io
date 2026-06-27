<script lang="ts">
	let { text = '' }: { text?: string } = $props();
</script>

<div class="output-card">
	<div class="flex items-center gap-2 mb-2">
		<div class="px-2 py-0.5 text-[10px] font-bold bg-[var(--cyan)]/10 text-[var(--cyan)] rounded">CURRENTLY</div>
		<div class="text-xs text-[var(--dim)]">right now</div>
	</div>
	<div class="text-sm leading-relaxed text-[var(--text)] whitespace-pre-line">
		{text}
	</div>
	<div class="mt-3 text-[10px] text-[var(--dim)]">
		Building at <span class="text-[var(--mg)]">Herald</span>
	</div>
</div>
