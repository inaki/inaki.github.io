<script lang="ts">
	import TerminalShell from '$lib/components/TerminalShell.svelte';
	import HelpDialog from '$lib/components/HelpDialog.svelte';
	import { Sun, Moon, HelpCircle } from '@lucide/svelte';

	let shellRef = $state<any>(null);
	let helpOpen = $state(false);

	function toggleTheme() {
		shellRef?.toggleThemeFromChrome?.();
	}

	function openHelp() {
		helpOpen = true;
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-[var(--bg)] p-2">
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
					<Sun size={14} class="hidden [html.light_&]:block" />
					<Moon size={14} class="block [html.light_&]:hidden" />
				</button>
			</div>
		</div>

		<!-- The living terminal: mixed text + rich HTML cards (resume, games, etc) -->
		<TerminalShell bind:this={shellRef} />

		<!-- Subtle scanlines layer (handout: off by default) -->
		<!-- <div class="scanlines"></div> -->
	</div>
</div>

<HelpDialog open={helpOpen} onClose={() => (helpOpen = false)} />

<!-- Very subtle global hint -->
<div class="fixed bottom-2 right-3 text-[10px] text-[var(--dim)] hidden lg:block pointer-events-none">
	↑↓ history • type / for commands
</div>
