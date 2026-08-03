<script lang="ts">
	import {
		CONTACT,
		EXPERIENCE,
		OWNER,
		RESUME_SUMMARY,
		ROLE,
		SKILLS,
		TITLE,
		WHOAMI_STORY
	} from '$lib/content';
</script>

<!--
  Server-rendered profile for crawlers, accessibility, and no-JS.
  Stays visually quiet so the terminal remains the hero, but content is real HTML.
-->
<section class="seo-profile" aria-label="About {OWNER}">
	<header class="seo-head">
		<h1>{OWNER}</h1>
		<p class="role">{TITLE}</p>
		<p class="summary">{RESUME_SUMMARY}</p>
	</header>

	<nav class="seo-nav" aria-label="Primary">
		<a href="/resume">Résumé</a>
		<a href="/blog">Writing</a>
		<a href={CONTACT.github} rel="me noopener" target="_blank">GitHub</a>
		<a href={CONTACT.linkedin} rel="me noopener" target="_blank">LinkedIn</a>
		<a href={CONTACT.cal} rel="noopener" target="_blank">Book a call</a>
		<a href="mailto:{CONTACT.email}">Email</a>
	</nav>

	<div class="seo-detail">
		{#each WHOAMI_STORY as paragraph}
			<p>{paragraph}</p>
		{/each}

		<h2>Experience</h2>
		<ul>
			{#each EXPERIENCE.slice(0, 6) as exp}
				<li>
					<strong>{exp.role}</strong> · {exp.company}
					<span class="dates">({exp.dates})</span>
					{#if exp.note}
						<span class="note"> — {exp.note}</span>
					{/if}
				</li>
			{/each}
		</ul>

		<h2>Skills</h2>
		<p class="skills">{SKILLS.join(', ')}</p>

		<p class="cta">
			Full résumé at <a href="/resume">inaki.to/resume</a>
			· notes on craft at <a href="/blog">inaki.to/blog</a>
			· {ROLE} available {CONTACT.email ? `via ${CONTACT.email}` : 'for senior design engineering roles'}.
		</p>
	</div>
</section>

<style>
	.seo-profile {
		max-width: 42rem;
		margin: 14px auto 0;
		padding: 0 8px 12px;
		text-align: center;
		color: var(--dim, #8b849c);
		font-family: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;
	}

	.seo-head h1 {
		margin: 0;
		font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--text, #f2eef8);
	}

	.role {
		margin: 4px 0 0;
		font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
		font-size: 0.72rem;
		color: var(--cyan, #34e7f5);
	}

	.summary {
		margin: 8px auto 0;
		max-width: 36rem;
		font-size: 0.78rem;
		line-height: 1.45;
	}

	.seo-nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 6px 12px;
		margin-top: 10px;
		font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
		font-size: 0.7rem;
	}

	.seo-nav a {
		color: var(--cyan, #34e7f5);
		text-decoration: none;
	}

	.seo-nav a:hover {
		color: var(--mg, #ff2bd6);
		text-decoration: underline;
	}

	/* Full bio + experience: available to crawlers/a11y; not competing with the terminal UI */
	.seo-detail {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.seo-detail h2 {
		font-size: 1rem;
	}

	.seo-detail ul {
		padding-left: 1.2rem;
	}

	.dates {
		opacity: 0.85;
	}

	.note {
		display: block;
		margin-top: 0.15rem;
	}

	.skills,
	.cta {
		line-height: 1.5;
	}
</style>
