// Exact content from the design handout + visual mocks (Jun 2026)

export const OWNER = "Iñaki Aranzadi";
export const HANDLE = "inaki@portfolio";
export const ROLE = "Senior Frontend UI/UX Engineer";
export const TITLE = "Senior Frontend UI/UX Engineer · React · TypeScript · Design Systems";

export const TAGLINE = "I bridge design and engineering — turning intent into interfaces people trust.";
export const TAGLINE_DETAIL = "React/TypeScript/Design Systems. Obsessed with craft that feels inevitable.";

export const WHOAMI_MOTTO = "Building AI First, Designing for Humans";

export const WHOAMI_STORY = [
	"I didn't arrive with a title — I built the path. A decade of design systems at Williams-Sonoma, NextRequest, Afterpay, and Optimizely taught me that great interfaces are engineered from intent, not decorated at the end.",
	"When AI became the platform, that craft mattered more, not less. At Herald I own the human layer — editorial workflows, collaborative writing, and publishing surfaces where powerful models meet people who need to trust what they ship.",
	"Frontend roots, full-stack reach, and the engineer designers want in the room. I translate complexity into calm, high-fidelity UI — because the experience is the product."
];

export const BIO = `Hi, I'm Iñaki Aranzadi — ${ROLE}.

I translate intent into interface: design fidelity, system thinking, and the craft that makes complex tools feel inevitable. Frontend roots, full-stack reach, and the engineer designers want in the room.

Type / to summon commands, or tap one:`;

export type ExperienceEntry = {
	role: string;
	company: string;
	dates: string;
	note?: string;
};

export const EXPERIENCE: ExperienceEntry[] = [
	{
		role: "Senior Frontend UI/UX Engineer",
		company: "Herald",
		dates: "Jan 2025 – Present",
		note: "Senior Frontend UI/UX Engineer on Herald's AI content platform — rebuilding product flows beyond chat-centric UX, shipping CLI tools for power users. End-to-end surfaces for research synthesis, collaborative writing, tone-of-voice, fact-checking, and publishing. React, TypeScript, shadcn/ui, Tailwind."
	},
	{
		role: "Senior Frontend Engineer",
		company: "Joy",
		dates: "Feb 2022 – Oct 2022",
		note: "High-craft wedding planning surfaces, feature development, and a reusable design system — React, TypeScript, GraphQL, documented components, CI/CD."
	},
	{
		role: "Senior Frontend Engineer",
		company: "Williams-Sonoma",
		dates: "Jul 2021 – Feb 2022",
		note: "Built and maintained the design system, component library, and docs across Williams Sonoma brands — Vue, TypeScript, Tailwind."
	},
	{
		role: "Senior Frontend Engineer",
		company: "NextRequest",
		dates: "Jan 2020 – Jul 2021",
		note: "Led frontend architecture and a full-stack migration; owned the design system and published npm packages. Vue, Storybook, Chromatic, Cypress."
	},
	{
		role: "Senior UI / Frontend Engineer",
		company: "Afterpay",
		dates: "Mar 2019 – Oct 2019",
		note: "Consumer Growth Team — React Native UI for iOS/Android across NA, UK, and Oceania; key contributor to the design system."
	},
	{
		role: "Senior UI/Frontend Engineer",
		company: "Walmart Labs",
		dates: "Mar 2018 – Nov 2018",
		note: "Internal tools and consumer features for Walmart/Jet; led design and build of replenishment-team tooling. React/Redux, Electron."
	},
	{
		role: "Senior UI Engineer",
		company: "Optimizely",
		dates: "Jun 2017 – Mar 2018",
		note: "Embedded with the design team on the Optimizely Design System — React components, OUI framework, Storybook pattern library."
	}
];

export const EDUCATION = [
	{
		school: "Code for America",
		dates: "2015",
		detail: "Fullstack JavaScript Developer Fellowship — civic tech design, prototyping, and user testing"
	},
	{
		school: "University of Deusto",
		dates: "1999 – 2004",
		detail: "Bachelor's & Master's, Industrial & Organizational Psychology"
	},
	{
		school: "Universidad Interamericana de Puerto Rico",
		dates: "2011 – 2012",
		detail: "Biomedical Sciences"
	}
];

export const CERTS = [
	"CompTIA Security+ ce · Aug 2024 – Aug 2027"
];

export const VOLUNTEERING = [
	"Co-founder & Brigade Captain @ Code for Puerto Rico 2014",
	"Co-founder & Mentor @ TechInclusive SF 2015 – 2016"
];

export const RESUME_SUMMARY =
	"Senior Frontend UI/UX Engineer building the human layer on AI-powered products. A decade of design-system craft at Williams-Sonoma, NextRequest, Afterpay, and Optimizely — now at Herald, owning editorial workflows and interfaces where powerful models meet people who need to trust what they ship. Building AI first, designing for humans.";

export const RESUME_LOCATION = "SF Bay Area";

export const RESUME_PDF_FILENAME = "Inaki-Aranzadi-Resume.pdf";

export const SKILLS = [
	"Design Systems", "React", "TypeScript", "UX Engineering", "shadcn/ui", "TailwindCSS",
	"Vue.js", "React Native", "Flutter", "Node.js", "Python", "Rust", "GraphQL",
	"Ratatui", "Ink CLI", "AI / LLMs", "CLI / TUI", "PostgreSQL", "Supabase", "Vercel", "CI/CD"
];

export type GitHubProject = {
	name: string;
	desc: string;
	url: string;
	lang?: string;
	stars?: number;
	updated?: string;
};

export const GITHUB_MORE_URL = "https://github.com/inaki?tab=repositories";

export const GITHUB_PROJECTS: GitHubProject[] = [
	{
		name: "talaria",
		desc: "Unofficial native TUI host for Hermes Agent.",
		url: "https://github.com/inaki/talaria",
		lang: "Rust",
		updated: "Aug 2026"
	},
	{
		name: "clarx",
		desc: "AI-first codebase standard — analysis engine, semantic UI kit, and CLI.",
		url: "https://github.com/Gernika-Labs/clarx",
		lang: "TypeScript",
		updated: "May 2026"
	},
	{
		name: "kudeak",
		desc: "Management tool for small gyms.",
		url: "https://github.com/inaki/kudeak",
		lang: "TypeScript",
		updated: "Feb 2026"
	},
	{
		name: "hanzibit",
		desc: "Hanzi learning and practice tool.",
		url: "https://github.com/inaki/hanzibit",
		lang: "TypeScript"
	},
	{
		name: "liburu",
		desc: "Simple desktop journal app.",
		url: "https://github.com/inaki/liburu",
		lang: "TypeScript",
		updated: "May 2026"
	},
	{
		name: "kuantu",
		desc: "Investment workspace tool.",
		url: "https://github.com/inaki/kuantu",
		lang: "TypeScript",
		updated: "May 2026"
	}
];

// Quick command pills shown on boot (from mock)
export const QUICK_COMMANDS = [
	"/whoami", "/resume", "/blog", "/github", "/contact"
];

// Command metadata for /help and slash menu (from handout page 06)
export type CommandMetaItem = { cmd: string; desc: string };

export const COMMAND_META: CommandMetaItem[] = [
	{ cmd: "/help", desc: "open the how-it-works guide" },
	{ cmd: "/whoami", desc: "who is Iñaki, in 5 seconds" },
	{ cmd: "/resume", desc: "the full résumé card" },
	{ cmd: "/blog", desc: "notes on craft & systems" },
	{ cmd: "/github", desc: "featured repositories" },
	{ cmd: "/linkedin", desc: "open my LinkedIn profile" },
	{ cmd: "/contact", desc: "get in touch" },
	{ cmd: "/game", desc: "play snake, maze or pong" },
	{ cmd: "/clear", desc: "clear the terminal" }
];

export const EASTER_EGGS = ["/sudo", "/coffee", "/matrix", "/neofetch"];

// Aliases
export const ALIASES: Record<string, string> = {
	"/cv": "/resume",
	"/gh": "/github",
	"/in": "/linkedin",
	"/posts": "/blog",
	"/writing": "/blog",
	"/cls": "/clear"
};

export const CONTACT = {
	email: "hello@inakito.com",
	twitter: "https://x.com/inakito",
	github: "https://github.com/inaki",
	linkedin: "https://www.linkedin.com/in/inaki-aranzadi/",
	cal: "https://cal.com/inakito"
};
