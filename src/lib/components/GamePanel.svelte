<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let { game = 'snake', onClose }: { game?: 'snake' | 'maze' | 'pong'; onClose?: () => void } = $props();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let raf = 0;
	let running = true;

	// Simple shared state
	let score = $state(0);
	let status = $state('');

	// Snake
	let snake: Array<{x:number,y:number}> = [];
	let dir = {x:1,y:0};
	let food = {x:0,y:0};
	let grid = 20;

	// Pong
	let paddleY = 80;
	let ball = {x:160,y:90,vx:2.2,vy:1.8};
	let cpuY = 70;
	let pScore = 0;
	let cScore = 0;

	// Maze (very small 9x9)
	const MAZE = [
		[1,1,1,1,1,1,1,1,1],
		[1,0,0,0,1,0,0,0,1],
		[1,1,1,0,1,0,1,0,1],
		[1,0,0,0,0,0,1,0,1],
		[1,0,1,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,0,1],
		[1,1,1,0,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1]
	];
	let player = {x:1,y:1};
	let exit = {x:7,y:7};
	let mazeWon = false;

	function resizeCanvas() {
		if (!canvas) return;
		canvas.width = 260;
		canvas.height = game === 'pong' ? 150 : 200;
		ctx = canvas.getContext('2d', { alpha: true });
	}

	function drawNeonRect(x:number, y:number, w:number, h:number, color:string) {
		if (!ctx) return;
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.strokeRect(x+0.5, y+0.5, w, h);
		ctx.fillStyle = color + '22';
		ctx.fillRect(x, y, w, h);
	}

	function loop() {
		if (!running || !ctx) return;

		ctx.fillStyle = '#050308';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (game === 'snake') {
			if (!ctx) return;
			// update
			const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
			// wrap or wall
			if (head.x < 0 || head.x >= grid || head.y < 0 || head.y >= Math.floor(canvas.height / (canvas.width/grid))) {
				status = 'wall. press r';
				running = false;
			} else {
				snake.unshift(head);
				if (head.x === food.x && head.y === food.y) {
					score++;
					placeFood();
				} else {
					snake.pop();
				}
				// self collision
				for (let i=1; i<snake.length; i++) {
					if (snake[i].x === head.x && snake[i].y === head.y) { status='ate self'; running=false; }
				}
			}

			// draw
			if (!ctx) return;
			const cell = canvas.width / grid;
			const c = ctx; // non-null for this block
			c.fillStyle = '#39ff9f';
			snake.forEach((s,i) => {
				c.fillRect(s.x*cell+1, s.y*cell+1, cell-2, cell-2);
			});
			ctx.fillStyle = '#ff2bd6';
			ctx.fillRect(food.x*cell+3, food.y*cell+3, cell-6, cell-6);

			ctx.fillStyle = '#e9e2f5';
			ctx.font = '600 11px JetBrains Mono';
			ctx.fillText(`SCORE ${score}`, 10, 16);
			if (status) ctx.fillText(status.toUpperCase(), 10, 32);
		}

		else if (game === 'pong') {
			// update
			ball.x += ball.vx;
			ball.y += ball.vy;

			if (ball.y < 6 || ball.y > canvas.height-6) ball.vy *= -1;

			// player paddle
			if (ball.x < 12 && ball.y > paddleY && ball.y < paddleY + 32) {
				ball.vx = Math.abs(ball.vx) * 1.02;
				ball.x = 13;
			}
			// cpu
			if (ball.x > canvas.width-12 && ball.y > cpuY && ball.y < cpuY+32) {
				ball.vx = -Math.abs(ball.vx) * 1.02;
				ball.x = canvas.width-13;
			}

			// miss
			if (ball.x < 4) { cScore++; resetBall(1); }
			if (ball.x > canvas.width-4) { pScore++; resetBall(-1); }

			// simple cpu
			cpuY += (ball.y - (cpuY + 16)) * 0.08;

			// draw
			ctx.strokeStyle = '#34e7f5';
			ctx.lineWidth = 2;
			ctx.beginPath(); ctx.moveTo(130,3); ctx.lineTo(130,147); ctx.stroke();

			// paddles
			ctx.fillStyle = '#ff2bd6';
			ctx.fillRect(5, paddleY, 5, 32);
			ctx.fillStyle = '#39ff9f';
			ctx.fillRect(canvas.width-10, cpuY, 5, 32);

			// ball
			ctx.fillStyle = '#b06bff';
			ctx.beginPath();
			ctx.arc(ball.x, ball.y, 4, 0, Math.PI*2);
			ctx.fill();

			ctx.fillStyle = '#e9e2f5';
			ctx.font = '600 11px JetBrains Mono';
			ctx.fillText(`${pScore}`, 40, 12);
			ctx.fillText(`${cScore}`, 200, 12);
			ctx.fillText('FIRST TO 7', 85, 12);
		}

		else if (game === 'maze') {
			const cell = 18;
			const ox = 22, oy = 8;

			// draw walls
			ctx.strokeStyle = '#b06bff';
			ctx.lineWidth = 2;
			for (let y=0; y<9; y++) {
				for (let x=0; x<9; x++) {
					if (MAZE[y][x]) {
						ctx.strokeRect(ox + x*cell, oy + y*cell, cell, cell);
					}
				}
			}

			// exit
			ctx.fillStyle = '#39ff9f';
			ctx.fillRect(ox + exit.x*cell + 3, oy + exit.y*cell + 3, cell-6, cell-6);

			// player
			ctx.fillStyle = '#ff2bd6';
			ctx.fillRect(ox + player.x*cell + 4, oy + player.y*cell + 4, cell-8, cell-8);

			ctx.fillStyle = '#e9e2f5';
			ctx.font = '600 10px JetBrains Mono';
			ctx.fillText(mazeWon ? 'EXIT FOUND' : 'FIND THE GREEN EXIT', 8, 12);

			if (player.x === exit.x && player.y === exit.y && !mazeWon) {
				mazeWon = true;
				status = 'nice!';
			}
		}

		raf = requestAnimationFrame(loop);
	}

	function placeFood() {
		const g = Math.floor(canvas.width / grid);
		food = {
			x: Math.floor(Math.random() * g),
			y: Math.floor(Math.random() * Math.floor(canvas.height / (canvas.width / grid)))
		};
	}

	function resetSnake() {
		snake = [{x:5,y:5},{x:4,y:5},{x:3,y:5}];
		dir = {x:1,y:0};
		score = 0;
		status = '';
		placeFood();
		running = true;
	}

	function resetBall(sx = 1) {
		ball = {x:130, y: 50 + Math.random()*40, vx: 1.8 * sx, vy: 1.2 * (Math.random()*2-1)};
	}

	function resetPong() {
		pScore = cScore = 0;
		paddleY = 50;
		cpuY = 50;
		resetBall(Math.random() > 0.5 ? 1 : -1);
		running = true;
	}

	function resetMaze() {
		player = {x:1, y:1};
		mazeWon = false;
		status = '';
	}

	function keyHandler(e: KeyboardEvent) {
		if (!running) {
			if (e.key.toLowerCase() === 'r') {
				if (game === 'snake') resetSnake();
				if (game === 'pong') resetPong();
				if (game === 'maze') resetMaze();
				loop();
			}
			return;
		}

		if (game === 'snake') {
			if (e.key === 'ArrowUp' || e.key.toLowerCase()==='w') dir = {x:0,y:-1};
			if (e.key === 'ArrowDown' || e.key.toLowerCase()==='s') dir = {x:0,y:1};
			if (e.key === 'ArrowLeft' || e.key.toLowerCase()==='a') dir = {x:-1,y:0};
			if (e.key === 'ArrowRight' || e.key.toLowerCase()==='d') dir = {x:1,y:0};
		}
		if (game === 'pong') {
			if (e.key === 'ArrowUp' || e.key.toLowerCase()==='w') paddleY = Math.max(4, paddleY - 10);
			if (e.key === 'ArrowDown' || e.key.toLowerCase()==='s') paddleY = Math.min(canvas.height-36, paddleY + 10);
		}
		if (game === 'maze') {
			let nx = player.x, ny = player.y;
			if (e.key === 'ArrowUp' || e.key.toLowerCase()==='w') ny--;
			if (e.key === 'ArrowDown' || e.key.toLowerCase()==='s') ny++;
			if (e.key === 'ArrowLeft' || e.key.toLowerCase()==='a') nx--;
			if (e.key === 'ArrowRight' || e.key.toLowerCase()==='d') nx++;
			if (MAZE[ny] && MAZE[ny][nx] === 0) {
				player.x = nx; player.y = ny;
			}
		}
		if (e.key.toLowerCase() === 'escape' || e.key === 'q') {
			onClose?.();
			running = false;
		}
		e.preventDefault();
	}

	onMount(() => {
		resizeCanvas();
		if (game === 'snake') resetSnake();
		if (game === 'pong') resetPong();
		if (game === 'maze') resetMaze();

		window.addEventListener('keydown', keyHandler);
		raf = requestAnimationFrame(loop);

		// Auto-focus the game board so keyboard controls work immediately (Escape to close, arrows/wasd to play)
		canvas.focus();

		// click to refocus if needed (e.g. after clicking elsewhere)
		canvas.addEventListener('click', () => canvas.focus());
	});

	onDestroy(() => {
		running = false;
		cancelAnimationFrame(raf);
		window.removeEventListener('keydown', keyHandler);
	});
</script>

<div class="output-card">
	<div class="flex items-center justify-between mb-2">
		<div class="kicker">{game.toUpperCase()} — ARCADE</div>
		<button onclick={onClose} class="text-[11px] text-[var(--dim)] hover:text-[var(--mg)]">CLOSE (ESC)</button>
	</div>

	<div class="game-canvas-wrap">
		<canvas bind:this={canvas} width="260" height={game==='pong'?150:200} tabindex="0"></canvas>
	</div>

	<div class="text-[11px] text-[var(--dim)] mt-2">
		{game === 'snake' && 'arrows / wasd • r = restart'}
		{game === 'pong' && 'arrows / w s • first to 7 • r = restart'}
		{game === 'maze' && 'arrows / wasd • find the exit • r = restart'}
	</div>
</div>
