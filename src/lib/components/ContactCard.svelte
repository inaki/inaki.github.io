<script lang="ts">
	import { CONTACT } from '$lib/content';
</script>

<div class="output-card">
	<div class="kicker mb-2">CONTACT</div>
	<div class="space-y-1.5 text-sm">
		<a href="mailto:{CONTACT.email}" class="flex items-center gap-2 group">
			<span class="text-[var(--mg)]">✉️</span>
			<span class="text-[var(--cyan)] group-hover:underline">{CONTACT.email}</span>
		</a>
		<a href={CONTACT.linkedin} target="_blank" class="flex items-center gap-2 group">
			<span class="text-[var(--mg)]">in</span>
			<span class="text-[var(--cyan)] group-hover:underline">LinkedIn</span>
		</a>
		<a href={CONTACT.github} target="_blank" class="flex items-center gap-2 group">
			<span class="text-[var(--mg)]">gh</span>
			<span class="text-[var(--cyan)] group-hover:underline">GitHub @inaki</span>
		</a>
		<a href={CONTACT.twitter} target="_blank" class="flex items-center gap-2 group">
			<span class="text-[var(--mg)]">𝕏</span>
			<span class="text-[var(--cyan)] group-hover:underline">Twitter / X</span>
		</a>
		<a href={CONTACT.cal} target="_blank" class="flex items-center gap-2 group">
			<span class="text-[var(--mg)]">📅</span>
			<span class="text-[var(--cyan)] group-hover:underline">Book time</span>
		</a>
	</div>
	<div class="mt-3 text-[10px] text-[var(--dim)]">
		Always happy to chat about AI, DX, terminals, or building in public.
	</div>
</div>
```

Now, also enhance the /help static card to be prettier, like the GitHub one.

Make the list nicer, perhaps with better spacing or add a header.

Also, since /help now in COMMAND_META includes /contact.

For the static help card in render, make it look more like a profile card or nice list.