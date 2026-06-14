<script lang="ts">
	import { onMount } from 'svelte';
	import type { ComponentType } from 'svelte';
	import ResumeCard from './ResumeCard.svelte';
	import GamePanel from './GamePanel.svelte';
	import MusicPlayer from './MusicPlayer.svelte';
	import SlashMenu from './SlashMenu.svelte';
import GitHubProfile from './GitHubProfile.svelte';
import WhoAmICard from './WhoAmICard.svelte';
import CurrentlyCard from './CurrentlyCard.svelte';
import ExperienceCard from './ExperienceCard.svelte';
import HobbiesCard from './HobbiesCard.svelte';
import ContactCard from './ContactCard.svelte';
	import {
		HANDLE, OWNER, BIO, CURRENTLY, EXPERIENCE, QUICK_COMMANDS, COMMAND_META, ALIASES, EASTER_EGGS, GITHUB_PROJECTS, CONTACT
	} from '$lib/content';

	// History entries can be plain text or rich component descriptors
	// Using any for Comp to be compatible with Svelte 5 runes components
	type HistoryEntry =
		| { type: 'text'; lines: string[] }
		| { type: 'rich'; id: string; Comp?: any; props?: any };

	let history: HistoryEntry[] = $state([]);
	let input = $state('');
	let showSlashMenu = $state(false);
	let slashIndex = $state(0);
	let commandHistory: string[] = $state([]);
	let historyPos = $state(-1);

	let shellEl = $state<HTMLDivElement | null>(null);
	let inputEl = $state<HTMLInputElement | null>(null);
	let isInputFocused = $state(false);

	let theme: 'dark' | 'light' = $state('dark');

	// Filtered commands for slash autocomplete
	let filteredCommands = $derived.by(() => {
		if (!showSlashMenu || !input.startsWith('/')) return COMMAND_META;
		const q = input.slice(1).toLowerCase();
		if (!q) return COMMAND_META;

		const matches = COMMAND_META.filter(c =>
			c.cmd.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
		);

		// Prioritize prefix matches (e.g. typing "resu" puts /resume first)
		matches.sort((a, b) => {
			const aPrefix = a.cmd.toLowerCase().startsWith(q) ? 0 : 1;
			const bPrefix = b.cmd.toLowerCase().startsWith(q) ? 0 : 1;
			if (aPrefix !== bPrefix) return aPrefix - bPrefix;
			return a.cmd.localeCompare(b.cmd);
		});

		return matches;
	});

	// Keep selection valid when filter changes
	$effect(() => {
		if (showSlashMenu) {
			const len = filteredCommands.length;
			if (len === 0) {
				showSlashMenu = false;
			} else if (slashIndex >= len) {
				slashIndex = len - 1;
			} else if (slashIndex < 0) {
				slashIndex = 0;
			}
		}
	});

	// Dispatch theme changes globally so layout + any other parts react
	function setTheme(next: 'dark' | 'light') {
		theme = next;
		const root = document.documentElement;
		if (next === 'light') {
			root.classList.add('light');
			root.setAttribute('data-theme', 'light');
		} else {
			root.classList.remove('light');
			root.removeAttribute('data-theme');
		}
		// live update xterm if it was ever mounted (kept for future)
		(document as any).__INAKI_THEME__ = next;
	}

	// Boot the beautiful initial screen exactly like the mocks
	function boot() {
		history = [];

		// Big neon INAKI wordmark + bio (from mock 3 + handout)
		const banner = [
			'',
			'  ██╗███╗   ██╗ █████╗ ██╗  ██╗██╗',
			'  ██║████╗  ██║██╔══██╗██║ ██╔╝██║',
			'  ██║██╔██╗ ██║███████║█████╔╝ ██║',
			'  ██║██║╚██╗██║██╔══██║██╔═██╗ ██║',
			'  ██║██║ ╚████║██║  ██║██║  ██╗██║',
			'  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝',
			''
		];

		pushText(banner, true);
		pushText([BIO], true);

		// Quick command pills (clickable)
		pushRich('quick-pills', null, {
			commands: QUICK_COMMANDS,
			onPick: (c: string) => runCommand(c)
		});

		pushText([''], true);
		focusPrompt();
	}

	// Helper: append plain terminal-style text
	function pushText(lines: string[], silent = false) {
		history = [...history, { type: 'text', lines }];
		scrollToBottom();
	}

	function pushRich(id: string, Comp: any, props: any = {}) {
		history = [...history, { type: 'rich', id, Comp, props }];
		scrollToBottom();
	}

	function scrollToBottom() {
		requestAnimationFrame(() => {
			if (shellEl) shellEl.scrollTop = shellEl.scrollHeight;
		});
	}

	function focusPrompt() {
		requestAnimationFrame(() => inputEl?.focus());
	}

	// Core command execution (maps to rich cards or text per handout)
	async function runCommand(raw: string) {
		const original = raw.trim();
		if (!original) return;

		// Record in history for arrow recall
		commandHistory = [original, ...commandHistory].slice(0, 60);
		historyPos = -1;

		// Echo the command the user typed (terminal feel)
		pushText([`${HANDLE}:~$ ${original}`]);

		let cmd = original.toLowerCase();
		if (ALIASES[cmd]) cmd = ALIASES[cmd];

		// Specials first
		if (cmd === '/clear' || cmd === 'clear') {
			history = [];
			return;
		}
		if (cmd === '/theme') {
			const next = theme === 'dark' ? 'light' : 'dark';
			setTheme(next);
			pushText([`theme ← ${next}. ${next === 'light' ? 'easy on the eyes.' : 'neon engaged.'}`]);
			return;
		}

		// Rich commands → real HTML cards inside the scrollback
		if (cmd === '/resume' || cmd === '/cv') {
			pushRich('resume', ResumeCard, {
				onExport: () => {
					const a = document.createElement('a');
					a.href = '/resume/Inaki-Aranzadi-Resume.pdf';
					a.download = 'Inaki-Aranzadi-Resume.pdf';
					document.body.appendChild(a);
					a.click();
					a.remove();
					pushText(['(Drop the real PDF at static/resume/Inaki-Aranzadi-Resume.pdf to enable download)']);
				}
			});
			return;
		}

		if (cmd === '/experience' || cmd === '/exp') {
			pushRich('experience', ExperienceCard);
			return;
		}

		if (cmd === '/currently' || cmd === '/now') {
			pushRich('currently', CurrentlyCard, { text: CURRENTLY });
			return;
		}

		if (cmd === '/whoami') {
			pushRich('whoami', WhoAmICard);
			return;
		}

		if (cmd === '/github' || cmd === '/gh') {
			pushRich('github-profile', GitHubProfile, { projects: GITHUB_PROJECTS });
			return;
		}

		if (cmd === '/linkedin' || cmd === '/in') {
			window.open(CONTACT.linkedin, '_blank');
			pushText(['opening LinkedIn…']);
			return;
		}

		if (cmd === '/hobbies') {
			pushRich('hobbies', HobbiesCard);
			return;
		}

		if (cmd === '/contact') {
			pushRich('contact', ContactCard);
			return;
		}

		if (cmd === '/music') {
			pushRich('music', MusicPlayer, { onClose: () => focusPrompt() });
			return;
		}

		if (cmd === '/game') {
			// Show the arcade picker grid (rendered inline in the template)
			pushRich('games', null, {
				onPick: (g: 'snake' | 'maze' | 'pong') => {
					pushRich('game-' + g, GamePanel, { game: g, onClose: () => focusPrompt() });
				}
			});
			return;
		}

		if (cmd === '/help') {
			showSlashMenu = true;
			slashIndex = 0;
			// The help list is rendered as a static card via the 'help' id branch in the template
			pushRich('help', null);
			return;
		}

		if (cmd === '/export') {
			// Same as resume export
			const a = document.createElement('a');
			a.href = '/resume/Inaki-Aranzadi-Resume.pdf';
			a.download = '';
			document.body.appendChild(a); a.click(); a.remove();
			pushText(['trying to export résumé PDF…']);
			return;
		}

		// Easter eggs (friendly, per handout voice)
		if (EASTER_EGGS.includes(cmd)) {
			if (cmd === '/matrix') pushText(['(green rain would drop here — 6.5s overlay)']);
			else if (cmd === '/neofetch') pushText([`${OWNER} — Product Engineer`, 'neon soul • modern tools • zero corporate']);
			else pushText([`nice try. this is still a browser.`]);
			return;
		}

		// Default / unknown
		pushText([
			`command not found: ${original}`,
			`type /help to see what’s available.`
		]);
	}

	function handleInputKey(e: KeyboardEvent) {
		// Slash menu filtering + navigation takes priority when open
		if (showSlashMenu) {
			const list = filteredCommands;

			if (list.length > 0) {
				const max = list.length - 1;

				if (e.key === 'ArrowUp') {
					e.preventDefault();
					slashIndex = (slashIndex - 1 + max + 1) % (max + 1);
					return;
				}
				if (e.key === 'ArrowDown') {
					e.preventDefault();
					slashIndex = (slashIndex + 1) % (max + 1);
					return;
				}
				if (e.key === 'Tab' || e.key === 'Enter') {
					e.preventDefault();
					const chosen = list[slashIndex].cmd;
					input = '';
					showSlashMenu = false;
					runCommand(chosen);
					return;
				}
				if (e.key === 'Escape') {
					e.preventDefault();
					showSlashMenu = false;
					return;
				}
			} else {
				// No matches: only intercept Escape; let Enter fall through to execute literal
				if (e.key === 'Escape') {
					e.preventDefault();
					showSlashMenu = false;
					return;
				}
			}
		}

		// Normal Enter: run whatever is currently in the input
		if (e.key === 'Enter') {
			const val = input.trim();
			if (val) {
				runCommand(val);
			}
			input = '';
			showSlashMenu = false;
			return;
		}

		// Arrow history only when menu is closed
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (commandHistory.length === 0) return;
			historyPos = Math.min(historyPos + 1, commandHistory.length - 1);
			input = commandHistory[historyPos] || '';
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (historyPos <= 0) {
				historyPos = -1;
				input = '';
			} else {
				historyPos--;
				input = commandHistory[historyPos] || '';
			}
			return;
		}

		// Open/close menu based on input. Reset selection when (re)opening.
		if (input.startsWith('/') || (input === '' && e.key === '/')) {
			showSlashMenu = true;
			if (filteredCommands.length > 0) {
				slashIndex = 0;
			}
		} else if (!input.startsWith('/') && showSlashMenu) {
			showSlashMenu = false;
		}

		if (e.key === 'Escape' && !showSlashMenu) {
			(inputEl as any)?.blur();
		}
	}

	function pickFromMenu(cmd: string) {
		showSlashMenu = false;
		input = '';
		runCommand(cmd);
	}

	function clickPill(cmd: string) {
		runCommand(cmd);
	}

	// Expose a couple things for the outer chrome (theme button etc)
	export function toggleThemeFromChrome() {
		const next = theme === 'dark' ? 'light' : 'dark';
		setTheme(next);
		pushText([`theme ← ${next}.`]);
	}

	export function runFromOutside(cmd: string) {
		runCommand(cmd);
	}

	onMount(() => {
		setTheme('dark');
		boot();

		// Click anywhere on the body to focus prompt (nice shell feel)
		const focusOnBody = (e: MouseEvent) => {
			if ((e.target as HTMLElement).closest('.pill, .game-card, button')) return;
			focusPrompt();
		};
		document.addEventListener('click', focusOnBody);

		// Keyboard focus hint
		return () => document.removeEventListener('click', focusOnBody);
	});
</script>

<!-- The scrollback -->
<div bind:this={shellEl} class="terminal-body">
	{#each history as entry, idx (idx)}
		<div class="history-entry">
			{#if entry.type === 'text'}
				{#each entry.lines as line}
					<div class="term-line">{line}</div>
				{/each}
			{:else if entry.type === 'rich'}
				{#if entry.id === 'resume'}
					<ResumeCard onExport={entry.props?.onExport} />
				{:else if entry.id.startsWith('game-')}
					<GamePanel game={entry.props?.game} onClose={entry.props?.onClose} />
				{:else if entry.id === 'music'}
					<MusicPlayer onClose={entry.props?.onClose} />
				{:else if entry.id === 'help'}
					<!-- Static help list card (the interactive floating menu appears when typing /) -->
					<div class="output-card">
						<div class="kicker mb-2">AVAILABLE COMMANDS</div>
						<div class="grid grid-cols-1 gap-x-4 gap-y-1 text-sm">
							{#each COMMAND_META as c}
								<div class="flex items-baseline gap-2">
									<span class="font-medium text-[var(--cyan)] tabular-nums w-20">{c.cmd}</span>
									<span class="text-[var(--dim)] text-xs flex-1">{c.desc}</span>
								</div>
							{/each}
						</div>
						<div class="mt-3 text-[10px] text-[var(--dim)] border-t border-[var(--border)] pt-2">
							Type any command or use ↑↓ in the live menu.
						</div>
					</div>
				{:else if entry.id === 'quick-pills'}
					<!-- Boot pills -->
					<div class="mt-2 mb-1 flex flex-wrap gap-2">
						{#each entry.props.commands as c}
							<button class="pill" onclick={() => clickPill(c)}>{c}</button>
						{/each}
					</div>
					<div class="text-[10px] text-[var(--dim)]">tip: type / anytime for the full menu.</div>
				{:else if entry.id === 'games'}
					<!-- Game picker grid -->
					<div class="output-card">
						<div class="kicker mb-2">ARCADE</div>
						<div class="game-grid">
							<button class="game-card text-left" onclick={() => entry.props.onPick('snake')}>
								<div class="name">▸ Snake</div>
								<div class="desc">classic. arrows / WASD.</div>
							</button>
							<button class="game-card text-left" onclick={() => entry.props.onPick('maze')}>
								<div class="name">▸ ASCII Maze</div>
								<div class="desc">find the exit +.</div>
							</button>
							<button class="game-card text-left" onclick={() => entry.props.onPick('pong')}>
								<div class="name">▸ Pong</div>
								<div class="desc">you vs. the CPU. first to 7.</div>
							</button>
						</div>
						<div class="text-[10px] text-[var(--dim)] mt-2">use arrows/wasd to play • esc/q to close • r to restart</div>
					</div>
				{:else if entry.id === 'github-profile'}
					<GitHubProfile projects={entry.props?.projects} />
				{:else if entry.id === 'whoami'}
					<WhoAmICard />
				{:else if entry.id === 'currently'}
					<CurrentlyCard text={entry.props?.text} />
				{:else if entry.id === 'experience'}
					<ExperienceCard />
				{:else if entry.id === 'hobbies'}
					<HobbiesCard />
				{:else if entry.id === 'contact'}
					<ContactCard />
				{:else}
					<!-- Unknown rich entry (developer only) -->
					<div class="output-card text-[var(--dim)] text-xs">rich content placeholder</div>
				{/if}
			{/if}
		</div>
	{/each}
</div>

<!-- Fixed prompt bar (also serves as positioning context for the slash menu) -->
<div class="prompt-bar">
	<!-- Slash autocomplete menu - now positioned directly above the prompt -->
	{#if showSlashMenu}
		<SlashMenu
			items={filteredCommands}
			selectedIndex={slashIndex}
			onSelect={pickFromMenu}
			onClose={() => showSlashMenu = false}
		/>
	{/if}

	<span class="prefix">
		<span class="text-[var(--cyan)]">inaki</span><span class="text-[var(--purple)]">@portfolio</span><span class="text-[var(--text)]">:</span><span class="text-[var(--mg)]">~</span><span class="text-[var(--text)]">$ </span>
	</span>

	<input
		bind:this={inputEl}
		bind:value={input}
		onkeydown={handleInputKey}
		onfocus={() => (isInputFocused = true)}
		onblur={() => (isInputFocused = false)}
		oninput={() => {
			if (input.startsWith('/')) showSlashMenu = true;
		}}
		placeholder="type /help or a command"
		autocomplete="off"
		spellcheck="false"
	/>

	<!-- Custom blinking block cursor hint (visible when input focused) -->
	{#if isInputFocused}
		<span class="cursor" aria-hidden="true"></span>
	{/if}
</div>

<style>
	/* extra local tweaks if needed */
</style>
