<script lang="ts">
import type { Game } from '$lib/game';
import BoardCell from './BoardCell.svelte';
import { Group } from '@threlte/core';
import { spring } from 'svelte/motion';

export let game: Game;
export let spacing = false;
export let drawing = false;

let pointerDown = false;
let wasPlaying = false;

$: rows = game.cells;

const space = spring(1);

$: space.set(spacing ? 1.2 : 1);
$: drawing = pointerDown;

function onPointerUp() {
	if (pointerDown) {
		onPointerLeave();
		game.playing = wasPlaying;
	}
}

function onPointerLeave() {
	pointerDown = false;
}

function onPointerOver(row: number, col: number) {
	if (pointerDown) {
		game = game.toggleCell(row, col);
	}
}

function onCellClick(e: any, row: number, col: number) {
	if (e.detail.event.button !== 0) {
		return;
	}
	pointerDown = true;
	wasPlaying = game.playing;
	game.playing = false;
	game = game.toggleCell(row, col);
}
</script>

<svelte:window on:pointerup={onPointerUp} />

<Group>
	{#each rows as row, rowNum}
		{#each row as cell, colNum}
			<BoardCell
				{cell}
				position={{
					x: $space * rowNum - ($space * rows.length) / 2,
					y: 1,
					z: $space * colNum - ($space * row.length) / 2,
				}}
				on:pointerenter={() => onPointerOver(rowNum, colNum)}
				on:pointerdown={(e) => onCellClick(e, rowNum, colNum)}
				on:pointercancel={onPointerUp}
			/>
		{/each}
	{/each}
</Group>
