<script lang="ts">
	import { onMount } from 'svelte';
	import { CONTACT } from '$lib/content';
	import { toast } from 'svelte-sonner';

	let { onSent, onEscape }: { onSent?: () => void; onEscape?: () => void } = $props();

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let company = $state(''); // honeypot — must stay empty
	let sending = $state(false);
	let sent = $state(false);

	let nameEl = $state<HTMLInputElement | null>(null);

	// Focus the first field as soon as the card appears.
	onMount(() => nameEl?.focus());

	// Escape from anywhere in the form returns focus to the terminal prompt,
	// matching the behaviour of the other sections.
	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			onEscape?.();
		}
	}

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (sending) return;

		if (!email.trim() || !message.trim()) {
			toast.error('Email and message are required.');
			return;
		}

		sending = true;
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message, company })
			});

			if (!res.ok) {
				const data = (await res.json().catch(() => ({}))) as { message?: string };
				throw new Error(data?.message || 'Something went wrong.');
			}

			sent = true;
			toast.success("Message sent — I'll get back to you soon.");
			onSent?.();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'Failed to send.');
		} finally {
			sending = false;
		}
	}
</script>

<div class="output-card">
	<div class="kicker mb-2">CONTACT</div>

	{#if sent}
		<div class="py-2 text-sm text-[var(--text)]">
			<span class="text-[var(--cyan)]">✓</span> Thanks{name ? `, ${name}` : ''}! Your message is on its
			way. I usually reply within a day.
		</div>
	{:else}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<form onsubmit={submit} onkeydown={onKey} class="space-y-2.5">
			<div class="grid gap-2.5 sm:grid-cols-2">
				<input
					class="cf-input"
					type="text"
					placeholder="name (optional)"
					bind:this={nameEl}
					bind:value={name}
					maxlength="120"
					autocomplete="name"
				/>
				<input
					class="cf-input"
					type="email"
					placeholder="your email"
					bind:value={email}
					maxlength="254"
					autocomplete="email"
					required
				/>
			</div>

			<textarea
				class="cf-input min-h-[88px] resize-y"
				placeholder="your message…"
				bind:value={message}
				maxlength="5000"
				required
			></textarea>

			<!-- Honeypot: hidden from humans, tempting for bots -->
			<input
				class="cf-honeypot"
				type="text"
				name="company"
				tabindex="-1"
				autocomplete="off"
				aria-hidden="true"
				bind:value={company}
			/>

			<div class="flex items-center justify-between gap-3">
				<span class="text-[10px] text-[var(--dim)]">sent straight to my inbox</span>
				<button class="cf-send" type="submit" disabled={sending}>
					{sending ? 'sending…' : 'send message'}
				</button>
			</div>
		</form>
	{/if}

	<div class="mt-3 border-t border-[var(--border)] pt-3">
		<div class="kicker mb-1.5">OR FIND ME AT</div>
		<div class="space-y-1.5 text-sm">
			<a href="mailto:{CONTACT.email}" class="group flex items-center gap-2">
				<span class="text-[var(--mg)]">✉️</span>
				<span class="text-[var(--cyan)] group-hover:underline">{CONTACT.email}</span>
			</a>
			<a href={CONTACT.linkedin} target="_blank" rel="noopener" class="group flex items-center gap-2">
				<span class="text-[var(--mg)]">in</span>
				<span class="text-[var(--cyan)] group-hover:underline">LinkedIn</span>
			</a>
			<a href={CONTACT.github} target="_blank" rel="noopener" class="group flex items-center gap-2">
				<span class="text-[var(--mg)]">gh</span>
				<span class="text-[var(--cyan)] group-hover:underline">GitHub @inaki</span>
			</a>
			<a href={CONTACT.twitter} target="_blank" rel="noopener" class="group flex items-center gap-2">
				<span class="text-[var(--mg)]">𝕏</span>
				<span class="text-[var(--cyan)] group-hover:underline">Twitter / X</span>
			</a>
			<a href={CONTACT.cal} target="_blank" rel="noopener" class="group flex items-center gap-2">
				<span class="text-[var(--mg)]">📅</span>
				<span class="text-[var(--cyan)] group-hover:underline">Book time</span>
			</a>
		</div>
	</div>

	<div class="mt-3 text-[10px] text-[var(--dim)]">
		Always happy to chat about AI, DX, terminals, or building in public.
	</div>
</div>

<style>
	.cf-input {
		width: 100%;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 7px 10px;
		font-family: inherit;
		font-size: 13px;
		color: var(--text);
		outline: none;
		transition:
			border-color 80ms ease,
			box-shadow 80ms ease;
	}
	.cf-input::placeholder {
		color: var(--dim);
	}
	.cf-input:focus {
		border-color: var(--mg);
		box-shadow: 0 0 0 3px rgba(255, 43, 214, 0.08);
	}

	.cf-send {
		display: inline-flex;
		align-items: center;
		font-size: 12px;
		padding: 6px 16px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(176, 107, 255, 0.08);
		color: var(--text);
		cursor: pointer;
		transition:
			transform 80ms ease,
			border-color 80ms ease,
			box-shadow 80ms ease;
	}
	.cf-send:hover:not(:disabled) {
		border-color: var(--mg);
		box-shadow: 0 0 0 4px rgba(255, 43, 214, 0.08);
		transform: translateY(-1px);
	}
	.cf-send:disabled {
		opacity: 0.6;
		cursor: progress;
	}

	/* Visually hidden but still in the DOM for bots */
	.cf-honeypot {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		opacity: 0;
		pointer-events: none;
	}
</style>
