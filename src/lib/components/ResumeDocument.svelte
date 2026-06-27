<script lang="ts">
	import {
		OWNER,
		TITLE,
		WHOAMI_MOTTO,
		RESUME_SUMMARY,
		RESUME_LOCATION,
		EXPERIENCE,
		EDUCATION,
		CERTS,
		VOLUNTEERING,
		SKILLS,
		CONTACT
	} from '$lib/content';

	let { variant = 'print' }: { variant?: 'print' | 'terminal' } = $props();
</script>

<article class="resume-document" class:terminal={variant === 'terminal'} class:print={variant === 'print'}>
	<header class="doc-header">
		<h1>{OWNER}</h1>
		<p class="doc-title">{TITLE}</p>
		<p class="doc-motto">{WHOAMI_MOTTO}</p>
		<div class="doc-contact">
			<a href="mailto:{CONTACT.email}">{CONTACT.email}</a>
			<span class="sep">·</span>
			<span>github.com/inaki</span>
			<span class="sep">·</span>
			<span>linkedin.com/in/inaki-aranzadi</span>
			<span class="sep">·</span>
			<span>cal.com/inakito</span>
		</div>
		<p class="doc-location">{RESUME_LOCATION}</p>
	</header>

	<section class="doc-section">
		<h2>Summary</h2>
		<p class="doc-summary">{RESUME_SUMMARY}</p>
	</section>

	<section class="doc-section">
		<h2>Experience</h2>
		<div class="doc-experience">
			{#each EXPERIENCE as exp, i}
				<div class="exp-item" class:current={i === 0}>
					<div class="exp-head">
						<div class="exp-role">{exp.role} · {exp.company}</div>
						<div class="exp-dates">{exp.dates}</div>
					</div>
					{#if exp.note}
						<p class="exp-note">{exp.note}</p>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<section class="doc-section doc-section-compact">
		<h2>Education</h2>
		{#each EDUCATION as edu}
			<div class="compact-row">
				<div>
					<div class="compact-main">{edu.school}</div>
					<div class="compact-sub">{edu.detail}</div>
				</div>
				<div class="compact-meta">{edu.dates}</div>
			</div>
		{/each}
	</section>

	<section class="doc-section doc-section-compact">
		<h2>Certifications</h2>
		{#each CERTS as cert}
			<p class="compact-line">{cert}</p>
		{/each}
	</section>

	<section class="doc-section doc-section-compact">
		<h2>Volunteering</h2>
		{#each VOLUNTEERING as item}
			<p class="compact-line">{item}</p>
		{/each}
	</section>

	<section class="doc-section">
		<h2>Skills</h2>
		<p class="doc-skills">{SKILLS.join(', ')}</p>
	</section>
</article>

<style>
	.resume-document {
		--doc-text: #16141f;
		--doc-muted: #5c5670;
		--doc-accent: #0b7f7a;
		--doc-accent-soft: #e8f6f5;
		--doc-rule: #ddd8ea;
		font-family: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;
		color: var(--doc-text);
		line-height: 1.45;
	}

	.resume-document.terminal {
		--doc-text: var(--text);
		--doc-muted: var(--dim);
		--doc-accent: var(--cyan);
		--doc-accent-soft: transparent;
		--doc-rule: var(--border);
		font-family: inherit;
	}

	.doc-header {
		padding-bottom: 14px;
		border-bottom: 2px solid var(--doc-accent);
		margin-bottom: 16px;
	}

	h1 {
		margin: 0;
		font-size: 26px;
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.1;
	}

	.doc-title {
		margin: 4px 0 0;
		font-size: 13px;
		font-weight: 500;
		color: var(--doc-accent);
	}

	.doc-motto {
		margin: 8px 0 0;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--doc-muted);
	}

	.resume-document.terminal .doc-motto {
		background: linear-gradient(90deg, var(--cyan), var(--mg));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		-webkit-text-fill-color: transparent;
	}

	.doc-contact {
		margin-top: 10px;
		font-size: 11px;
		color: var(--doc-muted);
		line-height: 1.6;
	}

	.resume-document.terminal .doc-contact a {
		color: var(--cyan);
		text-decoration: none;
	}

	.resume-document.terminal .doc-contact a:hover {
		text-decoration: underline;
	}

	.sep {
		margin: 0 5px;
		opacity: 0.55;
	}

	.doc-location {
		margin: 4px 0 0;
		font-size: 11px;
		color: var(--doc-muted);
	}

	.doc-section + .doc-section {
		margin-top: 16px;
	}

	.doc-section-compact + .doc-section-compact {
		margin-top: 12px;
	}

	h2 {
		margin: 0 0 8px;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--doc-accent);
	}

	.doc-summary {
		margin: 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--doc-muted);
	}

	.doc-experience {
		display: flex;
		flex-direction: column;
		gap: 11px;
	}

	.exp-item {
		break-inside: avoid;
		page-break-inside: avoid;
		border-left: 2px solid var(--doc-rule);
		padding-left: 11px;
	}

	.exp-item.current {
		border-color: var(--doc-accent);
	}

	.exp-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 12px;
	}

	.exp-role {
		font-size: 13px;
		font-weight: 600;
		min-width: 0;
	}

	.exp-item:not(.current) .exp-role {
		color: var(--doc-muted);
	}

	.exp-dates {
		font-size: 11px;
		color: var(--doc-muted);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.exp-note {
		margin: 4px 0 0;
		font-size: 12px;
		line-height: 1.48;
		color: var(--doc-muted);
	}

	.compact-row {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		font-size: 13px;
		padding: 3px 0;
		border-bottom: 1px dashed var(--doc-rule);
	}

	.compact-row:last-child {
		border-bottom: none;
	}

	.compact-main {
		font-weight: 500;
	}

	.compact-sub,
	.compact-meta,
	.compact-line {
		font-size: 12px;
		color: var(--doc-muted);
	}

	.compact-sub {
		margin-top: 2px;
	}

	.compact-line {
		margin: 0;
		padding: 2px 0;
		line-height: 1.45;
	}

	.doc-skills {
		margin: 0;
		font-size: 12px;
		line-height: 1.6;
		color: var(--doc-muted);
	}

	@media print {
		.resume-document {
			font-size: 9.5pt;
		}

		h1 {
			font-size: 22pt;
		}

		.doc-title {
			font-size: 11pt;
		}

		.doc-summary,
		.exp-note,
		.compact-line {
			font-size: 9pt;
		}

		.exp-role,
		.compact-main {
			font-size: 9.5pt;
		}

		.doc-section + .doc-section {
			margin-top: 12px;
		}

		.doc-experience {
			gap: 8px;
		}

		.doc-skills {
			font-size: 9pt;
		}

		.doc-header {
			-webkit-print-color-adjust: exact;
			print-color-adjust: exact;
		}
	}
</style>