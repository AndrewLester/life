<script lang="ts">
import { Game } from '$lib/game';

export let game: Game;
export let interval: number;
export let spacing: boolean;

let size = game.cells.length;

$: if (size) {
	game = new Game(size);
}

function handleNext() {
	game.playing = false;
	game = game.increment();
}
</script>

<div>
	<button on:click={handleNext}>Next</button>
	<button
		role="checkbox"
		aria-checked={game.playing}
		on:click={() => (game.playing = !game.playing)}>{game.playing ? 'Pause' : 'Play'}</button
	>
	<button on:click={() => (game = new Game(size))}>Clear</button>
	<input type="range" max="50" min="1" bind:value={size} />
	<input type="range" max="1000" min="0" bind:value={interval} step="100" />
	<input type="checkbox" bind:checked={spacing} />
</div>

<style>
div {
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	background-color: white;
	z-index: 1;
}
</style>
