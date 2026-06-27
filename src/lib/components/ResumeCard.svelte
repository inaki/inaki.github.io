<script lang="ts">
	import ResumeDocument from './ResumeDocument.svelte';

	let { onExport }: { onExport?: () => void } = $props();
</script>

<div class="resume-card output-card">
	<div class="resume-toolbar">
		<div class="kicker">Résumé</div>
		<button onclick={onExport} class="pill text-[12px] px-3 py-1 flex items-center gap-1.5 shrink-0">
			<span>⤓</span>
			<span class="font-medium">export PDF</span>
		</button>
	</div>

	<div class="resume-body">
		<ResumeDocument variant="terminal" />
	</div>
</div>

<style>
	.resume-card {
		padding: 16px 18px;
	}

	.resume-toolbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		padding-bottom: 12px;
		margin-bottom: 4px;
		border-bottom: 1px solid var(--border);
	}

	.resume-body {
		max-height: min(72vh, 720px);
		overflow-y: auto;
		padding-right: 4px;
	}
</style>