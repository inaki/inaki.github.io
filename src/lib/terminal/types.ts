export interface Command {
	name: string;
	description: string;
	usage?: string;
	hidden?: boolean;
	handler: (args: string[]) => Promise<string | void> | string | void;
}

export interface TerminalCommandResult {
	output: string;
	isError?: boolean;
}

export type CommandRegistry = Map<string, Command>;

export interface Project {
	id: string;
	title: string;
	year: string;
	description: string;
	tech: string[];
	url?: string;
	repo?: string;
	role?: string;
}

export interface Skill {
	category: string;
	items: string[];
}
