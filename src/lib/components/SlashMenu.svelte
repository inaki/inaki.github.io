<script lang="ts">
	import { COMMAND_META, type CommandMetaItem } from '$lib/content';

	let { 
		items = COMMAND_META, 
		selectedIndex = 0, 
		onSelect, 
		onClose 
	}: {
		items?: CommandMetaItem[];
		selectedIndex?: number;
		onSelect: (cmd: string) => void;
		onClose?: () => void;
	} = $props();

	// Auto-scroll the selected item into view when using arrow keys
	$effect(() => {
		const idx = selectedIndex;
		queueMicrotask(() => {
			const menu = document.querySelector('.slash-menu');
			if (!menu) return;
			const buttons = menu.querySelectorAll('button.row');
			const btn = buttons[idx] as HTMLElement | undefined;
			btn?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
		});
	});
</script>

<div class="slash-menu" role="listbox">
	{#each items as item, i}
		<button
			type="button"
			class="row {i === selectedIndex ? 'selected' : ''}"
			role="option"
			tabindex="-1"
			aria-selected={i === selectedIndex}
			onclick={() => onSelect(item.cmd)}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onSelect(item.cmd);
				}
			}}
		>
			<span class="cmd">{item.cmd}</span>
			<span class="desc">{item.desc}</span>
		</button>
	{/each}
	{#if items.length > 0}
		<div class="text-[10px] px-3 py-1 text-[var(--dim)] border-t border-[var(--border)]">
			↑↓ navigate · tab / enter select · esc close
		</div>
	{/if}
</div>
