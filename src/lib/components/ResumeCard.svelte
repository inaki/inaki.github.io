<script lang="ts">
	import { OWNER, TITLE, EXPERIENCE, EDUCATION, CERTS, VOLUNTEERING, SKILLS } from '$lib/content';

	let { onExport }: { onExport?: () => void } = $props();
</script>

<div class="resume-card output-card">
	<div class="flex items-start justify-between gap-3">
		<div>
			<h1>{OWNER}</h1>
			<div class="title">{TITLE}</div>
		</div>
		<button
			onclick={onExport}
			class="pill text-[12px] px-3 py-1 flex items-center gap-1.5"
		>
			<span>⤓</span>
			<span class="font-medium">export PDF</span>
		</button>
	</div>

	<div class="section">
		<div class="section-title">EXPERIENCE</div>
		{#each EXPERIENCE as exp}
			<div class="row">
				<div>
					<div class="font-medium">{exp.role} · {exp.company}</div>
					{#if exp.note}
						<div class="text-[12px] text-[var(--dim)] mt-0.5 leading-snug pr-4">{exp.note}</div>
					{/if}
				</div>
				<div class="meta">{exp.dates}</div>
			</div>
		{/each}
	</div>

	<div class="section">
		<div class="section-title">EDUCATION</div>
		{#each EDUCATION as edu}
			<div class="row">
				<div>{edu.school}<br /><span class="text-[var(--dim)] text-[12px]">{edu.detail}</span></div>
				<div class="meta">{edu.dates}</div>
			</div>
		{/each}
	</div>

	<div class="section">
		<div class="section-title">CERTIFICATIONS</div>
		{#each CERTS as c}
			<div class="text-[13px] py-0.5">{c}</div>
		{/each}
	</div>

	<div class="section">
		<div class="section-title">VOLUNTEERING</div>
		{#each VOLUNTEERING as v}
			<div class="text-[13px] py-0.5">{v}</div>
		{/each}
	</div>

	<div class="section">
		<div class="section-title">SKILLS</div>
		<div class="skills">
			{#each SKILLS as s}
				<span class="pill text-[11px] py-px px-2.5">{s}</span>
			{/each}
		</div>
	</div>
</div>
