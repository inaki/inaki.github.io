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
  Server-rendered profile for crawlers and assistive tech.
  Hidden visually — the terminal already shows name, role, and commands.
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
			· {ROLE} available {CONTACT.email ? `via ${CONTACT.email}` : 'for senior frontend UI/UX engineering roles'}.
		</p>
	</div>
</section>

<style>
	/* Keep markup for crawlers / a11y; do not occupy layout under the terminal. */
	.seo-profile {
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
</style>
