<script lang="ts">
import type { Game } from '$lib/game';

export let game: Game;

let pointerDown = false;
let wasPlaying = false;

function onPointerDown() {
	pointerDown = true;
}

function onPointerUp() {
	onPointerLeave();
	game.playing = wasPlaying;
}

function onPointerLeave() {
	pointerDown = false;
}

function onPointerOver(row: number, col: number) {
	if (pointerDown) {
		game = game.toggleCell(row, col);
	}
}

function onCellClick(row: number, col: number) {
	wasPlaying = game.playing;
	game.playing = false;
	game = game.toggleCell(row, col);
}
</script>

<div
	class="board"
	style:--width={game.cells[0].length}
	style:--height={game.cells.length}
	on:pointerdown={onPointerDown}
	on:pointercancel={onPointerUp}
	on:pointerup={onPointerUp}
	on:pointerleave={onPointerLeave}
>
	{#each game.cells as row, rowNum (rowNum)}
		{#each row as cell, colNum (colNum)}
			<button
				class="cell"
				class:alive={cell.alive}
				class:dead={cell.dead}
				on:pointerover={() => onPointerOver(rowNum, colNum)}
				on:pointerdown={() => onCellClick(rowNum, colNum)}
			/>
		{/each}
	{/each}
</div>

<style>
.board {
	display: grid;
	grid-template-columns: repeat(var(--width), 3rem);
	grid-template-rows: repeat(var(--height), 3rem);
	/* aspect-ratio: 1 / 1; */
}

.cell {
	width: 100%;
	height: 100%;
	border: 1px solid gray;
	background-color: green;
}

.cell.dead {
	background-color: black;
}
</style>
