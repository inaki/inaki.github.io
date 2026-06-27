// Exact content from the design handout + visual mocks (Jun 2026)

export const OWNER = "Iñaki Aranzadi";
export const HANDLE = "inaki@portfolio";
export const ROLE = "Senior Design Engineer";
export const TITLE = "Senior Design Engineer · React · TypeScript · Design Systems";

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

export const CURRENTLY = `Full rebuild mode at Herald — rethinking chat-centric flows from the ground up and asking what this product wants to be when it grows up.

Just shipped a CLI for the super users who'd rather type than click. V2 is on the way with the best stack I can justify — same north star as always: if it doesn't feel right for the human on the other side, it doesn't ship.`;

export type ExperienceEntry = {
	role: string;
	company: string;
	dates: string;
	note?: string;
};

export const EXPERIENCE: ExperienceEntry[] = [
	{
		role: "Design Engineer",
		company: "Herald",
		dates: "Jan 2025 – Present",
		note: "Design Engineer on Herald's AI content platform — rebuilding product flows beyond chat-centric UX, shipping CLI tools for power users (v2 in progress). End-to-end surfaces for research synthesis, collaborative writing, tone-of-voice, fact-checking, and publishing. React, TypeScript, shadcn/ui, Tailwind."
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
	},
	{
		role: "Senior Frontend/UI Engineer",
		company: "Gap Inc.",
		dates: "Nov 2016 – Jun 2017",
		note: "React and Angular UI/UX improvements; led internal dev-productivity tools."
	},
	{
		role: "Senior Frontend Engineer",
		company: "Williams-Sonoma",
		dates: "Aug 2016 – Nov 2016",
		note: "Frontend for six Williams Sonoma stores — desktop and mobile web, emerging UI technologies."
	},
	{
		role: "Fullstack Developer",
		company: "Autodesk",
		dates: "Jan 2016 – Jul 2016",
		note: "Full-stack web and e-commerce — dependency migrations, BDD testing, PayPal integrations."
	},
	{
		role: "Fullstack Javascript Developer Fellow",
		company: "Code for America",
		dates: "Jan 2015 – Dec 2015",
		note: "Three civic apps for urban farming — led design, prototyping, user testing, and iteration. Flask, AngularJS, Postgres."
	},
	{
		role: "Clinical Psychologist",
		company: "Puerto Rico Dept. of Health",
		dates: "Jan 2006 – Jan 2012",
		note: "Interdisciplinary leadership, case management, intervention planning, and organizational transformation."
	}
];

export const EDUCATION = [
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
	"Senior Design Engineer building the human layer on AI-powered products. A decade of design-system craft at Williams-Sonoma, NextRequest, Afterpay, and Optimizely — now at Herald, owning editorial workflows and interfaces where powerful models meet people who need to trust what they ship. Building AI first, designing for humans.";

export const RESUME_LOCATION = "SF Bay Area · Puerto Rico · Remote";

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
	},
	{
		name: "docstree",
		desc: "Simple app to view your Google Drive documents.",
		url: "https://github.com/inaki/docstree",
		lang: "TypeScript",
		updated: "Dec 2025"
	}
];

// Quick command pills shown on boot (from mock)
export const QUICK_COMMANDS = [
	"/resume", "/experience", "/currently", "/github", "/contact", "/music", "/game", "/theme"
];

// Command metadata for /help and slash menu (from handout page 06)
export type CommandMetaItem = { cmd: string; desc: string };

export const COMMAND_META: CommandMetaItem[] = [
	{ cmd: "/help", desc: "list everything you can type" },
	{ cmd: "/whoami", desc: "who is Iñaki, in 5 seconds" },
	{ cmd: "/currently", desc: "what I am building right now" },
	{ cmd: "/experience", desc: "the career timeline" },
	{ cmd: "/resume", desc: "the full résumé card" },
	{ cmd: "/export", desc: "download my résumé as PDF" },
	{ cmd: "/github", desc: "featured repositories" },
	{ cmd: "/linkedin", desc: "open my LinkedIn profile" },
	{ cmd: "/contact", desc: "get in touch" },
	{ cmd: "/hobbies", desc: "what I do for fun" },
	{ cmd: "/music", desc: "a tiny neon music player" },
	{ cmd: "/game", desc: "play snake, maze or pong" },
	{ cmd: "/theme", desc: "toggle light / dark" },
	{ cmd: "/clear", desc: "clear the terminal" }
];

export const EASTER_EGGS = ["/sudo", "/coffee", "/matrix", "/neofetch"];

// Aliases
export const ALIASES: Record<string, string> = {
	"/now": "/currently",
	"/exp": "/experience",
	"/cv": "/resume",
	"/gh": "/github",
	"/in": "/linkedin",
	"/cls": "/clear"
};

export const CONTACT = {
	email: "hello@inakito.com",
	twitter: "https://x.com/inakito",
	github: "https://github.com/inaki",
	linkedin: "https://www.linkedin.com/in/inaki-aranzadi/",
	cal: "https://cal.com/inakito"
};
