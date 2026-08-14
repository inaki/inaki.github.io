/**
 * Sitewide SEO: titles, descriptions, OG defaults, JSON-LD.
 */
import {
	CONTACT,
	OWNER,
	RESUME_LOCATION,
	RESUME_SUMMARY,
	ROLE,
	SKILLS,
	WHOAMI_STORY
} from '$lib/content';
import { absoluteUrl, SITE_NAME, SITE_URL } from '$lib/site';

export { OWNER, ROLE, RESUME_SUMMARY, WHOAMI_STORY };

export const DEFAULT_OG_IMAGE = absoluteUrl('/og-default.jpg');
export const DEFAULT_OG_IMAGE_ALT = `${OWNER} — ${ROLE}`;

/** Primary SERP title. */
export const SITE_TITLE = `${OWNER} — ${ROLE} | Design Systems, React, AI UX`;

/** Hire-intent meta description. */
export const SITE_DESCRIPTION =
	'Senior Frontend UI/UX Engineer building AI-first product surfaces and design systems. A decade of frontend craft at Herald, Williams-Sonoma, Afterpay, and Optimizely. SF Bay Area · Puerto Rico · Remote.';

export const RESUME_TITLE = `${OWNER} — Résumé | ${ROLE}`;

export const RESUME_DESCRIPTION = RESUME_SUMMARY;

export const BLOG_TITLE = `Writing — ${OWNER} | Design Systems & AI UX`;
export const BLOG_DESCRIPTION =
	'Notes on design systems, AI UX, terminal craft, and shipping interfaces people trust — from a Senior Frontend UI/UX Engineer.';

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SITE_KEYWORDS = [
	'Senior Frontend UI/UX Engineer',
	'Design Systems',
	'React',
	'TypeScript',
	'AI UX',
	'UX Engineering',
	'Frontend Engineer',
	'Iñaki Aranzadi',
	'Herald'
].join(', ');

export function resolveOgImage(pathOrUrl?: string | null): string {
	if (!pathOrUrl) return DEFAULT_OG_IMAGE;
	if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl;
	return absoluteUrl(pathOrUrl);
}

export function personJsonLd(overrides: Record<string, unknown> = {}) {
	return {
		'@type': 'Person',
		'@id': PERSON_ID,
		name: OWNER,
		alternateName: 'Inaki Aranzadi',
		jobTitle: ROLE,
		description: RESUME_SUMMARY,
		url: absoluteUrl('/'),
		image: DEFAULT_OG_IMAGE,
		email: CONTACT.email,
		sameAs: [CONTACT.github, CONTACT.linkedin, CONTACT.twitter, CONTACT.cal].filter(Boolean),
		knowsAbout: SKILLS.slice(0, 14),
		worksFor: {
			'@type': 'Organization',
			name: 'Herald'
		},
		homeLocation: {
			'@type': 'Place',
			name: RESUME_LOCATION
		},
		...overrides
	};
}

export function websiteJsonLd() {
	return {
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		name: SITE_NAME,
		url: SITE_URL,
		description: SITE_DESCRIPTION,
		inLanguage: 'en',
		author: { '@id': PERSON_ID },
		publisher: { '@id': PERSON_ID }
	};
}

/** Home page: Person + WebSite graph. */
export function homeJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@graph': [personJsonLd(), websiteJsonLd()]
	};
}

/** Résumé as ProfilePage with Person main entity. */
export function resumeJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			personJsonLd(),
			{
				'@type': 'ProfilePage',
				'@id': absoluteUrl('/resume#page'),
				url: absoluteUrl('/resume'),
				name: RESUME_TITLE,
				description: RESUME_DESCRIPTION,
				mainEntity: { '@id': PERSON_ID },
				about: { '@id': PERSON_ID },
				isPartOf: { '@id': WEBSITE_ID }
			},
			websiteJsonLd()
		]
	};
}

export function blogPostingJsonLd(opts: {
	title: string;
	description: string;
	url: string;
	datePublished: string;
	dateModified?: string;
	image?: string | null;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: opts.title,
		description: opts.description,
		datePublished: opts.datePublished,
		dateModified: opts.dateModified ?? opts.datePublished,
		author: {
			'@type': 'Person',
			'@id': PERSON_ID,
			name: OWNER,
			url: absoluteUrl('/'),
			jobTitle: ROLE
		},
		mainEntityOfPage: opts.url,
		url: opts.url,
		image: resolveOgImage(opts.image),
		publisher: {
			'@type': 'Person',
			'@id': PERSON_ID,
			name: OWNER
		}
	};
}
