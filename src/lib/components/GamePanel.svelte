<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let { game = 'snake', onClose, onEscape }: { game?: 'snake' | 'maze' | 'pong'; onClose?: () => void; onEscape?: () => void } = $props();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let raf = 0;
	let running = true;

	let score = $state(0);
	let status = $state('');

	// Snake — fixed grid, tick-based movement
	const SNAKE_COLS = 20;
	const SNAKE_ROWS = 15;
	const SNAKE_TICK_MS = 110;
	let snake: Array<{ x: number; y: number }> = [];
	let dir = { x: 1, y: 0 };
	let nextDir = { x: 1, y: 0 };
	let food = { x: 0, y: 0 };
	let lastSnakeTick = 0;

	// Pong
	let paddleY = 80;
	let ball = { x: 160, y: 90, vx: 2.2, vy: 1.8 };
	let cpuY = 70;
	let pScore = 0;
	let cScore = 0;

	const levels = [
		{
			maze: [
				[1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 0, 0, 0, 1, 0, 0, 0, 1],
				[1, 1, 1, 0, 1, 0, 1, 0, 1],
				[1, 0, 0, 0, 0, 0, 1, 0, 1],
				[1, 0, 1, 1, 1, 1, 1, 0, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 1, 1, 0, 1, 1, 1, 1, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1]
			],
			start: { x: 1, y: 1 },
			exit: { x: 7, y: 7 }
		},
		{
			maze: [
				[1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 0, 1, 1, 1, 1, 1, 0, 1],
				[1, 0, 1, 0, 0, 0, 1, 0, 1],
				[1, 0, 1, 0, 1, 0, 1, 0, 1],
				[1, 0, 0, 0, 1, 0, 0, 0, 1],
				[1, 1, 1, 1, 1, 1, 1, 0, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1]
			],
			start: { x: 1, y: 1 },
			exit: { x: 7, y: 7 }
		},
		{
			maze: [
				[1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 0, 1, 0, 0, 0, 1, 0, 1],
				[1, 0, 1, 0, 1, 0, 1, 0, 1],
				[1, 0, 0, 0, 1, 0, 0, 0, 1],
				[1, 1, 1, 0, 1, 1, 1, 1, 1],
				[1, 0, 0, 0, 0, 0, 0, 1, 1],
				[1, 0, 1, 1, 1, 1, 0, 0, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1]
			],
			start: { x: 1, y: 1 },
			exit: { x: 7, y: 7 }
		}
	];

	let currentLevel = $state(0);
	let MAZE = $state(structuredClone(levels[0].maze));
	let player = $state({ ...levels[0].start });
	let exit = $state({ ...levels[0].exit });
	let mazeWon = $state(false);

	function loadLevel(level: number) {
		currentLevel = level;
		MAZE = structuredClone(levels[level].maze);
		player = { ...levels[level].start };
		exit = { ...levels[level].exit };
		mazeWon = false;
		status = '';
	}

	function resizeCanvas() {
		if (!canvas) return;
		canvas.width = 260;
		canvas.height = game === 'pong' ? 150 : 200;
		ctx = canvas.getContext('2d', { alpha: true });
	}

	function snakeCellSize() {
		return {
			w: canvas.width / SNAKE_COLS,
			h: canvas.height / SNAKE_ROWS
		};
	}

	function setSnakeDir(x: number, y: number) {
		if (x === -dir.x && y === -dir.y) return;
		nextDir = { x, y };
	}

	function placeFood() {
		for (let i = 0; i < 200; i++) {
			const candidate = {
				x: Math.floor(Math.random() * SNAKE_COLS),
				y: Math.floor(Math.random() * SNAKE_ROWS)
			};
			if (!snake.some((s) => s.x === candidate.x && s.y === candidate.y)) {
				food = candidate;
				return;
			}
		}
	}

	function stepSnake() {
		dir = nextDir;
		const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

		if (head.x < 0 || head.x >= SNAKE_COLS || head.y < 0 || head.y >= SNAKE_ROWS) {
			status = 'wall — press r';
			running = false;
			return;
		}

		if (snake.some((s) => s.x === head.x && s.y === head.y)) {
			status = 'ate yourself — press r';
			running = false;
			return;
		}

		snake.unshift(head);
		if (head.x === food.x && head.y === food.y) {
			score++;
			placeFood();
		} else {
			snake.pop();
		}
	}

	function drawSnake() {
		if (!ctx) return;
		const { w: cellW, h: cellH } = snakeCellSize();

		ctx.fillStyle = '#39ff9f';
		for (const s of snake) {
			ctx.fillRect(s.x * cellW + 1, s.y * cellH + 1, cellW - 2, cellH - 2);
		}

		ctx.fillStyle = '#ff2bd6';
		ctx.fillRect(food.x * cellW + 3, food.y * cellH + 3, cellW - 6, cellH - 6);

		ctx.fillStyle = '#e9e2f5';
		ctx.font = '600 11px JetBrains Mono';
		ctx.fillText(`SCORE ${score}`, 10, 16);
		if (status) ctx.fillText(status.toUpperCase(), 10, 32);
	}

	function loop(timestamp: number) {
		if (!ctx) return;

		ctx.fillStyle = '#050308';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (game === 'snake') {
			if (running) {
				if (!lastSnakeTick) lastSnakeTick = timestamp;
				if (timestamp - lastSnakeTick >= SNAKE_TICK_MS) {
					lastSnakeTick = timestamp;
					stepSnake();
				}
			}
			drawSnake();
		} else if (game === 'pong') {
			if (running) {
				ball.x += ball.vx;
				ball.y += ball.vy;

				if (ball.y < 6 || ball.y > canvas.height - 6) ball.vy *= -1;

				if (ball.x < 12 && ball.y > paddleY && ball.y < paddleY + 32) {
					ball.vx = Math.abs(ball.vx) * 1.02;
					ball.x = 13;
				}
				if (ball.x > canvas.width - 12 && ball.y > cpuY && ball.y < cpuY + 32) {
					ball.vx = -Math.abs(ball.vx) * 1.02;
					ball.x = canvas.width - 13;
				}

				if (ball.x < 4) {
					cScore++;
					resetBall(1);
				}
				if (ball.x > canvas.width - 4) {
					pScore++;
					resetBall(-1);
				}

				cpuY += (ball.y - (cpuY + 16)) * 0.08;
			}

			ctx.strokeStyle = '#34e7f5';
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(130, 3);
			ctx.lineTo(130, 147);
			ctx.stroke();

			ctx.fillStyle = '#ff2bd6';
			ctx.fillRect(5, paddleY, 5, 32);
			ctx.fillStyle = '#39ff9f';
			ctx.fillRect(canvas.width - 10, cpuY, 5, 32);

			ctx.fillStyle = '#b06bff';
			ctx.beginPath();
			ctx.arc(ball.x, ball.y, 4, 0, Math.PI * 2);
			ctx.fill();

			ctx.fillStyle = '#e9e2f5';
			ctx.font = '600 11px JetBrains Mono';
			ctx.fillText(`${pScore}`, 40, 12);
			ctx.fillText(`${cScore}`, 200, 12);
			ctx.fillText('FIRST TO 7', 85, 12);
		} else if (game === 'maze') {
			const cell = 18;
			const mazeW = 9 * cell;
			const mazeH = 9 * cell;
			const ox = Math.floor((canvas.width - mazeW) / 2);
			const oy = Math.floor((canvas.height - mazeH) / 2);

			ctx.strokeStyle = '#b06bff';
			ctx.lineWidth = 2;
			for (let y = 0; y < 9; y++) {
				for (let x = 0; x < 9; x++) {
					if (MAZE[y][x]) {
						ctx.strokeRect(ox + x * cell, oy + y * cell, cell, cell);
					}
				}
			}

			ctx.fillStyle = '#39ff9f';
			ctx.fillRect(ox + exit.x * cell + 3, oy + exit.y * cell + 3, cell - 6, cell - 6);

			ctx.fillStyle = '#ff2bd6';
			ctx.fillRect(ox + player.x * cell + 4, oy + player.y * cell + 4, cell - 8, cell - 8);

			ctx.fillStyle = '#e9e2f5';
			ctx.font = '600 10px JetBrains Mono';
			const label = mazeWon ? status : `LEVEL ${currentLevel + 1}/${levels.length} - FIND THE EXIT`;
			const labelW = ctx.measureText(label).width;
			ctx.fillText(label, Math.floor((canvas.width - labelW) / 2), 12);

			if (player.x === exit.x && player.y === exit.y && !mazeWon) {
				mazeWon = true;
				if (currentLevel < levels.length - 1) {
					status = `LEVEL ${currentLevel + 1} COMPLETE! Press any key (or r to restart)`;
				} else {
					status = `YOU WIN ALL LEVELS! Press r to restart from level 1`;
				}
			}
		}

		raf = requestAnimationFrame(loop);
	}

	function resetSnake() {
		snake = [
			{ x: 10, y: 7 },
			{ x: 9, y: 7 },
			{ x: 8, y: 7 }
		];
		dir = { x: 1, y: 0 };
		nextDir = { x: 1, y: 0 };
		score = 0;
		status = '';
		lastSnakeTick = 0;
		placeFood();
		running = true;
	}

	function resetBall(sx = 1) {
		ball = { x: 130, y: 50 + Math.random() * 40, vx: 1.8 * sx, vy: 1.2 * (Math.random() * 2 - 1) };
	}

	function resetPong() {
		pScore = cScore = 0;
		paddleY = 50;
		cpuY = 50;
		resetBall(Math.random() > 0.5 ? 1 : -1);
		running = true;
	}

	let closed = false;

	function close() {
		if (closed) return;
		closed = true;
		running = false;
		cancelAnimationFrame(raf);
		window.removeEventListener('keydown', keyHandler, true);
		onClose?.();
	}

	function keyHandler(e: KeyboardEvent) {
		if (e.key === 'Escape' || e.key.toLowerCase() === 'q') {
			e.preventDefault();
			e.stopPropagation();
			if (e.key.toLowerCase() === 'q') {
				close();
				return;
			}
			if (onEscape) {
				if (closed) return;
				closed = true;
				running = false;
				cancelAnimationFrame(raf);
				window.removeEventListener('keydown', keyHandler, true);
				onEscape();
				return;
			}
			close();
			return;
		}

		if (!running) {
			if (e.key.toLowerCase() === 'r') {
				e.preventDefault();
				e.stopPropagation();
				if (game === 'snake') resetSnake();
				if (game === 'pong') resetPong();
				if (game === 'maze') loadLevel(currentLevel);
			}
			return;
		}

		if (game === 'snake') {
			if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') setSnakeDir(0, -1);
			else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') setSnakeDir(0, 1);
			else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') setSnakeDir(-1, 0);
			else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') setSnakeDir(1, 0);
			else return;

			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (game === 'pong') {
			if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') paddleY = Math.max(4, paddleY - 10);
			else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') paddleY = Math.min(canvas.height - 36, paddleY + 10);
			else return;
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (game === 'maze') {
			if (mazeWon) {
				if (e.key.toLowerCase() === 'r') {
					loadLevel(currentLevel);
				} else if (currentLevel < levels.length - 1) {
					loadLevel(currentLevel + 1);
				} else {
					loadLevel(0);
				}
				e.preventDefault();
				e.stopPropagation();
				return;
			}
			let nx = player.x;
			let ny = player.y;
			if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') ny--;
			else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') ny++;
			else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') nx--;
			else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') nx++;
			else return;

			if (MAZE[ny] && MAZE[ny][nx] === 0) {
				player.x = nx;
				player.y = ny;
			}
			e.preventDefault();
			e.stopPropagation();
		}
	}

	onMount(() => {
		resizeCanvas();
		if (game === 'snake') resetSnake();
		if (game === 'pong') resetPong();
		if (game === 'maze') loadLevel(0);

		window.addEventListener('keydown', keyHandler, true);
		raf = requestAnimationFrame(loop);

		requestAnimationFrame(() => canvas?.focus({ preventScroll: true }));
		canvas?.addEventListener('click', (e) => {
			e.stopPropagation();
			canvas.focus({ preventScroll: true });
		});
	});

	onDestroy(() => {
		running = false;
		cancelAnimationFrame(raf);
		window.removeEventListener('keydown', keyHandler, true);
	});
</script>

<div class="output-card">
	<div class="flex items-center justify-between mb-2">
		<div class="kicker">{game.toUpperCase()} — ARCADE</div>
		<button onclick={close} class="text-[11px] text-[var(--dim)] hover:text-[var(--mg)]">CLOSE (ESC)</button>
	</div>

	<div class="game-canvas-wrap">
		<canvas bind:this={canvas} width="260" height={game === 'pong' ? 150 : 200} tabindex="0"></canvas>
	</div>

	<div class="text-[11px] text-[var(--dim)] mt-2">
		{#if game === 'snake'}arrows / wasd • click board to focus • r = restart • esc to close{/if}
		{#if game === 'pong'}arrows / w s • first to 7 • r = restart • esc to close{/if}
		{#if game === 'maze'}arrows / wasd • r = restart level • any key for next when complete • esc to close{/if}
	</div>
</div>