<script lang="ts">
	import TerminalShell from '$lib/components/TerminalShell.svelte';
	import HelpDialog from '$lib/components/HelpDialog.svelte';
	import SeoMeta from '$lib/components/SeoMeta.svelte';
	import SeoProfile from '$lib/components/SeoProfile.svelte';
	import { Sun, Moon, HelpCircle } from '@lucide/svelte';
	import { SITE_TITLE, SITE_DESCRIPTION, homeJsonLd } from '$lib/seo';
	import { absoluteUrl } from '$lib/site';
	import type { Theme } from '$lib/theme';

	let shellRef = $state<{
		toggleThemeFromChrome?: () => void;
		focusPrompt?: () => void;
		getTheme?: () => Theme;
	} | null>(null);
	let helpOpen = $state(false);
	let theme = $state<Theme>('dark');

	function toggleTheme() {
		shellRef?.toggleThemeFromChrome?.();
		theme = shellRef?.getTheme?.() ?? theme;
	}

	function openHelp() {
		helpOpen = true;
	}

	function closeHelp() {
		helpOpen = false;
		shellRef?.focusPrompt?.();
	}

	const homeUrl = absoluteUrl('/');
	const jsonLd = homeJsonLd();
</script>

<SeoMeta
	title={SITE_TITLE}
	description={SITE_DESCRIPTION}
	url={homeUrl}
	type="website"
	{jsonLd}
/>

<div class="page-wrap">
	<div class="flex min-h-screen items-center justify-center bg-[var(--bg)] p-2 pb-4">
		<div class="terminal-column">
			<!-- The main "terminal window" per the exact design handout -->
			<div class="terminal-window">
				<!-- Window chrome: traffic lights + title + actions -->
				<div class="winbar">
					<div class="traffic">
						<div class="dot red"></div>
						<div class="dot yellow"></div>
						<div class="dot green"></div>
					</div>

					<div class="title">inaki@portfolio — zsh</div>

					<div class="actions">
						<button onclick={openHelp} title="help" aria-label="open help">
							<HelpCircle size={14} />
						</button>
						<button onclick={toggleTheme} title="toggle light / dark" aria-label="toggle theme">
							{#if theme === 'light'}
								<Moon size={14} />
							{:else}
								<Sun size={14} />
							{/if}
						</button>
					</div>
				</div>

				<!-- The living terminal: mixed text + rich HTML cards (resume, games, etc) -->
				<TerminalShell
					bind:this={shellRef}
					onOpenHelp={openHelp}
					onThemeChange={(t) => {
						theme = t;
					}}
				/>
			</div>

			<!-- SSR crawlable profile (visually hidden; identity lives in the terminal) -->
			<SeoProfile />
		</div>
	</div>
</div>

<HelpDialog open={helpOpen} onClose={closeHelp} />

<!-- Very subtle global hint -->
<div class="fixed bottom-2 right-3 text-[10px] text-[var(--dim)] hidden lg:block pointer-events-none">
	↑↓ history • type / for commands
</div>

<style>
	.terminal-column {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 100%;
		max-width: min(960px, 100%);
	}
</style>
