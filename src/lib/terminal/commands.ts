import type { Command, CommandRegistry, Project, Skill } from './types';

// ============================================
// PERSONAL CONTENT - REPLACE WITH REAL DATA
// (Design handout coming - placeholders for now)
// ============================================

export const ABOUT_TEXT = `Inaki (inakito)

Senior Design Engineer — I bridge design and engineering,
turning intent into interfaces people trust.

I build things that feel fast, look sharp, and get out of the way.
Currently exploring SvelteKit + xterm.js + Cloudflare for 
this very site.

Background: design systems, pixel-level craft, and an unhealthy
love for monospace fonts and CRT aesthetics.`;

export const SKILLS: Skill[] = [
	{
		category: 'Languages',
		items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust (learning)']
	},
	{
		category: 'Frontend',
		items: ['Svelte/SvelteKit', 'React', 'Tailwind', 'CSS (a lot of it)']
	},
	{
		category: 'Backend & Infra',
		items: ['Node.js', 'Cloudflare Workers/Pages', 'PostgreSQL', 'Vercel']
	},
	{
		category: 'Obsessions',
		items: ['Terminal UX', 'DX tooling', 'Performance', 'ASCII art']
	}
];

export const PROJECTS: Project[] = [
	{
		id: 'terminal-portfolio',
		title: 'terminal-portfolio (this site)',
		year: '2026',
		description: 'A fast, retro, fully-interactive personal site powered by a real xterm.js instance. Because why have a boring homepage when you can ssh into someone\'s life?',
		tech: ['SvelteKit', 'TypeScript', 'xterm.js', '@xterm/addons', 'Tailwind', 'Cloudflare Pages'],
		url: 'https://inakito.com'
	},
	{
		id: 'claude-kit',
		title: 'claude-kit',
		year: '2025',
		description: 'Collection of production-grade prompts, skills, and workflows for getting the most out of Claude Code / Cursor / Windsurf.',
		tech: ['Prompt engineering', 'TypeScript', 'CLI tooling'],
		repo: 'https://github.com/inaki/claude-kit'
	},
	{
		id: 'fast-tui',
		title: 'fast-tui',
		year: '2024',
		description: 'A tiny, zero-dependency terminal UI library focused on speed and simplicity. Used in several internal dev tools.',
		tech: ['Go', 'ANSI', 'Terminal'],
		repo: 'https://github.com/inaki/fast-tui'
	}
];

export const CONTACT = {
	email: 'hello@inakito.com',
	twitter: 'https://x.com/inakito',
	github: 'https://github.com/inaki',
	linkedin: 'https://www.linkedin.com/in/inaki-aranzadi/',
	cal: 'https://cal.com/inakito'
};

export const RESUME_URL = '/resume';

// ============================================
// COMMAND IMPLEMENTATIONS
// ============================================

function formatList(items: string[]): string {
	return items.map((i, idx) => `  ${idx + 1}. ${i}`).join('\n');
}

function formatProject(p: Project): string {
	const lines: string[] = [];
	lines.push(`\x1b[1m${p.title}\x1b[0m  (${p.year})`);
	lines.push(p.description);
	lines.push(`\x1b[2mtech:\x1b[0m ${p.tech.join(' • ')}`);
	if (p.url) lines.push(`\x1b[36murl:\x1b[0m  ${p.url}`);
	if (p.repo) lines.push(`\x1b[36mcode:\x1b[0m ${p.repo}`);
	return lines.join('\n');
}

async function sleep(ms: number) {
	return new Promise((r) => setTimeout(r, ms));
}

export const commands: Command[] = [
	{
		name: 'help',
		description: 'Show available commands',
		handler: () => {
			const visible = commands.filter((c) => !c.hidden);
			const longest = Math.max(...visible.map((c) => c.name.length));
			const lines = visible.map((c) => {
				const padded = c.name.padEnd(longest + 2);
				const usage = c.usage ? ` ${c.usage}` : '';
				return `  \x1b[32m${padded}\x1b[0m${usage} — ${c.description}`;
			});
			return [
				'Available commands:',
				'',
				...lines,
				'',
				'Tip: Use ↑/↓ for history, tab for basic completion, "clear" to reset.'
			].join('\n');
		}
	},
	{
		name: 'about',
		description: 'Who I am',
		handler: () => ABOUT_TEXT
	},
	{
		name: 'whoami',
		description: 'Print current user',
		handler: () => 'inakito (you are talking to the real one)'
	},
	{
		name: 'skills',
		description: 'Technical skills & obsessions',
		handler: () => {
			return SKILLS.map(
				(s) => `\x1b[1m${s.category}\x1b[0m\n${formatList(s.items)}`
			).join('\n\n');
		}
	},
	{
		name: 'projects',
		description: 'List selected work',
		handler: () => {
			return PROJECTS.map((p, i) => 
				`${i + 1}. \x1b[1m${p.title}\x1b[0m — ${p.description.split('.')[0]}.`
			).join('\n') + '\n\nUse "project <number>" or "project <id>" for details.';
		}
	},
	{
		name: 'project',
		description: 'Show project details',
		usage: '<id|number>',
		handler: (args) => {
			if (!args.length) {
				return 'Usage: project <id or number>\nTry: project 1  or  project terminal-portfolio';
			}
			const query = args[0].toLowerCase();
			let proj: Project | undefined;

			// by number (1-based)
			const num = parseInt(query, 10);
			if (!isNaN(num) && num >= 1 && num <= PROJECTS.length) {
				proj = PROJECTS[num - 1];
			} else {
				proj = PROJECTS.find(
					(p) => p.id.toLowerCase() === query || p.title.toLowerCase().includes(query)
				);
			}

			if (!proj) return `No project found for "${args[0]}". Try "projects" first.`;
			return formatProject(proj);
		}
	},
	{
		name: 'contact',
		description: 'How to reach me',
		handler: () => {
			return [
				'Get in touch:',
				'',
				`  email     ${CONTACT.email}`,
				`  x/twitter ${CONTACT.twitter}`,
				`  github    ${CONTACT.github}`,
				`  linkedin  ${CONTACT.linkedin}`,
				`  book time ${CONTACT.cal}`,
				'',
				'Open any link by clicking it in the terminal (web links addon).'
			].join('\n');
		}
	},
	{
		name: 'resume',
		description: 'Download / view resume',
		handler: () => {
			// In real usage we can trigger a download or open in new tab
			// For now just give instructions + toast will be triggered from caller if needed
			return `Résumé: ${RESUME_URL}\nUse /export to open the print view and save as PDF.`;
		}
	},
	{
		name: 'clear',
		description: 'Clear the terminal',
		hidden: true,
		handler: () => {
			// Special handling in the component
			return '__CLEAR__';
		}
	},
	{
		name: 'echo',
		description: 'Print arguments back',
		usage: '[text...]',
		handler: (args) => args.join(' ')
	},
	{
		name: 'date',
		description: 'Current date/time',
		handler: () => new Date().toString()
	},
	{
		name: 'ls',
		description: 'List "files"',
		handler: () => [
			'about.txt',
			'skills.txt',
			'projects/',
			'contact.txt',
			'resume.pdf'
		].join('   ')
	},
	{
		name: 'cat',
		description: 'Display file contents',
		usage: '<file>',
		handler: (args) => {
			if (!args.length) return 'cat: missing file operand';
			const file = args[0].toLowerCase();
			if (file === 'about.txt') return ABOUT_TEXT;
			if (file === 'skills.txt') return commands.find(c => c.name === 'skills')!.handler([]);
			if (file === 'contact.txt') return commands.find(c => c.name === 'contact')!.handler([]);
			if (file.includes('resume')) return 'Binary file. Use "resume" command instead.';
			if (file === 'projects/' || file === 'projects') return 'cat: projects is a directory. Use "projects" command.';
			return `cat: ${args[0]}: No such file or directory`;
		}
	},
	{
		name: 'theme',
		description: 'Switch phosphor color (green | amber | cyan)',
		usage: '<color>',
		handler: (args) => {
			const color = (args[0] || '').toLowerCase();
			if (['green', 'amber', 'cyan'].includes(color)) {
				// The actual theme change is handled by the Terminal component via custom event
				return `__THEME__${color}`;
			}
			return 'Available themes: green, amber, cyan\nExample: theme amber';
		}
	},
	{
		name: 'hack',
		description: 'Totally real hacking',
		hidden: true,
		handler: async () => {
			await sleep(120);
			return 'Accessing mainframe...';
		}
	},
	// Easter egg
	{
		name: 'sudo',
		description: 'Run command as root',
		usage: '[command]',
		handler: (args) => {
			if (args[0] === 'rm' && args[1] === '-rf' && args[2] === '/') {
				return 'Nice try. This is a browser. Nothing was harmed.';
			}
			return `sudo: ${args.join(' ') || '(nothing)'} : permission denied (this is a website)`;
		}
	}
];

export const commandRegistry: CommandRegistry = new Map(
	commands.map((cmd) => [cmd.name, cmd])
);

// For tab completion (simple)
export function getCompletions(partial: string): string[] {
	const lower = partial.toLowerCase();
	return commands
		.filter((c) => !c.hidden && c.name.startsWith(lower))
		.map((c) => c.name);
}
