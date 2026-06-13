<script lang="ts">
	let { onClose }: { onClose?: () => void } = $props();

	let tracks = [
		{ id: 1, title: "neon arrival", bpm: 112 },
		{ id: 2, title: "synthwave floor", bpm: 98 },
		{ id: 3, title: "late drive", bpm: 124 }
	];

	let current = $state(0);
	let playing = $state(false);
	let progress = $state(0);
	let audioCtx: AudioContext | null = null;
	let osc: OscillatorNode | null = null;
	let gain: GainNode | null = null;
	let interval: any = null;

	function play() {
		if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

		stop();

		const t = tracks[current];
		osc = audioCtx.createOscillator();
		gain = audioCtx.createGain();
		const filter = audioCtx.createBiquadFilter();

		osc.type = 'sawtooth';
		osc.frequency.value = 48 + (current * 11);
		filter.type = 'lowpass';
		filter.frequency.value = 820;

		gain.gain.value = 0.08;

		const lfo = audioCtx.createOscillator();
		lfo.type = 'sine';
		lfo.frequency.value = t.bpm / 30;

		const lfoGain = audioCtx.createGain();
		lfoGain.gain.value = 6;

		lfo.connect(lfoGain);
		lfoGain.connect(osc.frequency);

		const master = audioCtx.createGain();
		master.gain.value = 0.7;

		osc.connect(filter);
		filter.connect(gain);
		gain.connect(master);
		master.connect(audioCtx.destination);

		osc.start();
		lfo.start();
		playing = true;

		// fake progress + eq
		progress = 0;
		interval = setInterval(() => {
			progress = (progress + 0.8) % 100;
			if (progress < 1 && Math.random() > 0.6) {
				// occasional note change for life
				if (osc) osc.frequency.value = 48 + Math.random() * 70;
			}
		}, 90);
	}

	function stop() {
		if (osc) { osc.stop(); osc = null; }
		if (gain) gain = null;
		playing = false;
		if (interval) { clearInterval(interval); interval = null; }
		progress = 0;
	}

	function select(i: number) {
		const wasPlaying = playing;
		stop();
		current = i;
		if (wasPlaying) setTimeout(play, 40);
	}

	function toggle() {
		playing ? stop() : play();
	}

	function close() {
		stop();
		onClose?.();
	}
</script>

<div class="output-card music-player">
	<div class="flex justify-between items-center mb-2">
		<div class="kicker">NEON PLAYER</div>
		<button onclick={close} class="text-[11px] text-[var(--dim)]">CLOSE</button>
	</div>

	<div class="tracklist">
		{#each tracks as t, i}
			<button
				type="button"
				class="track {i === current ? 'active' : ''}"
				onclick={() => select(i)}
			>
				{t.title} <span class="text-[var(--dim)] text-xs">· {t.bpm}</span>
			</button>
		{/each}
	</div>

	<div class="now-playing">
		<div class="text-sm font-medium mb-1 text-[var(--cyan)]">{tracks[current].title}</div>

		<div class="eq mb-2">
			<div class="bar" style:height={playing ? '65%' : '22%'}></div>
			<div class="bar" style:height={playing ? '95%' : '35%'}></div>
			<div class="bar" style:height={playing ? '48%' : '18%'}></div>
			<div class="bar" style:height={playing ? '82%' : '55%'}></div>
		</div>

		<div class="h-1 bg-[var(--border)] rounded overflow-hidden mb-2">
			<div class="h-1 bg-[var(--mg)] transition-all" style:width="{progress}%"></div>
		</div>

		<div class="flex gap-2">
			<button class="pill px-3 py-0.5 text-xs" onclick={toggle}>
				{playing ? '■ STOP' : '▶ PLAY'}
			</button>
			<button class="pill px-3 py-0.5 text-xs" onclick={stop}>RESET</button>
		</div>
		<div class="text-[10px] text-[var(--dim)] mt-1">WebAudio synth. Real tracks can be swapped in.</div>
	</div>
</div>
