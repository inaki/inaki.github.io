<script lang="ts">
	import { onMount } from 'svelte';
	import ResumeDocument from '$lib/components/ResumeDocument.svelte';
	import { downloadResumePdf, printResume, resumePdfFilename } from '$lib/resume/export';
	import { OWNER } from '$lib/content';

	let autoExport = $state(false);
	let sheetEl = $state<HTMLElement | null>(null);
	let downloading = $state(false);
	let status = $state('');

	onMount(() => {
		autoExport = new URLSearchParams(window.location.search).get('export') === '1';
		if (autoExport) {
			window.scrollTo(0, 0);
			status = 'Pick an option below to save your résumé.';
		}
	});

	async function handleDownload() {
		if (!sheetEl || downloading) return;
		downloading = true;
		status = 'Generating PDF…';
		try {
			await downloadResumePdf(sheetEl);
			status = `Saved as ${resumePdfFilename()}.`;
		} catch {
			status = 'Download failed — try Print / Save as PDF instead.';
		} finally {
			downloading = false;
		}
	}

	function handlePrint() {
		status = 'In the print dialog, choose Save as PDF and enable Background graphics.';
		printResume();
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
	<title>{OWNER} — Résumé</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="resume-page">
	<div class="resume-toolbar" class:export-mode={autoExport}>
		{#if autoExport}
			<p class="toolbar-title">Résumé ready</p>
		{/if}
		<p class="toolbar-hint">
			{#if autoExport}
				Download directly, or print → <strong>Save as PDF</strong> (enable <strong>Background graphics</strong>).
			{:else}
				Preview your résumé, then download or print to PDF.
			{/if}
		</p>
		<div class="toolbar-actions">
			<button
				type="button"
				class="toolbar-btn"
				disabled={downloading}
				onclick={handleDownload}
			>
				{downloading ? 'Generating…' : 'Download PDF'}
			</button>
			<button type="button" class="toolbar-btn secondary" onclick={handlePrint}>
				Print / Save as PDF
			</button>
		</div>
		{#if status}
			<p class="toolbar-status">{status}</p>
		{/if}
	</div>

	<div class="resume-sheet" bind:this={sheetEl}>
		<ResumeDocument variant="print" />
	</div>
</div>

<style>
	.resume-page {
		min-height: 100vh;
		padding: 20px 20px 48px;
		box-sizing: border-box;
	}

	.resume-toolbar {
		position: sticky;
		top: 0;
		z-index: 10;
		max-width: 8.5in;
		margin: 0 auto 16px;
		padding: 14px 16px;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.92);
		border: 1px solid #ddd8ea;
		box-shadow: 0 8px 30px rgba(22, 20, 31, 0.08);
		backdrop-filter: blur(8px);
	}

	.resume-toolbar.export-mode {
		border-color: #0b7f7a;
		box-shadow: 0 8px 30px rgba(11, 127, 122, 0.15);
	}

	.toolbar-title {
		margin: 0 0 4px;
		font-size: 14px;
		font-weight: 700;
		color: #0b7f7a;
		letter-spacing: 0.02em;
	}

	.toolbar-hint {
		margin: 0;
		font-size: 13px;
		color: #5c5670;
		line-height: 1.45;
	}

	.toolbar-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 12px;
	}

	.toolbar-btn {
		font: inherit;
		font-size: 13px;
		font-weight: 600;
		padding: 9px 18px;
		border-radius: 999px;
		border: 1px solid #0b7f7a;
		background: #0b7f7a;
		color: #fff;
		cursor: pointer;
	}

	.toolbar-btn:disabled {
		opacity: 0.65;
		cursor: wait;
	}

	.toolbar-btn.secondary {
		background: #fff;
		color: #0b7f7a;
	}

	.toolbar-btn:hover:not(:disabled) {
		filter: brightness(1.05);
	}

	.toolbar-status {
		margin: 10px 0 0;
		font-size: 12px;
		color: #5c5670;
	}

	.resume-sheet {
		max-width: 8.5in;
		margin: 0 auto;
		background: #fff;
		border-radius: 10px;
		box-shadow: 0 18px 50px rgba(22, 20, 31, 0.12);
		padding: 0.65in 0.7in;
	}

	@media print {
		.resume-page {
			padding: 0;
		}

		.resume-toolbar {
			display: none !important;
		}

		.resume-sheet {
			max-width: none;
			margin: 0;
			padding: 0;
			border-radius: 0;
			box-shadow: none;
		}

		@page {
			size: letter;
			margin: 0.55in;
		}
	}
</style>