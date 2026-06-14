<script lang="ts">
	const hobbies = [
		{ title: "Making music", icon: "🎵", desc: "Electronic, synth, and live coding sounds." },
		{ title: "Riding motorcycles", icon: "🏍️", desc: "Exploring roads and clearing the head." },
		{ title: "Building in public", icon: "🛠️", desc: "Small beautiful tools, open source, and experiments." },
		{ title: "Mentoring", icon: "🌱", desc: "Code for Puerto Rico, TechInclusive, and 1:1." }
	];
</script>

<div class="output-card">
	<div class="kicker mb-2">HOBBIES & LIFE</div>
	<div class="grid grid-cols-1 gap-2 text-sm">
		{#each hobbies as h}
			<div class="flex gap-2 items-start p-1.5 rounded hover:bg-white/5">
				<div class="text-lg w-5">{h.icon}</div>
				<div>
					<div class="font-medium text-[var(--text)]">{h.title}</div>
					<div class="text-xs text-[var(--dim)]">{h.desc}</div>
				</div>
			</div>
		{/each}
	</div>
</div>
