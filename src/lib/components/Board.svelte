<script lang="ts">
import type { Game } from '$lib/game';
import BoardCell from './BoardCell.svelte';

export let game: Game;
export let boxWidth: number;

let pointerDown = false;
let wasPlaying = false;

$: rows = game.cells;

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
	style:--width={rows[0].length}
	style:--height={rows.length}
	style:--box-width="{boxWidth}px"
	on:pointerdown={onPointerDown}
	on:pointercancel={onPointerUp}
	on:pointerup={onPointerUp}
	on:pointerleave={onPointerLeave}
>
	{#each rows as row, rowNum}
		{#each row as cell, colNum}
			<BoardCell
				{cell}
				on:pointerover={() => onPointerOver(rowNum, colNum)}
				on:pointerdown={() => onCellClick(rowNum, colNum)}
			/>
		{/each}
	{/each}
</div>

<style>
.board {
	display: grid;
	grid-template-columns: repeat(var(--width), var(--box-width, 3rem));
	grid-template-rows: repeat(var(--height), var(--box-width, 3rem));
	/* aspect-ratio: 1 / 1; */
}
</style>
