// Exact content from the design handout + visual mocks (Jun 2026)

export const OWNER = "Iñaki Aranzadi";
export const HANDLE = "inaki@portfolio";
export const TITLE = "Product Engineer · React · TypeScript · Full-stack";

export const BIO = `Hi, I'm Iñaki Aranzadi — Product Engineer.

I build products, not just features. Frontend roots, full-stack reach, and a designer's favorite engineer — obsessed with value, differentiation, and experience.

Type / to summon commands, or tap one:`;

export const CURRENTLY = "right now: raising answer quality on the agent and polishing the surfaces people touch every day.";

// Experience from mock image #2 + handout
export const EXPERIENCE = [
	{
		role: "Product Engineer",
		company: "RunLLM",
		dates: "Jan 2025 – Present",
		note: "Shipping RunLLM's AI support agent — idea → design → production. React + Mantine on the surface; increasingly full-stack underneath (APIs, data, AI orchestration). Partnering tightly with design so the experience feels inevitable, not assembled. Optimizing for value & differentiation — what actually moves the product."
	},
	{
		role: "Senior Frontend Engineer",
		company: "Joy",
		dates: "Feb 2022 – Oct 2022"
	},
	{
		role: "Senior Frontend Engineer",
		company: "Williams-Sonoma",
		dates: "Jul 2021 – Feb 2022"
	},
	{
		role: "Senior Frontend Engineer",
		company: "NextRequest",
		dates: "Jan 2020 – Jul 2021"
	},
	{
		role: "Senior UI / Frontend Engineer",
		company: "Afterpay",
		dates: "Mar 2019 – Oct 2019"
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

export const SKILLS = [
	"React", "TypeScript", "Vue.js", "React Native", "Node.js", "Python",
	"GraphQL", "Mantine", "TailwindCSS", "Sass", "Design Systems", "AI / LLMs", "CI/CD"
];

// Featured projects / links for /github (handout style – replace with real when ready)
export const GITHUB_PROJECTS = [
	{ name: "terminal-portfolio", desc: "This site. A résumé you talk to.", url: "https://github.com/inakito/inakito" },
	{ name: "runllm-agent", desc: "Production AI support surfaces and orchestration.", url: "#" },
	{ name: "claude-kit", desc: "Prompts, skills and workflows for high-leverage AI coding.", url: "#" }
];

// Quick command pills shown on boot (from mock)
export const QUICK_COMMANDS = [
	"/resume", "/experience", "/currently", "/github", "/music", "/game", "/theme"
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
	{ cmd: "/hobbies", desc: "what I do for fun" },
	{ cmd: "/music", desc: "a tiny neon music player" },
	{ cmd: "/game", desc: "play snake, maze or pong" },
	{ cmd: "/theme", desc: "toggle light / dark" }
];

export const EASTER_EGGS = ["/sudo", "/coffee", "/matrix", "/neofetch", "/contact"];

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
	linkedin: "https://linkedin.com/in/inakito",
	github: "https://github.com/inakito"
};
