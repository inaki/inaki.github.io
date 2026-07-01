<script lang="ts">
	import { X } from '@lucide/svelte';

	let { open = false, onClose }: { open?: boolean; onClose: () => void } = $props();

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			onClose();
		}
	}
</script>

<svelte:window onkeydown={open ? onKey : undefined} />

{#if open}
	<!-- Backdrop -->
	<div
		class="help-backdrop"
		role="button"
		tabindex="-1"
		aria-label="close help"
		onclick={onClose}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') onClose();
		}}
	></div>

	<!-- Dialog -->
	<div class="help-dialog" role="dialog" aria-modal="true" aria-labelledby="help-title">
		<div class="help-head">
			<div>
				<div class="kicker">getting started</div>
				<h2 id="help-title">welcome — this is a real terminal</h2>
			</div>
			<button class="help-close" onclick={onClose} title="close" aria-label="close help">
				<X size={16} />
			</button>
		</div>

		<p class="lede">
			Most sites you scroll. This one you <em>drive</em>. Type a command, hit enter, watch the page
			talk back. No wrong moves — poke around.
		</p>

		<ul class="help-list">
			<li>
				<span class="key">/</span>
				<span>Hit <b>slash</b> anytime to summon the command menu, then type to filter.</span>
			</li>
			<li>
				<span class="key">↑ ↓</span>
				<span>Arrow keys browse the menu — and your command history when it's closed.</span>
			</li>
			<li>
				<span class="key">tab</span>
				<span>Autocompletes the highlighted command. <b>enter</b> runs it.</span>
			</li>
			<li>
				<span class="key">click</span>
				<span>The pills under the banner are shortcuts — tap one to skip the typing.</span>
			</li>
		</ul>

		<div class="kicker mt-1">good first commands</div>
		<div class="help-cmds">
			<span class="cmd">/whoami</span>
			<span class="cmd">/experience</span>
			<span class="cmd">/github</span>
			<span class="cmd">/resume</span>
			<span class="cmd">/game</span>
		</div>

		<p class="foot">
			Prefer the light? The <b>moon</b> up top flips the theme (or type <span class="cmd">/theme</span
			>). Stuck? <span class="cmd">/clear</span> resets the screen. And yes — there are a couple of
			easter eggs. 🕹️
		</p>
	</div>
{/if}

<style>
	.help-backdrop {
		position: fixed;
		inset: 0;
		z-index: 50;
		background: rgba(7, 0, 15, 0.6);
		backdrop-filter: blur(3px);
		cursor: default;
	}

	.help-dialog {
		position: fixed;
		z-index: 51;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: min(92vw, 520px);
		max-height: 86vh;
		overflow-y: auto;
		background: var(--win, #0c0418);
		border: 1px solid var(--border);
		border-radius: 14px;
		padding: 22px 24px 20px;
		box-shadow:
			0 0 0 1px rgba(176, 107, 255, 0.08),
			0 24px 70px rgba(0, 0, 0, 0.55),
			0 0 40px rgba(176, 107, 255, 0.12);
		color: var(--text);
		animation: help-pop 140ms ease-out;
	}

	@keyframes help-pop {
		from {
			opacity: 0;
			transform: translate(-50%, -48%) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	.help-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 12px;
	}

	.kicker {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--mg);
		margin-bottom: 4px;
	}

	h2 {
		font-size: 18px;
		font-weight: 700;
		letter-spacing: -0.2px;
		margin: 0;
		color: var(--text);
	}

	.help-close {
		flex: none;
		display: grid;
		place-items: center;
		width: 28px;
		height: 28px;
		border-radius: 8px;
		border: 1px solid var(--border);
		color: var(--dim);
		background: transparent;
		cursor: pointer;
		transition:
			color 80ms ease,
			border-color 80ms ease;
	}
	.help-close:hover {
		color: var(--text);
		border-color: var(--mg);
	}

	.lede {
		font-size: 13px;
		line-height: 1.5;
		color: var(--text);
		margin: 0 0 14px;
	}
	.lede em {
		font-style: normal;
		color: var(--cyan);
	}

	.help-list {
		list-style: none;
		margin: 0 0 16px;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 9px;
	}
	.help-list li {
		display: flex;
		align-items: baseline;
		gap: 12px;
		font-size: 13px;
		line-height: 1.45;
		color: var(--dim);
	}
	.help-list li b {
		color: var(--text);
		font-weight: 600;
	}
	.key {
		flex: none;
		min-width: 44px;
		text-align: center;
		font-size: 11px;
		font-weight: 600;
		padding: 2px 6px;
		border-radius: 6px;
		border: 1px solid var(--border);
		color: var(--cyan);
		background: rgba(52, 231, 245, 0.06);
	}

	.help-cmds {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 6px 0 16px;
	}
	.cmd {
		font-size: 12px;
		padding: 3px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		color: var(--purple);
		background: rgba(176, 107, 255, 0.07);
		white-space: nowrap;
	}

	.foot {
		font-size: 12px;
		line-height: 1.5;
		color: var(--dim);
		margin: 0;
		padding-top: 12px;
		border-top: 1px solid var(--border);
	}
	.foot b {
		color: var(--text);
		font-weight: 600;
	}
	.foot .cmd {
		display: inline-block;
		padding: 1px 7px;
	}

	.mt-1 {
		margin-top: 4px;
	}
</style>
