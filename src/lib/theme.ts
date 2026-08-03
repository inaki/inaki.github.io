export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'inakito-theme';

export function getTheme(): Theme {
	if (typeof document === 'undefined') return 'dark';
	return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

export function setTheme(theme: Theme, persist = true): void {
	if (typeof document === 'undefined') return;
	const root = document.documentElement;
	if (theme === 'light') {
		root.classList.add('light');
		root.setAttribute('data-theme', 'light');
	} else {
		root.classList.remove('light');
		root.removeAttribute('data-theme');
	}
	(document as Document & { __INAKI_THEME__?: Theme }).__INAKI_THEME__ = theme;
	if (persist) {
		try {
			localStorage.setItem(THEME_STORAGE_KEY, theme);
		} catch {
			/* private mode */
		}
	}
}

export function toggleTheme(): Theme {
	const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
	setTheme(next);
	return next;
}

/** Prefer stored theme, else current DOM class (from FOUC script), else dark. */
export function initTheme(): Theme {
	if (typeof document === 'undefined') return 'dark';
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		if (stored === 'light' || stored === 'dark') {
			setTheme(stored, false);
			return stored;
		}
	} catch {
		/* ignore */
	}
	const current = getTheme();
	setTheme(current, false);
	return current;
}
