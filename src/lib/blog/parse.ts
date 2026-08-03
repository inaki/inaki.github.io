import type { ParsedFrontmatter } from './types';

const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const FILE_DATE_SLUG_RE = /^(\d{4}-\d{2}-\d{2})-(.+)$/;

/**
 * Constrained frontmatter (no full YAML):
 * - keys: value (rest of line)
 * - tags: comma,separated,values  (not YAML arrays)
 * - draft: true | false
 * - strings may be wrapped in single or double quotes
 */
export function parseMarkdownFile(
	raw: string,
	filename: string
): { data: ParsedFrontmatter; body: string } {
	const match = raw.match(FM_RE);
	if (!match) {
		throw new Error(`[blog] ${filename}: missing YAML frontmatter (--- ... ---)`);
	}

	const fmBlock = match[1];
	const body = match[2].replace(/^\r?\n/, '');
	const fields = parseFrontmatterBlock(fmBlock, filename);

	const title = requireString(fields, 'title', filename);
	const description = requireString(fields, 'description', filename);
	const date = requireString(fields, 'date', filename);
	if (!DATE_RE.test(date)) {
		throw new Error(`[blog] ${filename}: date must be YYYY-MM-DD, got "${date}"`);
	}

	const updated = optionalString(fields, 'updated');
	if (updated && !DATE_RE.test(updated)) {
		throw new Error(`[blog] ${filename}: updated must be YYYY-MM-DD, got "${updated}"`);
	}

	const draftRaw = fields.draft;
	const draft =
		draftRaw === undefined || draftRaw === ''
			? false
			: draftRaw === 'true'
				? true
				: draftRaw === 'false'
					? false
					: (() => {
							throw new Error(
								`[blog] ${filename}: draft must be true or false, got "${draftRaw}"`
							);
						})();

	const tags = parseTags(fields.tags);
	const slugOverride = optionalString(fields, 'slug');
	const ogImage = optionalString(fields, 'ogImage');

	return {
		data: {
			title,
			description,
			date,
			updated,
			slug: slugOverride,
			tags,
			draft,
			ogImage
		},
		body
	};
}

function parseFrontmatterBlock(block: string, filename: string): Record<string, string> {
	const out: Record<string, string> = {};
	for (const line of block.split(/\r?\n/)) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const colon = trimmed.indexOf(':');
		if (colon === -1) {
			throw new Error(`[blog] ${filename}: invalid frontmatter line "${line}"`);
		}
		const key = trimmed.slice(0, colon).trim();
		let value = trimmed.slice(colon + 1).trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		out[key] = value;
	}
	return out;
}

function requireString(fields: Record<string, string>, key: string, filename: string): string {
	const v = fields[key];
	if (!v) throw new Error(`[blog] ${filename}: missing required frontmatter field "${key}"`);
	return v;
}

function optionalString(fields: Record<string, string>, key: string): string | undefined {
	const v = fields[key];
	return v ? v : undefined;
}

/** `tags: design-systems, craft` — commas, no brackets. */
function parseTags(raw?: string): string[] {
	if (!raw) return [];
	return raw
		.split(',')
		.map((t) => t.trim())
		.filter(Boolean);
}

/** Filename stem → slug (strip optional YYYY-MM-DD- prefix). */
export function slugFromFilename(stem: string): string {
	const m = stem.match(FILE_DATE_SLUG_RE);
	return m ? m[2] : stem;
}

export function readingMinutesFromBody(body: string): number {
	const words = body
		.trim()
		.split(/\s+/)
		.filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

export function stemFromPath(path: string): string {
	const base = path.split('/').pop() ?? path;
	return base.replace(/\.md$/i, '');
}
