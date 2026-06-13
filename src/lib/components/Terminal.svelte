<script lang="ts">
	import { Xterm, XtermAddon } from '@battlefieldduck/xterm-svelte';
	import type { Terminal, ITerminalOptions, ITerminalInitOnlyOptions } from '@xterm/xterm';
	import { commandRegistry, getCompletions } from '$lib/terminal/commands';
	import { toast } from 'svelte-sonner';

	// Props (runes mode)
	let { bootComplete }: { bootComplete?: () => void } = $props();

	// Internal state
	let terminal: Terminal | undefined = $state();
	let fitAddon: any = $state(null);
	let webLinksAddon: any = $state(null);
	let commandHistory: string[] = $state([]);
	let historyIndex = $state(-1);
	let currentInput = $state('');
	let isProcessing = $state(false);

	// Themed colors (we mutate options + re-apply some styles)
	let currentTheme: 'green' | 'amber' | 'cyan' = $state('green');

	const themes = {
		green: { fg: '#00ff9f', cursor: '#00ff9f' },
		amber: { fg: '#ffbf00', cursor: '#ffbf00' },
		cyan: { fg: '#00e0ff', cursor: '#00e0ff' }
	};

	const options: ITerminalOptions & ITerminalInitOnlyOptions = {
		fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		fontSize: 15,
		lineHeight: 1.35,
		cursorBlink: true,
		cursorStyle: 'block',
		theme: {
			background: '#0a0c0f',
			foreground: themes.green.fg,
			cursor: themes.green.cursor,
			cursorAccent: '#0a0c0f',
			selectionBackground: 'rgba(0, 255, 159, 0.25)',
			black: '#0a0c0f',
			red: '#ff5555',
			green: '#00ff9f',
			yellow: '#ffbd2e',
			blue: '#5c9cff',
			magenta: '#c678dd',
			cyan: '#00e0ff',
			white: '#c0c5ce',
			brightBlack: '#4a505c',
			brightRed: '#ff6b6b',
			brightGreen: '#5af78e',
			brightYellow: '#f4f99d',
			brightBlue: '#8be9fd',
			brightMagenta: '#ff79c6',
			brightCyan: '#9aedfe',
			brightWhite: '#f0f4f8'
		},
		allowTransparency: false,
		scrollback: 2000,
		convertEol: true
	};

	// ============================================
	// BOOT SEQUENCE (fun but professional)
	// ============================================
	async function bootSequence() {
		if (!terminal) return;

		const lines = [
			'',
			'  ██████╗ ███╗   ██╗ █████╗ ██╗  ██╗██╗████████╗ ██████╗',
			'  ██╔══██╗████╗  ██║██╔══██╗██║ ██╔╝██║╚══██╔══╝██╔═══██╗',
			'  ██████╔╝██╔██╗ ██║███████║█████╔╝ ██║   ██║   ██║   ██║',
			'  ██╔══██╗██║╚██╗██║██╔══██║██╔═██╗ ██║   ██║   ██║   ██║',
			'  ██║  ██║██║ ╚████║██║  ██║██║  ██╗██║   ██║   ╚██████╔╝',
			'  ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝   ╚═╝    ╚═════╝ ',
			'',
			'  inakito terminal v1.0 — personal site edition',
			'  Connected via browser • Cloudflare edge',
			'',
			'  Type "help" to begin. Use arrow keys for command history.',
			''
		];

		for (const line of lines) {
			terminal.write(line + '\r\n');
			await new Promise((r) => setTimeout(r, line.startsWith('  █') ? 18 : 28));
		}

		writePrompt();

		// Let parent know we're ready
		bootComplete?.();
	}

	function writePrompt() {
		if (!terminal) return;
		terminal.write('\x1b[32m$ \x1b[0m');
	}

	function writeOutput(text: string, isError = false) {
		if (!terminal) return;
		const prefix = isError ? '\x1b[31m' : '';
		const suffix = isError ? '\x1b[0m' : '';
		// Split and write line-by-line so wrapping + history works nicely
		const lines = text.split('\n');
		for (const line of lines) {
			terminal.write(prefix + line + suffix + '\r\n');
		}
	}

	// ============================================
	// INPUT HANDLING (real shell-like behavior)
	// ============================================
	function handleInput(data: string) {
		if (!terminal || isProcessing) return;

		const code = data.charCodeAt(0);

		// Enter
		if (data === '\r') {
			terminal.write('\r\n');
			const trimmed = currentInput.trim();

			if (trimmed.length > 0) {
				commandHistory.unshift(trimmed);
				if (commandHistory.length > 50) commandHistory.pop();
				historyIndex = -1;
				processCommand(trimmed);
			} else {
				writePrompt();
			}
			currentInput = '';
			return;
		}

		// Backspace / Delete
		if (data === '\u007f' || data === '\b') {
			if (currentInput.length > 0) {
				currentInput = currentInput.slice(0, -1);
				terminal.write('\b \b');
			}
			return;
		}

		// Tab completion (basic)
		if (data === '\t') {
			const completions = getCompletions(currentInput);
			if (completions.length === 1) {
				const completion = completions[0];
				const toAdd = completion.slice(currentInput.length);
				currentInput += toAdd;
				terminal.write(toAdd);
			} else if (completions.length > 1) {
				terminal.write('\r\n' + completions.join('   ') + '\r\n');
				writePrompt();
				terminal.write(currentInput);
			}
			return;
		}

		// Arrow keys for history (we handle via onKey because onData doesn't always give arrows well)
		// (onKey handler below)

		// Printable chars
		if (code >= 32 && code <= 126) {
			currentInput += data;
			terminal.write(data);
		}
	}

	// Better handling for arrows / ctrl keys via onKey
	function handleKey({ key, domEvent }: { key: string; domEvent: KeyboardEvent }) {
		if (!terminal || isProcessing) return;

		if (domEvent.key === 'ArrowUp') {
			domEvent.preventDefault();
			if (commandHistory.length === 0) return;

			if (historyIndex < commandHistory.length - 1) {
				historyIndex++;
			}
			// Clear current line
			terminal.write('\x1b[2K\r');
			writePrompt();
			currentInput = commandHistory[historyIndex] || '';
			terminal.write(currentInput);
		}

		if (domEvent.key === 'ArrowDown') {
			domEvent.preventDefault();
			if (historyIndex > 0) {
				historyIndex--;
				terminal.write('\x1b[2K\r');
				writePrompt();
				currentInput = commandHistory[historyIndex] || '';
				terminal.write(currentInput);
			} else if (historyIndex === 0) {
				historyIndex = -1;
				terminal.write('\x1b[2K\r');
				writePrompt();
				currentInput = '';
			}
		}

		// Ctrl+C
		if (domEvent.ctrlKey && domEvent.key.toLowerCase() === 'c') {
			domEvent.preventDefault();
			terminal.write('^C\r\n');
			currentInput = '';
			historyIndex = -1;
			writePrompt();
		}

		// Ctrl+L → clear
		if (domEvent.ctrlKey && domEvent.key.toLowerCase() === 'l') {
			domEvent.preventDefault();
			terminal.clear();
			writePrompt();
		}
	}

	// ============================================
	// COMMAND EXECUTION
	// ============================================
	async function processCommand(rawLine: string) {
		isProcessing = true;

		const parts = rawLine.split(/\s+/);
		const cmdName = parts[0].toLowerCase();
		const args = parts.slice(1);

		const cmd = commandRegistry.get(cmdName);

		if (!cmd) {
			writeOutput(`Command not found: ${cmdName}. Type "help" for available commands.`, true);
			writePrompt();
			isProcessing = false;
			return;
		}

		try {
			const result = await cmd.handler(args);

			// Special internal signals
			if (result === '__CLEAR__') {
				terminal?.clear();
				writePrompt();
			} else if (typeof result === 'string' && result.startsWith('__THEME__')) {
				const newTheme = result.replace('__THEME__', '') as 'green' | 'amber' | 'cyan';
				applyTheme(newTheme);
				writeOutput(`Theme switched to ${newTheme}.`);
				writePrompt();
			} else if (result) {
				writeOutput(result as string);
				writePrompt();
			} else {
				writePrompt();
			}

			// Nice feedback for certain commands
			if (['contact', 'resume', 'project'].includes(cmdName)) {
				toast.success(`${cmdName} executed`);
			}
			if (cmdName === 'resume') {
				toast.info('Resume link ready — replace /static/resume.pdf with the real one', { duration: 4000 });
			}
		} catch (e) {
			writeOutput(`Error running ${cmdName}: ${(e as Error).message}`, true);
			writePrompt();
		}

		isProcessing = false;
	}

	// ============================================
	// THEME SWITCHING (live)
	// ============================================
	function applyTheme(theme: 'green' | 'amber' | 'cyan') {
		if (!terminal) return;
		currentTheme = theme;

		const colors = themes[theme];

		// Update xterm theme
		terminal.options.theme = {
			...terminal.options.theme,
			foreground: colors.fg,
			cursor: colors.cursor
		};

		// Also update CSS var so the outer CRT can react if we want future glow changes
		const root = document.documentElement;
		if (theme === 'green') root.style.setProperty('--text', '#00ff9f');
		if (theme === 'amber') root.style.setProperty('--text', '#ffbf00');
		if (theme === 'cyan') root.style.setProperty('--text', '#00e0ff');
	}

	// ============================================
	// RESIZE + ADDONS
	// ============================================
	async function setupAddons() {
		if (!terminal) return;

		// Fit addon (auto resize)
		const FitAddonClass = (await XtermAddon.FitAddon()).FitAddon;
		fitAddon = new FitAddonClass();
		terminal.loadAddon(fitAddon);

		// Clickable URLs
		const WebLinksAddonClass = (await XtermAddon.WebLinksAddon()).WebLinksAddon;
		webLinksAddon = new WebLinksAddonClass();
		terminal.loadAddon(webLinksAddon);

		// Fit on window resize
		const resizeObserver = new ResizeObserver(() => {
			requestAnimationFrame(() => {
				try {
					fitAddon?.fit();
				} catch {}
			});
		});

		const wrapper = document.querySelector('.terminal-wrapper');
		if (wrapper) resizeObserver.observe(wrapper);

		// Initial fit
		setTimeout(() => fitAddon?.fit(), 60);

		// Cleanup observer on destroy
		return () => resizeObserver.disconnect();
	}

	async function onLoad() {
		if (!terminal) return;

		// Setup addons first
		await setupAddons();

		// Wire input (onData for character input + history handled via onKey prop on Xterm)
		terminal.onData(handleInput);
		// Note: onKey is wired via the Xterm component prop below to avoid duplicates

		// Boot!
		await bootSequence();
	}

	function onData(data: string) {
		// We handle via onLoad binding + terminal.onData inside onLoad for full control.
		// This prop is still useful for debug if needed.
	}

	// ============================================
	// PUBLIC API (accessible via bind:this on parent)
	// ============================================
	export function clear() {
		terminal?.clear();
		writePrompt();
	}

	export function focus() {
		terminal?.focus();
	}

	export function write(text: string) {
		terminal?.write(text);
	}
</script>

<div class="terminal-wrapper">
	<Xterm
		bind:terminal
		{options}
		{onLoad}
		{onData}
		onKey={handleKey}
	/>
</div>
